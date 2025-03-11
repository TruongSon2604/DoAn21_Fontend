import React, { createContext, useState } from "react";

// Tạo Context
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
     const [selectedProducts, setSelectedProducts] = useState([]);
     const [products, setProducts] = useState([]);
     const token = localStorage.getItem("access_token");
  return (
    <ProductContext.Provider value={{ selectedProducts, setSelectedProducts,products,setProducts,token }}>
      {children}
    </ProductContext.Provider>
  );
};
