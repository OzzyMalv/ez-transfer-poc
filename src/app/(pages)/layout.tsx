import React, { ReactNode, ReactElement } from "react";
import LayoutAppRouter from "@/components/layoutAppRouter";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <LayoutAppRouter>{children as ReactElement}</LayoutAppRouter>;
}
