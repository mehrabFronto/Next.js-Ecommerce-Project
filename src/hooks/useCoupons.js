import { getAllCoupons } from "@/services/couponsServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCoupons = () => {
   return useQuery({
      queryFn: getAllCoupons,
      queryKey: ["get-coupons"],
      retry: false,
      refetchOnWindowFocus: true,
   });
};
