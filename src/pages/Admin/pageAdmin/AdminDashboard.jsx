import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaShoppingCart, FaUsers, FaBox, FaDollarSign } from "react-icons/fa";
import "./Dashboard.scss";
import { assets } from "../../../assets/assets";

const Dashboard = () => {
  const data = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 17000 },
    { month: "May", revenue: 22000 },
    { month: "Jun", revenue: 25000 },
  ];

  const stats = [
    { icon: <img src={assets.DCart} alt="" />, label: "Đơn hàng", value: 120 },
    {
      icon: <img src={assets.DMoney} alt="" />,
      label: "Doanh thu",
      value: "$45,000",
    },
    {
      icon: <img src={assets.DProduct} alt="" />,
      label: "Sản phẩm",
      value: 320,
    },
    {
      icon: <img src={assets.Duser} alt="" />,
      label: "Người dùng",
      value: 850,
    },
  ];

  return (
    <div className="dashboard">
      {/* Thống kê tổng quan */}
      <div className="stats">
        {stats.map((item, index) => (
          <div key={index} className="card">
            <img src={assets.DCart} alt="" />
            <div>
              <p className="label">{item.label}</p>
              <p className="value">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="chart-card">
        <h2 className="chart-title">Doanh thu hàng tháng</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#4F46E5" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
