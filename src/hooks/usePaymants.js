import { getAllPayments } from "@/services/paymentsServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPayments = () => {
   return useQuery({
      queryFn: getAllPayments,
      queryKey: ["get-payments"],
      retry: false,
      refetchOnWindowFocus: true,
   });
};
