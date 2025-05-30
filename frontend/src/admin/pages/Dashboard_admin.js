import React from "react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import "../styles/AdminDashboard.css";

const revenueData = [
  { month: "T1", revenue: 8 },
  { month: "T2", revenue: 12 },
  { month: "T3", revenue: 10 },
  { month: "T4", revenue: 15 },
  { month: "T5", revenue: 18 },
];

const bookingData = [
  { name: "Đã đặt", value: 75 },
  { name: "Phòng trống", value: 25 },
];

const colors = ["#8884d8", "#82ca9d"];

const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Thống kê tổng quan</h2>

      {/* Tổng doanh thu */}
      <div className="total-revenue-box">
        <h3>Tổng doanh thu:</h3>
        <p>{totalRevenue.toLocaleString()} triệu VND</p>
      </div>

      <div className="dashboard-grid">
        {/* Biểu đồ doanh thu */}
        <div className="dashboard-card">
          <h3>Doanh thu theo tháng</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ tình trạng phòng */}
        <div className="dashboard-card">
          <h3>Tình trạng phòng</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={bookingData} dataKey="value" outerRadius={80} label>
                {bookingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
