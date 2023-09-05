import React from "react";
import {Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
    
  );
};

export default HomePage;
