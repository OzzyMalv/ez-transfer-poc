"use client";

import FormTextInput from "@/components/shared/form/FormTextInput";
import theme, { withTransientProps } from "@/styles/theme";
import styled from "@emotion/styled";
import {
  Error as ErrorIcon,
  Info as InfoIcon,
  Lock as LockIcon,
  CheckCircle as SuccessIcon,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  FormLabel,
  Switch,
  Tab,
  Tabs,
  TabsProps,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";

export const FormAreaWrapper = styled(Box)`
  && {
    width: ${(p) => p.theme.spacing(50)};
    border-radius: ${(p) => p.theme.spacing(2)};
    border: 1px solid #eee;
    height: 100%;
    padding: ${(p) => p.theme.spacing(0, 2, 2, 2)};

    ${theme.breakpoints.down("md")} {
      width: 100%;
    }
  }
`;

export const FormViewWrapper = styled(Box)`
  && {
    overflow: hidden;
    height: inherit;
    margin-right: 0;
  }
`;

export const FormHeading = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${(p) => p.theme.spacing(1.5, 0)};
  }
`;

interface IStyledErrorTooltipProps extends TooltipProps {
  $errorOffset?: string;
}

export const ErrorTooltip: React.FC<IStyledErrorTooltipProps> = styled(
  // todo fix $errorOffset
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ className, $errorOffset = "", ...props }: IStyledErrorTooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ),
)(({ theme, $errorOffset = "" }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
    transform: "none !important",
    top: "45% !important",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    maxWidth: theme.spacing(28),
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
  },
  [`& .${tooltipClasses.tooltipPlacementLeft}`]: {
    marginTop: $errorOffset,
  },
})) as typeof Tooltip;

export const StyledTextarea = styled(FormTextInput)`
  & .MuiInputBase-multiline {
    line-height: 1.5;
    border: 0;
    resize: none;
    padding: 0;
    &:focus-visible {
      outline: none;
    }
  }
