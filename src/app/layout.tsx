import React, { ReactNode, ReactElement, Suspense } from "react";
import { ThemeProvider } from "@mui/material/styles";
import LogRocketWrapper from "../common/utils/LogRocketWrapper";
import { StoreProvider } from "./storeProvider";
import TranslationProvider from "@/providers/translationProvide";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "../../i18n";
import "@/styles/globals.css";
import theme from "@/styles/theme";
import { IBM_Plex_Sans } from "next/font/google";

const IBM_PLEX_SANS = IBM_Plex_Sans({
  weight: ["400", "500"],
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en" className={IBM_PLEX_SANS.className}>
      <head>
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="emotion-insertion-point" content="" />

        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <Suspense>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#5bbad5"
          />
        </Suspense>
      </head>
      <body>
        <StoreProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <LogRocketWrapper>
                <TranslationProvider>
                  {children as ReactElement}
                </TranslationProvider>
              </LogRocketWrapper>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
