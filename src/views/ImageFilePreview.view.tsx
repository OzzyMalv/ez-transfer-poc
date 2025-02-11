import { Preview } from "@/api/types/receiverUser.types";
import theme from "@/styles/theme";
import { Box } from "@mui/material";
import Image from "next/image";

interface Props {
  fileName: string;
  thumbnailUrl: Preview["largeThumbnailUrl"];
}

const ImageFilePreview = ({ fileName, thumbnailUrl }: Props) => {
  if (!!thumbnailUrl) {
    return (
      <Box
        data-testid="dti-image-preview"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        position="relative"
        sx={{
          backgroundColor: "#FAFAFA",
          height: {
            xs: theme.spacing(24),
            sm: theme.spacing(50),
            md: theme.spacing(73),
          },
        }}
      >
        <Image
          unoptimized
          src={thumbnailUrl}
          alt={fileName}
          priority
          fill
          style={{ objectFit: "scale-down" }}
        />
      </Box>
    );
  }
  return null;
};

export default ImageFilePreview;
