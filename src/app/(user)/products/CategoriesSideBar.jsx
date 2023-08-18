"use client";

import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

const CategoriesSideBar = ({ categories }) => {
   return (
      <>
         <div className="col-span-1 hidden md:block space-y-8">
            {/* filter */}
            <div className="bg-secondary-200 shadow-lg rounded-xl sticky top-20 lg:top-28 p-3 xl:p-4">
               <ProductsFilter categories={categories} />
            </div>
            {/* sort */}
            <div className="bg-secondary-200 shadow-lg rounded-xl sticky top-20 lg:top-[340px] p-3 xl:p-4">
               <ProductsSort />
            </div>
         </div>
      </>
   );
};

export default CategoriesSideBar;
