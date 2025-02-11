import type { Metadata } from "next";
import AccountDetailsPageBody from "@/app/(body)/account/AccountDetailsPageBody";

export const metadata: Metadata = {
  title: "Account details",
  description: `Account details`,
  robots: "noindex nofollow",
};

const AccountDetailsPage = () => {
  return <AccountDetailsPageBody />;
};

export default AccountDetailsPage;
