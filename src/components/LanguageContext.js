import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    app_title: "SmartBus System",
    nav_home: "Home",
    nav_about: "About",
    nav_contact: "Contact",
    // (Keep your chatbot translations here as well)
  },
  mr: {
    app_title: "स्मार्टबस प्रणाली",
    nav_home: "मुख्यपृष्ठ",
    nav_about: "आमच्याबद्दल",
    nav_contact: "संपर्क",
    // (Keep your chatbot translations here as well)
  },
  hi: {
    app_title: "स्मार्टबस प्रणाली",
    nav_home: "होम",
    nav_about: "हमारे बारे में",
    nav_contact: "संपर्क",
    // (Keep your chatbot translations here as well)
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en'); 

  const t = (key) => {
    return translations[lang][key] || key; 
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);