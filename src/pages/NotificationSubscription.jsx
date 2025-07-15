import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';

const NotificationSubscription = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleSubscribe = () => {
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed-bottom mb-4 mx-auto" style={{ maxWidth: '500px', left: 0, right: 0 }}>
      <div className="bg-white p-4 rounded shadow-lg position-relative" style={{ border: '1px solid #ddd' }}>
        <button 
          onClick={handleClose}
          className="position-absolute top-0 end-0 btn btn-sm"
          style={{ color: '#666' }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        
        <div className="d-flex align-items-center mb-3">
          <FontAwesomeIcon 
            icon={faBell} 
            className="me-3 text-primary" 
            size="2x" 
          />
          <h5 className="mb-0">اشترك في خدمة الإشعارات من لمحة News </h5>
        </div>
        
        <p className="mb-3">ليصلك آخر الأخبار فور وقوعها</p>
        
        <div className="d-flex justify-content-between align-items-center"> 
          <a href="/user-login">
          <button 
            onClick={handleSubscribe}
            className="btn btn-primary px-4"
          >
            اشترك
          </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotificationSubscription;