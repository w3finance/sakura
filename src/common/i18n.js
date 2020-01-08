import i18n from "i18next";

i18n.init({
    resources: {
        en: {
            translation: {
                en: "English",
                createAccount: "Create Account",
                restoreAccount: "Restore Account"
            }
        },
        zh: {
            translation: {
                en: "英语",
                createAccount: "新建账户",
                restoreAccount: "恢复账户"
            }
        }
    },
    fallbackLng: 'en',

}).then(r => r);

export default i18n;