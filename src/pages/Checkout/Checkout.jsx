import React, { useState } from 'react'
import Header from '../../component/header/Header'
import Footer from '../../component/footer/Footer'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Checkout.scss';
import { CiEdit } from "react-icons/ci";
import { SiZalo } from "react-icons/si";
import { FaHandHoldingUsd } from "react-icons/fa";
import ModalPreview from '../../component/Modal/ModalPreview'


function Checkout() {
    const [selectedValue, setSelectedValue] = useState("value-1");


  return (
    <>
        <Header />
        
        <div className="container">
            <div className="checkout-container">
                <div className="row">
                    <div className="col-8">
                        <div className="cart-info">
                            <h1 className="cart-info__heading">1. Shipping, arrives between Mon, May 16—Tue, May 24</h1>
                            {/* checkout address */}
                            <div className="cart-info__separate cart-info__bold"></div>
                            
                            <div className="user-address">
                                <div className="user-address__top">
                                    <div>
                                        <h2 className='user-address__title'>Shipping address</h2>
                                        <p className='user-address__desc'>Where should we deliver your order?</p>
                                    </div>
                                    {/* <button className='user-address__add'>Add a new address</button> */}
                                    <ModalPreview/>
                                </div>

                                <div className="user-address__list">
                                <article className='address-card'>
                                        <div className="address-card__left">
                                            <div className="address-card__choose">
                                                    <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className="address-card__info">
                                                <h3 className="address-card__title">Imran Khan</h3>
                                                <p className="address-card__desc">Museum of Rajas, Sylhet Sadar, Sylhet 3100.</p>
                                                <ul className="address-card__list">
                                                    <li>Shipping</li>
                                                    <li>Delivery from store</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="address-card__right">
                                            <div className='address-card__ctl'>
                                            <CiEdit />
                                                <button className='address-card__edit'>Edit </button>
                                            </div>
                                        </div>
                                    </article>

                                    <article className='address-card'>
                                        <div className="address-card__left">
                                            <div className="address-card__choose">
                                                    <input type="checkbox" name="" id="" />
                                            </div>
                                            <div className="address-card__info">
                                                <h3 className="address-card__title">Imran Khan</h3>
                                                <p className="address-card__desc">Museum of Rajas, Sylhet Sadar, Sylhet 3100.</p>
                                                <ul className="address-card__list">
                                                    <li>Shipping</li>
                                                    <li>Delivery from store</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="address-card__right">
                                            <div className='address-card__ctl'>
                                            <CiEdit />
                                                <button className='address-card__edit'>Edit </button>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <h2 className='user-address__title'>Payment Method</h2>
                            <div className="user-payment">
                                <div className="radio-input">
                                <label className="radio-input__label">
                                        <input
                                        type="radio"
                                        id="value-1"
                                        name="value-radio"
                                        value="value-1"
                                        checked={selectedValue === "value-1"}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                        />
                                        <p className="user-payment__title"> <FaHandHoldingUsd size={25} color='blue'/>Thanh toán khi nhận hàng</p>
                                    </label>
                                
                                <label className="radio-input__label">
                                    <input
                                    type="radio"
                                    id="value-2"
                                    name="value-radio"
                                    value="value-2"
                                    checked={selectedValue === "value-2"}
                                    onChange={(e) => setSelectedValue(e.target.value)}
                                    />
                                    <p className="user-payment__title"><SiZalo size={30} color='blue'/>  Thanh toán bằng zalopay</p>
                                </label>
                            </div>
                            </div>

                            <h2 className='user-address__title user-address__details'>Items details</h2>
                            <div className="cart-info__list">
                                {/* cart item  */}
                                <article className='cart-item'>
                                    <Link to="">
                                    <img src={assets.ItemCafe1} alt="" className='cart-item__thumb'/>
                                    </Link>
                                    <div className="cart-item__content">
                                        <div className="cart-item__content-left">
                                            <h3 className='cart-item__title'>
                                                <Link to="">Coffee Beans - Espresso Arabica and Robusta Beans</Link>
                                            </h3>
                                            <p className="cart-item__price-wrap">
                                                $47.00 | <span className="cart-item__status">In stock</span>
                                            </p>
                                            <div className="cart-item__ctrl">
                                                <div className="quantity">
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Minus} alt="" />
                                                </button>
                                                <label>2</label>
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Plus} alt="" />
                                                </button>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="cart-item__content-right">
                                            <p className="cart-item__total-price">$47.00</p>
                                            <div className="cart-item__ctrl-right">
                                                <button className='cart-item__input-btn cart-item__input-btn-save'>
                                                    <img src={assets.save} alt="" className='cart-btn__save' />
                                                    Save
                                                </button>
                                                <button className='cart-item__input-btn cart-item__input-btn-delete'>
                                                <img src={assets.Delete} alt="" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>

                                 {/* cart item  */}
                                 <article className='cart-item'>
                                    <Link to="">
                                    <img src={assets.ItemCafe1} alt="" className='cart-item__thumb'/>
                                    </Link>
                                    <div className="cart-item__content">
                                        <div className="cart-item__content-left">
                                            <h3 className='cart-item__title'>
                                                <Link to="">Coffee Beans - Espresso Arabica and Robusta Beans</Link>
                                            </h3>
                                            <p className="cart-item__price-wrap">
                                                $47.00 | <span className="cart-item__status">In stock</span>
                                            </p>
                                            <div className="cart-item__ctrl">
                                                <div className="quantity">
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Minus} alt="" />
                                                </button>
                                                <label>2</label>
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Plus} alt="" />
                                                </button>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="cart-item__content-right">
                                            <p className="cart-item__total-price">$47.00</p>
                                            <div className="cart-item__ctrl-right">
                                                <button className='cart-item__input-btn cart-item__input-btn-save'>
                                                    <img src={assets.save} alt="" className='cart-btn__save' />
                                                    Save
                                                </button>
                                                <button className='cart-item__input-btn cart-item__input-btn-delete'>
                                                <img src={assets.Delete} alt="" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>

                                 {/* cart item  */}
                                 <article className='cart-item'>
                                    <Link to="">
                                    <img src={assets.ItemCafe1} alt="" className='cart-item__thumb'/>
                                    </Link>
                                    <div className="cart-item__content">
                                        <div className="cart-item__content-left">
                                            <h3 className='cart-item__title'>
                                                <Link to="">Coffee Beans - Espresso Arabica and Robusta Beans</Link>
                                            </h3>
                                            <p className="cart-item__price-wrap">
                                                $47.00 | <span className="cart-item__status">In stock</span>
                                            </p>
                                            <div className="cart-item__ctrl">
                                                <div className="quantity">
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Minus} alt="" />
                                                </button>
                                                <label>2</label>
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Plus} alt="" />
                                                </button>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="cart-item__content-right">
                                            <p className="cart-item__total-price">$47.00</p>
                                            <div className="cart-item__ctrl-right">
                                                <button className='cart-item__input-btn cart-item__input-btn-save'>
                                                    <img src={assets.save} alt="" className='cart-btn__save' />
                                                    Save
                                                </button>
                                                <button className='cart-item__input-btn cart-item__input-btn-delete'>
                                                <img src={assets.Delete} alt="" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>

                                {/* cart item  */}
                                <article className='cart-item'>
                                    <Link to="">
                                    <img src={assets.ItemCafe1} alt="" className='cart-item__thumb'/>
                                    </Link>
                                    <div className="cart-item__content">
                                        <div className="cart-item__content-left">
                                            <h3 className='cart-item__title'>
                                                <Link to="">Coffee Beans - Espresso Arabica and Robusta Beans</Link>
                                            </h3>
                                            <p className="cart-item__price-wrap">
                                                $47.00 | <span className="cart-item__status">In stock</span>
                                            </p>
                                            <div className="cart-item__ctrl">
                                                <div className="quantity">
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Minus} alt="" />
                                                </button>
                                                <label>2</label>
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Plus} alt="" />
                                                </button>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="cart-item__content-right">
                                            <p className="cart-item__total-price">$47.00</p>
                                            <div className="cart-item__ctrl-right">
                                                <button className='cart-item__input-btn cart-item__input-btn-save'>
                                                    <img src={assets.save} alt="" className='cart-btn__save' />
                                                    Save
                                                </button>
                                                <button className='cart-item__input-btn cart-item__input-btn-delete'>
                                                <img src={assets.Delete} alt="" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>

                                {/* cart item  */}
                                <article className='cart-item'>
                                    <Link to="">
                                    <img src={assets.ItemCafe1} alt="" className='cart-item__thumb'/>
                                    </Link>
                                    <div className="cart-item__content">
                                        <div className="cart-item__content-left">
                                            <h3 className='cart-item__title'>
                                                <Link to="">Coffee Beans - Espresso Arabica and Robusta Beans</Link>
                                            </h3>
                                            <p className="cart-item__price-wrap">
                                                $47.00 | <span className="cart-item__status">In stock</span>
                                            </p>
                                            <div className="cart-item__ctrl">
                                                <div className="quantity">
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Minus} alt="" />
                                                </button>
                                                <label>2</label>
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Plus} alt="" />
                                                </button>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="cart-item__content-right">
                                            <p className="cart-item__total-price">$47.00</p>
                                            <div className="cart-item__ctrl-right">
                                                <button className='cart-item__input-btn cart-item__input-btn-save'>
                                                    <img src={assets.save} alt="" className='cart-btn__save' />
                                                    Save
                                                </button>
                                                <button className='cart-item__input-btn cart-item__input-btn-delete'>
                                                <img src={assets.Delete} alt="" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            
                            <div className="cart-info__bottom">
                                <div className="row">
                                    <div className="col-8">
                                        <div className="cart-info__continue">
                                            <Link to="" className='cart-info__continue-link'>
                                            <img src={assets.arrowleft} alt="" />
                                            Continue Shopping
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button className='continue-shoping'>Continue</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="cart-info">
                            <div className="cart-info__row">
                                <span>Subtotal (items)</span>
                                <span className='cart-info__number'>3</span>
                            </div>

                            <div className="cart-info__row">
                                <span>Price (Total)</span>
                                <span className='cart-info__number'>$191.65</span>
                            </div>
                            
                            <div className="cart-info__row">
                                <span>Shipping</span>
                                <span className='cart-info__number'>$10.00</span>
                            </div>

                            <div className="cart-info__seperate"></div>

                            <div className="cart-info__row">
                                <span>Estimated Total</span>
                                <span className='cart-info__number'>$201.00</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default Checkout
