import { useLanguage } from "@/context/LanguageContext";
import { en, Translations } from "@/locales/en";
import { cs } from "@/locales/cs";

const translations = {
  en,
  cs,
};

export function useTranslation() {
  const { language } = useLanguage();
  
  const t = (key: keyof Translations) => {
    return translations[language][key];
  };

  return { t, language };
}
