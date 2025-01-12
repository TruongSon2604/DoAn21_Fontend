import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.scss';

const Breadcrumbs = () => {
  const location = useLocation();
  console.log(location);

  let currentLink = '';
  const crumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;
      const isActive = location.pathname === currentLink; // Kiểm tra xem có phải trang hiện tại không
      return (
        <div className="crumb" key={currentLink}>
          <Link
            to={currentLink}
            className={isActive ? 'active' : ''} // Thêm class 'active' nếu đúng trang hiện tại
          >
            {crumb}
          </Link>
        </div>
      );
    });

  return <div className="bread-crumbs">{crumbs}</div>;
};

export default Breadcrumbs;
