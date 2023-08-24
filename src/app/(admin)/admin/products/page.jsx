"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetProducts, useRemoveProduct } from "@/hooks/useProducts";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";
import ProductsTable from "./productsTable";

const ProductsPage = () => {
   const queryClient = useQueryClient();

   const { data, isLoading } = useGetProducts();
   const { products } = data || [];

   const { mutateAsync } = useRemoveProduct();

   const removeProductHandler = async (id) => {
      try {
         const { message } = await mutateAsync(id);
         toast.success(message);
         queryClient.invalidateQueries({ queryKey: ["get-products"] });
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   if (isLoading) return <ThreeDotsLoading />;

   return (
      <div className="container">
         <div className="flex flex-col md:flex-row items-start md:items-center gap-y-2 justify-between px-4 mb-6">
            <h1 className="text-2xl font-bold">اطلاعات محصولات</h1>
            <Link
               href="/admin/products/add"
               className="flex items-center gap-x-1 text-primary-600 font-medium">
               <PlusCircleIcon className="w-6 h-6 stroke-2" />
               <span>افزودن محصول جدید</span>
            </Link>
         </div>
         <ProductsTable
            products={products}
            onRemoveProduct={removeProductHandler}
         />
      </div>
   );
};

export default ProductsPage;
