import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import instanceAxios from '../components/Axios/Axios';

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState({
    title: '',
    category: '',
    writer: '',
    image: '',
    content: '',
    region: '',
    isBreaking: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // جلب البيانات
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await instanceAxios.get(`/api/news/${id}`);
        if (response.data.success) {
          setNewsData(response.data.post);
        } else {
          setErrors({ fetch: 'فشل في جلب الخبر' });
        }
      } catch (error) {
        setErrors({ fetch: 'حدث خطأ أثناء جلب الخبر' });
        console.error(error);
      }
    };
    fetchNews();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewsData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newsData.title.trim()) newErrors.title = 'العنوان مطلوب';
    if (!newsData.writer.trim()) newErrors.writer = 'اسم الكاتب مطلوب';
    if (!newsData.content.trim()) newErrors.content = 'المحتوى مطلوب';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await instanceAxios.put(`/api/news/${id}`, newsData);
      console.log('تم التحديث:', response.data);
      navigate('/news-list');
    } catch (error) {
      setErrors({ submit: 'فشل في تحديث الخبر' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5" dir="rtl">
      <h3 className="text-center mb-4">تعديل الخبر</h3>
      {errors.fetch && <div className="alert alert-danger">{errors.fetch}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>عنوان الخبر *</label>
          <input
            type="text"
            name="title"
            value={newsData.title}
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            onChange={handleChange}
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        <div className="mb-3">
          <label>التصنيف</label>
          <select
            name="category"
            className="form-select"
            value={newsData.category}
            onChange={handleChange}
          >
            <option value="">اختر تصنيفاً</option>
            <option value="الصحة">الصحة</option>
            <option value="الرياضة">الرياضة</option>
            <option value="الطقس">الطقس</option>
            <option value="الكوارث">الكوارث</option>
          </select>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isBreaking"
            name="isBreaking"
            checked={newsData.isBreaking}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="isBreaking">
            هل الخبر عاجل؟
          </label>
        </div>

        <div className="mb-3">
          <label>المنطقة</label>
          <select
            name="region"
            className="form-select"
            value={newsData.region}
            onChange={handleChange}
          >
            <option value="">اختر المنطقة</option>
            <option value="مصر">مصر</option>
            <option value="سوريا">سوريا</option>
            <option value="غزة">غزة</option>
          </select>
        </div>

        <div className="mb-3">
          <label>اسم الكاتب *</label>
          <input
            type="text"
            name="writer"
            className={`form-control ${errors.writer ? 'is-invalid' : ''}`}
            value={newsData.writer}
            onChange={handleChange}
          />
          {errors.writer && <div className="invalid-feedback">{errors.writer}</div>}
        </div>

        <div className="mb-3">
          <label>رابط الصورة أو الفيديو</label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={newsData.image}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>محتوى الخبر *</label>
          <textarea
            name="content"
            className={`form-control ${errors.content ? 'is-invalid' : ''}`}
            rows="5"
            value={newsData.content}
            onChange={handleChange}
          />
          {errors.content && <div className="invalid-feedback">{errors.content}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'جاري التحديث...' : 'تحديث الخبر'}
        </button>
      </form>
    </div>
  );
};

export default EditNews;
