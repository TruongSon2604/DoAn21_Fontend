import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "../IndexAdmin.scss";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ProductUpdate from "../Modal/ProductUpdate";
import {
  apiDeleteWithToken,
  apiGet,
  apiGetWithToken,
} from "../../../Service/apiService";
import CategoryUpdate from "../Modal/CategoryUpdate";
import CategoryAdd from "../Modal/CategoryAdd";
import { IoTrashBin } from "react-icons/io5";
import CouponAdd from "../Modal/CouponAdd";
import CouponUpdate from "../Modal/CouponUpdate";

// import ProductUpdate from "./Modal/ProductUpdate";

export const AdminCoupon = () => {
  const [coupons, setCoupon] = useState([]);
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const paginationModel = { page: 0, pageSize: 5 };
  const MySwal = withReactContent(Swal);
  const token = localStorage.getItem("access_token_admin");

  useEffect(() => {
    const getProduct = async () => {
      const response = await apiGetWithToken("/coupon", token);
      // console.log("coupon111", response.data.data);
      setCoupon(response.data.data.data);
    };
    getProduct();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70, flex: 1 },
    {
      field: "code",
      headerName: "Tên mã giảm giá",
      width: 150,
      flex: 2,
    },
    {
      field: "discount_value",
      headerName: "Giá trị giảm",
      width: 250,
      flex: 2,
    },
    {
      field: "discount_type",
      headerName: "Loại giảm giá",
      width: 200,
      flex: 2,
    },
    { field: "start_date", headerName: "Ngày bắt đầu", width: 250, flex: 2 },
    { field: "end_date", headerName: "Ngày hết hạn", width: 200, flex: 2 },
    { field: "is_active", headerName: "Trạng thái", width: 200, flex: 2 },
  ];

  const rowsinit = coupons;

  const handleSelectionChange = (ids) => {
    setSelectedIds(ids);
    console.log("Selected IDs:", ids);
  };

  const [rows, setRows] = useState(rowsinit);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      MySwal.fire("Vui lòng chọn danh mục cần xóa!", "", "warning");
      return;
    }

    const result = await MySwal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("access_token_admin");
        const res = await apiDeleteWithToken(
          "/deleteMoreCoupon",
          { ids: selectedIds },
          token
        );

        if (res.success) {
          MySwal.fire("Xóa phiếu giảm giá thành công!", "", "success");
          setCoupon((prev) =>
            prev.filter((product) => !selectedIds.includes(product.id))
          );
        } else {
          MySwal.fire("Có lỗi xảy ra khi xóa!", "", "error");
        }
      } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error);
        MySwal.fire("Không thể xóa danh mục!", "", "error");
      }
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="content">
        <Header />
        <section className="dashboard">
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            style={{ marginBottom: 10 }}
          >
            {" "}
            <IoTrashBin
              fontSize={15}
              style={{ marginRight: 5, marginTop: -3 }}
            />
            Xóa đã chọn
          </Button>
          <CouponUpdate selectedIds={selectedIds} setCoupon={setCoupon} />
          <CouponAdd selectedIds={selectedIds} setCoupon={setCoupon} />
          <div style={{ height: "90%", width: "100%" }}>
            <Paper sx={{ height: "90%", width: "100%" }}>
              <DataGrid
                rowHeight={70}
                rows={rowsinit}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                // onRowClick={handleRowClick}
                onRowSelectionModelChange={handleSelectionChange}
                sx={{
                  border: 0,
                  "& .MuiDataGrid-row": {
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiDataGrid-cell": {
                    display: "flex",
                    alignItems: "center",
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
