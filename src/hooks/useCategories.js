import { getAllCategories } from "@/services/categoriesServices";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () =>
   useQuery({
      queryKey: ["get-categories"],
      queryFn: getAllCategories,
      retry: false,
      refetchOnWindowFocus: true,
   });
