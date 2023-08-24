import {
   addCoupon,
   getAllCoupons,
   getOneCoupon,
   removeCoupon,
   updateCoupon,
} from "@/services/couponsServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllCoupons = () => {
   return useQuery({
      queryFn: getAllCoupons,
      queryKey: ["get-coupons"],
      retry: false,
      refetchOnWindowFocus: true,
   });
};

export const useGetOneCoupon = (id) => {
   return useQuery({
      queryFn: () => getOneCoupon(id),
      queryKey: ["get-coupon", id],
      retry: false,
      refetchOnWindowFocus: true,
   });
};

export const useAddCoupon = () => {
   return useMutation({ mutationFn: addCoupon });
};

export const useUpdateCoupon = () => {
   return useMutation({ mutationFn: updateCoupon });
};

export const useRemoveCoupon = () => {
   return useMutation({ mutationFn: removeCoupon });
};
