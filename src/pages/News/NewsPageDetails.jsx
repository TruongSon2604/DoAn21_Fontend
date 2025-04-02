import React, { useEffect, useState } from "react";
import "./NewsPageDetails.scss";
import { assets } from "../../assets/assets";
import Footer from "../../component/footer/Footer";
import Header from "../../component/header/Header";
import { useParams } from "react-router-dom";
import { apiGet } from "../../Service/apiService";

const NewsPageDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;

  useEffect(() => {
    // Lấy dữ liệu từ API hoặc xử lý dữ liệu với id
    const fetchNewsDetails = async () => {
      try {
        const response = await apiGet(`/post/${id}`);
        console.log("response", response.data.data);
        if (response.success) {
          setNews(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching news details", error);
      }
    };

    fetchNewsDetails();
  }, [id]);

  const vietnamTime = news
    ? new Date(news.created_at).toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        weekday: "long", // Tùy chọn hiển thị ngày trong tuần
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false, // Định dạng 24 giờ
      })
    : "";

  return (
    <>
      <Header />
      <div className="news-page">
        <div className="container news-page__container">
          <div className="row">
            <h1 className="news-detail__tittle">
              {/* TRÀ ỔI HỒNG KIM QUẤT - TƯƠI MÁT VỊ NHIỆT ĐỚI */}
              {news?.tittle}
            </h1>
            <span className="news-detail__date">📅 {vietnamTime}</span>
            <p className="news-detail__desc">
              ✨ Tháng 3 này, Highlands Coffee tự hào giới thiệu Trà Ổi Hồng Kim
              Quất - một bản giao hưởng nhiệt đới mới toanh. Thức uống này mang
              đến cảm giác tươi mới, sảng khoái với hương hoa ổi hồng ngọt ngào
              và vị chua, hương cam quýt đặc trưng của kim quất. Đây là sự kết
              hợp hoàn hảo giữa vị ngọt thanh của ổi hồng và vị chua nhẹ của kim
              quất, tạo nên một hương vị độc đáo và khó quên.
            </p>
            <img
              src={`${API_URL_LOCAL}/${news?.imageSecondary}`}
              alt=""
              className="news-detail__img"
            />
            {/* <img src={assets.social_news} alt="" className="news-detail__img" /> */}
            <p className="news-detail__desc">{news?.description}</p>
            {/* <div className="news-detail__tags">
              Tags: Highlands Coffee,Trà ổi hồng kim quất,Tươi mát vị nhiệt
              đới,Trà Trái Cây Nhiệt Đới
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsPageDetails;
