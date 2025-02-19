import React from 'react'
import Header from '../../component/header/Header'
import Footer from '../../component/footer/Footer'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Cart.scss';

function Cart() {
  return (
    <>
        <Header />
        <div className="container">
            <div className="checkout-container">
                <div className="row">
                    <div className="col-8">
                        <div className="cart-info">
                            <div className="cart-info__list">
                                {/* cart item  */}
                                <article className='cart-item'>
                                    <input type="checkbox" name="" id="" />
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
                                    <input type="checkbox" name="" id="" />
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
                                    <input type="checkbox" name="" id="" />
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
                                    <input type="checkbox" name="" id="" />
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
                                    <input type="checkbox" name="" id="" />
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
                                        <div className="cart-info__row">
                                            <span>Subtotal:</span>
                                            <span>$191.65</span>
                                        </div>
                                        <div className="cart-info__row">
                                            <span>Shipping:</span>
                                            <span>$10.65</span>
                                        </div>
                                        <div className="cart-info__separate"></div>
                                        <div className="cart-info__row cart-info__row-total">
                                            <span>Total:</span>
                                            <span>$191.65</span>
                                        </div>
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

                            <Link to="" className='continue_checkout'>Continue to checkout</Link>
                        </div>

                        <div className="cart-info">
                            <div className="gift-item">
                                <div className="gift-item__icon-wrap">
                                    <img src={assets.gift} className='gift-item__icon' alt="" />
                                </div>
                                <div className="gift-item__content">
                                    <h3 className="gift-item__title">
                                    Send this order as a gift.
                                    </h3>
                                    <p className='gift-item__desc'>Available items will be shipped to your gift recipient.
                                    </p>
                                </div>
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

export default Cart
