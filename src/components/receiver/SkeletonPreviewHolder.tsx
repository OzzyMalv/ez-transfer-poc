"use client";

import { Skeleton } from "@mui/material";
import theme from "@/styles/theme";

const SkeletonPreviewHolder = () => {
  return (
    <Skeleton
      sx={{
        flexShrink: 0,
        width: {
          xs: theme.spacing(4.5),
          md: theme.spacing(10.5),
        },
        height: {
          xs: theme.spacing(4.5),
          md: theme.spacing(7.5),
        },
        borderRadius: {
          xs: theme.spacing(1),
          md: theme.spacing(2),
        },
      }}
      variant="rounded"
      animation="pulse"
    />
  );
};

export default SkeletonPreviewHolder;
