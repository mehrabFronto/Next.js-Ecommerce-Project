"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartPage = () => {
   const { data, isLoading } = useGetUser();
   const { user, cart } = data || {};

   if (isLoading) return <ThreeDotsLoading />;

   if (!user)
      return (
         <div className="space-y-2">
            <p className="text-xl">
               برای دسترسی به سبد خرید ابتدا وارد حساب کاربری خود شوید
            </p>
            <Link
               href="/auth"
               className="block text-lg text-primary-600">
               رفتن به صفحه ورود؟
            </Link>
         </div>
      );

   if (!user.cart?.products || user.cart?.products.length === 0)
      return (
         <div className="space-y-2">
            <p className="text-xl">سبد خرید شما خالیه!</p>
            <Link
               href="/products"
               className="block text-lg text-primary-600">
               رفتن به صفحه محصولات؟
            </Link>
         </div>
      );

   return (
      <div
         className="container max-w-screen-xl bg-secondary-200 p-4 rounded-xl shadow-xl lg:h-[680px] 
         overflow-auto customScrollBar sticky top-28">
         <div className="flex flex-col items-center lg:flex-row lg:items-start justify-between gap-y-8">
            {/* products */}
            <div className="w-full max-w-screen-sm flex flex-col gap-y-6">
               {cart &&
                  cart.productDetail.map((product) => {
                     return (
                        <CartItem
                           key={product._id}
                           product={product}
                        />
                     );
                  })}
            </div>
            {/* summary */}
            <div
               className="w-full max-w-sm lg:max-w-[300px] xl:max-w-sm bg-white shadow-xl rounded-xl p-4
            sticky top-0">
               <CartSummary payDetail={cart.payDetail} />
            </div>
         </div>
      </div>
   );
};

export default CartPage;
