import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import "./AdminOrder.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  apiDeleteWithToken,
  apiGetWithToken,
} from "../../../Service/apiService";
import ModalBuyedUser from "../../../component/Modal/ModalBuyedUser";
import ModalListOrderDetailOfUser from "../../../component/Modal/ModalListOrderDetailOfUser";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export const AdminOrder = () => {
  const [orders, setorders] = useState([]);
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const paginationModel = { page: 0, pageSize: 5 };
  const MySwal = withReactContent(Swal);
  const token = localStorage.getItem("access_token_admin");
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const getListOrderOfUser = async () => {
      setLoading(true); // Bắt đầu tải
      try {
        const response = await apiGetWithToken("/getOrder", token);
        setorders(response.data.data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
      setLoading(false);
    };
    getListOrderOfUser();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (filterType !== "all") {
      filtered = orders.filter((order) => {
        const orderDate = dayjs(order.created_at);

        switch (filterType) {
          case "day":
            return orderDate.isSame(selectedDate, "day");
          case "week":
            return orderDate.isSame(selectedDate, "week");
          case "month":
            return orderDate.isSame(selectedDate, "month");
          case "year":
            return orderDate.isSame(selectedDate, "year");
          case "paid":
            return order.status_payment == "paid";
          case "pending":
            return order.status_payment == "pending";
          case "cancel":
            return order.status == "canceled";
          default:
            return true;
        }
      });
    }

    setFilteredOrders(filtered);
  }, [filterType, selectedDate, orders]);

  const columns = [
    { field: "id", headerName: "ID", width: 70, flex: 1 },
    { field: "order_number", headerName: "Order Number", width: 250, flex: 2 },
    {
      field: "created_at",
      headerName: "Order Date",
      width: 150,
      flex: 1,
      renderCell: (params) => dayjs(params.value).format("DD/MM/YYYY"),
    },
    { field: "name", headerName: "User Name", width: 130, flex: 0 },
    {
      field: "image",
      headerName: "Image",
      height: 350,
      flex: 1,
      renderCell: (params) => (
        <img
          src={
            params.value.startsWith("http")
              ? params.value
              : `${API_URL_LOCAL}/${params.value}`
          }
          alt="product"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status Order",
      // width: "150",
      flex: 0,
      renderCell: (params) => {
        const status = params.value;
        let styles = {
          color: "black",
          backgroundColor: "transparent",
          borderRadius: "5px",
          padding: "4px 8px",
          fontSize: "12px",
          display: "inline-block",
          textAlign: "center",
          maxHeight: "28px",
          lineHeight: "22px",
        };

        switch (status) {
          case "pending":
            styles.color = "black";
            styles.backgroundColor = "yellow";
            break;
          case "completed":
            styles.color = "white";
            styles.backgroundColor = "green";
            break;
          case "in_progress":
            styles.color = "black";
            styles.backgroundColor = "orange";
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
      width: 100,
      flex: 0,
      renderCell: (params) => `${Number(params.value).toLocaleString()} VND`,
    },
    {
      field: "final_amount",
      headerName: "Final Amount",
      // width: 250,
      width: 130,
      flex: 0,
      renderCell: (params) => `${Number(params.value).toLocaleString()} VND`,
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      width: 130,
      flex: 0,
      renderCell: (params) => `${Number(params.value).toLocaleString()} VND`,
    },
    {
      field: "shipping_fee",
      headerName: "Shipping Fee",
      width: 130,
      flex: 1,
      renderCell: (params) => `${Number(params.value).toLocaleString()} VND`,
    },

    {
      field: "status_payment",
      headerName: "Status Payment",
      width: 200,
      flex: 1,
      renderCell: (params) => {
        const status = params.value;
        let styles = {
          color: "black",
          backgroundColor: "transparent",
          borderRadius: "5px",
          padding: "4px 8px",
          fontSize: "12px",
          display: "inline-block",
          textAlign: "center",
          maxHeight: "28px",
          lineHeight: "22px",
        };

        switch (status) {
          case "pending":
            styles.color = "black";
            styles.backgroundColor = "yellow";
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
      headerName: "Actions",
      width: 150,
      flex: 2,
      sortable: false,
      renderCell: (params) => {
        return (
          <ModalListOrderDetailOfUser
            setorders={setorders}
            id={params.row.id}
          />
        );
      },
    },
  ];
  const rowsinit = orders;

  const handleSelectionChange = (ids) => {
    setSelectedIds(ids);
  };

  const [rows, setRows] = useState(rowsinit);
  const [selectedIds, setSelectedIds] = useState([]);

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="content">
        <Header />
        <section className="dashboard">
          <div
            className="filter-container"
            style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
          >
            <TextField
              select
              label="Lọc theo"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              variant="outlined"
              size="small"
              style={{ minWidth: "150px" }}
            >
              <MenuItem value="all">Tất cả</MenuItem>
              <MenuItem value="day">Ngày</MenuItem>
              <MenuItem value="week">Tuần</MenuItem>
              <MenuItem value="month">Tháng</MenuItem>
              <MenuItem value="year">Năm</MenuItem>
              <MenuItem value="paid">Đơn hàng đã thanh toán</MenuItem>
              <MenuItem value="pending">Đơn hàng chưa thanh toán</MenuItem>
              <MenuItem value="cancel">Đơn hàng đã hủy</MenuItem>
            </TextField>

            <DatePicker
              label="Chọn ngày"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              format="DD/MM/YYYY"
              slotProps={{ textField: { size: "small" } }}
              disabled={
                filterType === "all" ||
                filterType === "paid" ||
                filterType === "cancel" ||
                filterType === "pending"
              }
            />
          </div>

          <div style={{ height: "90%", width: "100%" }}>
            <Paper sx={{ height: "90%", width: "100%" }}>
              <DataGrid
                rowHeight={70}
                // rows={rowsinit}
                rows={filteredOrders}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                onRowSelectionModelChange={handleSelectionChange}
                loading={loading}
                onRowClick={(params) => setSelectedOrder(params.row.id)}
                sx={{
                  border: 0,
                  "& .MuiDataGrid-row": {
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  },
                  "& .MuiDataGrid-cell": {
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  },
                }}
              />
            </Paper>
          </div>
        </section>
      </main>
    </div>
  );
};
