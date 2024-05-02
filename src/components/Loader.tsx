import { Box, CircularProgress, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: theme.zIndex.modal + 1,
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const Loader = (): JSX.Element => {
  return (
    <StyledBox>
      <CircularProgress color="primary" />
    </StyledBox>
  );
};
