import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { apiGet, apiGetWithToken } from "../../../Service/apiService";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
const API_URL = import.meta.env.VITE_API_URL;
function ProductDiscountUpdate({ selectedIds, setDiscount }) {
  const [show, setShow] = useState(false);
  // const [previewImage, setPreviewImage] = useState(null);
  const [productData, setCouponData] = useState({
    product_id: "",
    percent_discount: "",
    description: "",
    image: "",
  });

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    if (selectedIds.length !== 1) {
      alert("Vui lòng chọn đúng 1 phiếu giảm giá để cập nhật!");
      return;
    } else {
      const token = localStorage.getItem("access_token_admin");
      const res = await apiGetWithToken(`/discount/${selectedIds[0]}`, token);
      setCouponData(res.data.data);
      console.log("couponData", res.data.data);
    }
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("access_token_admin");
    const formData = new FormData();
    // formData.append("product_id", productData.id);
    formData.append("percent_discount", productData.percent_discount);
    // formData.append("description", productData.description);
    try {
      // alert(productData.id);
      await axios.post(`${API_URL}/discount/${productData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      // alert("Cập nhật phiếu giảm giá thành công!");
      Swal.fire({
        icon: "success",
        title: "Cập nhật phiếu giảm giá thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
      setCouponData({
        product_id: "",
        percent_discount: "",
        description: "",
        image: "",
      });
      const getDiscount = async () => {
        const response = await apiGet("/discount", token);
        setDiscount(response.data.data.data);
      };
      getDiscount();
      handleClose();
    } catch (error) {
      console.error("Lỗi cập nhật giảm giá:", error);
      // alert("Thêm phiếu giảm giá thất bại!");
    }
  };

  return (
    <>
      <Button
        variant="info"
        onClick={handleShow}
        style={{ marginLeft: 10, marginTop: -8, height: 28 }}
      >
        <IoIosAddCircle
          fontSize={15}
          style={{ marginRight: 5, marginTop: -3 }}
        />
        Cập nhật sản phẩm giảm giá
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Cập nhật sản phẩm giảm giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Chọn sản phẩm</Form.Label>
              <Form.Select name="product_id" value={productData.product_id}>
                <option key={productData.id} value={productData.id}>
                  {productData.name}
                  {/* <img src={`${API_URL_LOCAL}/${product.image}`} alt="" /> */}
                </option>
              </Form.Select>
              {productData.image && (
                <img
                  src={`${API_URL_LOCAL}/${productData.image}`}
                  alt="preview"
                  style={{
                    width: 60,
                    height: 60,
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                />
              )}
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={productData.description}
                onChange={handleChange}
              />
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>Phần trăm giảm</Form.Label>
              <Form.Control
                type="number"
                name="percent_discount"
                value={productData.percent_discount}
                onChange={handleChange}
                min="1"
                max="99"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductDiscountUpdate;
