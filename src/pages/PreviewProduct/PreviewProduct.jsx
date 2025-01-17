import React from "react";

import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import "../../scssFolder/base/_base.scss";
import "../../scssFolder/base/_reset.scss";
// import Breadcrumbs from "../../component/Breadcrumbs/Breadcrumbs";
import ProductPreview from "../../component/ProductPreview/ProductPreview";
import TabProductDetail from "../../component/TabProductDetail/TabProductDetail";
// import ModalPreview from "../../component/Modal/ModalPreview";
const PreviewProduct = () => {
  return (
    <>
      <Header />
      <div className="container">
      {/* <Breadcrumbs/> */}
      <ProductPreview/>
      <TabProductDetail/>
      {/* <ModalPreview/> */}
      </div>
      <Footer />
    </>
  );
};
export default PreviewProduct;
