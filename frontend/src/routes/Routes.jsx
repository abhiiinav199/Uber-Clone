import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import UserSignup from "../pages/UserSignup";
import UserLogin from "../pages/UserLogin";
import CaptainSignUp from "../pages/CaptainSignUp";
import CaptainLogin from "../pages/CaptainLogin";


const Routing = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<UserSignup />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/captain-signup" element={<CaptainSignUp />} />
                <Route path="/captain-login" element={<CaptainLogin />} />
            </Routes>
        </div>
    )
}

export default Routing
