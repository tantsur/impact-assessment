import { Box, Skeleton } from "@mui/material";

export default function CarCardSkeleton() {
  return (
    <>
      <Skeleton variant="rectangular" height={143} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </Box>
    </>
  );
}
