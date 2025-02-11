import type { Metadata } from "next";
import { ENV_CONSTANTS } from "@/common/constants/env.const";
import ReceivedFilePreview from "@/app/(body)/preview/ReceivedFilePreview";

export const metadata: Metadata = {
  title: "Peach Go | Transfer Preview",
  description: "Transfer Preview",
  openGraph: {
    title: "Peach Go | Transfer Preview",
    description: "Transfer Preview",
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
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
      />
      <ReceivedFilePreview />
    </>
  );
};

export default ReceivedTransferPage;
