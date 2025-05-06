// import React, { useEffect, useState } from "react";
// import Header from "../../component/header/Header";
// import Footer from "../../component/footer/Footer";
// import { Link } from "react-router-dom";
// import { assets } from "../../assets/assets";
// import { FaUser } from "react-icons/fa";
// import { FaAddressCard } from "react-icons/fa6";
// import { FaMailBulk, FaAddressBook } from "react-icons/fa";
// import { IoIosMail } from "react-icons/io";
// import { FaPhone } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { MdDiscount } from "react-icons/md";
// import "./Profile.scss";
// import { DataGrid } from "@mui/x-data-grid";
// import Paper from "@mui/material/Paper";
// import { apiGetWithToken } from "../../Service/apiService";
// import { Button } from "react-bootstrap";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import ModalBuyedUser from "../../component/Modal/ModalBuyedUser";
// import ModalCancelOrder from "../../component/Modal/ModalCancelOrder";

// function Profile() {
//   const [orders, setOrders] = useState([]);
//   const token = localStorage.getItem("access_token");
//   const paginationModel = { page: 0, pageSize: 5 };
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleViewDetails = (order) => {
//     console.log("Xem chi tiết đơn hàng:", order);
//     // Chuyển hướng hoặc hiển thị modal tại đây
//   };
//   useEffect(() => {
//     const getProduct = async () => {
//       const response = await apiGetWithToken("/getAllOrderOfUser", token);
//       console.log("order", response.data.order);
//       setOrders(response.data.order);
//     };
//     getProduct();
//   }, []);
//   const columns = [
//     { field: "id", headerName: "ID", width: 70, flex: 1 },
//     { field: "created_at", headerName: "Order Created", width: 250, flex: 3 },
//     {
//       field: "status",
//       headerName: "Status Order",
//       width: 200,
//       flex: 2,
//       renderCell: (params) => {
//         const status = params.value;
//         let styles = {
//           color: "black",
//           backgroundColor: "transparent",
//           padding: "5px",
//           borderRadius: "5px",
//         };

//         switch (status) {
//           case "pending":
//             styles.color = "black";
//             styles.backgroundColor = "yellow";
//             break;
//           case "in_progress":
//             styles.color = "black";
//             styles.backgroundColor = "orange";
//             break;
//           case "completed":
//             styles.color = "white";
//             styles.backgroundColor = "green";
//             break;
//           case "canceled":
//             styles.color = "white";
//             styles.backgroundColor = "red";
//             break;
//           default:
//             styles.color = "black";
//             styles.backgroundColor = "lightgray";
//         }

//         return <span style={styles}>{status}</span>;
//       },
//     },
//     {
//       field: "discount_amount",
//       headerName: "Discount Amount",
//       width: 200,
//       flex: 2,
//     },
//     { field: "final_amount", headerName: "Final Amount", width: 250, flex: 2 },
//     { field: "total_amount", headerName: "Total Amount", width: 200, flex: 2 },
//     { field: "shipping_fee", headerName: "Shipping Fee", width: 200, flex: 2 },

//     {
//       field: "status_payment",
//       headerName: "Status Payment",
//       width: 200,
//       flex: 2,
//       renderCell: (params) => {
//         const status = params.value;
//         let styles = {
//           color: "black",
//           backgroundColor: "transparent",
//           padding: "5px",
//           borderRadius: "5px",
//         };

//         switch (status) {
//           case "pending":
//             styles.color = "white";
//             styles.backgroundColor = "orange";
//             break;
//           case "paid":
//             styles.color = "white";
//             styles.backgroundColor = "green";
//             break;
//           default:
//             styles.color = "black";
//             styles.backgroundColor = "lightgray";
//         }

//         return <span style={styles}>{status}</span>;
//       },
//     },
//     {
//       field: "actions",
//       headerName: "View",
//       width: 150,
//       flex: 2,
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <ModalBuyedUser id={params.row.id} created_at={params.row.ngaydat} />
//         );
//       },
//     },
//     {
//       field: "cancel",
//       headerName: "Cancel Order",
//       width: 150,
//       flex: 2,
//       sortable: false,
//       renderCell: (params) => {
//         return <ModalCancelOrder id={params.row.id} />;
//       },
//     },
//   ];
//   const rowsinit = orders;
//   const [rows, setRows] = useState(rowsinit);

//   return (
//     <>
//       <Header />

//       <div className="container">
//         <div className="profile__container">
//           <div className="row">
//             <div className="col-3">
//               <aside className="profile__sidebar">
//                 {/* profile user */}
//                 <div className="profile__user">
//                   <img
//                     className="profile__user-avatar"
//                     src={assets.avatar}
//                     alt=""
//                   />
//                   <h1 className="profile__user-name">{user.name}</h1>
//                   <p className="profile__user-desc">
//                     Registered:{" "}
//                     {new Date(user.created_at).toLocaleDateString("vi-VN", {
//                       timeZone: "Asia/Ho_Chi_Minh",
//                     })}
//                   </p>
//                 </div>

//                 {/* profile menu */}
//                 <div className="profile__menu">
//                   <h3 className="profile__menu-title">Manage Account</h3>
//                   <ul className="profile__menu-list">
//                     <li>
//                       <Link className="profile__menu-linkk">
//                         <FaUser /> Personal info
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         className="profile__menu-linkk"
//                         to={"/list-voucher"}
//                       >
//                         <MdDiscount /> List voucher
//                       </Link>
//                     </li>
//                     <li>
//                       <Link className="profile__menu-linkk" to={"/myaddress"}>
//                         <FaAddressBook />
//                         My Address
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </aside>
//             </div>
//             <div className="col-9">
//               <div className="profile__info">
//                 <h2 className="profile__info-heading">Account info</h2>
//                 <p className="profile__info-desc">
//                   Addresses, contact information and password
//                 </p>
//                 <ul className="profile__info-list">
//                   {/* email */}
//                   <li>
//                     <div className="profile__info-left">
//                       <IoIosMail size={23} />
//                     </div>
//                     <div className="profile__info-right">
//                       <h3 className="profile__info-emailhead">Email Adress</h3>
//                       <p className="profile__info-email">{user.email}</p>
//                     </div>
//                   </li>

//                   {/* phone */}
//                   {/* <li>
//                     <div className="profile__info-left">
//                       <FaPhone size={23} />
//                     </div>
//                     <div className="profile__info-right">
//                       <h3 className="profile__info-emailhead">Phone number</h3>
//                       <p className="profile__info-email">+000 11122 2345 657</p>
//                     </div>
//                   </li> */}

//                   {/* pass */}
//                   {/* <li>
//                     <div className="profile__info-left">
//                       <FaLocationDot size={23} />
//                     </div>
//                     <div className="profile__info-right">
//                       <h3 className="profile__info-emailhead">
//                         Add an address
//                       </h3>
//                       <p className="profile__info-email">
//                         Bangladesh Embassy, Washington, DC 20008
//                       </p>
//                     </div>
//                   </li> */}
//                 </ul>

//                 <h2 className="profile__info-heading">List Buyed</h2>
//                 <p className="profile__info-desc">2 items - Primary</p>
//                 <div className="">
//                   <div style={{ height: 400, width: "100%" }}>
//                     <Paper sx={{ height: 400, width: "100%" }}>
//                       <DataGrid
//                         rows={rowsinit}
//                         columns={columns}
//                         initialState={{ pagination: { paginationModel } }}
//                         pageSizeOptions={[5, 10]}
//                         // onRowClick={handleRowClick}
//                         // onRowSelectionModelChange={handleSelectionChange}
//                         sx={{
//                           border: 0,
//                           "& .MuiDataGrid-cell": { fontSize: "1.2rem" },
//                           "& .MuiDataGrid-columnHeaders": {
//                             fontSize: "1.3rem",
//                             fontWeight: "700 !important",
//                             backgroundColor: "#1976d2",
//                           },
//                           "& .MuiTablePagination-root": { fontSize: "1.1rem" },
//                         }}
//                       />
//                     </Paper>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Profile;
import React, { useEffect, useState } from "react";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FaUser } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdDiscount } from "react-icons/md";
import "./Profile.scss";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { apiGetWithToken, apiPostWithToken } from "../../Service/apiService";
import ModalBuyedUser from "../../component/Modal/ModalBuyedUser";
import ModalCancelOrder from "../../component/Modal/ModalCancelOrder";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("access_token");
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const me = await apiPostWithToken("/auth/me", {}, token);
        if (me.success) {
          setUser(me.data);
          localStorage.setItem("user", JSON.stringify(me.data));
        }
      }
    };

    const loadOrders = async () => {
      const response = await apiGetWithToken("/getAllOrderOfUser", token);
      if (response.success) {
        setOrders(response.data.order);
      }
    };

    loadUser();
    loadOrders();
  }, [token]);

  const columns = [
    { field: "id", headerName: "ID", width: 70, flex: 1 },
    {
      field: "created_at",
      headerName: "Order Created",
      width: 250,
      flex: 3,
      renderCell: (params) => {
        const date = new Date(params.value);
        return date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
      },
    },
    {
      field: "status",
      headerName: "Status Order",
      width: 200,
      flex: 2,
      renderCell: ({ value }) => {
        let styles = {
          color: "black",
          backgroundColor: "transparent",
          padding: "5px",
          borderRadius: "5px",
        };

        switch (value) {
          case "pending":
            styles = { ...styles, color: "black", backgroundColor: "yellow" };
            break;
          case "in_progress":
            styles = { ...styles, color: "black", backgroundColor: "orange" };
            break;
          case "completed":
            styles = { ...styles, color: "white", backgroundColor: "green" };
            break;
          case "canceled":
            styles = { ...styles, color: "white", backgroundColor: "red" };
            break;
          default:
            styles = { ...styles, backgroundColor: "lightgray" };
        }

        return <span style={styles}>{value}</span>;
      },
    },
    {
      field: "discount_amount",
      headerName: "Discount Amount",
      width: 200,
      flex: 2,
      renderCell: (params) => (
        <span>
          {Number(params.value).toLocaleString("vi-VN")} <sup>₫</sup>
        </span>
      ),
    },
    {
      field: "final_amount",
      headerName: "Final Amount",
      width: 250,
      flex: 2,
      renderCell: (params) => (
        <span>
          {Number(params.value).toLocaleString("vi-VN")} <sup>₫</sup>
        </span>
      ),
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      width: 200,
      flex: 2,
      renderCell: (params) => (
        <span>
          {Number(params.value).toLocaleString("vi-VN")} <sup>₫</sup>
        </span>
      ),
    },
    {
      field: "shipping_fee",
      headerName: "Shipping Fee",
      width: 200,
      flex: 2,
      renderCell: (params) => (
        <span>
          {Number(params.value).toLocaleString("vi-VN")} <sup>₫</sup>
        </span>
      ),
    },
    {
      field: "status_payment",
      headerName: "Status Payment",
      width: 200,
      flex: 2,
      renderCell: ({ value }) => {
        let styles = {
          color: "black",
          backgroundColor: "transparent",
          padding: "5px",
          borderRadius: "5px",
        };

        switch (value) {
          case "pending":
            styles = { ...styles, color: "white", backgroundColor: "orange" };
            break;
          case "paid":
            styles = { ...styles, color: "white", backgroundColor: "green" };
            break;
          default:
            styles = { ...styles, backgroundColor: "lightgray" };
        }

        return <span style={styles}>{value}</span>;
      },
    },
    {
      field: "actions",
      headerName: "View",
      width: 150,
      flex: 2,
      sortable: false,
      renderCell: (params) => (
        <ModalBuyedUser id={params.row.id} created_at={params.row.ngaydat} />
      ),
    },
    // {
    //   field: "cancel",
    //   headerName: "Cancel Order",
    //   width: 150,
    //   flex: 2,
    //   sortable: false,
    //   renderCell: (params) => <ModalCancelOrder id={params.row.id} />,
    // },
    {
      field: "cancel",
      headerName: "Cancel Order",
      width: 150,
      flex: 2,
      sortable: false,
      renderCell: (params) => {
        const isDisabled =
          params.row.status === "completed" || params.row.status === "canceled";

        return isDisabled ? (
          <span
            style={{ color: "#aaa", cursor: "not-allowed", fontSize: "10px" }}
          >
            Not cancel
          </span>
        ) : (
          <ModalCancelOrder id={params.row.id} />
        );
      },
    },
  ];

  if (!user) {
    return <p>Loading user info...</p>;
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="profile__container">
          <div className="row">
            <div className="col-3">
              <aside className="profile__sidebar">
                <div className="profile__user">
                  {/* <img
                    className="profile__user-avatar"
                    src={assets.avatar}
                    alt="avatar"
                  /> */}
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

                <div className="profile__menu">
                  <h3 className="profile__menu-title">Manage Account</h3>
                  <ul className="profile__menu-list">
                    <li>
                      <Link className="profile__menu-linkk">
                        <FaUser /> Personal info
                      </Link>
                    </li>
                    <li>
                      <Link className="profile__menu-linkk" to="/list-voucher">
                        <MdDiscount /> List voucher
                      </Link>
                    </li>
                    <li>
                      <Link className="profile__menu-linkk" to="/myaddress">
                        <FaAddressBook /> My Address
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
                  <li>
                    <div className="profile__info-left">
                      <IoIosMail size={23} />
                    </div>
                    <div className="profile__info-right">
                      <h3 className="profile__info-emailhead">Email Address</h3>
                      <p className="profile__info-email">{user.email}</p>
                    </div>
                  </li>
                </ul>

                <h2 className="profile__info-heading">List Buyed</h2>
                <p className="profile__info-desc">{orders.length} items</p>
                <div style={{ height: 400, width: "100%" }}>
                  <Paper sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={orders}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
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
      <Footer />
    </>
  );
}

export default Profile;
