"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useTranslation } from "next-i18next";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RenameSchema,
  RenameSchemaType,
} from "@/components/shared/headers/renameValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTextInput from "@/components/shared/form/FormTextInput";
import {
  IWorkspace,
  requestRenameProject,
} from "@/store/slices/workspace.slice";
import { setProjectName } from "@/store/slices/workspaces.slice";
import { useAppDispatch } from "@/store";

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

interface IDialogDarkRename {
  isOpen: boolean;
  onClose: () => void;
  onRename: () => void;
  selectedWorkspace: IWorkspace;
  projectId: string;
}
const DialogDarkRename = ({
  isOpen,
  onClose,
  onRename,
  selectedWorkspace,
  projectId,
}: IDialogDarkRename) => {
  const { t } = useTranslation(["projects", "common"]);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm<RenameSchemaType>({
    defaultValues: {
      title: "",
    },
    mode: "onChange",
    resolver: zodResolver(RenameSchema),
  });

  const onSubmit: SubmitHandler<RenameSchemaType> = async ({ title }) => {
    await dispatch(
      requestRenameProject({
        workspaceId: selectedWorkspace.id,
        projectId,
        title,
      }),
    )
      .unwrap()
      .then(
        () => {
          dispatch(setProjectName({ projectId, name: title }));
          reset();
          onRename();
        },
        (error) => {
          if (error instanceof Error && "response" in error) {
            const typedError = error as {
              response: {
                data: {
                  FolderId: string[];
                };
              };
            };
            const errorMessage = typedError?.response?.data?.FolderId[0] || "";
            setError("title", { type: "manual", message: errorMessage });
          }
        },
      );
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <StyledDialog
      open={isOpen}
      aria-labelledby="responsive-dialog-title"
      data-testid="responsive-dialog-title"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ padding: 2, borderBottom: "1px solid #444" }}
        >
          <Typography variant="titleS" sx={{ color: "#F9FAF9" }}>
            {t("projects.modal.title")}
          </Typography>
        </DialogTitle>
        <StyledDialogContent>
          <FormTextInput
            autoComplete="title"
            name="title"
            control={control}
            inputProps={{
              "data-testid": "dti-title-field",
              "data-analytics": "title-field",
            }}
            sx={{
              width: "100%",
              input: {
                outline: `2px solid ${theme.palette.grey[700]}`,
                width: "100%",
                color: "#ffffff",
                fontSize: "14px",
                lineHeight: 400,
                padding: theme.spacing(1, 1.5),
                borderRadius: "10px",

                "&:focus": {
                  outline: `2px solid ${theme.palette.grey[700]}`,
                },
              },
              fieldset: {
                outline: 0,
                border: "none",
              },
            }}
          />
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
            type="submit"
            variant="outlined"
            disabled={isSubmitting}
            data-testid="project-rename-confirm-btn"
            data-analytics="project-rename-confirm-btn"
            sx={{ background: "#fff" }}
          >
            {t("dialog.btn.save", {
              ns: "common",
            })}
          </StyledButtonConfirm>
        </StyledDialogActions>
      </form>
    </StyledDialog>
  );
};

export default DialogDarkRename;
