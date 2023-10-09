import { DEFAULT_PRICE_RANGE_VALUE } from "@/constants/filters";
import {
  BODY_TYPE_PARAM_NAME,
  BRAND_QUERY_PARAM_NAME,
  DEFAULT_PAGE_QUERY_PARAM_VALUE,
  DEFAULT_SEARCH_QUERY_PARAM_VALUE,
  PAGE_QUERY_PARAM_NAME,
  PRICE_RANGE_PARAM_NAME,
  SEARCH_QUERY_PARAM_NAME,
} from "@/constants/query";
import { BodyType, Brand } from "@/types/car";
import { CarListQuery } from "@/types/query";

export const getPageQueryValue = (query: CarListQuery) => {
  return query[PAGE_QUERY_PARAM_NAME]
    ? Number(query[PAGE_QUERY_PARAM_NAME])
    : DEFAULT_PAGE_QUERY_PARAM_VALUE;
};

export const getSearchQueryValue = (query: CarListQuery) => {
  // TODO: do we really need the default param value here?
  return query[SEARCH_QUERY_PARAM_NAME] || DEFAULT_SEARCH_QUERY_PARAM_VALUE;
};

export const getPriceRangeQueryValue = (query: CarListQuery) => {
  return query[PRICE_RANGE_PARAM_NAME]
    ? query[PRICE_RANGE_PARAM_NAME].split(",").map((v) => Number(v))
    : DEFAULT_PRICE_RANGE_VALUE;
};

export const getBrandQueryValue = (query: CarListQuery) => {
  return query[BRAND_QUERY_PARAM_NAME]
    ? (query[BRAND_QUERY_PARAM_NAME].split(",") as Brand[])
    : [];
};

export const getBodyTypeQueryValue = (query: CarListQuery) => {
  return query[BODY_TYPE_PARAM_NAME]
    ? (query[BODY_TYPE_PARAM_NAME].split(",") as BodyType[])
    : [];
};

export const getParsedCarListQueryParams = (query: CarListQuery) => {
  return {
    [PAGE_QUERY_PARAM_NAME]: getPageQueryValue(query),
    [SEARCH_QUERY_PARAM_NAME]: getSearchQueryValue(query),
    [PRICE_RANGE_PARAM_NAME]: getPriceRangeQueryValue(query),
    [BRAND_QUERY_PARAM_NAME]: getBrandQueryValue(query),
    [BODY_TYPE_PARAM_NAME]: getBodyTypeQueryValue(query),
  };
};
