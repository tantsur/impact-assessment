import {
  MAX_PRICE_RANGE_VALUE,
  MIN_PRICE_RANGE_VALUE,
} from "@/constants/filters";
import { Car } from "@/types/car";
import { ParsedCarListQuery } from "@/types/query";
import { NextRouter } from "next/router";
import { ListResult } from "pocketbase";
import { Dispatch, SetStateAction } from "react";

// fetch cars list, handle loading and route update - we do this every time filters change
export function fetchCarListAndUpdateURLRespectfully(
  query: any,
  router: NextRouter,
  setCars: Dispatch<SetStateAction<ListResult<Car>>>,
  setIsListLoading: Dispatch<SetStateAction<boolean>>
) {
  const queryString = new URLSearchParams(query);

  setIsListLoading(true);

  // update the URL without reloading the page to preserve search state
  // e.g. share the link functionality
  router.push(`${window.location.pathname}?${queryString}`, undefined, {
    shallow: true,
  });

  return fetch(`/api/cars?${queryString}`)
    .then((response) => response.json())
    .then((cars) => {
      setCars(cars);
    })
    .finally(() => setIsListLoading(false));
}

export function countActiveFilters({
  brand,
  bodyType,
  priceRange,
}: ParsedCarListQuery) {
  let count = 0;

  if (brand?.length) {
    count++;
  }
  if (bodyType?.length) {
    count++;
  }
  if (
    priceRange?.[0] !== MIN_PRICE_RANGE_VALUE ||
    priceRange?.[1] !== MAX_PRICE_RANGE_VALUE
  ) {
    count++;
  }

  return count;
}
