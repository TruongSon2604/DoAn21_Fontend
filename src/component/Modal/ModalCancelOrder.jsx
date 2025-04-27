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
      title: "Do you want to cancel order?",
      showCancelButton: true,
      confirmButtonText: "Cancel",
      cancelButtonText: "Close",
    });
    if (result.isConfirmed) {
      if (!selectedReason) {
        alert("Please choose reason cancel.");
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
          alert(response.data.data);
          if (response.data.data === 1) {
            Swal.fire({
              title: "Huỷ đơn hàng thành công!",
              icon: "success",
            });
            setShow(false);
            window.location.reload();
          } else {
            Swal.fire({
              title:
                "Bạn đã thanh toán đơn hàng này không thể hủy! Xin liên hệ với chúng tôi !",
              icon: "error",
            });
          }
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
        Cancel Order
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: "13px" }}>
                Reason for Order Cancellation
              </Form.Label>
              <Form.Control
                as="select"
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                style={{ fontSize: "16px" }}
              >
                <option value="">Select a reason...</option>
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
            Close
          </Button>
          <Button
            variant="danger"
            onClick={handleSave}
            disabled={!selectedReason}
          >
            Confirm Cancellation
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCancelOrder;
