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
                  className="panelLink"
                  href="/">
                  صفحه اصلی
               </Link>
            </li>
            <li>
               <Link
                  className="panelLink"
                  href="/profile">
                  داشبورد
               </Link>
            </li>
            <li>
               <Link
                  className="panelLink"
                  href="/profile/me">
                  اطلاعات کاربری
               </Link>
            </li>
            <li>
               <Link
                  className="panelLink"
                  href="/profile/payments">
                  سفارشات
               </Link>
            </li>
            <li>
               <button
                  onClick={logoutHandler}
                  className="panelLink w-full text-right text-red-500">
                  خروج از حساب کاربری
               </button>
            </li>
         </ul>
      </div>
   );
};

export default SideBar;
