import React from "react";
import "./BrowseCategory.scss";
import { assets } from "../../assets/assets";
const BrowseCategory = () => {
  return (
    <div className="home__container">
      <h2 className="home__heading">Browse Categories</h2>
      <div className="home__cate  row row-cols-lg-3 row-cols-sm-2">
        <div className="col">
          {/* item1 */}
          <div className="cate-item">
            <img src={assets.cate1} alt="" className="cate-item__thumb" />
            <section className="cate-item__info">
              <h3 className="cate-item__title">$24-$120</h3>
              <p className="cate-item__desc">Lorem ipsum dolor sit amet.</p>
            </section>
          </div>
        </div>

        {/* item2 */}
        <div className="col">
          <div className="cate-item">
            <img src={assets.cate2} alt="" className="cate-item__thumb" />
            <section className="cate-item__info">
              <h3 className="cate-item__title">$37 - $160</h3>
              <p className="cate-item__desc">
                Espresso arabica and robusta beans
              </p>
            </section>
          </div>
        </div>
        {/* item2 */}
        <div className="col">
          <div className="cate-item">
            <img src={assets.cate2} alt="" className="cate-item__thumb" />
            <section className="cate-item__info">
              <h3 className="cate-item__title">$37 - $160</h3>
              <p className="cate-item__desc">
                Espresso arabica and robusta beans
              </p>
            </section>
          </div>
        </div>
        {/* item3 */}
        <div className="col">
          <div className="cate-item">
            <img src={assets.cate1} alt="" className="cate-item__thumb" />
            <section className="cate-item__info">
              <h3 className="cate-item__title">$32 - $160</h3>
              <p className="cate-item__desc">
                Lavazza top class whole bean coffee blend
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseCategory;
