import React, { useState, useEffect } from "react";
import "./FlashSale.scss";
import { assets } from "../../assets/assets";
import { apiGet } from "../../Service/apiService";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FlashSale = () => {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  // State for countdown timer
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 59,
    seconds: 54,
  });
  const [product2, setProduct2] = useState([]);
  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1;
        const newMinutes =
          newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;

        return {
          hours: newHours < 0 ? 0 : newHours,
          minutes: newMinutes < 0 ? 59 : newMinutes,
          seconds: newSeconds < 0 ? 59 : newSeconds,
        };
      });
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format time with leading zero
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const getproduct = async () => {
    const rp = await apiGet("/getproductDiscount");
    if (rp.success) {
      console.log("rp.data.data", rp.data.data);
      setProduct2(rp.data.data);
    }
  };

  useEffect(() => {
    getproduct();
  }, []);

  // Product data

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="flash-sale-header">
        <div className="flash-sale-title-section">
          <h2 className="flash-sale-title">
            <span style={{ color: "gold", fontSize: "24px" }}>⚡</span>Flash
            Sale
          </h2>
          <div className="flash-sale-timer">
            <div className="timer-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" />
              </svg>
            </div>
            <div className="timer-digits">
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
              {formatTime(timeLeft.seconds)}
            </div>
          </div>
        </div>
        <a href="/flash-sale" className="shop-all-link">
          SHOP ALL PRODUCTS
        </a>
      </div>
      <div className="row">
        <Slider {...settings}>
          {product2.map((product) => (
            <div className="col-md-3" key={product.id}>
              <Link to={`/preview-product/${product.id}`}>
                <div className="product-card">
                  <div className="product-image-container">
                    <img
                      // src={assets.ItemCafe1}
                      src={`${API_URL_LOCAL}/${product.image}`}
                      alt={product.image}
                      className="product-image"
                    />

                    <div className="discount-badge">
                      {product.discount_percent}%
                    </div>
                  </div>
                  <div className="product-details">
                    <h3 className="product-title">{product.name}</h3>
                    <div className="product-price">
                      <span className="current-price">
                        Price Discount:
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.discounted_price)}
                      </span>
                      <span className="original-price">
                        Price Original:
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.original_price)}
                      </span>
                    </div>
                    <div className="product-progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${Math.min(100, product.sold_quantity / 1)}%`,
                        }}
                      ></div>
                    </div>
                    <div className="sold-count">
                      {product.sold_quantity} sold_quantity
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FlashSale;
