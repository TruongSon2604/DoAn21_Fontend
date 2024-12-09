import React from "react";
import "./BrowseProduct.scss";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
function BrowseProduct() {
  return (
    <section className="home__container">
      <div className="home__row">
        <h2 className="home__heading">Total LavAzza 1320</h2>
        <div className="filter-wrap">
          <button className="filter-btn">
            Filter
            <img src={assets.filter} alt="" className="filter-btn__icon" />
          </button>
          <div className="filter">
            <div className="container filter_container">
              <h3 className="filter__heading">Filter</h3>
              <form action="" className="filter__form">
                <div className="filter__row">
                  {/* col1 */}
                  <div className="filter__col">
                    <label htmlFor="" className="filter__form-label">
                      Price
                    </label>
                    <input
                      type="range"
                      id="vol"
                      className="filter__range"
                      name="vol"
                      min="0"
                      max="50"
                    ></input>
                    <div className="filter__maxmin">
                      <label htmlFor="">Maximum</label>
                      <input type="text" className="filter__ip" />
                    </div>
                  </div>
                  <div className="filter__line"></div>
                  {/* col3 */}
                  <div className="filter__col">
                    <label htmlFor="" className="filter__form-label">
                      Brand
                    </label>
                    <input type="text" className="filter__brand" />
                    <div className="filter__history">
                      <span>Lavazza</span>
                      <span>Nescafe</span>
                      <span>Starbucks</span>
                    </div>
                  </div>
                </div>
              </form>
              <div className="filter__action">
                <div className="filter__cover">
                  <Link className="filter__cancel">Cancel</Link>
                  <Link className="filter__show">Show Result</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row row-browse-product" style={{ rowGap: "30px" }}>
        <div className="col-lg-4 col-md-6 col-xl-3">
          <article className="product-card">
            <div className="product-card__img-wrap">
              <a href="">
                <img
                  src={assets.product2_home}
                  className="product-card__thumb"
                  alt=""
                />
              </a>
              <button className="like-btn">
                <img src={assets.iconHeart} alt="" className="like-btn__icon" />
              </button>
            </div>
            <a href="">
              <h3 className="product-card__title">
                Coffee Beans - Espresso Arabica and Robusta Beans
              </h3>
            </a>
            <p className="product-card__branch">Lavazza</p>
            <div className="product-card__row">
              <span className="product-card__price">$47.00</span>
              <img src={assets.Star} alt="" className="product-card__star" />
              <span className="product-card__score">4.3</span>
            </div>
          </article>
        </div>
        <div className="col-lg-4 col-md-6 col-xl-3">
          <article className="product-card">
            <div className="product-card__img-wrap">
              <a href="">
                <img
                  src={assets.product2_home}
                  className="product-card__thumb"
                  alt=""
                />
              </a>
              <button className="like-btn">
                <img src={assets.iconHeart} alt="" className="like-btn__icon" />
              </button>
            </div>
            <a href="">
              <h3 className="product-card__title">
                Coffee Beans - Espresso Arabica and Robusta Beans
              </h3>
            </a>
            <p className="product-card__branch">Lavazza</p>
            <div className="product-card__row">
              <span className="product-card__price">$47.00</span>
              <img src={assets.Star} alt="" className="product-card__star" />
              <span className="product-card__score">4.3</span>
            </div>
          </article>
        </div>
        <div className="col-lg-4 col-md-6 col-xl-3">
          <article className="product-card">
            <div className="product-card__img-wrap">
              <a href="">
                <img
                  src={assets.product2_home}
                  className="product-card__thumb"
                  alt=""
                />
              </a>
              <button className="like-btn">
                <img src={assets.iconHeart} alt="" className="like-btn__icon" />
              </button>
            </div>
            <a href="">
              <h3 className="product-card__title">
                Coffee Beans - Espresso Arabica and Robusta Beans
              </h3>
            </a>
            <p className="product-card__branch">Lavazza</p>
            <div className="product-card__row">
              <span className="product-card__price">$47.00</span>
              <img src={assets.Star} alt="" className="product-card__star" />
              <span className="product-card__score">4.3</span>
            </div>
          </article>
        </div>
        <div className="col-lg-4 col-md-6 col-xl-3">
          <article className="product-card">
            <div className="product-card__img-wrap">
              <a href="">
                <img
                  src={assets.product2_home}
                  className="product-card__thumb"
                  alt=""
                />
              </a>
              <button className="like-btn">
                <img src={assets.iconHeart} alt="" className="like-btn__icon" />
              </button>
            </div>
            <a href="">
              <h3 className="product-card__title">
                Coffee Beans - Espresso Arabica and Robusta Beans
              </h3>
            </a>
            <p className="product-card__branch">Lavazza</p>
            <div className="product-card__row">
              <span className="product-card__price">$47.00</span>
              <img src={assets.Star} alt="" className="product-card__star" />
              <span className="product-card__score">4.3</span>
            </div>
          </article>
        </div>
        <div className="col-lg-4 col-md-6 col-xl-3">
          <article className="product-card">
            <div className="product-card__img-wrap">
              <a href="">
                <img
                  src={assets.product2_home}
                  className="product-card__thumb"
                  alt=""
                />
              </a>
              <button className="like-btn">
                <img src={assets.iconHeart} alt="" className="like-btn__icon" />
              </button>
            </div>
            <a href="">
              <h3 className="product-card__title">
                Coffee Beans - Espresso Arabica and Robusta Beans
              </h3>
            </a>
            <p className="product-card__branch">Lavazza</p>
            <div className="product-card__row">
              <span className="product-card__price">$47.00</span>
              <img src={assets.Star} alt="" className="product-card__star" />
              <span className="product-card__score">4.3</span>
            </div>
          </article>
        </div>
        <div className="col-lg-4 col-md-6 col-xl-3">
          <article className="product-card">
            <div className="product-card__img-wrap">
              <a href="">
                <img
                  src={assets.product2_home}
                  className="product-card__thumb"
                  alt=""
                />
              </a>
              <button className="like-btn">
                <img src={assets.iconHeart} alt="" className="like-btn__icon" />
              </button>
            </div>
            <a href="">
              <h3 className="product-card__title">
                Coffee Beans - Espresso Arabica and Robusta Beans
              </h3>
            </a>
            <p className="product-card__branch">Lavazza</p>
            <div className="product-card__row">
              <span className="product-card__price">$47.00</span>
              <img src={assets.Star} alt="" className="product-card__star" />
              <span className="product-card__score">4.3</span>
            </div>
          </article>
        </div>
        <div className="col-lg-4 col-md-6 col-xl-3">
          <article className="product-card">
            <div className="product-card__img-wrap">
              <a href="">
                <img
                  src={assets.product2_home}
                  className="product-card__thumb"
                  alt=""
                />
              </a>
              <button className="like-btn">
                <img src={assets.iconHeart} alt="" className="like-btn__icon" />
              </button>
            </div>
            <a href="">
              <h3 className="product-card__title">
                Coffee Beans - Espresso Arabica and Robusta Beans
              </h3>
            </a>
            <p className="product-card__branch">Lavazza</p>
            <div className="product-card__row">
              <span className="product-card__price">$47.00</span>
              <img src={assets.Star} alt="" className="product-card__star" />
              <span className="product-card__score">4.3</span>
            </div>
          </article>
        </div>
        <div className="col-lg-4 col-md-6 col-xl-3">
          <article className="product-card">
            <div className="product-card__img-wrap">
              <a href="">
                <img
                  src={assets.product2_home}
                  className="product-card__thumb"
                  alt=""
                />
              </a>
              <button className="like-btn">
                <img src={assets.iconHeart} alt="" className="like-btn__icon" />
              </button>
            </div>
            <a href="">
              <h3 className="product-card__title">
                Coffee Beans - Espresso Arabica and Robusta Beans
              </h3>
            </a>
            <p className="product-card__branch">Lavazza</p>
            <div className="product-card__row">
              <span className="product-card__price">$47.00</span>
              <img src={assets.Star} alt="" className="product-card__star" />
              <span className="product-card__score">4.3</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default BrowseProduct;
