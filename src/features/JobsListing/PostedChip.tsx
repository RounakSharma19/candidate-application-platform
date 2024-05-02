import { Chip, Typography } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import { jobs } from "@lang";

export const PostedChip = (): JSX.Element => {
  const useMessage = jobs.listing;
  const localized = {
    posted: useMessage.posted,
  };
  return (
    <Chip
      icon={<TimerIcon />}
      label={
        <Typography variant="subtitle2" fontWeight="bolder">
          {localized.posted}
        </Typography>
      }
      size="small"
      sx={{
        boxShadow: 1,
        borderRadius: 16,
        border: "1px solid #D3D3D3",
        bgcolor: (theme) => theme.palette.background.default,
        height: 30,
        margin: "10px 0 10px 0",
      }}
    />
  );
};
