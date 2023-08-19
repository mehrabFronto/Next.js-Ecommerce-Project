import {
   getAllProducts,
   getOneProductBySlug,
} from "@/services/productsServices";
import { priceUtils } from "@/utils/priceUtils";
import { toPersianDigits } from "@/utils/toPersianDigits";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";
export const dynamicParams = false;

// img , title ,desc , price, offPrice , tags, categoryTitle , quantity

const SingleProductPage = async ({ params }) => {
   const { slug } = params;
   const { product } = await getOneProductBySlug(slug);

   return (
      <div className="container max-w-screen-lg bg-secondary-200 rounded-2xl p-4 mt-28 md:mt-40 shadow-xl">
         <div className="flex flex-col md:flex-row items-start md:gap-6 w-full">
            {/* product image section */}
            <div className="aspect-w-16 aspect-h-9 md:aspect-h-4 w-full md:w-1/2 relative">
               <Image
                  width={"400"}
                  height={"400"}
                  quality={100}
                  placeholder="blur"
                  blurDataURL={`/images/${product.imageLink}`}
                  priority
                  src={`/images/${product.imageLink}`}
                  alt={product.title}
                  className="rounded-2xl w-full h-full object-center object-cover absolute 
                     top-[-110px] lg:top-[-130px] p-1.5 bg-primary-600 shadow-lg"
               />
               x
            </div>
            {/* product detail section */}
            <div className="flex flex-col px-2 md:px-0 w-full relative top-[-75px] md:top-0">
               <h1 className="font-extrabold text-xl mb-4">{product.title}</h1>
               <p className="font-medium mb-4">{product.description}</p>
               {/* price section */}
               <div className="flex items-start justify-end gap-x-4 flex-row-reverse mb-4">
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
               {/* quantity */}
               <div className="flex items-center gap-x-2 text-sm mb-4">
                  <span className="font-medium">تعداد موجود در انبار:</span>
                  <span
                     className="py-0.5 px-2 bg-primary-600 flex items-center justify-center text-secondary-100
                  rounded-full ">
                     {toPersianDigits(product.countInStock)}
                  </span>
               </div>
               {/* category */}
               <div className="flex items-center gap-x-2 text-sm mb-4">
                  <span className="font-medium">دسته بندی:</span>
                  <Link
                     href={`/products?category=${product.category.englishTitle}`}
                     className="py-0.5 px-3 bg-primary-600 flex items-center justify-center text-secondary-100
                  rounded-full pt-0.5">
                     {product.category.title}
                  </Link>
               </div>
               {/* button */}
               <div className="flex items-center justify-center w-full relative">
                  <button
                     className="bg-primary-600 text-secondary-100 py-3 rounded-xl w-full absolute bottom-[-115px]
                     md:bottom-[-40px] lg:bottom-[-85px] md:w-2/3 left-0 shadow-lg">
                     افزودن به سبد خرید
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SingleProductPage;

export async function generateStaticParams() {
   const { products } = await getAllProducts();

   return products.map((product) => ({
      slug: product.slug,
   }));
}
