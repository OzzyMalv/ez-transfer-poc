"use client";

import { Box } from "@mui/material";
import {
  FieldWrapper,
  StyledFormLabel,
} from "@/components/senderForm/senderForm.styles";
import { FC } from "react";
import { useTranslation } from "next-i18next";
import { useAppDispatch, useAppSelector } from "@/store";
import dynamic from "next/dynamic";
import {
  setContinueDisabled,
  selectContinueDisabled,
} from "@/store/slices/receiver.slice";

const PasswordField = dynamic(
  () => import("@/components/shared/PasswordField"),
);

interface IProps {
  setPassword: (password: string) => void;
  password: string;
}

const Password: FC<IProps> = ({ setPassword, password }) => {
  const { t } = useTranslation("receiver");
  const dispatch = useAppDispatch();
  const isContinueDisabled = useAppSelector(selectContinueDisabled);
  const onInputValueChange = (input: string) => {
    setPassword(input);
    if (input.length === 0) {
      dispatch(setContinueDisabled(true));
    }
    if (input.length > 0 && isContinueDisabled) {
      dispatch(setContinueDisabled(false));
    }
  };

  return (
    <Box
      sx={{
        "&&": {
          width: "100%",
        },
      }}
    >
      <FieldWrapper>
        <StyledFormLabel>{t("receiver.form.password.label")}</StyledFormLabel>
        <PasswordField
          text={password}
          handleChange={onInputValueChange}
          placeHolder={t("receiver.form.password.input.placeholder")}
        />
      </FieldWrapper>
    </Box>
  );
};

export default Password;
