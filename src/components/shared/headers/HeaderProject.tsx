import BackButton from "@/components/shared/buttons/BackButton";
import {
  HeaderTitleWrapper,
  HeaderWrapper,
} from "@/components/shared/headers/headerProject.styles";
import { useAppSelector } from "@/store";
import { selectUserPlan } from "@/store/slices/auth.slice";
import { Typography } from "@mui/material";
import TitleEdit from "../buttons/TitleEdit";
import TrialCountdownButton from "../buttons/TrialCountdownButton";

export interface IHeaderProjectProps {
  name: string;
  backHref: string;
  folderId?: string;
  workspaceId?: string;
}

type Trials = {
  trial: {
    trialEndDate: string;
  };
};
const HeaderProject = ({
  name,
  backHref,
  folderId,
  workspaceId,
}: IHeaderProjectProps) => {
  const plan = useAppSelector(selectUserPlan) as Trials;
  return (
    <HeaderWrapper id="header-project">
      <BackButton backHref={backHref} />
      <HeaderTitleWrapper>
        <Typography variant="titleM">{name}</Typography>
        {folderId && workspaceId && (
          <TitleEdit
            folderId={folderId}
            workspaceId={workspaceId}
            name={name}
          />
        )}
      </HeaderTitleWrapper>
      {plan?.trial?.trialEndDate && <TrialCountdownButton />}
    </HeaderWrapper>
  );
};

export default HeaderProject;
