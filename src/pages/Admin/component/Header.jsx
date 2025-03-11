import React, { useEffect, useState } from "react";
import "./Header.scss";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { assets } from "../../../assets/assets";
import { apiPostWithToken } from "../../../Service/apiService";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const API_URL = import.meta.env.VITE_URL;
  const imageUser = localStorage.getItem("image");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const checkSession = () => {
      const expiresAtStr = localStorage.getItem("expires_at");

      if (!expiresAtStr) return;

      const expiresAt = parseInt(expiresAtStr, 10);
      console.log(Date.now(), expiresAt);
      if (Date.now() > expiresAt) {
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
        }
        if (localStorage.getItem("selectedProducts")) {
          localStorage.removeItem("selectedProducts");
        }
        if (localStorage.getItem("image")) {
          localStorage.removeItem("image");
        }
        localStorage.removeItem("access_token_admin");
        localStorage.removeItem("expires_at");
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        navigate("/sign-in");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  const logout = async () => {
    const token = localStorage.getItem("access_token_admin");

    if (!token) {
      console.log("No token found. User is not logged in.");
      return;
    }

    try {
      const response = await apiPostWithToken("/auth/logout", {}, token);
      if (response.success) {
        console.log("Logout successful");
        localStorage.removeItem("access_token_admin");
        localStorage.removeItem("expires_at");
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
        }
        if (localStorage.getItem("image")) {
          localStorage.removeItem("image");
        }
        if (localStorage.getItem("selectedProducts")) {
          localStorage.removeItem("selectedProducts");
        }
        window.location.href = "/sign-in";
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <header className="header">
      <div className="search-box">
        <input type="text" placeholder="Tìm kiếm..." />
        <button>🔍</button>
      </div>
      {/* <div className="user-profile">
      <img src={`${API_URL}/${imageUser}`} alt="Avatar" />
        
      </div> */}
      <div className="user-profile">
        <img
          style={{
            border: "3px solid grey",
            padding: "1px",
            cursor: "pointer",
          }}
          src={`${API_URL}/${imageUser}`}
          alt="Avatar"
          onClick={toggleDropdown}
        />

        {isOpen && (
          <div className="dropdown-menu">
            {/* <Link to="/profile" className="dropdown-item">
                          <FaUser /> Profile
                        </Link>
                        <Link to="/settings" className="dropdown-item">
                          <FaCog /> Settings
                        </Link> */}
            <div className="dropdown-item" onClick={logout}>
              <FaSignOutAlt /> Log Out
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
