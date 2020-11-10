import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import XHR from 'i18next-xhr-backend';
import en from './locale/en/en.json';
import fr from './locale/fr/fr.json';

const locale = localStorage.getItem('i18nextLng');

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      fr: fr,
    },
    lng: locale !== null ? locale : 'en',
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      nsMode: 'default',
    },
  });

export { i18n };
