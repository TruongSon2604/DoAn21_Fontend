import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FaUser } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import "./MyAddress.scss";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { apiDeleteWithToken, apiGetWithToken } from "../../Service/apiService";
import ModalPreview from "../../component/Modal/ModalPreview";
import { Button } from "react-bootstrap";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaLock } from "react-icons/fa";

function MyAddress() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("access_token");
  const paginationModel = { page: 0, pageSize: 5 };
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const user = JSON.parse(localStorage.getItem("user"));
  const getProduct = async () => {
    const response = await apiGetWithToken("/getAddressByUser", token);
    setOrders(response.data.data);
  };
  const deleteAddress = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token2 = localStorage.getItem("access_token");
        const response = await apiDeleteWithToken(`/address/${id}`, {}, token2);
        if (response.success) {
          getProduct();
        } else {
          alert("Delete failed");
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  useEffect(() => {
    getProduct();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70, flex: 0.5 },
    { field: "ward", headerName: "Ward", width: 250, flex: 1 },
    { field: "district", headerName: "District", width: 70, flex: 1 },
    { field: "provice", headerName: "Provice", width: 250, flex: 1 },
    {
      field: "address_detail",
      headerName: "Address Detail",
      width: 70,
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 250,
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <RiDeleteBin6Fill
            id={params.row.id}
            color="red"
            fontSize={18}
            style={{ cursor: "pointer" }}
            onClick={() => {
              deleteAddress(params.row.id);
            }}
          />
        );
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
                <h2 className="profile__info-heading">My Adress</h2>
                {/* <p className="profile__info-desc">2 items - Primary</p> */}
                <div className="profile__table-container">
                  <ModalPreview handleReload={getProduct} />
                  <div style={{ height: 400, width: "100%" }}>
                    <Paper sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={rowsinit}
                        columns={columns}
                        getRowId={(row) => row.id} // Use user_coupon_id as the unique identifier
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

export default MyAddress;
