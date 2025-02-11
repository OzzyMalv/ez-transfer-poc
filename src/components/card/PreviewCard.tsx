"use client";

import { Box, IconButton, Menu, Typography } from "@mui/material";
import { MoreVertRounded } from "@mui/icons-material";
import {
  CardMediaDefaultStyled,
  CardMediaImgStyled,
  CardStyled,
  CircularProgressStyled,
  FilesChipStyled,
  ListItemStyled,
  MenuItemStyled,
  TextContainerStyled,
} from "@/components/card/previewCard.styles";
import Image from "next/image";
import { sizeAndUnitCalc } from "@/common/utils/fileUtils";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import theme from "@/styles/theme";
import { setResetFilesWithVirus } from "@/store/slices/workspace.slice";
import { useAppDispatch } from "@/store";

interface IPreviewCardProps {
  thumbnailImage?: string;
  totalFileSize?: number;
  name: string;
  id: string;
  lastEditedDate: string;
  numberOfFiles: number;
  linkSrc?: string;
  onClickDelete: (id: string) => void;
  onClickRename: (id: string) => void;
}
const PreviewCard = ({
  name,
  id,
  thumbnailImage,
  lastEditedDate,
  totalFileSize = 0,
  numberOfFiles,
  linkSrc = "",
  onClickDelete,
  onClickRename,
}: IPreviewCardProps) => {
  const { t } = useTranslation("workspaces");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isImageLoading, setImageLoading] = useState(true);
  const formattedFilesSize = sizeAndUnitCalc(totalFileSize);
  const dispatch = useAppDispatch();

  const isoDateToFormat = (isoDate: string) => {
    const inputDate = dayjs(isoDate);
    const today = dayjs();

    if (inputDate.isSame(today, "day")) {
      return t("card.date.editedToday");
    }
    if (inputDate.isSame(today.subtract(1, "day"), "day")) {
      return t("card.date.editedYesterday");
    }

    return inputDate.format("DD MMM YYYY");
  };

  const formattedLastEditedDate = isoDateToFormat(lastEditedDate);

  const handleClickMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  const handleClickDelete = () => {
    handleCloseMore();
    onClickDelete(id);
  };

  const handleClickRename = () => {
    handleCloseMore();
    onClickRename(id);
  };

  const filesLabel = () => {
    let fileLabel = "";
    if (numberOfFiles < 1) {
      fileLabel = "card.number.zero.files";
    } else if (numberOfFiles === 1) {
      fileLabel = "card.number.file";
    } else {
      fileLabel = "card.number.files";
    }
    return fileLabel;
  };

  return (
    <CardStyled>
      {isImageLoading && (
        <CardMediaDefaultStyled>
          <CircularProgressStyled size={20} />
        </CardMediaDefaultStyled>
      )}
      <Box position="relative" height={isImageLoading ? 0 : "auto"}>
        <Link
          href={linkSrc}
          scroll={false}
          onClick={() => dispatch(setResetFilesWithVirus([]))}
        >
          <CardMediaImgStyled $withHover={!isImageLoading}>
            {!isImageLoading && (
              <>
                <div className="stacked-card stacked-card-1" />
                <div className="stacked-card stacked-card-2" />
              </>
            )}

            <Image
              src={thumbnailImage ?? "/img/project-empty.svg"}
              alt={name}
              style={{
                width: "100%",
                borderRadius: "16px",
                backgroundColor: "#FCFCFC",
                border: "1px solid #E3E3E3",
                visibility: isImageLoading ? "hidden" : "visible",
                objectFit: !!thumbnailImage ? "cover" : "none",
              }}
              onLoad={() => setImageLoading(false)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
              priority
              quality={100}
            />
          </CardMediaImgStyled>
          <Box position="absolute" right={12} bottom={12}>
            <FilesChipStyled
              label={t(filesLabel(), { amount: numberOfFiles })}
              clickable={false}
            />
          </Box>
        </Link>
      </Box>

      <ListItemStyled>
        <TextContainerStyled>
          <Typography
            sx={{ width: "100%" }}
            variant="titleS"
            textOverflow="ellipsis"
            overflow="hidden"
            noWrap
          >
            {name}
          </Typography>
          <Typography variant="bodyS" color="textSecondary">
            {formattedFilesSize}・{formattedLastEditedDate}
          </Typography>
        </TextContainerStyled>

        <IconButton
          id="more-button"
          size="small"
          aria-label="more"
          aria-controls={!!anchorEl ? "more-button" : undefined}
          aria-expanded={!!anchorEl ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClickMore}
        >
          <MoreVertRounded fontSize="small" />
        </IconButton>
        <Menu
          id="more-button"
          MenuListProps={{
            "aria-labelledby": "more-button",
            disablePadding: true,
          }}
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleCloseMore}
          PaperProps={{
            elevation: 0,
            sx: {
              width: theme.spacing(14),
              padding: theme.spacing(1),
              borderRadius: theme.spacing(1.5),
              background: "#555",
              marginTop: "10px",
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItemStyled onClick={handleClickRename} sx={{ marginBottom: 1 }}>
            <Typography variant="bodyM" sx={{ color: "#FFFFFF" }}>
              {t("menu.item.rename")}
            </Typography>
          </MenuItemStyled>
          <MenuItemStyled onClick={handleClickDelete}>
            <Typography variant="bodyM" sx={{ color: "#FFFFFF" }}>
              {t("menu.item.delete")}
            </Typography>
          </MenuItemStyled>
        </Menu>
      </ListItemStyled>
    </CardStyled>
  );
};

export default PreviewCard;
