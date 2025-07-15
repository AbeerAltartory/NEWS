import { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { NavLink } from "react-router-dom";
import LoginToggle from "./LoginToggle";
import Region from "../pages/Regions";
import { SearchContext } from "./contaextApi/searchContext";
import useDebounce from "./customHooks/useDebounce";
import logo from '../pages/images/logo.jpg'
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const styles = {
    scrollToTop: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 1000,
    },
    scrollButton: {
      backgroundColor: "#0d9488",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease",
    },
    scrollButtonHover: {
      transform: "translateY(-3px)",
    },
    arrowIcon: {
      width: "24px",
      height: "24px",
    },
    
  };

  const buttonStyle = {
    ...styles.scrollButton,
    ...(isHovered && styles.scrollButtonHover),
  };

  return (
    <div style={styles.scrollToTop}>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles.arrowIcon}
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setSearchTerm } = useContext(SearchContext);
  const [input, setInput] = useState('');
  const debouncedInput = useDebounce(input, 500); // تأخير 500ms

  useEffect(() => {
    document.documentElement.dir = "rtl";

    let timeoutId = null;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 10);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setSearchTerm(debouncedInput);
  }, [debouncedInput, setSearchTerm]);

  const styles = {
    header: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      transition: "all 0.3s ease",
      backgroundColor: "white",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      width: "90%",
      margin: "0 auto",
    },
    scrolledHeader: {
      width: "100%",
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(5px)",
      WebkitBackdropFilter: "blur(5px)",
    },
    navLink: {
      color: "#333",
      fontWeight: 400,
      padding: "0 0.6rem",
      textDecoration: "none",
    },
    activeNavLink: {
      color: "#4c8565",
      fontWeight: "bold",
    },
    navItem: {
      margin: "0 15px",
      textDecoration: "none",
      color: "#080808",
      fontSize: '1.4rem',
    },
    searchInput: {
      borderRadius: "20px",
      padding: "0.5rem 1rem",
    },
    title: {
      fontWeight: "bold",
      color: "#333",
      transition: "all 0.3s",
    },
  };

  const getLinkStyle = (isActive) =>
    isActive ? { ...styles.navLink, ...styles.activeNavLink } : styles.navLink;

  return (
    <>
      <header
        className="sticky-top"
        style={{
          ...styles.header,
          ...(isScrolled ? styles.scrolledHeader : {}),
        }}
      >
        <div className="container-fluid">
          <div
            className={`row display-flex py-2 ${isScrolled ? "d-none" : "bg-dark"}`}
            style={{ justifyContent: "space-between" }}
          >
            <div className="col-md-8 d-flex align-items-center">
              <h5 className="date text-white mb-0">
                {new Date().toLocaleDateString("ar-EG", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h5>
            </div>
            <LoginToggle />
          </div>

          <div className={`row align-items-center ${isScrolled ? "py-2" : "py-3"}`}>
            <div className="col-md-8">
              <NavLink to="/" style={{ textDecoration: "none" }} className="d-flex align-items-center gap-2">
                <img
                  src={logo} 
                  alt="Logo"
                  style={{ width: "80px", height: "80px", objectFit: "contain" }}
                />
                <h2 className="mb-0" style={styles.title}>
                  لمحة <span style={{ color: "#0d9488" }}>NEWS</span>
                </h2>
              </NavLink>

            </div>
            <div className="col-md-4">
              <input
                type="text"
                placeholder="ابحث..."
                className="form-control"
                style={styles.searchInput}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
          </div>

          <nav
            className={`navbar navbar-expand-lg navbar-light ${isScrolled ? "py-1" : "py-2"}`}
          >
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  {[
                    { path: "/", name: "الصفحة الرئيسية" },
                    { path: "/Urgent", name: "الأخبار العاجلة" },
                    { path: "/sport", name: "الرياضة" },
                    { path: "/weather", name: "الطقس" },
                    { path: "/disasters", name: "الكوارث" },
                    { path: "/health", name: "الصحة" },
                  ].map((item) => (
                    <li key={item.path} className="nav-item" style={styles.navItem}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive ? "nav-link active" : "nav-link"
                        }
                        style={({ isActive }) => getLinkStyle(isActive)}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                  <li className="nav-item" style={styles.navItem}>
                    <NavLink
                      to="/advertise"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                      style={({ isActive }) => getLinkStyle(isActive)}
                    >
                      أعلن معنا
                    </NavLink>
                  </li>
                  <li className="nav-item" style={{ marginLeft: "15px" }}>
                    <Region />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <ScrollToTopButton />
    </>
  );
};

export default Header;
