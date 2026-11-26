'use strict';

/* ================= Tiện ích ================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const DAY = 86400000;
// Số thứ tự ngày theo giờ địa phương (đổi ngày lúc 0h).
const dayNum = (t = Date.now()) => Math.floor((t - new Date(t).getTimezoneOffset() * 60000) / DAY);
const dayLabel = n => { const d = new Date(n * DAY); return d.getUTCDate() + '/' + (d.getUTCMonth() + 1); };
const POS = { n: 'danh từ', v: 'động từ', adj: 'tính từ', adv: 'trạng từ', phr: 'cụm từ' };

// Mã của từ = chính từ tiếng Anh viết thường, nên thêm/xóa/sắp xếp dữ liệu không làm lệch tiến độ.
// Nếu một từ xuất hiện ở nhiều trình độ, giữ lần xuất hiện ở trình độ thấp nhất.
const wordId = w => w.toLowerCase().trim();
const TOPIC = Object.fromEntries(TOPICS.map(t => [t.id, t]));
const LEVEL_IDS = LEVELS.map(l => l.id).filter(id => VOCAB[id]);
const WORDS = [];
const WORD = {};
for (const level of LEVEL_IDS) {
  for (const [topic, list] of Object.entries(VOCAB[level])) {
    if (!TOPIC[topic]) continue;
    for (const w of list) {
      const id = wordId(w[0]);
      if (WORD[id]) continue;
      WORD[id] = { id, level, topic, w: w[0], ipa: w[1], pos: w[2], vi: w[3], ex: w[4], exVi: w[5] };
      WORDS.push(WORD[id]);
    }
  }
}

/* ================= Lưu trữ ================= */
const STORE = 'fong-english-v1';
const DEF = {
  settings: { newPerDay: 10, goalXP: 50, rate: 0.9, voice: '', topics: [], theme: 'auto', level: 'A1', typing: true },
  cards: {},   // id -> { r: số lần nhớ liên tiếp, e: hệ số dễ, i: khoảng cách (ngày), d: ngày đến hạn, l: số lần quên }
  log: {},     // ngày -> { xp, n: từ mới, r: lượt ôn, g: đã đạt mục tiêu } — chỉ của máy này
  remote: {},  // mã máy khác -> nhật ký của máy đó (nhận về khi đồng bộ)
  settingsT: 0, // thời điểm sửa cài đặt gần nhất, để biết bản cài đặt nào mới hơn khi đồng bộ
  best: 0
};
let S = load();
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE));
    if (s) return { settings: { ...DEF.settings, ...s.settings }, cards: migrateCards(s.cards || {}), log: s.log || {},
      remote: s.remote || {}, settingsT: s.settingsT || 0, best: s.best || 0 };
  } catch (e) { /* dữ liệu hỏng: bắt đầu lại */ }
  return JSON.parse(JSON.stringify(DEF));
}
// Bản đầu tiên lưu thẻ theo vị trí "chủ đề:số thứ tự" trong danh sách A1. Đổi sang mã theo từ.
function migrateCards(cards) {
  const out = {};
  for (const [key, c] of Object.entries(cards)) {
    const m = /^(\w+):(\d+)$/.exec(key);
    const legacy = m && VOCAB.A1[m[1]]?.[+m[2]];
    out[legacy ? wordId(legacy[0]) : key] = c;
  }
  return out;
}
function save(sync = true) {
  try { localStorage.setItem(STORE, JSON.stringify(S)); } catch (e) { toast('Không lưu được tiến độ'); }
  if (sync) scheduleSync();
}

function todayLog() { const d = dayNum(); return S.log[d] || (S.log[d] = { xp: 0, n: 0, r: 0 }); }
// Tổng của một ngày trên mọi thiết bị đã đồng bộ.
function dayStat(d) {
  const parts = [S.log[d], ...Object.values(S.remote).map(l => l?.[d])].filter(Boolean);
  const sum = k => parts.reduce((a, p) => a + (p[k] || 0), 0);
  const xp = sum('xp');
  return { xp, n: sum('n'), r: sum('r'), g: parts.some(p => p.g) || xp >= S.settings.goalXP };
}
const today = () => dayStat(dayNum());
function addXP(n) {
  const l = todayLog();
  l.xp += n;
  if (!l.g && today().xp >= S.settings.goalXP) {
    l.g = 1;
    S.best = Math.max(S.best, streak());
    setTimeout(() => toast('🎉 Bạn đã hoàn thành mục tiêu hôm nay!'), 400);
  }
  save();
}
// Chuỗi ngày đạt mục tiêu. Cứ 7 ngày được "nghỉ phép" 1 ngày mà không mất chuỗi.
function streak() {
  const met = d => dayStat(d).g;
  let d = dayNum(), s = 0, lastFreeze = -99;
  if (!met(d)) d--;
  while (true) {
    if (met(d)) { s++; d--; }
    else if (met(d - 1) && s - lastFreeze >= 7 && (s > 0 || d === dayNum() - 1)) { lastFreeze = s; d--; }
    else break;
  }
  return s;
}
const dueCards = () => { const t = dayNum(); return Object.keys(S.cards).filter(id => WORD[id] && S.cards[id].d <= t); };
const learnedWords = () => WORDS.filter(w => S.cards[w.id]);
const status = id => { const c = S.cards[id]; return !c ? 'new' : c.i >= 21 ? 'known' : 'learning'; };

/* Lặp lại ngắt quãng (dựa trên SM-2). q: 0 quên, 1 khó, 2 nhớ, 3 dễ */
function schedule(id, q) {
  const t = dayNum();
  const c = S.cards[id] || (S.cards[id] = { r: 0, e: 2.5, i: 0, d: t, l: 0 });
  c.t = Date.now();
  if (q === 0) {
    c.l++; c.r = 0; c.i = 0; c.d = t; c.e = Math.max(1.3, c.e - 0.2);
    return c;
  }
  // Lần đầu thấy "Khó": chưa tính là nhớ, đưa vào ôn lại ngay trong hôm nay.
  if (c.r === 0 && q === 1) { c.i = 0; c.d = t; c.e = Math.max(1.3, c.e - 0.15); return c; }
  if (c.r === 0) c.i = [0, 1, 1, 4][q];
  else if (c.r === 1) c.i = [0, 2, 3, 6][q];
  else c.i = Math.max(c.i + 1, Math.round(c.i * [0, 1.2, c.e, c.e * 1.3][q]));
  c.e = Math.max(1.3, c.e + [0, -0.15, 0, 0.15][q]);
  c.r++; c.d = t + c.i;
  return c;
}
const fmtInterval = d => d === 0 ? 'hôm nay' : d < 30 ? d + ' ngày' : d < 365 ? Math.round(d / 30) + ' tháng' : (d / 365).toFixed(1) + ' năm';

