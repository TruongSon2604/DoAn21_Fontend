import React, { useEffect, useRef, useState } from "react";
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
import { apiPostWithToken } from "../../Service/apiService";

function Header() {
  const navigate = useNavigate();
  const [arrowPosition, setArrowPosition] = useState(0);
  const [marginLeft, setmarginLeft] = useState(120);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 
  const [user, setUser] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

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
    const token = localStorage.getItem('access_token');
  
    if (!token) {
      console.log('No token found. User is not logged in.');
      return;
    }
  
    try {
          const response = await apiPostWithToken('/auth/logout', {}, token);          
          if (response.success) {
            console.log('Logout successful');
            localStorage.removeItem('access_token');
            localStorage.removeItem("expires_at");
            if(localStorage.getItem('user'))
              {
                localStorage.removeItem("user");
              }
            window.location.href = '/sign-in';
          } else {
            console.error(response.message);
          }       
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const checkSession = () => {
      const expiresAtStr = localStorage.getItem("expires_at");
  
      if (!expiresAtStr) return; // Không có dữ liệu thì không làm gì
  
      const expiresAt = parseInt(expiresAtStr, 10); // Chuyển về số nguyên
      // alert(Date.now());
      console.log(Date.now(),expiresAt);
      if (Date.now() > expiresAt) {
        if(localStorage.getItem('user'))
        {
          localStorage.removeItem("user");
        }
        localStorage.removeItem("access_token");
        localStorage.removeItem("expires_at");
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
              <h1 className="logo__title">grocery</h1>
            </div>
          </Link>

          <nav className={`nav ${isNavVisible ? "show" : "hide"}`} id="nav">
            <ul className="nav__list">           
              <li className="nav_item" onMouseEnter={handleMouseEnter}>
                <Link to="/grocery/test" className="nav__link">
                  Grocery
                  <RiArrowDropDownLine className="navbar_dropdown" />
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
              </li>
              <li className="nav_item" onMouseEnter={handleMouseEnter}>
                <Link to="/grocery" className="nav__link">
                  Beauty
                  <RiArrowDropDownLine className="nav_dropdown" />
                </Link>
                <div
                  className="dropdown"
                  style={{
                    "--arrow-position": `${arrowPosition}px`,
                  }}
                >
                  <div className="dropdown__inner">
                    Lorem3 ipsum dolor sit amet consectetur adipisicing elit.
                    Consequatur perferendis animi doloremque laudantium, illo
                    excepturi tempora, ad, voluptatibus hic quis placeat culpa
                    explicabo nostrum aspernatur reprehenderit ipsa ex
                    perspiciatis? Asperiores?
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          <div className="nav__overlay" onClick={toggleNav}></div>
          {/* action  */}
          <div className="top-act">
            
            <div className="group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
            <input placeholder="Search" type="search" className="input"/>
          </div>
        
            <div className="top-act__group">
              <button className="top-act__btn">
                <FaHeart className="top-act__icon" />
                <span className="top-act__title">03</span>
              </button>
              <div className="top-act__separate"></div>
              <Link to={"/cart"}>
              <button className="top-act__btn">
                <FaCartShopping className="top-act__icon" />
                <span className="top-act__title">$65.42</span>
              </button>
              </Link>
            </div>
            <div className="top-act__user">
            {/* <div>{user ? `Hello, ${user}` : "Not logged in"}</div> */}
            <img src={user?.image || assets.avatar} alt="" className="top-act__avatar" onClick={toggleDropdown} />
              {isOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item">
                    <FaUser /> Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <FaCog /> Settings
                  </Link>
                  <div className="dropdown-item"  onClick={logout}>
                    <FaSignOutAlt /> Log Out
                  </div>
                </div>
              )}
            </div>
            
            {/* <div className="top-act__login">
              <Link to="/sign-in">
                <button className="btn btn-text">Sign in</button>
              </Link>
              <Link to="/sign-up">
                <button className="btn btn-warning">Sign Up</button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;