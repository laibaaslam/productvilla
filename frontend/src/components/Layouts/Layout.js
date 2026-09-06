import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

// {with this we desconstructed props in Layout main will dynamically change}
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        {/* passing toaster container as per intructions */}
        <Toaster />
        {/* this will contain div's of login, regiter etc */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;