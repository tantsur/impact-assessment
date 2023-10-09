import {
  BODY_TYPE_PARAM_NAME,
  BRAND_QUERY_PARAM_NAME,
  PAGE_QUERY_PARAM_NAME,
  PRICE_RANGE_PARAM_NAME,
  SEARCH_QUERY_PARAM_NAME,
} from "@/constants/query";
import { Brand, BodyType } from "./car";

export type CarListQuery = {
  [PAGE_QUERY_PARAM_NAME]?: string;
  [SEARCH_QUERY_PARAM_NAME]?: string;
  [BRAND_QUERY_PARAM_NAME]?: string;
  [BODY_TYPE_PARAM_NAME]?: string;
  [PRICE_RANGE_PARAM_NAME]?: string;
};

export type ParsedCarListQuery = {
  [PAGE_QUERY_PARAM_NAME]?: number;
  [SEARCH_QUERY_PARAM_NAME]?: string;
  [BRAND_QUERY_PARAM_NAME]?: Brand[];
  [BODY_TYPE_PARAM_NAME]?: BodyType[];
  [PRICE_RANGE_PARAM_NAME]?: number[];
};
