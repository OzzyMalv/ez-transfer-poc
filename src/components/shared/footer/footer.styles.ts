import routes from "@/common/constants/routes";
import theme, { withTransientProps } from "@/styles/theme";
import { Grid, styled } from "@mui/material";

type FooterProps = {
  $pathName: string;
};

export const FooterContainer = styled(Grid, withTransientProps)<FooterProps>`
  && {
    max-width: 1440px;
    padding: ${(p) => p.theme.spacing(4, 0)};
    border-top: 1px solid
      ${(p) =>
        p.$pathName.includes(routes.PRICING)
          ? p.theme.palette.black[300]
          : p.theme.palette.grey[400]};
    margin-top: ${(p) =>
      p.$pathName.includes(routes.PRICING) ? p.theme.spacing(8) : 0};

    ${theme.breakpoints.down("md")} {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;
