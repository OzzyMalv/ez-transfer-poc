import type { Metadata } from "next";
import ErrorPageBody from "@/app/(body)/error/ErrorPageBody";

export const metadata: Metadata = {
  title: "Error!",
  description: "Something went wrong",
  robots: "noindex",
};

const ErrorPage = () => {
  return <ErrorPageBody />;
};

export default ErrorPage;
