import type { Metadata } from "next";
import { ENV_CONSTANTS } from "@/common/constants/env.const";
import ReceivedTransfersBody from "../../(body)/received-transfers/ReceivedTransfersBody";

export const metadata: Metadata = {
  title: "Peach Go | Received Transfers",
  description: "Received Transfers",
  openGraph: {
    title: "Peach Go | Received Transfers",
    description: "Received Transfers",
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

const ReceivedTransfersPage = () => {
  return <ReceivedTransfersBody />;
};

export default ReceivedTransfersPage;
