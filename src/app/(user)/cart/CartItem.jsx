import { useAddToCart, useDecrementFromCart } from "@/hooks/useCart";
import { priceUtils } from "@/utils/priceUtils";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import toast from "react-hot-toast";

const CartItem = ({ product }) => {
   const { mutateAsync: incrementAsync } = useAddToCart();
   const { mutateAsync: decrementAsync } = useDecrementFromCart();

   const queryClient = useQueryClient();

   const incrementHandler = async () => {
      try {
         await incrementAsync(product._id);
         queryClient.invalidateQueries({ queryKey: ["get-user"] });
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   const decrementHandler = async () => {
      try {
         await decrementAsync(product._id);
         queryClient.invalidateQueries({ queryKey: ["get-user"] });
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   return (
      <div
         key={product._id}
         className="w-full rounded-2xl p-4 bg-white shadow-xl">
         <div className="flex flex-col md:flex-row items-center md:gap-6 w-full">
            {/* product image section */}
            <div className="aspect-w-16 aspect-h-9 md:aspect-h-4 w-full md:w-1/2">
               <Image
                  width={"400"}
                  height={"400"}
                  quality={100}
                  placeholder="blur"
                  blurDataURL={`/images/${product.imageLink}`}
                  priority
                  src={`/images/${product.imageLink}`}
                  alt={product.title}
                  className="rounded-2xl w-full h-full object-center object-cover shadow-lg"
               />
            </div>
            {/* product detail section */}
            <div className="flex flex-col px-2 md:px-0 w-full mt-6">
               <h1 className="font-extrabold text-xl mb-4">{product.title}</h1>
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
               <div className="flex items-center gap-x-4 text-base mb-4">
                  <div className="flex items-center gap-x-1">
                     <span className="font-medium">تعداد :</span>
                     <span>{toPersianDigits(product.quantity)}</span>
                  </div>

                  <div className="flex items-center gap-x-2">
                     <button
                        onClick={incrementHandler}
                        className="w-6 h-6 text-secondary-100 bg-primary-600 rounded-md">
                        +
                     </button>

                     <button onClick={decrementHandler}>
                        {product.quantity === 1 ? (
                           <TrashIcon className="w-6 h-6 text-red-500" />
                        ) : (
                           <span className="w-6 h-6 block border border-secondary-500 rounded-md text-secondary-500">
                              -
                           </span>
                        )}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CartItem;
