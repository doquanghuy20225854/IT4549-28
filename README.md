Giải thích cấu trúc:
Frontend (React.js)
    /src: Chứa mã nguồn chính
    /admin: Giao diện quản trị
    /doctor: Giao diện bác sĩ
    /staff: Giao diện nhân viên
    /users: Giao diện người dùng
    /utils: Các hàm tiện ích
    /store: Quản lý state (Redux)
    /routes: Định nghĩa routes
    /lib: Thư viện và utilities
Backend (Node.js)
    /controllers: Xử lý logic nghiệp vụ
    /models: Định nghĩa cấu trúc dữ liệu
    /routes: Định nghĩa API endpoints
    /middlewares: Middleware xử lý request
    index.js: File khởi động server
Cấu trúc theo vai trò người dùng
    Admin: Quản lý toàn bộ hệ thống
    Doctor: Quản lý dịch vụ và lịch hẹn
    Staff: Xử lý đặt lịch và dịch vụ
    Users: Khách hàng sử dụng dịch vụ
Các file cấu hình
    package.json: Quản lý dependencies
    .gitignore: Cấu hình Git
    .vscode: Cấu hình VS Code


### Chạy frontend

1. Cài đặt các gói cần thiết: `npm install`
2. Chạy ứng dụng: `npm start`
### Chạy backend
1. npm run dev

TK demo
admin: admin
pass: 123456

user: user
pass: 123456

staff: staff
pass: 123456

doctor: doctor
pass: 123456

