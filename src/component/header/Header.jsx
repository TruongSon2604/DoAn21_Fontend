import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
// import { Link } from "react-router-dom";
import "./Header.scss";
//
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import {
  apiGet,
  apiGetWithToken,
  apiPostWithToken,
} from "../../Service/apiService";
import { ProductContext } from "../../Providerrs/ProductContext";

function Header() {
  const navigate = useNavigate();
  const [arrowPosition, setArrowPosition] = useState(0);
  const [marginLeft, setmarginLeft] = useState(120);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const isMounted = useRef(true);
  const token = localStorage.getItem("access_token");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  //
  const { products } = useContext(ProductContext);
  const [total, setTotal] = useState(null);

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length >= 1) {
      // Khi người dùng nhập từ 3 ký tự trở lên
      try {
        const response = await apiGet(
          `/products/search?query=${event.target.value}`
        );
        console.log("search", response.data.data);
        if (response.success) {
          setSuggestions(response.data.data); // Cập nhật kết quả tìm kiếm
        }
      } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
      }
    } else {
      setSuggestions([]); // Nếu không có từ khóa tìm kiếm, xóa gợi ý
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const getTotalCart = async () => {
      const rp = await apiGetWithToken("/getCartItem", token);

      if (rp.success) {
        setTotal(rp.data.data.count);
      }
    };
    const loadUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const me = await apiPostWithToken("/auth/me", {}, token);
        if (me.success) {
          setUser(me.data);
          localStorage.setItem("user", JSON.stringify(me.data));
        }
      }
    };
    getTotalCart();
    loadUser();

    if (storedUser && isMounted.current) {
      setUser(JSON.parse(storedUser));
    }

    return () => {
      isMounted.current = false; // Đánh dấu component đã unmount
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  const getMargin = () => {
    const container = document.querySelector(".container");
    if (container) {
      const style = window.getComputedStyle(container);
      const marginLeftValue = parseInt(style.marginLeft, 10);
      if (isNaN(marginLeftValue)) {
        console.error("Invalid marginLeft value");
      } else {
        console.log("Margin left:", marginLeftValue);
        setmarginLeft(marginLeftValue);
      }
    } else {
      console.error("Container element not found");
    }
  };

  window.addEventListener("resize", getMargin);
  const handleMouseEnter = (event) => {
    const rect = event.target.getBoundingClientRect();
    console.log(rect.left + rect.width / 2 - (marginLeft + 30));
    setArrowPosition(rect.left + rect.width / 2 - (marginLeft + 30));
  };

  const logout = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.log("No token found. User is not logged in.");
      return;
    }

    try {
      const response = await apiPostWithToken("/auth/logout", {}, token);
      if (response.success) {
        console.log("Logout successful");
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_at");
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
        }
        if (localStorage.getItem("image")) {
          localStorage.removeItem("image");
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
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_at");
        if (localStorage.getItem("image")) {
          localStorage.removeItem("image");
        }
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        navigate("/sign-in");
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <header id="header" className="header">
      <div className="container abc">
        <div className="top-bar">
          {/* bar */}
          <div className="top-bar__more js-toggle" onClick={toggleNav}>
            <FaBars className="top-bar__more--icon icon" />
          </div>
          {/* logo */}
          <Link to="/" className="custom-link">
            <div className="logo">
              <img src={assets.icon} alt="" className="logo__img" />
              <h1 className="logo__title">CoffeeMart</h1>
            </div>
          </Link>

          <nav className={`nav ${isNavVisible ? "show" : "hide"}`} id="nav">
            <ul className="nav__list">
              {/* <li className="nav_item" onMouseEnter={handleMouseEnter}>
                <Link to="/voucher" className="nav__link">
                  Voucher
                </Link>
                <div
                  className="dropdown"
                  style={{
                    "--arrow-position": `${arrowPosition}px`,
                  }}
                >
                  <div className="dropdown__inner">
                    Lorem2 ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur perferendis animi doloremque laudantium, illo
                    excepturi tempora, ad, voluptatibus hic quis placeat culpa
                    explicabo nostrum aspernatur reprehenderit ipsa ex
                    perspiciatis? Asperiores?
                  </div>
                </div>
              </li> */}
              <li className="nav_item" onMouseEnter={handleMouseEnter}>
                <Link to="/featureProduct" className="nav__link">
                  Featured Product
                </Link>
              </li>
              <li className="nav_item" onMouseEnter={handleMouseEnter}>
                <Link to="/voucher" className="nav__link">
                  Voucher
                </Link>
              </li>
              <li className="nav_item" onMouseEnter={handleMouseEnter}>
                <Link to="/news" className="nav__link">
                  News
                </Link>
              </li>
            </ul>
          </nav>

          <div className="nav__overlay" onClick={toggleNav}></div>
          {/* action  */}
          <div className="top-act">
            <div className="group">
              <svg
                className="icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
                style={{ cursor: "pointer" }}
              >
                <g>
                  <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </g>
              </svg>
              <input
                placeholder="Search"
                type="search"
                className="input"
                value={searchTerm}
                onChange={handleSearch}
                // onChange={(e) => alert(e.target.value)}
              />
              {suggestions.length > 0 && (
                <ul className="search-item">
                  {suggestions.map((product) => (
                    <Link
                      to={`/preview-product/${product.id}`}
                      key={product.id}
                    >
                      <li className="search-item__product">
                        <img
                          src={`${API_URL_LOCAL}/${product.image}`}
                          alt={product.name}
                          style={{ width: "30px" }}
                          className="search-item__image"
                        />
                        <span className="search-item__name">
                          {product.name}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>

            {token ? (
              <>
                <div className="top-act__group">
                  {/* <Link to="/favourite">
                    <button className="top-act__btn">
                      <FaHeart className="top-act__icon" />
                      <span className="top-act__title">03</span>
                    </button>
                  </Link> */}

                  <div className="top-act__separate"></div>
                  <Link to={"/cart"}>
                    <button className="top-act__btn2">
                      <FaCartShopping className="top-act__icon2" />
                      <span className="top-act__title2">{total}</span>
                    </button>
                  </Link>
                </div>
                <div className="top-act__user">
                  <img
                    src={
                      user?.image?.startsWith("http")
                        ? user.image
                        : `${API_URL_LOCAL}/${user?.image || assets.Duser}`
                    }
                    alt=""
                    className="top-act__avatar"
                    onClick={toggleDropdown}
                  />
                  {isOpen && (
                    <div className="dropdown-menu">
                      <Link to="/profile" className="dropdown-item">
                        <FaUser /> Profile
                      </Link>
                      <Link to="/settings" className="dropdown-item">
                        <FaCog /> Settings
                      </Link>
                      <div className="dropdown-item" onClick={logout}>
                        <FaSignOutAlt /> Log Out
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="top-act__login">
                <Link to="/sign-in">
                  <button className="btn btn-text">Sign in</button>
                </Link>
                <Link to="/sign-up">
                  <button className="btn btn-warning">Sign Up</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
