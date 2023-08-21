"use client";

import { likeProduct } from "@/services/productsServices";
import { HeartIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LikeProduct = ({ product }) => {
   const pathname = usePathname();
   const router = useRouter();

   const likeHandler = async () => {
      try {
         const { message } = await likeProduct(product._id);
         toast.success(message);
         router.refresh(pathname);
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   return (
      <button
         onClick={likeHandler}
         className="w-7 h-7 bg-white rounded-full flex items-center
          justify-center absolute left-2">
         <HeartIcon
            className={`w-5 h-5 stroke-2 ${
               product.isLiked
                  ? "fill-red-500 stroke-red-500"
                  : "stroke-red-500"
            }`}
         />
      </button>
   );
};

export default LikeProduct;
