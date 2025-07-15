import { Link } from 'react-router-dom';
import { useSearch } from './contaextApi/searchContext';
import { useRegion } from "../components/contaextApi/RegionContext";
import { motion } from "framer-motion";

const HeaderTwo = ({ links = [], onBack }) => {
  const { searchTerm, setSearchTerm } = useSearch();
  const { region } = useRegion();

  return (
    <div
      className="p-3 mb-4"
      style={{
        backgroundColor: '#fbfbf8ff',
        width: '100%',
        boxShadow: '0 4px 8px rgba(0, 121, 107, 0.2)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        gap: '20px',
      }}
    >
      {/* ✅ زر العودة إذا تم تمريره */}
      {onBack && (
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="btn  btn-sm"
          style={{ whiteSpace: 'nowrap', fontWeight: 'bold',fontSize:'20px' }}
        >
           →  العودة
        </motion.button>
      )}

      {/* ✅ الروابط */}
      <div style={{ whiteSpace: 'nowrap' }}>
        {links.map((link, index) => {
          const isLast = index === links.length - 1;
          const hideRegionFor = ["تسجيل دخول", "إنشاء حساب", "العودة"];
          return (
            <span key={index}>
              <Link
                to={link.href}
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  fontSize: '20px',
                  marginRight: '10px',
                  fontWeight: 'bold',
                }}
              >
                {link.label}
                {isLast && !hideRegionFor.includes(link.label) && ` - ${region}`}
              </Link>
              {index < links.length - 1 && ' / '}
            </span>
          );
        })}
      </div>

    </div>
  );
};

export default HeaderTwo;
