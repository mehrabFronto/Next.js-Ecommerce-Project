"use client";

import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

const CategoriesSideBar = ({ categories }) => {
   return (
      <>
         <div className="col-span-4 md:col-span-1 space-y-8 flex md:block gap-x-4">
            {/* filter */}
            <ProductsFilter categories={categories} />
            {/* sort */}
            <ProductsSort />
         </div>
      </>
   );
};

export default CategoriesSideBar;
