# 🐾 Hệ thống Quản lý Trung tâm Chăm sóc Thú cưng

## 📋 Mô tả dự án

Hệ thống quản lý trung tâm chăm sóc thú cưng là một ứng dụng web toàn diện được thiết kế để kết nối trung tâm chăm sóc thú cưng, bác sĩ thú y và chủ nuôi. Trong xã hội hiện đại bận rộn, thú cưng đã trở thành người bạn thân thiết của nhiều người, giúp giải tỏa căng thẳng và cô đơn.

Hệ thống cung cấp đầy đủ các tính năng cần thiết để quản lý thông tin thú cưng, dịch vụ chăm sóc, lịch hẹn và theo dõi sức khỏe một cách hiệu quả.

## ✨ Tính năng chính

### 🔐 Hệ thống phân quyền
- **Admin**: Quản lý toàn bộ hệ thống, người dùng, dịch vụ
- **Doctor**: Quản lý lịch hẹn, hồ sơ bệnh án, dịch vụ y tế
- **Staff**: Xử lý đặt lịch, quản lý khách hàng, dịch vụ
- **User**: Khách hàng sử dụng dịch vụ, theo dõi thú cưng

### 🐕 Quản lý thú cưng
- Đăng ký và quản lý thông tin thú cưng
- Theo dõi lịch sử sức khỏe
- Quản lý hồ sơ bệnh án
- Lưu trữ hình ảnh và tài liệu

### 📅 Quản lý lịch hẹn
- Đặt lịch hẹn với bác sĩ
- Quản lý lịch trình khám bệnh
- Nhắc nhở lịch tái khám
- Theo dõi trạng thái lịch hẹn

### 🏥 Dịch vụ chăm sóc
- Khám chữa bệnh
- Làm đẹp và spa
- Lưu trú và chăm sóc
- Các dịch vụ đặc biệt

### 👥 Quản lý khách hàng
- Hồ sơ khách hàng
- Lịch sử sử dụng dịch vụ
- Thông tin liên hệ
- Theo dõi thanh toán

## 🛠️ Công nghệ sử dụng

### Frontend
- **React.js 18.2.0** - Framework UI
- **React Router DOM 6.22.0** - Định tuyến
- **Axios 1.6.7** - HTTP client
- **Zustand 4.5.0** - State management
- **React Icons 5.0.1** - Icon library
- **Lucide React 0.323.0** - Icon components
- **React Toastify 11.0.5** - Thông báo
- **Recharts 2.11.0** - Biểu đồ
- **Tailwind CSS 3.4.1** - CSS framework

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **MongoDB 6.16.0** - Database
- **Mongoose 8.15.1** - ODM
- **JWT 9.0.2** - Authentication
- **Bcrypt 6.0.0** - Password hashing
- **CORS 2.8.5** - Cross-origin resource sharing
- **Cookie Parser 1.4.7** - Cookie handling

## 📁 Cấu trúc dự án

```
IT4549-28/
├── frontend/                 # React frontend
│   ├── public/              # Static files
│   ├── src/
│   │   ├── admin/           # Admin interface
│   │   ├── doctor/          # Doctor interface
│   │   ├── staff/           # Staff interface
│   │   ├── users/           # User interface
│   │   ├── login/           # Login components
│   │   ├── routes/          # Route definitions
│   │   ├── store/           # State management
│   │   ├── lib/             # Utilities and libraries
│   │   └── utils/           # Helper functions
│   └── package.json
├── backend/                  # Node.js backend
│   ├── controllers/         # Business logic
│   ├── models/              # Database models
│   ├── routes/              # API endpoints
│   ├── middlewares/         # Request middleware
│   └── index.js             # Server entry point
└── README.md
```

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js (version 16 trở lên)
- MongoDB
- npm hoặc yarn

### Bước 1: Clone dự án
```bash
git clone <repository-url>
cd IT4549-28
```

### Bước 2: Cài đặt dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

### Bước 3: Cấu hình môi trường

Tạo file `.env` trong thư mục `backend`:
```env
PORT=3001
DATABASE_URL=mongodb://localhost:27017/pet-care-center
JWT_SECRET=your-secret-key
ORIGIN=http://localhost:3000
```

### Bước 4: Chạy ứng dụng

#### Chạy Backend
```bash
cd backend
npm run dev
```
Server sẽ chạy tại: `http://localhost:3001`

