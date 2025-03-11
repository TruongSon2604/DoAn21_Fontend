
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet, apiPostWithToken } from "../../Service/apiService";
import { assets } from "../../assets/assets";
import { FaCodeCompare, FaCartShopping } from "react-icons/fa6";
import { FaShoppingBag, FaStar } from "react-icons/fa";
import "./ProductPreview.scss";
import { Toaster, toast } from 'react-hot-toast';

const ProductPreview = () => {
  const { id } = useParams(); // Extract the id from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // New state to handle quantity
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await apiGet("/getProductByid/" + id);
      console.log("getProductByid: ", response.data.data);
      if (response.success) {
        setProduct(response.data.data);
      } else {
        console.error("Lỗi lấy sản phẩm:", response.message);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  // Calculate total price based on quantity
  const totalPrice =
    product && product[0]
      ? (product[0].discounted_price * quantity).toFixed(2)
      : 0;

  // Handle increase/decrease of quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const addToCart = async () => {
    const token = localStorage.getItem("access_token");
    const data = {
      product_id: parseInt(id, 10),
      quantity: quantity,
    };
    const response = await apiPostWithToken("/addToCart", data, token);
  
    if (response.success) {
      // console.log("Product added to cart successfully:", response.data);
      toast('Product added to cart successfully!', {
        icon: '👏',
      });
      
    } else {
      toast.error("This didn't work.")
      console.error("Failed to add product to cart:", response.message);
    }
  };

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-container">
    <div><Toaster/></div>
      <div className="row">
        <div className="col-xxl-5 col-lg-6">
          <div className="prod-preview">
            <div className="prod-preview__list">
              <div className="prod-preview__item">
                <img src={`${API_URL_LOCAL}/${product[0].image}`} alt="" />
              </div>
            </div>
            <div className="prod-preview__thumbs">
              <img
                src={assets.ItemCafe1}
                alt=""
                className="prod-preview__thumbs-img prod-preview__thumbs-img__current"
              />
              <img
                src={assets.ItemCafe1}
                alt=""
                className="prod-preview__thumbs-img"
              />
              <img
                src={assets.ItemCafe1}
                alt=""
                className="prod-preview__thumbs-img"
              />
              <img
                src={assets.ItemCafe1}
                alt=""
                className="prod-preview__thumbs-img"
              />
            </div>
          </div>
        </div>
        <div className="col-xxl-7 col-lg-6">
          <section className="prod-info">
            <h1 className="prod-info__heading">{product[0].name}</h1>
            <div className="row">
              <div className="col-xxl-6 col-xl-5">
                <div className="prod-prop">
                  <FaStar color="orange" />
                  <h4 className="prod-prop__title">(3.5) 1100 reviews</h4>
                </div>
                <div className="prod-prop__des">
                  <p className="prod-prop__des-item">Description</p>
                  {product[0].description}
                </div>
                {/* Quantity control buttons */}
                <div className="prod-info__quantity">
                  <button
                    onClick={decreaseQuantity}
                    className="prod-info__quantity-btn"
                  >
                    -
                  </button>
                  <span className="prod-info__quantity-value">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="prod-info__quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-7 col-md-7 col-lg-9">
                <div className="prod-prop">
                  <FaCodeCompare className="prod-prop__icon" />
                  <h4 className="prod-prop__title">Compare</h4>
                </div>

                <div className="prod-prop">
                  <FaCartShopping className="prod-prop__icon" />
                  <div>
                    <h4 className="prod-prop__title">Delivery</h4>
                    <p className="prod-prop__desc">
                      From 25000 VNĐ for 1-3 days
                    </p>
                  </div>
                </div>

                <div className="prod-prop">
                  <FaShoppingBag className="prod-prop__icon" />
                  <div>
                    <h4 className="prod-prop__title">Pickup</h4>
                    <p className="prod-prop__desc">Out of 2 store, today</p>
                  </div>
                </div>

                <div className="prod-info__card">
                  <div className="prod-info__row">
                    <span className="prod-info__price">
                      {product[0].original_price} VNĐ
                    </span>
                    <span className="prod-info__tax">
                      {product[0].discount_percent}%
                    </span>
                  </div>
                  <p className="prod-info__total-price">{totalPrice} VNĐ</p>
                  <div className="prod-info__row prod-info__row-action">
                    <button className="btn btn-warning btn_addToCard" onClick={addToCart}>
                      Add To Cart
                    </button>
                    <button className="prod-info__like-btn">
                      <img
                        src={assets.Heart_pink}
                        className="prod-info__img_heart"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
