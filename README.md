# 🌐 WEBSITE ĐĂNG KÝ VÀ QUẢN LÝ SỰ KIỆN

## 📌 Giới thiệu
Website được xây dựng nhằm mục đích **quản lý và hiển thị thông tin sự kiện**, hỗ trợ người dùng dễ dàng theo dõi, đăng ký và quản trị các hoạt động sự kiện.

## 👥 Thành viên nhóm
- Trần Như Việt – MSSV: 0374469 - Backend
- Sinh viên 2 – MSSV: __________
- Sinh viên 3 – MSSV: __________

---

## 🛠️ Công nghệ sử dụng
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM, dotenv, JWT, bcrypt, multer, Swagger
- **Database**: PostgreSQL
- **Khác**: Git, GitHub, npm

---

## 🔑 Chức năng chính của website

### 👤 Người dùng (User)
- Xem danh sách các sự kiện đang và sắp diễn ra
- Xem chi tiết thông tin sự kiện (tên, thời gian, địa điểm, mô tả)
- Đăng ký tham gia sự kiện
- Đăng nhập / đăng xuất tài khoản

### 🛡️ Quản trị viên (Admin)
- Thêm mới sự kiện
- Xóa sự kiện
- Cấp quyền admin cho tài khoản khác (qua email mà tài khoản đó sử dụng để đăng ký tài khoản)
- Các quyền khác như của User 


## 📂 Cấu trúc thư mục
server/
├── node_modules/          # Thư viện 
├── prisma/                # Cấu hình Database
│   └── schema.prisma      # File định nghĩa bảng dữ liệu
├── public/                # Chứa toàn bộ Frontend
│   ├── img/               # Hình ảnh tĩnh của web
│   ├── admin.html         # Trang quản trị
│   ├── admin.js           # Logic trang quản trị
│   ├── event.css          # CSS cho trang chủ
│   ├── event.html         # Trang chủ
│   ├── event.js           # Logic xử lý trang chủ
│   ├── sl.css             # CSS trang đăng nhập và đăng ký
│   ├── sl.html            # HTML trang đăng nhập và đăng ký
│   └── sl.js              # Logic xử lý trang đăng nhập và đăng ký
├── src/                   # Source code Backend (TypeScript)
│   ├── controllers/       # Xử lý logic nhận/trả request
│   ├── middlewares/       
│   ├── routes/            # Định nghĩa các đường dẫn API
│   ├── services/          # Xử lý database
│   ├── types/             # Định nghĩa kiểu dữ liệu 
│   ├── utils/             # Các hàm tiện ích dùng chung
│   └── app.ts             # File khởi động chính của Server
├── uploads/               # Nơi lưu ảnh người dùng upload lên
├── .env.example           # File mẫu biến môi trường 
├── .gitattributes         # Cấu hình Git
├── .gitignore             # File loại trừ (không up lên Git)
├── LICENSE                
├── README.md              # Hướng dẫn dự án
├── package-lock.json      
├── package.json           # File quản lý dự án & lệnh chạy
└── tsconfig.json          # Cấu hình TypeScript
