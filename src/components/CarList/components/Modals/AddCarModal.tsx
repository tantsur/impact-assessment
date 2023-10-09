import { useFormik } from "formik";
import { InferType } from "yup";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AnimatedModal from "@/components/Modal/AnimatedModal";
import { BodyType, Brand } from "@/types/car";
import CarValidationSchema from "@/validation/car";

import { getFilenameFromFilePathString } from "@/utils/file";
import { ReactNode } from "react";

export type FormValues = InferType<typeof CarValidationSchema>;

type Props = {
  handleClose: () => void;
  onSubmit: (formValues: FormValues) => void;
};

export default function AddCar({ handleClose, onSubmit }: Props) {
  const formik = useFormik({
    initialValues: {
      bodyType: BodyType.Sedan,
      brand: Brand.Tesla,
      image: {} as File,
      model: "",
      price: 200,
      year: new Date().getFullYear(),
    },
    validationSchema: CarValidationSchema,
    onSubmit,
  });

  return (
    <AnimatedModal handleClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <Typography
          variant="h4"
          component="h3"
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Add New Car
        </Typography>

        <Grid container spacing={3} sx={{ minWidth: 300 }}>
          <Grid item xs={12} sm={6}>
            <InputLabel id="add-car-brand">Brand</InputLabel>
            <Select
              labelId="add-car-brand"
              fullWidth
              name="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
            >
              {Object.values(Brand).map((brand) => (
                <MenuItem key={brand} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel id="add-car-body-type">Body Type</InputLabel>
            <Select
              labelId="add-car-body-type"
              fullWidth
              label="Body Type"
              name="bodyType"
              value={formik.values.bodyType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bodyType && Boolean(formik.errors.bodyType)}
            >
              {Object.values(BodyType).map((bodyType) => (
                <MenuItem key={bodyType} value={bodyType}>
                  {bodyType}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="model"
              label="Model"
              value={formik.values.model}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.model && Boolean(formik.errors.model)}
              helperText={formik.touched.model && formik.errors.model}
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              type="number"
              name="year"
              label="Year"
              InputProps={{
                // max is a current year
                inputProps: { min: 2000, max: new Date().getFullYear() },
              }}
              value={formik.values.year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
            />
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              name="price"
              type="number"
              label="Price"
              InputProps={{
                inputProps: { min: 0, max: 10000, required: true },
              }}
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <input
                type="file"
                name="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.target.files?.[0]);
                }}
                onBlur={formik.handleBlur}
                style={{ visibility: "hidden", width: 0, height: 0 }}
              />
            </Button>

            {formik.values.image?.name && (
              <Typography color="text.secondary" textAlign="center">
                {getFilenameFromFilePathString(formik.values.image?.name)}
              </Typography>
            )}

            <Typography color="error" textAlign="center">
              {formik.touched.image && (formik.errors.image as ReactNode)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                minWidth: 200,
                width: "30%",
                display: "flex",
                justifyContent: "space-around",
                margin: "auto",
                marginTop: 2,
              }}
            >
              <Button
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Submit
              </Button>
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AnimatedModal>
  );
}
