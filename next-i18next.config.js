const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  react: {
    useSuspense: false,
  },
  localePath:
    typeof window === "undefined"
      ? path.resolve("./public/locales")
      : "/locales",
};
