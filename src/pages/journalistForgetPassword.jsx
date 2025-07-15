import { useState } from "react";
import { motion } from "framer-motion";
import instanceAxios from "../components/Axios/Axios";
import HeaderTwo from "../components/HeaderTwo";

const JournalistForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      return setError("البريد الإلكتروني مطلوب");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError("صيغة البريد الإلكتروني غير صحيحة");
    }

    try {                                               
      setIsLoading(true);
      const response = await instanceAxios.post("/api/auth/journalist/forget-password", { email });
      setSuccess("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ أثناء الإرسال، حاول مرة أخرى");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-start align-items-center pt-5">
      <HeaderTwo
        links={[
          { label: "الصفحة الرئيسية", href: "/" },
          { label: "نسيت كلمة المرور", href: "#" },
        ]}
      />

      <motion.div
        className="col-md-6 bg-white p-4 rounded shadow mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        dir="rtl"
      >
        <h3 className="text-center mb-4">نسيت كلمة المرور؟</h3>
        <p className="text-muted text-center mb-4">أدخل بريدك الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور.</p>

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success text-center" role="alert">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 py-2"
            style={{ backgroundColor: "#4c8565", color: "white" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                جارٍ الإرسال...
              </>
            ) : (
              "إرسال رابط إعادة التعيين"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default JournalistForgetPassword;
