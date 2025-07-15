import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faGoogle 
} from '@fortawesome/free-brands-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  // تعريف جميع الأنماط هنا
  const styles = {
    footer: {
      backgroundColor: "#f8f9fa",
      color: "#212529",
      width: "100%",
    },
    container: {
      padding: "2rem 1rem",
    },
    title: {
      textTransform: "uppercase",
      marginBottom: "1.5rem",
      fontWeight: "bold",
      fontSize: "1.8rem",
    },
    primaryText: {
      color: " rgb(13, 148, 136)",
    },
    linksContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: "1.5rem",
    },
    linkItem: {
      margin: "0 1.2rem",
    },
    link: {
      color: "#212529",
      textDecoration: "none",
      transition: "all 0.3s ease",
      fontSize: "1.5rem",
      fontWeight: "500",
    },
    linkHover: {
      color: "#0d9488",
    },
    socialIcons: {
      display: "flex",
      justifyContent: "center",
      margin: "1.5rem 0",
    },
    icon: {
      color: "#212529",
      margin: "0 0.8rem",
      transition: "all 0.3s ease",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    iconHover: {
      color: "#0d9488",
      transform: "translateY(-3px)",
    },
    copyright: {
      backgroundColor: "#e9ecef",
      padding: "1.2rem",
      textAlign: "center",
      fontSize: "1.1rem",
    },
  };

  // دالة لمعالجة تأثير Hover
  const handleHover = (e, hoverStyle) => {
    Object.assign(e.target.style, hoverStyle);
  };

  const handleLeave = (e, defaultStyle) => {
    Object.assign(e.target.style, defaultStyle);
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container} className="container">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2 style={styles.title}>
              لمحة
              <span style={styles.primaryText}> NEWS</span>
            </h2>
          </div>

          <div className="col-12 text-center">
            <div style={styles.linksContainer}>
              <span style={styles.linkItem}>
                <a
                  href="/conect"
                  style={styles.link}
                  onMouseEnter={(e) => handleHover(e, styles.linkHover)}
                  onMouseLeave={(e) => handleLeave(e, styles.link)}
                >
                  تواصل معنا
                </a>
              </span>
              <span style={styles.linkItem}>
                <a
                  href="/advertise"
                  style={styles.link}
                  onMouseEnter={(e) => handleHover(e, styles.linkHover)}
                  onMouseLeave={(e) => handleLeave(e, styles.link)}
                >
                  أعلن معنا
                </a>
              </span>
            </div>

            <div style={styles.socialIcons}>
              <a
                href="https://facebook.com"
                onMouseEnter={(e) => handleHover(e, styles.iconHover)}
                onMouseLeave={(e) => handleLeave(e, styles.icon)}
              >
                <FontAwesomeIcon 
                  icon={faFacebookF} 
                  style={styles.icon} 
                />
              </a>
              <a
                href="https://twitter.com"
                onMouseEnter={(e) => handleHover(e, styles.iconHover)}
                onMouseLeave={(e) => handleLeave(e, styles.icon)}
              >
                <FontAwesomeIcon 
                  icon={faTwitter} 
                  style={styles.icon} 
                />
              </a>
              <a
                href="https://instagram.com"
                onMouseEnter={(e) => handleHover(e, styles.iconHover)}
                onMouseLeave={(e) => handleLeave(e, styles.icon)}
              >
                <FontAwesomeIcon 
                  icon={faInstagram} 
                  style={styles.icon} 
                />
              </a>
              <a
                href="https://google.com"
                onMouseEnter={(e) => handleHover(e, styles.iconHover)}
                onMouseLeave={(e) => handleLeave(e, styles.icon)}
              >
                <FontAwesomeIcon 
                  icon={faGoogle} 
                  style={styles.icon} 
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.copyright}>
        © {new Date().getFullYear()} جميع الحقوق محفوظة لموقع لمحة نيوز
      </div>
    </footer>
  );
};

export default Footer;