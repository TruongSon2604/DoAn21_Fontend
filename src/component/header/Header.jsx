import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import "./Header.scss";
//
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa6";
//
// import "../../scssFolder/base/_mixin.scss";

function Header() {
  return (
    <header id="header" className="header">
      <div className="container">
        <div className="top-bar">
          {/* bar */}
          <div className="top-bar__more">
            <FaBars className="top-bar__more--icon icon" />
          </div>
          {/* logo */}
          <Link to="/" className="custom-link">
            <div className="logo">
              <img src={assets.icon} alt="" className="logo__img" />
              <h1 className="logo__title">grocery</h1>
            </div>
          </Link>

          {/* navbar */}
          <nav className="navbar">
            <ul className="navbar__list">
              <li>
                <a href="" className="navbar__link">
                  Departments
                  <RiArrowDropDownLine className="navbar_dropdown" />
                </a>
              </li>
              <li>
                <a href="" className="navbar__link">
                  Grocery
                  <RiArrowDropDownLine className="navbar_dropdown" />
                </a>
              </li>
              <li>
                <a href="" className="navbar__link">
                  Beauty
                  <RiArrowDropDownLine className="navbar_dropdown" />
                </a>
              </li>
            </ul>
          </nav>
          {/* action  */}
          <div className="top-act">
            <div className="top-act__group top-act__icon--single">
              <button className="top-act__btn">
                <FaSearch className="top-act__icon" />
              </button>
            </div>
            <div className="top-act__group">
              <button className="top-act__btn">
                <FaHeart className="top-act__icon" />
                <span className="top-act__title">03</span>
              </button>
              <div className="top-act__separate"></div>
              <button className="top-act__btn">
                <FaCartShopping className="top-act__icon" />
                <span className="top-act__title">$65.42</span>
              </button>
            </div>
            <div className="top-act__user">
              <img src={assets.avatar} alt="" className="top-act__avatar" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
