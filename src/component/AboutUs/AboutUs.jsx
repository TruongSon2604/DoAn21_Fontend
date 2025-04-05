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
            We help folks love, heal, understand, and move their 
            bodies—so they can be happier, healthier humans.
          </p>
          
          <div className="about-us-main">
            <h3 className="about-us-slogan">
              We're here to get as many people{" "}
              <span className="highlight">moving</span> as possible.
            </h3>
            
            <p className="about-us-description">
              Not just people that are already fit, but all people. We
              offer a more accessible and sustainable alternative to the
              popular "No, pain. No gain." mantra.
            </p>
            
            <p className="about-us-description">
              We don't think exercise should be associated with pain at
              all. Gives it a bad name. Exercise is medicine. When done
              right, it not only alleviates pain, but it protects against it.
            </p>
          </div>
        </div>
        
        <div className="about-us-images">
          <div className="image-container">
            <img 
              src={assets.People || "https://source.unsplash.com/random/400x250/?fitness,group"} 
              alt="Fitness group 1" 
              className="about-image top-image" 
              style={{marginTop:'30px'}}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;