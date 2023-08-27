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
                  href="/admin">
                  داشبورد
               </Link>
            </li>
            <li>
               <Link
                  className="panelLink"
                  href="/admin/users">
                  کاربران
               </Link>
            </li>
            <li>
               <Link
                  className="panelLink"
                  href="/admin/products">
                  محصولات
               </Link>
            </li>
            <li>
               <Link
                  className="panelLink"
                  href="/admin/categories">
                  دسته بندی
               </Link>
            </li>
            <li>
               <Link
                  className="panelLink"
                  href="/admin/coupons">
                  کد تخفیف
               </Link>
            </li>
            <li>
               <Link
                  className="panelLink"
                  href="/admin/payments">
                  سفارشات
               </Link>
            </li>
            <li>
               <button
                  onClick={logoutHandler}
                  className="panelLink w-full text-right text-red-500 hover:shadow-md">
                  خروج از حساب کاربری
               </button>
            </li>
         </ul>
      </div>
   );
};

export default SideBar;
