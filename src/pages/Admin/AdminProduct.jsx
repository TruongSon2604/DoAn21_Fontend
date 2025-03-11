import React, { useEffect, useState } from "react";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { IoTrashBin } from "react-icons/io5";
import "./IndexAdmin.scss";
import {
  apiDeleteWithToken,
  apiGet,
  apiPostWithToken,
} from "../../Service/apiService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ProductUpdate from "./Modal/ProductUpdate";
import ProductAdd from "./Modal/ProductAdd";

export const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const paginationModel = { page: 0, pageSize: 5 };
  const MySwal = withReactContent(Swal);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getProduct = async () => {
  //     const response = await apiGet("/product");
  //     console.log("data", response.data.data);
  //     setProducts(response.data.data);
  //     console.log("product", products);
  //   };
  //   getProduct();
  // }, []);
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true); // Bắt đầu tải
      try {
        const response = await apiGet("/product");
        setProducts(response.data.data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
      setLoading(false); // Kết thúc tải
    };
    getProduct();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70, flex: 1 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      flex: 1,
      renderCell: (params) => (
        <img
          src={`${API_URL_LOCAL}/${params.value}`}
          alt="product"
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ),
    },
    { field: "name", headerName: "Product Name", width: 250, flex: 2 },
    {
      field: "stock_quantity",
      headerName: "Stock Quantity",
      type: "number",
      width: 130,
      flex: 1,
    },
    { field: "description", headerName: "Description", width: 200, flex: 2 },
    {
      field: "original_price",
      headerName: "Original Price",
      width: 130,
      flex: 1,
    },
    {
      field: "discount_percent",
      headerName: "Discount (%)",
      width: 130,
      flex: 1,
    },
    {
      field: "discounted_price",
      headerName: "Discounted Price",
      width: 130,
      flex: 1,
    },
  ];

  const rowsinit = products;

  // const handleRowClick = (params) => {
  //   alert(`Selected ID: ${params.id}`);
  // };
  const handleSelectionChange = (ids) => {
    setSelectedIds(ids);
    console.log("Selected IDs:", ids);
  };

  const [rows, setRows] = useState(rowsinit);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      MySwal.fire("Vui lòng chọn sản phẩm cần xóa!", "", "warning");
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
          "/deleteMoreProduct",
          { ids: selectedIds },
          token
        );

        if (res.success) {
          MySwal.fire("Xóa sản phẩm thành công!", "", "success");
          setProducts((prev) =>
            prev.filter((product) => !selectedIds.includes(product.id))
          );
        } else {
          MySwal.fire("Có lỗi xảy ra khi xóa!", "", "error");
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        MySwal.fire("Không thể xóa sản phẩm!", "", "error");
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
            <IoTrashBin
              fontSize={15}
              style={{ marginRight: 5, marginTop: -3 }}
            />
            Xóa đã chọn
          </Button>
          <ProductUpdate selectedIds={selectedIds} setProducts={setProducts} />
          <ProductAdd selectedIds={selectedIds} setProducts={setProducts} />
          <div style={{ height: "90%", width: "100%" }}>
            <Paper sx={{ height: "90%", width: "100%" }}>
              {/* <DataGrid
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
              /> */}
              <DataGrid
                rowHeight={70}
                rows={rowsinit}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                loading={loading}
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
