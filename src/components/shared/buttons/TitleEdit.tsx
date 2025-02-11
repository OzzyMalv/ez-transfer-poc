"use client";

import { IconButton, Modal, Tooltip, Typography } from "@mui/material";
import {
  EditNameModal,
  EditNameModalButtonCancel,
  EditNameModalButtonContainer,
  EditNameModalButtonSave,
  EditOutlinedIconStyled,
  IconButtonClose,
} from "../headers/headerProject.styles";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import theme from "@/styles/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import FormTextInput from "../form/FormTextInput";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { RenameSchema, RenameSchemaType } from "../headers/renameValidation";
import WorkspaceAPIs from "@/api/services/workspace.api";
import { useAppDispatch } from "@/store";
import { setProjectName } from "@/store/slices/workspace.slice";
import { getProjects } from "@/store/slices/workspaces.slice";

export interface ITitleEditProps {
  workspaceId: string;
  folderId: string;
  name: string;
}

const renameDefaultValues = {
  title: "",
};

const TitleEdit = ({ workspaceId, folderId, name }: ITitleEditProps) => {
  const { t } = useTranslation("projects");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    reset(renameDefaultValues);
    setOpen(false);
  };
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm<RenameSchemaType>({
    defaultValues: renameDefaultValues,
    mode: "onChange",
    resolver: zodResolver(RenameSchema),
  });

  const onSubmit: SubmitHandler<RenameSchemaType> = async (values: {
    title: string;
  }) => {
    const title = values.title;

    if (title === name) {
      return handleClose();
    }

    try {
      await WorkspaceAPIs.UpdateProjectName({
        workspaceId,
        folderId,
        title,
      });

      dispatch(setProjectName({ folderId, name: values.title }));
      dispatch(
        getProjects({
          workspaceId: workspaceId,
          projectId: folderId,
        }),
      );
      handleClose();
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
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
    }
  };

  return (
    <>
      <Tooltip
        title={t("projects.title.tooltip")}
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -10],
                },
              },
            ],
          },
        }}
      >
        <IconButton
          aria-label="edit"
          onClick={handleOpen}
          data-testid="dti-edit-project-name-btn"
          data-analytics="edit-project-name-btn"
        >
          <EditOutlinedIconStyled />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        data-testid="dti-edit-project-modal"
      >
        <EditNameModal>
          <IconButtonClose
            onClick={handleClose}
            disabled={isSubmitting}
            data-testid="dti-edit-project-modal-close"
          >
            <CloseRoundedIcon
              sx={{
                color: theme.palette.grey[700],
                fontSize: "16px",
              }}
            />
          </IconButtonClose>
          <Typography
            variant="labelM"
            sx={{ color: theme.palette.grey[400] }}
            component="h3"
          >
            {t("projects.modal.title")}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <FormTextInput
              autoComplete="title"
              name="title"
              control={control}
              inputProps={{
                "data-testid": "dti-email-field",
                "data-analytics": "email-field",
              }}
              sx={{
                width: "100%",
                input: {
                  outline: `2px solid ${theme.palette.grey[700]}`,
                  width: "100%",
                  color: "#ffffff",
                  fontSize: "14px",
                  lineHeight: 400,
                  margin: theme.spacing(3, 0, 0),
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

            <EditNameModalButtonContainer>
              <EditNameModalButtonCancel
                variant="outlined"
                sx={{
                  background: "none",
                  borderColor: theme.palette.grey[800],
                  color: theme.palette.grey[400],
                }}
                onClick={handleClose}
                disabled={isSubmitting}
                data-testid="dti-edit-project-cancel"
              >
                {t("projects.modal.cancel")}
              </EditNameModalButtonCancel>
              <EditNameModalButtonSave
                variant="outlined"
                sx={{ borderColor: "#FFFFFF" }}
                type="submit"
                disabled={isSubmitting}
                data-testid="dti-edit-project-save"
              >
                {t("projects.modal.save")}
              </EditNameModalButtonSave>
            </EditNameModalButtonContainer>
          </form>
        </EditNameModal>
      </Modal>
    </>
  );
};

export default TitleEdit;
