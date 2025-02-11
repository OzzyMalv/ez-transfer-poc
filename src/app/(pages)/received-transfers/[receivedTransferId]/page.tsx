import type { Metadata } from "next";
import { ENV_CONSTANTS } from "@/common/constants/env.const";
import ReceivedTransferBody from "@/app/(body)/received-transfers/received-transfer/ReceivedTransferBody";

export const metadata: Metadata = {
  title: "Peach Go | Received Transfer",
  description: "Received Transfer",
  openGraph: {
    title: "Peach Go | Received Transfer",
    description: "Received Transfer",
    images: [
      {
        url: `${ENV_CONSTANTS.BASEURL}/img/peach-go-og.png`,
        width: 1200,
        height: 630,
        alt: "Peach Go",
      },
    ],
    url: "https://go.peach.me/received-transfers",
  },
  robots: "noindex nofollow",
};

const ReceivedTransferPage = () => {
  return <ReceivedTransferBody />;
};

export default ReceivedTransferPage;
