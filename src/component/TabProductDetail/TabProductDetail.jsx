import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import "./TabProductDetail.scss";
import { assets } from "../../assets/assets";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { apiGet, apiPost, apiPostWithToken } from "../../Service/apiService";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactRating from "react-rating";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function TabProductDetail() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [newCommentId, setNewCommentId] = useState(null);

  // const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const [rating, setRating] = useState(3);
  const [start, setStart] = useState(5);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  var settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  const [isHeart, setIsHeart] = useState(false);
  const heartClick = () => {
    setIsHeart((value) => !value);
  };
  const [comments, setComments] = useState([]);

  const [activeKey, setActiveKey] = useState("link-1");

  //
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;

  const getCommentsByProductId = async () => {
    console.log("idparam:", id);
    const response = await apiGet(`/getCommentByProductId/${id}`);
    if (response.success) {
      console.log("comments:", response.data.data.data);
      setComments(response.data.data.data);
    } else {
      console.error("Lỗi lấy binh luan:", response.message);
    }
  };

  const sendMessage = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || null;

      const dt = {
        user_id: userId,
        product_id: id,
        content: message,
        rating: start,
      };

      const response = await apiPostWithToken(`/comment`, dt, token);

      if (response.success) {
        alert(response.data.data.id);
        // console.log("day 1222 comment:", response.data.data.id);
        setNewCommentId(response.data.data.id);
        // alert(n)

        Swal.fire({
          title: "Bạn đã đánh giá sản phẩm thành công!",
          icon: "success",
        });
        getCommentsByProductId();
      } else if (response.status === 422) {
        if (response.error.errors?.product_id) {
          Swal.fire({
            title: "Bạn chưa mua sản phẩm này nền chưa thể đánh giá!",
            icon: "warning",
          });
        }
      } else {
        alert(`Comment product ${id} failed: ${response.message}`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await apiGet("/getProductLimit");
      if (response.success) {
        console.log("products:", response.data.data.data);
        setProducts(response.data.data);
        console.log("rp", response.data.data);
      } else {
        console.error("Lỗi lấy danh mục:", response.message);
      }
      setLoading(false);
    };

    fetchProducts();
    getCommentsByProductId();
  }, []);

  const renderContent = () => {
    switch (activeKey) {
      case "link-1":
        return (
          <div>
            <div className="row row-browse-product" style={{ rowGap: "30px" }}>
              <Slider {...settings}>
                {products &&
                  products.map((product) => (
                    <div
                      className="col-lg-4 col-md-6 col-xl-3"
                      key={product.id}
                    >
                      <Link to={`/preview-product/${product.id}`}>
                        <article className="product-card">
                          <div className="product-card__img-wrap">
                            <img
                              src={`${API_URL_LOCAL}/${product.image}`}
                              className="product-card__thumb"
                              alt=""
                            />
                            <button className="like-btn" onClick={heartClick}>
                              <img
                                src={
                                  isHeart ? assets.Heart_pink : assets.iconHeart
                                }
                                alt=""
                                className="like-btn__icon"
                              />
                            </button>
                          </div>
                          <h3 className="product-card__title">
                            {product.name}
                          </h3>
                          <div className="product-card__status">
                            {/* <p className="product-card__weigh">Weigh:{500}g</p> */}
                            <p className="product-card__stock">
                              Stock:{product.stock_quantity}
                            </p>
                          </div>
                          <p className="product-card__branch">Lavazza</p>
                          <div className="product-card__row">
                            <span className="product-card__price">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(product.discounted_price)}
                            </span>
                            <img
                              src={assets.Star1}
                              alt=""
                              className="product-card__star"
                            />
                            <span className="product-card__score">4.3</span>
                          </div>
                        </article>
                      </Link>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        );
      case "link-2":
        return (
          <div className="prod-content">
            <h2 className="prod-content__heading">
              What our customers are saying
            </h2>
            <div className="row">
              {comments.length >= 3 ? (
                <Slider {...settings2}>
                  {comments.map((comment) => (
                    <div className="col-xl-4" key={comment.id}>
                      <div className="review-card">
                        <div className="review-card__content">
                          <img
                            src={
                              comment.user.image.startsWith("http")
                                ? comment.user.image
                                : `${API_URL_LOCAL}/${comment.user.image}`
                            }
                            alt=""
                            className="review-card__avatar"
                          />
                          <div className="review-card__info">
                            <h4 className="review-card__title">
                              {comment.user.name}
                            </h4>
                            <p className="review-card__desc">
                              {comment.content}
                            </p>

                            {comment.id == newCommentId && (
                              <span className="new-comment-label">
                                Comment mới
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="review-card__rating">
                          <div className="rating">
                            <ReactRating
                              initialRating={comment.rating}
                              emptySymbol={<FaStar color="#ccc" />}
                              fullSymbol={<FaStar color="#ffd700" />}
                              fractions={2}
                              onChange={(value) => setRating(value)}
                            />
                          </div>
                          <span>({comment.rating}) Review</span>
                          <span style={{ marginLeft: "23px", color: "gray" }}>
                            {(() => {
                              const date = new Date(comment.created_at);
                              const day = String(date.getDate()).padStart(
                                2,
                                "0"
                              ); // Đảm bảo 2 chữ số
                              const month = String(
                                date.getMonth() + 1
                              ).padStart(2, "0"); // Tháng tính từ 0 nên +1
                              const year = date.getFullYear();
                              const hours = String(date.getHours()).padStart(
                                2,
                                "0"
                              );
                              const minutes = String(
                                date.getMinutes()
                              ).padStart(2, "0");
                              const seconds = String(
                                date.getSeconds()
                              ).padStart(2, "0");

                              return `${day}/${month}/${year} at ${hours}:${minutes}`;
                            })()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : comments.length > 0 ? (
                <div className="col-xl-4">
                  {comments.map((comment) => (
                    <div
                      className="review-card"
                      key={comment.id}
                      style={{ marginBottom: "15px" }}
                    >
                      <div className="review-card__content">
                        <img
                          src={
                            comment.user.image.startsWith("http")
                              ? comment.user.image
                              : `${API_URL_LOCAL}/${comment.user.image}`
                          }
                          alt=""
                          className="review-card__avatar"
                        />
                        <div className="review-card__info">
                          <h4 className="review-card__title">
                            {comment.user.name}
                          </h4>
                          <p className="review-card__desc">{comment.content}</p>
                          {comment.id == newCommentId && (
                            <span className="new-comment-label">
                              Comment mới
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="review-card__rating">
                        <div className="rating">
                          <ReactRating
                            initialRating={comment.rating}
                            emptySymbol={<FaStar color="#ccc" />}
                            fullSymbol={<FaStar color="#ffd700" />}
                            fractions={2}
                            onChange={(value) => setRating(value)}
                          />
                        </div>
                        <span>({comment.rating}) Review</span>
                        <span style={{ marginLeft: "30px", color: "gray" }}>
                          {/* {new Date(comment.created_at)
                            .toLocaleString("vi-VN", {
                              timeZone: "Asia/Ho_Chi_Minh",
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: false,
                            })
                            .replace(",", "")} */}
                          {(() => {
                            const date = new Date(comment.created_at);
                            const day = String(date.getDate()).padStart(2, "0"); // Đảm bảo 2 chữ số
                            const month = String(date.getMonth() + 1).padStart(
                              2,
                              "0"
                            ); // Tháng tính từ 0 nên +1
                            const year = date.getFullYear();
                            const hours = String(date.getHours()).padStart(
                              2,
                              "0"
                            );
                            const minutes = String(date.getMinutes()).padStart(
                              2,
                              "0"
                            );
                            const seconds = String(date.getSeconds()).padStart(
                              2,
                              "0"
                            );

                            return `${day}/${month}/${year} at ${hours}:${minutes}`;
                          })()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>Chưa có bình luận về sản phẩm !</div>
              )}
            </div>

            <h2 className="prod-content__heading feel_product">
              How do you feel about the product?
            </h2>
            <div className="row">
              <div className="tab-comment">
                <span className="tab-comment__ip">Comment</span>
                <input
                  placeholder="Type here..."
                  className="comment_ip"
                  name="text"
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="tab-rating">
                <span className="tab-comment__rating">Rating</span>
                <ReactRating
                  initialRating={5} // Giá trị đánh giá ban đầu
                  emptySymbol={<FaStar color="#ccc" />} // Màu sắc của sao chưa chọn
                  fullSymbol={<FaStar color="#ffd700" />} // Màu sắc của sao đã chọn
                  fractions={2} // Cho phép hiển thị số thập phân
                  onChange={(value) => setStart(value)} // Cập nhật giá trị khi người dùng chọn
                />
              </div>
              <button className="btn-donate" onClick={sendMessage}>
                Send message
              </button>
            </div>
          </div>
        );
      case "link-3":
        return <div>Feature Content</div>;
      default:
        return null;
    }
  };

  if (loading)
    return (
      <div className="browse">
        <div className="loader">
          <div className="crystal"></div>
          <div className="crystal"></div>
          <div className="crystal"></div>
          <div className="crystal"></div>
          <div className="crystal"></div>
          <div className="crystal"></div>
        </div>
      </div>
    );

  return (
    <>
      <Nav
        className="nav_product"
        variant="tabs"
        activeKey={activeKey}
        onSelect={(selectedKey) => setActiveKey(selectedKey)}
      >
        {/* <Nav.Item>
            <Nav.Link className='nav_product-item' eventKey="link-1">Description</Nav.Link>
          </Nav.Item> */}
        <Nav.Item>
          <Nav.Link className="nav_product-item" eventKey="link-1">
            Feature
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav_product-item" eventKey="link-2">
            Reviews
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {renderContent()}
    </>
  );
}

export default TabProductDetail;
