import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FaUser } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import "./MyAddress.scss";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  apiDeleteWithToken,
  apiGetWithToken,
  apiPost,
} from "../../Service/apiService";
import ModalPreview from "../../component/Modal/ModalPreview";
import { Button } from "react-bootstrap";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { FaLock } from "react-icons/fa";

function ChangePassword() {
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    email: "",
    temporary_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Giả sử user đang đăng nhập
  //   const user = JSON.parse(localStorage.getItem("user"));
  useState(() => {
    if (user && user.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.new_password !== formData.new_password_confirmation) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Passwords do not match.",
      });
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await apiPost("/auth/update-password", formData);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Password changed successfully.",
        });
        setMessage("Password changed successfully.");
      } else {
        setError("Failed to change password.");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred.");
      }
    }
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="profile__container">
          <div className="row">
            <div className="col-3">
              <aside className="profile__sidebar">
                {/* profile user */}
                <div className="profile__user">
                  <img
                    className="profile__user-avatar"
                    src={
                      user.image.startsWith("http")
                        ? user.image
                        : `${API_URL_LOCAL}/${user.image}`
                    }
                    alt="avatar"
                  />
                  <h1 className="profile__user-name">{user.name}</h1>
                  <p className="profile__user-desc">
                    Registered:{" "}
                    {new Date(user.created_at).toLocaleDateString("vi-VN", {
                      timeZone: "Asia/Ho_Chi_Minh",
                    })}
                  </p>
                </div>

                {/* profile menu */}
                <div className="profile__menu">
                  <h3 className="profile__menu-title">Manage Account</h3>
                  <ul className="profile__menu-list">
                    <li>
                      <Link className="profile__menu-linkk" to={"/profile"}>
                        <FaUser /> Personal info
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="profile__menu-linkk"
                        to={"/list-voucher"}
                      >
                        <MdDiscount /> List voucher
                      </Link>
                    </li>
                    <li>
                      <Link className="profile__menu-linkk" to={"/myaddress"}>
                        <FaAddressBook />
                        My Address
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="profile__menu-linkk"
                        to={"/change-password"}
                      >
                        <FaLock />
                        Change Password
                      </Link>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
            <div className="col-9">
              <div className="profile__info">
                <h2 className="profile__info-heading">Change Password</h2>
                {user.google_id ? (
                  <div className="alert alert-info">
                    <strong>Note:</strong> You signed in with Google. Please
                    manage your password via Google Account settings.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="form-control mb-2"
                      />
                    </div>

                    <div className="form-group mb-2">
                      <label>Temporary Password:</label>
                      <input
                        type="password"
                        name="temporary_password"
                        value={formData.temporary_password}
                        onChange={handleChange}
                        required
                        className="form-control mb-2"
                      />
                    </div>

                    <div className="form-group mb-2">
                      <label>New Password:</label>
                      <input
                        type="password"
                        name="new_password"
                        value={formData.new_password}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label>Confirm New Password:</label>
                      <input
                        type="password"
                        name="new_password_confirmation"
                        value={formData.new_password_confirmation}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Change Password
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ChangePassword;
