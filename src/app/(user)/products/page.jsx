import { getAllCategories } from "@/services/categoriesServices";
import { getAllProducts } from "@/services/productsServices";
import { priceUtils } from "@/utils/priceUtils";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Image from "next/image";
import Link from "next/link";
import queryString from "query-string";
import CategoriesSideBar from "./CategoriesSideBar";

export const dynamic = "force-dynamic";

const ProductsPage = async ({ searchParams }) => {
   const productsPromise = getAllProducts(queryString.stringify(searchParams));
   const categoriesPromise = getAllCategories();
   const [{ products }, { categories }] = await Promise.all([
      productsPromise,
      categoriesPromise,
   ]);

   const renderProducts = () => {
      return products.map((product) => {
         return (
            <div
               key={product._id}
               className="col-span-3 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-xl p-4 
               min-h-[380px] flex flex-col">
               {/* product image section */}
               <div className="aspect-w-16 aspect-h-9 w-full mb-6">
                  <Link href={`/products/${product.slug}`}>
                     <Image
                        width={"400"}
                        height={"400"}
                        quality={100}
                        placeholder="blur"
                        blurDataURL={`/images/${product.imageLink}`}
                        priority
                        src={`/images/${product.imageLink}`}
                        alt={product.title}
                        className="rounded-lg w-full h-full object-center object-cover"
                     />
                  </Link>
               </div>
               {/* title and brand section */}
               <div className="flex items-center justify-between mb-6 flex-1">
                  <h2 className="text-lg font-bold">
                     <Link
                        href={`/products/${product.slug}`}
                        className="w-full block">
                        {product.title}
                     </Link>
                  </h2>
                  <span className="bg-primary-600 text-secondary-100 px-4 py-1 rounded-full pt-2 text-sm">
                     {product.brand}
                  </span>
               </div>
               {/* price section */}
               <div className="flex items-start justify-between flex-row-reverse mb-4">
                  {/* price and offPrice */}
                  <div className="flex flex-col">
                     <div className="flex items-center gap-x-2 flex-row-reverse">
                        {/* price */}
                        <p
                           className={`${
                              product.discount !== 0 ? "line-through" : ""
                           }`}>
                           {toPersianDigits(priceUtils(product.price))}
                        </p>
                        {/* offPrice */}
                        {product.discount !== 0 && (
                           <p className="font-medium">
                              {toPersianDigits(priceUtils(product.offPrice))}
                           </p>
                        )}
                     </div>
                     {/* currency */}
                     <p className="text-sm text-primary-600 font-medium">
                        تومان
                     </p>
                  </div>
                  {/* discount or price title */}
                  {product.discount !== 0 ? (
                     <span
                        className="bg-red-500 text-secondary-100 w-12 h-6 pt-0.5 rounded-full flex items-center
                      justify-center text-sm">
                        {toPersianDigits(product.discount)}%
                     </span>
                  ) : (
                     <p>قیمت:</p>
                  )}
               </div>
               {/* button */}
               <button className="bg-primary-600 text-secondary-100 py-2 rounded-md w-full relative">
                  افزودن به سبد خرید
               </button>
            </div>
         );
      });
   };

   return (
      <div className="w-full max-h-screen grid grid-cols-4 gap-4 xl:gap-8">
         <h1 className="col-span-4 text-3xl font-bold">صفحه محصولات</h1>
         {/* categories */}
         <CategoriesSideBar categories={categories} />

         {/* products */}
         <div
            className="col-span-4 md:col-span-3 grid grid-cols-3 md:grid-cols-4 xl:grid-cols-3 gap-8 bg-secondary-200 
            shadow-lg rounded-2xl p-3 xl:p-4">
            {renderProducts()}
         </div>
      </div>
   );
};

export default ProductsPage;
