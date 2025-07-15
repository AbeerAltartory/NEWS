
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { motion } from 'framer-motion';
import HeaderTwo from "../components/HeaderTwo";
import axios from '../components/Axios/Axios';

const UserSignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const arabicNameRegex = /^[\u0600-\u06FF\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) {
      newErrors.username = 'الاسم مطلوب';
    } else if (!arabicNameRegex.test(formData.username)) {
      newErrors.username = 'يجب أن يحتوي الاسم على أحرف عربية فقط';
    }

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'بريد إلكتروني غير صالح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
console.log('جاري التسجيل:', formData);
    try {
      const response = await axios.post('/api/auth/register', formData, );
      console.log('Response:', response.data);
         const { success } = response.data; 
      if (success ===true) {
      window.localStorage.setItem('login', true);
      window.localStorage.setItem('id', response.data.userName || "user");
      window.localStorage.setItem('id', response.data._id);
      setFormData(response.data); 
      
      setData(response.data);
      }

console.log('تم التسجيل بنجاح:',formData);
      navigate('/', {
        state: { newlyRegistered: true },
        replace: true
      });

    } catch (error) {
    return error.response && error.response.status === 400
  
  
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginClick = () => {
    setIsTransitioning(true);
    localStorage.clear();
    setTimeout(() => navigate('/user-login'), 500);
  };

  return (
    <div className='mt-4'>
      <HeaderTwo links={[{ label: 'الصفحة الرئيسية', href: '/' }, { label: 'إنشاء حساب', href: '/user-login' }]} />

      <div className='container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='row g-0 w-100 shadow-lg rounded-4 overflow-hidden'
          style={{ maxWidth: '1200px', backgroundColor: 'white', minHeight: '600px' }}
        >
          <div className='col-lg-6 p-4 p-md-5'>
            <div className="h-100 d-flex flex-column justify-content-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-4"
              >
                <motion.h2 className="fw-bold text-dark mb-2" whileHover={{ scale: 1.02 }}>
                  تسجيل حساب جديد
                </motion.h2>
                <p className="text-muted">الرجاء إدخال بياناتك الشخصية</p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="mt-3"
              >
                {/* الاسم */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">الاسم:</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="الاسم"
                    className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
                  />
                  {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                </div>

                {/* البريد الإلكتروني */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">البريد الإلكتروني:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                {/* كلمة المرور */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">كلمة المرور:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-dark w-100" disabled={isSubmitting}
                 style={{ backgroundColor: "#4c8565", color: "white",border:'none',padding:'15px' ,fontWeight:'bold',fontSize:'20px'}}>
                  {isSubmitting ? 'جاري التسجيل...' : 'تسجيل'}
                </button>
               
              </motion.form>
            </div>
          </div>

       {/* واجهة ترحبية */}
          <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5 login-deco position-relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center text-white z-3"
            >
              <h2 className="display-4 fw-bold mb-4">أهلاً بك من جديد!</h2>
              <p className="fs-4 mb-4"> لديك حساب؟</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoginClick}
                className="btn btn-outline-light btn-lg px-5 rounded-pill"
              >
                {isTransitioning ? "جارٍ التوجيه..." : "تسجيل دخول"}
              </motion.button>
            </motion.div>

            {/* دوائر مزخرفة */}
            <div className="circle one"></div>
            <div className="circle two"></div>
            <div className="circle three"></div>
          </div>
        </motion.div>
      </div>
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

export default UserSignUp;
