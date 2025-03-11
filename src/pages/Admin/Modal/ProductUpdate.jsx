import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { apiGet } from "../../../Service/apiService";
import { MdOutlineModeEdit } from "react-icons/md";

const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
const API_URL = import.meta.env.VITE_API_URL;
function ProductUpdate({ selectedIds, setProducts }) {
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState({
    id: "",
    image: "",
    name: "",
    stock_quantity: "",
    description: "",
    price: "",
    discount_percent: "",
    discounted_price: "",
    categories_id: "",
  });
  const [category, setCategories] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Hiển thị ảnh xem trước
    }
  };

  const fetchProduct = async (id) => {
    try {
      const response = await apiGet(`${API_URL_LOCAL}/product/${id}`);

      setProductData(response.data); // Cập nhật state với dữ liệu nhận từ API
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
      alert("Không thể tải dữ liệu sản phẩm!");
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = async () => {
    if (selectedIds.length !== 1) {
      alert("Vui lòng chọn đúng 1 sản phẩm để cập nhật!");
      return;
    } else {
      const res = await apiGet(`/product/${selectedIds[0]}`);
      const responseCate = await apiGet(`/categories`);
      setCategories(responseCate.data.data);
      setProductData(res.data.data);
    }
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
    formData.append("stock_quantity", productData.stock_quantity);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("categories_id", productData.categories_id);

    if (selectedImage) {
      formData.append("image", selectedImage); // Thêm file ảnh vào FormData
    }

    try {
      await axios.post(`${API_URL}/product/${productData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Cập nhật sản phẩm thành công!");
      const getProduct = async () => {
        const response = await apiGet("/product");
        setProducts(response.data.data);
      };
      getProduct();
      handleClose();
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      alert("Cập nhật sản phẩm thất bại!");
    }
  };

  return (
    <>
      <Button
        variant="warning"
        onClick={handleShow}
        style={{ marginLeft: 10, marginTop: -8, height: 28 }}
      >
        <MdOutlineModeEdit fontSize={15} style={{marginRight:5,marginTop:-3}}/>
        Cập nhật
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ID sản phẩm</Form.Label>
              <Form.Control type="text" value={productData.id} readOnly />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <img
                src={`${API_URL_LOCAL}/${productData.image}`}
                alt="product"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <Form.Control
                type="text"
                name="image"
                value={productData.image}
                onChange={handleChange}
              />
            </Form.Group> */}
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
                  <img
                    src={`${API_URL_LOCAL}/${productData.image}`}
                    alt="product"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}
              </div>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số lượng tồn kho</Form.Label>
              <Form.Control
                type="number"
                name="stock_quantity"
                value={productData.stock_quantity}
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

            <Form.Group className="mb-3">
              <Form.Label>Giá gốc</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Danh mục</Form.Label>
              <Form.Select
                name="categories_id"
                value={productData.categories_id} // Lấy từ state
                onChange={handleChange} // Cập nhật khi chọn danh mục mới
              >
                <option value="">Chọn danh mục</option>
                {category.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
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

export default ProductUpdate;
