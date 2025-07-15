
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginToggle() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // تحميل حالة تسجيل الدخول من localStorage عند التحميل
  useEffect(() => {
    const loginToggle = localStorage.getItem("login");
    if (loginToggle === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    navigate("/user-login");
  };

  const handleLogout = () => {

     localStorage.clear();
 
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 160,
        height: 50,
        backgroundColor: "#f0f0f0",
        borderRadius: 30,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        marginLeft: "8px",
        padding: 2,
      }}
    >
      {!isLoggedIn ? (
        <motion.button
          className="btn"
          onClick={handleLogin}
          style={{
            fontWeight: "bold",
            color: "#000",
            outline: "none",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          تسجيل دخول
        </motion.button>
      ) : (
        <motion.button
          className="btn"
          onClick={handleLogout}
          style={{
            fontWeight: "bold",
            color: "#000",
            outline: "none",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          تسجيل خروج
        </motion.button>
      )}
    </div>
  );
}
