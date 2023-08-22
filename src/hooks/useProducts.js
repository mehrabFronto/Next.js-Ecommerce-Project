import { addProduct, getAllProducts } from "@/services/productsServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
   useQuery({
      queryKey: ["get-products"],
      queryFn: getAllProducts,
      retry: false,
      refetchOnWindowFocus: true,
   });

export const useAddProduct = () => {
   return useMutation({
      mutationFn: addProduct,
   });
};
