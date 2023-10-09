import { NextApiRequest, NextApiResponse } from "next";
import { pb } from "@/utils/Pocketbase";
import { getCarsFromDB } from "@/services/cars";
import { getParsedCarListQueryParams } from "@/utils/query";
import CarValidationSchema from "@/validation/car";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, method, body } = req;

  switch (method) {
    case "GET": {
      try {
        const parsedQueryParams = getParsedCarListQueryParams(query);
        const cars = await getCarsFromDB(parsedQueryParams);

        return res.status(200).json(cars);
      } catch (err) {
        return res.status(400).json({ message: err });
      }
    }
    case "POST": {
      try {
        CarValidationSchema.validate(body);
      } catch (err) {
        return res.status(400).json({ message: err });
      }

      try {
        const car = await pb.collection("cars").create(body);
        return res.status(200).json(car);
      } catch (err) {
        return res.status(500).json({ message: err });
      }
    }
  }
}
