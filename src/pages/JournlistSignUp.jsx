
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from '../components/Axios/Axios.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { motion } from 'framer-motion';
import HeaderTwo from "../components/HeaderTwo.jsx";
import instanceAxios from '../components/Axios/Axios.jsx';

const JournlistSignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pressCard: '',
    confirmPassword: '',
    password: '',
    specialization: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    const arabicNameRegex = /^[\u0600-\u06FF\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const pressCardRegex = /^[a-zA-Z0-9]{6,20}$/;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'الاسم الكامل مطلوب';
    } else if (!arabicNameRegex.test(formData.fullName)) {
      newErrors.fullName = 'يجب أن يحتوي الاسم على أحرف عربية فقط';
    }

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'بريد إلكتروني غير صالح';
    }

    if (!formData.phone) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'رقم هاتف غير صالح (10-15 رقمًا)';
    }

    if (!formData.pressCard) {
      newErrors.pressCard = 'رقم بطاقة الصحافة مطلوب';
    } else if (!pressCardRegex.test(formData.pressCard)) {
      newErrors.pressCard = 'رقم بطاقة الصحافة غير صالح (6-20 حرفًا/رقمًا)';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for the field if present
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);
console.log('Sending data:', formData);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName); 
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('pressCard', formData.pressCard);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('specialization', formData.specialization);


      const response = await instanceAxios.post('/api/auth/journalist/register', formDataToSend);
      const {journalist}= response.data;
 
   
   
  window.localStorage.setItem('name', journalist.fullName);
  window.localStorage.setItem('email', journalist.email);
  window.localStorage.setItem('phone', journalist.phone);
  window.localStorage.setItem('pressCard', journalist.pressCard);
  window.localStorage.setItem('id', journalist.id);
  window.localStorage.setItem('pressCard', journalist.specialization);
 if (response.data.success) {
        setSuccess(true);
    
         }
console.log('Response:', response.journalist
);
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ في الاتصال بالخادم");

    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigate to login page with animation
  const handleLoginClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/Journlist-login');
    }, 800);
  };
  const handleAddnews = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate('/news-list');
    }, 300);
  };
  const handleLogoutClick = () => {
setSuccess(false);
    localStorage.clear();
 
  };

  const specializations = [
    { value: 'general', label: 'صحافة عامة' },
    { value: 'politics', label: 'الرياضة' },
    { value: 'sports', label: 'الطقس' },
    { value: 'economy', label: 'الكوارث' },
    { value: 'culture', label: 'الصحة' },
    // { value: 'technology', label: 'منوعات' }
  ];

  return (
    <div className='container-fluid min-vh-100  align-items-center justify-content-center p-3'>
      <HeaderTwo links={[
        { label: 'الصفحة الرئيسية', href: '/' },
        { label: 'إنشاء حساب', href: '#' }
      ]} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='row g-0 w-100 shadow-lg rounded-4 overflow-hidden'
        style={{ maxWidth: '1200px', backgroundColor: 'white' }}
      >
{success ?<div dir='rtl'  className='col-lg-6 p-4 p-md-5 text-right'>

  <p>الاسم :  {window.localStorage.getItem("name")}</p>
  <p>البريد الإلكترون : {window.localStorage.getItem("email")}</p>
  <p>رقم الهاتف : {window.localStorage.getItem("phone")}</p>
  <p>رقم بطاقة الصحفي :  {window.localStorage.getItem("pressCard")}</p>
<div className="text-center mt-4">

    <button className='btn btn-primary m-3 ' onClick={handleLogoutClick}>تسجيل خروج</button>
    <button className='btn btn-primary m-3 ' onClick={handleAddnews}>إضافة خبر</button>
</div>
</div>
:     
   <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="row g-0 w-100 shadow-lg rounded-4 overflow-hidden"
          style={{ maxWidth: "1200px", backgroundColor: "white" }}
        >
    {/* واجهة ترحيبية محسنة */}
  <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5 login-deco position-relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center text-white z-3"
            >
              <h2 className="display-4 fw-bold mb-4">أهلاً بك من جديد!</h2>
              <p className="fs-4 mb-4">هل لديك حساب؟</p>
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
          <div className=" col-lg-6 p-4 p-md-5 bg-white h-100 d-flex flex-column justify-content-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-4"
            >
              <h2 className="fw-bold text-dark mb-2"> حساب صحفي جديد</h2>
              <p className="text-muted">الرجاء إدخال بياناتك الشخصية</p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSubmit}
              className="mt-3"
            >
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">تم التسجيل بنجاح!</div>}

              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">الاسم الكامل:</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${errors.fullName ? 'is-invalid' : ''}`}
                  placeholder="الاسم الكامل"
                  disabled={isSubmitting}
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">البريد الإلكتروني</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="البريد الإلكتروني"
                  disabled={isSubmitting}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label fw-semibold">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
                  placeholder="رقم الهاتف"
                  disabled={isSubmitting}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>

              {/* Press Card */}
              <div className="mb-3">
                <label className="form-label fw-semibold">رقم بطاقة الصحفي:</label>
                <input
                  type="text"
                  name="pressCard"
                  value={formData.pressCard}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${errors.pressCard ? 'is-invalid' : ''}`}
                  placeholder="مثال: PRS123456"
                  disabled={isSubmitting}
                />
                {errors.pressCard && <div className="invalid-feedback">{errors.pressCard}</div>}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">كلمة المرور:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="كلمة المرور"
                  disabled={isSubmitting}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">تأكيد كلمة المرور:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="تأكيد كلمة المرور"
                  disabled={isSubmitting}
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>

              {/* Specialization */}
              <div className="mb-4">
                <label className="form-label fw-semibold">التخصص:</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="form-select form-select-lg"
                  disabled={isSubmitting}
                >
                  {specializations.map(spec => (
                    <option key={spec.value} value={spec.value}>{spec.label}</option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary w-100 py-3 fs-5"
              >
                {isSubmitting ? 'جاري التسجيل...' : 'تسجيل'}
              </motion.button>
            </motion.form>

            {/* <div className="text-center mt-4">
              <span>هل لديك حساب؟ </span>
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={handleLoginClick}
                disabled={isSubmitting}
              >
                تسجيل الدخول
              </button>
            </div> */}
          </div>
        </motion.div>
}
      
      </motion.div>
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
      0%   { transform: translateY(0); }
      50%  { transform: translateY(-15px); }
      100% { transform: translateY(0); }
    }
  `}</style>
    </div>
  );
};

export default JournlistSignUp;

