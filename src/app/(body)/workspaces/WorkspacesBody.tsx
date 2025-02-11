"use client";

import { ProjectDataType } from "@/api/types/workspace.types";
import {
  CardsBoxStyled,
  ContainerStyled,
} from "@/app/(body)/workspaces/workspaceBody.styles";
import { addWorkspaceFiles } from "@/common/utils/fileUtils";
import { dragAndDropTracking } from "@/common/utils/heapTracking";
import DialogDark from "@/components/dialogDark/DialogDark";
import DialogDarkRename from "@/components/dialogDark/DialogDarkRename";
import HeaderWorkspaces from "@/components/shared/headers/HeaderWorkspaces";
import SideBarWorkspaces from "@/components/shared/sidebar/SideBarWorkspaces";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  selectHasPrivateWorkspaceAccess,
  selectIsTrialsModalRequired,
} from "@/store/slices/auth.slice";
import { selectWorkspace } from "@/store/slices/workspace.slice";
import {
  getProjects,
  requestWorkspaces,
  selectProjects,
} from "@/store/slices/workspaces.slice";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

const PreviewCard = dynamic(() => import("@/components/card/PreviewCard"));
interface IMemoizedPreviewCard {
  project: ProjectDataType;
  workspaceId: string;
  onClickDelete: (id: string) => void;
  onClickRename: (id: string) => void;
}
// eslint-disable-next-line react/display-name
const MemoizedPreviewCard = React.memo<IMemoizedPreviewCard>(
  ({ project, workspaceId, onClickDelete, onClickRename }) => {
    return (
      <PreviewCard
        id={project.id}
        name={project.name}
        totalFileSize={project.totalFileSize}
        numberOfFiles={project.numberOfFiles}
        lastEditedDate={project.modifiedDate}
        thumbnailImage={project.preview?.largeThumbnailUrl}
        linkSrc={`/workspaces/${workspaceId}/project/${project.id}`}
        onClickDelete={onClickDelete}
        onClickRename={onClickRename}
      />
    );
  },
);

const DropZone = dynamic(() => import("@/components/dropZone"));

const WorkspacesBody = () => {
  const dispatch = useAppDispatch();
  const selectedWorkspace = useAppSelector(selectWorkspace);
  const projects = useAppSelector(selectProjects);
  const isUpgrade = useAppSelector(selectIsTrialsModalRequired);
  const isPrivateWorkspaceAllowed = useAppSelector(
    selectHasPrivateWorkspaceAccess,
  );
  const router = useRouter();

  useEffect(() => {
    dispatch(requestWorkspaces());
  }, []);

  useEffect(() => {
    if (selectedWorkspace.id) {
      dispatch(
        getProjects({
          workspaceId: selectedWorkspace.id,
          projectId: selectedWorkspace.rootFolderId,
        }),
      );
    }
  }, [isPrivateWorkspaceAllowed, selectedWorkspace.id]);

  const [isOpenRename, setDialogOpenRename] = useState(false);
  const [isOpenDelete, setDialogOpenDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const onClickDelete = useCallback((id: string) => {
    setSelectedItem(id);
    setDialogOpenDelete(true);
  }, []);

  const onClickRename = useCallback((id: string) => {
    setSelectedItem(id);
    setDialogOpenRename(true);
  }, []);

  const handleDelete = () => {};

  const handleRename = () => {
    setDialogOpenRename(false);
  };

  const onDrop = useCallback(
    async (droppedFiles: FileWithPath[]) => {
      dragAndDropTracking(droppedFiles || []);

      await addWorkspaceFiles(
        dispatch,
        droppedFiles,
        selectedWorkspace.id,
        selectedWorkspace.rootFolderId,
        router,
      );
    },
    [selectedWorkspace],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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

      <HeaderWorkspaces nameSpace="workspaces" />
      <SideBarWorkspaces nameSpace="workspaces" />
      <ContainerStyled>
        <CardsBoxStyled>
          {projects.length && !isUpgrade ? (
            <>
              {projects.map((project) => {
                return (
                  <MemoizedPreviewCard
                    key={project.id}
                    project={project}
                    onClickDelete={onClickDelete}
                    onClickRename={onClickRename}
                    workspaceId={selectedWorkspace.id}
                  />
                );
              })}
              <DialogDark
                isOpen={isOpenDelete}
                onClose={() => setDialogOpenDelete(false)}
                onDelete={handleDelete}
              />
              <DialogDarkRename
                isOpen={isOpenRename}
                onClose={() => setDialogOpenRename(false)}
                onRename={handleRename}
                selectedWorkspace={selectedWorkspace}
                projectId={selectedItem!}
              />
            </>
          ) : (
            <></>
          )}
        </CardsBoxStyled>
      </ContainerStyled>
    </Box>
  );
};

export default WorkspacesBody;
