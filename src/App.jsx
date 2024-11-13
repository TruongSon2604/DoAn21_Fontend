import React from "react";
import MapComponent from "./component/MapComponent";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home/Home";
import Demo from "./pages/Demo/Demo";
function App() {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
        
        </Routes>
      </div>
    </>
  );
}

export default App;
