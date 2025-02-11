import theme from "@/styles/theme";
import { ChevronLeftRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { FC } from "react";

interface IBackButtonProps {
  backHref: string;
  background?: boolean;
}

const BackButton: FC<IBackButtonProps> = ({ backHref, background = true }) => {
  return (
    <IconButton
      sx={{
        backgroundColor: background ? theme.palette.black[50] : "transparent",
        color: "rgba(0, 0, 0, 0.54)",
      }}
      component={Link}
      size="small"
      href={backHref}
    >
      <ChevronLeftRounded fontSize="small" />
    </IconButton>
  );
};

export default BackButton;
