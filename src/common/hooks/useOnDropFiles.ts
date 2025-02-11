import { useCallback } from "react";
import { dragAndDropTracking } from "@/common/utils/heapTracking";
import { FileWithPath } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "@/store";
import { addFiles } from "@/common/utils/fileUtils";
import { selectSenderField } from "@/store/slices/senderForm.slice";
import { selectMaxStorageLimit } from "@/store/slices/auth.slice";

interface IUseOnDropFiles {
  existingFilesTotalSize: number;
  allFilesPaths: string[];
}

const useOnDropFiles = ({
  existingFilesTotalSize,
  allFilesPaths,
}: IUseOnDropFiles) => {
  const dispatch = useAppDispatch();
  const senderField = useAppSelector(selectSenderField);
  const maxStorageFeatureLimit = useAppSelector(selectMaxStorageLimit);

  const onDrop = useCallback(
    (droppedFiles: FileWithPath[]) => {
      dragAndDropTracking(droppedFiles || []);
      addFiles(
        dispatch,
        droppedFiles,
        allFilesPaths,
        existingFilesTotalSize,
        senderField.isLoggedInUser,
        maxStorageFeatureLimit,
      );
    },
    [allFilesPaths, existingFilesTotalSize],
  );

  return {
    onDrop,
  };
};

export default useOnDropFiles;
