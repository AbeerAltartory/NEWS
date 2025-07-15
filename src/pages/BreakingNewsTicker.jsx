// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// const BreakingNewsTicker = () => {
//   const [news] = useState([
//     " 1500 شرطي لحماية مباراة فريق السنة الجديدة",
//     "عاصفة ثلجية قوية تضرب شمال البلاد",
//     "انخفاض قياسي في درجات الحرارة هذا الأسبوع"
//   ]);
//   const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [news.length]);

//   const styles = {
//     container: {
//       display: 'flex',
//       alignItems: 'center',
//       backgroundColor: '#ff0000',
//       color: 'white',
//       padding: '15px',
//       fontWeight: 'bold',
//       fontSize: '1.1rem',
//       borderRadius: '4px',
//       margin: '40px 0',
//       overflow: 'hidden',
//       boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
//       width: '100%',
//     },
//     label: {
//       display: 'flex',
//       fontWeight: 'bold',
//       fontSize: '1.4rem',
//       alignItems: 'right',
//       backgroundColor: '#cc0000',
//       padding: '0 50px',
//       marginRight: '15px',
//       borderRadius: '4px',
//       whiteSpace: 'nowrap',
//     },
//     content: {
//       flexGrow: 1,
//       overflow: 'hidden',
//       height: '30px',
//       position: 'relative',
//       display: 'flex',
//       alignItems: 'center',
//     },
//     text: {
//       display: 'inline-block',
//       whiteSpace: 'nowrap',
//       animation: 'scrollText 15s linear infinite',
//     },
//     icon: {
//       marginRight: '8px',
//       animation: 'pulse 1.5s infinite',
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.label}>
//         <span>أخبار عاجلة</span>
//       </div>
//       <div style={styles.content}>
//         <div style={styles.text}>
//           {news.map((item, index) => (
//             <span key={index} style={{ marginLeft: '50px' }}>
//               {item}
//             </span>
//           ))}
//         </div>
//       </div>


//       <style>
//         {`
//           @keyframes scrollText {
//             0% { transform: translateX(100%); }
//             100% { transform: translateX(-100%); }
//           }
//           @keyframes pulse {
//             0% { transform: scale(1); }
//             50% { transform: scale(1.2); }
//             100% { transform: scale(1); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default BreakingNewsTicker;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BreakingNewsTicker = ({ newsItems = [] }) => {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#ff0000',
      color: 'white',
      padding: '15px',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      borderRadius: '4px',
      margin: '20px 0',
      overflow: 'hidden',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      width: '100%',
    },
    label: {
      display: 'flex',
      fontWeight: 'bold',
      fontSize: '1.4rem',
      alignItems: 'center',
      backgroundColor: '#cc0000',
      padding: '0 50px',
      marginRight: '15px',
      borderRadius: '4px',
      whiteSpace: 'nowrap',
    },
    content: {
      flexGrow: 1,
      overflow: 'hidden',
      height: '30px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    text: {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      animation: 'scrollText 20s linear infinite',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.label}>
        <span>أخبار عاجلة</span>
      </div>
      <div style={styles.content}>
        <div style={styles.text}>
          {newsItems.map((item, index) => (
            <span key={index} style={{ marginLeft: '50px' }}>
              {item.title}
            </span>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
};

export default BreakingNewsTicker;
