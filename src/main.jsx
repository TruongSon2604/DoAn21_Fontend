import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./scssFolder/theme/_dark.scss";
import "./scssFolder/theme/_light.scss";
import { ProductProvider } from "./Providerrs/ProductContext.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

createRoot(document.getElementById("root")).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter>
      <ProductProvider>
        <App />
      </ProductProvider>
    </BrowserRouter>
  </LocalizationProvider>
);
