import React, { useEffect, useState } from "react";
import "./NewsPage.scss";
import { assets } from "../../assets/assets";
// import Header from "../Admin/component/Header";
import Footer from "../../component/footer/Footer";
import "../../scssFolder/base/_base.scss";
import "../../scssFolder/base/_reset.scss";
import Header from "../../component/header/Header";
import { apiGet } from "../../Service/apiService";
import { use } from "react";
import { Link, redirect } from "react-router-dom";
const newsData = [
  {
    id: 1,
    title: "Trao hoa gửi trà - Giỏ hoa ửng hồng",
    description: "Ra mắt vào 05/03/2025",
    link: "#",
  },
  {
    id: 2,
    title: "Trà Ổi Hồng Kim Quất",
    description: "Giới thiệu ngày 28/02/2025",
    link: "#",
  },
  {
    id: 3,
    title: "Đặt trước quà 08/03 - Giỏ hoa ửng hồng",
    description: "Thông báo ngày 28/02/2025",
    link: "#",
  },
  {
    id: 4,
    title: "PhinDi Matcha Dâu và PhinDi Dừa Món Ra Mắt",
    description: "Ngày 10/02/2025",
    link: "#",
  },
  {
    id: 5,
    title:
      "Highlands Coffee VTV8 – 2, Đà Nẵng: Không gian cà phê mới bên sông Hàn",
    description: "Ngày 27/01/2025",
    link: "#",
  },
];

const NewsPage = () => {
  const [post, setPosts] = useState([]);
  const API_URL_LOCAL = import.meta.env.VITE_API_URL_LOCAL;
  const getPost = async () => {
    try {
      const response = await apiGet("/post");
      if (response.success) {
        console.log("post", response.data.data);
        setPosts(response.data.data);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewDetails = (id) => {
    console.log(id);
    // redirect(`/news/${id}`);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Header />
      <div className="news-page">
        <div className="container news-page__container">
          <div className="row">
            {post.map((news) => {
              // Chuyển đổi `created_at` sang giờ Việt Nam
              const vietnamTime = new Date(news.created_at).toLocaleString(
                "vi-VN",
                {
                  timeZone: "Asia/Ho_Chi_Minh",
                  weekday: "long", // Tùy chọn hiển thị ngày trong tuần
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: false, // Định dạng 24 giờ
                }
              );

              return (
                <div className="col-md-4" key={news.id}>
                  <Link to={`/news/${news.id}`}>
                    <div className="news-card">
                      <img
                        src={`${API_URL_LOCAL}/${news.imagePrimary}`}
                        alt={news.tittle}
                        className="news-page__img"
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="news-card__cover">
                        <p className="news-card__title">{news.tittle}</p>
                        <p className="news-card__desc">📅 {vietnamTime}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <button className="btn-news">Xem thêm</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsPage;
