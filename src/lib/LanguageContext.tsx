import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from './i18n';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('aapi_lang') as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('aapi_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (text: string) => {
    if (lang === 'fr') return text;
    return translations[text] || text;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div className={lang === 'ar' ? 'font-arabic text-right' : ''} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
