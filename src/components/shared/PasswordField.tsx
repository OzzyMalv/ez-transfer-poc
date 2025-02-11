import TextField from "@mui/material/TextField";
import { ChangeEvent, FC, useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface Props {
  text: string;
  handleChange?: (text: string) => void;
  disabled?: boolean;
  label?: string;
  placeHolder?: string;
  variant?: "standard" | "filled" | "outlined";
}

const PasswordField: FC<Props> = ({
  text,
  handleChange,
  disabled = false,
  label = "",
  placeHolder = "",
  variant = "outlined",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (handleChange) {
      handleChange(e.target.value);
    }
  };
  return (
    <TextField
      sx={{
        "input::-ms-reveal": {
          display: "none",
        },
        "& .MuiInputBase-root": { padding: 0 },
        input: {
          textSecurity: showPassword ? "none" : "disc",
          WebkitTextSecurity: showPassword ? "none" : "disc",
          MozTextSecurity: showPassword ? "none" : "disc",
        },
      }}
      autoComplete="off"
      name="code"
      variant={variant}
      disabled={disabled}
      label={label}
      data-testid="dti-password-input"
      type="text"
      placeholder={placeHolder}
      onChange={onChange}
      value={text}
      data-analytics="password-input"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((show) => !show)}
              edge="start"
              data-analytics="password-toggle"
              data-testid="dti-password-toggle"
              sx={{ marginRight: 0.5 }}
            >
              {showPassword ? (
                <Visibility sx={{ fontSize: 16 }} />
              ) : (
                <VisibilityOff sx={{ fontSize: 16 }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