` as typeof FormTextInput;

export const StyledErrorIcon = styled(ErrorIcon)`
  && {
    color: ${(p) => p.theme.palette.pink[400]};
    background: radial-gradient(#000 40%, #fff 50%);
    border-radius: 50%;
    margin-bottom: ${(p) => p.theme.spacing(1)};
  }
`;

export const StyledSuccessIcon = styled(SuccessIcon)`
  && {
    color: ${(p) => p.theme.palette.green[600]};
    background: radial-gradient(#000 40%, #fff 50%);
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }
`;

export const StyledFormLabel = styled(FormLabel)`
  & {
    color: #000;
    font-size: ${(p) => p.theme.typography.bodyS.fontSize};
    font-weight: ${(p) => p.theme.typography.bodyS.fontWeight};
    display: block;
    margin-bottom: ${(p) => p.theme.spacing(1)};
  }
`;

export const StyledText = styled(Typography)`
  & {
    color: rgba(0, 0, 0, 0.68);
    font-size: ${(p) => p.theme.typography.bodyM.fontSize};
    font-weight: ${(p) => p.theme.typography.bodyM.fontWeight};
    display: block;
    margin-bottom: ${(p) => p.theme.spacing(2)};
  }
`;

interface IFieldWrapperProps {
  $fullWidth?: boolean;
  $controlColor?: string;
  $dense?: boolean;
}
export const FieldWrapper = styled(Box, withTransientProps)<IFieldWrapperProps>`
  width: ${(p) => (p.$fullWidth ? "100%" : "auto")};
  && {
    & .MuiTextField-root {
      width: 100%;
      background: ${(p) => (p.$controlColor ? p.$controlColor : "")};
    }
    padding-bottom: ${(p) =>
      p.$dense ? p.theme.spacing(1.5) : p.theme.spacing(2)};
    & .MuiOutlinedInput-notchedOutline {
      border-radius: ${(p) => p.theme.spacing(1.5)};
      min-height: ${(p) => p.theme.spacing(5)};
    }
    & .MuiOutlinedInput-input {
      font-size: ${(p) => p.theme.typography.bodyM.fontSize};
      font-weight: ${(p) => p.theme.typography.bodyM.fontWeight};
      font-family: ${(p) => p.theme.typography.bodyM.fontFamily};
      line-height: ${(p) => p.theme.typography.bodyM.lineHeight};
      padding: ${(p) => p.theme.spacing(1.25, 1.75)};
    }
  }
`;

interface IStyledRecieversEmailWrapperProps {
  $isMenuOpen: boolean;
}
export const StyledRecieversEmailWrapper = styled(
  Box,
  withTransientProps,
)<IStyledRecieversEmailWrapperProps>`
  && {
    outline: ${(p) =>
      !p.$isMenuOpen ? "1px solid rgba(0, 0, 0, 0.23)" : "2px solid #000"};
    &:hover {
      outline: ${(p) => (!p.$isMenuOpen ? "1px solid #000" : "2px solid #000")};
    }
    border-radius: ${(p) => p.theme.spacing(1.5)};
    margin: 2px;
    margin-bottom: ${(p) => p.theme.spacing(2)};
  }
`;

export const StyledRecieversEmailsList = styled(
  Box,
  withTransientProps,
)<IStyledRecieversEmailWrapperProps>`
  && {
    display: ${(p) => (p.$isMenuOpen ? "block" : "none")};
    padding: ${(p) => p.theme.spacing(0, 1.5, 0.5)};
    & .MuiChip-root {
      margin-bottom: ${(p) => p.theme.spacing(0.5)};
      margin-right: ${(p) => p.theme.spacing(0.5)};
    }
  }
`;

interface IStyledRecieversEmailsProps {
  $darkPlaceholder: boolean;
}
export const StyledRecieversEmails = styled(
  Autocomplete,
  withTransientProps,
)<IStyledRecieversEmailsProps>`
  && {
    fieldset {
      border: none;
      outline: none;
    }
    & .MuiOutlinedInput-input {
      font-size: ${(p) => p.theme.typography.bodyM.fontSize};
      font-weight: ${(p) => p.theme.typography.bodyM.fontWeight};
      font-family: ${(p) => p.theme.typography.bodyM.fontFamily};
      line-height: ${(p) => p.theme.typography.bodyM.lineHeight};
      padding: ${(p) => p.theme.spacing(1.25, 1.75)};
    }
    & .MuiOutlinedInput-root {
      padding-right: ${(p) => p.theme.spacing(1)};
    }
    input {
      &::placeholder {
        color: ${(p) =>
          p.$darkPlaceholder ? "#000" : p.theme.palette.grey[500]};
        opacity: 1;
      }
    }
  }
`;

export const StyledInfoTextIcon = styled(InfoIcon)`
  && {
    color: ${(p) => p.theme.palette.yellow[600]};
    background: radial-gradient(#000 40%, #fff 50%);
    border-radius: 50%;
  }
`;

export const StyledLockIcon = styled(LockIcon)`
  && {
    margin: auto;
    font-size: 16px;
  }
`;

export const StyledLockIconWrapper = styled(Box)`
  && {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${(p) => p.theme.palette.yellow[600]};
    display: flex;
    margin-bottom: 8px;
  }
`;

export const SwitchStyled = styled(Switch)`
  display: flex;
  padding: 0;
  width: ${(p) => p.theme.spacing(3.5)};
  height: ${(p) => p.theme.spacing(2)};

  &:active {
    .MuiSwitch-thumb {
      width: ${(p) => p.theme.spacing(1.75)};
    }

    .MuiSwitch-switchBase.Mui-checked {
      transform: translateX(${(p) => p.theme.spacing(1.25)});
    }
  }

  .MuiSwitch-track {
    background-color: #a0a0a0 !important;
  }

  .MuiSwitch-switchBase {
    padding: ${(p) => p.theme.spacing(0.25)};

    &.Mui-checked {
      transform: translateX(${(p) => p.theme.spacing(1.5)});
      color: white;

      & + .MuiSwitch-track {
        opacity: 1;
        background-color: #262626 !important;
      }
    }
  }

  .MuiSwitch-thumb {
    width: ${(p) => p.theme.spacing(1.5)};
    height: ${(p) => p.theme.spacing(1.5)};
    border-radius: ${(p) => p.theme.spacing(0.75)};
    transition: ${(p) =>
      p.theme.transitions.create(["width"], {
        duration: 200,
      })};
  }

  .MuiSwitch-track {
    border-radius: ${(p) => p.theme.spacing(1)};
    opacity: 1;
    background-color: ${(p) => p.theme.palette.grey[400]};
    box-sizing: border-box;
  }
`;

export const StyledTabsWrapper = styled.div`
  background-color: #f6f6f6;
  border-radius: ${(p) => p.theme.spacing(1)};
  padding: ${(p) => p.theme.spacing(0.25)};
`;

export const StyledTab = styled(Tab)`
  && {
    z-index: 1;
    max-height: ${(p) => p.theme.spacing(4)};
    min-height: auto;
  }
`;

export const StyledEmailDivider = styled.div`
  margin-top: ${(p) => p.theme.spacing(2)};
`;

const tabIndicatorProps = {
  style: {
    backgroundColor: "white",
    height: "100%",
    borderRadius: theme.spacing(0.75),
    width: "50%",
  },
};

const firstRenderQcFirstTabIndicatorProps = {
  style: {
    ...tabIndicatorProps.style,
    left: "50%",
  },
};

interface IStyledTabsProps extends TabsProps {
  $isQcFirst: boolean;
}

const BaseStyledTabs: React.FC<IStyledTabsProps> = ({
  $isQcFirst,
  ...props
}) => (
  <Tabs
    {...props}
    TabIndicatorProps={
      $isQcFirst ? firstRenderQcFirstTabIndicatorProps : tabIndicatorProps
    }
  />
);

export const StyledTabs = styled(BaseStyledTabs)(({ theme }) => ({
  backgroundColor: "#f9f9f9",
  borderRadius: theme.spacing(0.75),
  height: "100%",
  minHeight: "0px",
}));

export const AccessInfoWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: ${(p) => p.theme.spacing(0.75, 1)};
  color: rgba(0, 0, 0, 0.6);
  background-color: #f6f6f6;
  border-radius: ${(p) => p.theme.spacing(1)};
  margin-bottom: ${(p) => p.theme.spacing(2)};
`;

export const WorkspaceSenderFormWrapper = styled(Box)`
  && {
    width: ${(p) => p.theme.spacing(38)};
    border-radius: ${(p) => p.theme.spacing(2)};
    border: 1px solid #eee;
    padding: ${(p) => p.theme.spacing(0, 2, 2, 2)};

    ${theme.breakpoints.down("md")} {
      width: 100%;
    }
  }
`;
