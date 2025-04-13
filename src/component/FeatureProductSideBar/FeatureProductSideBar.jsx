import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeatureProductSideBar.scss"; // Thêm file CSS hoặc SCSS của bạn
import { apiGet, apiPost } from "../../Service/apiService"; // Giả sử bạn đang sử dụng apiService

const FeatureProductSideBar = ({ products, setProducts }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([]);
//   const [products, setProducts] = useState([]);

  useEffect(() => {
    // Lấy danh mục sản phẩm từ API
    const fetchCategories = async () => {
      const response = await apiGet("/categories");
      if (response.success) {
        console.log("Danh mục:", response.data.data);
        setCategories(response.data.data);
      } else {
        console.error("Lỗi lấy danh mục:", response.message);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // Cập nhật lựa chọn danh mục
  };

  const handlePriceChange = (e) => {
    const { value, checked } = e.target;
    setPriceRange((prevState) => {
      if (checked) {
        return [...prevState, value];
      } else {
        return prevState.filter((item) => item !== value);
      }
    });
  };

  const searchProduct = async () => {
    console.log("Category:", selectedCategory);
    console.log("Price Range:", priceRange);
    try {
      const response = await apiPost("/filterProductBySelect", {
        category_id: selectedCategory,
        price_range: priceRange,
      });

      if (response.success) {
        setProducts(response.data.data); // Cập nhật kết quả sản phẩm
      } else {
        console.error("Lỗi khi lấy sản phẩm:");
      }
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  return (
    <div className="feature-sidebar">
      <h4 className="sidebar-title">Product Categories</h4>
      {categories.map((category) => (
        <div className="sidebar-category" key={category.id}>
          <label>
            <input
              type="radio"
              name="category"
              value={category.id}
              onChange={handleCategoryChange}
              //   checked={selectedCategory === category.id}
              style={{ marginRight: "8px" }}
            />
            {category.name}
          </label>
        </div>
      ))}

      <h4 className="sidebar-title price">Price Range</h4>
      <div className="sidebar-price">
        <label>
          <input
            type="checkbox"
            name="low"
            value={1}
            onChange={handlePriceChange}
          />
          Under 100k
        </label>
      </div>
      <div className="sidebar-price">
        <label>
          <input
            type="checkbox"
            name="medium"
            value={2}
            onChange={handlePriceChange}
          />
          From 100k - 500k
        </label>
      </div>
      <div className="sidebar-price">
        <label>
          <input
            type="checkbox"
            name="high"
            value={3}
            onChange={handlePriceChange}
          />
          Above 500k
        </label>
      </div>
      <div className="coverbtn">
        <button className="btnSearch" onClick={searchProduct}>
          Search
        </button>
      </div>
{/*  */}
    </div>
  );
};

export default FeatureProductSideBar;
