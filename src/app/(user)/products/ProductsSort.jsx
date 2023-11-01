"use client";

import RadioInput from "@/common/RadioInput";
import { BarsArrowDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const sortOptions = [
   {
      id: 1,
      value: "latest",
      label: "جدید ترین",
   },

   {
      id: 2,
      value: "earliest",
      label: "قدیمی ترین",
   },
   {
      id: 3,
      value: "popular",
      label: "محبوب ترین",
   },
];

const ProductsSort = () => {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const [sort, setSort] = useState("");

   const [isSortOpen, setIsSortOpen] = useState(false);

   const createQueryString = useCallback(
      (name, value) => {
         const params = new URLSearchParams(searchParams);
         params.set(name, value);

         return params.toString();
      },
      [searchParams],
   );

   const changeHandler = (e) => {
      const value = e.target.value;
      setSort(value);
      router.push(pathname + "?" + createQueryString("sort", value));
   };

   useEffect(() => {
      setSort(searchParams.get("sort"));
   }, [searchParams]);

   return (
      <>
         <div className="bg-secondary-200 shadow-lg rounded-2xl sticky top-20 md:top-[300px] lg:top-[340px] p-3 xl:p-4 hidden md:block">
            <h2 className="text-2xl font-semibold mb-6">مرتب سازی</h2>
            <ul className="space-y-4">
               {sortOptions.map((option) => {
                  return (
                     <RadioInput
                        key={option.id}
                        id={option.id}
                        value={option.value}
                        name="product-sort"
                        label={option.label}
                        checked={sort === option.value}
                        onChange={changeHandler}
                     />
                  );
               })}
            </ul>
         </div>
         <div className="md:hidden flex-1">
            <button
               onClick={() => setIsSortOpen(true)}
               className="flex items-center justify-center gap-x-2 w-full bg-secondary-400 text-secondary-100 py-3 px-2 rounded-xl">
               <span>مرتب سازی</span>
               <span>
                  <BarsArrowDownIcon className="w-6 h-6" />
               </span>
            </button>
            {/* sort list pop up */}
            {isSortOpen && (
               <>
                  {/* backdrop */}
                  <div
                     className="fixed w-full h-full top-0 bottom-0 right-0 left-0 bg-secondary-600 
                  opacity-50 z-50"
                     onClick={() => {
                        setIsSortOpen(false);
                     }}></div>
                  {/* list */}
                  <div className="fixed w-full bottom-0 right-0 left-0 bg-white z-50 rounded-t-xl shadow-lg">
                     {/* header */}
                     <div className="flex items-center justify-between px-2 pt-3 mb-6">
                        <span className="pr-5"></span>
                        <h3 className="font-semibold text-slate-800 text-lg">
                           مرتب سازی
                        </h3>
                        <button
                           onClick={() => {
                              setIsSortOpen(false);
                           }}>
                           <XMarkIcon className="w-6 h-6 text-secondary-500" />
                        </button>
                     </div>
                     {/* list */}
                     <ul className="flex flex-col items-center gap-y-8 p-4 pb-8">
                        {sortOptions.map((option) => {
                           return (
                              <RadioInput
                                 key={option.id}
                                 id={option.id}
                                 value={option.value}
                                 name="product-sort"
                                 label={option.label}
                                 checked={sort === option.value}
                                 onChange={changeHandler}
                              />
                           );
                        })}
                     </ul>
                  </div>
               </>
            )}
         </div>
      </>
   );
};

export default ProductsSort;
