"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetAllPayments } from "@/hooks/usePaymants";
import PaymentsTable from "./PaymentsTable";

const PaymentsPage = () => {
   const { data, isLoading } = useGetAllPayments();

   const { payments } = data || {};

   if (isLoading) return <ThreeDotsLoading />;

   return (
      <div className="container">
         <h1 className="text-2xl font-bold mb-6">سفارشات کاربر</h1>
         <PaymentsTable payments={payments} />
      </div>
   );
};

export default PaymentsPage;
