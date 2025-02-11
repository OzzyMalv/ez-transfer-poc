"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Trans, useTranslation } from "next-i18next";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

export const StyledDialog = styled(Dialog)`
  && .MuiDialog-container {
    align-items: flex-start;
    padding-top: ${({ theme }) => theme.spacing(15)};
  }
  && .MuiDialog-paper {
    width: 340px;
    padding-bottom: 8px;
    background: #2f302f;

    border-radius: ${(p) => p.theme.spacing(2)};
  }
`;

export const StyledDialogContent = styled(DialogContent)`
  && {
    padding: ${({ theme }) => theme.spacing(2)};
  }
`;

export const StyledDialogActions = styled(DialogActions)`
  && {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(1)};

    padding: ${({ theme }) => theme.spacing(1, 2)};

    ${theme.breakpoints.up("md")} {
      flex-direction: row;
      gap: 0;
    }
  }
`;

export const StyledButton = styled(Button)`
  && {
    width: 100%;
    border-radius: ${({ theme }) => theme.spacing(3)};
    border: 1px solid #4e4e4f;
    ${theme.breakpoints.up("md")} {
      width: auto;
    }
  }
`;

export const StyledButtonConfirm = styled(Button)`
  && {
    width: 100%;
    background: #fff;
    margin: 0;
    ${theme.breakpoints.up("md")} {
      width: auto;
      margin-left: ${({ theme }) => theme.spacing(1)};
    }
    &:hover {
      border: 1px solid #4e4e4f;
    }
  }
`;

interface IDialogDark {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}
const DialogDark = ({ isOpen, onClose, onDelete }: IDialogDark) => {
  const { t } = useTranslation(["workspaces", "common"]);

  const handleClose = () => {
    onClose();
  };

  return (
    <StyledDialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      data-testid="responsive-dialog-title"
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{ padding: 2, borderBottom: "1px solid #444" }}
      >
        <Typography variant="titleS" sx={{ color: "#F9FAF9" }}>
          {t("dialog.header.removeAllFiles")}
        </Typography>
      </DialogTitle>
      <StyledDialogContent>
        <Typography variant="bodyM" sx={{ color: "#B5B4B3" }}>
          <Trans
            t={t}
            i18nKey="dialog.body.areYouSure"
            components={{
              br: <br key="dialog_dark" />,
            }}
          />
        </Typography>
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledButton size="small" onClick={handleClose} variant="contained">
          {t("dialog.btn.cancel", {
            ns: "common",
          })}
        </StyledButton>
        <StyledButtonConfirm
          color="primary"
          size="small"
          variant="outlined"
          onClick={onDelete}
          data-testid="project-delete-confirm-btn"
          data-analytics="project-delete-confirm-btn"
          sx={{ background: "#fff" }}
        >
          {t("dialog.btn.remove", {
            ns: "common",
          })}
        </StyledButtonConfirm>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default DialogDark;
