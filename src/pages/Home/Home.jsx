import React from "react";

import "./Home.scss";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

import "../../scssFolder/base/_base.scss";
import "../../scssFolder/base/_reset.scss";
import SlideShow from "../../component/SlideShow/SlideShow";
import BrowseCategory from "../../component/BrowseCategory/BrowseCategory";
import BrowseProduct from "../../component/BrowseProduct/BrowseProduct";
import Breadcrumbs from "../../component/Breadcrumbs/Breadcrumbs";
import VideoList from "../../component/VideoFeature/VideoList";
import AboutUs from "../../component/AboutUs/AboutUs";
import FlashSale from "../../component/FlashSale/FlashSale";
const Home = () => {
  return (
    <>
      <Header />
      <div className="container">
        {/* <Breadcrumbs/> */}

        <SlideShow />
        {/* Browse Category  */}
        <BrowseCategory />
        <FlashSale />

        {/* Browse Product  */}
        <BrowseProduct />
        {/* <hr /> */}

        <VideoList />
        <AboutUs />
      </div>
      <Footer />
    </>
  );
};
export default Home;