#### Chạy Frontend
```bash
cd frontend
npm start
```
Ứng dụng sẽ chạy tại: `http://localhost:3000`

## 👤 Tài khoản demo

### Admin
- **Username**: admin
- **Password**: 123456

### User (Khách hàng)
- **Username**: user
- **Password**: 123456

### Staff (Nhân viên)
- **Username**: staff
- **Password**: 123456

### Doctor (Bác sĩ)
- **Username**: doctor
- **Password**: 123456

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/get-user-info` - Lấy thông tin user
- `POST /api/auth/logout` - Đăng xuất

### Pets
- `GET /api/pets/get-all-pets` - Lấy danh sách thú cưng
- `POST /api/pets/add-pet` - Thêm thú cưng
- `GET /api/pets/get-pet-by-id/:id` - Lấy thông tin thú cưng
- `DELETE /api/pets/delete-pet/:id` - Xóa thú cưng

### Users
- `GET /api/users/list-user` - Danh sách người dùng
- `POST /api/users/add-user` - Thêm người dùng
- `PUT /api/users/update-user` - Cập nhật người dùng
- `DELETE /api/users/delete-user` - Xóa người dùng

### Services
- `GET /api/services/list-service` - Danh sách dịch vụ
- `POST /api/services/add-service` - Thêm dịch vụ
- `PUT /api/services/update-service` - Cập nhật dịch vụ
- `DELETE /api/services/delete-service` - Xóa dịch vụ

### Appointments
- `GET /api/appointments` - Danh sách lịch hẹn
- `POST /api/appointments` - Tạo lịch hẹn
- `PUT /api/appointments` - Cập nhật lịch hẹn
- `DELETE /api/appointments` - Xóa lịch hẹn

### Customers
- `GET /api/customers` - Danh sách khách hàng
- `POST /api/customers` - Thêm khách hàng
- `PUT /api/customers/:id` - Cập nhật khách hàng
- `DELETE /api/customers/:id` - Xóa khách hàng

## 🗄️ Cấu trúc Database

### Models chính
- **UserModel** - Quản lý người dùng hệ thống
- **AccountModel** - Tài khoản đăng nhập
- **PetModel** - Thông tin thú cưng
- **CustomerModel** - Thông tin khách hàng
- **ServiceModel** - Dịch vụ chăm sóc
- **AppointmentModel** - Lịch hẹn
- **MediaRecordModel** - Hồ sơ bệnh án
- **CanPerformModel** - Quan hệ bác sĩ-dịch vụ
- **IsAssignedToModel** - Phân công công việc

## 🎨 Giao diện người dùng

### Admin Dashboard
- Quản lý người dùng và phân quyền
- Thống kê tổng quan hệ thống
- Quản lý dịch vụ và giá cả
- Báo cáo doanh thu

### Doctor Interface
- Quản lý lịch hẹn khám bệnh
- Hồ sơ bệnh án thú cưng
- Dịch vụ y tế chuyên môn
- Lịch trình làm việc

### Staff Interface
- Xử lý đặt lịch hẹn
- Quản lý khách hàng
- Dịch vụ chăm sóc cơ bản
- Theo dõi thanh toán

### User Interface
- Đặt lịch hẹn cho thú cưng
- Theo dõi tình trạng sức khỏe
- Xem lịch sử dịch vụ
- Quản lý thông tin cá nhân

## 🔧 Tính năng kỹ thuật

- **Responsive Design** - Tương thích mọi thiết bị
- **Real-time Updates** - Cập nhật thời gian thực
- **File Upload** - Tải lên hình ảnh và tài liệu
- **Search & Filter** - Tìm kiếm và lọc dữ liệu
- **Data Visualization** - Biểu đồ thống kê
- **Export Data** - Xuất báo cáo
- **Notification System** - Hệ thống thông báo

## 🤝 Đóng góp

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Dự án này được phát triển cho mục đích học tập và nghiên cứu.

## 📞 Liên hệ

Nếu có bất kỳ câu hỏi hoặc đề xuất nào, vui lòng liên hệ:
- Email: [your-email@example.com]
- GitHub: [your-github-profile]

---

**Lưu ý**: Đây là phiên bản demo, vui lòng cập nhật thông tin liên hệ và cấu hình phù hợp trước khi triển khai production.

