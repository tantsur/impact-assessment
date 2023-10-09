import {
  getPageQueryValue,
  getParsedCarListQueryParams,
  getSearchQueryValue,
} from "@/utils/query";
import { ListResult } from "pocketbase";
import { debounce } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEventHandler, useCallback, useState } from "react";
import {
  countActiveFilters,
  fetchCarListAndUpdateURLRespectfully,
} from "./utils";
import { Car } from "@/types/car";
import * as QUERY from "@/constants/query";
import { FormValues as FiltersModalFormValues } from "./components/Modals/FiltersModal";
import { FormValues as AddCarModalFormValues } from "./components/Modals/AddCarModal";
import { pb } from "@/utils/Pocketbase";

export default function useCarList(carsSSR: ListResult<Car>) {
  const router = useRouter();

  // we will use router.query as a source of truth here, it will replace the storage
  const { priceRange, bodyType, brand, search } = getParsedCarListQueryParams(
    router.query
  );

  // CARS LIST DATA
  const [cars, setCars] = useState(carsSSR);

  // LOADING STATE
  const [isListLoading, setIsListLoading] = useState(false);

  // PAGINATION
  const [page, setPage] = useState(getPageQueryValue(router.query));

  // SEARCH
  const [searchValue, setSearchValue] = useState(
    getSearchQueryValue(router.query)
  );

  // MODALS
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);

  // debounce search function to decrease API load
  const debouncedFetchOnSearchChange = useCallback(
    debounce((newSearchValue: string) => {
      setIsListLoading(true);

      const query = {
        [QUERY.SEARCH_QUERY_PARAM_NAME]: newSearchValue,
        [QUERY.PRICE_RANGE_PARAM_NAME]: priceRange,
        [QUERY.BODY_TYPE_PARAM_NAME]: bodyType,
        [QUERY.BRAND_QUERY_PARAM_NAME]: brand,
      };

      fetchCarListAndUpdateURLRespectfully(
        query,
        router,
        setCars,
        setIsListLoading
      );
    }, 500),
    [router]
  );

  // handle state change for search input and dispatch a debounced search GET request
  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);

    debouncedFetchOnSearchChange(newSearchValue);
  };

  const handleClearSearchField = () => {
    handleSearchChange({ target: { value: "" } } as any);
  };

  // handle state change for pagination component and fetch new page
  const handlePaginationChange = (_: any, newPageValue: number) => {
    setPage(newPageValue);

    const query = {
      [QUERY.PAGE_QUERY_PARAM_NAME]: newPageValue.toString(),
      [QUERY.SEARCH_QUERY_PARAM_NAME]: search,
      [QUERY.PRICE_RANGE_PARAM_NAME]: priceRange,
      [QUERY.BODY_TYPE_PARAM_NAME]: bodyType,
      [QUERY.BRAND_QUERY_PARAM_NAME]: brand,
    };

    fetchCarListAndUpdateURLRespectfully(
      query,
      router,
      setCars,
      setIsListLoading
    );
  };

  const handleSubmitFilters = ({
    brand,
    bodyType,
    priceRange,
  }: FiltersModalFormValues) => {
    const query = {
      // we stick to the query value to be consistent
      [QUERY.SEARCH_QUERY_PARAM_NAME]: search,
      [QUERY.PRICE_RANGE_PARAM_NAME]: priceRange,
      [QUERY.BRAND_QUERY_PARAM_NAME]: brand,
      [QUERY.BODY_TYPE_PARAM_NAME]: bodyType,
    };

    fetchCarListAndUpdateURLRespectfully(
      query,
      router,
      setCars,
      setIsListLoading
    );
    setIsFiltersModalOpen(false);
  };

  const clearFilters = () => {
    const query = {
      [QUERY.SEARCH_QUERY_PARAM_NAME]: search,
      [QUERY.PRICE_RANGE_PARAM_NAME]: "",
      [QUERY.BRAND_QUERY_PARAM_NAME]: "",
      [QUERY.BODY_TYPE_PARAM_NAME]: "",
    };

    fetchCarListAndUpdateURLRespectfully(
      query,
      router,
      setCars,
      setIsListLoading
    );
    setIsFiltersModalOpen(false);
  };

  const activeFiltersCount = countActiveFilters({
    bodyType,
    brand,
    priceRange,
  });

  const handleSubmitAddCar = async (carFields: AddCarModalFormValues) => {
    // using form data to send the image to PocketBase
    const formData = new FormData();
    Object.entries(carFields).forEach(([key, value]) =>
      formData.append(key, value as any)
    );

    // I didn't have time to implement the POST endpoint properly - FormData endpoints are bit complicated with Next.js

    // await fetch("/api/cars", {
    //   method: "POST",
    //   body: formData,
    // });

    // saving with direct DB interaction exposing SDK to FE, which is definetely a bad practice, again - lack of time
    await pb.collection("cars").create(formData);

    setIsAddCarModalOpen(false);

    await fetchCarListAndUpdateURLRespectfully(
      router.query,
      router,
      setCars,
      setIsListLoading
    );
  };

  return {
    cars,
    setCars,

    isListLoading,
    setIsListLoading,

    isAddCarModalOpen,
    setIsAddCarModalOpen,

    isFiltersModalOpen,
    setIsFiltersModalOpen,
    clearFilters,
    activeFiltersCount,

    searchValue,
    handleSearchChange,
    handleClearSearchField,

    page,
    handlePaginationChange,

    handleSubmitFilters,

    handleSubmitAddCar,
  };
}
