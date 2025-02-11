import React from "react";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import theme from "@/styles/theme";

interface OptionProps {
  text: string;
  action?: (...args: never[]) => unknown;
}

interface OptionsMenuProps extends MenuProps {
  options: OptionProps[];
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ options, ...props }) => {
  return (
    <Menu
      elevation={0}
      MenuListProps={{
        sx: {
          backgroundColor: theme.palette.grey[800],
          elevation: 0,
          boxShadow: "none",
          color: theme.palette.grey[100],
        },
      }}
      {...props}
    >
      {options.map((option: OptionProps) => (
        <MenuItem key={option.text} onClick={option.action}>
          <Typography variant="body2">{option.text}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default OptionsMenu;
