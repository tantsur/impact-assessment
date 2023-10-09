import { Box } from "@mui/material";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        p: 2,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      component="footer"
    >
      <Copyright />
    </Box>
  );
}
