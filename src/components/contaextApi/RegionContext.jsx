import  { createContext, useContext, useState } from "react";

// إنشاء الكونتكست
const RegionContext = createContext();

// إنشاء provider
export const RegionProvider = ({ children }) => {
  const [region, setRegion] = useState("غزة");

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
};

// Hook مخصص للاستخدام بسهولة
export const useRegion = () => useContext(RegionContext);
