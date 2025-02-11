"use client";

import React, { useState } from "react";
import { FieldValues } from "react-hook-form/dist/types";
import { IconButton, InputAdornment } from "@mui/material";
import FormTextInput, {
  FormTextInputProps,
} from "@/components/shared/form/FormTextInput";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export type PasswordInputProps<T extends FieldValues> =
  FormTextInputProps<T> & {
    // custom props for password
    inputType?: "text" | "password";
    iconColor?: string;
  };

const PasswordInput = <TFieldValues extends FieldValues = FieldValues>({
  inputType = "password",
  iconColor,
  ...props
}: PasswordInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormTextInput
      sx={{
        "input::-ms-reveal": {
          display: "none",
        },
        "& .MuiInputBase-root": { paddingRight: "8px" },
        input: {
          textSecurity: showPassword ? "none" : "disc",
          WebkitTextSecurity: showPassword ? "none" : "disc",
          MozTextSecurity: showPassword ? "none" : "disc",
        },
      }}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="start"
              data-analytics="password-toggle"
              data-testid="dti-password-toggle"
              sx={{ color: iconColor || "initial" }}
            >
              {showPassword ? (
                <Visibility fontSize="small" />
              ) : (
                <VisibilityOff fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      type={
        inputType === "password" ? (showPassword ? "text" : "password") : "text"
      }
    />
  );
};

export default PasswordInput;
