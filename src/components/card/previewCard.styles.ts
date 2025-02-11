import styled from "@emotion/styled";
import { Box, Card, Chip, CircularProgress, MenuItem } from "@mui/material";
import theme, { withTransientProps } from "@/styles/theme";

export const CardStyled = styled(Card)`
  && {
    box-shadow: none;

    width: 100%;
    ${theme.breakpoints.up("sm")} {
      width: ${({ theme }) => theme.spacing(34.5)};
    }
    ${theme.breakpoints.up("md")} {
      width: ${({ theme }) => theme.spacing(33)};
    }
    // for stacked cards on top be visible
    overflow: visible;
  }
`;

export const ListItemStyled = styled(Box)`
  && {
    display: flex;
    height: ${({ theme }) => theme.spacing(7)};
    padding: ${({ theme }) => theme.spacing(0.5, 0)};
    align-items: center;
    align-self: stretch;
  }
`;

export const TextContainerStyled = styled(Box)`
  && {
    display: flex;
    padding: ${({ theme }) => theme.spacing(0.75)};
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    flex: 1 0 0;

    min-width: 0;
  }
`;

export const CardMediaDefaultStyled = styled(Box)`
  && {
    height: ${({ theme }) => theme.spacing(25)};
    border-radius: ${({ theme }) => theme.spacing(2)};
    border: 1px solid #eee;
    background: #fcfcfc;

    ${theme.breakpoints.up("md")} {
      height: ${({ theme }) => theme.spacing(20)};
    }

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface ICardMediaImgStyled {
  $withHover?: boolean;
}
/* todo refactor loading state for image */
export const CardMediaImgStyled = styled(
  Box,
  withTransientProps,
)<ICardMediaImgStyled>`
  && {
    position: relative;
    height: ${({ theme, $withHover }) => (!$withHover ? 0 : theme.spacing(25))};

    ${theme.breakpoints.up("md")} {
      height: ${({ theme, $withHover }) =>
        !$withHover ? 0 : theme.spacing(20)};
    }

    .stacked-card {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 16px;
    }

    /* First background layer */
    .stacked-card-1 {
      background-color: #bdbdbd;

      border: 1px solid #eee;

      top: ${({ theme }) => theme.spacing(-1)};
      height: calc(100% + 8px);
      width: calc(100% - 32px);
      margin: ${({ theme }) => theme.spacing(0, 2)};
    }

    /* Second background layer */
    .stacked-card-2 {
      background-color: #898989;
      border: 1px solid #eee;

      top: ${({ theme }) => theme.spacing(-0.5)};
      height: calc(100% + 4px);
      width: calc(100% - 16px);
      margin: ${({ theme }) => theme.spacing(0, 1)};
    }

    &::before {
      z-index: 1;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: ${({ theme }) => theme.spacing(2)};
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover::before {
      opacity: ${(p) => (p.$withHover ? 0.3 : 0)};
    }
  }
`;

export const CircularProgressStyled = styled(CircularProgress)`
  && {
    display: flex;
    padding: 2px 0;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
`;

export const FilesChipStyled = styled(Chip)`
  && {
    height: ${(p) => p.theme.spacing(2.5)};
    color: rgba(210, 210, 210, 0.87);
    background-color: #262626;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.2px;

    & .MuiChip-label {
      padding: ${(p) => p.theme.spacing(0, 0.75)};
    }
  }
`;

export const MenuItemStyled = styled(MenuItem)`
  && {
    background: #4b4b4b;
    border-radius: ${({ theme }) => theme.spacing(1)};
    min-height: ${({ theme }) => theme.spacing(4)};
  }
`;
