"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetUser } from "@/hooks/useAuth";
import { toLocaleDateString } from "@/utils/toLocalDateString";
import Link from "next/link";
import PaymentsTable from "./payments/PaymentsTable";

const ProfilePage = () => {
   const { data, isLoading } = useGetUser();

   const { user, payments } = data || {};

   if (isLoading) return <ThreeDotsLoading />;

   return (
      <div className="w-full">
         <h1 className="text-3xl mb-4 w-full gap-2">
            <span>خوش آمدی,</span>
            <span>{user.name}</span>
         </h1>
         <p className="flex items-center gap-x-1 mb-8">
            <span>تاریخ پیوستن :</span>
            <span>{toLocaleDateString(user.createdAt)}</span>
         </p>
         <div className="border border-secondary-300 p-4 rounded-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-y-2 justify-between mb-4">
               <h2 className="text-lg font-semibold">اخرین سفارشات کاربر</h2>
               <Link
                  className="text-sm text-primary-600"
                  href="/profile/payments">
                  مشاهده همه سفارشات؟
               </Link>
            </div>
            <PaymentsTable
               payments={payments
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 2)}
            />
         </div>
      </div>
   );
};

export default ProfilePage;
