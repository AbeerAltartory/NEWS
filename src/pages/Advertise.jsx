import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import adBanner1 from './images/images (1).jpg';
import { motion } from "framer-motion";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const AdvertisePage = styled(motion.div)`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const AdShowcase = styled(motion.div)`
  margin-bottom: 80px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 800;
  background: linear-gradient(90deg, #4c8565, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: ${gradient} 5s ease infinite;
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #7f8c8d;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const AdCarousel = styled.div`
  position: relative;
  margin: 0 auto 40px;
  max-width: 1000px;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  transition: all 0.5s ease;
  &:hover {
    box-shadow: 0 30px 60px rgba(0,0,0,0.2);
    transform: translateY(-5px);
  }
`;

const AdContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: auto;
  max-height: 500px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  &:hover img {
    transform: scale(1.05);
  }
  @media (max-width: 768px) {
    max-height: 300px;
  }
`;

const AdOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
  color: white;
  padding: 40px;
  text-align: center;
`;

const AdTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CTAButton = styled(motion(Link))`
  display: inline-block;
  background: linear-gradient(135deg, #4c8565 0%, #2ecc71 100%);
  color: white;
  padding: 16px 40px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px rgba(76, 133, 101, 0.3);
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
    transition: all 0.3s;
  }
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(76, 133, 101, 0.4);
    &::after {
      transform: translateX(100%);
    }
  }
  &:active {
    transform: translateY(1px);
  }
`;

const AdBoxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin: 60px auto;
  max-width: 1200px;
`;

const AdBox = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 30px 20px;
  width: 300px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #4c8565, #2ecc71);
    transition: all 0.3s;
  }
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    &::before {
      width: 6px;
    }
  }
`;

const BoxIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  animation: ${float} 4s ease-in-out infinite;
  display: inline-block;
`;

const BoxTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.4rem;
  font-weight: 700;
`;

const BoxText = styled.p`
  color: #7f8c8d;
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 1rem;
`;

const BoxLink = styled(motion(Link))`
  display: inline-block;
  color: #4c8565;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  position: relative;
  padding-bottom: 4px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #4c8565, #2ecc71);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  &:hover {
    color: #2ecc71;
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
`;

const LoginPromo = styled(motion.div)`
  padding: 60px 40px;
  border-radius: 20px;
  margin-top: 80px;
  background: linear-gradient(135deg, #f8fafb 0%, #e8f4f0 100%);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
`;

const LoginTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 2rem;
  font-weight: 700;
`;

const LoginText = styled.p`
  color: #7f8c8d;
  margin-bottom: 30px;
  font-size: 1.1rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
`;

const LoginButton = styled(motion(Link))`
  display: inline-block;
  background: linear-gradient(135deg, #4c8565 0%, #2ecc71 100%);
  color: white;
  padding: 14px 35px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 10px 20px rgba(76, 133, 101, 0.3);
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(76, 133, 101, 0.4);
  }
  &:active {
    transform: translateY(1px);
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Advertise = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("isLoggedIn") === "true" && !isLoggedIn) {
      setIsLoggedIn(true);
      console.log("Set isLoggedIn to true from localStorage");
    }
  }, []); // Empty dependency array to run only on mount

  const handleLogoutClick = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setCredentials({ email: "", password: "" });
    setError("");
    console.log("Logged out, cleared localStorage");
  };

  const handleNewsList = () => {
    console.log("Navigating to newslist");
    navigate("/news-list");
  };

  return (
    <AdvertisePage initial="hidden" animate="visible" variants={containerVariants}>
      <AdShowcase variants={itemVariants}>
        <Title>انضم إلى موقع لمحة News</Title>
        <Subtitle>
          كن صحفيًا متميزًا وشارك معنا الأخبار، احصل على مميزات حصرية وفرص لا مثيل لها لنشر محتواك
        </Subtitle>

        <AdCarousel>
          <AdContainer onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <motion.img 
              src={adBanner1} 
              alt="عرض إعلاني للصحفيين"
              initial={{ scale: 1 }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <AdOverlay>
              <AdTitle>فرص ومميزات حصرية للصحفيين المسجلين</AdTitle>
              {isLoggedIn ? (
                <div dir="rtl" className="p-4 text-center mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="alert alert-success mb-3"
                  >
                    تم تسجيل الدخول بنجاح!
                  </motion.div>
                  <p className="mb-4">البريد الإلكتروني: {window.localStorage.getItem("email")}</p>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-primary" onClick={handleLogoutClick}>
                      تسجيل خروج
                    </button>
                    <button className="btn btn-primary" onClick={handleNewsList}>
                      الأخبار
                    </button>
                  </div>
                </div>
              ) : (
                <CTAButton to="/Journlist-login" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  سجل الآن واحصل على مميزات رائعة →
                </CTAButton>
              )}
            </AdOverlay>
          </AdContainer>
        </AdCarousel>
      </AdShowcase>

      <AdBoxes>
        <AdBox variants={itemVariants} whileHover={{ y: -10 }}>
          <BoxIcon>📰</BoxIcon>
          <BoxTitle>إضافة الخبر بسهولة</BoxTitle>
          <BoxText>أضف أخبارك بسهولة وسرعة مع واجهة مستخدم بسيطة وسهلة الاستخدام</BoxText>
          <BoxLink to="/Journlist-login" whileHover={{ x: 5 }}>ابدأ الآن →</BoxLink>
        </AdBox>

        <AdBox variants={itemVariants} whileHover={{ y: -10 }}>
          <BoxIcon>✏️</BoxIcon>
          <BoxTitle>تعديل الخبر بكل مرونة</BoxTitle>
          <BoxText>عدل على أخبارك في أي وقت مع نظام متكامل لإدارة المحتوى</BoxText>
          <BoxLink to="/journalist-signup" whileHover={{ x: 5 }}>ابدأ الآن →</BoxLink>
        </AdBox>

        <AdBox variants={itemVariants} whileHover={{ y: -10 }}>
          <BoxIcon>🌟</BoxIcon>
          <BoxTitle>صفحة خاصة بك</BoxTitle>
          <BoxText>احصل على صفحة شخصية لعرض جميع أخبارك وإنجازاتك الصحفية</BoxText>
          <BoxLink to="/journalist-signup" whileHover={{ x: 5 }}>ابدأ الآن →</BoxLink>
        </AdBox>
      </AdBoxes>

      <LoginPromo variants={itemVariants} whileHover={{ y: -5 }}>
        <LoginTitle>مسجل بالفعل؟</LoginTitle>
        <LoginText>استفد من جميع المزايا الحصرية المتاحة للصحفيين المسجلين على موقعنا</LoginText>
        <LoginButton to="/Journlist-login" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          تسجيل الدخول للصحفيين →
        </LoginButton>
      </LoginPromo>
    </AdvertisePage>
  );
};

export default Advertise;