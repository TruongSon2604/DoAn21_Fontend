import React, { useEffect, useState } from "react";
import "./BrowseCategory.scss";
import { assets } from "../../assets/assets";
// import { apiGetWithToken } from "../../Service/apiService";
import { apiGet } from "../../Service/apiService";
const BrowseCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGet("/categories");
      if (response.success) {
        // console.log("Danh mục:", response.data.data.data);
        setCategories(response.data.data);
      } else {
        console.error("Lỗi lấy danh mục:", response.message);
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

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
    <div className="container" style={{ marginTop: "50px" }}>
      <h2 className="home__heading" style={{ marginLeft: "15px" }}>
        🧭 Browse Categories
      </h2>
      <div className="row">
        {categories.map((category) => (
          <div className="col-md-3" key={category.id}>
            <div className="cate-item">
              <img
                src={`${API_URL_LOCAL}/${category.image}`}
                alt=""
                className="cate-item__thumb"
                style={{ width: "40%" }}
              />
              <section className="cate-item__info">
                <h3 className="cate-item__title" style={{ fontSize: "15px" }}>
                  {category.name}
                </h3>
                <p className="cate-item__desc">{category.description}</p>
              </section>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="home__cate  row row-cols-lg-3 row-cols-sm-2">
        {categories.map((category) => (
          <div className="col" key={category.id}>
            <div className="cate-item">
              <img
                src={`${API_URL_LOCAL}/${category.image}`}
                alt=""
                className="cate-item__thumb"
              />
              <section className="cate-item__info">
                <h3 className="cate-item__title" style={{ fontSize: "15px" }}>
                  {category.name}
                </h3>
                <p className="cate-item__desc">{category.description}</p>
              </section>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default BrowseCategory;
