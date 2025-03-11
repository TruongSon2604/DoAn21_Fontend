import { useEffect } from "react";
import { apiGet } from "../../Service/apiService";

const CheckPaymentStatus = () => {
  useEffect(() => {
    const transactionId = localStorage.getItem("transaction_id");

    if (!transactionId) return;

    const checkPayment = async () => {
      try {
        const response = await apiGet(`/payment2/status/${transactionId}`);

        if (response.success && response.data.original.data.return_code === 1) {
          clearInterval(interval);
          alert("Thanh toán thành công!");
          window.location.href = "/order-success";
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra thanh toán:", error);
      }
    };

    const interval = setInterval(checkPayment, 3000); // Kiểm tra mỗi 3 giây

    return () => clearInterval(interval); // Cleanup khi component unmount
  }, []);

  return null;
};

export default CheckPaymentStatus;
