import React from "react";
import { assets } from "../../assets/assets";
import "./Footer.scss";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <div className="container footer_container">
        <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12 item-1 col-12">
            <div className="footer__logo">
              <img src={assets.icon} alt="" />
              <h2>CoffeeMart</h2>
            </div>
            <div className="footer__description about-us-description">
              CoffeeMart is a cozy and vibrant coffee shop that offers a warm
              atmosphere perfect for relaxing or catching up with friends.
            </div>
            <span className="footer__span">
              Receive product news and updates
            </span>
            <div className="footer__info">
              <input
                type="text"
                placeholder="Email address"
                className="footer__input"
              />
              <button className="footer__btn">SEND</button>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6 item-2 col-6">
            <h3 className="footer__heading">SHOP</h3>
            <ul className="footer_shoplist">
              <li>
                <Link>All Departments</Link>
              </li>
              <li>
                <Link>Fashion Deals</Link>
              </li>
              <li>
                <Link>Electronics Discount</Link>
              </li>
              <li>
                <Link>Home & Living Special</Link>
              </li>
              <li>
                <Link>Beautiful Bargains</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6 item-3 col-6">
            <h3 className="footer__heading">Support</h3>
            <ul className="footer_shoplist">
              <li>
                <Link>Store Location</Link>
              </li>
              <li>
                <Link>Order status</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6 item-4 col-6">
            <h3 className="footer__heading">COMPANY</h3>
            <ul className="footer_shoplist">
              <li>
                <Link>Customers Service</Link>
              </li>
              <li>
                <Link>Term of use</Link>
              </li>
              <li>
                <Link>Privacy</Link>
              </li>
              <li>
                <Link>Careers</Link>
              </li>
              <li>
                <Link>About</Link>
              </li>
              <li>
                <Link>Affiliates</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-6 item-5 col-6">
            <h3 className="footer__heading">CONTACT</h3>
            <ul className="footer_shoplist">
              <li>
                <Link>All Departments</Link>
              </li>
              <li>
                <Link>Fashion Deals</Link>
              </li>
              <li>
                <Link>Electronics Discount</Link>
              </li>
              <li>
                <Link>Home & Living Special</Link>
              </li>
              <li>
                <Link>Beautiful Bargains</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
