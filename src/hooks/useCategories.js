import {
   addCategory,
   getAllCategories,
   getOneCategoryById,
   removeCategory,
   updateCategory,
} from "@/services/categoriesServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCategories = () =>
   useQuery({
      queryKey: ["get-categories"],
      queryFn: getAllCategories,
      retry: false,
      refetchOnWindowFocus: true,
   });

export const useGetCategoryById = (id) =>
   useQuery({
      queryKey: ["get-category", id],
      queryFn: () => getOneCategoryById(id),
      retry: false,
      refetchOnWindowFocus: true,
   });

export const useAddCategory = () => {
   return useMutation({
      mutationFn: addCategory,
   });
};

export const useUpdateCategory = () => {
   return useMutation({
      mutationFn: updateCategory,
   });
};

export const useRemoveCategory = () => {
   return useMutation({
      mutationFn: removeCategory,
   });
};
