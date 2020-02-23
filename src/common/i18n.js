import i18n from "i18next";
import en from "../locales/en";
import zh from "../locales/zh";

i18n.init({
    resources: {
        en: {
            translation: en
        },
        zh: {
            translation: zh
        }
    },
    fallbackLng: 'en',

}).then(r => r);

export default i18n;