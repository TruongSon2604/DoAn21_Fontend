import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";



export const apiPost = async (url, data, headers = {}) => {
  try {
    const response = await axios.post(`${API_URL}${url}`, data, { headers });
    return { success: true, data: response.data };
  } catch (error) {
    console.error("API Error: ", error);
    return {
      success: false,
      message: error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
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
      message: error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
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
      message: error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
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
      message: error.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.",
    };
  }
};