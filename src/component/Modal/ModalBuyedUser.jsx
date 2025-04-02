import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Image } from "react-bootstrap";
import { apiPostWithToken } from "../../Service/apiService";
import { Link } from "react-router-dom";

function ModalBuyedUser({ id, created_at }) {
  const [show, setShow] = useState(false);
  const [products, setProduct] = useState(null);
  const token = localStorage.getItem("access_token");
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);

    try {
      const data = { id };
      const response = await apiPostWithToken(
        `/getOrderDetailOfUser`,
        data,
        token
      );
      if (response.data?.data) {
        setProduct(response.data.data);
        console.log("rp1,", response.data.data);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setProduct(null);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Xem chi tiết
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết sản phẩm đã mua</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={{ color: "red" }}>{created_at}</span>
          {products && products.length > 0 ? (
            <Table bordered responsive>
              <tbody>
                {products.map((product, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td colSpan={2} className="text-center">
                        <img
                          src={`${API_URL_LOCAL}/${product.image}`}
                          style={{ width: "150px", height: "150px" }}
                          alt=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "30%" }}>
                        <strong>Tên sản phẩm</strong>
                      </td>
                      <td>{product.name}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Mô tả</strong>
                      </td>
                      <td>{product.description}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Số lượng</strong>
                      </td>
                      <td>{product.quantity}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Giá gốc</strong>
                      </td>
                      <td>
                        {parseInt(product.original_price).toLocaleString()} VNĐ
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Giảm giá</strong>
                      </td>
                      <td>{product.discount_percent}%</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Giá sau giảm</strong>
                      </td>
                      <td>
                        {parseInt(product.discounted_price).toLocaleString()}{" "}
                        VNĐ
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tổng tiền</strong>
                      </td>
                      <td>
                        <strong>
                          {parseInt(product.sub_total).toLocaleString()} VNĐ
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        {product.id && (
                          <Link to={`/preview-product/${product.id}`}>
                            <button className="btn btn-info">Comment</button>
                          </Link>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <hr /> {/* Dòng phân cách giữa các sản phẩm */}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBuyedUser;
