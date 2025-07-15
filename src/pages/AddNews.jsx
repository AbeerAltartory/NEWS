import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import instanceAxios from '../components/Axios/Axios';

const AddNews = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    category: '',
    writer: '',
    image: '',
    content: '',
    region: '',
    isBreaking: false, // ✅ جديد
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'العنوان مطلوب';
    if (!formData.writer.trim()) newErrors.writer = 'اسم الكاتب مطلوب';
    if (!formData.content.trim()) newErrors.content = 'المحتوى مطلوب';

    if (formData.image && !/^https?:\/\/.+/.test(formData.image)) {
      newErrors.image = 'رابط الصورة غير صالح';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    const idform = window.localStorage.getItem('id');
    const newFormData = new FormData();
    newFormData.append('userId', idform || '');
    newFormData.append('title', formData.title);
    newFormData.append('category', formData.category);
    newFormData.append('writer', formData.writer);
    newFormData.append('image', formData.image);
    newFormData.append('content', formData.content);
    newFormData.append('region', formData.region);
    newFormData.append('isBreaking', formData.isBreaking); // ✅ مضافة

    console.log('FormData prepared:', Array.from(newFormData.entries()));

    try {
      const response = await instanceAxios.post('/api/news/create', newFormData);
      console.log('تم نشر الخبر بنجاح:', response.data);
      navigate('/news-list');
    } catch (error) {
      console.error('فشل إرسال البيانات:', error);
      setErrors({ submit: error.response?.data?.message || 'حدث خطأ أثناء نشر الخبر' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Navigating to home');
    navigate('/');
  };

  return (
    <div dir="rtl" className="container text-right mt-5">
      <div className="text-end mb-4">
        <h3 className="text-right">مرحباً</h3>
        <p>{window.localStorage.getItem('fullName') || 'غير متوفر'}</p>
      </div>

      <div className="card shadow-sm p-4 mb-5">
        <h4 className="mb-4 text-center">نموذج إضافة خبر</h4>
        {errors.submit && (
          <div className="alert alert-danger text-center">{errors.submit}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">عنوان الخبر *</label>
            <input
              type="text"
              name="title"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">التصنيف *</label>
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">اختر تصنيفاً</option>
              <option value="الصحة">الصحة</option>
              <option value="الرياضة">الرياضة</option>
              <option value="الطقس">الطقس</option>
              <option value="الكوارث">الكوارث</option>
            </select>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="isBreaking"
              name="isBreaking"
              checked={formData.isBreaking}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isBreaking">
              هل الخبر عاجل؟
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">المنطقة *</label>
            <select
              name="region"
              className="form-select"
              value={formData.region}
              onChange={handleChange}
            >
              <option value="">اختر المنطقة</option>
              <option value="مصر">مصر</option>
              <option value="سوريا">سوريا</option>
              <option value="غزة">غزة</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">اسم الكاتب *</label>
            <input
              type="text"
              name="writer"
              className={`form-control ${errors.writer ? 'is-invalid' : ''}`}
              value={formData.writer}
              onChange={handleChange}
            />
            {errors.writer && <div className="invalid-feedback">{errors.writer}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">صورة أو فيديو</label>
            <input
              type="text"
              name="image"
              className={`form-control ${errors.image ? 'is-invalid' : ''}`}
              value={formData.image}
              onChange={handleChange}
              placeholder="رابط الصورة أو الفيديو"
            />
            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">محتوى الخبر *</label>
            <textarea
              name="content"
              className={`form-control ${errors.content ? 'is-invalid' : ''}`}
              value={formData.content}
              onChange={handleChange}
              rows="5"
            />
            {errors.content && <div className="invalid-feedback">{errors.content}</div>}
          </div>


          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-danger px-4"
              onClick={handleCancel}
              disabled={isLoading}
            >
              إلغاء
            </button>
            <button type="submit" className="btn btn-success px-4" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  جاري النشر...
                </>
              ) : (
                'نشر الخبر'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
