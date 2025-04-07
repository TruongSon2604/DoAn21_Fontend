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
import Favourite from "./pages/Favourite/Favourite";
import Profile from "./pages/Profile/Profile";
import { IndexAdmin } from "./pages/Admin/IndexAdmin";
import { AdminProduct } from "./pages/Admin/AdminProduct";
import { AdminCategory } from "./pages/Admin/pageAdmin/AdminCategory";
import { AdminOrder } from "./pages/Admin/pageAdmin/AdminOrder";
import { AdminCoupon } from "./pages/Admin/pageAdmin/AdminCoupon";
import NotFound from "./pages/NotFound";
import FeatureProduct from "./pages/FeatureProduct/FeatureProduct";
import Voucher from "./pages/Voucher/Voucher";
import ListVoucher from "./pages/Profile/ListVoucher";
import NewsPage from "./pages/News/NewsPage";
import NewsPageDetails from "./pages/News/NewsPageDetails";
import { AdminPost } from "./pages/Admin/pageAdmin/AdminPost";
// import Dashboard from "./pages/Admin/pageAdmin/AdminDashboard";
import AdminDashboard from "./pages/Admin/pageAdmin/AdminDashboard";
import { Dashboard } from "@mui/icons-material";
import MyAddress from "./pages/Profile/MyAddress";
import RecommendationPanel from "./pages/Admin/pageAdmin/RecommendationPanel";
// import { Voucher } from "./pages/Voucher/Voucher";

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
          <Route path="/preview-product/:id" element={<PreviewProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/check-out" element={<Checkout />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/featureProduct" element={<FeatureProduct />} />
          <Route path="/voucher" element={<Voucher />} />
          <Route path="/list-voucher" element={<ListVoucher />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsPageDetails />} />
          <Route path="/myAddress" element={<MyAddress />} />
          {/* /admin/ */}
          <Route path="/admin" element={<IndexAdmin />} />
          <Route path="/admin/product" element={<AdminProduct />} />
          <Route path="/admin/category" element={<AdminCategory />} />
          <Route path="/admin/order" element={<AdminOrder />} />
          <Route path="/admin/coupon" element={<AdminCoupon />} />
          <Route path="/admin/post" element={<AdminPost />} />
          <Route
            path="/admin/generateAiRecommendations"
            element={<RecommendationPanel />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
