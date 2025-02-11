/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  i18n,
  compiler: {
    emotion: true,
  },
  crossOrigin: "anonymous",
  transpilePackages: ["@mui/material/"],
  images: {
    domains: ["images.pexels.com", "videos.pexels.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "",
      },
      {
        protocol: "https",
        hostname: "",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SETTINGS: process.env.NEXT_PUBLIC_SETTINGS,
    NEXT_PUBLIC_API_BASEURL: process.env.NEXT_PUBLIC_API_BASEURL,
    NEXT_PUBLIC_API_BASE_URL_V2: process.env.NEXT_PUBLIC_API_BASE_URL_V2,
    NEXT_PUBLIC_BASEURL: process.env.NEXT_PUBLIC_BASEURL,
    NEXT_PUBLIC_MAXIMUM_ACTIVE_UPLOADS:
      process.env.NEXT_PUBLIC_MAXIMUM_ACTIVE_UPLOADS,
    NEXT_PUBLIC_DEFAULT_API_BEARER_TOKEN:
      process.env.NEXT_PUBLIC_DEFAULT_API_BEARER_TOKEN,
    NEXT_PUBLIC_LOGROCKET_APP_ID:
      process.env.NEXT_PUBLIC_LOGROCKET_APP_ID || "",
    NEXT_PUBLIC_LOGROCKET_ENABLED: process.env.NEXT_PUBLIC_LOGROCKET_ENABLED,
    NEXT_PUBLIC_IS_RAYGUN_ENABLED: process.env.NEXT_PUBLIC_IS_RAYGUN_ENABLED,
    NEXT_PUBLIC_RAYGUN_API_KEY: process.env.NEXT_PUBLIC_RAYGUN_API_KEY,
    NEXT_PUBLIC_SPEEDCURVE_ENABLED: process.env.NEXT_PUBLIC_SPEEDCURVE_ENABLED,
    NEXT_PUBLIC_IS_HEAP_ENABLED: process.env.NEXT_PUBLIC_IS_HEAP_ENABLED || "",
    NEXT_PUBLIC_HEAP_APP_ID: process.env.NEXT_PUBLIC_HEAP_APP_ID || "",
    NEXT_PUBLIC_HEAP_INTERNAL_DOMAINS:
      process.env.NEXT_PUBLIC_HEAP_INTERNAL_DOMAINS || "",
    NEXT_PUBLIC_HEAP_INTERNAL_USERS:
      process.env.NEXT_PUBLIC_HEAP_INTERNAL_USERS || "",
    NEXT_PUBLIC_SEO_ENABLED: process.env.NEXT_PUBLIC_SEO_ENABLED,
    NEXT_PUBLIC_TOKEN_REFRESH_WINDOW_MINUTES:
      process.env.NEXT_PUBLIC_TOKEN_REFRESH_WINDOW_MINUTES,
    NEXT_PUBLIC_SPEEDCURVE_INTEGRITY:
      process.env.NEXT_PUBLIC_SPEEDCURVE_INTEGRITY || "",
    NEXT_PUBLIC_FEATURE_ANALYSIS_TRIAL_LABEL_ENABLED:
      process.env.NEXT_PUBLIC_FEATURE_ANALYSIS_TRIAL_LABEL_ENABLED || "",
    NEXT_PUBLIC_FEATURE_SSO_ENABLED:
      process.env.NEXT_PUBLIC_FEATURE_SSO_ENABLED || "",
    NEXT_PUBLIC_IS_AB_OPTIMISATION_ENABLED:
      process.env.NEXT_PUBLIC_IS_AB_OPTIMISATION_ENABLED,
    NEXT_PUBLIC_FEATURE_PRIVATE_WORKSPACE_ENABLED:
      process.env.NEXT_PUBLIC_FEATURE_PRIVATE_WORKSPACE_ENABLED || "",
    NEXT_PUBLIC_PRICING_PAGE_PROMO:
      process.env.NEXT_PUBLIC_PRICING_PAGE_PROMO || "",
    NEXT_PUBLIC_PACKAGE_BASIC_ID:
      process.env.NEXT_PUBLIC_PACKAGE_BASIC_ID || "",
    NEXT_PUBLIC_PACKAGE_SOLO_ID: process.env.NEXT_PUBLIC_PACKAGE_SOLO_ID || "",
    NEXT_PUBLIC_PACKAGE_PRO_ID: process.env.NEXT_PUBLIC_PACKAGE_PRO_ID || "",
    NEXT_PUBLIC_PACKAGE_PREMIUM_ID:
      process.env.NEXT_PUBLIC_PACKAGE_PREMIUM_ID || "",
    NEXT_PUBLIC_PACKAGE_ENTERPRISE_ID:
      process.env.NEXT_PUBLIC_PACKAGE_ENTERPRISE_ID || "",
    NEXT_PUBLIC_PRICE_BASIC_ID: process.env.NEXT_PUBLIC_PRICE_BASIC_ID || "",
    NEXT_PUBLIC_PRICE_SOLO_ID: process.env.NEXT_PUBLIC_PRICE_SOLO_ID || "",
    NEXT_PUBLIC_PRICE_PRO_ID: process.env.NEXT_PUBLIC_PRICE_PRO_ID || "",
    NEXT_PUBLIC_PRICE_PREMIUM_ID:
      process.env.NEXT_PUBLIC_PRICE_PREMIUM_ID || "",
    NEXT_PUBLIC_PRICE_ENTERPRISE_ID:
      process.env.NEXT_PUBLIC_PRICE_ENTERPRISE_ID || "",
    NEXT_PUBLIC_PRICE_BASIC: process.env.NEXT_PUBLIC_PRICE_BASIC || "",
    NEXT_PUBLIC_PRICE_SOLO: process.env.NEXT_PUBLIC_PRICE_SOLO || "",
    NEXT_PUBLIC_PRICE_PRO: process.env.NEXT_PUBLIC_PRICE_PRO || "",
    NEXT_PUBLIC_PRICE_PREMIUM: process.env.NEXT_PUBLIC_PRICE_PREMIUM || "",
    NEXT_PUBLIC_PRICE_ENTERPRISE:
      process.env.NEXT_PUBLIC_PRICE_ENTERPRISE || "",
    NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY || "",
    NEXT_PUBLIC_STRIPE_CHECKOUT_KEY:
      process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_KEY || "",
    NEXT_PUBLIC_STRIPE_TRIAL_PERIOD:
      process.env.NEXT_PUBLIC_STRIPE_TRIAL_PERIOD || 30,
    NEXT_PUBLIC_PEACH_CONTACT_URL: process.env.NEXT_PUBLIC_PEACH_CONTACT_URL,
    NEXT_PUBLIC_PEACH_PRIVACY_UPDATE:
      process.env.NEXT_PUBLIC_PEACH_PRIVACY_UPDATED,
  },
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "@mui/lab": {
      transform: "@mui/lab/{{member}}",
    },
  },
  experimental: {
    turbo: {
      resolveExtensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    },
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
module.exports = withBundleAnalyzer({ ...nextConfig });
