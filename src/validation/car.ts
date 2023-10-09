import * as Yup from "yup";

const CarValidationSchema = Yup.object({
  price: Yup.number().min(200).max(3000).required(),
  image: Yup.mixed()
    .test((value) => value && "name" in value)
    .required(),
  brand: Yup.string().required(),
  model: Yup.string().required(),
  bodyType: Yup.string().required(),
  year: Yup.number().min(100).max(new Date().getFullYear()).required(),
});

export default CarValidationSchema;
