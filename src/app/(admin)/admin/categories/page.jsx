"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetCategories, useRemoveCategory } from "@/hooks/useCategories";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";
import CategoriesTable from "./CategoriesTable";

const CategoriesPage = () => {
   const queryClient = useQueryClient();

   const { data, isLoading } = useGetCategories();
   const { categories } = data || {};

   const { mutateAsync } = useRemoveCategory();

   const removeCategoryHandler = async (id) => {
      try {
         const { message } = await mutateAsync(id);
         toast.success(message);
         queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   if (isLoading) return <ThreeDotsLoading />;

   return (
      <div className="container">
         <div className="flex flex-col md:flex-row items-start md:items-center gap-y-2 justify-between px-4 mb-6">
            <h1 className="text-2xl font-bold">اطلاعات دسته بندی ها</h1>
            <Link
               href="/admin/categories/add"
               className="flex items-center gap-x-1 text-primary-600 font-medium">
               <PlusCircleIcon className="w-6 h-6 stroke-2" />
               <span>افزودن دسته بندی جدید</span>
            </Link>
         </div>
         <CategoriesTable
            categories={categories}
            onRemoveCategory={removeCategoryHandler}
         />
      </div>
   );
};

export default CategoriesPage;
