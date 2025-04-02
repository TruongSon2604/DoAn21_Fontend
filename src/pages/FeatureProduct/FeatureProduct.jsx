import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import BrowseProductFeature from "../../component/BrowseProduct/BrowseProductFeature";
import FeatureProductSideBar from "../../component/FeatureProductSideBar/FeatureProductSideBar";
import { apiGet } from "../../Service/apiService";
const FeatureProduct = () => {
  const [products, setProducts] = useState([]);
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access_token");
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  //
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
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <FeatureProductSideBar products={products} setProducts={setProducts} />
          </div>

          <div className="col-md-9">
            {/* Browse Product  */}
            <BrowseProductFeature products={products} setProducts={setProducts} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default FeatureProduct;
