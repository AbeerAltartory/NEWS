import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import instanceAxios from '../components/Axios/Axios';
import { useNavigate } from 'react-router-dom';
const NewPasswordPage = () => {
  const { token } = useParams();
const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('كلمات السر غير متطابقة');
      return;
    }

    if (newPassword.length < 6) {
      setError('كلمة المرور يجب أن تكون على الأقل 6 أحرف.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await instanceAxios.put(`/api/auth/journalist/reset-password/${token}`, {
        password: newPassword,
      });

      if (response.data.message) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Reset error:", err);
      setError("فشل في تعيين كلمة المرور. تأكد من أن الرابط صحيح.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loginJournalist = () => {
    navigate('/Journalist-login');
  };
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4"
        style={{
          maxWidth: '600px',
          width: '100%',
          borderRadius: '20px',
          border: '1px solid rgba(76, 133, 101, 0.1)',
        }}
        dir="rtl"
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: '#4c8565', fontSize: '2rem' }}>لمحة News</h2>
          <p className="text-muted mt-2" style={{ fontSize: '1.1rem' }}>إنشاء كلمة مرور جديدة</p>
        </div>

        {submitted ? (
          <>
            <div className="alert alert-success text-center fw-semibold fs-5 py-3">
              🎉 تم تعيين كلمة المرور بنجاح!
            </div>
            <div className="text-center mt-3">
              Journlist-login
              <button onClick={loginJournalist} className="btn btn-outline-success px-4 py-2 fs-5">
                تسجيل الدخول
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="px-3">

            {/* كلمة المرور الجديدة */}
            <div className="mb-4 position-relative">
              <label className="form-label fw-semibold fs-5 mb-2">كلمة المرور الجديدة:</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control form-control-lg py-3 pe-5 fs-5"
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                style={{
                  border: '1px solid #4c8565',
                  borderRadius: '10px',
                }}
              />
              <span
                className="position-absolute"
                style={{
                  left: '15px',
                  bottom: '15px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  userSelect: 'none',
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="mb-4 position-relative">
              <label className="form-label fw-semibold fs-5 mb-2">تأكيد كلمة المرور:</label>
              <input
                type={showConfirm ? 'text' : 'password'}
                className="form-control form-control-lg py-3 pe-5 fs-5"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                style={{
                  border: '1px solid #4c8565',
                  borderRadius: '10px',
                }}
              />
              <span
                className="position-absolute"
                style={{
                  left: '15px',
                  bottom: '15px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  userSelect: 'none',
                }}
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? '🙈' : '👁️'}
              </span>
            </div>

            {/* رسالة الخطأ */}
            {error && (
              <div className="alert alert-danger text-center fw-semibold fs-5 py-3 mb-4">
                {error}
              </div>
            )}

            {/* زر الحفظ */}
            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-lg py-3 fs-5"
                style={{
                  backgroundColor: '#4c8565',
                  color: 'white',
                  borderRadius: '10px',
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري الحفظ...' : 'حفظ كلمة المرور'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default NewPasswordPage;
