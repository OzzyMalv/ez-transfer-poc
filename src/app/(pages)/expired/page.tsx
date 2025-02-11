import type { Metadata } from "next";
import ExpiredPageBody from "@/app/(body)/expired/ExpiredPageBody";
import { ENV_CONSTANTS } from "@/common/constants/env.const";

export const metadata: Metadata = {
  title: "Peach Go | Expired",
  description: "",
  openGraph: {
    title: "Peach Go | Expired",
    description: "Expired",
    images: [
      {
        url: `${ENV_CONSTANTS.BASEURL}/img/peach-go-og.png`,
        width: 1200,
        height: 630,
        alt: "Peach Go",
      },
    ],
    url: `https://go.peach.me/expired`,
  },
  robots: "noindex",
};

const ExpiredPage = () => {
  return <ExpiredPageBody />;
};

export default ExpiredPage;
