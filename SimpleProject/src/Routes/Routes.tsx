import React from "react";
import HomeController from "../Screens/Home/HomeController";
import DetailController from "../Screens/Detail/DetailController";
import { Routes, Route } from "react-router-dom";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeController />} />
      <Route path="detail">
        <Route path=":infoID" element={<DetailController />} />
        <Route path="add" element={<DetailController />} />
      </Route>
    </Routes>
  );
};

export default routes;