/* ================= Phát âm (đọc văn bản) ================= */
// Chấm điểm giọng: giọng thần kinh (Edge "Natural", Apple "Premium/Enhanced") rõ nhất,
// rồi đến giọng Google, giọng hệ thống tốt; loại giọng eSpeak và giọng "vui" của macOS.
const NOVELTY = /albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|grandma|grandpa|rocko|sandy|shelley|flo\b|eddy|reed|fred|junior|kathy|ralph/i;
const GOOD_NAMES = /aria|jenny|guy|ava|andrew|emma|brian|michelle|samantha|allison|zoe|evan|nathan|susan|joelle|nicky|tom\b|libby|sonia|ryan|serena|daniel|kate|oliver/i;
function voiceScore(v) {
  const n = v.name;
  let s = 0;
  if (/natural|neural/i.test(n)) s += 100;
  else if (/premium/i.test(n)) s += 90;
  else if (/enhanced/i.test(n)) s += 80;
  else if (/google/i.test(n) || /^English United/i.test(n)) s += 60; // Android dùng giọng Google
  else if (/microsoft/i.test(n)) s += 20;
  if (GOOD_NAMES.test(n)) s += 30;
  if (/espeak|\+/i.test(n) || /espeak/i.test(v.voiceURI)) s -= 200;
  if (NOVELTY.test(n)) s -= 150;
  const lang = v.lang.replace('_', '-');
  if (/^en-US/i.test(lang)) s += 15; else if (/^en-GB/i.test(lang)) s += 10;
  else if (/^en-(AU|CA|IE|NZ)/i.test(lang)) s += 5;
  if (v.default) s += 3;
  return s;
}
let voices = [];
function loadVoices() {
  voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang))
    .sort((a, b) => voiceScore(b) - voiceScore(a) || a.name.localeCompare(b.name));
}
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
const pickVoice = () => voices.find(v => v.voiceURI === S.settings.voice) || voices[0];
let lastUtter = null; // giữ tham chiếu: Chrome có thể thu gom và cắt ngang câu đang đọc
function say(text, rate) {
  if (!('speechSynthesis' in window)) return toast('Thiết bị này không hỗ trợ đọc phát âm');
  if (!voices.length) loadVoices();
  const busy = speechSynthesis.speaking || speechSynthesis.pending;
  speechSynthesis.cancel();
  const u = lastUtter = new SpeechSynthesisUtterance(text);
  const v = pickVoice();
  u.lang = v ? v.lang : 'en-US';
  if (v) u.voice = v;
  u.rate = rate || S.settings.rate;
  u.pitch = 1;
  u.volume = 1;
  // Đọc ngay sau cancel() đôi khi bị nuốt mất âm đầu trên Chrome, nên chờ một nhịp
  if (busy) setTimeout(() => speechSynthesis.speak(u), 80); else speechSynthesis.speak(u);
}

/* ================= Giao diện chung ================= */
const V = $('#view');
let keyHandler = null;
document.addEventListener('keydown', e => {
  if (keyHandler && !e.ctrlKey && !e.metaKey && !e.altKey) keyHandler(e);
});
function render(html) { V.innerHTML = html; }
let toastTimer;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}
function topbar(done, total, back = '#/home') {
  return `<div class="topbar"><a href="${back}" class="back" aria-label="Quay lại">‹</a>
    <div class="progress"><div style="width:${total ? done / total * 100 : 0}%"></div></div>
    <span class="muted small">${done}/${total}</span></div>`;
}
function highlight(sentence, word) {
  const re = new RegExp('\\b(' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\w*)', 'gi');
  return esc(sentence).replace(re, '<b>$1</b>');
}
function applyTheme() {
  const t = S.settings.theme;
  if (t === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);
}

/* ================= Trang chủ ================= */
function home() {
  const l = today(), st = S.settings;
  const due = dueCards().length;
  const newLeft = Math.max(0, st.newPerDay - l.n);
  const unseen = WORDS.length - learnedWords().length;
  const pct = Math.min(100, Math.round(l.xp / st.goalXP * 100));
  const d = dayNum();
  const wod = WORDS[(d * 7919) % WORDS.length];
  const pod = PHRASES[(d * 104729) % PHRASES.length];
  const hour = new Date().getHours();
  const hi = hour < 11 ? 'Chào buổi sáng' : hour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';

  render(`
    ${installBanner()}
    <div class="card hero">
      <div class="ring" style="--p:${pct}"><div>${l.xp}<small>/ ${st.goalXP} XP</small></div></div>
      <div>
        <h1>${hi}! 👋</h1>
        <div class="streak">🔥 ${streak()} ngày liên tiếp</div>
        <div class="muted small">${l.g ? 'Đã đạt mục tiêu hôm nay. Tuyệt vời!' : 'Còn ' + (st.goalXP - l.xp) + ' XP nữa là đạt mục tiêu hôm nay'}</div>
        <div class="muted small">Mỗi 7 ngày được nghỉ 1 ngày mà không mất chuỗi.</div>
      </div>
    </div>

    <h2>Hôm nay</h2>
    <a class="card task ${newLeft === 0 ? 'done' : ''}" href="#/learn">
      <div class="ic">📚</div>
      <div class="grow"><b>Học từ mới</b> <span class="badge">${esc(LEVELS.find(x => x.id === st.level)?.name || st.level)}</span>
        <div class="muted small">${unseen === 0 ? 'Bạn đã học hết kho từ!' : newLeft ? `Đã học ${l.n}/${st.newPerDay} từ` : `Xong ${l.n} từ ✓ · bấm để học thêm`}</div></div>
      <div class="chev">›</div>
    </a>
    <a class="card task ${due === 0 ? 'done' : ''}" href="#/review">
      <div class="ic">🔁</div>
      <div class="grow"><b>Ôn tập</b>
        <div class="muted small">${due ? due + ' thẻ đến hạn ôn' : 'Không còn thẻ cần ôn ✓'}</div></div>
      <div class="chev">›</div>
    </a>
    <a class="card task" href="#/practice">
      <div class="ic">🎯</div>
      <div class="grow"><b>Luyện tập</b><div class="muted small">Trắc nghiệm · Nghe chép · Luyện nói</div></div>
      <div class="chev">›</div>
    </a>

    <h2>Từ của ngày</h2>
    <div class="card">
      <div class="row between">
        <div><div style="font-size:1.4rem;font-weight:700">${esc(wod.w)}</div>
          <div class="muted small">${esc(wod.ipa)} · ${POS[wod.pos]} · ${esc(wod.vi)}</div></div>
        <button class="icon-btn" data-say="${esc(wod.w)}">🔊</button>
      </div>
      <div class="example"><button class="icon-btn" data-say="${esc(wod.ex)}">🔊</button>
        <div><div>${highlight(wod.ex, wod.w)}</div><div class="muted small">${esc(wod.exVi)}</div></div></div>
    </div>
    <h2>Câu giao tiếp của ngày</h2>
    <div class="card row">
      <button class="icon-btn" data-say="${esc(pod[0])}">🔊</button>
      <div><b>${esc(pod[0])}</b><div class="muted small">${esc(pod[1])}</div></div>
    </div>
  `);
  bindSay();
  bindInstall();
}
function bindSay() { $$('[data-say]').forEach(b => b.onclick = () => say(b.dataset.say)); }

/* ================= Cài đặt ứng dụng (PWA) ================= */
let installPrompt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt = e; if (route() === 'home') home(); });
window.addEventListener('appinstalled', () => { installPrompt = null; toast('Đã cài ứng dụng!'); });
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
function installBanner() {
  if (isStandalone()) return '';
  if (installPrompt) return `<div class="banner row between"><div><b>Cài Fong English</b><div class="small muted">Mở nhanh từ màn hình chính, dùng cả khi không có mạng.</div></div><button class="btn primary" id="installBtn">Cài đặt</button></div>`;
  if (isIOS()) return `<div class="banner small"><b>Cài lên iPhone/iPad:</b> trong Safari bấm nút <b>Chia sẻ</b> (ô vuông có mũi tên lên), rồi chọn <b>Thêm vào MH chính</b>.</div>`;
  return '';
}
function bindInstall() {
  const b = $('#installBtn');
  if (b) b.onclick = async () => { installPrompt.prompt(); await installPrompt.userChoice; installPrompt = null; home(); };
}

