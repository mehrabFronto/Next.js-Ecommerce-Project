"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetUser } from "@/hooks/useAuth";
import { toLocaleDateString } from "@/utils/toLocalDateString";

const ProfilePage = () => {
   const { data, isLoading } = useGetUser();

   const { user } = data || {};

   if (isLoading) return <ThreeDotsLoading />;

   return (
      <div>
         <h1 className="text-3xl mb-4">{user.name}, خوش آمدی</h1>
         <p className="flex items-center gap-x-1">
            <span>تاریخ پیوستن :</span>
            <span>{toLocaleDateString(user.createdAt)}</span>
         </p>
      </div>
   );
};

export default ProfilePage;
