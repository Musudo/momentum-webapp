import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";

// TODO: fix commented out stuff in the future
i18n
    .use(initReactI18next)
    .use(languageDetector)
    .use(backend)
    .init({
        debug: process.env.NODE_ENV === 'development',
        fallbackLng: 'en',
        supportedLngs: ['en', 'nl'],
        // Namespaces (translation file groups); you split your strings by page/form/module—nice
        // ns: [
        //     'Common',
        //     'Dashboard page',
        //     'Activities overview page',
        //     'Contacts overview page',
        //     'Activity form',
        //     'Contact form'
        // ],
        // Default namespace if none is specified in useTranslation() hook
        // defaultNS: 'Common',
        interpolation: {
            // Prevents double-escaping. React already protects from XSS nightmares
            escapeValue: false
        },
        backend: {
            allowMultiLoading: true,
            loadPath: '/locales/{{lng}}/{{ns}}.json'
        },
        // detection: {
            // Determines the order of language detection
            // order: ['querystring', 'cookie', 'localStorage', 'navigator'],
            // Save detected language in a cookie
            // caches: ['cookie']
        // },
        // react: {
            // If true, i18n will suspend rendering until translations are loaded.
            // You've disabled that for now, which is usually fine for small apps.
            // useSuspense: false
        // }
    });

export default i18n;