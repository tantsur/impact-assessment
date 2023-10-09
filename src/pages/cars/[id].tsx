import { Box, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { Car } from "@/types/car";
import { getSpecificCarFromDB } from "@/services/cars";

type Props = {
  carSSR: Car;
};

export default function Page({ carSSR }: Props) {
  const { brand, model, image, bodyType, year, price } = carSSR;

  return (
    <Box sx={{ pb: 10 }}>
      <Image
        src={image}
        alt="car"
        width="600"
        height="600"
        style={{
          width: "100%",
          maxWidth: 600,
          height: "auto",
          margin: "auto",
          display: "block",
        }}
      />
      <Box>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
        >
          {brand}
        </Typography>
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          {model}
        </Typography>

        <Typography
          component="h2"
          variant="h5"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          {year}
        </Typography>

        <Typography component="h2" variant="h6" align="center">
          Body Type: {bodyType}
        </Typography>

        <Typography component="h2" variant="h6" align="center">
          Price: {price}$/day
        </Typography>
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const carSSR = await getSpecificCarFromDB(params?.id as string);
    return { props: { carSSR } };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
