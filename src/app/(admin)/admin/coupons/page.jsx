"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetAllCoupons } from "@/hooks/useCoupons";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import CouponsTable from "./CouponsTable";

const CouponsPage = () => {
   const { isLoading, data } = useGetAllCoupons();
   const { coupons } = data || {};

   if (isLoading) return <ThreeDotsLoading />;

   return (
      <div className="container">
         <div className="flex flex-col md:flex-row items-start md:items-center gap-y-2 justify-between px-4 mb-6">
            <h1 className="text-2xl font-bold">کد تخفیف</h1>
            <Link
               href="/admin/coupons/add"
               className="flex items-center gap-x-1 text-primary-600 font-medium">
               <PlusCircleIcon className="w-6 h-6 stroke-2" />
               <span>افزودن کد تخفیف جدید</span>
            </Link>
         </div>
         <CouponsTable coupons={coupons} />
      </div>
   );
};

export default CouponsPage;
