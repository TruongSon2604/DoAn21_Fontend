import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import { assets } from "../../../assets/assets";
import { FaRobot } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  return (
    <aside className="sidebar">
      <div className="logo">
        Coffee Mart <img src={assets.IconPrimary} alt="" />
      </div>
      <ul className="menu">
        <Link to="/admin" onClick={() => setActiveItem("/admin")}>
          <li className={activeItem === "/admin" ? "active" : ""}>
            <i>🏠</i> Dashboard
          </li>
        </Link>
       
        <Link
          to="/admin/product"
          onClick={() => setActiveItem("/admin/product")}
        >
          <li className={activeItem === "/admin/product" ? "active" : ""}>
            <i>📦</i> Sản phẩm
          </li>
        </Link>
        <Link to="/admin/order" onClick={() => setActiveItem("/admin/order")}>
          <li className={activeItem === "/admin/order" ? "active" : ""}>
            <i>🛒</i> Đơn hàng
          </li>
        </Link>
        <Link
          to="/admin/category"
          onClick={() => setActiveItem("/admin/category")}
        >
          <li className={activeItem === "/admin/category" ? "active" : ""}>
            <i>📋</i> Danh mục
          </li>
        </Link>
        <Link to="/admin/coupon" onClick={() => setActiveItem("/admin/coupon")}>
          <li className={activeItem === "/admin/coupon" ? "active" : ""}>
            <i>🏷️</i> Phiếu giảm giá
          </li>
        </Link>
        {/* <Link to="/admin/user" onClick={() => setActiveItem("/admin/user")}>
          <li className={activeItem === "/admin/user" ? "active" : ""}>
            <i>👥</i> Người dùng
          </li>
        </Link> */}
        <Link to="/admin/post" onClick={() => setActiveItem("/admin/post")}>
          <li className={activeItem === "/admin/post" ? "active" : ""}>
            <i>📰</i> Bài viết
          </li>
        </Link>

        <Link
          to="/admin/generateAiRecommendations"
          onClick={() => setActiveItem("/admin/generateAiRecommendations")}
          style={{ backgroundColor: "brown" }}
        >
          <li
            className={
              activeItem === "/admin/generateAiRecommendations" ? "active" : ""
            }
            style={{ backgroundColor: "brown", textAlign:'center', lineHeight:1.2 }}
          >
            <i>
              <FaRobot />
            </i>{" "}
            GENERATE AI RECOMMENDATIONS
          </li>
        </Link>
        {/* <li className="logout">
          <i>🚪</i> Đăng xuất
        </li> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
