import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import "./SlideShow.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function SlideShow() {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="slideshow">
      <div className="slideshow__inner">
        <Slider {...settings}>
          <div className="slideshow__item">
            <img src={assets.slide} alt="" className="slideshow__img" />
          </div>
          <div className="slideshow__item">
            <img src={assets.carousel1} alt="" className="slideshow__img" />
          </div>
          <div className="slideshow__item">
            <img src={assets.carousel2} alt="" className="slideshow__img" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default SlideShow;
