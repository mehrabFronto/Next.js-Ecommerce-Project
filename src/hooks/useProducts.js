import { getAllProducts } from "@/services/productsServices";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
   useQuery({
      queryKey: ["get-products"],
      queryFn: getAllProducts,
      retry: false,
      refetchOnWindowFocus: true,
   });
