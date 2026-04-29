import { createContext, useContext, useEffect, useState } from 'react';
import type { LangKey, LangData } from '../i18n/translations';
import { translations } from '../i18n/translations';

const STORAGE_KEY = 'stc_lang';

interface LanguageContextValue {
  lang: LangKey;
  setLang: (l: LangKey) => void;
  t: LangData;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'es',
  setLang: () => {},
  t: translations.es,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<LangKey>('es');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LangKey | null;
      if (saved === 'es' || saved === 'en') {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch { /* noop */ }
  }, []);

  const setLang = (next: LangKey) => {
    setLangState(next);
    document.documentElement.lang = next;
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* noop */ }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