/* ================= Phiên học thẻ (từ mới & ôn tập) ================= */
function learn() {
  const l = today();
  const left = S.settings.newPerDay - l.n;
  const unseen = WORDS.filter(w => !S.cards[w.id]);
  const pri = S.settings.topics;
  // Thứ tự: trình độ đang chọn → các trình độ cao hơn → thấp hơn; trong cùng trình độ ưu tiên chủ đề đã chọn.
  const lv = Math.max(0, LEVEL_IDS.indexOf(S.settings.level));
  const rank = w => { const d = LEVEL_IDS.indexOf(w.level) - lv; return d >= 0 ? d : LEVEL_IDS.length - d; };
  unseen.sort((a, b) => rank(a) - rank(b) || pri.includes(b.topic) - pri.includes(a.topic));
  if (!unseen.length) return emptyState('🏆', 'Bạn đã học hết ' + WORDS.length + ' từ!', 'Hãy tiếp tục ôn tập mỗi ngày để nhớ lâu.', '#/review', 'Ôn tập');
  if (left <= 0) {
    render(`${topbar(0, 0)}<div class="card center stack">
      <div style="font-size:3rem">✅</div><h2>Bạn đã học đủ ${l.n} từ mới hôm nay</h2>
      <p class="muted">Học quá nhiều từ một lúc sẽ khiến lượng ôn tập những ngày sau tăng mạnh. Muốn học thêm vẫn được nhé.</p>
      <button class="btn primary block" id="more">Học thêm 5 từ</button>
      <a class="btn block" href="#/home">Về trang chủ</a></div>`);
    $('#more').onclick = () => cardSession(unseen.slice(0, 5), true);
    return;
  }
  cardSession(unseen.slice(0, left), true);
}
function review() {
  const ids = shuffle(dueCards());
  if (!ids.length) return emptyState('🌟', 'Không có thẻ nào cần ôn', 'Thẻ sẽ đến hạn ôn đúng lúc bạn sắp quên. Hãy học thêm từ mới nhé!', '#/learn', 'Học từ mới');
  cardSession(ids.map(id => WORD[id]), false);
}
function emptyState(icon, title, text, href, label) {
  render(`${topbar(0, 0)}<div class="card center stack"><div style="font-size:3rem">${icon}</div><h2>${title}</h2>
    <p class="muted">${text}</p><a class="btn primary block" href="${href}">${label}</a><a class="btn block" href="#/home">Về trang chủ</a></div>`);
}

function cardSession(queue, isNew) {
  queue = queue.slice();
  const total = queue.length, done = new Set(), xpGiven = new Set();
  let i = 0, flipped = false, again = 0;

  function show() {
    if (i >= queue.length) return finish();
    const w = queue[i]; flipped = false;
    const c = S.cards[w.id];
    // Thẻ đã nhớ được ít nhất một lần: một nửa số lần sẽ hỏi ngược (thấy nghĩa, gõ từ tiếng Anh).
    if (!isNew && S.settings.typing && c && c.r >= 1 && Math.random() < 0.5) return showTyping(w);
    render(`${topbar(done.size, total)}
      <div class="card flash">
        <div class="tag">${isNew && !c ? 'Từ mới' : 'Ôn tập'} · ${w.level} · ${TOPIC[w.topic].icon} ${TOPIC[w.topic].name}</div>
        <div class="word">${esc(w.w)}</div>
        <div class="ipa">${esc(w.ipa)} · <i>${POS[w.pos]}</i></div>
        <button class="icon-btn big" id="sayW" aria-label="Nghe phát âm">🔊</button>
        <div id="backside" class="hidden" style="width:100%">
          <div class="meaning">${esc(w.vi)}</div>
          <div class="example"><button class="icon-btn" id="sayEx" aria-label="Nghe câu ví dụ">🔊</button>
            <div><div>${highlight(w.ex, w.w)}</div><div class="muted small">${esc(w.exVi)}</div></div></div>
        </div>
      </div>
      <div id="actions">
        <button class="btn primary block" id="flip">Xem nghĩa</button>
        <p class="kbd-hint muted small center">Phím tắt: Space = lật thẻ / nghe lại · 1–4 = chấm điểm</p>
      </div>`);
    $('#sayW').onclick = () => say(w.w);
    $('#sayEx').onclick = () => say(w.ex);
    $('#flip').onclick = flip;
    say(w.w);
  }
  function showTyping(w) {
    flipped = true;   // phím 1–4 không dùng ở chế độ này; chặn lật thẻ
    let result = null;
    render(`${topbar(done.size, total)}
      <div class="card flash">
        <div class="tag">Gõ từ tiếng Anh · ${w.level} · ${TOPIC[w.topic].icon} ${TOPIC[w.topic].name}</div>
        <div class="meaning" style="margin-top:4px">${esc(w.vi)}</div>
        <div class="muted"><i>${POS[w.pos]}</i> · ${w.w.length} chữ cái</div>
        <div class="muted small">${esc(w.exVi)}</div>
        <input class="input" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Gõ từ tiếng Anh..." style="margin-top:8px;text-align:center">
        <div id="fb" style="width:100%"></div>
      </div>
      <div id="actions" class="row">
        <button class="btn ghost" id="giveup">Không nhớ</button>
        <button class="btn primary" id="check" style="flex:1">Kiểm tra</button>
      </div>`);
    const check = giveUp => {
      if (result !== null) return grade(result);
      const typed = norm($('#ans').value), want = norm(w.w);
      const dist = giveUp ? 99 : editDistance(typed, want);
      result = dist === 0 ? 2 : dist === 1 && want.length > 3 ? 1 : 0;
      const msg = ['Chưa đúng. Đáp án:', 'Gần đúng (sai 1 chữ):', 'Chính xác! 🎉'][result];
      $('#ans').disabled = true;
      $('#fb').innerHTML = `<div class="feedback ${result ? 'ok' : 'no'}">${msg} <b>${esc(w.w)}</b> ${esc(w.ipa)}</div>
        <div class="example"><button class="icon-btn" id="sayEx">🔊</button><div><div>${highlight(w.ex, w.w)}</div><div class="muted small">${esc(w.exVi)}</div></div></div>`;
      $('#sayEx').onclick = () => say(w.ex);
      $('#actions').innerHTML = `<button class="btn primary block" id="check">Tiếp tục</button>`;
      $('#check').onclick = () => check();
      $('#check').focus();
      say(w.w);
    };
    $('#check').onclick = () => check();
    $('#giveup').onclick = () => check(true);
    $('#ans').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); check(); } };
    setTimeout(() => $('#ans')?.focus(), 50);
  }
  function preview(q) {
    // Dự đoán khoảng cách ôn tiếp theo mà không lưu.
    const backup = S.cards[queue[i].id] ? { ...S.cards[queue[i].id] } : null;
    const c = schedule(queue[i].id, q);
    const iv = c.i;
    if (backup) S.cards[queue[i].id] = backup; else delete S.cards[queue[i].id];
    return q === 0 ? 'học lại' : fmtInterval(iv);
  }
  function flip() {
    if (flipped) return;
    flipped = true;
    $('#backside').classList.remove('hidden');
    const labels = ['Quên', 'Khó', 'Nhớ', 'Dễ'];
    $('#actions').innerHTML = `<div class="grades">${labels.map((t, q) =>
      `<button class="btn g${q}" data-q="${q}">${t}<small>${preview(q)}</small></button>`).join('')}</div>
      <p class="kbd-hint muted small center">1 Quên · 2 Khó · 3 Nhớ · 4 Dễ</p>`;
    $$('[data-q]').forEach(b => b.onclick = () => grade(+b.dataset.q));
  }
  function grade(q) {
    const w = queue[i];
    const wasNew = !S.cards[w.id];
    schedule(w.id, q);
    const l = todayLog();
    if (wasNew) l.n++;
    if (!xpGiven.has(w.id)) {
      xpGiven.add(w.id);
      if (!wasNew) l.r++;
      addXP(wasNew ? 5 : 2);
    } else save();
    if (q === 0) {
      again++;
      queue.splice(Math.min(i + 4, queue.length), 0, w);   // gặp lại sau vài thẻ
    } else done.add(w.id);
    i++;
    show();
  }
  function finish() {
    keyHandler = null;
    render(`${topbar(total, total)}<div class="card center stack">
      <div style="font-size:3rem">🎉</div><h2>Hoàn thành!</h2>
      <p>${isNew ? 'Bạn vừa học <b>' + total + '</b> từ mới' : 'Bạn vừa ôn <b>' + total + '</b> thẻ'}${again ? ', có ' + again + ' lần phải học lại' : ''}.</p>
      <p class="muted">XP hôm nay: <b>${today().xp}</b> / ${S.settings.goalXP}</p>
      <a class="btn primary block" href="#/quiz">Kiểm tra nhanh bằng trắc nghiệm</a>
      <a class="btn block" href="#/home">Về trang chủ</a></div>`);
  }
  keyHandler = e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' && e.key === 'Enter' || $('#ans')) return;
    if (e.code === 'Space' || e.key === 'Enter') { e.preventDefault(); flipped ? say(queue[i].w) : flip(); }
    else if (flipped && /^[1-4]$/.test(e.key)) grade(+e.key - 1);
  };
  show();
}

