import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { Link, useNavigate } from "react-router-dom";
import HeaderTwo from "../components/HeaderTwo";
import instacAxios from "../components/Axios/Axios";
import { useRegion } from "../components/contaextApi/RegionContext";
import CopyLinkButton from "./CopyLinkButton";
import { useSearch } from "../components/contaextApi/searchContext";

function NewWeather() {
  const [weatherNews, setWeatherNews] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [likeInProgress, setLikeInProgress] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch();
  const { region } = useRegion();
  const navigate = useNavigate();

  const rawUserId = localStorage.getItem("id");
  const userId = rawUserId || "defaultUserId";

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

  useEffect(() => {
    if (!region) return;

    const fetchWeatherNews = async () => {
      try {
        const res = await instacAxios.get("/api/news");
        const filtered = res.data.posts.filter(
          (news) => news.region === region && news.category === "الطقس"
        );

        setWeatherNews(filtered);

        const likesMap = {};
        filtered.forEach((item) => {
          const isLiked = item.likes?.includes(userId);
          likesMap[item._id] = isLiked;
        });
        setLikedPosts(likesMap);
      } catch (err) {
        console.error("Error fetching weather news:", err);
        setWeatherNews([]);
      }
    };

    fetchWeatherNews();
  }, [region]);

  const filteredNews = weatherNews.filter((news) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      news.title?.toLowerCase().includes(lowerSearch) ||
      news.content?.toLowerCase().includes(lowerSearch)
    );
  });

  const sortedNews = [...filteredNews].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const handleLike = async (newsId) => {
    if (!rawUserId) {
      alert("يرجى تسجيل الدخول للإعجاب بالمشاركات.");
      navigate("/login");
      return;
    }

    if (likeInProgress) return;
    setLikeInProgress(true);

    try {
      await instacAxios.put(`/api/news/${newsId}/like`, { userId });

      setWeatherNews((prevNews) =>
        prevNews.map((item) =>
          item._id === newsId
            ? {
                ...item,
                likes: item.likes.includes(userId)
                  ? item.likes.filter((id) => id !== userId)
                  : [...item.likes, userId],
              }
            : item
        )
      );

      setLikedPosts((prev) => ({
        ...prev,
        [newsId]: !prev[newsId],
      }));
    } catch (err) {
      console.error("فشل في تسجيل الإعجاب", err);
    } finally {
      setLikeInProgress(false);
    }
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
            { label: "الطقس", href: "#" },
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
        {weatherNews[0] && (
          <img
            src={weatherNews[0].image}
            alt="خلفية الطقس"
            className="w-100 h-100 object-fit-cover"
            style={{ filter: "brightness(0.7)" }}
            onError={(e) => (e.target.src = "/fallback-weather.jpg")}
          />
        )}
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="display-4 fw-bold mb-3">تحديثات الطقس</h1>
            <p className="fs-5">آخر الأخبار الجوية وتحذيرات الطقس في منطقتك</p>
          </motion.div>
        </div>
      </motion.div>



      <div className="container py-5">
        <motion.div className="row g-4" variants={backgroundVariants}>
          {/* <motion.div className="col-12 mb-4" variants={titleVariants}>
            <div className="card border-0 shadow-sm p-3">
              <h5 className="m-0">أخبار الطقس - {region}</h5>
            </div>
          </motion.div> */}

          {sortedNews.length === 0 ? (
            <motion.div className="col-12 text-center" variants={titleVariants}>
              <div className="alert alert-info">
                لا توجد أخبار طقس للبحث "{searchTerm}" في المنطقة <strong>{region}</strong>.
              </div>
            </motion.div>
          ) : (
            sortedNews.map((news) => (
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
                      backgroundColor: "#4c8565",
                      borderBottomLeftRadius: "8px",
                    }}
                  >
                    <small>{news.category}</small>
                  </div>

                  <motion.div
                    className="card-img-top overflow-hidden"
                    style={{ height: "200px" }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={news.image}
                      alt={news.title}
                      className="img-fluid w-100 h-100 object-fit-cover"
                      onError={(e) => (e.target.src = "/fallback-weather.jpg")}
                    />
                  </motion.div>

                  <div className="card-body">
                    <h5 className="card-title fw-bold mb-3">{news.title}</h5>
                    <p className="card-text text-muted mb-3">
                      {news.content.slice(0, 100)}...
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link
                        to={`/details/${news._id}`}
                        className="btn btn-sm"
                        style={{ backgroundColor: "#4c8565", color: "white" }}
                      >
                        اقرأ المزيد
                      </Link>
                      <small className="text-muted">{news.writer}</small>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        onClick={() => handleLike(news._id)}
                        className="btn btn-outline-success btn-sm"
                        aria-pressed={likedPosts[news._id] || false}
                        disabled={likeInProgress}
                      >
                        {news.likes?.length || 0} {likedPosts[news._id] ? "❤️" : "🤍"} إعجاب
                      </button>
                      {/* <small className="text-muted">
                        {news.likes?.length || 0} إعجاب
                      </small> */}
                      <CopyLinkButton postId={news._id} />
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

export default NewWeather;
