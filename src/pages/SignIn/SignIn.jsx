import React, { useState } from "react";
import { assets } from "../../assets/assets";
// import { Link } from "react-router-dom";
import './SignIn.scss';
import { Link, useNavigate } from "react-router-dom";
import { apiPost } from "../../Service/apiService";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const requestBody = {
      email,
      password
    };

    const { success, data, message } = await apiPost("/auth/login", requestBody, {
      "Content-Type": "application/json",
    });

    if (success) {
      const expiresAt = Date.now() + 60 * 60 * 1000;
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("expires_at", expiresAt.toString());

      alert("Đăng nhập thành công!");
      navigate("/");
    } else {
      setErrorMessage(message || "Đăng nhập không thành công");
    }
    setLoading(false);
  };


  return (
    <div className="auth">
      {/* intro */}
      <div className="auth__intro">
        <img src={assets.LoginLeft} className="auth_intro-img" alt="" />
        <p className="auth__intro-text">The best of luxury brand values, high-quality products, and innovative services</p>
      </div>

      {/* auth contents */}
      <div className="auth__content">
        <div className="auth__content-inner">
          {/* logo */}
          <Link to="/" className="logo">
            <img src={assets.icon} className="logo__img" alt="" />
            <h1 className="logo__title">grocerymart</h1>
          </Link>
          <h1 className="auth__heading">Hello Again!</h1>
          <p className="auth__desc">Welcome back to sign in. As a returning customer, you have access to your previously saved all information.</p>
          {errorMessage &&(<div className="messagelogin messagelogin-success">Incorrect email or password.</div>)}
          <form className="form auth__form">
            <div className="form__group">
              <div className="form__text-input">
                <input
                  type="email"
                  className="form__input"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setErrorMessage('')}
                  required
                />
                <img src={assets.Message} className="form__input-icon" alt="" />
              </div>
            </div>

            <div className="form__group">
              <div className="form__text-input">
                <input
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  className="form__input"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setErrorMessage('')}
                  required
                />
                <img src={assets.Lock} onClick={togglePassword} className="form__input-icon" alt="" />
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
              <button className="auth__btn-signup" onClick={handleLogin}>
                {loading ? "Process login..." : "Sign In"}
              </button>
              <Link to="http://127.0.0.1:8000/auth/google/redirect" className="auth__btn-google">
                <img src={assets.iconGoogle} className="btn__icon" alt="" />
                Sign in with Gmail
              </Link>
            </div>
          </form>

          <p className="auth__text">
            You have an account yet?  
            <Link to="/sign-up" className="auth__link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
