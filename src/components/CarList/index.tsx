import { ListResult } from "pocketbase";

import TuneIcon from "@mui/icons-material/Tune";
import ClearIcon from "@mui/icons-material/Clear";

import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import FiltersModal from "./components/Modals/FiltersModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCar from "./components/Modals/AddCarModal";
import CarCard from "./components/CarCard";
import CarCardSkeleton from "./components/CarCardSkeleton";
import { Car } from "@/types/car";
import useCarList from "./hooks";
import { DEFAULT_PAGE_SIZE_QUERY_PARAM_VALUE } from "@/constants/query";

type Props = {
  carsSSR: ListResult<Car>;
  pageSSR: number;
};

export default function CarList({ carsSSR }: Props) {
  // passing logic to a custom hook to unload the view
  const {
    cars,

    isListLoading,

    isAddCarModalOpen,
    setIsAddCarModalOpen,

    isFiltersModalOpen,
    setIsFiltersModalOpen,

    searchValue,
    handleSearchChange,
    handleClearSearchField,

    page,
    handlePaginationChange,

    handleSubmitFilters,
    clearFilters,
    activeFiltersCount,

    handleSubmitAddCar,
  } = useCarList(carsSSR);

  return (
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome to the Random Cars Service!
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            We are the BEST service in the area. No doubts.
          </Typography>
        </Container>
      </Box>

      <Box>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                value={searchValue}
                onChange={handleSearchChange}
                disabled={isListLoading}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      sx={{ visibility: searchValue ? "visible" : "hidden" }}
                      onClick={handleClearSearchField}
                    >
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={6} sm={2}>
              <Badge
                color="secondary"
                badgeContent={activeFiltersCount}
                showZero
              >
                <Button
                  onClick={() => setIsFiltersModalOpen(true)}
                  fullWidth
                  variant="contained"
                  endIcon={<TuneIcon />}
                >
                  Filters
                </Button>
              </Badge>
            </Grid>

            <Grid item xs={6} sm={2}>
              <Button
                onClick={() => setIsAddCarModalOpen(true)}
                fullWidth
                variant="outlined"
                endIcon={<AddCircleIcon />}
              >
                Add Car
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {isListLoading &&
            Array.from(new Array(DEFAULT_PAGE_SIZE_QUERY_PARAM_VALUE)).map(
              (_, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <CarCardSkeleton />
                </Grid>
              )
            )}

          {!isListLoading &&
            cars.items.map((car) => (
              <Grid item key={car.id} xs={12} sm={6} md={4}>
                <CarCard {...car} />
              </Grid>
            ))}
        </Grid>

        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 6,
            pb: 2,
          }}
          display="flex"
          justifyContent="center"
        >
          {cars.totalItems !== 0 && (
            <Pagination
              count={cars.totalPages}
              page={page}
              onChange={handlePaginationChange}
              color="primary"
              disabled={isListLoading || cars.totalPages === 1}
            />
          )}
        </Box>
      </Container>

      {isFiltersModalOpen && (
        <FiltersModal
          handleClose={() => setIsFiltersModalOpen(false)}
          onSubmit={handleSubmitFilters}
          clearFilters={clearFilters}
        />
      )}

      {isAddCarModalOpen && (
        <AddCar
          handleClose={() => setIsAddCarModalOpen(false)}
          onSubmit={handleSubmitAddCar}
        />
      )}
    </main>
  );
}
