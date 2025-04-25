// import React, { useEffect, useState } from "react";
// import Header from "../../component/header/Header";
// import Footer from "../../component/footer/Footer";
// import BrowseProductFeature from "../../component/BrowseProduct/BrowseProductFeature";
// import FeatureProductSideBar from "../../component/FeatureProductSideBar/FeatureProductSideBar";
// import { apiGet, apiPost } from "../../Service/apiService";
// import ImageSearchScanner from "../../component/ImageSearch/ImageSearchScanner";
// import axios from "axios";
// import Swal from "sweetalert2";
// const FeatureProduct = () => {
//   const [products, setProducts] = useState([]);
//   // const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("access_token");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [lastPage, setLastPage] = useState(1);
//   const API_AI_URL = import.meta.env.VITE_AI_API_URL;
//   //
//   const fetchCategories = async (page) => {
//     const response = await apiGet(`/product2?page=${page}`);
//     if (response.success) {
//       console.log("products:", response.data.data.data);
//       setProducts(response.data.data.data);
//       setCurrentPage(response.data.data.current_page);
//       setLastPage(response.data.data.last_page);
//     } else {
//       console.error("Lỗi lấy danh mục:", response.message);
//     }
//     setLoading(false);
//   };
//   useEffect(() => {
//     fetchCategories(currentPage);
//   }, [currentPage]);

//   if (loading)
//     return (
//       <div className="browse">
//         <div className="loader">
//           <div className="crystal"></div>
//           <div className="crystal"></div>
//           <div className="crystal"></div>
//           <div className="crystal"></div>
//           <div className="crystal"></div>
//           <div className="crystal"></div>
//         </div>
//       </div>
//     );

//   function dataURLtoFile(dataurl, filename) {
//     const arr = dataurl.split(",");
//     const mimeMatch = arr[0].match(/:(.*?);/);
//     const mime = mimeMatch ? mimeMatch[1] : "";
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);

//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }

//     return new File([u8arr], filename, { type: mime });
//   }

//   // Hàm xử lý khi hoàn thành tìm kiếm bằng ảnh
//   const handleImageSearchComplete = async (imageData) => {
//     const file = dataURLtoFile(imageData, "search-image.png");
//     const formData = new FormData();
//     formData.append("file", file); // File ảnh
//     formData.append("top_k", 3); // Số lượng ảnh tương tự

//     try {
//       const response = await axios.post(
//         `${API_AI_URL}/find_similar/`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const filenames = response.data.similar_images.map((item) => item[0]);

//       const dataApi = {
//         data: filenames,
//       };
//       // console.log("datapi", dataApi);
//       const getproductFromAi = await apiPost("/findProductByImage", dataApi);
//       if (getproductFromAi.success) {
//         setProducts(getproductFromAi.data.data.data);
//         Swal.fire({
//           icon: "success",
//           text: "Find Product AI Successful!",
//         });
//       }

//       console.log("Kết quả tìm ảnh tương tự:", filenames);
//       // return response.data;
//     } catch (error) {
//       console.error("Lỗi khi gọi API tìm ảnh tương tự:", error);
//       return null;
//     }
//   };
//   return (
//     <>
//       <Header />
//       <div className="container">
//         <div className="row">
//           <div className="col-md-3">
//             <div className="ai-similar-search" style={{ marginTop: "30px" }}>
//               <ImageSearchScanner
//                 onImageSearchComplete={handleImageSearchComplete}
//               />
//             </div>
//             <FeatureProductSideBar
//               products={products}
//               setProducts={setProducts}
//             />
//           </div>

//           <div className="col-md-9">
//             {/* Browse Product  */}
//             <BrowseProductFeature
//               products={products}
//               setProducts={setProducts}
//             />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };
// export default FeatureProduct;
import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import BrowseProductFeature from "../../component/BrowseProduct/BrowseProductFeature";
import FeatureProductSideBar from "../../component/FeatureProductSideBar/FeatureProductSideBar";
import { apiGet, apiPost } from "../../Service/apiService";
import ImageSearchScanner from "../../component/ImageSearch/ImageSearchScanner";
import axios from "axios";
import Swal from "sweetalert2";
import Loading2 from "../../component/Loading/Loading2";
import Loading from "../../component/Loading/Loading";

const FeatureProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading for initial product fetch
  const [imageLoading, setImageLoading] = useState(false); // Loading for image search
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const API_AI_URL = import.meta.env.VITE_AI_API_URL;

  const fetchCategories = async (page) => {
    setLoading(true); // Start loading
    const response = await apiGet(`/product2?page=${page}`);
    if (response.success) {
      setProducts(response.data.data.data);
      setCurrentPage(response.data.data.current_page);
      setLastPage(response.data.data.last_page);
    } else {
      console.error("Lỗi lấy danh mục:", response.message);
    }
    setLoading(false); // End loading
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleImageSearchComplete = async (imageData) => {
    setImageLoading(true); // Start loading for AI search
    const file = dataURLtoFile(imageData, "search-image.png");
    const formData = new FormData();
    formData.append("file", file); // File ảnh
    formData.append("top_k", 3); // Số lượng ảnh tương tự

    try {
      const response = await axios.post(
        `${API_AI_URL}/find_similar/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const filenames = response.data.similar_images.map((item) => item[0]);

      const dataApi = {
        data: filenames,
      };

      const getproductFromAi = await apiPost("/findProductByImage", dataApi);
      if (getproductFromAi.success) {
        setProducts(getproductFromAi.data.data.data);
        Swal.fire({
          icon: "success",
          text: "Find Product AI Successful!",
        });
      }
      console.log("Kết quả tìm ảnh tương tự:", filenames);
    } catch (error) {
      console.error("Lỗi khi gọi API tìm ảnh tương tự:", error);
    } finally {
      setImageLoading(false); // End loading for AI search
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="ai-similar-search" style={{ marginTop: "30px" }}>
              <ImageSearchScanner
                onImageSearchComplete={handleImageSearchComplete}
              />
            </div>
            <FeatureProductSideBar
              products={products}
              setProducts={setProducts}
            />
          </div>

          <div className="col-md-9">
            {/* Loading for product list */}
            {loading || imageLoading ? (
              <Loading2 />
            ) : (
              <BrowseProductFeature
                products={products}
                setProducts={setProducts}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeatureProduct;
