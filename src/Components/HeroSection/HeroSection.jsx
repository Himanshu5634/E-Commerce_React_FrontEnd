import React from "react";
import "./heroSection.scss";
import { assets } from "../../assets/assets";
// import heroImage from "../../assets/hero-image.png"; // Replace with an actual e-commerce-related image

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Shop the Best Deals Online</h1>
        <p>Discover the latest trends and unbeatable prices on all your favorite products.</p>
        <button className="shop-now-btn">Shop Now</button>
      </div>
      <div className="hero-image">
        <img src={assets.heroImage}  alt="E-commerce Shopping" />
      </div>
    </div>
  );
};

export default HeroSection;
