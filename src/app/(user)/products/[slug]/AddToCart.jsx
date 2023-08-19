"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetUser } from "@/hooks/useAuth";
import useAddToCart from "@/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddToCart = ({ product }) => {
   const queryClient = useQueryClient();
   const router = useRouter();
   const { data } = useGetUser();

   const { user } = data || {};

   const { isLoading, mutateAsync } = useAddToCart();

   const addToCartHandler = async () => {
      if (!user) {
         toast.error("ابتدا وارد حساب کاربری خود شوید");
         router.push("/auth");
         return;
      }

      try {
         const { message } = await mutateAsync(product._id);
         toast.success(message);
         queryClient.invalidateQueries({ queryKey: ["get-user"] });
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   const isInCart = () => {
      if (!user) return false;

      if (!user.cart?.products) return false;

      return user.cart.products.some((p) => p.productId === product._id);
   };

   return (
      <div className="flex items-center justify-center w-full relative">
         {isInCart() ? (
            <Link
               href="/cart"
               className="bg-primary-600 text-secondary-100 py-3 rounded-xl w-full absolute bottom-[-115px]
                md:bottom-[-40px] lg:bottom-[-85px] md:w-2/3 left-0 shadow-lg text-center">
               ادامه سفارش
            </Link>
         ) : isLoading ? (
            <ThreeDotsLoading />
         ) : (
            <button
               onClick={addToCartHandler}
               className="bg-primary-600 text-secondary-100 py-3 rounded-xl w-full absolute bottom-[-115px]
                md:bottom-[-40px] lg:bottom-[-85px] md:w-2/3 left-0 shadow-lg">
               افزودن به سبد خرید
            </button>
         )}
      </div>
   );
};

export default AddToCart;