/* ================= Luyện tập ================= */
function practice() {
  const n = learnedWords().length;
  const sr = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  render(`<h1>Luyện tập</h1>
    <p class="muted">${n < 8 ? 'Bạn mới học ' + n + ' từ, bài luyện sẽ lấy thêm từ trong kho. Học thêm để bài sát hơn nhé.' : 'Bài luyện lấy từ ' + n + ' từ bạn đã học.'}</p>
    <a class="card task" href="#/quiz"><div class="ic">✅</div>
      <div class="grow"><b>Trắc nghiệm</b><div class="muted small">10 câu: chọn nghĩa, chọn từ, nghe rồi chọn · +2 XP mỗi câu đúng</div></div><div class="chev">›</div></a>
    <a class="card task" href="#/cloze"><div class="ic">✍️</div>
      <div class="grow"><b>Điền từ vào câu</b><div class="muted small">Đọc câu ví dụ, gõ từ còn thiếu · +3 XP mỗi câu đúng</div></div><div class="chev">›</div></a>
    <a class="card task" href="#/listen"><div class="ic">🎧</div>
      <div class="grow"><b>Nghe & chép chính tả</b><div class="muted small">Nghe từ/câu rồi gõ lại · +3 XP mỗi câu đúng</div></div><div class="chev">›</div></a>
    <a class="card task" href="#/speak"><div class="ic">🎤</div>
      <div class="grow"><b>Luyện nói</b><div class="muted small">${sr ? 'Nói theo câu mẫu, máy chấm phát âm · +3 XP' : 'Nghe và nói theo câu mẫu (trình duyệt này không chấm được giọng nói, hãy dùng Chrome hoặc Edge)'}</div></div><div class="chev">›</div></a>`);
}
const practicePool = () => { const l = learnedWords(); return l.length >= 8 ? l : WORDS; };

function quiz() {
  const pool = practicePool();
  const qs = pick(pool, Math.min(10, pool.length)).map(w => {
    const type = pick(['en', 'vi', 'audio'], 1)[0];
    // Phương án nhiễu: ưu tiên cùng chủ đề và cùng trình độ để câu hỏi không quá lộ.
    const others = WORDS.filter(x => x.id !== w.id && x.vi !== w.vi);
    let similar = others.filter(x => x.topic === w.topic && x.level === w.level);
    if (similar.length < 3) similar = others.filter(x => x.topic === w.topic);
    if (similar.length < 3) similar = others;
    const opts = shuffle([w, ...pick(similar, 3)]);
    return { w, type, opts };
  });
  let i = 0, score = 0;
  function show() {
    if (i >= qs.length) return end();
    const { w, type, opts } = qs[i];
    const prompt = type === 'en' ? `<div class="muted center">Nghĩa của từ này là gì?</div><div class="question">${esc(w.w)}</div>`
      : type === 'vi' ? `<div class="muted center">Từ tiếng Anh nào có nghĩa là</div><div class="question">${esc(w.vi)}</div>`
      : `<div class="muted center">Nghe và chọn từ đúng</div><div class="center" style="margin:16px"><button class="icon-btn big" id="replay">🔊</button></div>`;
    render(`${topbar(i, qs.length, '#/practice')}<div class="card">${prompt}
      <div class="options">${opts.map((o, k) => `<button class="btn option" data-k="${k}">${k + 1}. ${esc(type === 'en' ? o.vi : o.w)}</button>`).join('')}</div>
      <div id="fb"></div></div>`);
    if (type !== 'vi') say(w.w);
    const rp = $('#replay'); if (rp) rp.onclick = () => say(w.w);
    let answered = false;
    const answer = k => {
      if (answered) return; answered = true;
      const ok = opts[k].id === w.id;
      $$('.option').forEach((b, j) => { b.disabled = true; if (opts[j].id === w.id) b.classList.add('correct'); else if (j === k) b.classList.add('wrong'); });
      if (ok) { score++; addXP(2); }
      else if (S.cards[w.id]) { Object.assign(S.cards[w.id], { d: dayNum(), t: Date.now() }); save(); }   // trả lời sai: đưa vào ôn lại hôm nay
      $('#fb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}">${ok ? 'Chính xác! 🎉' : 'Chưa đúng.'} <b>${esc(w.w)}</b> ${esc(w.ipa)} = ${esc(w.vi)}</div>
        <button class="btn primary block" id="next" style="margin-top:12px">Tiếp tục</button>`;
      if (type === 'vi') say(w.w);
      $('#next').onclick = next; $('#next').focus();
    };
    const next = () => { i++; show(); };
    $$('.option').forEach(b => b.onclick = () => answer(+b.dataset.k));
    keyHandler = e => {
      if (!answered && /^[1-4]$/.test(e.key)) answer(+e.key - 1);
      else if (answered && e.key === 'Enter') { e.preventDefault(); next(); }
    };
  }
  function end() {
    keyHandler = null;
    resultCard(score, qs.length, '#/quiz');
  }
  show();
}
function resultCard(score, total, again) {
  const p = score / total;
  render(`${topbar(total, total, '#/practice')}<div class="card center stack">
    <div style="font-size:3rem">${p >= .8 ? '🏆' : p >= .5 ? '👍' : '💪'}</div>
    <h2>Đúng ${score}/${total} câu</h2>
    <p class="muted">${p >= .8 ? 'Xuất sắc!' : p >= .5 ? 'Khá tốt, cố thêm chút nữa!' : 'Đừng nản, luyện thêm là tiến bộ thôi!'} XP hôm nay: ${today().xp}/${S.settings.goalXP}</p>
    <a class="btn primary block" href="${again}" id="again">Làm lại</a>
    <a class="btn block" href="#/practice">Bài luyện khác</a></div>`);
  $('#again').onclick = e => { e.preventDefault(); go(); };
}

const norm = s => s.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
// Số ký tự phải sửa để biến a thành b (khoảng cách Levenshtein).
function editDistance(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}

// Tìm dạng của từ xuất hiện trong câu ví dụ (vd. "teach" → "teaches") để làm chỗ trống.
function clozeToken(w) {
  const m = new RegExp('\\b' + w.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:s|es|ed|d|ing|er|est)?\\b', 'i').exec(w.ex);
  return m ? { token: m[0], at: m.index } : null;
}
function cloze() {
  const items = pick(practicePool().filter(clozeToken), 8);
  let i = 0, score = 0;
  function show() {
    if (i >= items.length) { keyHandler = null; return resultCard(score, items.length, '#/cloze'); }
    const w = items[i], { token, at } = clozeToken(w);
    const blank = token[0] + '_'.repeat(token.length - 1).split('').join(' ');
    let checked = false;
    render(`${topbar(i, items.length, '#/practice')}<div class="card stack">
      <div class="muted center">Điền từ còn thiếu vào câu</div>
      <div class="question" style="font-size:1.3rem;line-height:1.5">${esc(w.ex.slice(0, at))}<span style="color:var(--primary);white-space:nowrap">${blank}</span>${esc(w.ex.slice(at + token.length))}</div>
      <div class="muted center">${esc(w.exVi)}</div>
      <input class="input" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Từ còn thiếu...">
      <div class="row"><button class="btn ghost" id="hint">Gợi ý</button><button class="btn primary" id="check" style="flex:1">Kiểm tra</button></div>
      <div id="fb"></div></div>`);
    $('#hint').onclick = () => { $('#ans').placeholder = `${w.w} (${POS[w.pos]}) = ${w.vi}`; $('#ans').focus(); };
    const check = () => {
      if (checked) { i++; return show(); }
      checked = true;
      const typed = norm($('#ans').value);
      const ok = typed === norm(token);
      const close = !ok && editDistance(typed, norm(token)) === 1 && token.length > 3;
      if (ok) { score++; addXP(3); }
      $('#ans').disabled = true;
      $('#fb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}">${ok ? 'Chính xác! 🎉' : close ? 'Gần đúng, sai 1 chữ. Đáp án:' : 'Đáp án:'} <b>${esc(token)}</b>
        <div class="small">${esc(w.w)} ${esc(w.ipa)} · ${POS[w.pos]} · ${esc(w.vi)}</div></div>`;
      $('#check').textContent = 'Tiếp tục'; $('#hint').classList.add('hidden');
      $('#check').focus();
      say(w.ex);
    };
    $('#check').onclick = check;
    $('#ans').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); check(); } };
    keyHandler = e => { if (checked && e.key === 'Enter' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') { e.preventDefault(); check(); } };
    setTimeout(() => $('#ans')?.focus(), 50);
  }
  show();
}

