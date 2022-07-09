import HomeController from "../Screens/Home/HomeController";
import { Routes, Route } from "react-router-dom";
import LoginController from "../Screens/Login/LoginController";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginController />} />
      <Route path="/main" element={<HomeController />} />
    </Routes>
  );
};

export default routes;