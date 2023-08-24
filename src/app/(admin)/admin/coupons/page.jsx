"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetAllCoupons } from "@/hooks/useCoupons";
import CouponsTable from "./CouponsTable";

const CouponsPage = () => {
   const { isLoading, data } = useGetAllCoupons();
   const { coupons } = data || {};

   if (coupons) console.log(coupons);

   if (isLoading) return <ThreeDotsLoading />;

   return (
      <div className="container">
         <h1 className="text-2xl font-bold mb-6">کد تخفیف</h1>
         <CouponsTable coupons={coupons} />
      </div>
   );
};

export default CouponsPage;
