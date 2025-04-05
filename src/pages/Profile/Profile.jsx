import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { FaMailBulk } from "react-icons/fa";
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
import ModalCancelOrder from "../../component/Modal/ModalCancelOrder";

function Profile() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("access_token");
  const paginationModel = { page: 0, pageSize: 5 };

  const handleViewDetails = (order) => {
    console.log("Xem chi tiết đơn hàng:", order);
    // Chuyển hướng hoặc hiển thị modal tại đây
  };
  useEffect(() => {
    const getProduct = async () => {
      const response = await apiGetWithToken("/getAllOrderOfUser", token);
      console.log("order", response.data.order);
      setOrders(response.data.order);
    };
    getProduct();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70, flex: 1 },
    { field: "created_at", headerName: "Order Created", width: 250, flex: 3 },
    {
      field: "status",
      headerName: "Status Order",
      width: 200,
      flex: 2,
      renderCell: (params) => {
        const status = params.value;
        let styles = {
          color: "black",
          backgroundColor: "transparent",
          padding: "5px",
          borderRadius: "5px",
        };

        switch (status) {
          case "pending":
            styles.color = "black";
            styles.backgroundColor = "yellow";
            break;
          case "in_progress":
            styles.color = "black";
            styles.backgroundColor = "orange";
            break;
          case "completed":
            styles.color = "white";
            styles.backgroundColor = "green";
            break;
          case "canceled":
            styles.color = "white";
            styles.backgroundColor = "red";
            break;
          default:
            styles.color = "black";
            styles.backgroundColor = "lightgray";
        }

        return <span style={styles}>{status}</span>;
      },
    },
    {
      field: "discount_amount",
      headerName: "Discount Amount",
      width: 200,
      flex: 2,
    },
    { field: "final_amount", headerName: "Final Amount", width: 250, flex: 2 },
    { field: "total_amount", headerName: "Total Amount", width: 200, flex: 2 },
    { field: "shipping_fee", headerName: "Shipping Fee", width: 200, flex: 2 },

    {
      field: "status_payment",
      headerName: "Status Payment",
      width: 200,
      flex: 2,
      renderCell: (params) => {
        const status = params.value;
        let styles = {
          color: "black",
          backgroundColor: "transparent",
          padding: "5px",
          borderRadius: "5px",
        };

        switch (status) {
          case "pending":
            styles.color = "white";
            styles.backgroundColor = "orange";
            break;
          case "paid":
            styles.color = "white";
            styles.backgroundColor = "green";
            break;
          default:
            styles.color = "black";
            styles.backgroundColor = "lightgray";
        }

        return <span style={styles}>{status}</span>;
      },
    },
    {
      field: "actions",
      headerName: "View",
      width: 150,
      flex: 2,
      sortable: false,
      renderCell: (params) => {
        return (
          <ModalBuyedUser id={params.row.id} created_at={params.row.ngaydat} />
        );
      },
    },
    {
      field: "cancel",
      headerName: "Cancel Order",
      width: 150,
      flex: 2,
      sortable: false,
      renderCell: (params) => {
        return <ModalCancelOrder id={params.row.id} />;
      },
    },
  ];
  const rowsinit = orders;
  const [rows, setRows] = useState(rowsinit);

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
                    src={assets.avatar}
                    alt=""
                  />
                  <h1 className="profile__user-name">TRƯƠNG NGOC SƠN</h1>
                  <p className="profile__user-desc">
                    Registered: 17th May 2022
                  </p>
                </div>

                {/* profile menu */}
                <div className="profile__menu">
                  <h3 className="profile__menu-title">Manage Account</h3>
                  <ul className="profile__menu-list">
                    <li>
                      <Link className="profile__menu-linkk">
                        <FaUser /> Personal info
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="profile__menu-linkk"
                        to={"/list-voucher"}
                      >
                        <FaAddressCard /> List voucher
                      </Link>
                    </li>
                    <li>
                      <Link className="profile__menu-linkk">
                        <FaMailBulk />
                        Communications & privacy
                      </Link>
                    </li>
                  </ul>
                </div>

              </aside>
            </div>
            <div className="col-9">
              <div className="profile__info">
                <h2 className="profile__info-heading">Account info</h2>
                <p className="profile__info-desc">
                  Addresses, contact information and password
                </p>
                <ul className="profile__info-list">
                  {/* email */}
                  <li>
                    <div className="profile__info-left">
                      <IoIosMail size={23} />
                    </div>
                    <div className="profile__info-right">
                      <h3 className="profile__info-emailhead">Email Adress</h3>
                      <p className="profile__info-email">
                        truongngocson26042003@gmail.com
                      </p>
                    </div>
                  </li>

                  {/* phone */}
                  <li>
                    <div className="profile__info-left">
                      <FaPhone size={23} />
                    </div>
                    <div className="profile__info-right">
                      <h3 className="profile__info-emailhead">Phone number</h3>
                      <p className="profile__info-email">+000 11122 2345 657</p>
                    </div>
                  </li>

                  {/* pass */}
                  <li>
                    <div className="profile__info-left">
                      <FaLocationDot size={23} />
                    </div>
                    <div className="profile__info-right">
                      <h3 className="profile__info-emailhead">
                        Add an address
                      </h3>
                      <p className="profile__info-email">
                        Bangladesh Embassy, Washington, DC 20008
                      </p>
                    </div>
                  </li>
                </ul>

                <h2 className="profile__info-heading">List Buyed</h2>
                <p className="profile__info-desc">2 items - Primary</p>
                <div className="">
                  <div style={{ height: 400, width: "100%" }}>
                    <Paper sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={rowsinit}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        // onRowClick={handleRowClick}
                        // onRowSelectionModelChange={handleSelectionChange}
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

export default Profile;