function listen() {
  const items = shuffle([
    ...pick(practicePool(), 5).map(w => ({ en: w.w, vi: w.vi })),
    ...pick(PHRASES, 3).map(p => ({ en: p[0], vi: p[1] }))
  ]);
  let i = 0, score = 0;
  function show() {
    if (i >= items.length) { keyHandler = null; return resultCard(score, items.length, '#/listen'); }
    const it = items[i];
    let checked = false;
    render(`${topbar(i, items.length, '#/practice')}<div class="card stack">
      <div class="muted center">Nghe và gõ lại ${it.en.includes(' ') ? 'câu' : 'từ'} bạn nghe được</div>
      <div class="row" style="justify-content:center;gap:16px;margin:10px 0">
        <button class="icon-btn big" id="play" aria-label="Nghe">🔊</button>
        <button class="icon-btn big" id="slow" aria-label="Nghe chậm">🐢</button>
      </div>
      <input class="input" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Gõ vào đây...">
      <div class="row"><button class="btn ghost" id="hint">Gợi ý</button><button class="btn primary" id="check" style="flex:1">Kiểm tra</button></div>
      <div id="fb"></div></div>`);
    const play = r => say(it.en, r);
    $('#play').onclick = () => play();
    $('#slow').onclick = () => play(0.55);
    $('#hint').onclick = () => { $('#ans').placeholder = it.en.split(' ').map(w => w[0] + '…').join(' ') + '  (' + it.vi + ')'; $('#ans').focus(); };
    const check = () => {
      if (checked) { i++; return show(); }
      checked = true;
      const ok = norm($('#ans').value) === norm(it.en);
      if (ok) { score++; addXP(3); }
      $('#ans').disabled = true;
      $('#fb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}">${ok ? 'Chính xác! 🎉' : 'Đáp án:'} <b>${esc(it.en)}</b><div class="small">${esc(it.vi)}</div></div>`;
      $('#check').textContent = 'Tiếp tục'; $('#hint').classList.add('hidden');
      $('#check').focus();
    };
    $('#check').onclick = check;
    $('#ans').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); check(); } };
    keyHandler = e => { if (checked && e.key === 'Enter' && e.target.tagName !== 'INPUT') { e.preventDefault(); check(); } };
    play();
    setTimeout(() => $('#ans')?.focus(), 50);
  }
  show();
}

function speakPractice() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const items = pick(PHRASES, 6);
  let i = 0, score = 0, rec = null;
  function show() {
    if (rec) { try { rec.abort(); } catch (e) {} rec = null; }
    if (i >= items.length) return resultCard(score, items.length, '#/speak');
    const [en, vi] = items[i];
    let gave = false;
    render(`${topbar(i, items.length, '#/practice')}<div class="card stack center">
      <div class="muted">Nghe mẫu rồi nói lại câu này</div>
      <div class="question" style="margin:8px 0">${esc(en)}</div>
      <div class="muted">${esc(vi)}</div>
      <div class="row" style="justify-content:center;gap:16px;margin:14px 0">
        <button class="icon-btn big" id="play" aria-label="Nghe mẫu">🔊</button>
        <button class="icon-btn big" id="slow" aria-label="Nghe chậm">🐢</button>
      </div>
      ${SR ? `<div><button class="mic" id="mic" aria-label="Bấm để nói">🎤</button><div class="muted small" id="micHint" style="margin-top:8px">Bấm micro rồi nói</div></div>`
           : `<p class="muted small">Trình duyệt này chưa hỗ trợ nhận giọng nói. Hãy nói to theo mẫu rồi tự đánh giá.</p>
              <button class="btn primary block" id="self">Tôi đã nói được ✓</button>`}
      <div id="fb" style="text-align:left"></div>
      <button class="btn block" id="skip">Bỏ qua / Câu tiếp</button></div>`);
    $('#play').onclick = () => say(en);
    $('#slow').onclick = () => say(en, 0.55);
    $('#skip').onclick = () => { i++; show(); };
    say(en);
    if (!SR) {
      $('#self').onclick = () => { if (!gave) { gave = true; score++; addXP(1); } i++; show(); };
      return;
    }
    const mic = $('#mic');
    mic.onclick = () => {
      if (rec) { rec.stop(); return; }
      speechSynthesis.cancel();
      rec = new SR();
      rec.lang = 'en-US'; rec.interimResults = false; rec.maxAlternatives = 3;
      rec.onstart = () => { mic.classList.add('on'); $('#micHint').textContent = 'Đang nghe... bấm lần nữa để dừng'; };
      rec.onend = () => { mic.classList.remove('on'); $('#micHint').textContent = 'Bấm micro để nói lại'; rec = null; };
      rec.onerror = e => {
        const msg = { 'not-allowed': 'Bạn cần cho phép dùng micro', 'no-speech': 'Không nghe thấy gì, thử lại nhé', network: 'Nhận giọng nói cần kết nối mạng' }[e.error];
        toast(msg || 'Lỗi nhận giọng nói: ' + e.error);
      };
      rec.onresult = e => {
        const alts = [...e.results[0]].map(a => a.transcript);
        const best = alts.map(t => ({ t, s: matchScore(en, t) })).sort((a, b) => b.s.ratio - a.s.ratio)[0];
        const pct = Math.round(best.s.ratio * 100);
        const ok = pct >= 80;
        if (ok && !gave) { gave = true; score++; addXP(3); }
        $('#fb').innerHTML = `<div class="feedback ${ok ? 'ok' : 'no'}">
          <div><b>${pct}%</b> · ${ok ? 'Phát âm tốt! 🎉' : 'Thử lại nhé, chú ý các từ gạch chân.'}</div>
          <div style="margin-top:6px">${best.s.html}</div>
          <div class="small muted" style="margin-top:4px">Máy nghe được: “${esc(best.t)}”</div></div>
          ${ok ? '<button class="btn primary block" id="nx" style="margin-top:10px">Câu tiếp theo</button>' : ''}`;
        const nx = $('#nx'); if (nx) nx.onclick = () => { i++; show(); };
      };
      rec.start();
    };
  }
  show();
}
// So khớp từng từ của câu mẫu với câu nhận được.
function matchScore(target, heard) {
  const t = target.split(/\s+/), h = norm(heard).split(' ');
  const bag = {};
  h.forEach(w => bag[w] = (bag[w] || 0) + 1);
  let hit = 0;
  const html = t.map(raw => {
    const k = norm(raw);
    if (!k) return esc(raw);
    if (bag[k] > 0) { bag[k]--; hit++; return `<span class="wd-ok">${esc(raw)}</span>`; }
    return `<span class="wd-no">${esc(raw)}</span>`;
  }).join(' ');
  return { ratio: hit / t.filter(w => norm(w)).length, html };
}

