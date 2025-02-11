"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { selectQcFirst, setQcFirst } from "@/store/slices/senderForm.slice";

import {
  selectMaxExpiryDays,
  selectMaxStorageLimit,
  selectUserEmail,
} from "@/store/slices/auth.slice";

import theme from "@/styles/theme";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import {
  AccessInfoWrapper,
  FieldWrapper,
  FormHeading,
  FormViewWrapper,
  StyledEmailDivider,
  StyledFormLabel,
  StyledTextarea,
  WorkspaceSenderFormWrapper,
} from "@/components/form/senderForm/senderForm.styles";
import {
  SenderFormSchema,
  SenderFormSchemaType,
} from "@/components/form/senderForm/SenderFormValidation";
import {
  requestTransferId,
  setTransferDrawerOpen,
  setTransferType,
  setCurrentTransfer,
  selectFilesUploading,
  selectFoldersUploading,
  setTransferId,
  selectProjectFiles,
  selectFilesWithVirus,
} from "@/store/slices/workspace.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventOutlined } from "@mui/icons-material";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { showNotify } from "@/store/slices/notification.slice";

const TransferPassword = dynamic(
  () => import("@/components/form/senderForm/TransferPassword"),
);
const ReceiversEmailsField = dynamic(
  () => import("@/components/form/senderForm/ReceiversEmails"),
);
const MessageDialog = dynamic(
  () => import("@/components/shared/MessageDialog"),
);
const QcFirstToggle = dynamic(
  () => import("@/components/form/senderForm/QcFirstToggle"),
);

const senderFormDefaultValues = {
  message: "",
  password: {
    enable: false,
    value: "",
  },
  receivers: [],
  sendType: false,
};

const charLimit = 500;

const formatExpiryDate = (maxExpiryDays: number) => {
  return dayjs().add(maxExpiryDays, "day").format("DD MMM YYYY");
};

