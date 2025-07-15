import React, { useState } from 'react';
import image1 from './images/ff.jpeg';
import image2 from './images/thumb.jpeg';
import image3 from './images/jj.jpeg';


const ProfitSystem = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    {
      image: image1,
      title: `  علوم وتكنولوجيا`
     ,subtitle:'الذكاء الاصطناعي وسوق العمل: هل نحن أمام تحدٍ أم فرصة غير مسبوقة؟'}
,{
      image: image2,
      title: 'الموضة',
      subtitle: 'الطريقة المناسبة لتنسيق اللون الأبيض في مجموعات كروز 2025'
    },
    {
      image: image3,
      title: 'اقتصاد',
      subtitle: 'كيف تؤثر المؤشرات العالمية على قراراتك الاستثمارية'
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const styles = {
    heroContainer: {
      position: 'relative',
      width: '100%',
      height: '500px',
      overflow: 'hidden',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    },
    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)'
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7))',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: '2rem',
      textAlign: 'center'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '700',
      marginBottom: '1rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
    },
    subtitle: {
      fontSize: '1.5rem',
      marginBottom: '2rem',
      maxWidth: '800px',
      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
    },
    button: {
      backgroundColor: '#465',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      padding: '15px 40px',
      fontSize: '1.2rem',
      fontWeight: '600',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease'
    },
    navArrow: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(5px)',
      padding: '12px',
      borderRadius: '50%',
      cursor: 'pointer',
      zIndex: 2,
      userSelect: 'none',
      transition: 'all 0.3s ease',
      border: '2px solid #fff'
    },
    leftArrow: {
      left: '20px'
    },
    rightArrow: {
      right: '20px'
    },
    contentContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px'
    },
    header: {
      color: "#333",
      marginBottom: "30px",
      marginTop: "30px",
      fontWeight: "bold",
      borderBottom: "2px solid #ddd",
      paddingBottom: "10px",
      textAlign: "right"
    },
  };

  return (
    <div style={styles.contentContainer}>
    <div className="container">
    <h2 style={styles.header}>منوعات</h2>
    </div>
      <div
        style={styles.heroContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={slides[currentIndex].image}
          alt="Profit System"
          style={styles.heroImage}
        />
        <div style={styles.overlay}>
          <h1 style={styles.title}>{slides[currentIndex].title}</h1>
          <p style={styles.subtitle}>{slides[currentIndex].subtitle}</p>
          <button style={styles.button}>اقرا الخبر</button>
        </div>

        {/* الأسهم */}
        <div style={{ ...styles.navArrow, ...styles.leftArrow }} onClick={handlePrev}>
          <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </div>
        <div style={{ ...styles.navArrow, ...styles.rightArrow }} onClick={handleNext}>
          <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProfitSystem;