/* ================= Từ điển ================= */
let dictTopic = 'all', dictLevel = 'all', dictQuery = '';
function dict() {
  const usedTopics = TOPICS.filter(t => WORDS.some(w => w.topic === t.id));
  render(`<h1>Từ điển</h1>
    <input class="input" id="q" type="search" placeholder="Tìm tiếng Anh hoặc tiếng Việt..." value="${esc(dictQuery)}">
    <div class="chips" id="levels" style="margin-bottom:0">
      <button class="chip ${dictLevel === 'all' ? 'on' : ''}" data-l="all">Mọi trình độ (${WORDS.length})</button>
      ${LEVEL_IDS.map(l => `<button class="chip ${dictLevel === l ? 'on' : ''}" data-l="${l}">${l} (${WORDS.filter(w => w.level === l).length})</button>`).join('')}
    </div>
    <div class="chips" id="chips">
      <button class="chip ${dictTopic === 'all' ? 'on' : ''}" data-t="all">Mọi chủ đề</button>
      ${usedTopics.map(t => `<button class="chip ${dictTopic === t.id ? 'on' : ''}" data-t="${t.id}">${t.icon} ${t.name}</button>`).join('')}
    </div>
    <p class="muted small" id="count"></p>
    <div class="card wlist" id="list"></div>`);
  const draw = () => {
    const q = dictQuery.trim().toLowerCase();
    const list = WORDS.filter(w => (dictTopic === 'all' || w.topic === dictTopic) && (dictLevel === 'all' || w.level === dictLevel) &&
      (!q || w.w.toLowerCase().includes(q) || w.vi.toLowerCase().includes(q)));
    $('#count').textContent = list.length + ' từ' + (list.length > 300 ? ' · đang hiện 300 từ đầu, hãy lọc hoặc tìm để thu hẹp' : '');
    const label = { new: 'Chưa học', learning: 'Đang học', known: 'Đã thuộc' };
    $('#list').innerHTML = list.length ? list.slice(0, 300).map(w => `<div class="item">
        <button class="icon-btn" data-say="${esc(w.w)}" aria-label="Nghe">🔊</button>
        <div class="grow"><b>${esc(w.w)}</b> <span class="muted small">${esc(w.ipa)} · ${POS[w.pos]} · ${w.level}</span>
          <div>${esc(w.vi)}</div><div class="ex">${esc(w.ex)} – ${esc(w.exVi)}</div></div>
        <span class="badge ${status(w.id)}">${label[status(w.id)]}</span></div>`).join('')
      : '<p class="muted center">Không tìm thấy từ nào.</p>';
    bindSay();
  };
  $('#q').oninput = e => { dictQuery = e.target.value; draw(); };
  $$('#chips .chip').forEach(c => c.onclick = () => { dictTopic = c.dataset.t; $$('#chips .chip').forEach(x => x.classList.toggle('on', x === c)); draw(); });
  $$('#levels .chip').forEach(c => c.onclick = () => { dictLevel = c.dataset.l; $$('#levels .chip').forEach(x => x.classList.toggle('on', x === c)); draw(); });
  draw();
}

/* ================= Thống kê ================= */
function stats() {
  const learned = learnedWords();
  const known = learned.filter(w => status(w.id) === 'known').length;
  const allDays = new Set([S.log, ...Object.values(S.remote)].flatMap(l => Object.keys(l || {})));
  const totalXP = [...allDays].reduce((a, d) => a + dayStat(d).xp, 0);
  const days = [...allDays].filter(d => dayStat(d).xp > 0).length;
  const t = dayNum();
  const range = Array.from({ length: 14 }, (_, k) => t - 13 + k);
  const max = Math.max(S.settings.goalXP, ...range.map(d => dayStat(d).xp));
  render(`<h1>Thống kê</h1>
    <div class="grid">
      <div class="card"><div class="muted small">Chuỗi hiện tại</div><div class="stat-num">🔥 ${streak()}</div><div class="muted small">Kỷ lục: ${Math.max(S.best, streak())} ngày</div></div>
      <div class="card"><div class="muted small">Từ đã học</div><div class="stat-num">${learned.length}</div><div class="muted small">/ ${WORDS.length} từ</div></div>
      <div class="card"><div class="muted small">Đã thuộc lâu</div><div class="stat-num">${known}</div><div class="muted small">khoảng ôn ≥ 21 ngày</div></div>
      <div class="card"><div class="muted small">Tổng XP</div><div class="stat-num">${totalXP}</div><div class="muted small">${days} ngày có học</div></div>
    </div>
    <div class="card"><h2>XP 14 ngày qua</h2>
      <div class="bars">${range.map(d => { const x = dayStat(d).xp; return `<div class="b ${dayStat(d).g ? 'met' : ''}" title="${dayLabel(d)}: ${x} XP"><i style="height:${x / max * 100}%"></i><span>${dayLabel(d).split('/')[0]}</span></div>`; }).join('')}</div>
      <p class="muted small">Cột xanh lá = ngày đạt mục tiêu ${S.settings.goalXP} XP.</p></div>
    <div class="card"><h2>Tiến độ theo trình độ</h2>
      ${LEVELS.filter(l => LEVEL_IDS.includes(l.id)).map(l => progressRow(l.name, WORDS.filter(w => w.level === l.id))).join('')}
    </div>
    <div class="card"><h2>Tiến độ theo chủ đề</h2>
      ${TOPICS.map(tp => progressRow(tp.icon + ' ' + tp.name, WORDS.filter(w => w.topic === tp.id))).join('')}
    </div>`);
}
function progressRow(label, words) {
  if (!words.length) return '';
  const n = words.filter(w => S.cards[w.id]).length;
  return `<div style="margin:10px 0"><div class="row between small"><span>${label}</span><span class="muted">${n}/${words.length}</span></div>
    <div class="tbar"><div style="width:${n / words.length * 100}%"></div></div></div>`;
}

