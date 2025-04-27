import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { apiGetWithToken, apiPostWithToken } from "../../Service/apiService";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function ModalListOrderDetailOfUser({ id, setorders }) {
  const [show, setShow] = useState(false);
  const [products, setProduct] = useState(null);
  const token = localStorage.getItem("access_token_admin");
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const invoiceRef = useRef(); // Thẻ chứa nội dung hóa đơn

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    try {
      const response = await apiPostWithToken(
        `/getOrderDetailOfUser`,
        { id },
        token
      );
      setProduct(response.data?.data || []);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setProduct(null);
    }
  };

  const acceptOrder = async () => {
    if (!products || products.length === 0 || !products[0]?.id) {
      console.error("Lỗi: Không tìm thấy orderId hợp lệ");
      return;
    }

    try {
      console.log("Gửi dữ liệu:", {
        orderId: products[0].id,
        status: "completed",
      });

      const response = await apiPostWithToken(
        "/updateOrderStatus",
        { orderId: products[0].order_id, status: "completed" },
        token
      );

      if (response.success) {
        const response = await apiGetWithToken("/getOrder", token);
        setorders(response.data.data);
        Swal.fire({
          title: "Cập nhật trạng thái đơn hàng thành công!",
          icon: "success",
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  const exportInvoice = async () => {
    const input = invoiceRef.current;
    if (!input) return;

    const images = input.querySelectorAll("img");
    images.forEach((img) => (img.style.display = "none"));

    const canvas = await html2canvas(input);

    images.forEach((img) => (img.style.display = "block"));

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`hoa_don_${id}.pdf`);
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
          {products && products.length > 0 ? (
            <div ref={invoiceRef}>
              <tr colSpan={2}>
                <p style={{ padding: "10px" }}>
                  <strong style={{ color: "red", fontWeight: "700" }}>
                    Tên khách hàng:
                  </strong>{" "}
                  {products[0].user_name}
                </p>
                <p style={{ minWidth: "350px", padding: "10px" }}>
                  <strong style={{ color: "red", fontWeight: "700" }}>
                    Email:
                  </strong>{" "}
                  {products[0].email}
                </p>
                <p style={{ minWidth: "350px", padding: "10px" }}>
                  <strong style={{ color: "red", fontWeight: "700" }}>
                    Phone:
                  </strong>{" "}
                  {products[0].phone}
                </p>
                <p style={{ minWidth: "350px", padding: "10px" }}>
                  <strong style={{ color: "red", fontWeight: "700" }}>
                    Address:
                  </strong>{" "}
                  {products[0].address_detail},{products[0].district},
                  {products[0].ward},{products[0].provice}.
                </p>
                <p style={{ minWidth: "350px", padding: "10px" }}>
                  <strong style={{ color: "red", fontWeight: "700" }}>
                    Tổng tiền đơn hàng:
                  </strong>{" "}
                  {parseInt(products[0].total_amount).toLocaleString()} VND
                </p>
                <p style={{ minWidth: "350px", padding: "10px" }}>
                  <strong style={{ color: "red", fontWeight: "700" }}>
                    Tiền vận chuyển:
                  </strong>{" "}
                  {parseInt(products[0].shipping_fee).toLocaleString()} VND
                </p>
                <p style={{ minWidth: "350px", padding: "10px" }}>
                  <strong style={{ color: "red", fontWeight: "700" }}>
                    Tổng tiền:
                  </strong>{" "}
                  {parseInt(products[0].final_amount).toLocaleString()} VND
                </p>

                
              </tr>
              <br />
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
                          <span>Tên sản phẩm</span>
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
                          {parseInt(product.original_price).toLocaleString()}{" "}
                          VND
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
                          VND
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Tổng tiền</strong>
                        </td>
                        <td>
                          <strong>
                            {parseInt(product.sub_total).toLocaleString()} VND
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2}>
                          <hr />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>Đang tải dữ liệu...</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="success" onClick={exportInvoice}>
            Xuất hóa đơn
          </Button>
          <Button variant="primary" onClick={acceptOrder}>
            Cập nhật trạng thái đơn hàng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalListOrderDetailOfUser;
