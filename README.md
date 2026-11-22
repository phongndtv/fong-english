# Fong English – Học tiếng Anh mỗi ngày

Ứng dụng web cài đặt được (PWA): một bộ mã nguồn dùng được trên **Android, iPhone/iPad, Windows, macOS, Linux**.
Chạy được khi không có mạng, không cần tài khoản, tiến độ học lưu ngay trên thiết bị.

## Tính năng
- **Học từ mới mỗi ngày** bằng thẻ ghi nhớ (flashcard): phiên âm, phát âm, câu ví dụ kèm nghĩa.
- **Ôn tập ngắt quãng** (thuật toán SM-2): từ nào sắp quên thì app mới đưa ra ôn lại.
- **Trắc nghiệm**: chọn nghĩa, chọn từ, nghe rồi chọn.
- **Nghe & chép chính tả**: có nút nghe chậm và gợi ý.
- **Luyện nói**: máy nhận giọng nói rồi chấm điểm từng từ (cần Chrome/Edge/Safari và có mạng).
- **Mục tiêu XP, chuỗi ngày học liên tiếp 🔥, thống kê 14 ngày**, tiến độ theo chủ đề.
- **Từ điển** 240 từ thuộc 12 chủ đề và 60 câu giao tiếp, có tìm kiếm.
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

Mỗi thiết bị lưu tiến độ riêng. Để chuyển tiến độ sang máy khác, vào **Cài đặt → Xuất tệp** ở máy cũ, rồi **Nhập tệp** ở máy mới.

## Thêm từ vựng
Sửa `js/data.js`: thêm dòng vào **cuối** danh sách của một chủ đề, hoặc thêm chủ đề mới.
(Không chèn vào giữa hay xóa từ, vì tiến độ học được lưu theo vị trí của từ.)
Sau khi sửa, tăng `VERSION` trong `sw.js` (ví dụ `fong-english-v2`) để máy đã cài nhận được bản mới.

## Cấu trúc
```
index.html            khung trang
css/style.css         giao diện (tự co giãn theo điện thoại/máy tính, có chế độ tối)
js/data.js            nội dung: từ vựng và câu giao tiếp
js/app.js             toàn bộ chức năng
sw.js                 service worker giúp chạy offline
manifest.webmanifest  thông tin để cài app
icons/                biểu tượng app
```
