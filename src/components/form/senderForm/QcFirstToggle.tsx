import {
  StyledTabsWrapper,
  StyledTabs,
  StyledTab,
} from "@/components/form/senderForm/senderForm.styles";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/store";
import { selectQcFirst } from "@/store/slices/senderForm.slice";
import { FC } from "react";

interface QcFirstToggleProps {
  handleQcFirstSelectionChange: (message: boolean) => void;
  workspace?: boolean;
}

const QcFirstToggle: FC<QcFirstToggleProps> = ({
  handleQcFirstSelectionChange,
  workspace = false,
}) => {
  const isQcFirst = useAppSelector(selectQcFirst);
  const { t } = useTranslation("sender");

  const SendFiles = "SendFiles";
  const QCFirst = "QCFirst";
  const sendFilesText = t("sender.workspace.form.qcFirstToggle.sendFiles");
  const qcFirstText = t("sender.workspace.form.qcFirstToggle.qcFirst");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    handleQcFirstSelectionChange(newValue === QCFirst);
  };

  return (
    <StyledTabsWrapper>
      <StyledTabs
        $isQcFirst={isQcFirst}
        value={isQcFirst ? QCFirst : SendFiles}
        onChange={handleChange}
        variant="fullWidth"
      >
        <StyledTab
          value={SendFiles}
          label={sendFilesText}
          aria-label={sendFilesText}
          sx={{ textTransform: "none" }}
          disableRipple
          data-testid="qc-toggle-send"
          data-analytics="qc-toggle-send"
        />
        <StyledTab
          value={QCFirst}
          label={"qc-first"}
          aria-label={qcFirstText}
          sx={{ textTransform: "none" }}
          disableRipple
          data-testid="qc-toggle-qc-first"
          data-analytics="qc-toggle-qc-first"
        />
      </StyledTabs>
    </StyledTabsWrapper>
  );
};

export default QcFirstToggle;
