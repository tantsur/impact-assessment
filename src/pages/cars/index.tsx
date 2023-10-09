import { ListResult } from "pocketbase";
import { GetServerSideProps } from "next";
import { getParsedCarListQueryParams } from "@/utils/query";
import { Car } from "@/types/car";
import CarList from "@/components/CarList";

import { PAGE_QUERY_PARAM_NAME } from "@/constants/query";
import { getCarsFromDB } from "@/services/cars";

type Props = {
  carsSSR: ListResult<Car>;
  pageSSR: number;
};

export default function Page(props: Props) {
  return <CarList {...props} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const parsedQueryParams = getParsedCarListQueryParams(query);
  const cars = await getCarsFromDB(parsedQueryParams);

  return {
    props: {
      carsSSR: cars,
      pageSSR: parsedQueryParams[PAGE_QUERY_PARAM_NAME],
    },
  };
};
