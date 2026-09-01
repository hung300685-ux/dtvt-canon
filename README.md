# Đại Thiên Vũ Trụ — Canon Database (v0.1)

Web app quản lý Canon cho hệ thống "Đại Thiên Vũ Trụ": lưu trữ nhân vật, địa điểm,
cảnh giới, nghề nghiệp, tổ chức, sự kiện... theo đúng cấu trúc 13 Quyển bạn đã thiết kế.

## Đây là gì

- **100% chạy phía trình duyệt** (vanilla HTML/CSS/JS, không cần build tool, không cần Node/npm).
- Dữ liệu lưu trong **IndexedDB** của trình duyệt — persistent, không mất khi tắt tab, không cần server.
- Đã **seed sẵn** dữ liệu khởi tạo từ tài liệu gốc: 13 Quyển, 10 Đại Niên Đại, 16 Cảnh giới,
  50 Đại Hệ Nghề, 12 vai trò Hội đồng AI, công thức Sức mạnh Tổng hợp.
- CRUD đầy đủ: thêm / sửa / xóa / tìm kiếm mục Canon.
- Xuất/Nhập JSON để backup hoặc chuyển dữ liệu sang giai đoạn sau (Hội đồng AI sẽ đọc Canon này làm context).

## Cách chạy

**Cách 1 — mở trực tiếp:** mở file `index.html` bằng trình duyệt (Chrome/Edge/Firefox).
(Một số trình duyệt hạn chế IndexedDB khi mở qua `file://` — nếu gặp lỗi, dùng Cách 2.)

**Cách 2 — chạy local server (khuyên dùng):**
```bash
cd dtvt-canon
python3 -m http.server 8000
# rồi mở http://localhost:8000
```
Hoặc dùng bất kỳ static server nào (VS Code Live Server, `npx serve`, v.v.)

## Cách deploy (tự host)

Vì đây là site tĩnh thuần túy, bạn có thể deploy lên **bất kỳ static hosting** nào, không cần backend:
- Vercel / Netlify: kéo thả thư mục `dtvt-canon/` vào, xong.
- GitHub Pages: push thư mục này lên repo, bật Pages.
- Hoặc để trên VPS riêng qua Nginx/Caddy trỏ vào thư mục này.

⚠️ Lưu ý: vì dữ liệu lưu trong IndexedDB **của từng trình duyệt**, mỗi máy/trình duyệt sẽ có
một bản Canon riêng. Dùng nút **Xuất JSON / Nhập JSON** để đồng bộ giữa các máy, hoặc chuyển
sang backend thật ở giai đoạn sau nếu cần nhiều người cùng biên tập Canon.

## Cấu trúc dự án

```
dtvt-canon/
├── index.html          giao diện chính
├── styles.css           giao diện
├── js/
│   ├── schema.js         định nghĩa 15 category Canon (theo 13 Quyển)
│   ├── db.js             lớp bọc IndexedDB (lưu trữ)
│   ├── seed.js           dữ liệu khởi tạo trích từ tài liệu gốc
│   └── app.js            logic UI: list / detail / thêm / sửa / xóa / tìm kiếm / export-import
└── README.md
```

## Mở rộng schema

Muốn thêm loại mục Canon mới (vd: "Bí cảnh", "Công pháp")? Sửa `js/schema.js`,
thêm 1 entry vào `CATEGORIES` + thêm tên category vào mảng `CATEGORY_ORDER`. UI sẽ tự
sinh form và sidebar tương ứng — không cần đụng vào `app.js`.

---

## Lộ trình tiếp theo: Hội Đồng AI

Bạn đã chọn: **nhiều model AI thật (Claude + GPT + Gemini...) qua API riêng của bạn**.
Vì mỗi lời gọi API cần giấu API key và không thể gọi thẳng từ trình duyệt (lộ key), giai đoạn
kế tiếp cần thêm **1 backend nhỏ** (ví dụ Node/Express hoặc serverless functions trên Vercel)
đóng vai trò "AI Council Orchestrator":

1. **Backend nhận**: bản thảo chương + Canon liên quan (đọc từ Canon Database này) + vai trò AI cần chạy.
2. **Backend gọi song song** tới các provider (Anthropic API cho Claude, OpenAI API cho GPT,
   Google AI API cho Gemini...), mỗi lời gọi mang system prompt riêng theo vai trò
   (Canon AI, Logic AI, Character AI, Pacing AI, Reader AI...) — đã có sẵn danh sách 12 vai trò
   trong Canon Database (category "Vai trò Hội đồng AI").
3. **Tổng hợp kết quả** theo đúng `Council Decision Protocol` (Quyển XIII): Evidence → Arguments
   → Counterarguments → Risk → Canon Impact → Recommendation.
4. **Ghi Error Archive**: mỗi lỗi được phát hiện lưu lại thành 1 mục Canon mới (category có thể
   thêm là `error_archive`) để hệ thống "học" theo đúng Learning Pressure Protocol.

Khi bạn sẵn sàng cho giai đoạn này, nói mình biết — mình sẽ dựng backend orchestrator + màn
hình "viết chương → gửi Hội đồng AI review → xem phản biện từng AI → áp dụng sửa" nối trực
tiếp vào Canon Database đang có.
