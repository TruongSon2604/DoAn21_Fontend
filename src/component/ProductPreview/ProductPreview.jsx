// import React from 'react'
import { assets } from '../../assets/assets'
import './ProductPreview.scss';
import { FaCodeCompare,FaCartShopping  } from "react-icons/fa6";
import { FaShoppingBag ,FaStar} from "react-icons/fa";


const ProductPreview = () => {
  return (
    <div className='product-container'>
      <div className="row">
        <div className="col-xxl-5 col-lg-6">
            <div className="prod-preview">
                <div className="prod-preview__list">
                    <div className="prod-preview__item">
                        <img src={assets.ItemCafe2} alt="" />
                    </div>
                </div>
                <div className="prod-preview__thumbs">
                    <img src={assets.ItemCafe1} alt="" className='prod-preview__thumbs-img prod-preview__thumbs-img__current' />
                    <img src={assets.ItemCafe1} alt="" className='prod-preview__thumbs-img' />
                    <img src={assets.ItemCafe1} alt="" className='prod-preview__thumbs-img' />
                    <img src={assets.ItemCafe1} alt="" className='prod-preview__thumbs-img' />
                </div>
            </div>
        </div>
        <div className="col-xxl-7 col-lg-6">
          <section className='prod-info'>
            <h1 className='prod-info__heading'>Coffee Beans - Espresso Arabica and Robusta Beans</h1>
            <div className="row">
              <div className="col-xxl-6 col-xl-5">
                <div className="prod-prop">
                <FaStar color='orange' />
                  <h4 className='prod-prop__title'>(3.5) 1100 reviews</h4>
                </div>
                <div className="prod-prop prod-prop__select">
                    <p className='prod-prop__size'>Size/Weight</p>
                    <div className="mydict">
                    <div>
                      <label>
                        <input type="radio" name="radio"/>
                        <span>500g</span>
                      </label>
                      <label>
                        <input type="radio" name="radio"/>
                        <span>200g</span>
                      </label>
                      <label>
                        <input type="radio" name="radio"/>
                        <span>1kg</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="prod-prop__des">
                <p className='prod-prop__des-item'>Description</p>
                Sự kết hợp hoàn hảo giữa hạt cà phê Robusta & Arabica thượng hạng được trồng trên những vùng cao nguyên Việt Nam màu mỡ, qua những bí quyết rang xay độc đáo, Highlands Coffee chúng tôi tự hào giới thiệu những dòng sản phẩm Cà phê mang hương vị đậm đà và tinh tế.
                </div>
              </div>
              <div className="col-xxl-6 col-xl-7 col-md-7 col-lg-9">

                <div className="prod-prop">
                <FaCodeCompare className='prod-prop__icon' />
                  <h4 className='prod-prop__title'>Compare</h4>
                </div>

                <div className="prod-prop">
                  <FaCartShopping className='prod-prop__icon' />
                  <div>
                    <h4 className='prod-prop__title'>Delivery</h4>
                    <p className='prod-prop__desc'>From $6 for 1-3 days</p>
                  </div>
                </div>
                
                <div className="prod-prop">
                <FaShoppingBag className='prod-prop__icon' />
                  <div>
                    <h4 className='prod-prop__title'>Pickup</h4>  
                    <p className='prod-prop__desc'>Out of 2 store, today</p>
                  </div>
                </div>

                <div className="prod-info__card">
                  <div className="prod-info__row">
                    <span className='prod-info__price'>$500.00</span>
                    <span className='prod-info__tax'>10%</span>
                  </div>
                  <p className="prod-info__total-price">$540.00</p>
                  <div className="prod-info__row prod-info__row-action">
                    <button className='btn btn-warning btn_addToCard'>Add To Cart</button>
                    <button className='prod-info__like-btn'><img src={assets.Heart_pink} className='prod-info__img_heart' alt="" /></button>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProductPreview
