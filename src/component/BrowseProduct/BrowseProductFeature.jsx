import React, { useEffect, useState } from "react";
import "./BrowseProduct.scss";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import PaginationE from "../Pagination/PaginationE";
import { apiGet } from "../../Service/apiService";
function BrowseProductFeature({ products, setProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  //
  const [isActive, setIsActive] = useState(false);
  const [isHeart, setIsHeart] = useState(false);
  const handleClick = () => {
    setIsActive((prevState) => !prevState);
  };
  const heartClick = () => {
    setIsHeart((value) => !value);
  };
  //

  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;

  const fetchCategories = async (page) => {
    const response = await apiGet(`/product2?page=${page}`);
    if (response.success) {
      console.log("products:", response.data.data.data);
      setProducts(response.data.data.data);
      setCurrentPage(response.data.data.current_page);
      setLastPage(response.data.data.last_page);
    } else {
      console.error("Lỗi lấy danh mục:", response.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

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
    <section className="home__container">
      <div className="home__row">
        <div className="filter-wrap">
          <div className={`filter ${isActive ? "active" : ""}`}>
            <div className="container filter_container">
              <h3 className="filter__heading">
                Filter <FaFilter />
              </h3>
              <form action="" className="filter__form">
                <div className="filter__row">
                  {/* col1 */}
                  <div className="filter__col">
                    <label htmlFor="" className="filter__form-label">
                      Price
                    </label>
                    <input
                      type="range"
                      id="vol"
                      className="filter__range"
                      name="vol"
                      min="0"
                      max="50"
                    ></input>
                    <div className="filter__maxmin">
                      <label htmlFor="">Maximum</label>
                      <input type="text" className="filter__ip" />
                    </div>
                  </div>
                  <div className="filter__line"></div>
                  {/* col3 */}
                  <div className="filter__col">
                    <label htmlFor="" className="filter__form-label">
                      Brand
                    </label>
                    <input type="text" className="filter__brand" />
                    <div className="filter__history">
                      <span>Lavazza</span>
                      <span>Nescafe</span>
                      <span>Starbucks</span>
                    </div>
                  </div>
                </div>
              </form>
              <div className="filter__action">
                <div className="filter__cover">
                  <Link className="filter__cancel">Cancel</Link>
                  <Link className="filter__show">Show Result</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row row-browse-product" style={{ rowGap: "30px" }}>
        {products.map((product) => (
          <div className="col-lg-4 col-md-6 col-xl-4" key={product.id}>
            <Link to={`/preview-product/${product.id}`}>
              <article className="product-card">
                <div className="product-card__img-wrap">
                  <img
                    src={`${API_URL_LOCAL}/${product.image}`}
                    className="product-card__thumb"
                    alt=""
                  />
                  {/* <img src={`${API_URL_LOCAL}/${product[0].image}`}  /> */}
                  <button className="like-btn" onClick={heartClick}>
                    <img
                      src={isHeart ? assets.Heart_pink : assets.iconHeart}
                      alt=""
                      className="like-btn__icon"
                    />
                  </button>
                </div>
                <h3 className="product-card__title">{product.name}</h3>
                <div className="product-card__status">
                  <p className="product-card__stock">
                    Stock:{product.stock_quantity}
                  </p>
                </div>
                <p className="product-card__branch">{product.category_name}</p>
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
        {/* Phân trang */}
        <div className="paginate_product">
          <button
            className="btn btn-success"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &laquo; Trước
          </button>

          {Array.from({ length: lastPage }, (_, index) => index + 1).map(
            (page) => (
              <button
                className="paginate_product-item"
                key={page}
                onClick={() => setCurrentPage(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            )
          )}

          <button
            className="btn btn-success"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, lastPage))
            }
            disabled={currentPage === lastPage}
          >
            Sau &raquo;
          </button>
        </div>
      </div>
    </section>
  );
}

export default BrowseProductFeature;
