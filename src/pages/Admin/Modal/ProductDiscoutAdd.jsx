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

function ProductDiscoutAdd({ selectedIds, setDiscount }) {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    product_id: "",
    percent_discount: "",
    description: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      const response = await apiGet("/getProductNotDiscounted");
      setProducts(response.data.data);
    };
    getProduct();
  }, []);

  const [previewImage, setPreviewImage] = useState(null);
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
    formData.append("product_id", productData.product_id);
    formData.append("percent_discount", productData.percent_discount);
    formData.append("description", productData.description);

    try {
      await axios.post(`${API_URL}/discount`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      // alert("Thêm danh mục thành công!");
      Swal.fire({
        icon: "success",
        title: "Thêm sản phẩm giảm giá thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      setProductData({
        product_id: "",
        percent_discount: "",
        description: "",
      });
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
        Thêm Sản phẩm giảm giá
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Sản phẩm giảm giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Chọn sản phẩm</Form.Label>
              <Form.Select
                name="product_id"
                value={productData.product_id}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  alert(selectedId);
                  const selectedProduct = products.find(
                    (p) => p.id == selectedId
                  );
                  setProductData((prev) => ({
                    ...prev,
                    product_id: selectedId,
                  }));
                  setPreviewImage(selectedProduct?.image); // Set ảnh preview
                }}
              >
                <option value="">-- Chọn sản phẩm --</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                    {/* <img src={`${API_URL_LOCAL}/${product.image}`} alt="" /> */}
                  </option>
                ))}
              </Form.Select>
              {previewImage && (
                <img
                  src={`${API_URL_LOCAL}/${previewImage}`}
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

export default ProductDiscoutAdd;
