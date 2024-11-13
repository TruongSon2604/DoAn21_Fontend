import React from "react";

// import "./Home.css";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

import "../../scssFolder/base/_base.scss";
import "../../scssFolder/base/_reset.scss";
const Home = () => {
  return (
    <>
      <Header />
      <div className="container">Content Home</div>
      <Footer />
    </>
  );
};
export default Home;
