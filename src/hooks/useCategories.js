import { addCategory, getAllCategories } from "@/services/categoriesServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCategories = () =>
   useQuery({
      queryKey: ["get-categories"],
      queryFn: getAllCategories,
      retry: false,
      refetchOnWindowFocus: true,
   });

export const useAddCategory = () => {
   return useMutation({
      mutationFn: addCategory,
   });
};
