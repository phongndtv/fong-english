// Kiểm tra văn phong bản thảo bài báo khoa học. Chạy hoàn toàn trên máy, không gửi văn bản đi đâu.
// Mỗi quy tắc: { re: biểu thức tìm (phải có cờ g), t: loại, m: giải thích, s: gợi ý (chuỗi hoặc hàm nhận đoạn khớp) }
// Loại: err = lỗi ngữ pháp/dùng từ, style = văn phong chưa trang trọng, hedge = mức độ khẳng định.
// Đầu câu: phần dấu câu đứng trước được cắt khỏi vùng tô (xem checkStyle).
const SENT_START = '(?:^|[.!?]\\s+)';

const STYLE_RULES = [
  // ---------- Lỗi ngữ pháp, dùng từ ----------
  { re: /\b(informations|equipments|evidences|knowledges|feedbacks|advices|softwares|hardwares|datas|researchs)\b/gi, t: 'err',
    m: 'Danh từ không đếm được, không thêm -s.', s: w => w.replace(/s$/i, '') },
  { re: /\bresearches\b/gi, t: 'err', m: '"Research" là danh từ không đếm được. Dùng "research" hoặc "studies".', s: 'studies / research' },
  { re: /\b(?:a|one) research\b/gi, t: 'err', m: '"Research" không đếm được, không dùng với "a".', s: 'a study' },
  { re: /\b(?:make|makes|made|making) (?:a )?researche?s?\b/gi, t: 'err', m: 'Không nói "make research".', s: 'conduct research' },
  { re: /\b(?:this|our|the present|the current) (?:paper|study|article|work) research(?:es)?\b/gi, t: 'err',
    m: '"Research" hiếm khi dùng làm động từ theo cách này.', s: 'this study investigates / examines' },
  { re: /\bdiscuss(?:es|ed|ing)? about\b/gi, t: 'err', m: '"Discuss" không đi với "about".', s: w => w.replace(/ about$/i, '') },
  { re: /\bemphasi[sz](?:e|es|ed|ing) on\b/gi, t: 'err', m: '"Emphasize" không đi với "on" (danh từ "emphasis on" mới có "on").', s: w => w.replace(/ on$/i, '') },
  { re: /\bmention(?:s|ed|ing)? about\b/gi, t: 'err', m: '"Mention" không đi với "about".', s: w => w.replace(/ about$/i, '') },
  { re: /\bin the other hand\b/gi, t: 'err', m: 'Cụm đúng là "on the other hand".', s: 'On the other hand' },
  { re: /\bdespite of\b/gi, t: 'err', m: '"Despite" không đi với "of" (hoặc dùng "in spite of").', s: 'despite' },
  { re: /\balthough\b[^.;!?]{1,150}?,\s*but\b/gi, t: 'err', m: 'Đã có "although" thì không dùng thêm "but".', s: 'bỏ "but"' },
  { re: /\bcan be able to\b/gi, t: 'err', m: 'Thừa: "can" và "be able to" cùng nghĩa.', s: 'can' },
  { re: /\b(?:a|an|the|significant|positive|negative|strong|adverse|no|little) affect\b/gi, t: 'err',
    m: 'Danh từ là "effect"; "affect" là động từ.', s: w => w.replace(/affect$/i, 'effect') },
  { re: /\b(?:results|findings) (?:was|has)\b/gi, t: 'err', m: 'Chủ ngữ số nhiều cần động từ số nhiều.', s: w => w.replace(/was$/i, 'were').replace(/has$/i, 'have') },
  { re: /\bthe number of (?:\w+ ){1,4}(?:are|were|have)\b/gi, t: 'err', m: '"The number of ..." là số ít.', s: w => w.replace(/are$/i, 'is').replace(/were$/i, 'was').replace(/have$/i, 'has') },
  { re: /\ba number of (\w+[^s\W]) (?:has|is|was)\b/gi, t: 'err', m: '"A number of" + danh từ số nhiều + động từ số nhiều.', s: 'a number of studies have ...' },
  { re: /\baccording to [^,.]{1,60}, (?:he|she|they|the authors?) (?:said|says|stated|states)\b/gi, t: 'err',
    m: 'Đã có "according to" thì không lặp lại "he said".', s: 'According to X (năm), ...' },
  { re: /\bin recent years,? there (?:are|is)\b/gi, t: 'err', m: '"In recent years" đi với thì hiện tại hoàn thành.', s: 'In recent years, there have been' },
  { re: /\b(?:since \d{4}|over the (?:past|last) (?:\w+ )?(?:years?|decades?)),? (?:\w+ ){1,4}(?:is|are) (?:increasing|growing|rising)\b/gi, t: 'err',
    m: 'Mốc "since / over the past ..." thường đi với thì hiện tại hoàn thành.', s: 'has/have increased' },
  { re: new RegExp(SENT_START + 'Comparing (?:with|to)\\b', 'g'), t: 'err', m: 'Dùng phân từ quá khứ "Compared with/to".', s: 'Compared with' },
  { re: /\bprices?(?: of [\w-]+(?: [\w-]+)?)? (?:is|are|was|were) (?:very |quite |rather |too |so )?(?:expensive|cheap)\b/gi, t: 'err',
    m: '"Price" đi với high/low, không đi với expensive/cheap.', s: w => w.replace(/expensive$/i, 'high').replace(/cheap$/i, 'low') },
  { re: /\bet\.\s?al\.?|\bet al\b(?!\.)/g, t: 'err', m: 'Viết đúng là "et al." (một dấu chấm sau "al").', s: 'et al.' },
  { re: /\b(e\.g|i\.e)(?!\.)|\b(?:eg|ie)\.(?=\s)/gi, t: 'err', m: 'Viết đúng là "e.g.," hoặc "i.e.," (chú ý: e.g. = ví dụ, i.e. = tức là).', s: w => /^e/i.test(w) ? 'e.g.,' : 'i.e.,' },
  { re: /\betc\b(?!\.)/gi, t: 'err', m: '"etc." luôn có dấu chấm.', s: 'etc.' },
  { re: /\ba (?!eu|one|once|uni|use|usu|uti|ewe)(?=[aeio][a-z])/g, t: 'err', m: 'Trước âm nguyên âm dùng "an".', s: 'an' },
  { re: /\ban (?=u(?:s|ni|ti|ro|ka|bi))/g, t: 'err', m: 'Chữ "u" đọc là /juː/ (useful, university) nên dùng "a".', s: 'a' },
  { re: /\ban (?!h(?:our|onest|onor|eir))(?=[bcdfghjklmnpqrstvwxyz][a-z])/g, t: 'err', m: 'Trước âm phụ âm dùng "a".', s: 'a' },
  { re: new RegExp(SENT_START + '\\d+(?:[.,]\\d+)?\\b', 'g'), t: 'err', m: 'Không bắt đầu câu bằng chữ số: viết bằng chữ hoặc đảo câu.', s: 'Twenty-five ... / In total, 25 ...' },
  { re: /\b(\w{2,})\s+\1\b/gi, t: 'err', m: 'Lặp từ.', s: w => w.split(/\s+/)[0] },

  // ---------- Văn phong chưa trang trọng ----------
  { re: /\b\w+n[’']t\b|\b(?:it|that|there|here|what|who|let)[’']s\b|\b(?:i|you|we|they|he|she|it)[’'](?:re|ve|ll|m|d)\b/gi, t: 'style',
    m: 'Bài báo không dùng dạng viết tắt.', s: w => w.replace(/won[’']t/i, 'will not').replace(/can[’']t/i, 'cannot').replace(/n[’']t/i, ' not').replace(/[’']s$/i, ' is').replace(/[’']re$/i, ' are').replace(/[’']ve$/i, ' have').replace(/[’']ll$/i, ' will').replace(/[’']m$/i, ' am').replace(/[’']d$/i, ' would') },
  { re: /\byou(?:r|rs|rself)?\b/gi, t: 'style', m: 'Tránh ngôi thứ hai "you"; dùng câu bị động hoặc chủ ngữ cụ thể.', s: 'one / researchers / câu bị động' },
  { re: /\b(?:a lot of|lots of|plenty of)\b/gi, t: 'style', m: 'Cách nói thân mật.', s: 'many / much / a large number of / considerable' },
  { re: /\b(?:kind of|sort of)\b(?= \w+ly\b| (?:similar|different|difficult|hard|easy|high|low|large|small))/gi, t: 'style', m: 'Cách nói thân mật mang nghĩa "hơi".', s: 'somewhat / rather' },
  { re: /\breally\b/gi, t: 'style', m: 'Từ nhấn mạnh thân mật.', s: 'highly / considerably / bỏ đi' },
  { re: /\b(?:huge|giant|tremendous)\b/gi, t: 'style', m: 'Từ cảm tính.', s: 'substantial / considerable / large' },
  { re: /\bbig\b/gi, t: 'style', m: 'Từ thân mật.', s: 'large / substantial / major' },
  { re: /\bthings?\b/gi, t: 'style', m: 'Từ mơ hồ; nêu cụ thể.', s: 'factor / aspect / issue / element' },
  { re: /\bstuff\b/gi, t: 'style', m: 'Từ thân mật.', s: 'material / items' },
  { re: /\b(?:get|gets|got|gotten|getting)\b/gi, t: 'style', m: '"Get" thân mật; chọn động từ cụ thể.', s: 'obtain / receive / become / achieve' },
  { re: /\bmaybe\b/gi, t: 'style', m: 'Từ thân mật.', s: 'possibly / perhaps' },
  { re: /\bnowadays\b/gi, t: 'style', m: 'Ít dùng trong bài báo.', s: 'currently / at present / in recent years' },
  { re: /\b(?:ok|okay|anyway|anyways|totally|absolutely|pretty much)\b/gi, t: 'style', m: 'Từ khẩu ngữ.', s: 'bỏ hoặc thay bằng từ trang trọng' },
  { re: /\bvery (?:unique|essential|perfect|crucial|vital|fundamental|optimal|unanimous)\b/gi, t: 'style',
    m: 'Tính từ tuyệt đối không cần "very".', s: w => w.replace(/^very /i, '') },
  { re: /\bvery\b/gi, t: 'style', m: '"Very" dùng nhiều làm văn yếu; chọn tính từ mạnh hơn hoặc đưa số liệu.', s: 'highly / considerably / số liệu cụ thể' },
  { re: /\b(?:look|looks|looked|looking) into\b/gi, t: 'style', m: 'Cụm động từ thân mật.', s: 'investigate' },
  { re: /\b(?:find|finds|found|finding) out\b/gi, t: 'style', m: 'Cụm động từ thân mật.', s: 'determine / discover' },
  { re: /\b(?:go|goes|went|gone|going) up\b/gi, t: 'style', m: 'Cụm động từ thân mật.', s: 'increase / rise' },
  { re: /\b(?:go|goes|went|gone|going) down\b/gi, t: 'style', m: 'Cụm động từ thân mật.', s: 'decrease / decline' },
  { re: /\b(?:come|comes|came|coming) up with\b/gi, t: 'style', m: 'Cụm động từ thân mật.', s: 'develop / propose' },
  { re: /\b(?:talk|talks|talked|talking) about\b/gi, t: 'style', m: 'Cụm động từ thân mật.', s: 'discuss / address' },
  { re: /\b(?:figure|figures|figured|figuring) out\b/gi, t: 'style', m: 'Cụm động từ thân mật.', s: 'determine / identify' },
  { re: /\b(?:cut|cuts|cutting) down\b/gi, t: 'style', m: 'Cụm động từ thân mật.', s: 'reduce' },
  { re: /\b(?:look|looks|looked|looking) at\b/gi, t: 'style', m: 'Cụm động từ thân mật.', s: 'examine / consider' },
  { re: /\b(?:get|gets|got|getting) rid of\b/gi, t: 'style', m: 'Cụm động từ thân mật.', s: 'eliminate / remove' },
  { re: /\band so on\b/gi, t: 'style', m: 'Khẩu ngữ; liệt kê đầy đủ hoặc dùng "etc." (hạn chế).', s: 'etc. / liệt kê cụ thể' },
  { re: /\bsuch as\b[^.;!?]{1,150}?\b(?:etc\.?|and so on)/gi, t: 'style', m: '"Such as" đã hàm ý liệt kê chưa đầy đủ; bỏ "etc.".', s: 'bỏ "etc."' },
  { re: /\b(?:increase|decrease|rise|reduction|decline|growth|drop) of (?!\d|about|approximately|nearly|more|less|over|up to|almost|around|roughly|some)/gi, t: 'style',
    m: 'Thay đổi CỦA một đại lượng thường dùng "in" (an increase in yield); "of" dùng với con số (an increase of 20%).', s: w => w.replace(/ of $/i, ' in ') },
  { re: /\bas (?:we|you) (?:all )?know\b/gi, t: 'style', m: 'Khẩu ngữ; nêu nguồn hoặc diễn đạt khách quan.', s: 'It is widely recognized that ...' },
  { re: /\b(?:i|we) (?:think|believe|feel)\b|\bin (?:my|our) opinion\b/gi, t: 'style', m: 'Ý kiến cá nhân; nên dựa vào bằng chứng.', s: 'These results suggest that ...' },
  { re: new RegExp(SENT_START + '(?:And|But|So|Also|Plus)\\b', 'g'), t: 'style', m: 'Tránh bắt đầu câu bằng liên từ thân mật.', s: w => ({ And: 'In addition,', But: 'However,', So: 'Therefore,', Also: 'Furthermore,', Plus: 'In addition,' })[w] },
  { re: new RegExp(SENT_START + 'Besides,', 'g'), t: 'style', m: '"Besides" mang sắc thái khẩu ngữ.', s: 'In addition, / Moreover,' },
  { re: /!/g, t: 'style', m: 'Không dùng dấu chấm than trong bài báo.', s: '.' },
  { re: /[^.!?\s][^.!?\n]{7,}\?/g, t: 'style', m: 'Hạn chế câu hỏi tu từ; chuyển thành câu trần thuật.', s: 'It remains unclear whether ...' },

  // ---------- Mức độ khẳng định ----------
  { re: /\b(?:prove|proves|proved|proven|proving)\b/gi, t: 'hedge', m: 'Nghiên cứu thực nghiệm hiếm khi "chứng minh" tuyệt đối.', s: 'demonstrate / indicate / suggest' },
  { re: /\b(?:clearly|obviously|undoubtedly|certainly|definitely|unquestionably)\b/gi, t: 'hedge', m: 'Khẳng định quá mạnh; để số liệu tự nói.', s: 'bỏ đi / appear to / likely' },
  { re: /\b(?:always|never)\b/gi, t: 'hedge', m: 'Khẳng định tuyệt đối; kiểm tra lại có đúng mọi trường hợp không.', s: 'usually / rarely / in most cases' },
  { re: /\b(?:the best|perfect|perfectly|completely solves?)\b/gi, t: 'hedge', m: 'Khẳng định quá mức.', s: 'among the most effective / largely' }
];

// Chính tả Anh–Mỹ và Anh–Anh lẫn lộn: chỉ báo khi văn bản có cả hai kiểu.
const SPELL_US = /\b(?:analy|organi|reali|utili|characteri|minimi|maximi|optimi|recogni|emphasi|summari|categori|generali|standardi|normali|stabili|visuali|prioriti|hypothesi|synthesi)z(?:e|es|ed|ing|ation|ations|er|ers)\b|\b(?:behavior|color|favor|labor|neighbor|humor|harbor|rumor)(?:s|al|ed|ing|able|ite)?\b|\b(?:center|fiber|liter|meter)s?\b|\b(?:modeling|labeled|labeling|traveled|traveling|aging)\b/gi;
const SPELL_UK = /\b(?:analy|organi|reali|utili|characteri|minimi|maximi|optimi|recogni|emphasi|summari|categori|generali|standardi|normali|stabili|visuali|prioriti|hypothesi|synthesi)s(?:e|es|ed|ing|ation|ations|er|ers)\b|\b(?:behaviour|colour|favour|labour|neighbour|humour|harbour|rumour)(?:s|al|ed|ing|able|ite)?\b|\b(?:centre|fibre|litre|metre)s?\b|\b(?:modelling|labelled|labelling|travelled|travelling|ageing)\b/gi;

const STYLE_RANK = { err: 3, hedge: 2, style: 1 };

function checkStyle(text) {
  const found = [];
  const add = (start, end, t, m, s) => found.push({ start, end, t, m, s });
  for (const r of STYLE_RULES) {
    r.re.lastIndex = 0;
    let x;
    while ((x = r.re.exec(text))) {
      if (!x[0]) { r.re.lastIndex++; continue; }
      const lead = r.re.source.startsWith(SENT_START) ? /^[.!?]?\s*/.exec(x[0])[0].length : 0;   // bỏ dấu câu của câu trước
      const hit = x[0].slice(lead);
      if (!hit) continue;
      add(x.index + lead, x.index + x[0].length, r.t, r.m, typeof r.s === 'function' ? r.s(hit) : r.s);
    }
  }
  // Câu quá dài
  const sentRe = /[^.!?\n]+[.!?]?/g;
  let sm;
  while ((sm = sentRe.exec(text))) {
    const n = sm[0].trim().split(/\s+/).filter(Boolean).length;
    if (n > 40) {
      const lead = sm[0].length - sm[0].trimStart().length;
      add(sm.index + lead, sm.index + lead + Math.min(sm[0].trim().length, 60), 'style', `Câu dài ${n} từ; nên tách thành hai câu cho dễ đọc.`, 'tách câu');
    }
  }
  // Chính tả lẫn lộn: đánh dấu kiểu ít dùng hơn
  const us = text.match(SPELL_US) || [], uk = text.match(SPELL_UK) || [];
  if (us.length && uk.length) {
    const minor = us.length >= uk.length ? SPELL_UK : SPELL_US;
    const kind = minor === SPELL_UK ? 'Anh–Anh' : 'Anh–Mỹ';
    minor.lastIndex = 0;
    let x;
    while ((x = minor.exec(text))) add(x.index, x.index + x[0].length, 'err', `Văn bản lẫn chính tả Anh–Mỹ và Anh–Anh; từ này viết kiểu ${kind}. Chọn một kiểu theo yêu cầu của tạp chí.`, 'thống nhất một kiểu');
  }
  // Bỏ chồng lấn: giữ lỗi nặng hơn, rồi đoạn đứng trước/dài hơn.
  found.sort((a, b) => a.start - b.start || STYLE_RANK[b.t] - STYLE_RANK[a.t] || (b.end - b.start) - (a.end - a.start));
  const out = [];
  for (const f of found) {
    const prev = out[out.length - 1];
    if (prev && f.start < prev.end) {
      if (STYLE_RANK[f.t] > STYLE_RANK[prev.t]) out[out.length - 1] = f;
      continue;
    }
    out.push(f);
  }
  return out;
}
