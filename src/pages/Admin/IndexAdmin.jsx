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
  Cell,
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
  const [TotalProductOfCategory, setTotalProductOfCategory] = useState([]);
  const [productSalesData, setProductSalesData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("2025-04"); // Default to January 2025
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;

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

  const getTotalProductOfCategory = async () => {
    try {
      const cnt = await apiGet("/getTotalProductOfCategory");
      if (cnt && cnt.success) {
        console.log("getTotalProductOfCategory", cnt.data.data);
        setTotalProductOfCategory(cnt.data.data);
      }
    } catch (error) {
      console.error("Error fetching total revenue:", error);
    }
  };

  const getProductSalesForMonth = async (month) => {
    try {
      const response = await apiGet(`/getDetailProductSoldByMonth/${month}`);
      if (response && response.success) {
        setProductSalesData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching product sales data:", error);
      setProductSalesData([]);
    }
  };

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
        getTotalProductOfCategory(),
        getProductSalesForMonth(),
      ]);
      await getProductSalesForMonth(selectedMonth);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    getProductSalesForMonth(selectedMonth);
  }, [selectedMonth]);

  const fullMonthRevenue = Array.from({ length: 12 }, (_, i) => {
    const monthKey = `2025-${String(i + 1).padStart(2, "0")}`;
    const existing = RevenueByMonth.find((item) => item.month === monthKey);
    return {
      name: `T${i + 1}`,
      sales: existing ? parseFloat(existing.total_revenue) : 0,
    };
  });

  const fullMonthOrder = Array.from({ length: 12 }, (_, i) => {
    const monthKey = `2025-${String(i + 1).padStart(2, "0")}`;
    const existing = OrderByMonth.find((item) => item.month === monthKey);
    return {
      name: `T${i + 1}`,
      orders: existing ? parseFloat(existing.total_orders) : 0,
    };
  });

  const transformedData = TotalProductOfCategory.map((item, index) => ({
    id: index + 1,
    name: item.name,
    total_products: item.total_products,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const currencyFormatter = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const getMonthName = (monthKey) => {
    const monthNum = parseInt(monthKey.split("-")[1]);
    return `Tháng ${monthNum}`;
  };

  const ProductSalesBarChart = ({ data }) => {
    const sortedData = [...data].sort((a, b) => b.quantity - a.quantity);

    return (
      <div className="product-sales-chart">
        {sortedData.map((product, index) => (
          // <div key={`product-bar-${index}`} className="product-bar-container">
          //   <div className="product-bar-info">
          //     <div className="product-image-small">
          //       <img
          //         src={`${API_URL_LOCAL}/${product.image_url}`}
          //         className="product-card__thumb"
          //         alt=""
          //       />
          //     </div>
          //     <span className="product-name">{product.product_name}</span>
          //   </div>
          //   <div className="product-bar-wrapper">
          //     <div
          //       className="product-bar"
          //       style={{
          //         width: `${
          //           (product.quantity /
          //             Math.max(...sortedData.map((p) => p.quantity))) *
          //           100
          //         }%`,
          //         backgroundColor: COLORS[index % COLORS.length],
          //       }}
          //     >
          //       <span className="product-quantity">{product.quantity}</span>
          //     </div>
          //   </div>
          // </div>
          <div key={`product-bar-${index}`} className="product-bar-container">
            <div className="product-bar-info">
              <div className="product-image-small">
                <img
                  src={`${API_URL_LOCAL}/${product.image_url}`}
                  className="product-card__thumb"
                  alt=""
                />
              </div>
              <span className="product-name" title={product.product_name}>
                {product.product_name}
              </span>
            </div>
            <div className="product-bar-wrapper">
              <div
                className="product-bar"
                style={{
                  width: `${
                    (product.quantity /
                      Math.max(...sortedData.map((p) => p.quantity))) *
                    100
                  }%`,
                  backgroundColor: COLORS[index % COLORS.length],
                }}
              >
                <span className="product-quantity">{product.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const stats = [
    {
      icon: (
        <img src={assets.DCart} alt="Orders icon" style={{ width: "50px" }} />
      ),
      label: "Đơn hàng",
      value: orderCount,
    },
    {
      icon: (
        <img src={assets.DMoney} alt="Revenue icon" style={{ width: "50px" }} />
      ),
      label: "Doanh thu",
      value: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(totalRevenue),
    },
    {
      icon: (
        <img
          src={assets.DProduct}
          alt="Products icon"
          style={{ width: "50px" }}
        />
      ),
      label: "Sản phẩm",
      value: productCount,
    },
    {
      icon: (
        <img src={assets.Duser} alt="Users icon" style={{ width: "50px" }} />
      ),
      label: "Người dùng",
      value: userCount,
    },
  ];

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
                <LineChart
                  data={fullMonthRevenue}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => currencyFormatter(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    strokeWidth={2}
                    name="Doanh thu"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card orders-chart">
              <h2>Đơn hàng theo tháng</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={fullMonthOrder}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
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
                    data={transformedData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="total_products"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {transformedData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* New Product Sales by Month Section */}
          <div className="monthly-product-sales-section">
            <div className="section-header">
              <h2>Số lượng sản phẩm bán ra trong tháng</h2>
              <div className="month-selector">
                <label htmlFor="month-select">Chọn tháng: </label>
                <select
                  id="month-select"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthKey = `2025-${String(i + 1).padStart(2, "0")}`;
                    return (
                      <option key={monthKey} value={monthKey}>
                        Tháng {i + 1}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="loading">Đang tải dữ liệu...</div>
            ) : (
              <div className="product-sales-container">
                <h3>
                  {getMonthName(selectedMonth)} - Số lượng bán ra theo sản phẩm
                </h3>
                <ProductSalesBarChart data={productSalesData} />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};
