import { Car } from "@/types/car";
import { pb } from "../utils/Pocketbase";
import * as QUERY from "@/constants/query";
import { ParsedCarListQuery } from "@/types/query";

export const getCarsFromDB = async (query: ParsedCarListQuery) => {
  const pageValue = query[QUERY.PAGE_QUERY_PARAM_NAME];
  const searchValue = query[QUERY.SEARCH_QUERY_PARAM_NAME];
  const brandValue = query[QUERY.BRAND_QUERY_PARAM_NAME];
  const bodyTypeValue = query[QUERY.BODY_TYPE_PARAM_NAME];
  const priceRangeValue = query[QUERY.PRICE_RANGE_PARAM_NAME];

  let filterQueriesArr = [];

  // search
  if (searchValue) {
    filterQueriesArr.push(
      `(brand ~ "${searchValue}" || model ~ "${searchValue}" || bodyType ~ "${searchValue}")`
    );
  }

  // price range
  if (priceRangeValue?.length) {
    filterQueriesArr.push(
      `(price >= ${priceRangeValue[0]} && price <= ${priceRangeValue[1]})`
    );
  }

  // brand filter
  if (brandValue?.length) {
    const brandValueToDBQuery = brandValue.map(
      (brandName) => `brand = "${brandName}"`
    );

    // (brand = Range Rover || brand = ...)
    filterQueriesArr.push(`(${brandValueToDBQuery.join(" || ")})`);
  }

  // body type
  if (bodyTypeValue?.length) {
    const brandValueToDBQuery = bodyTypeValue.map(
      (brandName) => `bodyType = "${brandName}"`
    );

    // (brand = Range Rover || brand = ...)
    filterQueriesArr.push(`(${brandValueToDBQuery.join(" || ")})`);
  }

  const carsDBResponse = await pb
    .collection("cars")
    .getList<Car>(pageValue, QUERY.DEFAULT_PAGE_SIZE_QUERY_PARAM_VALUE, {
      filter: filterQueriesArr.join("&&"),
    });

  // unfortunately Pocketbase has no build-in way yet to populate the record with
  // the link referencing to the Pocletbase storadge. So we have to populate manually
  const carDBRecordsPopulatedWithImagePaths = await Promise.all(
    carsDBResponse.items.map((item) => ({
      ...item,
      image: pb.files.getUrl(item, item.image),
    }))
  );

  carsDBResponse.items = carDBRecordsPopulatedWithImagePaths;

  return carsDBResponse;
};

export const getSpecificCarFromDB = async (id: string) => {
  const car = await pb.collection("cars").getOne(id);

  const populatedImageLink = await pb.getFileUrl(car, car.image);
  car.image = populatedImageLink;

  return car;
};
