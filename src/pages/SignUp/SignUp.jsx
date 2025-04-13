import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import "./SignUp.scss";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../../component/Loading/Loading";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    image: null,
  });
  const API_URL_LOCAL = import.meta.env.VITE_API_URL;

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // const register = async (e) => {
  //   e.preventDefault();
  //   setErrors({});
  //   if (formData.password.length < 8) {
  //     setErrors({
  //       password: ["Mật khẩu phải có ít nhất 8 ký tự."],
  //     });

  //     Swal.fire({
  //       icon: "error",
  //       text: "Mật khẩu phải có ít nhất 8 ký tự!",
  //     });

  //     return;
  //   }

  //   if (formData.password !== formData.password_confirmation) {
  //     setErrors({
  //       password_confirmation: ["Mật khẩu xác nhận không khớp."],
  //     });

  //     Swal.fire({
  //       icon: "error",
  //       text: "Mật khẩu xác nhận không khớp!",
  //     });

  //     return; // dừng lại, không gọi API nữa
  //   }

  //   const data = new FormData();
  //   data.append("name", formData.name);
  //   data.append("email", formData.email);
  //   data.append("password", formData.password);
  //   data.append("password_confirmation", formData.password_confirmation);
  //   if (formData.image) {
  //     data.append("image", formData.image);
  //   }

  //   try {
  //     const res = await axios.post(`${API_URL_LOCAL}/auth/register`, data);
  //     if (res.status === 201) {
  //       // alert("Đăng ký thành công!");
  //       const status = Swal.fire({
  //         icon: "success",
  //         text: "Đăng ký thành công !",
  //       });
  //       if ((await status).isConfirmed) {
  //         window.location.href = "/sign-in";
  //       }
  //     }
  //   } catch (err) {
  //     if (err.response?.data) {
  //       const data = err.response.data;
  //       const errorBag = data.errors || data;
  //       setErrors(errorBag);
  //       const firstError = Object.values(errorBag)[0]?.[0];
  //       if (firstError) {
  //         Swal.fire({
  //           icon: "error",
  //           text: "Email đã bị trùng !",
  //         });
  //       }

  //       console.log("Chi tiết lỗi:", errorBag);
  //     } else {
  //       alert("Lỗi không xác định khi đăng ký!");
  //     }
  //   }
  // };

  const register = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    if (formData.password.length < 8) {
      setIsLoading(false);
      setErrors({
        password: ["Mật khẩu phải có ít nhất 8 ký tự."],
      });
      Swal.fire({
        icon: "error",
        text: "Mật khẩu phải có ít nhất 8 ký tự!",
      });
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setIsLoading(false); // dừng loading nếu lỗi
      setErrors({
        password_confirmation: ["Mật khẩu xác nhận không khớp."],
      });
      Swal.fire({
        icon: "error",
        text: "Mật khẩu xác nhận không khớp!",
      });
      return;
    }
    if (!formData.image) {
      setIsLoading(false);
      setErrors({
        image: ["Vui lòng chọn ảnh đại diện."],
      });
      Swal.fire({
        icon: "error",
        text: "Vui lòng chọn ảnh đại diện!",
      });
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("password_confirmation", formData.password_confirmation);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await axios.post(`${API_URL_LOCAL}/auth/register`, data);
      if (res.status === 201) {
        setIsLoading(false);
        const status = await Swal.fire({
          icon: "success",
          text: "Đăng ký thành công !",
        });

        if (status.isConfirmed) {
          window.location.href = "/sign-in";
        }
      }
    } catch (err) {
      if (err.response?.data) {
        Swal.fire({
          icon: "error",
          text: "Email đã bị trùng !",
        });
      } else {
        alert("Lỗi không xác định khi đăng ký!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="auth">
      {/* intro */}
      <div className="auth__intro">
        <img src={assets.LoginLeft} className="auth_intro-img" alt="" />
        <p className="auth__intro-text">
          Let’s create your account and Shop like a pro and save money.
        </p>
      </div>

      {/* auth contents */}
      <div className="auth__content">
        <div className="auth__content-inner">
          {/* logo   */}
          <Link to="/" className="logo">
            <img src={assets.icon} className="logo__img" alt="" />
            <h1 className="logo__title">grocerymart</h1>
          </Link>

          <h1 className="auth__heading">Sign Up</h1>
          <p className="auth__desc">
            Let’s create your account and Shop like a pro and save money.
          </p>

          <form onSubmit={register} className="form auth__form">
            {/* Name */}
            <div className="form__group">
              <div className="form__text-input">
                <input
                  type="text"
                  name="name"
                  className="form__input"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <img src={assets.Message} className="form__input-icon" alt="" />
              </div>
              {/* {errors.name && <p className="form__error">{errors.name[0]}</p>} */}
            </div>

            {/* Email */}
            <div className="form__group">
              <div className="form__text-input">
                <input
                  type="email"
                  name="email"
                  className="form__input"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <img src={assets.Message} className="form__input-icon" alt="" />
              </div>
              {/* {errors.email && <p className="form__error">{errors.email[0]}</p>} */}
            </div>

            {/* Password */}
            <div className="form__group">
              <div className="form__text-input">
                <input
                  type="password"
                  name="password"
                  className="form__input"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <img src={assets.Lock} className="form__input-icon" alt="" />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form__group">
              <div className="form__text-input">
                <input
                  type="password"
                  name="password_confirmation"
                  className="form__input"
                  placeholder="Confirm Password"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                />
                <img src={assets.Lock} className="form__input-icon" alt="" />
              </div>
            </div>

            {/* Image Upload */}
            <div className="form__group">
              <label className="form__label">Upload Avatar</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="form__file"
              />
              {errors.image && <p className="form__error">{errors.image[0]}</p>}
            </div>

            <div className="form__group form__group--inline">
              <label htmlFor="" className="form__checkbox">
                <input
                  type="checkbox"
                  name=""
                  className="form__checkbox-input"
                  id=""
                />
                <label htmlFor="" className="form__checkbox--label">
                  Set as default card
                </label>
              </label>
              <a href="" className="auth__link">
                Recovery Password
              </a>
            </div>

            <div className="form__group auth__btn--group">
              <button type="submit" className="auth__btn-signup">
                Sign Up
              </button>
              <button type="button" className="auth__btn-google">
                <img src={assets.iconGoogle} className="btn__icon" alt="" />
                Sign in with Gmail
              </button>
            </div>
          </form>

          <p className="auth__text">
            You have an account yet?
            <Link to="/sign-in" className="auth__link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
