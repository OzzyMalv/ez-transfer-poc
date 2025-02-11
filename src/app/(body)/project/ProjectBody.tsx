"use client";

import {
  ContainerListBoxStyled,
  ContainerStyled,
  FormBoxStyled,
} from "@/app/(body)/project/projectBody.styles";
import routes from "@/common/constants/routes";
import HeaderProject from "@/components/shared/headers/HeaderProject";
import SideBarWorkspaces from "@/components/shared/sidebar/SideBarWorkspaces";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectProject,
  selectProjectFiles,
} from "@/store/slices/workspace.slice";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useDropzone } from "react-dropzone";

const SenderForm = dynamic(
  () => import("@/components/form/senderForm/SenderForm"),
);

const ListFileFolder = dynamic(
  () => import("@/components/receiver/ListFileFolder"),
);

const DropZone = dynamic(() => import("@/components/dropZone"));

const ProjectBody = () => {
  const { workspaceId, projectId } = useParams<{
    workspaceId: string;
    projectId: string;
  }>();

  const project = useAppSelector(selectProject(projectId));

  const files = useAppSelector(selectProjectFiles(projectId));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: () => {},
    noClick: true,
    noKeyboard: true,
  });

  return (
    <Box {...getRootProps()} height="100%">
      <input
        {...getInputProps()}
        data-testid="drop-input"
        data-analytics="drop-input"
      />
      <DropZone isDragActive={isDragActive} />
      <HeaderProject
        name={project?.name || ""}
        backHref={routes.WORKSPACES}
        folderId={projectId}
        workspaceId={workspaceId}
      />
      <SideBarWorkspaces isCollapsedByDefault={true} nameSpace="workspaces" />
      <ContainerStyled>
        <ContainerListBoxStyled>
          <ListFileFolder
            files={files}
            workspaceId={workspaceId}
            folderId={projectId}
          />
        </ContainerListBoxStyled>

        <FormBoxStyled>
          <SenderForm />
        </FormBoxStyled>
      </ContainerStyled>
    </Box>
  );
};

export default ProjectBody;
