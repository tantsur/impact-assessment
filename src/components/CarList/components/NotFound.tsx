import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 6,
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        color="text.secondary"
        gutterBottom
      >
        Nothing found...
      </Typography>
      <Typography textAlign="center" color="text.primary">
        Try a different wording.
      </Typography>
      <SearchOffIcon sx={{ m: 3, transform: "scale(1.8)" }} />
    </Box>
  );
}
