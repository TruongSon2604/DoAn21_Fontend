import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();
  

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("access_token");
    const userData = queryParams.get("user");

    if (accessToken && userData) {
      // Lưu access_token vào localStorage
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user", userData);
      const expiresAt = Date.now() + 60 * 60 * 1000;
      localStorage.setItem("expires_at", expiresAt.toString());

      // Chuyển hướng đến trang chính
      navigate("/");
    } else {
      console.error("Lỗi: Không có access_token!");
      navigate("/sign-in");
    }
  }, [navigate]);

  return <div>Đang xác thực...</div>;
};

export default AuthCallback;
