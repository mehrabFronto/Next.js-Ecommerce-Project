"use client";

import { logoutUser } from "@/services/authService";
import Link from "next/link";
import toast from "react-hot-toast";

const SideBar = () => {
   const logoutHandler = async () => {
      try {
         await logoutUser();
         document.location.href = "/";
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   return (
      <div>
         <ul className="flex flex-col gap-y-4 p-4">
            <li>
               <Link
                  className="px-4 py-6 bg-primary-100 rounded-md block text-primary-700 hover:shadow-md
                   transition-all duration-200"
                  href="/">
                  صفحه اصلی
               </Link>
            </li>
            <li>
               <Link
                  className="px-4 py-6 bg-primary-100 rounded-md block text-primary-700 hover:shadow-md
                   transition-all duration-200"
                  href="/profile">
                  داشبورد
               </Link>
            </li>
            <li>
               <Link
                  className="px-4 py-6 bg-primary-100 rounded-md block text-primary-700 hover:shadow-md
                   transition-all duration-200"
                  href="/profile/me">
                  اطلاعات کاربری
               </Link>
            </li>
            <li>
               <Link
                  className="px-4 py-6 bg-primary-100 rounded-md block text-primary-700 hover:shadow-md
                   transition-all duration-200"
                  href="/profile/payments">
                  سفارشات
               </Link>
            </li>
            <li>
               <button
                  onClick={logoutHandler}
                  className="px-4 py-6 bg-primary-100 rounded-md w-full text-right text-red-500 hover:shadow-md 
                  transition-all duration-200">
                  خروج از حساب کاربری
               </button>
            </li>
         </ul>
      </div>
   );
};

export default SideBar;
