import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ArticlesSection = ({ name, image, info }) => {
  const styles = {
    container: {
      padding: '15px'
    },
    flipCard: {
      perspective: "1000px",
      width: "100%",
      height: "0",
      paddingBottom: "150%", // نسبة الارتفاع بالنسبة للعرض
      position: "relative",
      margin: "0 auto",
    },
    flipCardInner: {
      position: "absolute",
      width: "100%",
      height: "100%",
      transition: "transform 0.6s",
      transformStyle: "preserve-3d",
    },
    flipCardFace: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backfaceVisibility: "hidden",
      borderRadius: "15px",
      border: "1px solid #eee",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      overflow: "hidden"
    },
    flipCardFront: {
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundImage: `url(${image})`,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
    },
    flipCardBack: {
      backgroundColor: "white",
      transform: "rotateY(180deg)",
      padding: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflowY: "auto"
    },
    flipCardTitle: {
      color: "white",
      fontWeight: "bold",
      textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
      textAlign: "center",
      width: "100%",
      padding: "15px",
      backgroundColor: "rgba(0,0,0,0.5)",
      margin: 0
    },
    flipCardContent: {
      textAlign: "center",
      width: "100%",
      wordBreak: "break-word"
    },
    contentH3: {
      marginBottom: "15px",
      fontSize: "1.2rem",
      color: "#333"
    },
    contentP: {
      fontSize: "1rem",
      lineHeight: "1.5",
      color: "#555"
    }
  };

  const handleTouch = (e) => {
    const inner = e.currentTarget.querySelector('.flip-card-inner');
    inner.style.transform = inner.style.transform === 'rotateY(180deg)'
      ? 'rotateY(0deg)'
      : 'rotateY(180deg)';
  };

  return (
    <div className="col-12 col-md-6 col-lg-4" style={styles.container}>
      <div
        className="flip-card"
        style={styles.flipCard}
        onMouseEnter={(e) => {
          e.currentTarget.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
        }}
        onTouchStart={handleTouch}
      >
        <div className="flip-card-inner" style={styles.flipCardInner}>
          {/* Front */}
          <div className="flip-card-front" style={{ ...styles.flipCardFace, ...styles.flipCardFront }}>
            <h3 style={styles.flipCardTitle}>{name}</h3>
          </div>

          {/* Back */}
          <div className="flip-card-back" style={{ ...styles.flipCardFace, ...styles.flipCardBack }}>
            <div style={styles.flipCardContent}>
              <h3 style={styles.contentH3}>{name}</h3>
              <p style={styles.contentP}>{info}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesSection;
