import React, { useEffect, useState } from "react";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { assets } from "../../assets/assets";
import { apiGet } from "../../Service/apiService";
import "./IndexAdmin.scss";

export const IndexAdmin = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [RevenueByMonth, setRevenueByMonth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [OrderByMonth, setOrderByMonth] = useState([]);

  // Fetch data from API with proper error handling
  const getProductCount = async () => {
    try {
      const cnt = await apiGet("/productDashboard");
      if (cnt && cnt.success) {
        setProductCount(cnt.data.data);
      }
    } catch (error) {
      console.error("Error fetching product count:", error);
      // Use fallback data in case of API error
      setProductCount(152);
    }
  };

  const getUserCount = async () => {
    try {
      const cnt = await apiGet("/getUserDashBoard");
      if (cnt && cnt.success) {
        setUserCount(cnt.data.data);
      }
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  const getOrderDashBoard = async () => {
    try {
      const cnt = await apiGet("/getOrderDashBoard");
      if (cnt && cnt.success) {
        setOrderCount(cnt.data.data);
      }
    } catch (error) {
      console.error("Error fetching order count:", error);

    }
  };

  const getTotal = async () => {
    try {
      const cnt = await apiGet("/getTotal");
      if (cnt && cnt.success) {
        setTotalRevenue(cnt.data.data);
      }
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  };

  const getRevenueByMonth = async () => {
    try {
      const cnt = await apiGet("/getRevenueByMonth");
      if (cnt && cnt.success) {
        setRevenueByMonth(cnt.data.data);
      }
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  };

  const getOrderByMonth = async () => {
    try {
      const cnt = await apiGet("/getOrderByMonth");
      if (cnt && cnt.success) {
        setOrderByMonth(cnt.data.data);
      }
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  };


  // Fetch all data at component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        getOrderDashBoard(),
        getProductCount(),
        getUserCount(),
        getTotal(),
        getRevenueByMonth(),
        getOrderByMonth(),
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);



  const fullMonthRevenue = Array.from({ length: 12 }, (_, i) => {
    const monthKey = `2025-${String(i + 1).padStart(2, '0')}`;
    const existing = RevenueByMonth.find(item => item.month === monthKey);
    return {
      name: `T${i + 1}`,
      sales: existing ? parseFloat(existing.total_revenue) : 0
    };
  });

  const fullMonthOrder = Array.from({ length: 12 }, (_, i) => {
    const monthKey = `2025-${String(i + 1).padStart(2, '0')}`;
    const existing = OrderByMonth.find(item => item.month === monthKey);
    return {
      name: `T${i + 1}`,
      orders: existing ? parseFloat(existing.total_orders) : 0
    };
  });
  

  // Sample data for charts
  const monthlyData = [
    { name: "T1", sales: 4000, orders: 240 },
    { name: "T2", sales: 3000, orders: 198 },
    { name: "T3", sales: 5000, orders: 300 },
    { name: "T4", sales: 2780, orders: 190 },
    { name: "T5", sales: 1890, orders: 130 },
    { name: "T6", sales: 2390, orders: 150 },
    { name: "T7", sales: 3490, orders: 210 },
    { name: "T8", sales: 4000, orders: 240 },
    { name: "T9", sales: 3300, orders: 200 },
    { name: "T10", sales: 2900, orders: 180 },
    { name: "T11", sales: 4100, orders: 250 },
    { name: "T12", sales: 5200, orders: 310 },
  ];

  const categoryData = [
    { name: "Điện thoại", value: 35 },
    { name: "Laptop", value: 25 },
    { name: "Đồng hồ", value: 15 },
    { name: "Tablet", value: 10 },
    { name: "Phụ kiện", value: 15 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  // Dashboard stats cards
  const stats = [
    {
      icon: <img src={assets.DCart} alt="Orders icon" style={{ width: "50px" }} />,
      label: "Đơn hàng",
      value: orderCount,
    },
    {
      icon: <img src={assets.DMoney} alt="Revenue icon" style={{ width: "50px" }} />,
      label: "Doanh thu",
      value: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(totalRevenue),
    },
    {
      icon: <img src={assets.DProduct} alt="Products icon" style={{ width: "50px" }} />,
      label: "Sản phẩm",
      value: productCount,
    },
    {
      icon: <img src={assets.Duser} alt="Users icon" style={{ width: "50px" }} />,
      label: "Người dùng",
      value: userCount,
    },
  ];

  // Custom formatter for currency
  const currencyFormatter = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="content">
        <Header />
        <section className="dashboard">
          <h1>Thống kê tổng quan</h1>

          {/* Stats Cards */}
          <div className="stats">
            {stats.map((item, index) => (
              <div key={`stat-${index}`} className="card">
                {item.icon}
                <div className="card__info">
                  <p className="label">{item.label}</p>
                  <p className="value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="charts">
            <div className="chart-card sales-chart">
              <h2>Doanh thu theo tháng</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fullMonthRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => currencyFormatter(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} name="Doanh thu" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card orders-chart">
              <h2>Đơn hàng theo tháng</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fullMonthOrder} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid fullMonthOrder="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#82ca9d" name="Đơn hàng" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card category-chart">
              <h2>Thống kê theo danh mục</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="recent-orders">
            <h2>Đơn hàng gần đây</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Khách hàng</th>
                    <th>Ngày đặt</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#ORD001</td>
                    <td>Nguyễn Văn A</td>
                    <td>05/04/2025</td>
                    <td>2.500.000 ₫</td>
                    <td><span className="status delivered">Đã giao</span></td>
                  </tr>
                  <tr>
                    <td>#ORD002</td>
                    <td>Trần Thị B</td>
                    <td>04/04/2025</td>
                    <td>1.800.000 ₫</td>
                    <td><span className="status pending">Đang xử lý</span></td>
                  </tr>
                  <tr>
                    <td>#ORD003</td>
                    <td>Lê Văn C</td>
                    <td>03/04/2025</td>
                    <td>3.200.000 ₫</td>
                    <td><span className="status shipped">Đang giao</span></td>
                  </tr>
                  <tr>
                    <td>#ORD004</td>
                    <td>Phạm Thị D</td>
                    <td>02/04/2025</td>
                    <td>950.000 ₫</td>
                    <td><span className="status delivered">Đã giao</span></td>
                  </tr>
                  <tr>
                    <td>#ORD005</td>
                    <td>Hoàng Văn E</td>
                    <td>01/04/2025</td>
                    <td>4.100.000 ₫</td>
                    <td><span className="status cancelled">Đã hủy</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
