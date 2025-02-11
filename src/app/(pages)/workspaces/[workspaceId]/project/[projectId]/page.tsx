import type { Metadata } from "next";
import ProjectBody from "@/app/(body)/project/ProjectBody";

export const metadata: Metadata = {
  title: "Project",
  description: "Project",
  robots: "noindex nofollow",
};

const WorkspacesPage = () => {
  return <ProjectBody />;
};

export default WorkspacesPage;
