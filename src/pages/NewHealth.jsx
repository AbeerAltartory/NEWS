import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import HeaderTwo from "../components/HeaderTwo";
import instanceAxios from "../components/Axios/Axios.jsx";
import { useRegion } from "../components/contaextApi/RegionContext.jsx";
import CopyLinkButton from "./CopyLinkButton.jsx";
import { Link } from "react-router-dom";
import { useSearch } from "../components/contaextApi/searchContext.jsx";

function NewHealth() {
  const [healthPosts, setHealthPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState({});
  const { region } = useRegion();
  const { searchTerm, setSearchTerm } = useSearch();

  // Always get userId fresh from localStorage
  const userId = window.localStorage.getItem("id");

  useEffect(() => {
    if (!region) return;

    const fetchHealthNews = async () => {
      try {
        const { data } = await instanceAxios.get("/api/news");
        if (data.success && Array.isArray(data.posts)) {
          const filtered = data.posts.filter(
            (post) => post.region === region && post.category === "الصحة"
          );
          setHealthPosts(filtered);

          const likesMap = {};
          filtered.forEach((post) => {
            likesMap[post._id] = post.likes?.includes(userId) || false;
          });
          setLikedPosts(likesMap);
        }
      } catch (error) {
        console.error("حدث خطأ أثناء جلب أخبار الصحة:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthNews();
  }, [region, userId]);

  const handleLike = async (postId) => {
    const currentUserId = window.localStorage.getItem("id");
    if (!currentUserId || currentUserId === "defaultUserId") {
      alert("يرجى تسجيل الدخول أولاً لتسجيل الإعجاب.");
      return;
    }

    try {
      await instanceAxios.put(`/api/news/${postId}/like`, { userId: currentUserId });

      setHealthPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes?.includes(currentUserId)
                  ? post.likes.filter((id) => id !== currentUserId)
                  : [...(post.likes || []), currentUserId],
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

  const filteredPosts = healthPosts.filter((post) =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container-fluid px-0 mt-4"
    >
      {/* Header */}
      <motion.div>
        <HeaderTwo
          links={[
            { label: "الصفحة الرئيسية", href: "/" },
            { label: "الصحة", href: "#" },
          ]}
        />
      </motion.div>

      {/* Hero Banner */}
      <motion.div
        className="hero-banner position-relative overflow-hidden"
        style={{ height: "400px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://i.pinimg.com/736x/a9/9e/11/a99e11103a2907ab0117de478cea1692.jpg"
          alt="صورة الصحة"
          className="w-100 h-100 object-fit-cover"
          style={{ filter: "brightness(0.6)" }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="display-4 fw-bold mb-3">أخبار الصحة</h1>
            <p className="fs-5">
              أحدث المعلومات والنصائح الصحية لمنطقة <strong>{region}</strong>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="container py-5">
        <motion.div className="row g-4">
          <motion.div className="col-12 mb-4">
            <div className="card border-0 shadow-sm p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0">تصفية أخبار الصحة</h5>
                <small className="text-muted">المنطقة: {region}</small>
              </div>
              {/* Search input */}

            </div>
          </motion.div>

          {loading ? (
            <motion.div className="col-12 text-center">
              <p>جاري التحميل...</p>
            </motion.div>
          ) : filteredPosts.length === 0 ? (
            <motion.div className="col-12 text-center">
              <div className="alert alert-info" role="alert">
                لا توجد أخبار صحية تطابق بحثك في المنطقة <strong>{region}</strong>.
              </div>
            </motion.div>
          ) : (
            filteredPosts.map((post) => (
              <motion.div
                key={post._id}
                className="col-md-6 col-lg-4"
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
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="text-muted mb-1">بقلم: {post.writer}</p>
                    <p className="card-text">{post.content?.slice(0, 100)}...</p>

                  

                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <Link
                        to={`/details/${post._id}`}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#4c8565",
                          color: "white",
                        }}
                      >
                        اقرأ المزيد
                      </Link>
                      <small className="text-muted">{post.writer}</small>
                    </div>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        onClick={() => handleLike(post._id)}
                        className="btn btn-outline-success btn-sm"
                        aria-pressed={likedPosts[post._id] || false}
                      >
                       {post.likes?.length || 0} {likedPosts[post._id] ? "❤️" : "🤍"} إعجاب
                      </button>
                      {/* <small className="text-muted">
                        {post.likes?.length || 0} إعجاب
                      </small> */}
                      <CopyLinkButton postId={post._id} />
                    </div>

                    
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default NewHealth;
