import type { Metadata } from "next";
import { ENV_CONSTANTS } from "@/common/constants/env.const";
import WorkspacesBody from "@/app/(body)/workspaces/WorkspacesBody";

export const metadata: Metadata = {
  title: "Ez Transfer",
  description: `QA assets`,
  robots: ENV_CONSTANTS.IS_SEO_ENABLED ? "index" : "noindex nofollow",
};

export default async function Home() {
  return <WorkspacesBody />;
}
