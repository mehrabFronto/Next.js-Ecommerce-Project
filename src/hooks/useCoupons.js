import { addCoupon, getAllCoupons } from "@/services/couponsServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllCoupons = () => {
   return useQuery({
      queryFn: getAllCoupons,
      queryKey: ["get-coupons"],
      retry: false,
      refetchOnWindowFocus: true,
   });
};

export const useAddCoupon = () => {
   return useMutation({ mutationFn: addCoupon });
};
