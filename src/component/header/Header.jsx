import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import "./Header.scss";
//
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa6";

function Header() {
  const [arrowPosition, setArrowPosition] = useState(0);
  const [marginLeft, setmarginLeft] = useState(120);
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
  return (
    <header id="header" className="header">
      <div className="container abc">
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
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav_item" onMouseEnter={handleMouseEnter}>
                <Link href="" className="nav__link">
                  Departments
                  <RiArrowDropDownLine className="nav_dropdown" />
                </Link>
                <div
                  className="dropdown"
                  style={{
                    "--arrow-position": `${arrowPosition}px`,
                  }}
                >
                  <div className="dropdown__inner">
                    <div className="top-menu">
                      <div className="top-menu__main">
                        {/* menu column 1 */}
                        <div className="menu-column">
                          <div className="menu-column__icon">
                            <img
                              src={assets.iconCate1}
                              class="menu-column__icon-1"
                              alt=""
                            />
                            <img
                              src={assets.iconCate2}
                              class="menu-column__icon-2"
                              alt=""
                            />
                          </div>
                          <div className="menu-column__content">
                            <h2 className="menu-column__heading">
                              All Departments
                            </h2>
                            <ul className="menu-column__list">
                              <li className="menu-column__item">
                                <a href="" className="menu-column__link">
                                  Savings & Featured Shops
                                </a>
                                {/* submenu */}
                                <div className="sub-menu">
                                  {/* submenu column1 */}
                                  <div className="sub-menu__column">
                                    <div className="menu-column">
                                      <div className="menu-column__icon">
                                        <img
                                          src={assets.RectanglePurple}
                                          class="menu-column__icon-1"
                                          alt=""
                                        />
                                        <img
                                          src={assets.iconCate2}
                                          class="menu-column__icon-2"
                                          alt=""
                                        />
                                      </div>
                                      <div className="menu-column__content">
                                        <h2 className="menu-column__heading">
                                          TV & Video
                                        </h2>
                                        <ul className="menu-column__list">
                                          <li className="menu-column__item">
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Shop all TVs
                                            </a>
                                          </li>
                                          <li className="menu-column__item">
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              TVs by Size
                                            </a>
                                          </li>
                                          <li className="menu-column__item">
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Smart TVs
                                            </a>
                                          </li>
                                          <li className="menu-column__item">
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Savings & Featured Shops
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="menu-column">
                                      <div className="menu-column__icon">
                                        <img
                                          src={assets.RectanglePurple}
                                          class="menu-column__icon-1"
                                          alt=""
                                        />
                                        <img
                                          src={assets.iconCate2}
                                          class="menu-column__icon-2"
                                          alt=""
                                        />
                                      </div>
                                      <div className="menu-column__content">
                                        <h2 className="menu-column__heading">
                                          TV & Video
                                        </h2>
                                        <ul className="menu-column__list">
                                          <li>
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Shop all TVs
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              TVs by Size
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Smart TVs
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Savings & Featured Shops
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  {/* submenu column2 */}
                                  <div className="sub-menu__column">
                                    <div className="menu-column">
                                      <div className="menu-column__icon">
                                        <img
                                          src={assets.RectanglePurple}
                                          class="menu-column__icon-1"
                                          alt=""
                                        />
                                        <img
                                          src={assets.iconCate2}
                                          class="menu-column__icon-2"
                                          alt=""
                                        />
                                      </div>
                                      <div className="menu-column__content">
                                        <h2 className="menu-column__heading">
                                          TV & Video
                                        </h2>
                                        <ul className="menu-column__list">
                                          <li className="menu-column__item">
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Shop all TVs
                                            </a>
                                          </li>
                                          <li className="menu-column__item">
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              TVs by Size
                                            </a>
                                          </li>
                                          <li className="menu-column__item">
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Smart TVs
                                            </a>
                                          </li>
                                          <li className="menu-column__item">
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Savings & Featured Shops
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="menu-column">
                                      <div className="menu-column__icon">
                                        <img
                                          src={assets.RectanglePurple}
                                          class="menu-column__icon-1"
                                          alt=""
                                        />
                                        <img
                                          src={assets.iconCate2}
                                          class="menu-column__icon-2"
                                          alt=""
                                        />
                                      </div>
                                      <div className="menu-column__content">
                                        <h2 className="menu-column__heading">
                                          TV & Video
                                        </h2>
                                        <ul className="menu-column__list">
                                          <li>
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Shop all TVs
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              TVs by Size
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Smart TVs
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Savings & Featured Shops
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  {/* submenu colum3 */}

                                  <div className="sub-menu__column">
                                    <div className="menu-column">
                                      <div className="menu-column__icon">
                                        <img
                                          src={assets.RectanglePurple}
                                          class="menu-column__icon-1"
                                          alt=""
                                        />
                                        <img
                                          src={assets.iconCate2}
                                          class="menu-column__icon-2"
                                          alt=""
                                        />
                                      </div>
                                      <div className="menu-column__content">
                                        <h2 className="menu-column__heading">
                                          TV & Video
                                        </h2>
                                        <ul className="menu-column__list">
                                          <li className="menu-column__item">
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Shop all TVs
                                            </a>
                                          </li>
                                          <li className="menu-column__item">
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              TVs by Size
                                            </a>
                                          </li>
                                          <li className="menu-column__item">
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Smart TVs
                                            </a>
                                          </li>
                                          <li className="menu-column__item">
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Savings & Featured Shops
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="menu-column">
                                      <div className="menu-column__icon">
                                        <img
                                          src={assets.RectanglePurple}
                                          class="menu-column__icon-1"
                                          alt=""
                                        />
                                        <img
                                          src={assets.iconCate2}
                                          class="menu-column__icon-2"
                                          alt=""
                                        />
                                      </div>
                                      <div className="menu-column__content">
                                        <h2 className="menu-column__heading">
                                          TV & Video
                                        </h2>
                                        <ul className="menu-column__list">
                                          <li>
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Shop all TVs
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              TVs by Size
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Smart TVs
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href=""
                                              className="menu-column__link"
                                            >
                                              Savings & Featured Shops
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li className="menu-column__item">
                                <a href="" className="menu-column__link">
                                  Electronics
                                </a>
                              </li>
                              <li className="menu-column__item">
                                <a href="" className="menu-column__link">
                                  Clothing, Shoes & Accessories
                                </a>
                              </li>
                              <li>
                                <a href="" className="menu-column__link">
                                  Savings & Featured Shops
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav_item" onMouseEnter={handleMouseEnter}>
                <Link href="" className="nav__link">
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
                <Link href="" className="nav__link">
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
