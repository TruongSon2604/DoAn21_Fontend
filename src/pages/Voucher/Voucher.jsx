// import React, { useEffect, useState } from "react";
// import Header from "../../component/header/Header";
// import Footer from "../../component/footer/Footer";
// import "../../scssFolder/base/_base.scss";
// import "../../scssFolder/base/_reset.scss";
// import "./Voucher.scss"; // Import SCSS cho Voucher
// import { assets } from "../../assets/assets";
// import { use } from "react";
// import {
//   apiGet,
//   apiGetWithToken,
//   apiPost,
//   apiPostWithToken,
// } from "../../Service/apiService";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const Voucher = () => {
//   const [coupons, setCoupons] = useState([]);
//   const token = localStorage.getItem("access_token");
//   const fetchCoupons = async () => {
//     try {
//       const response = await apiGetWithToken("/coupon2", token);
//       // console.log("Coupons: ", response.data.data);
//       setCoupons(response.data.data);
//     } catch (error) {
//       console.log("Failed to fetch coupons: ", error);
//     }
//   };
//   useEffect(() => {
//     fetchCoupons();
//   }, []);

//   const addVoucherToUser = async (id) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       const response = await apiPostWithToken(
//         `/user-coupon`,
//         {
//           user_id: user.id,
//           coupon_id: id,
//         },
//         token
//       );
//       if (response.success) {
//         Swal.fire({
//           title: "Add voucher successful!",
//           icon: "success",
//         });
//         fetchCoupons();
//         // alert("Thêm voucher thành công");
//       } else {
//         Swal.fire({
//           title: "Add voucher failed!",
//           icon: "error",
//         });
//       }
//     } catch (error) {
//       console.log("Failed to add voucher: ", error);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="voucher-container">
//         <h1>Danh Sách Voucher</h1>
//         <div className="voucher-img" style={{ marginBottom: "20px" }}>
//           <img src={assets.voucher} alt="" style={{ width: "100%" }} />
//         </div>
//         <div className="voucher-list">
//           {coupons.map((voucher) => (
//             <div key={voucher.id} className="voucher-card">
//               <div className="voucher-info">
//                 <h2>{voucher.code}</h2>
//                 <p>
//                   Loại giảm giá:{" "}
//                   {voucher.discount_type === "fixed"
//                     ? "Giảm giá cố định"
//                     : "Giảm theo phần trăm"}
//                 </p>
//                 <p>
//                   Giá trị giảm giá:{" "}
//                   {voucher.discount_type === "fixed"
//                     ? `${voucher.discount_value} VND`
//                     : `${voucher.discount_value} %`}
//                 </p>
//                 <p>Ngày bắt đầu: {voucher.start_date}</p>
//                 <p>Ngày kết thúc: {voucher.end_date}</p>
//               </div>

//               <button
//                 className={`btn btn-info btn_voucher ${
//                   voucher.status === 1 ? "btn-disabled" : ""
//                 }`}
//                 onClick={() => {
//                   if (voucher.status !== 1) addVoucherToUser(voucher.id);
//                 }}
//                 disabled={voucher.status === 1}
//               >
//                 {voucher.status === 1 ? "Voucher added" : "Add Voucher"}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Voucher;
import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import "../../scssFolder/base/_base.scss";
import "../../scssFolder/base/_reset.scss";
import "./Voucher.scss"; // Import SCSS cho Voucher
import { assets } from "../../assets/assets";
import {
  apiGetWithToken,
  apiPostWithToken,
} from "../../Service/apiService";
import Swal from "sweetalert2";

const Voucher = () => {
  const [coupons, setCoupons] = useState([]);
  const token = localStorage.getItem("access_token");
  const fetchCoupons = async () => {
    try {
      const response = await apiGetWithToken("/coupon2", token);
      setCoupons(response.data.data);
    } catch (error) {
      console.log("Failed to fetch coupons: ", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Hàm kiểm tra voucher hết hạn (so sánh end_date với ngày hiện tại)
  const isExpired = (end_date) => {
    return new Date(end_date) < new Date();
  };

  const addVoucherToUser = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await apiPostWithToken(
        `/user-coupon`,
        {
          user_id: user.id,
          coupon_id: id,
        },
        token
      );
      if (response.success) {
        Swal.fire({
          title: "Add voucher successful!",
          icon: "success",
        });
        fetchCoupons();
      } else {
        Swal.fire({
          title: "Add voucher failed!",
          icon: "error",
        });
      }
    } catch (error) {
      console.log("Failed to add voucher: ", error);
    }
  };

  return (
    <>
      <Header />
      <div className="voucher-container">
        {/* <h1 className="voucher-title">Danh Sách Voucher</h1> */}
        <div className="voucher-img" style={{ marginBottom: "20px" }}>
          <img src={assets.voucher} alt="" style={{ width: "100%" }} />
        </div>
        <div className="voucher-list">
          {coupons.map((voucher) => {
            const expired = isExpired(voucher.end_date);
            const hasAdded = voucher.status === 1;
            return (
              <div key={voucher.id} className={`voucher-card${expired ? " expired" : hasAdded ? " added" : ""}`}>
                {expired && (
                  <div className="voucher-expired-badge">
                    <span className="expired-icon">⏰</span> <span className="expired-text">ĐÃ HẾT HẠN</span>
                  </div>
                )}
                <div className="voucher-info">
                  <h2>{voucher.code}</h2>
                  <p>Loại giảm giá: {voucher.discount_type === "fixed" ? "Giảm giá cố định" : "Giảm theo phần trăm"}</p>
                  <p>Giá trị giảm giá: {voucher.discount_type === "fixed" ? `${voucher.discount_value} VND` : `${voucher.discount_value} %`}</p>
                  <p>Ngày bắt đầu: {voucher.start_date}</p>
                  <p>Ngày kết thúc: {voucher.end_date}</p>
                </div>
                <button
                  className={`btn btn-info btn_voucher ${hasAdded || expired ? "btn-disabled" : ""}`}
                  onClick={() => {
                    if (!hasAdded && !expired) addVoucherToUser(voucher.id);
                  }}
                  disabled={hasAdded || expired}
                >
                  {expired ? "Expired" : hasAdded ? "Voucher added" : "Add Voucher"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Voucher;
