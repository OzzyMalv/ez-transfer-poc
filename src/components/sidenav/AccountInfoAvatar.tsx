"use client";

import AvatarIcon from "@/components/shared/AvatarIcon";
import { useAppSelector } from "@/store";
import {
  selectUserEmail,
  selectUserFirstName,
} from "@/store/slices/auth.slice";

const AccountInfoAvatar = () => {
  const authFirstName = useAppSelector(selectUserFirstName);
  const authEmail = useAppSelector(selectUserEmail);

  return (
    <AvatarIcon
      firstName={authFirstName}
      email={authEmail}
      margin={"0"}
      menuLocation="outside"
      avatarProps={{
        variant: "square",
        sx: {
          height: "32px !important",
          width: "32px !important",
          borderRadius: "12px",
          background: "rgba(37, 137, 255, 1) !important",
        },
      }}
    />
  );
};

export default AccountInfoAvatar;
