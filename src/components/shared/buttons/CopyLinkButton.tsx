import React, { useRef, useState } from "react";
import { Box, Button, Slide } from "@mui/material";
import { CheckRounded } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import theme, { withTransientProps } from "@/styles/theme";

interface IButtonCopyStyledProps {
  $isFilePreview: boolean;
  $isReceivedTransfer?: boolean;
}
const ButtonCopyStyled = styled(
  Button,
  withTransientProps,
)<IButtonCopyStyledProps>`
  && {
    justify-content: flex-start;
    border: ${(p) =>
      p.$isFilePreview ? "none" : "1px solid rgba(0, 0, 0, 0.12)"};
    ${(p) => p.$isReceivedTransfer && `border-radius: ${p.theme.spacing(1)};`}
    background-color: #fff;
    width: 100%;
    display: flex;
    font-weight: 400;
    ${(p) => p.$isFilePreview && `padding: ${p.theme.spacing(0.5, 0)};`}
    height: ${(p) => p.theme.spacing(5)};
`;

const LinkText = styled.div`
  && {
    margin-right: ${(p) => p.theme.spacing(8)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

interface IRounderCopyButtonProps {
  $isReceivedTransfer?: boolean;
}
const RounderCopyButton = styled.div<IRounderCopyButtonProps>`
  && {
    position: absolute;
    right: ${(p) => p.theme.spacing(0.5)};
    border-radius: ${(p) => p.theme.spacing(3)};
    ${(p) => !p.$isReceivedTransfer && `border: 1px solid rgba(0, 0, 0, 0.12);`}
    padding: ${(p) => p.theme.spacing(0.5, 1.5, 0.5, 1.5)};
    font-weight: 500;
  }
`;

interface Props {
  linkToCopy: string;
  preview?: boolean;
  isReceivedTransfer?: boolean;
}
const CopyLinkButton: React.FC<Props> = ({
  linkToCopy = "",
  preview = false,
  isReceivedTransfer = false,
}) => {
  const [isLandingUrlCopied, setIsLandingUrlCopied] = useState(false);
  const copyLandingLinkRef = useRef(undefined);
  const { t } = useTranslation("receiverSessionFiles");

  return (
    <ButtonCopyStyled
      $isFilePreview={preview}
      $isReceivedTransfer={isReceivedTransfer}
      startIcon={
        <Box
          ref={copyLandingLinkRef}
          sx={{
            "&&": {
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: 32,
            },
          }}
        >
          <Slide
            direction="down"
            in={!isLandingUrlCopied}
            mountOnEnter
            unmountOnExit
            container={copyLandingLinkRef.current}
            appear={false}
          >
            <img
              width={16}
              height={16}
              style={{ margin: "auto", marginLeft: theme.spacing(0.5) }}
              src="/img/linkRoundedRotated.svg"
              alt=""
            />
          </Slide>
          <Slide
            direction="up"
            in={isLandingUrlCopied}
            mountOnEnter
            unmountOnExit
            container={copyLandingLinkRef.current}
          >
            <CheckRounded
              fontSize="small"
              sx={{
                width: theme.spacing(2),
                margin: "auto",
                marginLeft: theme.spacing(0.5),
              }}
            />
          </Slide>
        </Box>
      }
      data-testid="dti-share-receiver-link-btn"
      data-analytics="share-receiver-link-btn"
      onClick={() => {
        navigator.clipboard.writeText(linkToCopy);
        setIsLandingUrlCopied(true);
        setTimeout(() => {
          setIsLandingUrlCopied(false);
        }, 4000);
      }}
      size="small"
    >
      <LinkText>{linkToCopy}</LinkText>
      <RounderCopyButton $isReceivedTransfer={isReceivedTransfer}>
        {t("receiver_session_files.copy.btn")}
      </RounderCopyButton>
    </ButtonCopyStyled>
  );
};

export default CopyLinkButton;
