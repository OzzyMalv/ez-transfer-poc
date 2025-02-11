import type { Metadata } from "next";
import WorkspacesBody from "@/app/(body)/workspaces/WorkspacesBody";

export const metadata: Metadata = {
  title: "Workspaces",
  description: "Workspaces",
  robots: "noindex nofollow",
};

const WorkspacesPage = () => {
  return <WorkspacesBody />;
};

export default WorkspacesPage;
