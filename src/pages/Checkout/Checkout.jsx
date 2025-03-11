import React, { useContext, useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Checkout.scss";
import { CiEdit } from "react-icons/ci";
import { SiZalo } from "react-icons/si";
import { FaHandHoldingUsd } from "react-icons/fa";
import ModalPreview from "../../component/Modal/ModalPreview";
import {
  apiGet,
  apiGetWithToken,
  apiPostWithToken,
} from "../../Service/apiService";
import { ProductContext } from "../../Providerrs/ProductContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CheckPaymentStatus from "./CheckPaymentStatus";

function Checkout() {
  const [selectedValue, setSelectedValue] = useState("value-1");
  const { selectedProducts, setSelectedProducts } = useContext(ProductContext);
  const [address, setAddress] = useState([]);
  const [coupon, setCoupon] = useState([]);
  const { token } = useContext(ProductContext);
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [ListProduct, setListProduct] = useState([]);
  const [total, setTotal] = useState(null);
  const [coupon2, setCoupon2] = useState(0);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPayment = async () => {
      const transactionId = localStorage.getItem("transaction_id");

      if (!transactionId) return;

      try {
        const response = await apiGet(`/payment2/status/${transactionId}`);

        if (response.success && response.data.original.data.return_code === 1) {
          clearInterval(interval);
          localStorage.removeItem("transaction_id");
          alert("Thanh toán thành công!");
          navigate("/profile");
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra thanh toán:", error);
      }
    };

    const interval = setInterval(checkPayment, 3000);

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, []);

  const handleCouponChange = (e) => {
    const selectedId = Number(e.target.value);

    const discount22 =
      coupon.find((cp) => cp.id === selectedId)?.coupon.discount_value || 0;
    const coupon22 = (total * discount22) / 100;
    setCoupon2(coupon22);
    setSelectedCouponId(selectedId);
    alert(coupon22);
  };

  useEffect(() => {
    const getAddress = async () => {
      const response = await apiGetWithToken("/getAddressByUser", token);
      if (response.success) {
        setAddress(response.data.data);
      }
    };

    const getCoupon = async () => {
      const response = await apiGetWithToken("/getUserWithCoupon", token);
      if (response.success) {
        setCoupon(response.data.data);
      }
    };

    const getListProduct = async () => {
      const response = await apiPostWithToken(
        "/getProductByListId",
        {
          products_id: selectedProducts,
        },
        token
      );
      if (response.success) {
        console.log("getListProduct", response.data.data[0]);
        setListProduct(response.data.data[0]);
        setTotal(response.data.data["total"]);
      }
    };
    getListProduct();
    getAddress();
    getCoupon();
  }, []);

  const handleCheckout = async () => {
    const selectedAddress =
      address.find((ad) => ad.id === selectedAddressId) || null;
    const selectedCoupon = coupon.find(
      (cp) => Number(cp.id) === selectedCouponId
    );

    if (selectedAddress == null) {
      Swal.fire({
        title: "Please Select Address",
        icon: "warning",
      });
      return;
    }

    const requestData = {
      address_id: selectedAddress ? selectedAddress.id : null,
      coupon_id: selectedCoupon ? selectedCoupon.id : null,
      cartItems: ListProduct.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
      })),
    };

    try {
      if (selectedValue === "value-1") {
        const response = await apiPostWithToken(
          "/createOrder",
          requestData,
          token
        );
        if (response.success) {
          console.log(response);
          alert("Đặt hàng thành công!");
          navigate("/profile");
        } else {
          alert("Đặt hàng thất bại!");
        }
      } else {
        //
        const rp = await apiPostWithToken(`/payment2`, requestData, token);
        if (rp.success) {
          const orderUrl = rp.data?.result?.order_url;
          const transactionId = rp.data?.app_trans_id;
          if (orderUrl) {
            console.log("Transaction ID:", transactionId);
            localStorage.setItem("transaction_id", transactionId);
            window.open(orderUrl, "_blank");
          } else {
            console.error("Không tìm thấy order_url");
          }
        } else {
          console.error("Lỗi khi gọi API:", rp.message);
        }
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Đã xảy ra lỗi khi đặt hàng.");
    }
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="checkout-container">
          <div className="row">
            <div className="col-8">
              <div className="cart-info">
                <h1 className="cart-info__heading">
                  1. Shipping, arrives between Mon, May 16—Tue, May 24
                </h1>
                {/* checkout address */}
                <div className="cart-info__separate cart-info__bold"></div>

                <div className="user-address">
                  <div className="user-address__top">
                    <div>
                      <h2 className="user-address__title">Shipping address</h2>
                      <p className="user-address__desc">
                        Where should we deliver your order?
                      </p>
                    </div>
                    {/* <button className='user-address__add'>Add a new address</button> */}
                    <ModalPreview />
                  </div>

                  <div className="user-address__list">
                    {address &&
                      address.map((ad) => (
                        <article className="address-card" key={ad.id}>
                          <div className="address-card__left">
                            <div className="address-card__choose">
                              <input
                                type="radio"
                                name="address"
                                value={ad.id}
                                checked={selectedAddressId === ad.id} // Đảm bảo chọn radio
                                onChange={(e) =>
                                  setSelectedAddressId(Number(e.target.value))
                                }
                              />
                            </div>
                            <div className="address-card__info">
                              <h3 className="address-card__title">
                                {ad.address_detail}
                              </h3>
                              <p className="address-card__desc">
                                {ad.ward}, {ad.district}, {ad.provice}.
                              </p>
                              <ul className="address-card__list">
                                <li>Shipping</li>
                                <li>Delivery from store</li>
                              </ul>
                            </div>
                          </div>

                          <div className="address-card__right">
                            <div className="address-card__ctl">
                              <CiEdit />
                              <button className="address-card__edit" id={ad.id}>
                                Edit{" "}
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                  </div>
                </div>

                <h2 className="user-address__title">Payment Method</h2>
                <div className="user-payment">
                  <div className="radio-input">
                    <label className="radio-input__label">
                      <input
                        type="radio"
                        id="value-1"
                        name="value-radio"
                        value="value-1"
                        checked={selectedValue === "value-1"}
                        onChange={(e) => setSelectedValue(e.target.value)}
                      />
                      <p className="user-payment__title">
                        {" "}
                        <FaHandHoldingUsd size={25} color="blue" />
                        Thanh toán khi nhận hàng
                      </p>
                    </label>

                    <label className="radio-input__label">
                      <input
                        type="radio"
                        id="value-2"
                        name="value-radio"
                        value="value-2"
                        checked={selectedValue === "value-2"}
                        onChange={(e) => setSelectedValue(e.target.value)}
                      />
                      <p className="user-payment__title">
                        <SiZalo size={30} color="blue" /> Thanh toán bằng
                        zalopay
                      </p>
                    </label>
                  </div>
                </div>

                <h2 className="user-address__title">Select Coupon</h2>
                <select
                  name=""
                  id=""
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    padding: "10px",
                    border: "2px solid #3498db",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    color: "#333",
                    fontSize: "16px",
                    cursor: "pointer",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                  //   onChange={(e) => setSelectedCouponId(Number(e.target.value))}
                  onChange={handleCouponChange}
                >
                  <option value="">Chọn mã giảm giá</option>
                  {coupon &&
                    coupon.map((cp) => (
                      <option key={cp.id} value={cp.id}>
                        {cp.coupon.code}
                      </option>
                    ))}
                </select>

                <h2 className="user-address__title user-address__details">
                  Items details
                </h2>
                <div className="cart-info__list">
                  {ListProduct &&
                    ListProduct.map((product) => (
                      <article className="cart-item" key={product.id}>
                        <Link to="">
                          <img
                            src={`${API_URL_LOCAL}/${product.image}`}
                            alt=""
                            className="cart-item__thumb"
                          />
                        </Link>
                        <div className="cart-item__content">
                          <div className="cart-item__content-left">
                            <h3 className="cart-item__title">{product.name}</h3>
                            <p className="cart-item__price-wrap">
                              {product.discounted_price} VNĐ
                            </p>
                            <div className="cart-item__ctrl">
                              <div className="quantity">
                                <label>Quantity:{product.quantity}</label>
                              </div>
                            </div>
                          </div>
                          <div className="cart-item__content-right">
                            <p className="cart-item__total-price">
                              {product.price}
                            </p>
                            <div className="cart-item__ctrl-right">
                              <button className="cart-item__input-btn cart-item__input-btn-save">
                                <img
                                  src={assets.save}
                                  alt=""
                                  className="cart-btn__save"
                                />
                                Save
                              </button>
                              <button className="cart-item__input-btn cart-item__input-btn-delete">
                                <img src={assets.Delete} alt="" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>

                <div className="cart-info__bottom">
                  <div className="row">
                    <div className="col-8">
                      <div className="cart-info__continue">
                        <Link to="" className="cart-info__continue-link">
                          <img src={assets.arrowleft} alt="" />
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                    <div className="col-4">
                      <button
                        className="continue-shoping"
                        onClick={handleCheckout}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="cart-info">
                <div className="cart-info__row">
                  <span>Subtotal (items)</span>
                  <span className="cart-info__number">
                    {ListProduct.length}
                  </span>
                </div>

                <div className="cart-info__row">
                  <span>Price (Total)</span>
                  <span className="cart-info__number">{total} VNĐ</span>
                </div>

                <div className="cart-info__row">
                  <span>Coupon Discount</span>
                  <span className="cart-info__number">
                    {coupon2 === 0 ? "0" : `- ${coupon2}`} VNĐ
                  </span>
                </div>

                <div className="cart-info__row">
                  <span>Shipping</span>
                  <span className="cart-info__number">25000 VNĐ</span>
                </div>

                <div className="cart-info__seperate"></div>

                <div className="cart-info__row">
                  <span>Estimated Total</span>
                  <span className="cart-info__number">
                    {total - coupon2 + 25000} VNĐ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
