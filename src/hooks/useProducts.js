import {
   addProduct,
   getAllProducts,
   getOneProductById,
   removeProduct,
   updateProduct,
} from "@/services/productsServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
   useQuery({
      queryKey: ["get-products"],
      queryFn: getAllProducts,
      retry: false,
      refetchOnWindowFocus: true,
   });

export const useGetProductById = (id) =>
   useQuery({
      queryKey: ["get-product", id],
      queryFn: () => getOneProductById(id),
      retry: false,
      refetchOnWindowFocus: true,
   });

export const useAddProduct = () => {
   return useMutation({
      mutationFn: addProduct,
   });
};

export const useUpdateProduct = () => {
   return useMutation({
      mutationFn: updateProduct,
   });
};

export const useRemoveProduct = () => {
   return useMutation({
      mutationFn: removeProduct,
   });
};
