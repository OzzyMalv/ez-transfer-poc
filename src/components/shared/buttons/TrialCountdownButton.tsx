import routes from "@/common/constants/routes";
import { useAppSelector } from "@/store";
import { selectUserPlan } from "@/store/slices/auth.slice";
import theme from "@/styles/theme";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CoutDownDesktop,
  CoutDownMobile,
} from "@/components/shared/buttons/trialCountDownButton.styles";

type Trials = {
  trial: {
    trialEndDate: string;
  };
};

const TrialCountdownButton = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const plan = useAppSelector(selectUserPlan) as Trials;
  const [trialDays, setTrialDays] = useState<number>();

  const pricingRedirect = () => {
    router.push(routes.PRICING);
  };

  const trialDaysLeft = () => {
    const trialEndDate = plan?.trial?.trialEndDate;

    if (trialEndDate) {
      const futureDate = dayjs(trialEndDate).startOf("day");
      const currentDate = dayjs().startOf("day");

      const daysDiff = futureDate.diff(currentDate, "day");
      setTrialDays(daysDiff);
    }
  };

  useEffect(() => {
    trialDaysLeft();
  }, [plan]);

  return (
    <Button
      variant="outlined"
      startIcon={<PersonRoundedIcon sx={{ color: "#925eff" }} />}
      onClick={pricingRedirect}
      sx={{
        background: "none",
        color: theme.palette.black[800],
      }}
      data-testid="dti-trial-countdown"
    >
      <CoutDownDesktop>
        {t("app.header.buttons.trial.countdown", {
          days: trialDays,
        })}
      </CoutDownDesktop>

      <CoutDownMobile>
        {t("app.header.buttons.trial.countdown.mobile")}
      </CoutDownMobile>
    </Button>
  );
};

export default TrialCountdownButton;
