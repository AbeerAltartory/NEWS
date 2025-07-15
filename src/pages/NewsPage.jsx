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
import ArticlesGrid from "./ArticlesGrid"
import BreakingNewsTicker from "./BreakingNewsTicker";

function NewsPage() {
  const [sportsNews, setSportsNews] = useState([]);
  const { region } = useRegion();
  const { searchTerm } = useContext(SearchContext);
  const [likedPosts, setLikedPosts] = useState({});
  const [breakingNews, setBreakingNews] = useState([]);

  // الحصول على userId من localStorage
  const userId = window.localStorage.getItem("id");

  // عند تحميل الأخبار، نهيء حالة الإعجاب بناءً على وجود userId في likes
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

        // تحديث حالة الإعجاب فقط إذا userId موجود
        if (userId) {
          const likesMap = {};
          filtered.forEach((item) => {
            likesMap[item._id] = item.likes?.includes(userId);
          });
          setLikedPosts(likesMap);
        } else {
          // إذا لا يوجد userId، لا يمكن الإعجاب
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

    // ✅ تحديث الأخبار محليًا: إذا كان userId موجود يزيله، وإذا مش موجود يضيفه
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

    // ✅ تحديث حالة الزر (لونه أو شكله)
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

      {/* باقي الكود كما هو، مع زر الإعجاب */}
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
                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                  {/* بطاقة الأخبار */}
                  
                  <div
                    className="position-absolute top-0 end-0 px-3 py-1 text-white"
                    style={{
                      backgroundColor: "#4c8565",
                      borderBottomLeftRadius: "8px",
                    }}
                  >
                    <small>{news.category}</small>
                  </div>
                  <img src={news.image} alt={news.title} className="img-fluid w-100"style={{
    height: "200px",
    objectFit: "cover"
  }} />
                  <div className="card-body">
                    <h5>{news.title}</h5>
                    <p>{news.content.slice(0, 100)}...</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={`/details/${news._id}`} className="btn btn-sm btn-success">
                        اقرأ المزيد
                      </Link>
                      <small>قلم: {news.writer}</small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        onClick={() => handleLike(news._id)}
                        className={`btn btn-sm ${likedPosts[news._id] ? "btn-danger" : "btn-outline-danger"}`}
                      >
                        <span>{news.likes?.length || 0} </span>
                        {likedPosts[news._id] ? "❤️" : "🤍"} إعجاب
                      </button>
                      <CopyLinkButton postId={news._id} />
                    </div>
                    
                  </div>
                </div>
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
