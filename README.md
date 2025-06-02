
# 🛒 Dự Án Web Quản Lý Bán Hàng

Một hệ thống quản lý bán hàng đơn giản, được xây dựng với **Express (Backend)** và **Vue.js (Frontend)**

---

### Cấu trúc dự án

Dự án được chia thành 2 phần chính:

```
ban-hang/
├── backend/          # Backend API với Express
└── frontend/         # Giao diện người dùng với Vue.js
```

---

### Yêu cầu hệ thống

- Node.js v14 trở lên  
- npm hoặc yarn  
- (Tùy chọn) MongoDB / MySQL / PostgreSQL để lưu trữ dữ liệu  

---

### Cách chạy dự án

#### 1. Chạy Backend

```bash
cd backend
npm install     # Cài đặt dependencies
npm start       # Khởi động server (mặc định port 3000)
```

> Backend sẽ chạy tại: `http://localhost:3000`

---

#### 2. Chạy Frontend

```bash
cd frontend
npm install     # Cài đặt dependencies
npm run serve   # Khởi động dev server
```

> Frontend sẽ chạy tại: `http://localhost:8080`

---

### Các tính năng chính

- Quản lý sản phẩm (CRUD)  
- Quản lý đơn hàng  
- Quản lý khách hàng  
- Thống kê doanh thu  
- Đăng nhập/Đăng ký người dùng (nếu có phân quyền)

---

### API Documentation (mẫu)

| Method | Endpoint              | Chức năng             |
|--------|-----------------------|------------------------|
| GET    | `/api/products`       | Lấy danh sách sản phẩm |
| POST   | `/api/products`       | Tạo mới sản phẩm       |
| GET    | `/api/products/:id`   | Chi tiết sản phẩm      |
| PUT    | `/api/products/:id`   | Cập nhật sản phẩm      |
| DELETE | `/api/products/:id`   | Xóa sản phẩm           |

> Có thể dùng Postman hoặc Swagger để test API nếu tích hợp.

---

### Cơ sở dữ liệu

Bạn có thể tùy chọn sử dụng:

- MongoDB (với Mongoose)  
- MySQL / PostgreSQL (với Sequelize hoặc Knex)  
- SQLite (cho môi trường phát triển)

> Cấu hình DB nằm trong file `.env` hoặc `config/db.js` trong thư mục `backend`.

---

### Ghi chú phát triển

- Tạo file `.env` trong thư mục backend để cấu hình `PORT`, `DATABASE_URL`,...  
- CORS giữa frontend và backend đã được xử lý cơ bản trong `backend/server.js`.

---

### Đóng góp

Nếu bạn muốn đóng góp vào dự án này:  
- Fork repo  
- Tạo branch mới  
- Gửi pull request