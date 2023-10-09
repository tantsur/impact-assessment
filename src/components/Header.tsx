import { AppBar, Toolbar, Typography } from "@mui/material";
import CarRentalIcon from "@mui/icons-material/CarRental";

export default function Header() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <CarRentalIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Random Car Rental
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
