import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { apiGet } from "../../../Service/apiService";
import { IoIosAddCircle } from "react-icons/io";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdOutlineModeEdit } from "react-icons/md";

const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
const API_URL = import.meta.env.VITE_API_URL;

function PostUpdate({ selectedIds, setCategory }) {
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState({
    tittle: "",
    imagePrimary: "",
    imageSecondary: "",
    description: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage2(file);
      setPreviewImage2(URL.createObjectURL(file));
    }
  };

  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };
  const handleShow = async () => {
    if (selectedIds.length !== 1) {
      alert("Vui lòng chọn đúng 1 sản phẩm để cập nhật!");
      return;
    } else {
      const res = await apiGet(`/post/${selectedIds[0]}`);
      // alert(res.data.data.tittle);
      setProductData({
        tittle: res.data.data.tittle,
        imagePrimary: res.data.data.imagePrimary,
        imageSecondary: res.data.data.imageSecondary,
        description: res.data.data.description,
      });
    }
    setShow(true);
  };
  const handleSave = async () => {
    const token = localStorage.getItem("access_token_admin");
    const formData = new FormData();
    formData.append("tittle", productData.tittle);
    formData.append("description", productData.description);
    if (selectedImage) formData.append("imagePrimary", selectedImage);
    if (selectedImage2) formData.append("imageSecondary", selectedImage2);

    try {
      const rp = await axios.post(
        `${API_URL}/post/${selectedIds[0]}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        text: "Cập nhật bài viết thành công!",
      });
      setProductData({
        title: "",
        imagePrimary: "",
        imageSecondary: "",
        description: "",
      });
      setSelectedImage(null);
      setPreviewImage(null);
      setSelectedImage2(null);
      setPreviewImage2(null);

      const getPost = async () => {
        const response = await apiGet("/post");
        setCategory(response.data.data);
      };
      getPost();
      handleClose();
    } catch (error) {
      console.error("Lỗi thêm bài viết:", error);
      alert("Thêm bài viết thất bại!");
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
          <Modal.Title> Cập nhật Bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh chính</Form.Label>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : productData.imagePrimary ? (
                <img
                  src={`${API_URL_LOCAL}/${productData.imagePrimary}`}
                  alt="Current"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : null}
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh phụ</Form.Label>
              {previewImage2 ? (
                <img
                  src={previewImage2}
                  alt="Preview"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : productData.imageSecondary ? (
                <img
                  src={`${API_URL_LOCAL}/${productData.imageSecondary}`}
                  alt="Current"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : null}
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange2}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                name="tittle"
                value={productData.tittle}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <ReactQuill
                theme="snow"
                value={productData.description}
                onChange={(value) =>
                  setProductData((prev) => ({ ...prev, description: value }))
                }
                style={{ height: "250px", marginBottom: "50px" }}
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

export default PostUpdate;
