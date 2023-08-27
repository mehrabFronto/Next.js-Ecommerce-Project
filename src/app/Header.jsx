"use client";
import { useGetUser } from "@/hooks/useAuth";
import { logoutUser } from "@/services/authService";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";
import { ImExit } from "react-icons/im";

const Header = () => {
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
      <header className="w-full text-xl sticky top-0 z-50 bg-primary-600 text-secondary-100 shadow-lg">
         <nav className="w-full h-full container mx-auto flex justify-between items-center px-2 relative">
            {/* main title */}
            <Link href="/">
               <h1 className="text-2xl md:text-3xl font-bold lg:hover:tracking-wider transition-all pr-1">
                  نکست شاپ
               </h1>
            </Link>
            {/* Burger manu button */}
            <button
               onClick={() => setIsOpen((prevState) => !prevState)}
               className="lg:hidden w-14 h-14 flex items-center justify-center text-3xl">
               {isOpen ? (
                  <HiOutlineX />
               ) : (
                  <HiMenuAlt3 className="rotate-180 " />
               )}
            </button>
            {/* mobile and tablet menu */}
            {isOpen && (
               <ul
                  className={`lg:hidden flex flex-col items-center justify-center absolute bg-primary-600
                   w-full left-0 right-0 shadow-xl rounded-b md:rounded text-lg ${
                      user && user.role === "ADMIN"
                         ? "bottom-[-345px] md:bottom-[-355px]"
                         : user && user.role === "USER"
                         ? "bottom-[-280px] md:bottom-[-290px]"
                         : "bottom-[-210px] md:bottom-[-220px]"
                   }`}>
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
                        href="/products">
                        محصولات
                     </Link>
                  </li>
                  {user ? (
                     <>
                        {/* cart */}
                        <li className="w-full relative z-40">
                           <Link
                              onClick={() => setIsOpen(false)}
                              className="w-full block py-5 pr-2 font-medium"
                              href="/cart">
                              سبد خرید
                           </Link>
                           <span className="badge--header top-5 left-2">
                              {toPersianDigits(user.cart?.products.length || 0)}
                           </span>
                        </li>
                        {/* admin panel */}
                        {user.role === "ADMIN" && (
                           <li className="w-full">
                              <Link
                                 onClick={() => setIsOpen(false)}
                                 className="w-full block py-5 pr-2 font-medium"
                                 href="/admin">
                                 پنل ادمین
                              </Link>
                           </li>
                        )}
                        {/* user pane; */}
                        <li className="w-full relative z-40">
                           <Link
                              onClick={() => setIsOpen(false)}
                              className="w-full block py-5 pr-2 font-medium"
                              href="/profile">
                              پروفایل
                           </Link>
                           <button
                              onClick={logoutHandler}
                              className="badge--header top-5 left-2">
                              <ImExit className="ml-1" />
                           </button>
                        </li>
                     </>
                  ) : (
                     <li className="w-full">
                        <Link
                           onClick={() => setIsOpen(false)}
                           href="/auth"
                           className="w-full flex items-center justify-start py-5 pr-2 font-medium">
                           ورود
                        </Link>
                     </li>
                  )}
               </ul>
            )}
            {/* desktop menu */}
            <ul
               className={`hidden lg:flex items-center justify-center gap-x-4 text-lg transition-all duration-200 ${
                  isLoading ? "blur-sm opacity-0" : "blur-0 opacity-100"
               }`}>
               <li>
                  <Link
                     className="block py-6 lg:px-4 xl:px-6 2xl:px-8 font-medium hover:bg-secondary-200
                      hover:text-primary-600 transition-all rounded-lg"
                     href="/">
                     صفحه اصلی
                  </Link>
               </li>
               <li>
                  <Link
                     className="block py-6 lg:px-4 xl:px-6 2xl:px-8 font-medium hover:bg-secondary-200
                      hover:text-primary-600 transition-all rounded-lg"
                     href="/products">
                     محصولات
                  </Link>
               </li>
               {user ? (
                  <>
                     {/* cart */}
                     <li className="relative z-40">
                        <Link
                           className="block py-6 lg:px-4 xl:px-6 2xl:px-8 font-medium hover:bg-secondary-200
                      hover:text-primary-600 transition-all rounded-lg"
                           href="/cart">
                           سبد خرید
                        </Link>
                        <span className="badge--header top-2 left-[-12px] pt-0.5 pr-0.5">
                           {toPersianDigits(user.cart?.products.length || 0)}
                        </span>
                     </li>
                     {/* admin panel */}
                     {user.role === "ADMIN" && (
                        <li>
                           <Link
                              className="block py-6 lg:px-4 xl:px-6 2xl:px-8 font-medium hover:bg-secondary-200
                      hover:text-primary-600 transition-all rounded-lg"
                              href="/admin">
                              پنل ادمین
                           </Link>
                        </li>
                     )}
                     {/* user panel */}
                     <li className="relative z-40">
                        <Link
                           className="block py-6 lg:px-4 xl:px-6 2xl:px-8 font-medium hover:bg-secondary-200
                      hover:text-primary-600 transition-all rounded-lg"
                           href="/profile">
                           پروفایل
                        </Link>
                        <button
                           onClick={logoutHandler}
                           className="badge--header top-2 left-[-12px]  hover:scale-125 transition-all">
                           <ImExit className="ml-1" />
                        </button>
                     </li>
                  </>
               ) : (
                  <li>
                     <Link
                        href="/auth"
                        className="block py-6 lg:px-4 xl:px-6 2xl:px-8 font-medium hover:bg-secondary-200
                hover:text-primary-600 transition-all rounded-lg">
                        ورود
                     </Link>
                  </li>
               )}
            </ul>
         </nav>
      </header>
   );
};

export default Header;
