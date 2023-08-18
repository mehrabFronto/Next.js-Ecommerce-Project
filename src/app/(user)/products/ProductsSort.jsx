"use client";

import RadioInput from "@/common/RadioInput";
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
      </>
   );
};

export default ProductsSort;
