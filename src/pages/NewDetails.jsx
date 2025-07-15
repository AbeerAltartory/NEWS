import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import instacAxios from "../components/Axios/Axios";
import HeaderTwo from "../components/HeaderTwo";
import { motion } from "framer-motion"; // ✅ إضافة framer-motion
import {  useNavigate } from "react-router-dom";
import { BiShareAlt } from "react-icons/bi";


function NewsDetails() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
const navigate = useNavigate();


  const userId = window.localStorage.getItem("id") || "defaultUserId";

  useEffect(() => {
    // const fetchSingleNews = async () => {
    //   try {
    //     const response = await instacAxios.get(`/api/news`);
    //     const post = response.data.posts.find(p => p._id === id);
    //     if (post) {
    //       setNewsItem(post);
    //       setLikesCount(post.likes?.length || 0);
    //       setLiked(post.likes?.includes(userId));
    //     } else {
    //       console.error("خبر غير موجود");
    //     }
    //   } catch (err) {
    //     console.error("خطأ في جلب تفاصيل الخبر:", err);
    //   }
    // };
    const fetchSingleNews = async () => {
  try {
    const response = await instacAxios.get(`/api/news`);
    setAllPosts(response.data.posts); // جلب جميع الأخبار

    const post = response.data.posts.find(p => p._id === id);
    if (post) {
      setNewsItem(post);
      setLikesCount(post.likes?.length || 0);
      setLiked(post.likes?.includes(userId));
    } else {
      console.error("خبر غير موجود");
    }
  } catch (err) {
    console.error("خطأ في جلب تفاصيل الخبر:", err);
  }
};


    fetchSingleNews();
  }, [id, userId]);

  const handleLike = async () => {
    try {
      if (!userId || userId === "defaultUserId") {
        alert("يرجى تسجيل الدخول أولاً لتسجيل الإعجاب.");
        return;
      }
      await instacAxios.put(`/api/news/${id}/like`, { userId });
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
      setLiked(!liked);
    } catch (err) {
      console.error("فشل في تسجيل الإعجاب", err);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: newsItem.title,
          url: window.location.href,
        })
        .catch((error) => console.error("خطأ في المشاركة:", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ الرابط للمشاركة");
    }
  };

  if (!newsItem) return <p className="text-center mt-5">جاري تحميل الخبر...</p>;

  return (
    <motion.div
      className="container mt-4 text-center"
      style={{ backgroundColor: '#f9f9f9', padding: '10px ',marginBottom:'20px' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* <HeaderTwo links={[{ label: "العودة", href: "/" }]} /> */}
        <HeaderTwo onBack={() => navigate(-1)} />


      <motion.h2
        className="fw-bold mb-3"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {newsItem.title}
      </motion.h2>

      <motion.img
        src={newsItem.image}
        alt={newsItem.title}
        className="img-fluid mb-4"
        style={{ maxHeight: "400px", objectFit: "cover" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      />

      <motion.div
        style={{ margin: '0 auto', padding: '0 10px',fontSize:'20px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="container">{newsItem.content}</p>
        <p className="text-muted mt-3">
          كاتب الخبر: {newsItem.writer} | التاريخ:{" "}
          {new Date(newsItem.createdAt).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <motion.div
          className="d-flex gap-3 mt-4"
          style={{ padding: '0 120px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleLike}
            className={`btn btn-sm ${liked ? "btn-success" : "btn-outline-success"}`}
          >
            {liked ? "❤️" : "🤍"} إعجاب ({likesCount})
          </button>

          <button onClick={handleShare} className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
            <BiShareAlt />
            مشاركة
          </button>
        </motion.div>
      </motion.div>
      
{newsItem && (
  <div className="mt-5">
    <h4 className="mb-4 fw-bold" style={{textAlign:'right',padding:'0 10px'}}>أخبار ذات صلة:</h4>
    <hr></hr>
    <div className="row">
      {allPosts
        .filter(
          (post) =>
            post._id !== newsItem._id &&
            post.category === newsItem.category // ← تصفية حسب النوع نفسه
        )
        .slice(0, 6) // ← مثلاً أول 6 فقط
        .map((post) => (
          <motion.div
            key={post._id}
            className="col-md-6 col-lg-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="card shadow-sm h-100">
              <img
                src={post.image || "https://via.placeholder.com/400x250?text=لا+صورة"}
                className="card-img-top"
                alt={post.title || "صورة الخبر"}
                style={{ height: "140px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content?.slice(0, 100)}...</p>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <a
                    href={`/details/${post._id}`}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#4c8565",
                      color: "white",
                    }}
                  >
                    اقرأ المزيد
                  </a>
                  <small className="text-muted">{post.writer}</small>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
    </div>
  </div>
)}





    </motion.div>
  );
}

export default NewsDetails;
