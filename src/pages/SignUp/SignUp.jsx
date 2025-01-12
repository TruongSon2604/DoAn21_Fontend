import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import './SignUp.scss';
function SignUp() {
  return <div className="auth">
    {/* intro */}
    <div className="auth__intro">
      <img src={assets.LoginLeft} className="auth_intro-img" alt="" />
      <p className="auth__intro-text">Let’s create your account and  Shop like a pro and save money.</p>
    </div>

    {/* auth contents */}
    <div className="auth__content">
      <div className="auth__content-inner">
        {/* logo   */}
        <Link href="" className="logo">
            <img src={assets.icon} className="logo__img" alt="" />
            <h1 className="logo__title">grocerymart</h1>
        </Link>
        <h1 className="auth__heading">Sign Up</h1>
        <p className="auth__desc">Let’s create your account and  Shop like a pro and save money.</p>
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

          <div className="form__group">
          <div className="form__text-input">
            <input type="" className="form__input" placeholder="Confirm Password" name="" id="" />
            <img src={assets.Lock} className="form__input-icon" alt="" />
            </div>
          </div>
           
          <div className="form__group form__group--inline">
            <label htmlFor="" className="form__checkbox">
              <input type="checkbox" name="" className="form__checkbox-input" id="" />
              <label htmlFor="" className="form__checkbox--label">Set as default card</label>
            </label>
            <a href="" className="auth__link">Recovery Password</a>
          </div>

          <div className="form__group auth__btn--group">
          <button className="auth__btn-signup">Sign Up</button>
          <button className="auth__btn-google">
            <img src={assets.iconGoogle} className="btn__icon" alt="" />
            Sign in with Gmail
          </button>
          </div>
        </form>

        <p className="auth__text">
          You have an account yet?  
          <Link to="/sign-in" className="auth__link">Sign In</Link>
        </p>
      </div>
    </div>
  </div>;
}

export default SignUp;
