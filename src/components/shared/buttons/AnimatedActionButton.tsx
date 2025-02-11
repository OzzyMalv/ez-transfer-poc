import { useRef, useState } from "react";
import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Fade,
  Typography,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import theme, { withTransientProps } from "@/styles/theme";

interface IStyledButtonProps {
  $isAnimating: boolean;
  $buttonWidth?: {
    firstView: string;
    secondView: string;
  };
  $isReceivedTransfer?: boolean;
}

const heightCalc = (size: "small" | "medium" | "large" | undefined) => {
  switch (size) {
    case "large":
      return theme.spacing(6);

    case "small":
      return theme.spacing(4);
    case "medium":
    default:
      return theme.spacing(5);
  }
};

const StyledButton = styled(Button, withTransientProps)<IStyledButtonProps>`
  && {
    overflow: hidden;
    transition: 1s width linear;
    ${(p) =>
      p.$buttonWidth &&
      `
    width: ${
      p.$isAnimating ? p.$buttonWidth.secondView : p.$buttonWidth.firstView
    };
  `}
    height: ${(p) => heightCalc(p?.size)}
    ${(p) => p.$isReceivedTransfer && `border-radius: 12px;`}
  }
`;

interface IStyledInnerButtonContentProps extends BoxProps {
  $isAnimating: boolean;
}

export const checkmarkAnimation = keyframes({
  to: {
    strokeDashoffset: 0,
  },
});

const StyledInnerButtonContent = styled(
  Box,
  withTransientProps,
)<IStyledInnerButtonContentProps>`
  && {
    display: flex;
    align-items: center;
    & svg {
      margin-right: ${({ theme }) => theme.spacing(1)};
      font-size: ${({ theme }) => theme.spacing(2)};
    }
    transform: translateY(${(p) => (p.$isAnimating === true ? "-37px" : 0)});
    transition: transform 0.7s ease;
    transition-delay: 0.5s;
  }
`;

const SecondElement = styled(StyledInnerButtonContent)`
  && {
    position: absolute;
    transform: translateY(${(p) => (p.$isAnimating ? "37px" : 0)});
    & svg path {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      pointer-events: none;
      animation: ${(p) => (p.$isAnimating ? checkmarkAnimation : "none")} 1s
        ease-in-out 0.7s forwards;
    }
  }
`;
interface IAnimatedActionButtonProps extends ButtonProps {
  customStartIcon: {
    firstView: JSX.Element;
    secondView: JSX.Element;
  };
  btnText: {
    firstView: string;
    secondView: string;
  };
  buttonWidth?: {
    firstView: string;
    secondView: string;
  };
  animationDuration?: number;
  onClickCallBack?: () => void;
}

const AnimatedActionButton: React.FC<IAnimatedActionButtonProps> = (props) => {
  const secondElementRef = useRef(null);
  const {
    animationDuration = 4000,
    onClickCallBack,
    btnText,
    customStartIcon,
    buttonWidth,
    ...rest
  } = props;

  const [isAnimating, setIsAnimating] = useState(false);

  const onClick = () => {
    if (!isAnimating) {
      if (onClickCallBack) onClickCallBack();
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(isAnimating);
      }, animationDuration);
    }
  };

  return (
    <StyledButton
      variant="contained"
      $isAnimating={isAnimating}
      $buttonWidth={buttonWidth}
      $isReceivedTransfer
      {...rest}
      onClick={onClick}
      ref={secondElementRef}
    >
      <StyledInnerButtonContent $isAnimating={isAnimating}>
        {customStartIcon.firstView}
        <Typography variant="bodyM">{btnText.firstView}</Typography>
      </StyledInnerButtonContent>
      <SecondElement $isAnimating={!isAnimating}>
        <Fade dir="up" in={isAnimating} appear={isAnimating} timeout={3000}>
          {customStartIcon.secondView}
        </Fade>
        <Typography variant="bodyM">{btnText.secondView}</Typography>
      </SecondElement>
    </StyledButton>
  );
};

export default AnimatedActionButton;
