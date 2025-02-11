"use client";
import { IconButton, IconButtonProps, useMediaQuery } from "@mui/material";
import theme from "@/styles/theme";

type IconButtonDesktopProps<C extends React.ElementType = "button"> =
  IconButtonProps<C, { component?: C }> & {
    icon: JSX.Element;
  };

/**
 * Will appear only on desktop
 * @param icon
 * @param onClick
 */
const IconButtonDesktop = <C extends React.ElementType>({
  icon,
  ...props
}: IconButtonDesktopProps<C>) => {
  const isMobileOrTableDevice = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobileOrTableDevice) {
    return null;
  }

  return (
    <IconButton size="small" {...props}>
      {icon}
    </IconButton>
  );
};

export default IconButtonDesktop;
