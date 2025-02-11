"use client";

import { ENV_CONSTANTS } from "@/common/constants/env.const";
import { Fade, Typography, styled, useMediaQuery } from "@mui/material";
import { Trans, useTranslation } from "next-i18next";
import Link from "next/link";
import theme from "@/styles/theme";

const TermsToastWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(p) => p.theme.spacing(0.75)};
  width: fit-content;
  justify-content: center;
  & a {
    text-decoration: underline;
  }
  z-index: 1;
  ${theme.breakpoints.down("md")} {
    padding: ${(p) => p.theme.spacing(2, 3)};
  }
  ${theme.breakpoints.up("md")} {
    position: fixed;
    bottom: ${(p) => p.theme.spacing(2)};
    left: 0;
    right: 0;
  }
  margin: auto;
`;

interface IPeachTermsToastProps {
  show: boolean;
}

const PeachTermsToast: React.FC<IPeachTermsToastProps> = (props) => {
  const { t } = useTranslation("common");
  const { show } = props;
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  if (!show) {
    return null;
  }

  return (
    <Fade
      in={show}
      timeout={{ enter: 0, exit: 500 }}
      mountOnEnter
      unmountOnExit
    >
      <TermsToastWrapper
        data-testid="dti-PeachTermsToast"
        data-analytics="peach-terms-toast"
      >
        <Typography variant={matches ? "bodyS" : "bodyM"} textAlign="center">
          <Trans t={t} values={{ string: ENV_CONSTANTS.PEACH_PRIVACY_UPDATED }}>
            peach.terms.toast
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={ENV_CONSTANTS.NEXT_PUBLIC_PEACH_TERMS_URL as string}
              style={{ textDecoration: "none" }}
            >
              link1
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={ENV_CONSTANTS.NEXT_PUBLIC_PEACH_PRIVACY_URL as string}
              style={{ textDecoration: "none" }}
            >
              link2
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={ENV_CONSTANTS.PEACH_CONTACT_URL as string}
              style={{ textDecoration: "none" }}
            >
              link3
            </Link>
          </Trans>
        </Typography>
      </TermsToastWrapper>
    </Fade>
  );
};

export default PeachTermsToast;
