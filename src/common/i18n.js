import i18n from "i18next";

i18n.init({
    resources: {
        en: {
            translation: {
                en: "English",
                zh: "简体中文",
                tl_allAccounts: "All Accounts",
                bt_createAccount: "Create Account",
                bt_restoreAccount: "Restore Account",
                tl_setting: "Setting",
                tl_language: "Language",
                tl_terms: "Terms of Use"
            }
        },
        zh: {
            translation: {
                en: "English",
                zh: "简体中文",
                tl_allAccounts: "全部账户",
                bt_createAccount: "新建账户",
                bt_restoreAccount: "恢复账户",
                tl_setting: "设置",
                tl_language: "多语言",
                tl_terms: "用户协议"
            }
        }
    },
    fallbackLng: 'en',

}).then(r => r);

export default i18n;