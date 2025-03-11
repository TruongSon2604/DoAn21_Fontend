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
import { apiDeleteWithToken, apiGet } from "../../../Service/apiService";
import CategoryUpdate from "../Modal/CategoryUpdate";
import CategoryAdd from "../Modal/CategoryAdd";
import { IoTrashBin } from "react-icons/io5";

// import ProductUpdate from "./Modal/ProductUpdate";

export const AdminCategory = () => {
  const [products, setCategory] = useState([]);
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const paginationModel = { page: 0, pageSize: 5 };
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const getProduct = async () => {
      const response = await apiGet("/categories");
      setCategory(response.data.data);
    };
    getProduct();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70, flex: 1 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      flex: 2,
      renderCell: (params) => (
        <img
          src={`${API_URL_LOCAL}/${params.value}`}
          alt="product"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 250, flex: 2 },
    { field: "description", headerName: "Description", width: 200, flex: 2 },
  ];

  const rowsinit = products;

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
          "/deleteMoreCategory",
          { ids: selectedIds },
          token
        );

        if (res.success) {
          MySwal.fire("Xóa danh mục thành công!", "", "success");
          setCategory((prev) =>
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
          <CategoryUpdate selectedIds={selectedIds} setCategory={setCategory} />
          <CategoryAdd selectedIds={selectedIds} setCategory={setCategory} />
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
