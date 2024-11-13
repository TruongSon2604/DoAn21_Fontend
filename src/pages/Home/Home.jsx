import React from "react";
// import "./Grid.css";
import "./Home.css";
const Home = () => {
  return (
    <>
      {" "}
      <div className="container">
     
        <header className="header">
          <div className="inner">Header</div>
        </header>
       
        <section>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="inner">Herro left</div>
            </div>
            <div className="col-lg-5 offset-lg-1 col-md-6">
              <div className="inner">Herro right</div>
            </div>
          </div>
        </section>
        {/* section2*/}
        <section>
          <div className="row">
            <div className="col-lg-5 col-md-6">
              <div className="inner"> left</div>
            </div>
            <div className="col-lg-5 offset-lg-2 col-md-6">
              <div className="inner"> right</div>
            </div>
          </div>
        </section>
        {/* section3*/}
        <section>
          <div className="row">
            <div className="col-lg-5 col-md-6">
              <div className="inner"> left</div>
            </div>
            <div className="col-lg-6 offset-lg-1 col-md-6">
              <div className="inner"> right</div>
            </div>
          </div>
        </section>
        {/* section4*/}
        <section>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="inner"> left</div>
            </div>
            <div className="col-lg-5 offset-lg-1 col-md-6">
              <div className="inner"> right</div>
            </div>
          </div>
        </section>
        {/* section5*/}
        <section>
          <div className="row">
            <div className="col">
              <div className="inner">Center</div>
            </div>
          </div>
          <div className="row row-cols-md-2 row-cols-1">
            <div className="col">
              <div className="inner">item1</div>
            </div>
            <div className="col">
              <div className="inner">item2</div>
            </div>
          </div>
        </section>
        {/* section6*/}
        <section>
          <div className="row">
            <div className="col">
              <div className="inner">
                <div>left</div>
                <div>right</div>
              </div>
            </div>
          </div>
          <div className="row row-cols-lg-2 row-cols-1">
            <div className="col">
              <div className="inner">item1</div>
            </div>
            <div className="col">
              <div className="inner">item2</div>
            </div>
            <div className="col">
              <div className="inner">item3</div>
            </div>
            <div className="col">
              <div className="inner">item4</div>
            </div>
          </div>
        </section>
        <section>
          <div className="row">
            <div className="col">
              <div className="inner">Dess</div>
            </div>
          </div>
        </section>
      </div>
      {/* // End container */}
      <footer>
        <div className="container">
          <div className="inner">Footer</div>
        </div>
      </footer>
    </>
  );
};

export default Home;
