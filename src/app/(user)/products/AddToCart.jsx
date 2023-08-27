"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetUser } from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";
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
      <>
         {isInCart() ? (
            <Link
               href="/cart"
               className="btn btn--primary py-2 text-center">
               ادامه سفارش
            </Link>
         ) : isLoading ? (
            <ThreeDotsLoading />
         ) : (
            <button
               onClick={addToCartHandler}
               className="btn btn--primary py-2">
               افزودن به سبد خرید
            </button>
         )}
      </>
   );
};

export default AddToCart;
