import React, { useContext, useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Cart.scss";
import { apiGetWithToken, apiPostWithToken } from "../../Service/apiService"; // Giả sử apiPostWithToken là hàm gửi POST request.
import { Toaster, toast } from "react-hot-toast";
import { ProductContext } from "../../Providerrs/ProductContext";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TabProductDetail from "../../component/TabProductDetail/TabProductDetail";
import Loading from "../../component/Loading/Loading";
import Loading2 from "../../component/Loading/Loading2";

function Cart() {
  const { selectedProducts, setSelectedProducts, products, setProducts } =
    useContext(ProductContext);
  // const MySwal = withReactContent(Swal);
  //
  // const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const token = localStorage.getItem("access_token");
  // const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const removeSelectedProducts = async () => {
    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product to remove.");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiPostWithToken(
          "/deleteMoreItemFromCart",
          { data: selectedProducts.map((id) => ({ product_id: id })) },
          token
        );

        if (response.success) {
          setProducts((prevProducts) =>
            prevProducts.filter(
              (product) => !selectedProducts.includes(product.id)
            )
          );
          setSelectedProducts([]);
          Swal.fire({
            title: "Deleted!",
            text: "Selected products removed successfully!",
            icon: "success",
          });
        } else {
          toast.error("Error removing products!");
        }
      }
    });
  };

  useEffect(() => {
    calculateTotal(); // Recalculate total whenever products change
  }, [products]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        console.error("Không có token");
        return;
      }

      const response = await apiGetWithToken("/getCartItem", token);
      if (response.success) {
        console.log("cart", response.data.data[0]);
        setProducts(response.data.data[0]);
      } else {
        console.error("Lỗi lấy danh mục:", response.message);
      }
      setLoading(false);
    };

    const fetchTotal = async () => {
      if (!token) {
        console.error("Không có token");
        return;
      }

      const response = await apiGetWithToken("/calculateTotal", token);
      if (response.success) {
        console.log("data:", response.data.data);
        setTotal(response.data.data);
      } else {
        console.error("Lỗi lấy danh mục:", response.message);
      }
      setLoading(false);
    };

    fetchCart();
    fetchTotal();
  }, []);

  const calculateTotal = () => {
    const total = products.reduce((acc, product) => {
      return acc + product.quantity * product.discounted_price;
    }, 0);
    setTotal(total);
  };

  const handleIncrease = async (productId) => {
    const product = products.find((product) => product.id === productId);
    if (product.quantity >= product.stock_quantity) {
      // Nếu số lượng muốn tăng đã bằng hoặc lớn hơn stock_quantity
      Swal.fire({
        icon: "error",
        text: `The quantity exceeds the stock available (${product.stock_quantity} items)`,
      });
      return;
    }

    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setProducts(updatedProducts);
    calculateTotal();

    const response = await apiPostWithToken(
      "/updateQuantityCart",
      {
        product_id: productId,
        quantity: updatedProducts.find((product) => product.id === productId)
          .quantity,
      },
      token
    );

    if (response.success) {
      console.log("handleIncrease");
    } else {
      console.error("Lỗi cập nhật số lượng:", response.message);
    }
  };

  const handleDecrease = async (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId && product.quantity > 1
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setProducts(updatedProducts);
    calculateTotal();

    const response = await apiPostWithToken(
      "/updateQuantityCart",
      {
        product_id: productId,
        quantity: updatedProducts.find((product) => product.id === productId)
          .quantity,
      },
      token
    );

    if (response.success) {
      console.log("handleDecrease");
    } else {
      console.error("Lỗi cập nhật số lượng:", response.message);
    }
  };

  const removeFromCart = async (productId) => {
    if (!token) {
      console.error("Không có token");
      return;
    }
    const response = await apiPostWithToken(
      "/removeFromCart",
      { product_id: productId },
      token
    );
    if (response.success) {
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
      toast("Product remove from cart successfully!", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.error("Error !");
    }
  };

  const handleCheckout = (e) => {
    if (selectedProducts.length === 0) {
      e.preventDefault();
      // alert("Vui lòng chọn ít nhất một sản phẩm trước khi thanh toán!");
      showAlert();
    } else {
      // alert("vao checkout");
      navigate("/check-out");
    }
  };

  const MySwal = withReactContent(Swal);
  const showAlert = () => {
    MySwal.fire({
      icon: "error",
      text: "Please select at least one product before proceeding to checkout!",
    });
  };

  // if (loading || !products) {
  //   return <Loading2 />;
  // }

  return (
    <>
      <Header />
      <div className="container">
        <div>
          <Toaster />
        </div>
        <div className="checkout-container">
          <div className="row">
            <div className="col-8">
              <div className="cart-info">
                {loading ? (
                  <Loading2 />
                ) : (
                  // <div className="cart-info__list">
                  //   {products &&
                  //     products.map((product) => (
                  //       <article className="cart-item" key={product.id}>
                  //         <input
                  //           className="cart-item__input"
                  //           type="checkbox"
                  //           checked={selectedProducts.includes(product.id)}
                  //           onChange={() => handleSelectProduct(product.id)}
                  //         />
                  //         <img
                  //           src={`${API_URL_LOCAL}/${product.image}`}
                  //           className="cart-item__thumb"
                  //           alt=""
                  //         />
                  //         <div className="cart-item__content">
                  //           <div className="cart-item__content-left">
                  //             <h3 className="cart-item__title">
                  //               {product.name}
                  //             </h3>
                  //             <p className="cart-item__price-wrap">
                  //               {product.discounted_price} VNĐ |{" "}
                  //               <span className="cart-item__status">
                  //                 {product.stock_quantity > 0
                  //                   ? `In stock: ${product.stock_quantity}`
                  //                   : "Not in stock"}
                  //               </span>
                  //             </p>
                  //             <div className="cart-item__ctrl">
                  //               <div className="quantity">
                  //                 <button
                  //                   className="cart-item__input-btn"
                  //                   onClick={() => handleDecrease(product.id)} // Giảm số lượng
                  //                 >
                  //                   <img src={assets.Minus} alt="" />
                  //                 </button>
                  //                 <label style={{ marginTop: "4px" }}>
                  //                   {product.quantity}
                  //                 </label>
                  //                 <button
                  //                   className="cart-item__input-btn"
                  //                   onClick={() => handleIncrease(product.id)} // Tăng số lượng
                  //                 >
                  //                   <img src={assets.Plus} alt="" />
                  //                 </button>
                  //               </div>
                  //             </div>
                  //           </div>
                  //           <div className="cart-item__content-right">
                  //             <p className="cart-item__total-price">
                  //               {new Intl.NumberFormat("vi-VN", {
                  //                 style: "currency",
                  //                 currency: "VND",
                  //               }).format(
                  //                 product.quantity * product.discounted_price
                  //               )}
                  //               {/* {product.quantity * product.discounted_price} VNĐ */}
                  //             </p>
                  //             <div className="cart-item__ctrl-right">
                  //               <button className="cart-item__input-btn cart-item__input-btn-save">
                  //                 <img
                  //                   src={assets.save}
                  //                   alt=""
                  //                   className="cart-btn__save"
                  //                 />
                  //                 Save
                  //               </button>
                  //               <button
                  //                 className="cart-item__input-btn cart-item__input-btn-delete"
                  //                 onClick={() => removeFromCart(product.id)}
                  //               >
                  //                 <img src={assets.Delete} alt="" />
                  //                 Delete
                  //               </button>
                  //             </div>
                  //           </div>
                  //         </div>
                  //       </article>
                  //     ))}
                  // </div>
                  <div className="cart-info__list">
                    {!products ? (
                      <Loading2 />
                    ) : products.length === 0 ? (
                      <div className="no-item">
                        <img
                          src={assets.notfound}
                          style={{width:'150px',height:'150px',}}
                          alt=""
                        />
                        <p style={{marginTop:'80px' ,marginLeft:'25px'}}>Không có sản phẩm nào trong giỏ hàng</p>
                      </div>
                    ) : (
                      products.map((product) => (
                        <article className="cart-item" key={product.id}>
                          <input
                            className="cart-item__input"
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleSelectProduct(product.id)}
                          />
                          <img
                            src={`${API_URL_LOCAL}/${product.image}`}
                            className="cart-item__thumb"
                            alt=""
                          />
                          <div className="cart-item__content">
                            <div className="cart-item__content-left">
                              <h3 className="cart-item__title">
                                {product.name}
                              </h3>
                              <p className="cart-item__price-wrap">
                                {product.discounted_price} VNĐ |{" "}
                                <span className="cart-item__status">
                                  {product.stock_quantity > 0
                                    ? `In stock: ${product.stock_quantity}`
                                    : "Not in stock"}
                                </span>
                              </p>
                              <div className="cart-item__ctrl">
                                <div className="quantity">
                                  <button
                                    className="cart-item__input-btn"
                                    onClick={() => handleDecrease(product.id)}
                                  >
                                    <img src={assets.Minus} alt="" />
                                  </button>
                                  <label style={{ marginTop: "4px" }}>
                                    {product.quantity}
                                  </label>
                                  <button
                                    className="cart-item__input-btn"
                                    onClick={() => handleIncrease(product.id)}
                                  >
                                    <img src={assets.Plus} alt="" />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="cart-item__content-right">
                              <p className="cart-item__total-price">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(
                                  product.quantity * product.discounted_price
                                )}
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
                                <button
                                  className="cart-item__input-btn cart-item__input-btn-delete"
                                  onClick={() => removeFromCart(product.id)}
                                >
                                  <img src={assets.Delete} alt="" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                )}

                <div className="cart-info__bottom">
                  <div className="row">
                    <div className="col-8">
                      <div className="cart-info__continue">
                        <Link to="/" className="cart-info__continue-link">
                          <img src={assets.arrowleft} alt="" />
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                    <div className="col-4">
                      <button
                        onClick={removeSelectedProducts}
                        className="cart-item__input-btn-delete continue_checkout continue_select"
                      >
                        Delete Selected
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
                  <span className="cart-info__number">{products.length}</span>
                </div>

                <div className="cart-info__row">
                  <span>Price (Total)</span>
                  <span className="cart-info__number">
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(total)}
                  </span>
                </div>

                {/* <div className="cart-info__row">
                  <span>Shipping</span>
                  <span className="cart-info__number">$10.00</span>
                </div> */}

                <div className="cart-info__seperate"></div>

                {/* <div className="cart-info__row">
                  <span>Estimated Total</span>
                  <span className="cart-info__number">{total} VNĐ</span>
                </div> */}

                <button className="continue_checkout" onClick={handleCheckout}>
                  Continue to checkout
                </button>
              </div>

              <div className="cart-info">
                <div className="gift-item">
                  <div className="gift-item__icon-wrap">
                    <img src={assets.gift} className="gift-item__icon" alt="" />
                  </div>
                  <div className="gift-item__content">
                    <h3 className="gift-item__title">
                      Send this order as a gift.
                    </h3>
                    <p className="gift-item__desc">
                      Available items will be shipped to your gift recipient.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <TabProductDetail /> */}
      </div>

      <Footer />
    </>
  );
}

export default Cart;
