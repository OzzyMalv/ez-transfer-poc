const i18n = require("i18next");
const { initReactI18next } = require("react-i18next/initReactI18next");
const resources = require("./public/locales");

const options = {
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
};

i18n.use(initReactI18next).init(options);

module.exports = i18n;
