"use client";
import theme from "@/styles/theme";
import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        marginTop: { md: theme.spacing(-10) },
      }}
    >
      {children}
    </Box>
  );
}
