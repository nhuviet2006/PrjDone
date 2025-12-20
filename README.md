<<<<<<< HEAD
<<<<<<< HEAD
# BACKEND API – Authentication & Event Management

## 1. Giới thiệu
Backend API được xây dựng bằng Node.js, Express và TypeScript, sử dụng Prisma ORM và Swagger (OpenAPI) để Frontend dễ dàng tích hợp và test API.

Chức năng chính:
- Đăng ký / Đăng nhập (JWT)
- Quản lý User
- Quản lý Event
- Phân quyền (Role)

---

## 2. Công nghệ sử dụng
- Node.js
- Express
- TypeScript
- Prisma ORM
- JWT Authentication
- Swagger (swagger-ui-express, swagger-jsdoc)

---

## 3. Cài đặt & chạy dự án

### Bước 1: Clone project
```bash
git clone <repo-url>
cd BACKEND
```

### Bước 2: Cài đặt thư viện
```bash
npm install
```

### Bước 3: Tạo file môi trường
Tạo file `.env` từ `.env.example` và cấu hình:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/db_name
JWT_SECRET=your_secret_key
```

### Bước 4: Khởi tạo Database
```bash
npx prisma migrate dev
```

### Bước 5: Chạy server
```bash
npm run dev
```

Server chạy tại:
```
http://localhost:3000
```

---

## 4. Swagger API Documentation
Sau khi chạy server, mở trình duyệt:
```
http://localhost:3000/api-docs
```
Swagger UI cho phép Frontend xem danh sách API, request body, response mẫu và test API trực tiếp.

---

## 5. Authentication & sử dụng API cho Frontend
API đăng ký sử dụng phương thức POST tại endpoint `/api/auth/register` với request body dạng JSON gồm email và password. Server trả về status 201 khi đăng ký thành công hoặc 400 khi dữ liệu không hợp lệ. API đăng nhập sử dụng phương thức POST tại endpoint `/api/auth/login` với request body gồm email và password. Khi đăng nhập thành công, server trả về status 200 cùng accessToken dạng JWT và thông tin user (id, email, role). Frontend cần lưu accessToken (localStorage hoặc cookie) để sử dụng cho các API yêu cầu xác thực.

Request mẫu:
```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

Response mẫu khi đăng nhập thành công:
```json
{
  "accessToken": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "test@gmail.com",
    "role": "USER"
  }
}
```

---

## 6. Gửi Token khi gọi API
Với các API cần đăng nhập, Frontend gửi token qua header:
```
Authorization: Bearer <accessToken>
```
Nếu không gửi hoặc token không hợp lệ, server trả về lỗi 401 hoặc 403.

---

## 7. Quy ước lỗi
Backend trả lỗi theo format:
```json
{
  "message": "Sai mat khau"
}
```
Frontend dùng `message` để hiển thị thông báo lỗi.


## 8. HTTP Status Code sử dụng
- 200: Thành công  
- 201: Tạo mới thành công  
- 400: Dữ liệu không hợp lệ  
- 401: Chưa đăng nhập hoặc token không hợp lệ  
- 403: Không có quyền truy cập  
- 404: Không tìm thấy  
- 500: Lỗi server  

---

## 9. Ghi chú
Frontend chỉ cần Swagger UI và README này để tích hợp API, không cần đọc code backend. Backend áp dụng mô hình Controller – Service, JWT Authentication, Prisma Migration và Swagger Documentation, đáp ứng yêu cầu đồ án và làm việc nhóm Frontend – Backend.
=======
# event-web
dự án web sự kiện
>>>>>>> 61dff64572492a1a36178545d662ccb30733ccb9
=======
# baitaplon-web
>>>>>>> a460443823d60f452f5e173cc26f940ab229627a
