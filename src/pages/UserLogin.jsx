
import instacAxios from '.././components/Axios/Axios';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { motion } from "framer-motion";
import HeaderTwo from "../components/HeaderTwo";

const UserLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null); // ✅ Added missing state
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedName = localStorage.getItem("name");

    if (savedEmail) {
      setUserEmail(savedEmail);
    }
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await instacAxios.post("/api/auth/login", credentials);
      const { accessToken, _id, success ,userName }= response.data;

      if (success && accessToken) {
        window.localStorage.setItem("token", accessToken);
        window.localStorage.setItem("email", credentials.email);
        window.localStorage.setItem("id", credentials._id || "5656506566048889" ); // Save the name to local storage
        window.localStorage.setItem("login", "true");
        // window.localStorage.setItem("name",credentials.userName ||"user")
        window.localStorage.setItem("name",userName ||"user")
        window.localStorage.setItem("name", response.data.user.email || "مستخدم");
        setUserEmail(credentials.email);
        // setUserName(userName); // 👈 خزن الاسم في الواجهة أيضًا
        setSuccess(true);
        console.log("تم تسجيل الدخول بنجاح");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("حدث خطأ أثناء محاولة تسجيل الدخول");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/user-signup");
    }, 800);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("login");

    setUserEmail(null);
    setUserName(null); // ✅ Now this is defined
    navigate("/");
  };

    const handleSinUpClick = () => {
    setIsTransitioning(true);
  navigate('/user-signup');
  };

  return (
    <div>
      <HeaderTwo links={[{ label: 'الصفحة الرئيسية', href: '/' }, { label: 'تسجيل دخول', href: '#' }]} />

      {success ? (
        <div dir='rtl' className='col-lg-6 p-4 p-md-5 text-right'>
          <h1> </h1>
          <p>البريد الإلكترون : {userEmail}</p>
          <button className='btn btn-primary m-3' onClick={handleLogout}>تسجيل خروج</button>
        </div>
      ) : (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="row g-0 w-100 shadow-lg rounded-4 overflow-hidden"
            style={{ maxWidth: "1200px", backgroundColor: "white" }}
          >
            <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5 login-deco position-relative">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-white z-3"
              >
                <h2 className="display-4 fw-bold mb-4">أهلاً بك من جديد!</h2>
                <p className="fs-4 mb-4">ليس لديك حساب بعد؟</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignupClick}
                  className="btn btn-outline-light btn-lg px-5 rounded-pill"
                >
                  {isTransitioning ? "جارٍ التوجيه..." : "سجل الآن"}
                </motion.button>
              </motion.div>
              <div className="circle one"></div>
              <div className="circle two"></div>
              <div className="circle three"></div>
            </div>

            <div className="col-lg-6 p-4 p-md-5 bg-white">
              <div dir='rtl'  className="h-100 d-flex flex-column  text-right">
                {userEmail ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 text-center space-y-6"
                  >
                    <h2 className="text-2xl font-extrabold text-gray-800">
                      مرحباً بك،
                    </h2>
                    <p className="text-gray-600">تم تسجيل الدخول بنجاح</p>
                    <div className="bg-green-100 text-green-800 py-2 px-4 rounded-md border border-green-300">
                      البريد الإلكتروني: {userEmail}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
                    >
                      تسجيل الخروج
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-center mb-4"
                    >
                      <h2 className="fw-bold text-dark mb-2">تسجيل الدخول</h2>
                      <p className="text-muted">أدخل بياناتك للمتابعة</p>
                    </motion.div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="alert alert-danger text-center"
                      >
                        {error}
                      </motion.div>
                    )}

                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-4">
                        <label htmlFor="email" className="form-label fw-semibold">البريد الإلكتروني:</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={credentials.email}
                          onChange={handleChange}
                          required
                          placeholder="example@email.com"
                          className="form-control form-control-lg py-3"
                        />
                      </div>

                      <div className="mb-4">
                        <label htmlFor="password" className="form-label fw-semibold">كلمة المرور:</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={credentials.password}
                          onChange={handleChange}
                          required
                          placeholder="********"
                          className="form-control form-control-lg py-3"
                        />
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check d-flex align-items-center gap-2" dir="rtl">
                          <input type="checkbox" id="remember" className="form-check-input" />
                          <label htmlFor="remember" className="form-check-label" style={{ marginRight: '22px' ,marginTop:'8px'}}>تذكرني</label>
                        </div>
                        <a href="/email" className="text-decoration-none" style={{ color: "#4c8565" }}>
                          نسيت كلمة المرور؟
                        </a>
                      </div>
     {/* <button type="button" onClick={handleSinUpClick}  className="btn btn-link text-decoration-none">ليس لديك حساب؟ </button> */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-lg w-100 py-3"
                        disabled={isLoading}
                        style={{ backgroundColor: "#4c8565", color: "white" }}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                            جاري تسجيل الدخول...
                          </>
                        ) : "تسجيل الدخول"}
                      </motion.button>
                    </motion.form>

                    <div className="text-center mt-4 d-block d-lg-none">
                 
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSignupClick}
                        className="btn btn-outline-success px-4 py-2 rounded-pill fw-semibold"
                      >
                        {isTransitioning ? "جارٍ التوجيه..." : "سجل الآن"}
                      </motion.button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <style>{`
        .login-deco {
          background: linear-gradient(135deg, #0d9488, #065f53);
          overflow: hidden;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.2;
          z-index: 1;
        }

        .circle.one {
          width: 150px;
          height: 150px;
          top: 20px;
          left: 20px;
          background: #ffffff;
          animation: float 6s ease-in-out infinite;
        }

        .circle.two {
          width: 200px;
          height: 200px;
          bottom: 30px;
          right: 40px;
          background: #cbd5e1;
          animation: float 7s ease-in-out infinite reverse;
        }

        .circle.three {
          width: 100px;
          height: 100px;
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
          background: #ffffff;
          animation: float 5s ease-in-out infinite alternate;
        }

        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default UserLogin;
