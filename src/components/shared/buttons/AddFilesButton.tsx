import { FabBtnStyled } from "@/components/shared/buttons/addFilesButton.styles";
import { AddRounded } from "@mui/icons-material";

interface IAddFilesButtonProps {
  onClick: () => void;
}

const AddFilesButton = ({ onClick }: IAddFilesButtonProps) => {
  return (
    <FabBtnStyled
      color="primary"
      onClick={onClick}
      data-testid="dti-addFileFabBtn"
      data-analytics="add-file-fab-btn"
    >
      <AddRounded />
    </FabBtnStyled>
  );
};

export default AddFilesButton;
