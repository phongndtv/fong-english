# Fong English – Học tiếng Anh mỗi ngày

Ứng dụng web cài đặt được (PWA): một bộ mã nguồn dùng được trên **Android, iPhone/iPad, Windows, macOS, Linux**.
Chạy được khi không có mạng, không cần tài khoản, tiến độ học lưu ngay trên thiết bị.

## Tính năng
- **Học từ mới mỗi ngày** bằng thẻ ghi nhớ (flashcard): phiên âm, phát âm, câu ví dụ kèm nghĩa.
- **Ôn tập ngắt quãng** (thuật toán SM-2): từ nào sắp quên thì app mới đưa ra ôn lại. Với từ đã nhớ, app thỉnh thoảng hỏi ngược: thấy nghĩa tiếng Việt, gõ từ tiếng Anh.
- **Trắc nghiệm**: chọn nghĩa, chọn từ, nghe rồi chọn.
- **Điền từ vào câu**: đọc câu ví dụ có chỗ trống, gõ từ còn thiếu.
- **Nghe & chép chính tả**: có nút nghe chậm và gợi ý.
- **Luyện nói**: máy nhận giọng nói rồi chấm điểm từng từ (cần Chrome/Edge/Safari và có mạng).
- **Mục tiêu XP, chuỗi ngày học liên tiếp 🔥** (mỗi 7 ngày được nghỉ 1 ngày mà không mất chuỗi), **thống kê 14 ngày**, tiến độ theo trình độ và chủ đề.
- **Đồng bộ giữa điện thoại và máy tính** qua một gist bí mật trên tài khoản GitHub của bạn (xem bên dưới).
- Báo **"Có phiên bản mới"** khi app được cập nhật.
- **1.135 từ vựng theo 4 trình độ** (A1 240 · A2 346 · B1 291 · B2 258) và 19 chủ đề, cùng 60 câu giao tiếp. Chọn trình độ trong Cài đặt; học hết thì app tự chuyển lên trình độ tiếp theo.
- Chế độ sáng/tối, phím tắt trên máy tính (Space, 1–4, Enter), sao lưu/nhập dữ liệu.

## Chạy thử trên máy tính
```bash
cd Fong_EnglishLearning
python3 -m http.server 8765
```
Mở http://localhost:8765

## Đưa lên mạng để cài lên điện thoại
Muốn cài được lên điện thoại thì app phải chạy qua **HTTPS**. Cách miễn phí, đơn giản nhất:

**GitHub Pages**
1. Tạo một repository mới trên GitHub (ví dụ `fong-english`) rồi tải toàn bộ thư mục này lên.
2. Vào *Settings → Pages → Source: Deploy from a branch → `main` / `(root)`* rồi bấm Save.
3. Sau khoảng 1 phút, app sẽ có ở địa chỉ `https://<tên-github>.github.io/fong-english/`.

**Netlify Drop** (không cần tài khoản GitHub): vào https://app.netlify.com/drop rồi kéo thả cả thư mục vào.

## Cài lên thiết bị
| Thiết bị | Cách cài |
|---|---|
| Android (Chrome) | Mở link, bấm nút **Cài đặt** trên trang chủ của app, hoặc vào menu ⋮ → *Cài đặt ứng dụng* |
| iPhone/iPad (Safari) | Mở link, bấm **Chia sẻ** → *Thêm vào MH chính* |
| Windows/Mac/Linux (Chrome, Edge) | Mở link, bấm biểu tượng cài đặt ⊕ ở thanh địa chỉ |

## Đồng bộ tiến độ giữa các thiết bị
1. Mở https://github.com/settings/tokens/new?scopes=gist&description=Fong%20English (quyền **gist** đã được chọn sẵn).
2. Chọn thời hạn (*Expiration*), bấm **Generate token**, sao chép mã `ghp_...`.
3. Trong app: **Cài đặt → Đồng bộ giữa các thiết bị**, dán mã, bấm **Kết nối**.
4. Làm tương tự trên máy còn lại (dùng chung một mã cũng được).

App tự đồng bộ sau mỗi lần học, khi mở app và khi có mạng trở lại. Dữ liệu nằm trong gist bí mật tên *Fong English – dữ liệu đồng bộ tiến độ học*.
Cách ghép dữ liệu: thẻ từ lấy bản được ôn gần nhất; XP và số từ mỗi ngày được cộng từ tất cả các máy; cài đặt lấy bản sửa sau cùng.

Không muốn đồng bộ? Vẫn có thể chuyển tiến độ bằng **Cài đặt → Xuất tệp** ở máy cũ rồi **Nhập tệp** ở máy mới.

## Thêm từ vựng
- A1 nằm trong `js/data.js`; A2, B1, B2 nằm trong `js/words-a2.js`, `js/words-b1.js`, `js/words-b2.js`.
- Mỗi dòng: `["từ", "/phiên âm/", "loại từ", "nghĩa", "Câu ví dụ.", "Nghĩa câu ví dụ."]`. Câu ví dụ nên chứa đúng từ đó để dùng được cho bài điền từ.
- Tiến độ học lưu theo chính từ tiếng Anh, nên có thể thêm, xóa, sắp xếp lại tùy ý. Nếu một từ có ở nhiều trình độ, app dùng trình độ thấp nhất.
Sau khi sửa, tăng `VERSION` trong `sw.js` (ví dụ `fong-english-v2`) để máy đã cài nhận được bản mới.

## Cấu trúc
```
index.html            khung trang
css/style.css         giao diện (tự co giãn theo điện thoại/máy tính, có chế độ tối)
js/data.js            trình độ, chủ đề, từ vựng A1 và câu giao tiếp
js/words-a2/b1/b2.js  từ vựng các trình độ A2, B1, B2
js/app.js             toàn bộ chức năng
sw.js                 service worker giúp chạy offline
manifest.webmanifest  thông tin để cài app
icons/                biểu tượng app
```
