import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import { assets } from "../../../assets/assets";

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  return (
    <aside className="sidebar">
      <div className="logo">
        Grocery Mart <img src={assets.IconPrimary} alt="" />
      </div>
      <ul className="menu">
        <Link to="/admin" onClick={() => setActiveItem("/admin")}>
          <li className={activeItem === "/admin" ? "active" : ""}>
            <i>🏠</i> Dashboard
          </li>
        </Link>
        <Link to="/admin/product" onClick={() => setActiveItem("/admin/product")}>
          <li className={activeItem === "/admin/product" ? "active" : ""}>
            <i>📦</i> Sản phẩm
          </li>
        </Link>
        <Link to="/admin/order" onClick={() => setActiveItem("/admin/order")}>
          <li className={activeItem === "/admin/order" ? "active" : ""}>
            <i>🛒</i> Đơn hàng
          </li>
        </Link>
        <Link to="/admin/category" onClick={() => setActiveItem("/admin/category")}>
          <li className={activeItem === "/admin/category" ? "active" : ""}>
            <i>📋</i> Danh mục
          </li>
        </Link>
        <Link to="/admin/user" onClick={() => setActiveItem("/admin/user")}>
          <li className={activeItem === "/admin/user" ? "active" : ""}>
            <i>👥</i> Người dùng
          </li>
        </Link>
        <Link to="/admin/setting" onClick={() => setActiveItem("/admin/setting")}>
          <li className={activeItem === "/admin/setting" ? "active" : ""}>
            <i>⚙️</i> Cài đặt
          </li>
        </Link>
        <li className="logout">
          <i>🚪</i> Đăng xuất
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
