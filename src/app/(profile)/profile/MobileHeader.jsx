"use client";
import { useGetUser } from "@/hooks/useAuth";
import { logoutUser } from "@/services/authService";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";
import { ImExit } from "react-icons/im";

const MobileHeader = () => {
   const { data, error, isLoading } = useGetUser();

   const { user, cart } = data || {};

   const [isOpen, setIsOpen] = useState(false);

   const logoutHandler = async () => {
      try {
         await logoutUser();
         document.location.href = "/";
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   return (
      <nav className="w-full h-full flex justify-between items-center px-2 relative">
         {/* main title */}
         <Link href="/profile">
            <h1 className="text-2xl md:text-3xl font-bold lg:hover:tracking-wider transition-all pr-1">
               پروفایل
            </h1>
         </Link>
         {/* Burger menu button */}
         <button
            onClick={() => setIsOpen((prevState) => !prevState)}
            className="lg:hidden w-14 h-14 flex items-center justify-center text-3xl">
            {isOpen ? <HiOutlineX /> : <HiMenuAlt3 className="rotate-180 " />}
         </button>
         {/*  menu */}
         {isOpen && (
            <ul
               className={`flex flex-col items-center justify-center absolute
                bg-primary-600 w-full bottom-[-280px] left-0 right-0 shadow-xl 
                rounded-b md:rounded text-lg`}>
               <li className="w-full pt-2 md:pt-0">
                  <Link
                     onClick={() => setIsOpen(false)}
                     className="w-full block py-5 pr-2 font-medium"
                     href="/">
                     صفحه اصلی
                  </Link>
               </li>
               <li className="w-full">
                  <Link
                     onClick={() => setIsOpen(false)}
                     className="w-full block py-5 pr-2 font-medium"
                     href="/profile">
                     داشبورد
                  </Link>
               </li>
               <li className="w-full">
                  <Link
                     onClick={() => setIsOpen(false)}
                     className="w-full block py-5 pr-2 font-medium"
                     href="/profile/me">
                     اطلاعات کاربری
                  </Link>
               </li>
               <li className="w-full relative z-40">
                  <button
                     onClick={logoutHandler}
                     className="w-full block py-5 pr-2 font-medium text-right"
                     href="/profile">
                     خروج از حساب کاربری
                  </button>
                  <span
                     className="w-7 h-7 text-red-600 bg-secondary-200 flex items-center justify-center
                        absolute top-5 left-2 rounded-full z-50">
                     <ImExit className="ml-1" />
                  </span>
               </li>
            </ul>
         )}
      </nav>
   );
};

export default MobileHeader;
