import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { FaMailBulk, FaAddressBook } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import "./Profile.scss";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { apiGetWithToken } from "../../Service/apiService";
import { Button } from "react-bootstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalBuyedUser from "../../component/Modal/ModalBuyedUser";
import { FaLock } from "react-icons/fa";

function ListVoucher() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("access_token");
  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    const getProduct = async () => {
      const response = await apiGetWithToken("/getAllUserWithCoupon", token);
      //   console.log("abc: ", response.data.data);
      setOrders(response.data.data);
    };
    getProduct();
  }, []);
  const columns = [
    { field: "coupon_id", headerName: "ID", width: 70, flex: 1 },
    { field: "code", headerName: "Voucher Name", width: 250, flex: 1 },
    { field: "start_date", headerName: "Start Date", width: 70, flex: 1 },
    { field: "end_date", headerName: "End Date", width: 250, flex: 1 },

    { field: "discount_type", headerName: "Discount Type", width: 70, flex: 1 },
    {
      field: "discount_value",
      headerName: "Discount Value",
      width: 250,
      flex: 1,
    },
    {
      field: "status_voucher",
      headerName: "Status Voucher",
      renderCell: (params) => {
        const endDate = params.row.end_date; // Giả sử end_date có trong params.row
        const currentDate = new Date();
        const expiryDate = new Date(endDate); // Giả sử `end_date` là chuỗi ngày

        let styles = {
          color: "black",
          backgroundColor: "transparent",
          padding: "5px",
          borderRadius: "5px",
        };

        // Kiểm tra nếu ngày hết hạn
        if (expiryDate < currentDate) {
          styles.color = "white";
          styles.backgroundColor = "red"; // Màu đỏ cho hết hạn
          return <span style={styles}>Expired</span>;
        } else {
          styles.color = "white";
          styles.backgroundColor = "green"; // Màu xanh cho còn hạn
          return <span style={styles}>Valid</span>;
        }
      },
      width: 200,
      flex: 1,
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 250,
      flex: 1,
    },
    {
      field: "applied_at",
      headerName: "Applied At",
      renderCell: (params) => {
        const status = params.value;
        let styles = {
          color: "black",
          backgroundColor: "transparent",
          padding: "5px",
          borderRadius: "5px",
        };

        // Check if status is null or not
        if (status === null) {
          styles.color = "white";
          styles.backgroundColor = "green";
          return <span style={styles}>Not Used</span>;
        } else {
          styles.color = "black";
          styles.backgroundColor = "orange";
          return <span style={styles}>{status}</span>;
        }
      },
      width: 250,
      flex: 2,
    },
    // {
    //   field: "status",
    //   headerName: "Status Order",
    //   width: 200,
    //   flex: 2,
    //   renderCell: (params) => {
    //     const status = params.value;
    //     let styles = {
    //       color: "black",
    //       backgroundColor: "transparent",
    //       padding: "5px",
    //       borderRadius: "5px",
    //     };

    //     switch (status) {
    //       case "pending":
    //         styles.color = "black";
    //         styles.backgroundColor = "yellow";
    //         break;
    //       case "in_progress":
    //         styles.color = "black";
    //         styles.backgroundColor = "orange";
    //         break;
    //       case "paid":
    //         styles.color = "white";
    //         styles.backgroundColor = "green";
    //         break;
    //       default:
    //         styles.color = "black";
    //         styles.backgroundColor = "lightgray";
    //     }

    //     return <span style={styles}>{status}</span>;
    //   },
    // },
    // {
    //   field: "discount_amount",
    //   headerName: "Discount Amount",
    //   width: 200,
    //   flex: 2,
    // },
    // { field: "final_amount", headerName: "Final Amount", width: 250, flex: 2 },
    // { field: "total_amount", headerName: "Total Amount", width: 200, flex: 2 },
    // { field: "shipping_fee", headerName: "Shipping Fee", width: 200, flex: 2 },

    // {
    //   field: "status_payment",
    //   headerName: "Status Payment",
    //   width: 200,
    //   flex: 2,
    //   renderCell: (params) => {
    //     const status = params.value;
    //     let styles = {
    //       color: "black",
    //       backgroundColor: "transparent",
    //       padding: "5px",
    //       borderRadius: "5px",
    //     };

    //     switch (status) {
    //       case "pending":
    //         styles.color = "white";
    //         styles.backgroundColor = "orange";
    //         break;
    //       case "paid":
    //         styles.color = "white";
    //         styles.backgroundColor = "green";
    //         break;
    //       default:
    //         styles.color = "black";
    //         styles.backgroundColor = "lightgray";
    //     }

    //     return <span style={styles}>{status}</span>;
    //   },
    // },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 150,
    //   flex: 1,
    //   sortable: false,
    //   renderCell: (params) => {
    //     return <ModalBuyedUser id={params.row.id} />;
    //   },
    // },
  ];
  const rowsinit = orders;
  const [rows, setRows] = useState(rowsinit);
  const user = JSON.parse(localStorage.getItem("user"));
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;

  return (
    <>
      <Header />

      <div className="container">
        <div className="profile__container">
          <div className="row">
            <div className="col-3">
              <aside className="profile__sidebar">
                {/* profile user */}
                <div className="profile__user">
                  <img
                    className="profile__user-avatar"
                    src={
                      user.image.startsWith("http")
                        ? user.image
                        : `${API_URL_LOCAL}/${user.image}`
                    }
                    alt="avatar"
                  />
                  <h1 className="profile__user-name">{user.name}</h1>
                  <p className="profile__user-desc">
                    Registered:{" "}
                    {new Date(user.created_at).toLocaleDateString("vi-VN", {
                      timeZone: "Asia/Ho_Chi_Minh",
                    })}
                  </p>
                </div>

                {/* profile menu */}
                <div className="profile__menu">
                  <h3 className="profile__menu-title">Manage Account</h3>
                  <ul className="profile__menu-list">
                    <li>
                      <Link className="profile__menu-linkk" to={"/profile"}>
                        <FaUser /> Personal info
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="profile__menu-linkk"
                        to={"/list-voucher"}
                      >
                        <MdDiscount /> List voucher
                      </Link>
                    </li>
                    <li>
                      <Link className="profile__menu-linkk" to={"/myaddress"}>
                        <FaAddressBook />
                        My Address
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="profile__menu-linkk"
                        to={"/change-password"}
                      >
                        <FaLock />
                        Change Password
                      </Link>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
            <div className="col-9">
              <div className="profile__info">
                <h2 className="profile__info-heading">Voucher</h2>
                <p className="profile__info-desc">2 items - Primary</p>
                <div className="">
                  <div style={{ height: 400, width: "100%" }}>
                    <Paper sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={rowsinit}
                        columns={columns}
                        getRowId={(row) => row.user_coupon_id} // Use user_coupon_id as the unique identifier
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{
                          border: 0,
                          "& .MuiDataGrid-cell": { fontSize: "1.2rem" },
                          "& .MuiDataGrid-columnHeaders": {
                            fontSize: "1.3rem",
                            fontWeight: "700 !important",
                            backgroundColor: "#1976d2",
                          },
                          "& .MuiTablePagination-root": { fontSize: "1.1rem" },
                        }}
                      />
                    </Paper>
                  </div>
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

export default ListVoucher;
