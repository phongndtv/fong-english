// Nội dung "Tiếng Anh học thuật": mẫu câu theo từng phần bài báo, văn phong trang trọng, rào đón, lỗi thường gặp.
// Trong mẫu câu, từ khóa đặt giữa hai dấu * (vd. "This study *aims* to ...") — dùng cho bài điền từ.
const ACADEMIC = {
  sections: [
    {
      id: 'abstract', name: 'Tóm tắt (Abstract)', icon: '📝',
      desc: "Phần tóm tắt cô đọng toàn bộ bài báo: bối cảnh, mục tiêu, phương pháp, kết quả chính và ý nghĩa. Đây là phần được đọc nhiều nhất, quyết định người đọc có tải bài về hay không.",
      tips: [
        "Độ dài thường 150–250 từ (xem hướng dẫn tác giả của từng tạp chí); nhiều tạp chí yêu cầu tóm tắt có cấu trúc: Background – Methods – Results – Conclusions.",
        "Thì: hiện tại đơn cho bối cảnh và kết luận (Antibiotic resistance is...), quá khứ đơn cho phương pháp và kết quả (Data were collected..., The results revealed...).",
        "Nêu con số cụ thể cho kết quả chính (tỷ lệ, mức tăng, độ chính xác) thay vì chỉ viết chung chung là có cải thiện.",
        "Không trích dẫn tài liệu, không dùng chữ viết tắt chưa định nghĩa, không đưa thông tin không có trong bài.",
        "Viết tóm tắt sau cùng, khi các phần khác đã hoàn chỉnh, để đảm bảo khớp với nội dung bài."
      ],
      moves: [
        { name: 'Nêu bối cảnh', phrases: [
          ["Rice production in the Mekong Delta is increasingly *threatened* by salinity intrusion.", "Sản xuất lúa ở Đồng bằng sông Cửu Long ngày càng bị đe dọa bởi xâm nhập mặn."],
          ["Antibiotic resistance has *emerged* as one of the most serious threats to global public health.", "Kháng kháng sinh đã nổi lên như một trong những mối đe dọa nghiêm trọng nhất đối với sức khỏe cộng đồng toàn cầu."],
          ["Small and medium-sized enterprises play a *crucial* role in the economic growth of developing countries.", "Doanh nghiệp nhỏ và vừa đóng vai trò then chốt trong tăng trưởng kinh tế của các nước đang phát triển."],
          ["Accurate short-term load forecasting is *essential* for the stable operation of smart power grids.", "Dự báo phụ tải ngắn hạn chính xác là thiết yếu cho sự vận hành ổn định của lưới điện thông minh."]
        ]},
        { name: 'Nêu mục tiêu nghiên cứu', phrases: [
          ["This study *aims* to evaluate the effects of biochar on soil fertility in acidic upland fields.", "Nghiên cứu này nhằm đánh giá ảnh hưởng của than sinh học đến độ phì đất ở các ruộng đồi chua."],
          ["The purpose of this paper is to *examine* the relationship between digital literacy and academic performance.", "Mục đích của bài báo là xem xét mối quan hệ giữa năng lực số và kết quả học tập."],
          ["We *sought* to determine whether early mobilization reduces hospital stay after abdominal surgery.", "Chúng tôi tìm cách xác định liệu vận động sớm có rút ngắn thời gian nằm viện sau phẫu thuật bụng hay không."],
          ["This research *investigates* how foreign direct investment influences provincial productivity in Vietnam.", "Nghiên cứu này khảo sát đầu tư trực tiếp nước ngoài ảnh hưởng thế nào đến năng suất cấp tỉnh ở Việt Nam."],
          ["The present study was *designed* to compare three machine learning models for flood prediction.", "Nghiên cứu này được thiết kế để so sánh ba mô hình học máy trong dự báo lũ."]
        ]},
        { name: 'Tóm lược phương pháp', phrases: [
          ["Data were *collected* from 420 households in four coastal provinces between 2021 and 2022.", "Dữ liệu được thu thập từ 420 hộ gia đình ở bốn tỉnh ven biển trong giai đoạn 2021–2022."],
          ["A randomized controlled trial was *conducted* with 160 patients at two district hospitals.", "Một thử nghiệm ngẫu nhiên có đối chứng đã được tiến hành với 160 bệnh nhân tại hai bệnh viện huyện."],
          ["We *employed* a convolutional neural network trained on 12,000 labeled leaf images.", "Chúng tôi sử dụng một mạng nơ-ron tích chập được huấn luyện trên 12.000 ảnh lá đã gán nhãn."],
          ["Panel data from 63 provinces were *analyzed* using a fixed-effects regression model.", "Dữ liệu bảng của 63 tỉnh được phân tích bằng mô hình hồi quy tác động cố định."],
          ["Water samples were *taken* monthly at 15 monitoring stations along the river.", "Mẫu nước được lấy hằng tháng tại 15 trạm quan trắc dọc theo con sông."]
        ]},
        { name: 'Trình bày kết quả chính', phrases: [
          ["The results *revealed* a significant reduction in nitrate leaching under the combined treatment.", "Kết quả cho thấy lượng nitrat bị rửa trôi giảm đáng kể ở nghiệm thức kết hợp."],
          ["Students in the intervention group *outperformed* those in the control group on the final test.", "Sinh viên nhóm can thiệp đạt kết quả tốt hơn nhóm đối chứng trong bài kiểm tra cuối kỳ."],
          ["The proposed model *achieved* an accuracy of 94.2%, exceeding all baseline methods.", "Mô hình đề xuất đạt độ chính xác 94,2%, vượt tất cả các phương pháp cơ sở."],
          ["Household income was positively *associated* with the adoption of drought-tolerant varieties.", "Thu nhập hộ có liên hệ thuận với việc áp dụng các giống chịu hạn."],
          ["No significant *difference* was observed between the two groups in terms of adverse events.", "Không ghi nhận khác biệt có ý nghĩa giữa hai nhóm về các biến cố bất lợi."]
        ]},
        { name: 'Kết luận và ý nghĩa', phrases: [
          ["These findings *highlight* the potential of agroforestry for climate change adaptation in upland areas.", "Những phát hiện này làm nổi bật tiềm năng của nông lâm kết hợp trong thích ứng biến đổi khí hậu ở vùng cao."],
          ["The study *provides* practical guidance for policymakers designing rural credit programs.", "Nghiên cứu cung cấp hướng dẫn thực tiễn cho các nhà hoạch định chính sách khi thiết kế chương trình tín dụng nông thôn."],
          ["Our results *suggest* that low-cost sensors can complement conventional air quality monitoring networks.", "Kết quả của chúng tôi gợi ý rằng cảm biến giá rẻ có thể bổ trợ cho mạng lưới quan trắc chất lượng không khí truyền thống."],
          ["This approach offers a *promising* alternative to chemical pesticides in vegetable production.", "Cách tiếp cận này mở ra một giải pháp thay thế đầy hứa hẹn cho thuốc trừ sâu hóa học trong sản xuất rau."]
        ]}
      ]
    },
    {
      id: 'intro', name: 'Mở đầu (Introduction)', icon: '🚪',
      desc: "Phần mở đầu dẫn người đọc từ bức tranh chung đến vấn đề cụ thể: vì sao chủ đề quan trọng, nghiên cứu trước đã làm gì, còn thiếu gì, và bài báo này đóng góp gì.",
      tips: [
        "Đi theo hình phễu: rộng (tầm quan trọng của lĩnh vực) → hẹp (khoảng trống nghiên cứu) → mục tiêu cụ thể của bài.",
        "Dùng hiện tại hoàn thành cho xu hướng nghiên cứu chung (Numerous studies have demonstrated...), quá khứ đơn khi nêu một nghiên cứu cụ thể (Nguyen et al. (2020) found...).",
        "Khoảng trống nghiên cứu phải được nêu rõ ràng, thường mở đầu bằng However, Despite, To date, little attention...",
        "Câu mục tiêu nên cụ thể, đo lường được; tránh câu mở đầu sáo rỗng kiểu Nowadays, with the development of science and technology...",
        "Thường dài 3–6 đoạn; đoạn cuối có thể giới thiệu cấu trúc bài (phổ biến trong kinh tế, kỹ thuật, CNTT)."
      ],
      moves: [
        { name: 'Xác lập tầm quan trọng của lĩnh vực', phrases: [
          ["Climate change has become one of the most *pressing* challenges facing agriculture worldwide.", "Biến đổi khí hậu đã trở thành một trong những thách thức cấp bách nhất đối với nông nghiệp toàn cầu."],
          ["In recent years, there has been growing *interest* in the use of renewable energy in rural areas.", "Những năm gần đây, việc sử dụng năng lượng tái tạo ở nông thôn ngày càng được quan tâm."],
          ["Type 2 diabetes is a major public health *concern* in Southeast Asia, with prevalence rising rapidly.", "Đái tháo đường type 2 là mối quan ngại lớn về sức khỏe cộng đồng ở Đông Nam Á, với tỷ lệ mắc tăng nhanh."],
          ["Blended learning has been widely *adopted* in higher education institutions over the past decade.", "Học tập kết hợp đã được áp dụng rộng rãi trong các cơ sở giáo dục đại học trong thập kỷ qua."],
          ["Numerous studies have *demonstrated* the benefits of mangrove forests for coastal protection.", "Nhiều nghiên cứu đã chứng minh lợi ích của rừng ngập mặn trong bảo vệ bờ biển."]
        ]},
        { name: 'Điểm qua nghiên cứu trước', phrases: [
          ["Previous research has *focused* mainly on the technical aspects of solar panel efficiency.", "Các nghiên cứu trước chủ yếu tập trung vào khía cạnh kỹ thuật của hiệu suất tấm pin mặt trời."],
          ["Several authors have *reported* that microcredit improves the welfare of poor households.", "Một số tác giả đã báo cáo rằng tín dụng vi mô cải thiện phúc lợi của hộ nghèo."],
          ["Earlier studies have *shown* that soil organic carbon declines under continuous monoculture.", "Các nghiên cứu trước đây đã cho thấy cacbon hữu cơ trong đất suy giảm khi độc canh liên tục."],
          ["Much of the existing literature has *examined* this issue in the context of developed countries.", "Phần lớn tài liệu hiện có đã xem xét vấn đề này trong bối cảnh các nước phát triển."]
        ]},
        { name: 'Chỉ ra khoảng trống nghiên cứu', phrases: [
          ["However, little *attention* has been paid to the role of women in farm decision-making.", "Tuy nhiên, vai trò của phụ nữ trong việc ra quyết định sản xuất nông nghiệp còn ít được chú ý."],
          ["To date, no study has *addressed* the long-term effects of aquaculture effluent on groundwater.", "Cho đến nay, chưa có nghiên cứu nào giải quyết tác động dài hạn của nước thải nuôi trồng thủy sản đến nước ngầm."],
          ["Despite these advances, the mechanisms underlying this resistance remain poorly *understood*.", "Mặc dù có những tiến bộ này, cơ chế của tính kháng này vẫn chưa được hiểu rõ."],
          ["Most existing models *fail* to account for the spatial heterogeneity of rainfall.", "Hầu hết các mô hình hiện có không tính đến tính không đồng nhất về không gian của lượng mưa."],
          ["Empirical evidence on this topic from low-income countries is still *scarce*.", "Bằng chứng thực nghiệm về chủ đề này từ các nước thu nhập thấp vẫn còn khan hiếm."]
        ]},
        { name: 'Nêu mục tiêu và đóng góp', phrases: [
          ["The present study *seeks* to fill this gap by analyzing a nationwide household survey.", "Nghiên cứu này tìm cách lấp khoảng trống đó bằng việc phân tích một cuộc điều tra hộ gia đình toàn quốc."],
          ["This paper makes three main *contributions* to the literature on sustainable supply chains.", "Bài báo có ba đóng góp chính cho các nghiên cứu về chuỗi cung ứng bền vững."],
          ["To the best of our knowledge, this is the first study to *apply* deep learning to shrimp disease detection.", "Theo hiểu biết của chúng tôi, đây là nghiên cứu đầu tiên ứng dụng học sâu vào phát hiện bệnh tôm."],
          ["Specifically, this study *attempts* to answer the following two research questions.", "Cụ thể, nghiên cứu này cố gắng trả lời hai câu hỏi nghiên cứu sau."],
          ["The findings are *expected* to inform irrigation planning in water-scarce regions.", "Kết quả nghiên cứu được kỳ vọng sẽ cung cấp cơ sở cho quy hoạch thủy lợi ở các vùng khan hiếm nước."]
        ]},
        { name: 'Giới thiệu cấu trúc bài', phrases: [
          ["The remainder of this paper is *organized* as follows.", "Phần còn lại của bài báo được tổ chức như sau."],
          ["Section 2 *reviews* the relevant literature and develops the research hypotheses.", "Mục 2 tổng quan các tài liệu liên quan và xây dựng các giả thuyết nghiên cứu."],
          ["The data and methods are *described* in Section 3, followed by the results in Section 4.", "Dữ liệu và phương pháp được mô tả ở Mục 3, tiếp theo là kết quả ở Mục 4."],
          ["Finally, Section 5 *concludes* the paper and outlines directions for future research.", "Cuối cùng, Mục 5 kết luận bài báo và nêu các hướng nghiên cứu tiếp theo."]
        ]}
      ]
    },
    {
      id: 'review', name: 'Tổng quan tài liệu (Literature review)', icon: '📚',
      desc: "Phần tổng quan hệ thống hóa các khái niệm, lý thuyết và kết quả nghiên cứu trước, so sánh – đánh giá chúng để làm rõ khoảng trống mà bài báo hướng tới.",
      tips: [
        "Tổ chức theo chủ đề hoặc theo biến số, không liệt kê từng bài một theo kiểu A nói..., B nói..., C nói...",
        "Tổng hợp và đánh giá, không chỉ tóm tắt: chỉ ra điểm thống nhất, mâu thuẫn và hạn chế của các nghiên cứu trước.",
        "Đa dạng động từ trích dẫn: found, reported, argued, observed, concluded, noted, confirmed; chú ý nghĩa khác nhau (argue = lập luận, chưa chắc đã đúng).",
        "Ưu tiên tài liệu mới (5–10 năm gần đây) và các tạp chí uy tín; diễn đạt lại bằng lời của mình, tránh đạo văn.",
        "Kết thúc phần tổng quan bằng khoảng trống nghiên cứu hoặc giả thuyết, nối sang phần phương pháp."
      ],
      moves: [
        { name: 'Giới thiệu khái niệm và lý thuyết', phrases: [
          ["Food security is commonly *defined* as access by all people at all times to sufficient, safe food.", "An ninh lương thực thường được định nghĩa là việc mọi người luôn tiếp cận được đủ thực phẩm an toàn."],
          ["The technology acceptance model has been widely *used* to explain users’ intention to adopt new systems.", "Mô hình chấp nhận công nghệ được sử dụng rộng rãi để giải thích ý định áp dụng hệ thống mới của người dùng."],
          ["This study is *grounded* in the theory of planned behavior proposed by Ajzen (1991).", "Nghiên cứu này dựa trên lý thuyết hành vi có kế hoạch do Ajzen (1991) đề xuất."],
          ["The concept of resilience was originally *developed* in ecology and later extended to social systems.", "Khái niệm khả năng chống chịu ban đầu được phát triển trong sinh thái học và sau đó mở rộng sang các hệ thống xã hội."]
        ]},
        { name: 'Tóm lược và trích dẫn nghiên cứu', phrases: [
          ["Nguyen et al. (2020) *found* that drip irrigation reduced water use by 30% without lowering yield.", "Nguyen và cộng sự (2020) nhận thấy tưới nhỏ giọt giảm 30% lượng nước sử dụng mà không làm giảm năng suất."],
          ["According to Smith (2018), urban heat islands are *intensified* by the loss of green space.", "Theo Smith (2018), hiện tượng đảo nhiệt đô thị bị gia tăng do mất không gian xanh."],
          ["A recent meta-analysis *concluded* that mobile health interventions modestly improve medication adherence.", "Một phân tích gộp gần đây kết luận rằng các can thiệp y tế di động cải thiện ở mức vừa phải việc tuân thủ dùng thuốc."],
          ["Several studies have *confirmed* the positive effect of training on technical efficiency.", "Nhiều nghiên cứu đã khẳng định tác động tích cực của tập huấn đến hiệu quả kỹ thuật."],
          ["Tran and Le (2019) *argued* that land fragmentation limits mechanization in northern Vietnam.", "Tran và Le (2019) lập luận rằng tình trạng manh mún đất đai hạn chế cơ giới hóa ở miền Bắc Việt Nam."]
        ]},
        { name: 'So sánh, đối chiếu các nghiên cứu', phrases: [
          ["In contrast, Kim (2021) *observed* no significant effect of class size on student achievement.", "Ngược lại, Kim (2021) không quan sát thấy tác động đáng kể của sĩ số lớp đến thành tích học sinh."],
          ["These findings are *consistent* with those of earlier studies conducted in Thailand and Indonesia.", "Những phát hiện này nhất quán với kết quả của các nghiên cứu trước đây ở Thái Lan và Indonesia."],
          ["Similarly, Garcia (2017) *noted* a strong link between road access and market participation.", "Tương tự, Garcia (2017) ghi nhận mối liên hệ chặt chẽ giữa khả năng tiếp cận đường sá và việc tham gia thị trường."],
          ["However, the evidence remains *inconclusive*, with some studies reporting negative effects.", "Tuy nhiên, bằng chứng vẫn chưa thống nhất, khi một số nghiên cứu báo cáo tác động tiêu cực."],
          ["Results from laboratory experiments *differ* considerably from those obtained under field conditions.", "Kết quả thí nghiệm trong phòng khác biệt đáng kể so với kết quả thu được ở điều kiện đồng ruộng."]
        ]},
        { name: 'Đánh giá và tổng hợp', phrases: [
          ["A major *limitation* of these studies is their reliance on cross-sectional data.", "Một hạn chế lớn của các nghiên cứu này là phụ thuộc vào dữ liệu chéo."],
          ["Most of these studies were *conducted* in temperate climates, which limits their generalizability.", "Phần lớn các nghiên cứu này được thực hiện ở vùng khí hậu ôn đới, làm hạn chế khả năng khái quát hóa."],
          ["Taken together, the literature *indicates* that institutional factors strongly shape adoption decisions.", "Nhìn chung, các tài liệu cho thấy yếu tố thể chế chi phối mạnh quyết định áp dụng."],
          ["Few studies have *combined* remote sensing data with field surveys to assess crop damage.", "Rất ít nghiên cứu kết hợp dữ liệu viễn thám với khảo sát thực địa để đánh giá thiệt hại cây trồng."],
          ["Overall, existing research *lacks* a systematic framework for evaluating digital transformation in schools.", "Nhìn chung, các nghiên cứu hiện có còn thiếu một khung đánh giá có hệ thống về chuyển đổi số trong trường học."]
        ]}
      ]
    },
    {
      id: 'methods', name: 'Phương pháp (Methods)', icon: '🔬',
      desc: "Phần phương pháp mô tả đủ chi tiết địa bàn, đối tượng, thiết kế, cách thu thập và phân tích dữ liệu để người khác có thể lặp lại nghiên cứu.",
      tips: [
        "Dùng quá khứ đơn, thể bị động rất phổ biến (Samples were collected..., Data were analyzed...); vẫn có thể dùng We khi muốn rõ ràng, tùy tạp chí.",
        "Chia tiểu mục rõ ràng: khu vực nghiên cứu, thiết kế, thu thập dữ liệu, phân tích thống kê, đạo đức nghiên cứu.",
        "Ghi đầy đủ thông số: cỡ mẫu, đơn vị đo, tên và phiên bản phần mềm, tên thiết bị và hãng sản xuất, tiêu chuẩn phân tích.",
        "Phương pháp đã công bố thì trích dẫn tài liệu gốc, chỉ mô tả phần điều chỉnh, không chép lại nguyên văn.",
        "Không trình bày kết quả trong phần này."
      ],
      moves: [
        { name: 'Mô tả địa bàn và đối tượng nghiên cứu', phrases: [
          ["The study was *conducted* in Ben Tre Province, located in the coastal zone of the Mekong Delta.", "Nghiên cứu được thực hiện tại tỉnh Bến Tre, thuộc vùng ven biển Đồng bằng sông Cửu Long."],
          ["Participants were *recruited* from three public universities in Hanoi through convenience sampling.", "Người tham gia được tuyển chọn từ ba trường đại học công lập ở Hà Nội theo phương pháp chọn mẫu thuận tiện."],
          ["The study area is *characterized* by a tropical monsoon climate with a distinct dry season.", "Khu vực nghiên cứu có đặc trưng khí hậu nhiệt đới gió mùa với mùa khô rõ rệt."],
          ["Patients aged 18 years or older who *met* the inclusion criteria were enrolled.", "Bệnh nhân từ 18 tuổi trở lên đáp ứng tiêu chí lựa chọn được đưa vào nghiên cứu."],
          ["A total of 350 firms were randomly *selected* from the national enterprise census.", "Tổng cộng 350 doanh nghiệp được chọn ngẫu nhiên từ cuộc tổng điều tra doanh nghiệp quốc gia."]
        ]},
        { name: 'Thiết kế và quy trình thí nghiệm', phrases: [
          ["The experiment was *arranged* in a randomized complete block design with four replications.", "Thí nghiệm được bố trí theo kiểu khối hoàn toàn ngẫu nhiên với bốn lần lặp lại."],
          ["Seedlings were *transplanted* into plastic pots containing 5 kg of sterilized soil.", "Cây con được cấy vào chậu nhựa chứa 5 kg đất đã khử trùng."],
          ["A semi-structured questionnaire was *developed* based on the literature and pilot interviews.", "Bảng hỏi bán cấu trúc được xây dựng dựa trên tài liệu và các cuộc phỏng vấn thử."],
          ["Each treatment was *replicated* three times to ensure the reliability of the measurements.", "Mỗi nghiệm thức được lặp lại ba lần để đảm bảo độ tin cậy của phép đo."],
          ["Prior to the main survey, the questionnaire was *pretested* with 30 respondents.", "Trước cuộc khảo sát chính, bảng hỏi được thử nghiệm với 30 người trả lời."]
        ]},
        { name: 'Thu thập dữ liệu và đo lường', phrases: [
          ["Soil pH was *measured* in a 1:2.5 soil-to-water suspension using a glass electrode.", "pH đất được đo trong huyền phù đất:nước tỷ lệ 1:2,5 bằng điện cực thủy tinh."],
          ["Plant height and leaf area were *recorded* at 30, 60 and 90 days after sowing.", "Chiều cao cây và diện tích lá được ghi nhận vào các thời điểm 30, 60 và 90 ngày sau gieo."],
          ["In-depth interviews were *audio-recorded* and transcribed verbatim for analysis.", "Các cuộc phỏng vấn sâu được ghi âm và gỡ băng nguyên văn để phân tích."],
          ["Daily meteorological data were *obtained* from the National Center for Hydro-Meteorological Forecasting.", "Số liệu khí tượng hằng ngày được lấy từ Trung tâm Dự báo Khí tượng Thủy văn Quốc gia."],
          ["Each item was *rated* on a five-point Likert scale ranging from strongly disagree to strongly agree.", "Mỗi mục hỏi được đánh giá trên thang Likert 5 mức, từ rất không đồng ý đến rất đồng ý."]
        ]},
        { name: 'Phân tích dữ liệu', phrases: [
          ["Statistical analyses were *performed* using R version 4.3.1.", "Các phân tích thống kê được thực hiện bằng phần mềm R phiên bản 4.3.1."],
          ["Differences among treatments were *tested* by one-way ANOVA followed by Tukey’s post hoc test.", "Sự khác biệt giữa các nghiệm thức được kiểm định bằng ANOVA một nhân tố, sau đó là kiểm định hậu kiểm Tukey."],
          ["Thematic analysis was *applied* to identify recurring patterns in the interview data.", "Phân tích chủ đề được áp dụng để xác định các khuôn mẫu lặp lại trong dữ liệu phỏng vấn."],
          ["Model performance was *evaluated* using the root mean square error and the coefficient of determination.", "Hiệu năng mô hình được đánh giá bằng sai số căn quân phương và hệ số xác định."],
          ["A p-value of less than 0.05 was *considered* statistically significant.", "Giá trị p nhỏ hơn 0,05 được coi là có ý nghĩa thống kê."]
        ]},
        { name: 'Đạo đức nghiên cứu', phrases: [
          ["The study protocol was *approved* by the Institutional Review Board of the participating hospital.", "Đề cương nghiên cứu đã được Hội đồng Đạo đức của bệnh viện tham gia phê duyệt."],
          ["Written informed *consent* was obtained from all participants before data collection.", "Tất cả người tham gia đã ký phiếu đồng ý tham gia trước khi thu thập dữ liệu."],
          ["All personal information was *anonymized* to protect the confidentiality of respondents.", "Mọi thông tin cá nhân đều được ẩn danh để bảo mật cho người trả lời."],
          ["Participants were *informed* that they could withdraw from the study at any time without penalty.", "Người tham gia được thông báo rằng họ có thể rút khỏi nghiên cứu bất cứ lúc nào mà không bị ảnh hưởng."]
        ]}
      ]
    },
    {
      id: 'results', name: 'Kết quả (Results)', icon: '📊',
      desc: "Phần kết quả trình bày khách quan những gì nghiên cứu tìm thấy, thường kèm bảng và hình, chưa đi sâu giải thích nguyên nhân.",
      tips: [
        "Dùng quá khứ đơn để mô tả kết quả (Yield increased...), hiện tại đơn khi dẫn chiếu bảng/hình (Table 2 presents..., As shown in Figure 3...).",
        "Không lặp lại toàn bộ số liệu trong bảng; văn bản chỉ nêu xu hướng chính và con số quan trọng nhất.",
        "Báo cáo thống kê đầy đủ: giá trị trung bình ± độ lệch chuẩn, giá trị p, khoảng tin cậy, cỡ mẫu.",
        "Sắp xếp kết quả theo thứ tự mục tiêu hoặc câu hỏi nghiên cứu; báo cáo cả kết quả không có ý nghĩa thống kê.",
        "Tránh giải thích, bình luận dài (để cho phần Thảo luận), trừ khi tạp chí gộp Results and Discussion."
      ],
      moves: [
        { name: 'Dẫn chiếu bảng, hình', phrases: [
          ["Table 2 *presents* the descriptive statistics of the main variables.", "Bảng 2 trình bày thống kê mô tả của các biến chính."],
          ["As *shown* in Figure 3, nitrate concentrations peaked during the rainy season.", "Như thể hiện ở Hình 3, nồng độ nitrat đạt đỉnh trong mùa mưa."],
          ["The distribution of respondents by age and gender is *summarized* in Table 1.", "Phân bố người trả lời theo tuổi và giới tính được tóm tắt trong Bảng 1."],
          ["Figure 4 *illustrates* the changes in land use between 2000 and 2020.", "Hình 4 minh họa những thay đổi trong sử dụng đất giai đoạn 2000–2020."],
          ["Detailed results of the regression analysis are *provided* in the Supplementary Material.", "Kết quả chi tiết của phân tích hồi quy được cung cấp trong Tài liệu bổ sung."]
        ]},
        { name: 'Báo cáo kết quả chính', phrases: [
          ["Grain yield *increased* significantly with increasing nitrogen rates up to 120 kg/ha.", "Năng suất hạt tăng đáng kể khi tăng lượng đạm bón đến mức 120 kg/ha."],
          ["The mean score of the experimental group was considerably *higher* than that of the control group.", "Điểm trung bình của nhóm thực nghiệm cao hơn đáng kể so với nhóm đối chứng."],
          ["Approximately two-thirds of the respondents *reported* using social media for learning purposes.", "Khoảng hai phần ba người trả lời cho biết có sử dụng mạng xã hội cho mục đích học tập."],
          ["The removal efficiency of the filter *reached* 92% after 48 hours of operation.", "Hiệu suất loại bỏ của bộ lọc đạt 92% sau 48 giờ vận hành."],
          ["Farm size had a positive and statistically *significant* effect on technical efficiency.", "Quy mô trang trại có tác động thuận và có ý nghĩa thống kê đến hiệu quả kỹ thuật."]
        ]},
        { name: 'So sánh và mô tả xu hướng', phrases: [
          ["Compared with the control, the biochar treatment *reduced* methane emissions by 27%.", "So với đối chứng, nghiệm thức than sinh học làm giảm 27% lượng phát thải mêtan."],
          ["Electricity consumption *peaked* in July and declined steadily thereafter.", "Mức tiêu thụ điện đạt đỉnh vào tháng Bảy và giảm dần đều sau đó."],
          ["Urban respondents were more *likely* than rural respondents to use online banking services.", "Người trả lời ở thành thị có xu hướng sử dụng ngân hàng trực tuyến nhiều hơn người ở nông thôn."],
          ["A strong positive *correlation* was found between rainfall and dengue incidence (r = 0.78).", "Có tương quan thuận chặt giữa lượng mưa và tỷ lệ mắc sốt xuất huyết (r = 0,78)."],
          ["The error rate *decreased* sharply as the size of the training dataset grew.", "Tỷ lệ lỗi giảm mạnh khi kích thước tập dữ liệu huấn luyện tăng lên."]
        ]},
        { name: 'Kết quả ngoài dự đoán hoặc không có ý nghĩa', phrases: [
          ["Contrary to our expectations, age had no significant *effect* on willingness to pay.", "Trái với kỳ vọng, tuổi không có tác động đáng kể đến mức sẵn lòng chi trả."],
          ["Interestingly, the lowest yields were *recorded* in plots receiving the highest irrigation volume.", "Điều đáng chú ý là năng suất thấp nhất lại ghi nhận ở các ô được tưới nhiều nước nhất."],
          ["Surprisingly, female students *scored* lower on the pretest but higher on the posttest.", "Bất ngờ là nữ sinh viên đạt điểm thấp hơn ở bài kiểm tra đầu vào nhưng cao hơn ở bài kiểm tra cuối."],
          ["No significant *interaction* was detected between temperature and humidity.", "Không phát hiện tương tác có ý nghĩa giữa nhiệt độ và độ ẩm."]
        ]}
      ]
    },
    {
      id: 'discussion', name: 'Thảo luận (Discussion)', icon: '💬',
      desc: "Phần thảo luận diễn giải ý nghĩa của kết quả, so sánh với nghiên cứu trước, giải thích nguyên nhân, nêu hàm ý thực tiễn và thừa nhận hạn chế.",
      tips: [
        "Mở đầu bằng việc nhắc lại ngắn gọn phát hiện chính gắn với mục tiêu, không lặp lại số liệu chi tiết.",
        "Dùng hiện tại đơn để diễn giải và khái quát (This suggests..., These findings indicate...), quá khứ đơn khi nhắc lại kết quả của mình.",
        "Rào đón hợp lý khi giải thích nguyên nhân: may, might, could, possibly, it is likely that...",
        "Luôn so sánh với ít nhất vài nghiên cứu trước, cả nghiên cứu ủng hộ lẫn trái ngược, và giải thích vì sao khác biệt.",
        "Thừa nhận hạn chế một cách trung thực nhưng ngắn gọn, kèm cách khắc phục hoặc hướng nghiên cứu tiếp."
      ],
      moves: [
        { name: 'Nhắc lại phát hiện chính', phrases: [
          ["The present study *demonstrates* that intercropping can increase land productivity without additional inputs.", "Nghiên cứu này chứng minh rằng xen canh có thể tăng năng suất đất mà không cần thêm đầu vào."],
          ["The main finding of this study is that teacher feedback strongly *predicts* student engagement.", "Phát hiện chính của nghiên cứu là phản hồi của giáo viên dự báo mạnh mức độ tham gia của học sinh."],
          ["Our results *confirm* the hypothesis that access to credit enhances technology adoption.", "Kết quả của chúng tôi khẳng định giả thuyết rằng tiếp cận tín dụng thúc đẩy việc áp dụng công nghệ."],
          ["This study *showed* that the proposed algorithm reduces computation time by nearly half.", "Nghiên cứu này cho thấy thuật toán đề xuất giảm gần một nửa thời gian tính toán."]
        ]},
        { name: 'So sánh với nghiên cứu trước', phrases: [
          ["This finding is in *agreement* with the results reported by Pham et al. (2019).", "Phát hiện này phù hợp với kết quả do Pham và cộng sự (2019) báo cáo."],
          ["Our results are *comparable* to those obtained in similar agroecological zones of Thailand.", "Kết quả của chúng tôi tương đương với kết quả ở các vùng sinh thái nông nghiệp tương tự của Thái Lan."],
          ["Unlike previous studies, we *found* no evidence of a gender gap in digital skills.", "Khác với các nghiên cứu trước, chúng tôi không tìm thấy bằng chứng về khoảng cách giới trong kỹ năng số."],
          ["These results *contradict* the widely held view that larger farms are always more efficient.", "Kết quả này trái ngược với quan điểm phổ biến rằng trang trại lớn hơn luôn hiệu quả hơn."],
          ["This observation *supports* earlier claims that mangrove restoration reduces coastal erosion.", "Quan sát này ủng hộ các nhận định trước đây rằng phục hồi rừng ngập mặn giúp giảm xói lở bờ biển."]
        ]},
        { name: 'Giải thích kết quả', phrases: [
          ["This increase may be *attributed* to the improved nutrient availability in amended soils.", "Sự gia tăng này có thể là do lượng dinh dưỡng dễ tiêu được cải thiện ở đất đã được cải tạo."],
          ["One possible *explanation* for this result is the short duration of the intervention.", "Một cách giải thích khả dĩ cho kết quả này là thời gian can thiệp ngắn."],
          ["The lower efficiency could be *explained* by the high moisture content of the raw material.", "Hiệu suất thấp hơn có thể được giải thích bởi độ ẩm cao của nguyên liệu thô."],
          ["A plausible *reason* is that older farmers have more experience in managing pest outbreaks.", "Một lý do hợp lý là nông dân lớn tuổi có nhiều kinh nghiệm hơn trong xử lý dịch hại."],
          ["This discrepancy might *reflect* differences in sampling methods and study periods.", "Sự khác biệt này có thể phản ánh sự khác nhau về phương pháp lấy mẫu và thời gian nghiên cứu."]
        ]},
        { name: 'Nêu hàm ý thực tiễn và chính sách', phrases: [
          ["These findings have important *implications* for the design of rural extension services.", "Những phát hiện này có hàm ý quan trọng cho việc thiết kế dịch vụ khuyến nông."],
          ["From a practical perspective, hospital managers should *consider* expanding telemedicine services.", "Về mặt thực tiễn, các nhà quản lý bệnh viện nên cân nhắc mở rộng dịch vụ y tế từ xa."],
          ["The results *imply* that subsidies alone are insufficient to promote organic farming.", "Kết quả hàm ý rằng chỉ trợ cấp thôi là chưa đủ để thúc đẩy nông nghiệp hữu cơ."],
          ["Policymakers could *benefit* from integrating climate projections into land-use planning.", "Các nhà hoạch định chính sách có thể hưởng lợi từ việc lồng ghép kịch bản khí hậu vào quy hoạch sử dụng đất."]
        ]},
        { name: 'Thừa nhận hạn chế', phrases: [
          ["Several *limitations* of this study should be acknowledged when interpreting the results.", "Cần thừa nhận một số hạn chế của nghiên cứu khi diễn giải kết quả."],
          ["First, the cross-sectional design does not *allow* us to infer causal relationships.", "Thứ nhất, thiết kế cắt ngang không cho phép chúng tôi suy luận quan hệ nhân quả."],
          ["The relatively small sample size may *limit* the generalizability of our findings.", "Cỡ mẫu tương đối nhỏ có thể hạn chế khả năng khái quát hóa của kết quả."],
          ["Self-reported data are *subject* to recall bias and social desirability bias.", "Dữ liệu tự báo cáo dễ bị sai lệch do hồi tưởng và do mong muốn được đánh giá tốt."],
          ["Moreover, the study was *restricted* to a single province, which may not represent the whole country.", "Hơn nữa, nghiên cứu chỉ giới hạn trong một tỉnh, có thể không đại diện cho cả nước."]
        ]}
      ]
    },
    {
      id: 'conclusion', name: 'Kết luận (Conclusion)', icon: '🏁',
      desc: "Phần kết luận tổng kết câu trả lời cho câu hỏi nghiên cứu, khẳng định đóng góp, đưa ra khuyến nghị và hướng nghiên cứu tiếp theo.",
      tips: [
        "Ngắn gọn (thường 1–3 đoạn); không đưa kết quả hoặc tài liệu trích dẫn mới.",
        "Không chép lại phần tóm tắt; nhấn mạnh ý nghĩa và đóng góp hơn là liệt kê lại số liệu.",
        "Thì: quá khứ đơn hoặc hiện tại hoàn thành để tổng kết nghiên cứu (This study examined..., This research has established...), hiện tại đơn cho kết luận chung.",
        "Khuyến nghị phải xuất phát từ kết quả của chính nghiên cứu, cụ thể cho đối tượng nào (nông dân, nhà quản lý, nhà hoạch định chính sách).",
        "Hướng nghiên cứu tiếp theo nên cụ thể, thường gắn với các hạn chế đã nêu."
      ],
      moves: [
        { name: 'Tổng kết nghiên cứu', phrases: [
          ["This study *examined* the impact of climate variability on coffee yields in the Central Highlands.", "Nghiên cứu này đã xem xét tác động của biến động khí hậu đến năng suất cà phê ở Tây Nguyên."],
          ["In summary, the integrated model *outperformed* conventional approaches in predicting flood extent.", "Tóm lại, mô hình tích hợp cho kết quả tốt hơn các cách tiếp cận truyền thống trong dự báo phạm vi ngập lũ."],
          ["Overall, the findings *indicate* that peer tutoring improves both achievement and motivation.", "Nhìn chung, kết quả cho thấy việc học kèm đồng đẳng cải thiện cả thành tích lẫn động lực học tập."],
          ["This research has *established* a clear link between air pollution and childhood asthma in Hanoi.", "Nghiên cứu này đã xác lập mối liên hệ rõ ràng giữa ô nhiễm không khí và bệnh hen ở trẻ em tại Hà Nội."]
        ]},
        { name: 'Khẳng định đóng góp', phrases: [
          ["This study *contributes* to the literature by providing evidence from a lower-middle-income country.", "Nghiên cứu đóng góp cho các tài liệu hiện có bằng việc cung cấp bằng chứng từ một quốc gia thu nhập trung bình thấp."],
          ["The proposed framework can be *extended* to other types of renewable energy systems.", "Khung phân tích đề xuất có thể mở rộng cho các loại hệ thống năng lượng tái tạo khác."],
          ["Methodologically, the study *introduces* a low-cost approach to monitoring soil moisture.", "Về phương pháp luận, nghiên cứu giới thiệu một cách tiếp cận chi phí thấp để giám sát độ ẩm đất."],
          ["These insights *advance* our understanding of how farmers respond to market shocks.", "Những hiểu biết này góp phần nâng cao nhận thức về cách nông dân phản ứng trước các cú sốc thị trường."]
        ]},
        { name: 'Đưa ra khuyến nghị', phrases: [
          ["We *recommend* that local authorities invest in climate-resilient irrigation infrastructure.", "Chúng tôi khuyến nghị chính quyền địa phương đầu tư vào hạ tầng thủy lợi có khả năng chống chịu khí hậu."],
          ["It is *advisable* for universities to provide training in academic writing for doctoral students.", "Các trường đại học nên tổ chức đào tạo viết học thuật cho nghiên cứu sinh."],
          ["Farmers should be *encouraged* to adopt integrated pest management practices.", "Cần khuyến khích nông dân áp dụng các biện pháp quản lý dịch hại tổng hợp."],
          ["Government agencies should *prioritize* support for women-led small businesses in rural areas.", "Các cơ quan nhà nước nên ưu tiên hỗ trợ các doanh nghiệp nhỏ do phụ nữ làm chủ ở nông thôn."]
        ]},
        { name: 'Đề xuất hướng nghiên cứu tiếp theo', phrases: [
          ["Future research should *explore* the long-term effects of these interventions.", "Các nghiên cứu tương lai nên khám phá tác động dài hạn của những can thiệp này."],
          ["Further studies are *needed* to validate the model with data from other river basins.", "Cần thêm các nghiên cứu để kiểm chứng mô hình với dữ liệu từ các lưu vực sông khác."],
          ["It would be *interesting* to examine whether these patterns hold in urban settings.", "Sẽ rất đáng quan tâm nếu xem xét liệu các quy luật này có đúng ở khu vực đô thị hay không."],
          ["Longitudinal studies could *provide* deeper insight into the causal mechanisms involved.", "Các nghiên cứu theo dõi dọc có thể mang lại hiểu biết sâu hơn về các cơ chế nhân quả liên quan."],
          ["Future work will *focus* on integrating real-time sensor data into the forecasting system.", "Công việc tiếp theo sẽ tập trung tích hợp dữ liệu cảm biến thời gian thực vào hệ thống dự báo."]
        ]}
      ]
    },
    {
      id: 'letters', name: 'Thư gửi tạp chí & phản hồi phản biện (Cover letter & response to reviewers)', icon: '✉️',
      desc: "Thư gửi kèm bản thảo giới thiệu bài báo với biên tập viên; thư phản hồi trả lời từng ý kiến phản biện một cách lịch sự, rõ ràng và có dẫn chứng.",
      tips: [
        "Thư gửi kèm (cover letter) dài khoảng 1 trang: tên bài, loại bài, điểm mới chính, vì sao phù hợp với tạp chí, các cam kết (chưa công bố, không xung đột lợi ích).",
        "Gửi đích danh biên tập viên nếu biết tên (Dear Dr. ...,), tránh Dear Sir/Madam khi có thể.",
        "Thư phản hồi phản biện: chép lại từng ý kiến, trả lời ngay bên dưới, nêu rõ đã sửa gì và ở đâu (trang, dòng).",
        "Luôn lịch sự và cảm ơn, kể cả khi không đồng ý; khi bất đồng phải đưa lý do và tài liệu dẫn chứng thuyết phục.",
        "Đánh dấu thay đổi trong bản thảo sửa (tô màu hoặc track changes) để biên tập viên dễ kiểm tra."
      ],
      moves: [
        { name: 'Giới thiệu bản thảo', phrases: [
          ["Please find *enclosed* our manuscript entitled Effects of Biochar on Rice Yield in Acid Sulfate Soils.", "Xin gửi kèm theo đây bản thảo của chúng tôi có tiêu đề Ảnh hưởng của than sinh học đến năng suất lúa trên đất phèn."],
          ["We wish to *submit* an original research article for consideration for publication in your journal.", "Chúng tôi xin gửi một bài báo nghiên cứu gốc để tạp chí xem xét đăng."],
          ["This manuscript *reports* a field experiment on water-saving irrigation in the Red River Delta.", "Bản thảo này báo cáo một thí nghiệm đồng ruộng về tưới tiết kiệm nước ở Đồng bằng sông Hồng."],
          ["We believe our findings will be of *interest* to the readers of your journal.", "Chúng tôi tin rằng kết quả nghiên cứu sẽ được độc giả của tạp chí quan tâm."]
        ]},
        { name: 'Cam kết và khai báo', phrases: [
          ["This manuscript has not been published and is not under *consideration* elsewhere.", "Bản thảo này chưa được công bố và không đang được xem xét ở nơi khác."],
          ["All authors have *approved* the final version of the manuscript and agree with its submission.", "Tất cả tác giả đã phê duyệt phiên bản cuối cùng của bản thảo và đồng ý gửi đăng."],
          ["The authors *declare* that they have no competing interests.", "Các tác giả cam kết không có xung đột lợi ích."],
          ["The data supporting the findings of this study are *available* from the corresponding author upon request.", "Dữ liệu hỗ trợ kết quả nghiên cứu có thể được cung cấp bởi tác giả liên hệ khi có yêu cầu."]
        ]},
        { name: 'Cảm ơn biên tập viên và phản biện', phrases: [
          ["We are *grateful* to the reviewers for their constructive and insightful comments.", "Chúng tôi xin cảm ơn các phản biện vì những góp ý mang tính xây dựng và sâu sắc."],
          ["We sincerely *thank* the editor for the opportunity to revise our manuscript.", "Chúng tôi chân thành cảm ơn biên tập viên đã cho cơ hội chỉnh sửa bản thảo."],
          ["We *appreciate* the time and effort the reviewers devoted to evaluating our work.", "Chúng tôi trân trọng thời gian và công sức các phản biện đã dành để đánh giá công trình."],
          ["The comments have helped us to substantially *improve* the quality of the manuscript.", "Các góp ý đã giúp chúng tôi cải thiện đáng kể chất lượng bản thảo."]
        ]},
        { name: 'Trả lời và mô tả chỉnh sửa', phrases: [
          ["Following the reviewer’s suggestion, we have *revised* the Methods section to clarify the sampling procedure.", "Theo gợi ý của phản biện, chúng tôi đã sửa phần Phương pháp để làm rõ quy trình lấy mẫu."],
          ["As *suggested*, we have added a new table comparing our results with previous studies.", "Theo gợi ý, chúng tôi đã bổ sung một bảng mới so sánh kết quả với các nghiên cứu trước."],
          ["The changes are *highlighted* in yellow in the revised manuscript.", "Các thay đổi được tô màu vàng trong bản thảo đã chỉnh sửa."],
          ["We have *clarified* this point in the Discussion section (lines 245–252).", "Chúng tôi đã làm rõ điểm này trong phần Thảo luận (dòng 245–252)."],
          ["Additional references have been *included* to strengthen the literature review.", "Tài liệu tham khảo bổ sung đã được đưa vào để củng cố phần tổng quan."]
        ]},
        { name: 'Bất đồng một cách lịch sự', phrases: [
          ["We *respectfully* disagree with the reviewer on this point, for the following reasons.", "Chúng tôi xin phép không đồng ý với phản biện ở điểm này, vì những lý do sau."],
          ["We *understand* the reviewer’s concern; however, collecting additional data was not feasible within the project period.", "Chúng tôi hiểu băn khoăn của phản biện; tuy nhiên, việc thu thập thêm dữ liệu là không khả thi trong thời gian của dự án."],
          ["While we *acknowledge* this limitation, we believe it does not affect the main conclusions.", "Dù thừa nhận hạn chế này, chúng tôi cho rằng nó không ảnh hưởng đến các kết luận chính."],
          ["This analysis is beyond the *scope* of the present study, but we have noted it as a direction for future research.", "Phân tích này nằm ngoài phạm vi nghiên cứu hiện tại, nhưng chúng tôi đã ghi nhận như một hướng nghiên cứu tiếp theo."],
          ["To *address* this concern, we have added a sensitivity analysis in the Supplementary Material.", "Để giải quyết băn khoăn này, chúng tôi đã bổ sung phân tích độ nhạy trong Tài liệu bổ sung."]
        ]}
      ]
    }
  ],

  formal: [
    ["look into", "investigate", "We look into the causes of soil erosion in upland areas.", "We investigate the causes of soil erosion in upland areas.", "Cụm động từ (phrasal verb) mang tính khẩu ngữ; dùng động từ một từ gốc Latin trang trọng hơn."],
    ["find out", "determine", "We wanted to find out whether the vaccine was effective in older adults.", "This study aimed to determine whether the vaccine was effective in older adults.", "find out là khẩu ngữ; determine/identify/establish phù hợp văn phong học thuật."],
    ["go up", "increase", "Vegetable prices go up sharply during the rainy season.", "Vegetable prices increase sharply during the rainy season.", "Dùng increase/rise thay cho go up khi mô tả số liệu tăng."],
    ["go down", "decrease", "Emissions go down when the engine runs on biodiesel.", "Emissions decrease when the engine runs on biodiesel.", "Dùng decrease/decline/fall thay cho go down."],
    ["set up", "establish", "We set up three monitoring plots in each village.", "Three monitoring plots were established in each village.", "set up là cụm động từ thân mật; establish/install trang trọng hơn."],
    ["carry out", "conduct", "We will carry out a survey of 300 households.", "A survey of 300 households will be conducted.", "carry out vẫn gặp trong bài báo nhưng conduct/perform trang trọng, gọn hơn."],
    ["get", "obtain", "We were able to get similar results in the second trial.", "Similar results were obtained in the second trial.", "get rất mơ hồ và thân mật; chọn obtain, receive, achieve, become tùy nghĩa."],
    ["a lot of", "a large number of", "A lot of farmers use pesticides excessively.", "A large number of farmers use pesticides excessively.", "a lot of là khẩu ngữ; dùng a large number of (danh từ đếm được) hoặc a large amount of (không đếm được)."],
    ["big", "substantial", "There was a big difference between the two groups.", "There was a substantial difference between the two groups.", "big chung chung; dùng substantial, considerable, large tùy ngữ cảnh."],
    ["thing", "factor", "Price is the most important thing affecting consumer choice.", "Price is the most important factor affecting consumer choice.", "thing quá mơ hồ; gọi đúng tên: factor, aspect, issue, element."],
    ["really", "highly", "The method is really effective for removing heavy metals.", "The method is highly effective for removing heavy metals.", "really mang tính cảm xúc, khẩu ngữ; dùng highly, considerably hoặc bỏ hẳn."],
    ["so", "therefore", "The sample was small, so the results should be interpreted with caution.", "The sample was small; therefore, the results should be interpreted with caution.", "so nối mệnh đề là khẩu ngữ; dùng therefore, thus, consequently (chú ý dấu chấm phẩy và dấu phẩy)."],
    ["kind of", "somewhat", "The results were kind of surprising.", "The results were somewhat surprising.", "kind of / sort of là văn nói; dùng somewhat, rather, to some extent."],
    ["don't", "do not", "These models don't account for seasonal variation.", "These models do not account for seasonal variation.", "Không dùng dạng rút gọn (contractions) trong bài báo khoa học."],
    ["can't", "cannot", "We can't rule out the effect of soil type.", "We cannot rule out the effect of soil type.", "can't viết đầy đủ là cannot (viết liền một từ)."],
    ["it's", "it is", "It's difficult to measure groundwater recharge directly.", "It is difficult to measure groundwater recharge directly.", "Viết đầy đủ it is; cũng đừng nhầm it's với its (sở hữu)."],
    ["you", "can be seen", "You can see a clear upward trend in Figure 2.", "A clear upward trend can be seen in Figure 2.", "Không xưng hô với người đọc bằng you; dùng câu bị động hoặc chủ ngữ phi nhân xưng."],
    ["like", "such as", "Crops like rice and maize are sensitive to heat stress.", "Crops such as rice and maize are sensitive to heat stress.", "like với nghĩa ví dụ như là khẩu ngữ; dùng such as hoặc including."],
    ["nowadays", "currently", "Nowadays, many universities offer fully online programs.", "Currently, many universities offer fully online programs.", "nowadays mang sắc thái văn nói; dùng currently, at present, in recent years."],
    ["why", "remains unclear", "Why does yield decline after five years of continuous cropping?", "The reason why yield declines after five years of continuous cropping remains unclear.", "Tránh câu hỏi tu từ trong bài báo; chuyển thành câu trần thuật nêu vấn đề."],
    ["and so on", "etc.", "We measured soil pH, nitrogen, phosphorus and so on.", "We measured soil pH, nitrogen, phosphorus, potassium, etc.", "and so on là văn nói; dùng etc. hoặc tốt nhất là liệt kê đầy đủ, cụ thể."],
    ["But", "However,", "But the effect was not significant in the dry season.", "However, the effect was not significant in the dry season.", "Không mở đầu câu bằng But; dùng However, (có dấu phẩy) hoặc nối hai mệnh đề trong cùng câu."],
    ["point out", "indicate", "Several studies point out that urban expansion reduces farmland.", "Several studies indicate that urban expansion reduces farmland.", "Dùng indicate, note, emphasize thay cho cụm động từ point out."],
    ["come up with", "develop", "Researchers need to come up with new methods for early disease detection.", "Researchers need to develop new methods for early disease detection.", "come up with là khẩu ngữ; dùng develop, devise, propose."],
    ["deal with", "address", "This paper attempts to deal with the problem of traffic congestion.", "This paper attempts to address the problem of traffic congestion.", "address/tackle/handle trang trọng hơn deal with."],
    ["talk about", "discuss", "In this section, we talk about the limitations of the model.", "In this section, we discuss the limitations of the model.", "discuss là ngoại động từ, không cần about (không viết discuss about)."],
    ["think about", "consider", "Managers should think about the costs of staff training.", "Managers should consider the costs of staff training.", "consider ngắn gọn, trang trọng hơn think about."],
    ["put forward", "propose", "The authors put forward a new index of water stress.", "The authors propose a new index of water stress.", "propose/suggest thay cho cụm động từ put forward."],
    ["cut down", "reduce", "Farmers can cut down on fertilizer use without losing yield.", "Farmers can reduce fertilizer use without losing yield.", "cut down (on) là khẩu ngữ; dùng reduce, lower, decrease."],
    ["show up", "appear", "Symptoms usually show up within three days of infection.", "Symptoms usually appear within three days of infection.", "show up mang tính văn nói; dùng appear, emerge, occur."],
    ["make up", "constitute", "Women make up 60% of the agricultural workforce.", "Women constitute 60% of the agricultural workforce.", "constitute/account for trang trọng hơn make up."],
    ["look at", "examine", "We look at the effect of class size on test scores.", "We examine the effect of class size on test scores.", "Dùng examine, analyze, explore thay cho look at."],
    ["go on", "continue", "Deforestation will go on unless stricter laws are enforced.", "Deforestation will continue unless stricter laws are enforced.", "continue/persist thay cho go on."],
    ["help", "facilitate", "The app can help communication between doctors and patients.", "The app can facilitate communication between doctors and patients.", "help không sai nhưng facilitate, support, enable chính xác và trang trọng hơn."],
    ["enough", "sufficient", "There was not enough data to calibrate the model.", "The data were not sufficient to calibrate the model.", "sufficient/adequate trang trọng hơn enough."],
    ["Also,", "Furthermore,", "Also, the method requires very little energy.", "Furthermore, the method requires very little energy.", "Không mở đầu câu bằng Also; dùng Furthermore, Moreover, In addition."],
    ["cheap", "inexpensive", "The sensor is cheap and easy to install.", "The sensor is inexpensive and easy to install.", "cheap có thể mang nghĩa rẻ tiền, kém chất lượng; dùng inexpensive, low-cost."],
    ["about", "approximately", "About 40% of respondents were women.", "Approximately 40% of respondents were women.", "Với số liệu xấp xỉ, dùng approximately/roughly thay cho about."],
    ["whole", "entire", "The whole dataset was used for training.", "The entire dataset was used for training.", "entire/complete trang trọng hơn whole."],
    ["bad", "adverse", "Pesticides have bad effects on human health.", "Pesticides have adverse effects on human health.", "bad quá chung chung; dùng adverse, negative, harmful, poor tùy ngữ cảnh."],
    ["good", "favorable", "The weather was good for crop growth that year.", "Weather conditions were favorable for crop growth that year.", "good mơ hồ; dùng favorable, beneficial, satisfactory, high-quality (chính tả Mỹ: favorable)."],
    ["hard", "challenging", "It is hard to measure informal labor accurately.", "It is challenging to measure informal labor accurately.", "Dùng difficult/challenging thay cho hard."],
    ["maybe", "possibly", "Maybe the delay was caused by equipment failure.", "The delay was possibly caused by equipment failure.", "maybe là văn nói; dùng possibly, perhaps hoặc động từ khuyết thiếu may/might."],
    ["try", "attempt", "In this paper, we try to explain the decline in exports.", "In this paper, we attempt to explain the decline in exports.", "attempt/seek trang trọng hơn try."],
    ["need", "require", "The method needs a large amount of water.", "The method requires a large amount of water.", "require trang trọng hơn need khi nói về điều kiện, yêu cầu."],
    ["keep", "maintain", "It is important to keep soil moisture above 70%.", "It is important to maintain soil moisture above 70%.", "maintain/retain thay cho keep."],
    ["sort out", "resolve", "We could not sort out the conflicting results.", "We were unable to resolve the conflicting results.", "sort out là khẩu ngữ; dùng resolve, clarify."],
    ["huge", "considerable", "The project had a huge impact on local livelihoods.", "The project had a considerable impact on local livelihoods.", "huge mang tính cường điệu; dùng considerable, marked, substantial."],
    ["pretty", "fairly", "The model was pretty accurate for short-term forecasts.", "The model was fairly accurate for short-term forecasts.", "pretty (= khá) là văn nói; dùng fairly, reasonably, relatively."]
  ],

  hedging: [
    ["This proves that fertilizer increases yield.", "These results suggest that fertilizer may increase yield.", "Một nghiên cứu hiếm khi chứng minh (prove) được điều gì tuyệt đối; dùng suggest + may để thể hiện mức độ chắc chắn phù hợp."],
    ["The new drug cures hypertension.", "The new drug appears to be effective in lowering blood pressure.", "appear to / seem to giúp trình bày kết quả một cách thận trọng, không khẳng định quá mức."],
    ["Social media causes depression among teenagers.", "Heavy social media use may be associated with depressive symptoms among teenagers.", "Dữ liệu tương quan không chứng minh được nhân quả; dùng be associated with thay cho cause."],
    ["All farmers prefer hybrid rice.", "Most of the surveyed farmers preferred hybrid rice.", "Tránh từ tuyệt đối (all, every, always); dùng lượng từ chính xác như most, the majority of, và giới hạn trong mẫu khảo sát."],
    ["Salinity is the reason for the yield decline.", "Salinity is likely to be one of the main reasons for the yield decline.", "be likely to và one of the main reasons cho thấy còn có thể có các nguyên nhân khác."],
    ["The model will always predict floods accurately.", "The model could provide reasonably accurate flood predictions under similar conditions.", "could và giới hạn điều kiện áp dụng (under similar conditions) giúp tránh khẳng định quá mức."],
    ["Older workers resist new technology.", "Older workers tend to be more hesitant to adopt new technology.", "tend to diễn đạt xu hướng chung, không áp đặt cho mọi cá nhân."],
    ["The policy has solved rural poverty.", "The policy appears to have reduced rural poverty to some extent.", "to some extent / to a certain degree giới hạn mức độ của tác động."],
    ["This is the best method for wastewater treatment.", "This method seems to be a promising option for wastewater treatment.", "Tránh so sánh nhất tuyệt đối khi chưa so sánh với mọi phương pháp; dùng seem to, promising."],
    ["The data show that students learn better online.", "The data indicate that students may perform slightly better in online courses.", "indicate nhẹ hơn show; slightly và may giúp phản ánh đúng độ lớn của khác biệt."],
    ["Climate change will destroy coffee production.", "Climate change could substantially reduce coffee production in the coming decades.", "Dự báo tương lai nên dùng could/may/is projected to thay cho will, và tránh từ cường điệu như destroy."],
    ["Everyone agrees that biodiversity loss is a serious problem.", "It is widely accepted that biodiversity loss is a serious problem.", "it is widely accepted / generally agreed thay cho everyone agrees, vốn không thể kiểm chứng."],
    ["The decrease was definitely caused by the drought.", "The decrease was possibly caused by the drought, although other factors cannot be ruled out.", "possibly kèm mệnh đề thừa nhận các yếu tố khác thể hiện tư duy khoa học thận trọng."],
    ["Our findings are true for all developing countries.", "Our findings may be applicable to other developing countries with similar characteristics.", "Không khái quát hóa vượt quá phạm vi mẫu; nêu rõ điều kiện để kết quả có thể áp dụng."],
    ["Microplastics never degrade in soil.", "Microplastics appear to degrade very slowly in soil.", "never là tuyệt đối và khó chứng minh; appear to + mô tả mức độ (very slowly) chính xác hơn."],
    ["The intervention completely eliminated medication errors.", "The intervention considerably reduced the number of medication errors.", "Tránh completely/totally nếu số liệu không thực sự bằng 0; mô tả mức giảm đúng với dữ liệu."],
    ["This shows that women are better managers.", "This might indicate that women-led firms perform better in certain sectors.", "might indicate và giới hạn phạm vi (in certain sectors) tránh kết luận quá rộng, mang tính định kiến."],
    ["There is no doubt that tourism benefits local communities.", "There is considerable evidence that tourism can benefit local communities.", "Thay khẳng định tuyệt đối bằng mức độ bằng chứng (considerable evidence) và can."],
    ["It is certain that the infection rate will rise next year.", "It is probable that the infection rate will continue to rise next year.", "probable / it is possible that thể hiện mức độ khả năng thay vì chắc chắn."],
    ["Rainfall determines rice yield.", "Rainfall is one of the key factors influencing rice yield.", "Tránh quy kết đơn nhân; one of the key factors thừa nhận tính đa yếu tố."],
    ["It might possibly be suggested that the treatment could perhaps have some effect on yield.", "The treatment may have an effect on yield.", "Rào đón quá mức: chồng nhiều từ rào đón (might, possibly, suggested, could, perhaps) khiến câu yếu và khó hiểu; một từ là đủ."],
    ["The results seem to possibly indicate that the difference may be significant (p < 0.001).", "The difference was statistically significant (p < 0.001).", "Rào đón quá mức: khi số liệu thống kê đã rõ ràng, hãy báo cáo thẳng; chỉ rào đón khi diễn giải nguyên nhân hay khái quát hóa."],
    ["We probably collected about 200 water samples.", "We collected 200 water samples.", "Rào đón quá mức: không rào đón các sự kiện, thông tin phương pháp mà bạn biết chắc; điều đó làm giảm độ tin cậy."]
  ],

  errors: [
    ["Many researches have examined this issue.", "Many studies have examined this issue.", "research là danh từ không đếm được, không có dạng số nhiều researches; dùng studies hoặc much research."],
    ["The survey provided many useful informations.", "The survey provided much useful information.", "information không đếm được: không thêm -s, dùng much/a great deal of, không dùng many."],
    ["The laboratory purchased new equipments for DNA analysis.", "The laboratory purchased new equipment for DNA analysis.", "equipment không đếm được; muốn đếm thì dùng pieces of equipment."],
    ["There are many evidences that the drug is safe.", "There is substantial evidence that the drug is safe.", "evidence không đếm được, động từ chia số ít; muốn đếm dùng pieces of evidence hoặc lines of evidence."],
    ["Farmers lack the knowledges needed to apply new techniques.", "Farmers lack the knowledge needed to apply new techniques.", "knowledge không đếm được, không có dạng số nhiều."],
    ["The teachers received many feedbacks from students.", "The teachers received a great deal of feedback from students.", "feedback không đếm được; dùng much/a great deal of feedback hoặc many comments."],
    ["The data shows a clear seasonal pattern.", "The data show a clear seasonal pattern.", "Trong văn phong khoa học truyền thống, data là số nhiều (số ít là datum), nên dùng data show/data were; một số tạp chí chấp nhận số ít, nhưng phải nhất quán."],
    ["The number of farmers using drones are increasing.", "The number of farmers using drones is increasing.", "The number of + danh từ số nhiều chia động từ số ít (chủ ngữ là number); còn A number of + danh từ số nhiều chia số nhiều."],
    ["A number of study has reported similar results.", "A number of studies have reported similar results.", "A number of (= một số) đi với danh từ số nhiều và động từ số nhiều."],
    ["In this section, we discuss about the main findings.", "In this section, we discuss the main findings.", "discuss là ngoại động từ, theo sau trực tiếp bởi tân ngữ, không dùng about (nhưng danh từ thì: a discussion about/of)."],
    ["The authors emphasize on the role of local institutions.", "The authors emphasize the role of local institutions.", "emphasize không cần on (chỉ danh từ mới dùng: place emphasis on)."],
    ["According to Nguyen (2020), he said that wages were rising.", "According to Nguyen (2020), wages were rising.", "According to đã nêu nguồn, không lặp lại chủ ngữ he said; hoặc viết Nguyen (2020) reported that..."],
    ["In the other hand, the cost of the system is high.", "On the other hand, the cost of the system is high.", "Cụm cố định là On the other hand (thường đi sau On the one hand), không phải In the other hand; và chỉ dùng khi đối lập hai mặt."],
    ["Based on the survey results, we concluded that most farmers lacked credit.", "The survey results indicated that most farmers lacked credit.", "Based on ở đầu câu phải bổ nghĩa cho chủ ngữ ngay sau (we không phải là thứ based on); viết lại để tránh mệnh đề treo (dangling modifier), hoặc dùng On the basis of."],
    ["This paper researches the impact of tourism on coastal communities.", "This paper investigates the impact of tourism on coastal communities.", "research dùng như động từ ít tự nhiên trong ngữ cảnh này; dùng investigate, examine, explore, analyze."],
    ["In 2019, Tran et al. have reported a similar trend.", "In 2019, Tran et al. reported a similar trend.", "Khi có mốc thời gian xác định trong quá khứ (In 2019), dùng quá khứ đơn, không dùng hiện tại hoàn thành."],
    ["Yield increased in all plots, therefore the treatment was effective.", "Yield increased in all plots; therefore, the treatment was effective.", "therefore là trạng từ, không phải liên từ; nối hai mệnh đề bằng dấu phẩy là lỗi comma splice. Dùng dấu chấm phẩy hoặc tách câu."],
    ["The samples were contaminated, so that the results were discarded.", "The samples were contaminated; consequently, the results were discarded.", "so that chỉ mục đích (để mà), không chỉ kết quả; muốn diễn đạt kết quả dùng consequently, as a result, therefore."],
    ["The study covered three cities, e.g. Hanoi, Hue and Da Nang.", "The study covered three cities, i.e., Hanoi, Hue and Da Nang.", "e.g. = ví dụ (liệt kê chưa đủ); i.e. = tức là (liệt kê đầy đủ, giải thích lại). Ở đây đủ ba thành phố nên dùng i.e."],
    ["Nguyen et.al (2021) reported a similar result.", "Nguyen et al. (2021) reported a similar result.", "Viết đúng et al. (không có dấu chấm sau et, có dấu chấm sau al); theo kiểu trích dẫn của tạp chí có thể in nghiêng."],
    ["Comparing with the control group, yield was higher in the treated plots.", "Compared with the control group, the treated plots had higher yield.", "Dùng Compared with/to (bị động), và chủ ngữ phía sau phải là đối tượng được so sánh (the treated plots), không phải yield chung chung."],
    ["The yields of hybrid rice were respectively high.", "The yields of hybrid and inbred rice were 7.2 and 5.8 t/ha, respectively.", "respectively chỉ dùng khi ghép hai danh sách tương ứng theo thứ tự (A và B lần lượt là X và Y), thường đặt cuối câu sau dấu phẩy."],
    ["The price of fertilizer is very expensive this year.", "The price of fertilizer is very high this year.", "price đi với high/low; expensive/cheap dùng cho hàng hóa (Fertilizer is expensive), không dùng cho price."],
    ["The study recorded an increase of rice yield after irrigation.", "The study recorded an increase in rice yield after irrigation.", "increase/decrease in + đại lượng tăng giảm (an increase in yield); increase of + mức thay đổi (an increase of 15%)."],
    ["The color of the samples and the behaviour of the participants were recorded.", "The color of the samples and the behavior of the participants were recorded.", "Chọn một hệ chính tả (Mỹ hoặc Anh) và dùng nhất quán trong toàn bài: color/behavior/analyze (Mỹ) hoặc colour/behaviour/analyse (Anh)."],
    ["In conclusion, Table 3 shows that costs decreased over time.", "Overall, Table 3 shows that costs decreased over time.", "In conclusion chỉ nên dùng một lần ở phần kết luận cuối bài; để tóm ý trong đoạn dùng Overall, In summary, Taken together."],
    ["The project started in 2018 it involved 12 villages and the results were positive.", "The project started in 2018 and involved 12 villages. The results were positive.", "Câu chạy (run-on): hai mệnh đề độc lập ghép liền không có liên từ hay dấu câu; tách câu hoặc dùng liên từ phù hợp."],
    ["Besides, the method has some limitations.", "In addition, the method has some limitations.", "Besides ở đầu câu mang sắc thái văn nói (hơn nữa thì...); trong bài báo dùng In addition, Furthermore, Moreover."],
    ["As we know, water scarcity is a global problem.", "Water scarcity is widely recognized as a global problem.", "As we know là văn nói và giả định người đọc đã biết; dùng It is widely recognized that... hoặc dẫn nguồn."],
    ["This ecosystem is very unique in Southeast Asia.", "This ecosystem is unique in Southeast Asia.", "unique đã mang nghĩa duy nhất, không dùng very/quite/most với unique; có thể thay bằng rare, distinctive."],
    ["Temperature had a significant affect on germination.", "Temperature had a significant effect on germination.", "effect là danh từ (tác động), affect là động từ (tác động đến): Temperature affected germination."],
    ["The method which we propose is faster than existing ones.", "The method that we propose is faster than existing ones.", "Trong tiếng Anh Mỹ, mệnh đề quan hệ xác định dùng that (không dấu phẩy); which dùng cho mệnh đề không xác định, có dấu phẩy phía trước."],
    ["25 samples were excluded due to contamination.", "Twenty-five samples were excluded due to contamination.", "Không bắt đầu câu bằng chữ số; viết bằng chữ hoặc đảo cấu trúc câu (A total of 25 samples were excluded...)."],
    ["The results showed that the treated plots produce more biomass.", "The results showed that the treated plots produced more biomass.", "Khi động từ chính ở quá khứ (showed) và mô tả kết quả cụ thể của nghiên cứu, mệnh đề sau cũng dùng quá khứ; hiện tại chỉ dùng cho chân lý chung."],
    ["The rice is staple food in Vietnam.", "Rice is a staple food in Vietnam.", "Danh từ không đếm được nói chung không dùng the; danh từ đếm được số ít (staple food) cần mạo từ a/an."],
    ["The climate change is affecting crop yields worldwide.", "Climate change is affecting crop yields worldwide.", "Các khái niệm chung, trừu tượng (climate change, education, globalization) không dùng the."],
    ["We used questionnaire to collect data from teachers.", "We used a questionnaire to collect data from teachers.", "Danh từ đếm được số ít luôn cần mạo từ (a/an/the) hoặc từ hạn định; tiếng Việt không có mạo từ nên rất dễ bỏ sót."],
    ["The samples were examined using a SEM.", "The samples were examined using an SEM.", "Chọn a/an theo âm đọc chứ không theo chữ cái: SEM đọc là /es-i-em/ bắt đầu bằng nguyên âm nên dùng an."],
    ["Our group made a research on rural migration.", "Our group conducted research on rural migration.", "research không đếm được nên không dùng a; động từ đi kèm là conduct/carry out research, không dùng make."],
    ["The results was shown in Table 2.", "The results are shown in Table 2.", "results số nhiều nên dùng are; khi dẫn chiếu bảng/hình dùng thì hiện tại vì bảng vẫn đang tồn tại trong bài."],
    ["Despite of the high cost, the technology was widely adopted.", "Despite the high cost, the technology was widely adopted.", "Despite không đi với of; dùng Despite + danh từ hoặc In spite of + danh từ."],
    ["Although the sample was small, but the results were consistent.", "Although the sample was small, the results were consistent.", "Tiếng Việt nói Mặc dù... nhưng..., còn tiếng Anh Although và but không dùng cùng nhau trong một câu."],
    ["In recent years, there are many studies on green finance.", "In recent years, there have been many studies on green finance.", "In recent years / over the past decade chỉ khoảng thời gian kéo dài đến hiện tại, nên dùng hiện tại hoàn thành."]
  ]
};
