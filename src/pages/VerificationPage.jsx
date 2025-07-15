
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

const VerificationPage = () => {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // التحقق من صحة الرمز هنا قبل الانتقال
    navigate('/reset-password');
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="card  border-1 p-4"
        style={{ 
          maxWidth: '600px',
          width: '100%',
          borderRadius: '20px',
          border: '1px solid rgba(76, 133, 101, 0.1)' // إطار أخضر داكن
        }}      >
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: '#4c8565' }}>لمحة News</h2>
          <p className="text-muted mt-2">أدخل رمز التحقق الذي أرسلناه إلى بريدك الإلكتروني</p>
        </div>



        <div className="text-center mt-3">

        </div>
      </motion.div>
    </div>
  );
};

export default VerificationPage;