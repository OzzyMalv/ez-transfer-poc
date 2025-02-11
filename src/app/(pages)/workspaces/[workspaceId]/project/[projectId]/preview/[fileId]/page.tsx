import type { Metadata } from "next";
import PreviewBody from "@/app/(body)/preview/PreviewBody";

export const metadata: Metadata = {
  title: "Preview",
  description: "Preview",
  robots: "noindex nofollow",
};

const PreviewPage = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
      />
      <PreviewBody />
    </>
  );
};

export default PreviewPage;
