"use client";

import { AvatarProps, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { UserAvatar } from "./navbar/navbar.styles";
import Image from "next/image";

interface Props {
  firstName: string;
  email: string;
  margin?: string;
  menuLocation?: "outside" | "inside";
  avatarProps?: AvatarProps;
}

const AvatarIcon: FC<Props> = ({
  firstName,
  email,
  margin = "0",
  menuLocation = "outside",
  avatarProps = {},
}) => {
  const [firstLetter, setFirstLetter] = useState("");

  useEffect(() => {
    if (email) {
      setFirstLetter(email[0]);
    } else if (firstName) {
      const removeEmoji = firstName?.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        "",
      );
      setFirstLetter(removeEmoji[0] ? removeEmoji[0] : "");
    } else {
      setFirstLetter(""); // Reset to empty if no email or firstName
    }
  }, [email, firstName]);

  if (!firstName && !email) {
    return (
      <Image
        src="/img/Avatar-placeholder.svg"
        width={40}
        height={40}
        alt="profile"
        data-testid="dti-profile-image"
        priority
      />
    );
  }

  return (
    <UserAvatar
      $menuOpen={false}
      $menuLocation={menuLocation}
      sx={{
        margin: margin,
      }}
      data-testid="dti-user-avatar"
      {...avatarProps}
    >
      <Typography variant="bodyM" sx={{ textTransform: "uppercase" }}>
        {firstLetter}
      </Typography>
    </UserAvatar>
  );
};

export default AvatarIcon;
