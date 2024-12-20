import React from "react";

// import "./Home.css";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

import "../../scssFolder/base/_base.scss";
import "../../scssFolder/base/_reset.scss";
import SlideShow from "../../component/SlideShow/SlideShow";
import BrowseCategory from "../../component/BrowseCategory/BrowseCategory";
import BrowseProduct from "../../component/BrowseProduct/BrowseProduct";
const Home = () => {
  return (
    <>
      <Header />
      <div className="container">
        <SlideShow />
        {/* Browse Category  */}
        <BrowseCategory />
        {/* Browse Product  */}
        <BrowseProduct />
      </div>
      <Footer />
    </>
  );
};
export default Home;
