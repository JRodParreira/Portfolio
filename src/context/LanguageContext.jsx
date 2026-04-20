import React, { createContext, useState, useContext } from 'react';
import { translations } from '../components/translations';
export const useLanguage = () => useContext(LanguageContext);
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // 'en' ou 'pt'

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[language];
    keys.forEach(key => { result = result?.[key]; });
    return result || path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
