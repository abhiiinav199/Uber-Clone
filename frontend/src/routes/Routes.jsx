import { Routes, Route } from "react-router-dom";
import Start from "../pages/First";
import UserSignup from "../pages/UserSignup";
import UserLogin from "../pages/UserLogin";
import CaptainSignUp from "../pages/CaptainSignUp";
import CaptainLogin from "../pages/CaptainLogin";
import Home from "../pages/Home";
import UserProtectedWrapper from "../pages/UserProtectedWrapper";
import UserLogout from "../pages/UserLogout";
import CaptainHome from "../pages/CaptainHome";
import CaptainProtectedWrapper from "../pages/CaptainProtectedWrapper";
import CaptainLogout from "../pages/CaptainLogout";
import Riding from "../pages/Riding";
import CaptainRiding from "../pages/CaptainRiding";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectedWrapper>  
              <UserLogout />
            </UserProtectedWrapper>
          }
        />
        <Route path="/riding" element={<Riding />} />

        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />

        <Route
          path="/captain/home"
          element={
            <CaptainProtectedWrapper>

                <CaptainHome />
            </CaptainProtectedWrapper>
          }
        />

        <Route
          path="/captain/logout"
          element={
            <CaptainProtectedWrapper>
              <CaptainLogout />
            </CaptainProtectedWrapper>
          }
        />
        <Route
          path="/captain-riding"
          element={
            <CaptainProtectedWrapper>
              <CaptainRiding />
            </CaptainProtectedWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default Routing;
