import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.scss";
import axios from "axios";
import { assets } from "../../assets/assets";
import { apiPost } from "../../Service/apiService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Thêm state loading

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true); // Bắt đầu loading

    try {
      const data = {
        email: email,
      };
      const response = await apiPost("/auth/forget-password", data);
      setLoading(false); // Dừng loading sau khi có kết quả

      if (response.success) {
        setMessage("We have e-mailed your password");
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      setLoading(false); // Dừng loading khi có lỗi
      console.error("Error sending password reset email:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="auth">
      <div className="auth__intro">
        <img
          src={assets.forgot_password}
          style={{ width: "380px", height: "380px" }}
          alt="Forgot Password"
        />
      </div>

      <div className="auth__content">
        <div className="auth__content-inner">
          <Link to="/" className="logo">
            <img src={assets.icon} className="logo__img" alt="Logo" />
            <h1 className="logo__title">grocerymart</h1>
          </Link>

          <h1 className="auth__heading">Forgot your password?</h1>
          <p className="auth__desc">
            Enter your email and we'll send you a new password.
          </p>

          {message && (
            <div className="message message-success">
              We have e-mailed your password reset link
            </div>
          )}
          {error && <div className="message message-error">Email invalid</div>}

          <form className="form auth__form" onSubmit={handleResetPassword}>
            <div className="form__group">
              <div className="form__text-input">
                <input
                  type="email"
                  className="form__input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <img src={assets.Message} className="form__input-icon" alt="" />
              </div>
            </div>

            <div className="form__group auth__btn--group">
              <button
                type="submit"
                className="auth__btn-signup"
                disabled={loading}
              >
                {loading ? "Processing..." : "Reset Password"}
              </button>
            </div>
          </form>

          <p className="auth__text">
            <Link to="/sign-in" className="auth__link">
              Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;  