const SenderForm: React.FC = () => {
  const { t } = useTranslation(["sender", "common", "formValidation"]);

  const [isValidReceiverEmails, setIsValidReceiverEmails] = useState(true);
  const [isReceiverFieldHasInput, setIsReceiverFieldHasInput] = useState(false);

  const dispatch = useAppDispatch();

  const {
    control,
    formState: { isValid, isSubmitting },
    clearErrors,
    getValues,
    watch,
    resetField,
    setValue,
    trigger,
  } = useForm<SenderFormSchemaType>({
    defaultValues: senderFormDefaultValues,
    mode: "onBlur",
    resolver: zodResolver(SenderFormSchema),
  });

  const password = watch("password");

  useEffect(() => {
    if (!password.enable) {
      clearErrors("password.value");
      resetField("password.value");
    }
  }, [password.enable]);

  const { projectId } = useParams<{
    workspaceId: string;
    projectId: string;
  }>();

  const files = useAppSelector(selectProjectFiles(projectId));

  const isQcFirst = useAppSelector(selectQcFirst);

  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const userEmail = useAppSelector(selectUserEmail);

  const maxExpiryDays = useAppSelector(selectMaxExpiryDays);

  const filesUploading = useAppSelector(selectFilesUploading);

  const foldersUploading = useAppSelector(selectFoldersUploading);

  const filesWithVirus = useAppSelector(selectFilesWithVirus);

  const handleQcFirstSelectionChange = (toggle: boolean) => {
    setValue("sendType", toggle); // This is to trigger validation on mode change
    trigger();
    dispatch(setQcFirst(toggle));
  };

  let isButtonDisabled: number | boolean = !isQcFirst;

  if (!isQcFirst) {
    isButtonDisabled = !isReceiverFieldHasInput;
  }

  isButtonDisabled =
    isButtonDisabled ||
    isSubmitting ||
    (password.enable && !password.value) ||
    filesWithVirus?.length ||
    filesUploading?.length ||
    foldersUploading?.length;

  const totalFilesSize = useMemo(
    () => files.reduce((acc, file) => acc + file.size, 0),
    [files],
  );

  const maxStorageLimit = useAppSelector(selectMaxStorageLimit);

  const onSubmit = async () => {
    if (!isValid || !isValidReceiverEmails) return;

    const data = getValues();
    trigger().then(() => {
      if (totalFilesSize > maxStorageLimit) {
        dispatch(
          showNotify({
            isOpen: true,
            message: "message_dialog.error.fileSizeExceeds",
            type: "warning",
          }),
        );
        return;
      }

      dispatch(setTransferType(isQcFirst ? "link" : "send"));
      dispatch(setTransferDrawerOpen(true));

      const payload = {
        files: files.map((file) => ({
          id: file.id,
        })),
        receivers: isQcFirst
          ? [userEmail]
          : data.receivers.map((receiver) => receiver.email.trim()),
        message: data.message || "",
        daysToExpire: maxExpiryDays,
        password:
          Buffer.from(data?.password.value ?? "").toString("base64") || null,
      };
      dispatch(setTransferId(""));
      dispatch(setCurrentTransfer(payload));
      dispatch(requestTransferId(payload))
        .unwrap()
        .catch(() => {
          dispatch(
            showNotify({
              isOpen: true,
              message: "notify.somethingWentWrong",
              type: "warning",
              persisted: true,
            }),
          );
        });
    });
  };

  const [prevReceiverEmails, setPrevReceiverEmails] = useState<
    { email: string }[]
  >([]);

  useEffect(() => {
    if (isQcFirst) {
      setPrevReceiverEmails(getValues("receivers"));
      setValue("receivers", [{ email: userEmail }]);
    } else {
      setValue("receivers", prevReceiverEmails);
      setIsValidReceiverEmails(true);
    }
  }, [isQcFirst]);

  return (
    <WorkspaceSenderFormWrapper
      data-testid="dti-FormAreaWrapper"
      width={theme.spacing(38)}
    >
      {matches && <MessageDialog />}
      <Box
        sx={{
          "&&": {
            height: "100%",
            position: "relative",
          },
        }}
      >
        <FormViewWrapper
          data-testid={"dti-FormViewWrapper"}
          data-analytics="form-view-wrapper"
        >
          <FormHeading>
            <Typography variant="titleM">
              {t("sender.workspace.form.heading")}
            </Typography>
          </FormHeading>

          <Box>
            <QcFirstToggle
              handleQcFirstSelectionChange={handleQcFirstSelectionChange}
              workspace
            />
            <StyledEmailDivider>
              {!isQcFirst && (
                <ReceiversEmailsField
                  control={control}
                  isValidReceiverEmails={isValidReceiverEmails}
                  handleIsValidReceiverEmails={setIsValidReceiverEmails}
                  handleReceiverInput={setIsReceiverFieldHasInput}
                />
              )}

              <FieldWrapper
                $fullWidth
                sx={{ marginTop: theme.spacing(2) }}
                $dense
              >
                <StyledFormLabel>
                  {t("sender.form.message.label")}
                </StyledFormLabel>
                <StyledTextarea
                  rows={3}
                  name="message"
                  control={control}
                  placeholder="eg. files ready..."
                  multiline
                  inputProps={{
                    maxLength: charLimit,
                    "data-testid": "dti-message-field",
                    "data-analytics": "message-field",
                  }}
                />
              </FieldWrapper>
            </StyledEmailDivider>
          </Box>
          <Box display="flex" gap={1.5} flexDirection="column">
            <TransferPassword
              data-testid="dti-password-element"
              control={control}
              enable={getValues("password.enable")}
            />

            <AccessInfoWrapper gap={1}>
              <EventOutlined fontSize="small" />
              <Typography variant="bodyS">
                {t("sender.workspace.form.access.info", {
                  date: formatExpiryDate(maxExpiryDays),
                })}
              </Typography>
            </AccessInfoWrapper>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            disabled={!!isButtonDisabled}
            sx={{
              "&&": {
                width: "100%",
                borderRadius: theme.spacing(1.5),
              },
            }}
            data-testid="dti-senderForm-submitBtn"
            data-analytics="sender-form-submit-btn"
            onClick={() => onSubmit()}
          >
            {isQcFirst
              ? t("sender.workspace.form.qcFirstToggle.qcFirst")
              : t("sender.workspace.form.sendBtn")}
          </Button>
        </FormViewWrapper>
      </Box>
    </WorkspaceSenderFormWrapper>
  );
};

export default SenderForm;
