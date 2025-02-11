import { Grid, Box } from "@mui/material";
import Image from "next/image";
import theme from "@/styles/theme";
import { MainWrapper } from "@/app/(pages)/page.styles";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const SuccessPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <MainWrapper data-testid="dti-requestResetPasswordSentPage">
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            display="flex"
            flexDirection="column"
            paddingTop={8}
            alignItems="center"
            gap={2}
            maxWidth={theme.spacing(47)}
          >
            <Image
              src="/img/success-check.svg"
              alt="verify"
              height="138"
              width="138"
              priority
              quality={10}
              data-testid="dti-verify-success-img"
              data-analytics="verify-success-img"
            />
            {children}
          </Box>
        </Grid>
      </Grid>
    </MainWrapper>
  );
};

export default SuccessPageLayout;
