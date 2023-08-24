"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetUsers } from "@/hooks/useAuth";
import UsersTable from "./UsersTable";

const UsersPage = () => {
   const { data, isLoading } = useGetUsers();

   const { users } = data || [];

   //   if (users) console.log(users);

   if (isLoading) return <ThreeDotsLoading />;

   return (
      <div className="container">
         <h1 className="text-2xl font-bold mb-6">اطلاعات کابران</h1>
         <UsersTable users={users} />
      </div>
   );
};

export default UsersPage;
