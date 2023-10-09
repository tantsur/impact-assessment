import { Typography } from "@mui/material";
import Link from "next/link";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://randomcarrental.bestservice.com/">
        Random Car Rental
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
