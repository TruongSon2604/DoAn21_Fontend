import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { apiGet } from "../../../Service/apiService";
import { IoIosAddCircle } from "react-icons/io";

const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
const API_URL = import.meta.env.VITE_API_URL;
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CategoryAdd({ selectedIds, setProducts }) {
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState({
    id: "",
    image: "",
    name: "",
    description: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Hiển thị ảnh xem trước
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("access_token_admin");
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      await axios.post(`${API_URL}/categories`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      // alert("Thêm danh mục thành công!");
      Swal.fire({
        icon: "success",
        title: "Thêm danh mục thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      setProductData({
        id: "",
        image: "",
        name: "",
        description: "",
      });
      setSelectedImage(null);
      setPreviewImage(null);
      // const getCategory = async () => {
      //   const response = await apiGet("/categories");

      //   setProducts(response.data.data);
      // };
      // getCategory();
      window.location.reload();
      handleClose();
    } catch (error) {
      console.error("Lỗi thêm danh mục:", error);
      alert("Thêm danh mục thất bại!");
    }
  };

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ marginLeft: 10, marginTop: -8, height: 28 }}
      >
        <IoIosAddCircle
          fontSize={15}
          style={{ marginRight: 5, marginTop: -3 }}
        />
        Thêm Danh mục
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Danh Mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <div>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="product-preview"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div></div>
                )}
              </div>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={productData.description}
                onChange={handleChange}
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

export default CategoryAdd;
