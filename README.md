my-fullstack-app/
├── client/                  # Frontend: React
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                 # biến môi trường (frontend)
│   ├── vite.config.js
│   └── package.json         # dependencies cho React
│
├── server/                  # Backend: Node.js + Express
│   ├── controllers/         # Xử lý logic (Controller)
│   ├── models/              # Mongoose schema (MongoDB)
│   ├── routes/              # Các route API
│   ├── config/              # Kết nối MongoDB, config server
│   ├── middleware/          # Middleware (auth, logger...)
│   ├── index.js             # Điểm bắt đầu Express server
│   ├── .env                 # biến môi trường (backend)
│   └── package.json         # dependencies cho server
│
├── .gitignore
└── README.md


### Chạy frontend

1. Cài đặt các gói cần thiết: `npm install`
2. Cài thêm tailwindcss: `npx tailwindcss init -p`
2. Cài đặt các icon: `npm install react-icons`
3. Cài đặt các icon: `npm install react-router-dom`
4. Cài đặt các icon: `npm install react-scripts`
5. Cài đặt biểu đồ: `npm install recharts`
6. Chạy ứng dụng: `npm start`
7. Mở trình duyệt và truy cập `http://localhost:3000`


TK demo
admin: admin
pass: 123456

user: user
pass: 123456

staff: staff
pass: 123456

doctor: doctor
pass: 123456

