import React from "react";
import { Link } from "react-router-dom";
import './CreatePassword.scss';
import { assets } from "../../assets/assets";

function CreatePassword() {
  return <div className="auth">
    {/* intro */}
    <div className="auth__intro">
      <img src={assets.forgot_password} style={{width:"380px",height:"380px"}} className="auth_intro-img" alt="" />
    </div>

    {/* auth contents */}
    <div className="auth__content">
      <div className="auth__content-inner">
        {/* logo   */}
        <Link href="" className="logo">
            <img src={assets.icon} className="logo__img" alt="" />
            <h1 className="logo__title">grocerymart</h1>
        </Link>
        <h1 className="auth__heading">Create new password</h1>
        <p className="auth__desc">At least 8 character with uppercase and lowercase letters.</p>
        {/* <div className="message message-success">We have e-mailed your password reset link</div> */}
        <form action="" className="form auth__form">
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

          <div className="form__group auth__btn--group">
          <button className="auth__btn-signup">Reset Password</button>
          </div>
        </form>

        <p className="auth__text">
          <Link to="/sign-in" className="auth__link">Back to Sign In</Link>
        </p>
      </div>
    </div>
  </div>;
}

export default CreatePassword;