/* ================= Cài đặt ================= */
function settings() {
  const st = S.settings;
  const opt = (vals, cur, fmt = v => v) => vals.map(v => `<option value="${v}" ${v == cur ? 'selected' : ''}>${fmt(v)}</option>`).join('');
  render(`<h1>Cài đặt</h1>
    <div class="card">
      <h2>Mục tiêu hằng ngày</h2>
      <div class="field"><label for="np">Số từ mới mỗi ngày</label><select id="np">${opt([5, 10, 15, 20, 30], st.newPerDay, v => v + ' từ')}</select></div>
      <div class="field"><label for="gx">Mục tiêu XP mỗi ngày</label><select id="gx">${opt([20, 50, 100, 150, 200], st.goalXP, v => v + ' XP')}</select></div>
      <p class="muted small">Học 1 từ mới = 5 XP · ôn 1 thẻ = 2 XP · trắc nghiệm đúng = 2 XP · điền từ/nghe chép/nói đúng = 3 XP.</p>
    </div>
    <div class="card">
      <h2>Trình độ</h2>
      <div class="field"><label for="lv">Học từ mới ở trình độ</label><select id="lv">${LEVELS.filter(l => LEVEL_IDS.includes(l.id)).map(l =>
        `<option value="${l.id}" ${l.id === st.level ? 'selected' : ''}>${l.name}</option>`).join('')}</select></div>
      <p class="muted small" id="lvdesc">${esc(LEVELS.find(l => l.id === st.level)?.desc || '')}. Học hết trình độ này, app tự chuyển sang trình độ tiếp theo.</p>
      <div class="field"><label for="tp">Khi ôn tập, thỉnh thoảng yêu cầu gõ từ tiếng Anh</label><input type="checkbox" id="tp" ${st.typing ? 'checked' : ''} style="width:22px;height:22px"></div>
    </div>
    <div class="card">
      <h2>Chủ đề ưu tiên</h2>
      <p class="muted small">Từ mới sẽ lấy từ các chủ đề được chọn trước. Không chọn = học lần lượt.</p>
      <div class="checks">${TOPICS.map(t => `<label><input type="checkbox" value="${t.id}" ${st.topics.includes(t.id) ? 'checked' : ''}> ${t.icon} ${t.name}</label>`).join('')}</div>
    </div>
    <div class="card">
      <h2>Phát âm</h2>
      <div class="field"><label for="vc">Giọng đọc</label><select id="vc"><option value="">Tự động — giọng rõ nhất${voices[0] ? ': ' + esc(voices[0].name) : ''}</option>
        ${voices.map((v, i) => `<option value="${esc(v.voiceURI)}" ${v.voiceURI === st.voice ? 'selected' : ''}>${i < 3 && voiceScore(v) >= 60 ? '⭐ ' : ''}${esc(v.name)} (${v.lang})</option>`).join('')}</select></div>
      ${voices.length && voiceScore(voices[0]) < 60 ? `<p class="muted small">Máy này chỉ có giọng đọc cơ bản. Để nghe rõ hơn: trên máy tính dùng <b>Microsoft Edge</b> (có giọng Natural) hoặc Chrome khi có mạng; trên Android cài <b>Speech Services by Google</b>; trên iPhone vào Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói → English và tải giọng <i>Enhanced/Premium</i>.</p>` : ''}
      <div class="field"><label for="rt">Tốc độ đọc: <b id="rtv">${st.rate}</b></label><input type="range" id="rt" min="0.5" max="1.3" step="0.05" value="${st.rate}"></div>
      <button class="btn block" id="test">🔊 Nghe thử</button>
    </div>
    <div class="card">
      <h2>Giao diện</h2>
      <div class="field"><label for="th">Chế độ màu</label><select id="th">${opt(['auto', 'light', 'dark'], st.theme, v => ({ auto: 'Theo hệ thống', light: 'Sáng', dark: 'Tối' })[v])}</select></div>
    </div>
    <div class="card stack" id="syncCard">${syncCardHTML()}</div>
    <div class="card stack">
      <h2>Sao lưu dữ liệu</h2>
      <p class="muted small">Tiến độ lưu ngay trên thiết bị này. Nếu không dùng đồng bộ, có thể chuyển sang máy khác bằng cách Xuất tệp ở máy cũ rồi Nhập ở máy mới.</p>
      <div class="row"><button class="btn" id="exp" style="flex:1">⬇️ Xuất tệp</button><button class="btn" id="imp" style="flex:1">⬆️ Nhập tệp</button></div>
      <input type="file" id="file" accept="application/json,.json" class="hidden">
      <button class="btn ghost block" id="reset" style="color:var(--bad)">Xóa toàn bộ tiến độ</button>
    </div>
    <p class="muted small center">Fong English · ${WORDS.length} từ vựng (${LEVEL_IDS.join(', ')}) · ${PHRASES.length} câu giao tiếp</p>`);

  const set = (k, v) => { st[k] = v; S.settingsT = Date.now(); save(); };
  $('#np').onchange = e => set('newPerDay', +e.target.value);
  $('#gx').onchange = e => set('goalXP', +e.target.value);
  $('#lv').onchange = e => { set('level', e.target.value); settings(); };
  $('#tp').onchange = e => set('typing', e.target.checked);
  $('#vc').onchange = e => { set('voice', e.target.value); say('Hello! Nice to meet you.'); };
  $('#rt').oninput = e => { $('#rtv').textContent = e.target.value; set('rate', +e.target.value); };
  $('#test').onclick = () => say('Hello! Practice makes perfect.');
  $('#th').onchange = e => { set('theme', e.target.value); applyTheme(); };
  $$('.checks input').forEach(c => c.onchange = () => set('topics', $$('.checks input:checked').map(x => x.value)));
  $('#exp').onclick = () => {
    const blob = new Blob([JSON.stringify({ ...S, dev: SY.dev })], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'fong-english-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  $('#imp').onclick = () => $('#file').click();
  $('#file').onchange = async e => {
    try {
      const d = JSON.parse(await e.target.files[0].text());
      if (!d.cards || !d.log) throw new Error();
      if (!confirm('Thay tiến độ hiện tại bằng dữ liệu trong tệp?')) return;
      // Nhật ký trong tệp thuộc về máy đã xuất: giữ nó như nhật ký của máy đó, tránh cộng XP hai lần khi đồng bộ.
      if (d.dev && d.dev !== SY.dev) {
        d.remote = { ...(d.remote || {}), [d.dev]: d.log };
        d.log = d.remote[SY.dev] || {};
        delete d.remote[SY.dev];
      }
      delete d.dev;
      localStorage.setItem(STORE, JSON.stringify(d));
      S = load(); applyTheme(); toast('Đã nhập dữ liệu'); settings();
    } catch (err) { toast('Tệp không hợp lệ'); }
  };
  $('#reset').onclick = () => {
    if (!confirm(SY.token
      ? 'Máy này đang đồng bộ, nên tiến độ sẽ được tải lại từ GitHub ở lần đồng bộ sau. Muốn xóa hẳn, hãy Ngắt kết nối rồi xóa gist "Fong English" trên GitHub. Vẫn xóa tiến độ trên máy này?'
      : 'Xóa toàn bộ tiến độ học? Không thể hoàn tác.')) return;
    localStorage.removeItem(STORE); S = load(); applyTheme(); toast('Đã xóa tiến độ'); settings();
  };
  bindSyncCard();
  if (!voices.length && 'speechSynthesis' in window) setTimeout(() => { if (voices.length && route() === 'settings') settings(); }, 600);
}

/* ================= Đồng bộ qua GitHub Gist ================= */
// Dữ liệu được lưu trong một gist bí mật trên tài khoản GitHub của người dùng.
// Mã truy cập và mã máy chỉ nằm trên từng máy, không có trong tệp sao lưu.
const SYNC_KEY = 'fong-english-sync';   // { token, user, gistId, dev, last, err }
const SYNC_FILE = 'fong-english-sync.json';
const TOKEN_URL = 'https://github.com/settings/tokens/new?scopes=gist&description=Fong%20English';
let SY = {};
try { SY = JSON.parse(localStorage.getItem(SYNC_KEY)) || {}; } catch (e) { /* bỏ qua */ }
if (!SY.dev) { SY.dev = Date.now().toString(36) + Math.random().toString(36).slice(2, 6); saveSync(); }
function saveSync() { try { localStorage.setItem(SYNC_KEY, JSON.stringify(SY)); } catch (e) { /* bỏ qua */ } }

async function gh(path, opts = {}) {
  const r = await fetch('https://api.github.com' + path, {
    ...opts,
    cache: 'no-store',
    headers: { Authorization: 'Bearer ' + SY.token, Accept: 'application/vnd.github+json', ...(opts.body ? { 'Content-Type': 'application/json' } : {}) }
  });
  if (r.status === 401) throw new Error('auth');
  if (!r.ok) throw new Error('http ' + r.status);
  return r.json();
}
function syncDoc() {
  return { v: 1, cards: S.cards, settings: S.settings, settingsT: S.settingsT, best: S.best, logs: { ...S.remote, [SY.dev]: S.log } };
}
function mergeRemote(r) {
  for (const [id, c] of Object.entries(migrateCards(r.cards || {}))) {
    const mine = S.cards[id];
    if (!mine || (c.t || 0) > (mine.t || 0)) S.cards[id] = c;   // giữ bản ôn gần nhất
  }
  S.remote = {};
  for (const [dev, log] of Object.entries(r.logs || {})) if (dev !== SY.dev) S.remote[dev] = log;
  if ((r.settingsT || 0) > (S.settingsT || 0)) { S.settings = { ...DEF.settings, ...r.settings }; S.settingsT = r.settingsT; applyTheme(); }
  S.best = Math.max(S.best, r.best || 0);
}
let syncing = null, syncTimer = null;
function scheduleSync() {
  if (!SY.token) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(syncNow, 5000);
}
function syncNow() {
  clearTimeout(syncTimer); syncTimer = null;
  if (!SY.token) return Promise.resolve();
  return syncing || (syncing = doSync().finally(() => { syncing = null; }));
}
async function doSync() {
  try {
    if (!navigator.onLine) throw new Error('offline');
    if (!SY.gistId) {
      const list = await gh('/gists?per_page=100');
      SY.gistId = list.find(g => g.files[SYNC_FILE])?.id || null;
    }
    if (SY.gistId) {
      let g = null;
      try { g = await gh('/gists/' + SY.gistId); } catch (e) { if (e.message !== 'http 404') throw e; SY.gistId = null; }
      const f = g?.files[SYNC_FILE];
      if (f) mergeRemote(JSON.parse(f.truncated ? await (await fetch(f.raw_url)).text() : f.content));
    }
    const files = { [SYNC_FILE]: { content: JSON.stringify(syncDoc()) } };
    if (SY.gistId) await gh('/gists/' + SY.gistId, { method: 'PATCH', body: JSON.stringify({ files }) });
    else SY.gistId = (await gh('/gists', { method: 'POST', body: JSON.stringify({ description: 'Fong English – dữ liệu đồng bộ tiến độ học', public: false, files }) })).id;
    SY.last = Date.now(); SY.err = '';
    save(false);
    // Vẽ lại các trang chỉ hiển thị số liệu; không làm gián đoạn khi đang học.
    if (['home', 'stats', 'dict'].includes(route())) go();
  } catch (e) {
    SY.err = e.message;
  }
  saveSync();
  const card = $('#syncCard'); if (card) { card.innerHTML = syncCardHTML(); bindSyncCard(); }
}
function syncStatus() {
  if (syncing) return '⏳ Đang đồng bộ...';
  if (SY.err === 'auth') return '⚠️ Mã truy cập không hợp lệ hoặc đã hết hạn. Hãy ngắt kết nối và tạo mã mới.';
  if (SY.err === 'offline') return '📴 Không có mạng, sẽ đồng bộ lại khi có mạng.';
  if (SY.err) return '⚠️ Chưa đồng bộ được (' + esc(SY.err) + '), sẽ thử lại sau.';
  return SY.last ? '✅ Đồng bộ lần cuối lúc ' + new Date(SY.last).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }) : 'Chưa đồng bộ lần nào.';
}
function syncCardHTML() {
  if (SY.token) return `<h2>Đồng bộ giữa các thiết bị</h2>
    <p>Đã kết nối với GitHub <b>${esc(SY.user || '')}</b>.</p>
    <p class="muted small">${syncStatus()}</p>
    <p class="muted small">Tiến độ tự đồng bộ sau mỗi lần học và khi mở app. Dùng cùng mã truy cập trên các máy khác để học tiếp ở đó.</p>
    <div class="row"><button class="btn primary" id="syncNow" style="flex:1">🔄 Đồng bộ ngay</button><button class="btn" id="syncOff">Ngắt kết nối</button></div>`;
  return `<h2>Đồng bộ giữa các thiết bị</h2>
    <p class="muted small">Học trên điện thoại rồi học tiếp trên máy tính. Tiến độ được lưu trong một gist bí mật trên tài khoản GitHub của bạn, miễn phí.</p>
    <ol class="small" style="padding-left:20px;margin:0">
      <li>Mở <a href="${TOKEN_URL}" target="_blank" rel="noopener">trang tạo mã truy cập GitHub</a> (đã chọn sẵn quyền <b>gist</b>).</li>
      <li>Ở mục <i>Expiration</i> chọn <b>No expiration</b> (hoặc thời hạn bạn muốn), rồi bấm <b>Generate token</b> ở cuối trang.</li>
      <li>Sao chép mã (bắt đầu bằng <code>ghp_</code>), dán vào ô dưới đây rồi bấm Kết nối.</li>
      <li>Làm tương tự trên máy kia, có thể dùng chung một mã.</li>
    </ol>
    <input class="input" id="tok" type="password" autocomplete="off" placeholder="ghp_..." spellcheck="false">
    <button class="btn primary block" id="syncOn">Kết nối</button>
    <p class="muted small">Mã chỉ lưu trên máy này và chỉ có quyền đọc/ghi gist. Đừng chia sẻ mã cho người khác.</p>`;
}
function bindSyncCard() {
  const on = $('#syncOn'), now = $('#syncNow'), off = $('#syncOff');
  if (on) on.onclick = async () => {
    const tok = $('#tok').value.trim();
    if (!tok) return toast('Hãy dán mã truy cập');
    on.disabled = true; on.textContent = 'Đang kiểm tra...';
    SY.token = tok;
    try {
      const u = await gh('/user');
      SY.user = u.login; SY.gistId = null; SY.err = ''; saveSync();
      toast('Đã kết nối GitHub ' + u.login);
      await syncNow();
    } catch (e) {
      delete SY.token; saveSync();
      toast(e.message === 'auth' ? 'Mã truy cập không đúng' : 'Không kết nối được GitHub, kiểm tra mạng');
      on.disabled = false; on.textContent = 'Kết nối';
    }
  };
  if (now) now.onclick = () => { now.disabled = true; now.textContent = '⏳ Đang đồng bộ...'; syncNow(); };
  if (off) off.onclick = () => {
    if (!confirm('Ngắt đồng bộ trên máy này? Tiến độ trên máy và trên GitHub vẫn được giữ nguyên.')) return;
    SY = { dev: SY.dev }; saveSync();
    const card = $('#syncCard'); card.innerHTML = syncCardHTML(); bindSyncCard();
  };
}

