import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSadTear } from "react-icons/fa";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="not-found-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="error-code"
      >
        404
      </motion.div>

      <motion.div
        initial={{ y: -10 }}
        animate={{ y: 10 }}
        transition={{ yoyo: Infinity, duration: 1 }}
        className="error-icon"
      >
        <FaSadTear size={80} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="error-text"
      >
        Oops! Trang bạn đang tìm kiếm không tồn tại.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Link to="/sign-in" className="back-home">
          Quay lại trang chủ
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
