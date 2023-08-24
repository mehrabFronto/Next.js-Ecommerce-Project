import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { createPayment } from "@/services/cartServices";
import { priceUtils } from "@/utils/priceUtils";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CartSummary = ({ payDetail }) => {
   const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;
   const queryClient = useQueryClient();
   const { isLoading, mutateAsync } = useMutation({
      mutationFn: createPayment,
   });

   const createPaymentHandler = async () => {
      try {
         const { message } = await mutateAsync();
         toast.success(message);
         queryClient.invalidateQueries({ queryKey: ["get-user"] });
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   return (
      <div className="w-full">
         <p className="mb-4 text-xl font-medium">اطلاعات پرداخت</p>
         <div className="p-2 flex items-center justify-between text-lg">
            <span>جمع کل:</span>
            <span>{toPersianDigits(priceUtils(totalGrossPrice))}</span>
         </div>
         <div className="p-2 flex items-center justify-between text-lg">
            <span>تخفیف:</span>
            <span className="text-red-500">
               {toPersianDigits(priceUtils(totalOffAmount))}-
            </span>
         </div>
         <div className="p-2 flex items-center justify-between text-lg font-bold mb-4">
            <span>مبلغ قابل پرداخت:</span>
            <span className="text-green-500">
               {toPersianDigits(priceUtils(totalPrice))}
            </span>
         </div>
         <button
            onClick={createPaymentHandler}
            className="bg-primary-600 text-secondary-100 py-2 rounded-xl w-full relative">
            {isLoading ? <ThreeDotsLoading /> : " ثبت سفارش"}
         </button>
      </div>
   );
};

export default CartSummary;
