"use client";

import CheckBox from "@/common/CheckBox";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const ProductsFilter = ({ categories }) => {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const [selectedCategories, setSelectedCategories] = useState(
      searchParams.get("category")?.split(",") || [],
   );

   const [isFilterOpen, setIsFilterOpen] = useState(false);

   const createQueryString = useCallback(
      (name, value) => {
         const params = new URLSearchParams(searchParams);
         params.set(name, value);

         return params.toString();
      },
      [searchParams],
   );

   const changeHandler = ({ target }) => {
      if (selectedCategories.includes(target.value)) {
         const filteredItems = selectedCategories.filter(
            (items) => !items.includes(target.value),
         );
         setSelectedCategories(filteredItems);
         router.push(
            pathname + "?" + createQueryString("category", filteredItems),
         );
      } else {
         setSelectedCategories([...selectedCategories, target.value]);
         router.push(
            pathname +
               "?" +
               createQueryString("category", [
                  ...selectedCategories,
                  target.value,
               ]),
         );
      }
   };

   return (
      <>
         <div className="bg-secondary-200 shadow-lg rounded-2xl sticky top-20 lg:top-28 p-3 xl:p-4 hidden md:block">
            <h2 className="text-2xl font-semibold mb-6">دسته بندی ها</h2>
            <ul className="space-y-4">
               {categories.map((category) => {
                  return (
                     <CheckBox
                        key={category._id}
                        id={category._id}
                        value={category.englishTitle}
                        name="product-category"
                        label={category.title}
                        checked={selectedCategories.includes(
                           category.englishTitle,
                        )}
                        onChange={changeHandler}
                     />
                  );
               })}
            </ul>
         </div>
         <div className="md:hidden flex-1">
            <button
               onClick={() => {
                  setIsFilterOpen(true);
               }}
               className="flex items-center justify-center gap-x-2 w-full bg-secondary-400 text-secondary-100 py-3 px-2 rounded-xl ">
               <span>فیلتر</span>
               <span>
                  <FunnelIcon className="w-6 h-6" />
               </span>
            </button>
            {/* filter list pop up */}
            {isFilterOpen && (
               <>
                  {/* backdrop */}
                  <div
                     className="fixed w-full h-full top-0 bottom-0 right-0 left-0 bg-secondary-600 
                  opacity-50 z-20"
                     onClick={() => setIsFilterOpen(false)}></div>
                  {/* list */}
                  <div className="fixed w-full bottom-0 right-0 left-0 bg-white z-30 rounded-t-xl shadow-lg">
                     {/* header */}
                     <div className="flex items-center justify-between px-2 pt-3 mb-6">
                        <span className="pr-5"></span>
                        <h3 className="font-semibold text-slate-800 text-lg">
                           فیلتر ها
                        </h3>
                        <button
                           onClick={() => {
                              setIsFilterOpen(false);
                           }}>
                           <XMarkIcon className="w-6 h-6 text-secondary-500" />
                        </button>
                     </div>
                     {/* list */}
                     <ul className="flex flex-col items-center text-slate-800 gap-y-8 p-4 pb-8">
                        {categories.map((category) => {
                           return (
                              <CheckBox
                                 key={category._id}
                                 id={category._id}
                                 value={category.englishTitle}
                                 name="product-category"
                                 label={category.title}
                                 checked={selectedCategories.includes(
                                    category.englishTitle,
                                 )}
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

export default ProductsFilter;
