import React from 'react'
import Header from '../../component/header/Header'
import Breadcrumbs from '../../component/Breadcrumbs/Breadcrumbs'
import SlideShow from '../../component/SlideShow/SlideShow'
import BrowseCategory from '../../component/BrowseCategory/BrowseCategory'
import BrowseProduct from '../../component/BrowseProduct/BrowseProduct'
import Footer from '../../component/footer/Footer'

const Grocery = () => {
  return (
    <>
    <Header />
    <div className="container">
    <Breadcrumbs/>
      <SlideShow />
      {/* Browse Category  */}
      <BrowseCategory />
      {/* Browse Product  */}
      <BrowseProduct />
    </div>
    <Footer />
  </>
  )
}

export default Grocery
