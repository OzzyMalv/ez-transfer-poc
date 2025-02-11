import { IconButton, useMediaQuery } from "@mui/material";
import theme from "@/styles/theme";

interface IconButtonAdaptiveProps {
  icon: JSX.Element;
  iconForTabletMobile: JSX.Element;
  onClick: () => void;
}

const IconButtonAdaptive: React.FC<IconButtonAdaptiveProps> = ({
  icon,
  iconForTabletMobile,
  onClick,
}) => {
  const isMobileOrTableDevice = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <IconButton
      data-testid="dti-receiver-close-detailed-icon-btn"
      data-analytics="receiver-close-detailed-icon-btn"
      onClick={onClick}
      color="primary"
      sx={{
        backgroundColor: theme.palette.black[100],
        "&.Mui-disabled": {
          backgroundColor: theme.palette.black[100],
          "& svg": {
            opacity: 0.25,
          },
        },
      }}
    >
      {isMobileOrTableDevice ? iconForTabletMobile : icon}
    </IconButton>
  );
};

export default IconButtonAdaptive;
