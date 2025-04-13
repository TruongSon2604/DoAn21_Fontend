// import React, { useState } from "react";
// import "./VideoList.scss";
// import { assets } from "../../assets/assets";

// const videos = [
//   {
//     id: 1,
//     title: "Cách nấu lẩu hải sản",
//     chef: "Chef Nguyễn Văn An",
//     duration: "10:25",
//     thumbnail: "https://source.unsplash.com/400x250/?seafood,soup",
//     youtubeId: "0jIeCAOkgcQ", // Thay bằng ID thật của YouTube
//   },
//   {
//     id: 2,
//     title: "Công thức làm sashimi cá hồi",
//     chef: "Chef Trần Minh",
//     duration: "8:15",
//     thumbnail: "https://source.unsplash.com/400x250/?sushi,salmon",
//     youtubeId: "kJQP7kiw5Fk",
//   },
//   {
//     id: 3,
//     title: "Món tôm hấp bia đơn giản",
//     chef: "Chef Lê Phương",
//     duration: "12:40",
//     thumbnail: "https://source.unsplash.com/400x250/?shrimp,dish",
//     youtubeId: "3JZ_D3ELwOQ",
//   },
// ];

// const VideoItem = ({ video, onClick }) => {
//   return (
//     <div className="video-item" onClick={() => onClick(video.youtubeId)}>
//       {/* <img src={assets.product_home} alt={video.title} className="video-thumbnail" /> */}
//       <button className="play-button">
//         <svg viewBox="0 0 24 24">
//           <path d="M7 6v12l10-6z"></path>
//         </svg>
//       </button>
//       <span className="video-duration">{video.duration}</span>
//       <h4 className="video-title">{video.title}</h4>
//       <p className="video-chef">{video.chef}</p>
//     </div>
//   );
// };

// const VideoList = () => {
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   return (
//     <div className="video-list-container">
//       <h2 className="video-list-title" style={{fontSize:'30px'}}>DISCOVER COFFEE</h2>
//       {/* <h3 className="video-list-subtitle">Video Hướng Dẫn</h3> */}
//       <p className="video-list-description">
//       Explore the recipes and processes involved in making coffee.
//       </p>

//       <div className="video-grid">
//         {videos.map((video) => (
//           <VideoItem key={video.id} video={video} onClick={setSelectedVideo} />
//         ))}
//       </div>

//       {selectedVideo && (
//         <div className="video-modal show" onClick={() => setSelectedVideo(null)}>
//           <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
//             <iframe
//               width="100%"
//               height="100%"
//               src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
//               title="YouTube video player"
//               frameBorder="0"
//               allow="autoplay; encrypted-media"
//               allowFullScreen
//             ></iframe>
//             <button className="close-button" onClick={() => setSelectedVideo(null)}>✖</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoList;
import React, { useState } from "react";
import "./VideoList.scss";
import { assets } from "../../assets/assets";

const videos = [
  {
    id: 1,
    title: "Cinematic Coffee Commercial",
    chef: "Chef Nguyễn Văn An",
    // duration: "10:25",
    youtubeId: "5JGBAoEDpLQ", // Thay bằng ID thật của YouTube
  },
  {
    id: 2,
    title: "30sec Commercial Product Video",
    chef: "Chef Trần Minh",
    // duration: "8:15",
    youtubeId: "rAoYspCdtj0",
  },
  {
    id: 3,
    title: "Satisfaction: The Art of Roasting",
    chef: "Chef Lê Phương",
    // duration: "12:40",
    youtubeId: "6oGFYEE76Ns",
  },
  {
    id: 4,
    title: "Cinematic Coffee Commercial",
    chef: "Chef Nguyễn Văn An",
    // duration: "10:25",
    youtubeId: "5JGBAoEDpLQ", // Thay bằng ID thật của YouTube
  },
  
];

const VideoItem = ({ video, onClick }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  return (
    <div className="video-item" onClick={() => onClick(video.youtubeId)}>
      <img src={thumbnailUrl} alt={video.title} className="video-thumbnail" />
      <button className="play-button">
        <svg viewBox="0 0 24 24">
          <path d="M7 6v12l10-6z"></path>
        </svg>
      </button>
      {/* <span className="video-duration">{video.duration}</span> */}
      <p className="video-title" style={{ margin: "5px",fontSize:'12px' }} >
        {video.title}
      </p>
    </div>
  );
};

const VideoList = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <>
      {/* <div className="separate"></div> */}
      <div className="video-list-container">
        <h2 className="video-list-title" style={{ fontSize: "30px" }}>
          DISCOVER COFFEE
        </h2>
        <p className="video-list-description">
          Explore the recipes and processes involved in making coffee.
        </p>

        <div className="video-grid">
          {videos.map((video) => (
            <VideoItem
              key={video.id}
              video={video}
              onClick={setSelectedVideo}
            />
          ))}
        </div>

        {selectedVideo && (
          <div
            className="video-modal show"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="video-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
              <button
                className="close-button"
                onClick={() => setSelectedVideo(null)}
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoList;
