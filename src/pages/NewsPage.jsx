import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { Link } from "react-router-dom";
import HeaderTwo from "../components/HeaderTwo";
import instacAxios from "../components/Axios/Axios";
import { useRegion } from "../components/contaextApi/RegionContext";
import CopyLinkButton from "./CopyLinkButton";
import { SearchContext } from "../components/contaextApi/searchContext";
import ArticlesGrid from "./ArticlesGrid";
import BreakingNewsTicker from "./BreakingNewsTicker";

function NewsPage() {
  const [sportsNews, setSportsNews] = useState([]);
  const { region } = useRegion();
  const { searchTerm } = useContext(SearchContext);
  const [likedPosts, setLikedPosts] = useState({});
  const [breakingNews, setBreakingNews] = useState([]);
  const userId = window.localStorage.getItem("id");

  useEffect(() => {
    if (!region) return;

    const fetchNews = async () => {
      try {
        const response = await instacAxios.get("/api/news");
        let filtered = response.data.posts.filter(
          (news) => news.region === region
        );

        if (searchTerm.trim() !== "") {
          const searchLower = searchTerm.toLowerCase();
          filtered = filtered.filter(
            (news) =>
              news.title.toLowerCase().includes(searchLower) ||
              news.content.toLowerCase().includes(searchLower)
          );
        }

        setSportsNews(filtered);

        if (userId) {
          const likesMap = {};
          filtered.forEach((item) => {
            likesMap[item._id] = item.likes?.includes(userId);
          });
          setLikedPosts(likesMap);
        } else {
          setLikedPosts({});
        }
      } catch (error) {
        console.error("خطأ في جلب الأخبار:", error);
      }
    };

    const fetchBreaking = async () => {
      try {
        const response = await instacAxios.get("/api/news");
        const breaking = response.data.posts.filter(
          (item) => item.isBreaking === true
        );
        setBreakingNews(breaking);
      } catch (err) {
        console.error("❌ فشل في جلب الأخبار العاجلة:", err);
      }
    };

    fetchBreaking();
    fetchNews();
  }, [region, searchTerm, userId]);

  const handleLike = async (postId) => {
    const currentUserId = window.localStorage.getItem("id");

    if (!currentUserId || currentUserId === "defaultUserId") {
      alert("يجب تسجيل الدخول لكي تتمكن من الإعجاب.");
      return;
    }

    try {
      await instacAxios.put(`/api/news/${postId}/like`, { userId: currentUserId });

      setSportsNews((prevNews) =>
        prevNews.map((news) =>
          news._id === postId
            ? {
                ...news,
                likes: news.likes?.includes(currentUserId)
                  ? news.likes.filter((id) => id !== currentUserId)
                  : [...(news.likes || []), currentUserId],
              }
            : news
        )
      );

      setLikedPosts((prev) => ({
        ...prev,
        [postId]: !prev[postId],
      }));
    } catch (err) {
      console.error("خطأ في الإعجاب:", err);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="container-fluid px-0 mt-4"
    >
      {breakingNews.length > 0 && (
        <BreakingNewsTicker newsItems={breakingNews} />
      )}

      <motion.div>
        <HeaderTwo links={[{ label: "الصفحة الرئيسية", href: "/" }]} />
      </motion.div>

      <div className="container py-5">
        <motion.div className="row g-4">
          {sportsNews.length === 0 ? (
            <div className="col-12 text-center">
              <div className="alert alert-info">
                لا توجد أخبار مطابقة لبحثك في منطقة <strong>{region}</strong>.
              </div>
            </div>
          ) : (
            sportsNews.slice(0, 15).map((news) => (
              <div key={news._id} className="col-md-6 col-lg-4">
                <motion.div className="card h-100 border-0 shadow-sm overflow-hidden"
                  whileHover={{
                    y: -10,
                    boxShadow: "0 15px 30px rgba(0,0,0,0.12)",
                  }}>
                  
                  <div
                    className="position-absolute top-0 end-0 px-3 py-1 text-white"
                    style={{
                      backgroundColor: "#4c8565",
                      borderBottomLeftRadius: "8px",
                      zIndex: 1,
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
                    className="img-fluid w-100"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  </motion.div>

                  <div className="card-body d-flex flex-column text-end">
                    <h5 className="card-title">{news.title}</h5>
                    {/* <small className="text-muted mb-2">بقلم: {news.writer}</small> */}

                    <p
                      className="card-text flex-grow-1"
                      style={{ whiteSpace: "pre-wrap", direction: "rtl", lineHeight: "1.7" }}
                    >
                      {news.content.slice(0, 80)}...
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <Link to={`/details/${news._id}`} className="btn btn-sm btn-success">
                        اقرأ المزيد
                      </Link>
                      <small className="text-muted">{news.writer}</small>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        onClick={() => handleLike(news._id)}
                        className={`btn btn-sm ${
                          likedPosts[news._id] ? "btn-danger" : "btn-outline-danger"
                        }`}
                      >
                        <span>{news.likes?.length || 0}</span> {likedPosts[news._id] ? "❤️" : "🤍"} إعجاب
                      </button>
                      <CopyLinkButton postId={news._id} />
                    </div>
                  </div>
                </motion.div>
              </div>
            ))
          )}
        </motion.div>
      </div>

      <ArticlesGrid />
    </motion.div>
  );
}

export default NewsPage;
