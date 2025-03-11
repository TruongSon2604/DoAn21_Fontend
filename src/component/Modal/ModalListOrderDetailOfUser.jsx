import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { apiPostWithToken } from "../../Service/apiService";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ModalListOrderDetailOfUser({ id }) {
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

  //   const exportInvoice = async () => {
  //     const input = invoiceRef.current;
  //     if (!input) return;

  //     try {
  //       // Chụp toàn bộ nội dung, bao gồm cả ảnh
  //       const canvas = await html2canvas(input, {
  //         scale: 2, // Tăng độ phân giải
  //         useCORS: true, // Hỗ trợ tải ảnh từ URL bên ngoài
  //       });

  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF("p", "mm", "a4");

  //       const imgWidth = 190; // Chiều rộng ảnh trong PDF
  //       const pageHeight = 297; // Chiều cao trang A4
  //       const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //       let heightLeft = imgHeight;
  //       let position = 10;

  //       // Thêm ảnh vào trang đầu tiên
  //       pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;

  //       // Nếu nội dung dài hơn 1 trang, thêm trang mới
  //       while (heightLeft > 0) {
  //         position = heightLeft - imgHeight;
  //         pdf.addPage();
  //         pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  //         heightLeft -= pageHeight;
  //       }

  //       pdf.save(`hoa_don_${id}.pdf`);
  //     } catch (error) {
  //       console.error("Lỗi khi xuất hóa đơn:", error);
  //     }
  //   };

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
                        <td>
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
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="success" onClick={exportInvoice}>
            Xuất hóa đơn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalListOrderDetailOfUser;
