import { NextResponse } from "next/server";

export function middleware() {
  const response = NextResponse.next();

  // Define your existing security policies
  const connectUrls = [
    "https://r.logr-ingest.com",
    "*.amazonaws.com",
    "*.raygun.io",
    "*.raygun.com",
    "https://heapanalytics.com",
    "*.auryc.com",
    "https://beacon.speedcurve.com/store",
    "https://lux.speedcurve.com/store",
    "*.visualwebsiteoptimizer.com",
    "app.vwo.com",
    "*.contentsquare.net",
    "https://cdn.jsdelivr.net",
    "https://unpkg.com",
    "*.pexels.com",
  ];
  const safeScripts = [
    "https://cdn.speedcurve.com",
    "https://cdn.lrkt-in.com",
    "https://cdn.raygun.io",
    "*.heapanalytics.com",
    "https://heapanalytics.com",
    "https://cdn.logr-ingest.com",
    "*.visualwebsiteoptimizer.com",
    "app.vwo.com",
    "https://js.stripe.com",
    "*.contentsquare.net",
  ];
  const safeImages = [
    "https://heapanalytics.com",
    "https://lux.speedcurve.com",
    "*.visualwebsiteoptimizer.com",
    "chart.googleapis.com",
    "wingify-assets.s3.amazonaws.com",
    "app.vwo.com",
    "*.contentsquare.net",
    "https://useruploads.vwo.io",
    "*.pexels.com",
  ];
  const safeFonts = [
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    "https://heapanalytics.com",
    "*.auryc.com",
    "data:",
  ];
  const safeStyles = [
    "https://heapanalytics.com",
    "https://fonts.googleapis.com",
    "s3.amazonaws.com",
    "*.visualwebsiteoptimizer.com",
    "app.vwo.com",
  ];
  const safeFrames = [
    "app.vwo.com",
    "*.visualwebsiteoptimizer.com",
    "https://js.stripe.com/",
  ];

  // Build Content Security Policy header
  const cspHeader = `
  default-src 'self';
  media-src 'self' ${connectUrls.join(" ")};
  script-src 'self' 'unsafe-inline' 'unsafe-eval' ${safeScripts.join(" ")};
  worker-src 'self' blob:;
  style-src 'self' 'unsafe-inline' ${safeStyles.join(" ")};
  font-src 'self' ${safeFonts.join(" ")};
  object-src 'none';
  img-src 'self' ${safeImages.join(" ")};
  connect-src 'self' ${connectUrls.join(" ")}; 
  frame-src ${safeFrames.join(" ")};
  `;

  // Set security headers
  const responseHeaders = response.headers;
  responseHeaders.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload",
  );
  responseHeaders.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=(), accelerometer=(), camera=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), screen-wake-lock=(), usb=()",
  );
  responseHeaders.set("Referrer-Policy", "same-origin");
  responseHeaders.set("X-XSS-Protection", "1; mode=block");
  responseHeaders.set("X-Content-Type-Options", "nosniff");
  responseHeaders.set("X-Frame-Options", "SAMEORIGIN");
  responseHeaders.set(
    "Content-Security-Policy",
    cspHeader.replace(/\s{2,}/g, " ").trim(),
  );

  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|img|Patron|favicon.ico|favicon|robots.txt).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
