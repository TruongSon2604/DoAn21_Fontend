import React from "react";

import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import "./scssFolder/base/_reset.scss";
import "./scssFolder/base/_base.scss";

// import "./scssFolder/main.scss";

import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ForgotPassword from "./pages/ResetPassword/ForgotPassword";
import CreatePassword from "./pages/ResetPassword/CreatePassword";
import Grocery from "./pages/Grocery/Grocery";
import PreviewProduct from "./pages/PreviewProduct/PreviewProduct";
import AuthCallback from "./pages/AuthCallback";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/preview-product" element={<PreviewProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/check-out" element={<Checkout />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
