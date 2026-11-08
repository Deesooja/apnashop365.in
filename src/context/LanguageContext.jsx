import { useCallback, useMemo, useState } from 'react';
import messages from '../config/i18n';
import siteConfig from '../config/siteConfig';
import LanguageContext from './language-context';

const STORAGE_KEY = 'apnashop365_lang';

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'hi') return saved;
  } catch {
    // ignore
  }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  const setLang = useCallback((next) => {
    const value = next === 'hi' ? 'hi' : 'en';
    setLangState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'hi' : 'en');
  }, [lang, setLang]);

  const t = useCallback(
    (key) => {
      const table = messages[lang] || messages.en;
      return table[key] ?? messages.en[key] ?? key;
    },
    [lang],
  );

  /** Resolve { en, hi } config fields */
  const localize = useCallback(
    (field) => {
      if (field == null) return '';
      if (typeof field === 'string') return field;
      return field[lang] || field.en || '';
    },
    [lang],
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang,
      t,
      localize,
      brandName: siteConfig.brandName,
    }),
    [lang, setLang, toggleLang, t, localize],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
