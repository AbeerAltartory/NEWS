// SearchContext.js
import { createContext, useContext, useState } from 'react'; // ✅ اضفنا useContext

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

// ✅ hook مخصص لاستخدام الكونتكست بسهولة
export const useSearch = () => useContext(SearchContext);
