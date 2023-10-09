import { Brand } from "@/types/car";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

type Props = {
  id: string;
  image: string;
  brand: Brand;
  model: string;
  price: number;
};

export default function CarCard({ id, brand, model, image, price }: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: "56.25%",
        }}
        image={image}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {brand} {model}
        </Typography>
        <Typography>{price}$/day</Typography>
      </CardContent>
      <CardActions>
        <Link href={`/cars/${id}`} onClick={() => {}}>
          <Button size="small">View</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
