"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetUser } from "@/hooks/useAuth";

const MePage = () => {
   const { data, isLoading } = useGetUser();

   const { user } = data || {};

   if (isLoading) return <ThreeDotsLoading />;

   return <div>MePage</div>;
};

export default MePage;
