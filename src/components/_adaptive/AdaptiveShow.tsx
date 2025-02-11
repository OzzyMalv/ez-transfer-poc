"use client";
import { useMediaQuery } from "@mui/material";
import theme from "@/styles/theme";

interface IAdaptiveShowProps {
  mobileComponent: JSX.Element | null;
  desktopComponent: JSX.Element | null;
}

const AdaptiveShow: React.FC<IAdaptiveShowProps> = ({
  mobileComponent,
  desktopComponent,
}) => {
  const isMobileOrTableDevice = useMediaQuery(theme.breakpoints.down("md"));

  if (!isMobileOrTableDevice) {
    return desktopComponent;
  }

  return mobileComponent;
};

export default AdaptiveShow;
