import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import './TabProductDetail.scss';
import { assets } from '../../assets/assets';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TabProductDetail() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

  const [isHeart, setIsHeart] = useState(false);
  const heartClick = () => {
    setIsHeart((value) => !value);
  };

  const [activeKey, setActiveKey] = useState('link-1');

  const renderContent = () => {
    switch (activeKey) {
      case 'link-1':
        return <div>
         <div className="row row-browse-product" style={{ rowGap: "30px" }}>
         <Slider {...settings}>
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
                      <button className="like-btn" onClick={heartClick}>
                        <img
                          src={isHeart ? assets.Heart_pink : assets.iconHeart}
                          alt=""
                          className="like-btn__icon"
                        />
                      </button>
                    </div>
                    <a href="">
                      <h3 className="product-card__title">
                        Coffee Beans - Espresso Arabica and Robusta Beans 11
                      </h3>
                    </a>
                    <div className="product-card__status">
                      <p className="product-card__weigh">Weigh:500g</p>
                      <p className="product-card__stock">Stock:199</p>
                    </div>
                    <p className="product-card__branch">Lavazza</p>
                    <div className="product-card__row">
                      <span className="product-card__price">$47.00</span>
                      <img src={assets.Star1} alt="" className="product-card__star" />
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
                      <button className="like-btn" onClick={heartClick}>
                        <img
                          src={isHeart ? assets.Heart_pink : assets.iconHeart}
                          alt=""
                          className="like-btn__icon"
                        />
                      </button>
                    </div>
                    <a href="">
                      <h3 className="product-card__title">
                        Coffee Beans - Espresso Arabica and Robusta Beans 11
                      </h3>
                    </a>
                    <div className="product-card__status">
                      <p className="product-card__weigh">Weigh:500g</p>
                      <p className="product-card__stock">Stock:199</p>
                    </div>
                    <p className="product-card__branch">Lavazza</p>
                    <div className="product-card__row">
                      <span className="product-card__price">$47.00</span>
                      <img src={assets.Star1} alt="" className="product-card__star" />
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
                      <button className="like-btn" onClick={heartClick}>
                        <img
                          src={isHeart ? assets.Heart_pink : assets.iconHeart}
                          alt=""
                          className="like-btn__icon"
                        />
                      </button>
                    </div>
                    <a href="">
                      <h3 className="product-card__title">
                        Coffee Beans - Espresso Arabica and Robusta Beans 11
                      </h3>
                    </a>
                    <div className="product-card__status">
                      <p className="product-card__weigh">Weigh:500g</p>
                      <p className="product-card__stock">Stock:199</p>
                    </div>
                    <p className="product-card__branch">Lavazza</p>
                    <div className="product-card__row">
                      <span className="product-card__price">$47.00</span>
                      <img src={assets.Star1} alt="" className="product-card__star" />
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
                      <button className="like-btn" onClick={heartClick}>
                        <img
                          src={isHeart ? assets.Heart_pink : assets.iconHeart}
                          alt=""
                          className="like-btn__icon"
                        />
                      </button>
                    </div>
                    <a href="">
                      <h3 className="product-card__title">
                        Coffee Beans - Espresso Arabica and Robusta Beans 11
                      </h3>
                    </a>
                    <div className="product-card__status">
                      <p className="product-card__weigh">Weigh:500g</p>
                      <p className="product-card__stock">Stock:199</p>
                    </div>
                    <p className="product-card__branch">Lavazza</p>
                    <div className="product-card__row">
                      <span className="product-card__price">$47.00</span>
                      <img src={assets.Star1} alt="" className="product-card__star" />
                      <span className="product-card__score">4.3</span>
                    </div>
                  </article>
                </div>
          </Slider>
        </div>
      </div>;
      case 'link-2':
        return <div className='prod-content'>
          <h2 className='prod-content__heading'>What our customers are saying</h2>
          <div className="row">
          <div className="col-xl-4">
              <div className="review-card">
                <div className="review-card__content">
                    <img src={assets.user} alt="" className="review-card__avatar" />
                    <div className="review-card__info">
                      <h4 className="review-card__title">Jakir Hussen</h4>
                      <p className="review-card__desc">Great product, I love this Coffee Beans </p>
                    </div>
                </div>
                <div className="review-card__rating">
                <div className="rating">
                  <input type="radio" id="star5" name="rating" value="5" />
                  <label htmlFor="star5"></label>
                  <input type="radio" id="star4" name="rating" value="4" />
                  <label htmlFor="star4"></label>
                  <input type="radio" id="star3" name="rating" value="3" />
                  <label htmlFor="star3"></label>
                  <input type="radio" id="star2" name="rating" value="2" />
                  <label htmlFor="star2"></label>
                  <input type="radio" id="star1" name="rating" value="1" />
                  <label htmlFor="star1"></label>
                </div>
                <span>(3.5) Review</span>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="review-card">
                <div className="review-card__content">
                    <img src={assets.user} alt="" className="review-card__avatar" />
                    <div className="review-card__info">
                      <h4 className="review-card__title">Jakir Hussen</h4>
                      <p className="review-card__desc">Great product, I love this Coffee Beans </p>
                    </div>
                </div>
                <div className="review-card__rating">
                <div className="rating">
                  <input type="radio" id="star5" name="rating" value="5" />
                  <label htmlFor="star5"></label>
                  <input type="radio" id="star4" name="rating" value="4" />
                  <label htmlFor="star4"></label>
                  <input type="radio" id="star3" name="rating" value="3" />
                  <label htmlFor="star3"></label>
                  <input type="radio" id="star2" name="rating" value="2" />
                  <label htmlFor="star2"></label>
                  <input type="radio" id="star1" name="rating" value="1" />
                  <label htmlFor="star1"></label>
                </div>
                <span>(3.5) Review</span>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="review-card">
                <div className="review-card__content">
                    <img src={assets.user} alt="" className="review-card__avatar" />
                    <div className="review-card__info">
                      <h4 className="review-card__title">Jakir Hussen</h4>
                      <p className="review-card__desc">Great product, I love this Coffee Beans </p>
                    </div>
                </div>
                <div className="review-card__rating">
                <div className="rating">
                  <input type="radio" id="star5" name="rating" value="5" />
                  <label htmlFor="star5"></label>
                  <input type="radio" id="star4" name="rating" value="4" />
                  <label htmlFor="star4"></label>
                  <input type="radio" id="star3" name="rating" value="3" />
                  <label htmlFor="star3"></label>
                  <input type="radio" id="star2" name="rating" value="2" />
                  <label htmlFor="star2"></label>
                  <input type="radio" id="star1" name="rating" value="1" />
                  <label htmlFor="star1"></label>
                </div>
                <span>(3.5) Review</span>
                </div>
              </div>
            </div>

          </div>
        </div>;
      case 'link-3':
        return <div>Feature Content</div>;
      default:
        return null;
    }
  };

  return (
    <>
        <Nav className='nav_product' variant="tabs" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
          {/* <Nav.Item>
            <Nav.Link className='nav_product-item' eventKey="link-1">Description</Nav.Link>
          </Nav.Item> */}
           <Nav.Item>
            <Nav.Link className='nav_product-item' eventKey="link-1">Feature</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className='nav_product-item' eventKey="link-2">Reviews</Nav.Link>
          </Nav.Item>
        </Nav>
        {renderContent()}
    </>
  );
}

export default TabProductDetail;
