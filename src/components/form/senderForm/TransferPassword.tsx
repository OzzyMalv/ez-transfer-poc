import useTooltipProps from "@/common/hooks/useTooltipProps";
import {
  ErrorTooltip,
  StyledLockIcon,
  StyledLockIconWrapper,
} from "@/components/form/senderForm/senderForm.styles";
import { SenderFormSchemaType } from "@/components/form/senderForm/SenderFormValidation";
import { FieldWrapper } from "@/components/senderForm/senderForm.styles";
import FormSwitchInput from "@/components/shared/form/FormSwitchInput";
import PasswordInput from "@/components/shared/form/PasswordInput";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectErrorMessageType,
  selectErrorStatus,
  selectQcFirst,
  setError,
} from "@/store/slices/senderForm.slice";
import theme from "@/styles/theme";
import { InfoOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC } from "react";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props<T extends SenderFormSchemaType = SenderFormSchemaType> {
  control: Control<T>;
  enable: boolean;
}

const TransferPassword: FC<Props> = ({ control, enable }) => {
  const { t } = useTranslation("sender");
  const dispatch = useAppDispatch();
  const globalErrorStatus = useAppSelector(selectErrorStatus);
  const errorType = useAppSelector(selectErrorMessageType);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const isQcFirst = useAppSelector(selectQcFirst);

  const showInfoToolTip = () => {
    dispatch(
      setError({
        status: "visible",
        message: "sender.password.info.tooltip",
        messageType: "info",
      }),
    );
  };

  const { tooltipProps } = useTooltipProps({
    onHide: () => dispatch(setError({ status: "hide", message: "" })),
    showOn: !matches && globalErrorStatus === "visible" && errorType === "info",
  });

  if (tooltipProps.PopperProps?.modifiers) {
    tooltipProps.PopperProps.modifiers[0].options = {
      offset: [0, 10],
    };
  }

  return (
    <ErrorTooltip
      placement={"left"}
      arrow
      title={
        <Box
          data-testid="dti-SenderPasswordInfoTooltip"
          data-analytics="sender-password-info-tooltip"
        >
          <StyledLockIconWrapper>
            <StyledLockIcon
              data-testid="dti-PasswordTooltip-icon"
              data-analytics="password-tooltip-icon"
            />
          </StyledLockIconWrapper>
          <Typography variant="bodyS">
            {t("sender.password.info.tooltip")}
          </Typography>
        </Box>
      }
      {...tooltipProps}
    >
      <Box>
        <List disablePadding>
          <ListItem
            secondaryAction={
              <FormSwitchInput
                name="password.enable"
                control={control}
                data-analytics="password-switch"
                data-testid="dti-password-switch"
                role="switch"
                edge="end"
              />
            }
            dense
            disableGutters
          >
            {!isQcFirst && (
              <ListItemIcon sx={{ minWidth: 0 }}>
                <IconButton
                  onMouseEnter={showInfoToolTip}
                  onClick={showInfoToolTip}
                  onMouseLeave={() => {
                    if (!matches)
                      dispatch(setError({ status: "hide", message: "" }));
                  }}
                  disableRipple
                  size="small"
                >
                  <InfoOutlined fontSize="small" />
                </IconButton>
              </ListItemIcon>
            )}
            <ListItemText
              primary={t("sender.form.password.label")}
              primaryTypographyProps={{
                variant: "bodyS",
                sx: { fontWeight: 500 },
              }}
            />
          </ListItem>
        </List>

        {enable && (
          <FieldWrapper $fullWidth $dense>
            <PasswordInput
              inputType="text"
              autoComplete="off"
              name="password.value"
              control={control}
              inputProps={{
                "data-testid": "dti-password-field",
                "data-analytics": "password-field",
              }}
            />
          </FieldWrapper>
        )}
      </Box>
    </ErrorTooltip>
  );
};

export default TransferPassword;
