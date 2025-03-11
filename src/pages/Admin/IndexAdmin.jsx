import React from "react";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import "./IndexAdmin.scss";


export const IndexAdmin = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="content">
        <Header />
        <section className="dashboard">
          <h1>Index admin</h1>
        </section>
      </main>
    </div>
  );
};
