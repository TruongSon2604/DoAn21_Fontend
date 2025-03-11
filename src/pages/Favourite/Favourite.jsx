import React, { useState } from 'react'
import Header from '../../component/header/Header'
import Footer from '../../component/footer/Footer'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './Favourite.scss';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Favourite() {
    // const [selectedValue, setSelectedValue] = useState("value-1");
    const MySwal = withReactContent(Swal);

    const showAlert = () => {
    // MySwal.fire({
    //     title: <p>Thông báo</p>,
    //     text: "Đây là một alert với React!",
    //     icon: "question",
    //     confirmButtonText: "OK",
    // });
    MySwal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            MySwal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
            MySwal.fire("Changes are not saved", "", "info");
        }
      });
    };



  return (
    <>
        <Header />
        
        <div className="container">
        <button onClick={showAlert} className='btn btn-danger'>Hiển thị Alert</button>
            <div className="checkout-container">
                <div className="row">
                    <div className="col-12">
                        <div className="cart-info">
                            <h1 className="cart-info__heading">Favourite List</h1>
                            <p className="cart-info__desclove">3 item</p>
                            <input type="checkbox" className='favourite_all' />

                            <h2 className='user-address__title user-address__details'>Items details</h2>
                            <div className="cart-info__list">
                                {/* cart item  */}
                                <article className='cart-item'>
                                <input type="checkbox"/>
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
                                            <div className="cart-item__ctrl favourite__ctrl">
                                                <div className="quantity">
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Minus} alt="" />
                                                </button>
                                                <label>2</label>
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Plus} alt="" />
                                                </button>
                                                </div>

                                                <div className="cart-item__content-right">
                                                    <div className="cart-item__ctrl-right">
                                                        <button className='cart-item__input-btn cart-item__input-btn-save'>
                                                            <img src={assets.save} alt="" className='cart-btn__save' />
                                                            Save
                                                        </button>
                                                        <button onClick={showAlert} className='cart-item__input-btn cart-item__input-btn-delete'>
                                                        <img src={assets.Delete} alt="" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="cart-item__content-right favourite__content-right">
                                        <button className='favourite__btn'>Checkout</button>
                                        </div>
                                    </div>
                                </article>

                                 {/* cart item  */}
                                 <article className='cart-item'>
                                <input type="checkbox"/>
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
                                            <div className="cart-item__ctrl favourite__ctrl">
                                                <div className="quantity">
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Minus} alt="" />
                                                </button>
                                                <label>2</label>
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Plus} alt="" />
                                                </button>
                                                </div>

                                                <div className="cart-item__content-right">
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
                                        </div>
                                        <div className="cart-item__content-right favourite__content-right">
                                        <button className='favourite__btn'>Checkout</button>
                                        </div>
                                    </div>
                                </article>


                                 {/* cart item  */}
                                 <article className='cart-item'>
                                <input type="checkbox"/>
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
                                            <div className="cart-item__ctrl favourite__ctrl">
                                                <div className="quantity">
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Minus} alt="" />
                                                </button>
                                                <label>2</label>
                                                <button className='cart-item__input-btn'>
                                                    <img src={assets.Plus} alt="" />
                                                </button>
                                                </div>

                                                <div className="cart-item__content-right">
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
                                        </div>
                                        <div className="cart-item__content-right favourite__content-right">
                                        <button className='favourite__btn'>Checkout</button>
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
                                        <button className='continue-shoping'>All Checkout</button>
                                    </div>
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

export default Favourite
