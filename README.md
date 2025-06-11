 Hệ thống quản lý trung tâm chăm sóc thú cưng 
1. Mô tả 
    Giữa lòng xã hội bận rộn, tấp nập như hiện nay thì chúng ta rất dễ rơi vào cảm giác trống rỗng, 
    chính vì thế mà ngày càng có nhiều người chọn nuôi thú cưng để giải tỏa cảm giác căng thẳng, mệt 
    mỏi và cô đơn. Thú cưng đang dần trở thành người bạn thân thiết của những ai yêu thích động vật, 
    họ có thể tâm sự với thú cưng rất nhiều chuyện xung quanh cuộc sống và dành cho thú cưng cái tên 
    gọi xưng hô thân mật như những thành viên trong gia đình. 
    Để hỗ trợ chủ nuôi trong việc theo dõi sức khỏe, sử dụng dịch vụ chăm sóc và quản lý thú cưng 
    một cách hiệu quả, hệ thống quản lý trung tâm chăm sóc thú cưng được phát triển. Hệ thống đóng vai 
    trò là cầu nối giữa trung tâm chăm sóc thú cưng, các bác sĩ thú y và chủ nuôi, cung cấp đầy đủ các 
    thông tin cần thiết về thú cưng cũng như các dịch vụ chăm sóc. 
    Hệ thống cho phép các trung tâm chăm sóc thú cưng quản lý thông tin về từng thú cưng được 
    đăng ký, cung cấp dịch vụ khám chữa bệnh, làm đẹp, lưu trú và các dịch vụ liên quan khác. Chủ nuôi 
    có thể dễ dàng theo dõi tình trạng sức khỏe, đặt lịch hẹn với bác sĩ thú y, sử dụng các dịch vụ và nhận 
    thông báo nhắc nhở về lịch tái khám hoặc các nhu cầu chăm sóc đặc biệt của thú cưng. 
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

