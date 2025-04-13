import React from "react";
import "./AboutUs.scss";
import { assets } from "../../assets/assets";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="about-us-text">
          <h2 className="about-us-title">About Us</h2>

          <p className="about-us-intro">
            We help people experience the rich, bold flavors of high-quality
            coffee so they can enjoy their moments and feel more energized
            throughout the day.
          </p>

          <div className="about-us-main">
            <h3 className="about-us-slogan">
              We're here to bring the joy of great coffee to as many people{" "}
              <span className="highlight">as possible</span>.
            </h3>

            <p className="about-us-description">
              Not just coffee enthusiasts, but everyone who appreciates a good
              cup. We offer a sustainable and accessible approach to enjoying
              coffee, far beyond the ordinary.
            </p>

            <p className="about-us-description">
              We don't think coffee should just be about caffeine. It’s an
              experience. When made right, it’s not just a drink, it’s a ritual
              that lifts your spirit and keeps you going.
            </p>
          </div>
        </div>

        <div className="about-us-images">
          {/* <div className="image-container"> */}
          <img
            src={
              assets.People ||
              "https://source.unsplash.com/random/400x250/?fitness,group"
            }
            alt="Fitness group 1"
            className="about-image top-image"
            style={{ marginTop: "0px" }}
          />

          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
