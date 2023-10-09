import { Brand, BodyType } from "@/types/car";
import { Box, Button, Slider, Typography } from "@mui/material";
import { useFormik } from "formik";
import SytledMultiselect from "../../../Form/StyledMultiselect";
import { useRouter } from "next/router";
import { getParsedCarListQueryParams } from "@/utils/query";
import {
  DEFAULT_PRICE_RANGE_VALUE,
  MAX_PRICE_RANGE_VALUE,
  MIN_PRICE_RANGE_VALUE,
} from "@/constants/filters";
import AnimatedModal from "../../../Modal/AnimatedModal";

export type FormValues = {
  bodyType: BodyType[];
  brand: Brand[];
  priceRange: number[];
};

type Props = {
  handleClose: () => void;
  onSubmit: (formValues: FormValues) => void;
  clearFilters: () => void;
};

const BodyTypes = Object.values(BodyType);
const brands = Object.values(Brand);

function valuetext(value: number) {
  return `${value}$`;
}

export default function FiltersModal({
  handleClose,
  onSubmit,
  clearFilters,
}: Props) {
  const { query } = useRouter();

  const parsedQuery = getParsedCarListQueryParams(query);

  const formik = useFormik({
    initialValues: {
      bodyType: parsedQuery.bodyType,
      brand: parsedQuery.brand,
      priceRange: parsedQuery.priceRange,
    },
    onSubmit,
  });

  const clearFiltersInner = () => {
    formik.setValues({
      bodyType: [],
      brand: [],
      priceRange: DEFAULT_PRICE_RANGE_VALUE,
    });

    clearFilters();
  };

  return (
    <AnimatedModal handleClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            textAlign="center"
          >
            Filters
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6" color="text.secondary">
              Price
            </Typography>

            <Slider
              name="priceRange"
              getAriaLabel={() => "Price range"}
              value={formik.values.priceRange}
              onChange={formik.handleChange}
              getAriaValueText={valuetext}
              min={MIN_PRICE_RANGE_VALUE}
              max={MAX_PRICE_RANGE_VALUE}
              step={25}
              disableSwap
            />
            <Typography textAlign="center" color="text.secondary">
              Price in range {formik.values.priceRange[0]} -{" "}
              {formik.values.priceRange[1]}
            </Typography>
          </Box>

          <SytledMultiselect<BodyType>
            label="Body Type"
            name="bodyType"
            currentValue={formik.values.bodyType}
            onChange={formik.handleChange}
            values={BodyTypes}
          />

          <SytledMultiselect<Brand>
            label="Brand"
            name="brand"
            currentValue={formik.values.brand}
            onChange={formik.handleChange}
            values={brands}
          />

          <Box
            sx={{
              minWidth: 200,
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              margin: "auto",
              marginTop: 5,
            }}
          >
            <Button
              variant="contained"
              type="submit"
              disabled={formik.isSubmitting && !formik.touched}
            >
              Submit
            </Button>
            <Button variant="outlined" onClick={clearFiltersInner}>
              Clear Filters
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Box>
      </form>
    </AnimatedModal>
  );
}
