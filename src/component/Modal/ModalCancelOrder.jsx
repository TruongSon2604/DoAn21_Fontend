import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { apiPostWithToken } from "../../Service/apiService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

function ModalCancelOrder({ id }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selectedReason, setSelectedReason] = useState(""); // Lý do hủy
  const MySwal = withReactContent(Swal);
  const reasons = [
    "Không còn nhu cầu",
    "Nhầm đơn",
    "Giao hàng trễ",
    "Sản phẩm không đúng mô tả",
    "Lý do khác",
  ];
  const data = { id };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    const result = await MySwal.fire({
      title: "Bạn có chắc chắn muốn huỷ đơn?",
      showCancelButton: true,
      confirmButtonText: "Hủy đơn",
      cancelButtonText: "Đóng",
    });
    if (result.isConfirmed) {
      if (!selectedReason) {
        alert("Vui lòng chọn lý do hủy.");
        return;
      }

      try {
        const value = {
          id: data.id,
          cancellation_reason: selectedReason,
        };
        console.log("value", value);
        const token = localStorage.getItem("access_token");
        const response = await apiPostWithToken(`/cancelOrder`, value, token);
        if (response.success) {
          Swal.fire({
            title: "Huỷ đơn hàng thành công!",
            icon: "success",
          });
          setShow(false);
          window.location.reload();
        } else {
          Swal.fire({
            title: "Huỷ đơn hàng thành thát bại!",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error canceling order:", error);
        alert("Lỗi khi hủy đơn hàng. Vui lòng thử lại.");
      }
    }
  };

  return (
    <>
      <Button
        variant="danger"
        onClick={handleShow}
        style={{ marginLeft: 10, marginTop: -8, height: 28 }}
      >
        Huỷ đơn
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hủy đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "13px" }}>
                Lý do hủy đơn hàng
              </Form.Label>
              <Form.Control
                as="select"
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                style={{ fontSize: "16px" }}
              >
                <option value="">Chọn lý do...</option>
                {reasons.map((reason, index) => (
                  <option
                    key={index}
                    value={reason}
                    style={{ fontSize: "16px" }}
                  >
                    {reason}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="danger"
            onClick={handleSave}
            disabled={!selectedReason}
          >
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCancelOrder;