/* ================= Cập nhật phiên bản ================= */
function showUpdateBanner() {
  if ($('#updateBar')) return;
  const b = document.createElement('div');
  b.id = 'updateBar'; b.className = 'update-bar';
  b.innerHTML = '<span>✨ Có phiên bản mới</span><button class="btn primary">Cập nhật</button>';
  b.querySelector('button').onclick = () => location.reload();
  document.body.append(b);
}

/* ================= Điều hướng ================= */
const routes = { home, learn, review, practice, quiz, cloze, listen, speak: speakPractice, dict, stats, settings };
const route = () => (location.hash.replace(/^#\/?/, '') || 'home').split('?')[0];
function go() {
  keyHandler = null;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  const r = routes[route()] ? route() : 'home';
  const tab = { learn: 'home', review: 'home', quiz: 'practice', cloze: 'practice', listen: 'practice', speak: 'practice' }[r] || r;
  $$('#nav a').forEach(a => a.classList.toggle('active', a.dataset.r === tab));
  routes[r]();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', go);
// Sang ngày mới khi app vẫn mở: vẽ lại trang chủ.
let lastDay = dayNum();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    if (dayNum() !== lastDay) { lastDay = dayNum(); if (route() === 'home') home(); }
    syncNow();                       // lấy tiến độ mới từ máy khác
    swReg?.update();                 // kiểm tra bản mới
  } else if (syncTimer) syncNow();   // sắp rời app: đẩy tiến độ chưa đồng bộ lên
});
window.addEventListener('online', () => syncNow());

let swReg = null;
applyTheme();
go();
syncNow();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  // Service worker mới tiếp quản (đã có bản mới trong bộ nhớ đệm) → mời tải lại.
  // Lần đầu cài (chưa có service worker nào điều khiển trang) thì không cần báo.
  let controlled = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (controlled) showUpdateBanner(); controlled = true; });
  navigator.serviceWorker.register('sw.js').then(r => { swReg = r; });
}
if (navigator.storage?.persist) navigator.storage.persist();
