"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetCategories } from "@/hooks/useCategories";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CategoriesTable from "./CategoriesTable";

const CategoriesPage = () => {
   const { data, isLoading } = useGetCategories();
   const { categories } = data || {};

   if (categories) console.log(categories);

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
         <CategoriesTable categories={categories} />
      </div>
   );
};

export default CategoriesPage;
