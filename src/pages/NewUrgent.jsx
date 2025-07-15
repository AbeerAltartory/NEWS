import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { Link } from "react-router-dom";
import HeaderTwo from "../components/HeaderTwo";
import instanceAxios from "../components/Axios/Axios";
import { useRegion } from "../components/contaextApi/RegionContext";
import defaultImage from "./images/تنزيل.jpg";
// import BreakingNewsTicker from "./BreakingNewsTicker";

function NewUrgent() {
  const [breakingNews, setBreakingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { region } = useRegion();
  const [searchTerm, setSearchTerm] = useState("");
  const [likedPosts, setLikedPosts] = useState({});

  const userId = window.localStorage.getItem("id");

  // Fetch breaking news and initialize likedPosts map
  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const response = await instanceAxios.get("/api/news");
        const filtered = response.data.posts.filter(
          (item) => item.isBreaking === true && item.region === region
        );
        setBreakingNews(filtered);

        // Initialize likedPosts for this user
        if (userId) {
          const likesMap = {};
          filtered.forEach(post => {
            likesMap[post._id] = post.likes?.includes(userId) || false;
          });
          setLikedPosts(likesMap);
        }
      } catch (error) {
        console.error("فشل جلب الأخبار العاجلة:", error);
      } finally {
        setLoading(false);
      }
    };

    if (region) {
      fetchBreakingNews();
    }
  }, [region, userId]);

  // Filter breaking news by search term
  const filteredNews = useMemo(() => {
    if (!searchTerm.trim()) return breakingNews;
    const lowerSearch = searchTerm.toLowerCase();
    return breakingNews.filter(
      (news) =>
        (news.title && news.title.toLowerCase().includes(lowerSearch)) ||
        (news.content && news.content.toLowerCase().includes(lowerSearch))
    );
  }, [searchTerm, breakingNews]);

  // Handle like toggle
  const handleLike = async (postId) => {
    if (!userId) {
      alert("يجب تسجيل الدخول للإعجاب بالأخبار.");
      return;
    }

    try {
      await instanceAxios.put(`/api/news/${postId}/like`, { userId });

      setBreakingNews((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes?.includes(userId)
                  ? post.likes.filter(id => id !== userId)
                  : [...(post.likes || []), userId],
              }
            : post
        )
      );

      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }));
    } catch (error) {
      console.error("فشل في تسجيل الإعجاب:", error);
    }
  };

  if (!region) {
    return (
      <div className="text-center py-5 text-muted">
        الرجاء اختيار منطقة لعرض الأخبار العاجلة.
      </div>
    );
  }

  const cardVariants = {
    offscreen: { y: 100, opacity: 0, scale: 0.95 },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="container-fluid px-0 mt-4"
    >
      <motion.div variants={titleVariants}>
        <HeaderTwo
          links={[
            { label: "الصفحة الرئيسية", href: "/" },
            { label: "الأخبار العاجلة", href: "#" },
          ]}
        />
      </motion.div>

      <motion.div
        className="hero-banner position-relative overflow-hidden"
        style={{ height: "400px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={defaultImage}
          alt="خلفية أخبار عاجلة"
          className="w-100 h-100 object-fit-cover"
          style={{ filter: "brightness(0.7)" }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="display-4 fw-bold mb-3">الأخبار العاجلة</h1>
            <p className="fs-5">تحديثات فورية لأهم الأحداث الجارية الآن</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="container py-5">
        <motion.div className="row g-4" variants={backgroundVariants}>
          {/* <motion.div className="col-12 mb-4" variants={titleVariants}>
            <div className="card border-0 shadow-sm p-3 d-flex flex-column flex-md-row align-items-center justify-content-between">
              <h5 className="m-0 mb-3 mb-md-0">أخبار عاجلة - {region}</h5>
           
            </div>
          </motion.div> */}

          {loading ? (
            <div className="text-center py-5">جاري التحميل...</div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-5 text-muted">
              لا توجد أخبار عاجلة تطابق بحثك في منطقة <strong>{region}</strong>.
            </div>
          ) : (
            filteredNews.map((news) => (
              <motion.div
                key={news._id}
                className="col-md-6 col-lg-4"
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
              >
                <motion.div
                  className="card h-100 border-0 shadow-sm overflow-hidden"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  <div
                    className="position-absolute top-0 end-0 px-3 py-1 text-white"
                    style={{
                      backgroundColor: "#dc3545",
                      borderBottomLeftRadius: "8px",
                    }}
                  >
                    <small>عاجل</small>
                  </div>

                  <motion.div
                    className="card-img-top overflow-hidden"
                    style={{ height: "200px" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={news.image || defaultImage}
                      alt={news.title || "صورة الخبر"}
                      className="img-fluid w-100 h-100 object-fit-cover"
                    />
                  </motion.div>

                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">{news.title}</h5>
                    <p className="card-text text-muted mb-3">
                      {news.content
                        ? `${news.content.slice(0, 100)}...`
                        : "لا يوجد محتوى متاح."}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to={`/details/${news._id}`}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                        }}
                      >
                        اقرأ المزيد
                      </Link>
                      <small className="text-muted">{news.writer}</small>
                    </div>

                    {/* زر الإعجاب */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        onClick={() => handleLike(news._id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        {likedPosts[news._id] ? "❤️" : "🤍"} إعجاب
                      </button>
                      <small className="text-muted">
                        {news.likes?.length || 0} إعجاب
                      </small>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))
          )}
         
        </motion.div>
      </div>
    </motion.div>
  );
}

export default NewUrgent;
