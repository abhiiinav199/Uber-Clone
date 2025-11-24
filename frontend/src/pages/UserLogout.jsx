import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          localStorage.removeItem("token");
          navigate("/login"); // optional redirect
        }
      } catch (err) {
        console.error("Logout failed:", err);
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default UserLogout;
