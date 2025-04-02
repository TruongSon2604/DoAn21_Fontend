import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { apiGet, apiGetWithToken } from "../../../Service/apiService";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";

const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
const API_URL = import.meta.env.VITE_API_URL;
function CouponUpdate({ selectedIds, setCoupon }) {
  const [show, setShow] = useState(false);
  const [couponData, setCouponData] = useState({
    id: "",
    code: "",
    discount_type: "",
    discount_value: "",
    start_date: "",
    end_date: "",
    is_active: 1,
  });

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    alert("vao dya ");
    if (selectedIds.length !== 1) {
      alert("Vui lòng chọn đúng 1 phiếu giảm giá để cập nhật!");
      return;
    } else {
      const token = localStorage.getItem("access_token_admin");
      const res = await apiGetWithToken(`/coupon/${selectedIds[0]}`, token);
      setCouponData(res.data.data);
    }
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData({
      ...couponData,
      [name]: name === "is_active" ? (value === "1" ? 1 : 0) : value,
    });
    // setCouponData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("access_token_admin");
    const formData = new FormData();
    formData.append("code", couponData.code);
    formData.append("discount_type", couponData.discount_type);
    formData.append("discount_value", couponData.discount_value);
    formData.append("start_date", couponData.start_date);
    formData.append("end_date", couponData.end_date);
    formData.append("is_active", couponData.is_active ?? 0);
    try {
      await axios.post(`${API_URL}/coupon/${couponData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Cập nhật phiếu giảm giá thành công!");
      setCouponData({
        id: "",
        code: "",
        discount_type: "pertage",
        discount_value: "",
        start_date: "",
        end_date: "",
        is_active: 1,
      });
      const getCoupon = async () => {
        const response = await apiGetWithToken("/coupon", token);
        setCoupon(response.data.data.data);
      };
      getCoupon();
      handleClose();
    } catch (error) {
      console.error("Lỗi thêm phiếu giảm giá:", error);
      alert("Thêm phiếu giảm giá thất bại!");
    }
  };

  return (
    <>
      <Button
        variant="warning"
        onClick={handleShow}
        style={{ marginLeft: 10, marginTop: -8, height: 28 }}
      >
        <MdOutlineModeEdit
          fontSize={15}
          style={{ marginRight: 5, marginTop: -3 }}
        />
        Cập nhật
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm phiếu giảm giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={couponData.code}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Loại phiếu giảm giá</Form.Label>
              <Form.Select
                name="discount_type"
                value={couponData.discount_type}
                onChange={handleChange}
              >
                {console.log(
                  "Giá trị discount_type:",
                  couponData.discount_type
                )}
                <option value="percentage">Phần trăm (%)</option>
                <option value="fixed">Cố định (VNĐ)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giá trị giảm giá</Form.Label>
              <Form.Control
                type="number"
                name="discount_value"
                value={couponData.discount_value}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày bắt đầu</Form.Label>
              <Form.Control
                type="datetime-local"
                name="start_date"
                value={couponData.start_date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ngày kết thúc</Form.Label>
              <Form.Control
                type="datetime-local"
                name="end_date"
                value={couponData.end_date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                name="is_active"
                value={couponData.is_active}
                onChange={handleChange}
              >
                <option value="1">Hoạt động</option>
                <option value="0">Không hoạt động</option>
              </Form.Select>
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

export default CouponUpdate;
