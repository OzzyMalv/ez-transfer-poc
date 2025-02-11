"use client";

import { pulseAnimation } from "@/styles/animations";
import { withTransientProps } from "@/styles/theme";
import styled from "@emotion/styled";
import {
  Box,
  Fab,
  FormLabel,
  Switch,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";

import {
  Error as ErrorIcon,
  CheckCircle as SuccessIcon,
  Info as InfoIcon,
  Lock as LockIcon,
} from "@mui/icons-material";

export const StyledUploadBtn = styled(Fab)`
  && {
    animation: ${(p) => (p.size !== "small" ? pulseAnimation : "none")} 1.5s
      infinite cubic-bezier(0.79, 0.62, 0.76, 0.96);
    outline: 1px solid #000;

    ${(p) => p.size === "small" && ` outline-offset: 4px;`}
    margin: ${(p) =>
      p.size === "small"
        ? p.theme.spacing(0, 1, 0, 0)
        : p.theme.spacing(3, "auto")};
    display: flex;
    color: #fff;
    z-index: 0;
  }
` as typeof Fab;

export const StyledFormLabel = styled(FormLabel)`
  & {
    color: rgba(0, 0, 0, 0.68);
    font-size: ${(p) => p.theme.typography.bodyS.fontSize};
    font-weight: ${(p) => p.theme.typography.bodyS.fontWeight};
    display: block;
    margin-bottom: ${(p) => p.theme.spacing(1)};
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
    padding-bottom: ${(p) => (p.$dense ? 0 : p.theme.spacing(2))};
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
