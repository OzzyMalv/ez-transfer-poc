import type { Metadata } from "next";
import PreferencesPageBody from "@/app/(body)/account/PreferencesPageBody";
import { ENV_CONSTANTS } from "@/common/constants/env.const";

export const metadata: Metadata = {
  title: "Peach Go | Preferences",
  description: `Preferences`,
  openGraph: {
    title: "Peach Go | Preferences",
    description: "Preferences",
    images: [
      {
        url: `${ENV_CONSTANTS.BASEURL}/img/peach-go-og.png`,
        width: 1200,
        height: 630,
        alt: "Peach Go",
      },
    ],
    url: `https://go.peach.me/account`,
  },
  robots: "noindex nofollow",
};

const PreferencesPage = () => {
  return <PreferencesPageBody />;
};

export default PreferencesPage;
