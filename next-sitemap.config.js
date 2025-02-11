/** @type {import('next-sitemap').IConfig} */
const isDev = process.env.NEXT_PUBLIC_SETTINGS === "development";
const isNextSeoPublicEnabled = process.env.NEXT_PUBLIC_SEO_ENABLED === "true";

const productionUrl = "";

module.exports = {
  siteUrl: isDev ? `http://localhost:${process.env.port}` : productionUrl,
  exclude: isNextSeoPublicEnabled
    ? [
        routes.UPLOAD,
        `${routes.UPLOAD}/`,
        routes.SUCCESS,
        routes.USER,
        `${routes.USER}/`,
        routes.REGISTER_SUCCESS,
        routes.REGISTER_VERIFY,
      ]
    : ["/*"],
};
