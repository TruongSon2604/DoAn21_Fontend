// import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import './SignIn.scss';

function SignIn() {
  return <div className="auth">
      {/* intro */}
      <div className="auth__intro">
        <img src={assets.LoginLeft} className="auth_intro-img" alt="" />
        <p className="auth__intro-text"> The best of luxury brand values, high quality products, and innovative services</p>
      </div>
  
      {/* auth contents */}
      <div className="auth__content">
        <div className="auth__content-inner">
          {/* logo   */}
          <Link href="" className="logo">
              <img src={assets.icon} className="logo__img" alt="" />
              <h1 className="logo__title">grocerymart</h1>
          </Link>
          <h1 className="auth__heading">Hello Again!</h1>
          <p className="auth__desc"> Welcome back to sign in. As a returning customer, you have access to your previously saved all information.</p>
          <form action="" className="form auth__form">
            <div className="form__group">
              <div className="form__text-input">
                <input type="" className="form__input" placeholder="Email" name="" id="" />
                <img src={assets.Message} className="form__input-icon" alt="" />
              </div>            
            </div>
  
            <div className="form__group">
            <div className="form__text-input">
              <input type="" className="form__input" placeholder="Password" name="" id="" />
              <img src={assets.Lock} className="form__input-icon" alt="" />
              </div>
            </div>
             
            <div className="form__group form__group--inline">
              <label htmlFor="" className="form__checkbox">
                <input type="checkbox" name="" className="form__checkbox-input" id="" />
                <label htmlFor="" className="form__checkbox--label">Set as default card</label>
              </label>
              <Link to="/forgot-password" className="auth__link">Recovery Password</Link>
            </div>
  
            <div className="form__group auth__btn--group">
            <button className="auth__btn-signup">Sign In</button>
            <button className="auth__btn-google">
              <img src={assets.iconGoogle} className="btn__icon" alt="" />
              Sign in with Gmail
            </button>
            </div>
          </form>
  
          <p className="auth__text">
            You have an account yet?  
            <Link to="/sign-up" className="auth__link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>;
}

export default SignIn;
