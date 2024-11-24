import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import "./SlideShow.scss";
function SlideShow() {
  return (
    <div className="slideshow">
      <div className="slideshow__inner">
        <div className="slideshow__item">
          <Link to="">
            <img src={assets.slide} alt="" className="slideshow__img" />
          </Link>
        </div>
        <div className="slideshow__item">
          <img src={assets.slide} alt="" className="slideshow__img" />
        </div>
        <div className="slideshow__item">
          <img src={assets.slide} alt="" className="slideshow__img" />
        </div>
      </div>
      <div className="slideshow__page">
        <span className="slideshow__num">1</span>
        <span className="slideshow__slider"></span>
        <span className="slideshow__num">5</span>
      </div>
    </div>
  );
}

export default SlideShow;
