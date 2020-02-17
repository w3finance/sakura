import i18n from "i18next";

i18n.init({
    resources: {
        en: {
            translation: {
                en: "English",
                tl_allAccounts: "All Accounts",
                bt_createAccount: "Create Account",
                bt_restoreAccount: "Restore Account",
                tl_setting: "Setting"
            }
        },
        zh: {
            translation: {
                en: "英语",
                tl_allAccounts: "全部账户",
                bt_createAccount: "新建账户",
                bt_restoreAccount: "恢复账户",
                tl_setting: "设置"
            }
        }
    },
    fallbackLng: 'en',

}).then(r => r);

export default i18n;