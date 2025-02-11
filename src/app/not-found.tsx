import type { Metadata } from "next";

import NotFoundBody from "./(body)/notFound/NotFoundBody";
import LayoutNotFound from "@/components/layoutNotFound";

export const metadata: Metadata = {
  title: "Not Found",
  description: `Page not found`,
  robots: "noindex",
};

const ExpiredPage = () => {
  return (
    <main>
      <LayoutNotFound>
        <NotFoundBody />
      </LayoutNotFound>
    </main>
  );
};

export default ExpiredPage;
