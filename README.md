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
