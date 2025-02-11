"use client";
import { IconButton, IconButtonProps, useMediaQuery } from "@mui/material";
import theme from "@/styles/theme";
import { MouseEvent } from "react";

type IconButtonMobileProps<C extends React.ElementType = "button"> =
  IconButtonProps<C, { component?: C }> & {
    icon: JSX.Element;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  };

/**
 * Will appear only on mobile or tablet
 * @param icon
 * @param onClick
 */
const IconButtonMobile: React.FC<IconButtonMobileProps> = ({
  icon,
  onClick,
  ...props
}) => {
  const isMobileOrTableDevice = useMediaQuery(theme.breakpoints.down("md"));

  if (!isMobileOrTableDevice) {
    return null;
  }

  return (
    <IconButton size="small" onClick={onClick} {...props}>
      {icon}
    </IconButton>
  );
};

export default IconButtonMobile;
