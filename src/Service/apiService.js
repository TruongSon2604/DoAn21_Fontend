import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
// alert(API_URL);

export const apiPost = async (url, data, headers = {}) => {
  try {
    const response = await axios.post(`${API_URL}${url}`, data, { headers });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("API Error: ", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
    };
  }
};

export const apiGet = async (url, headers = {}) => {
  try {
    const response = await axios.get(`${API_URL}${url}`, { headers });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("API Error: ", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
    };
  }
};

export const apiPostWithToken = async (url, data, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${API_URL}${url}`, data, { headers });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("API Error: ", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
      status: error.response?.status,
      error: error.response.data,
    };
  }
};

export const apiGetWithToken = async (url, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${API_URL}${url}`, { headers });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("API Error: ", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
    };
  }
};

export const apiDeleteWithToken = async (url, data, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(`${API_URL}${url}`, {
      headers,
      data, // Gửi dữ liệu nếu cần (đặc biệt khi xóa nhiều sản phẩm)
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error("API Error: ", error);
    return {
      success: false,
      message:
        error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
    };
  }
};
