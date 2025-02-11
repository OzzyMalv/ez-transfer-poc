"use client";

import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import theme from "@/styles/theme";
import { Control, useFormState } from "react-hook-form";
import Image from "next/image";
import { CancelRounded, CheckCircleRounded } from "@mui/icons-material";
import { SignUpSchemaType } from "@/components/signUpForm/signUpValidation";

interface IPasswordHintsProps<T extends SignUpSchemaType = SignUpSchemaType> {
  control: Control<T>;
}
const PasswordHints: FC<IPasswordHintsProps> = ({ control }) => {
  const { t } = useTranslation("formValidation");
  const { errors, dirtyFields } = useFormState({
    control,
    name: "password",
  });

  const currentErrors = (errors?.password?.types?.invalid_string ||
    []) as string[];

  const currentErrorMessage = errors?.password?.message || "";

  const showStatusIcon = (validationMessage: string) => {
    const isInAdditionalChecks = currentErrors.includes(validationMessage);
    const isInCurrentMessage = validationMessage === currentErrorMessage;

    // when field isn't changed and message are empty
    if (!dirtyFields.password && !currentErrorMessage) {
      return (
        <Box marginRight={2.5} marginLeft={0.5}>
          <Image
            src="/img/status-badge.svg"
            width={8}
            height={8}
            alt={"status"}
          />
        </Box>
      );
    }

    if (isInAdditionalChecks || isInCurrentMessage) {
      return (
        <CancelRounded
          sx={{ marginRight: 2, fontSize: theme.spacing(2) }}
          fontSize="small"
          htmlColor={theme.palette.pink[700]}
        />
      );
    }

    return (
      <CheckCircleRounded
        sx={{ marginRight: 2, fontSize: theme.spacing(2) }}
        fontSize="small"
        htmlColor={theme.palette.green[700]}
      />
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: 1,
      }}
    >
      <Box sx={{ height: theme.spacing(4) }} display="flex" alignItems="center">
        {showStatusIcon("form_validation.form.password.hint.length")}
        <Typography variant="bodyS" color="text.secondary">
          {t("form_validation.form.password.hint.length")}
        </Typography>
      </Box>
      <Box sx={{ height: theme.spacing(4) }} display="flex" alignItems="center">
        {showStatusIcon("form_validation.form.password.hint.uppercase")}
        <Typography variant="bodyS" color="text.secondary">
          {t("form_validation.form.password.hint.uppercase")}
        </Typography>
      </Box>
      <Box sx={{ height: theme.spacing(4) }} display="flex" alignItems="center">
        {showStatusIcon("form_validation.form.password.hint.lowercase")}
        <Typography variant="bodyS" color="text.secondary">
          {t("form_validation.form.password.hint.lowercase")}
        </Typography>
      </Box>
      <Box sx={{ height: theme.spacing(4) }} display="flex" alignItems="center">
        {showStatusIcon("form_validation.form.password.hint.number")}
        <Typography variant="bodyS" color="text.secondary">
          {t("form_validation.form.password.hint.number")}
        </Typography>
      </Box>
    </Box>
  );
};

export default PasswordHints;
