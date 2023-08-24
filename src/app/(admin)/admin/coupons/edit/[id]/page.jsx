"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import CouponForm from "@/components/CouponForm";
import { useGetOneCoupon, useUpdateCoupon } from "@/hooks/useCoupons";
import { useGetProducts } from "@/hooks/useProducts";
import { includeObj } from "@/utils/objectUtils";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditCouponPage = () => {
   const router = useRouter();
   const { id } = useParams();
   const queryClient = useQueryClient();

   const [formData, setFormData] = useState({});
   const [type, setType] = useState("percent");
   const [selectedProducts, setSelectedProducts] = useState([]);
   const [expireDate, setExpireDate] = useState(new Date());

   const { data: productsData } = useGetProducts();
   const { products } = productsData || {};

   const { isLoading: fetchingCoupon, data: couponData } = useGetOneCoupon(id);
   const { coupon } = couponData || {};

   const { isLoading, mutateAsync } = useUpdateCoupon();

   const changeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         const { message } = await mutateAsync({
            data: {
               ...formData,
               type,
               productIds: selectedProducts.map((p) => p._id),
               expireDate: new Date(expireDate).toISOString(),
            },
            id: coupon._id,
         });
         queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
         toast.success(message);
         router.push("/admin/coupons");
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   const includesKey = ["code", "amount", "usageLimit"];

   useEffect(() => {
      if (coupon) {
         setFormData(includeObj(coupon, includesKey));
         setType(coupon.type);
         setExpireDate(coupon.expireDate);
         console.log(coupon);
      }
   }, [couponData]);

   if (fetchingCoupon) return <ThreeDotsLoading />;

   return (
      <CouponForm
         formTitle={"ویرایش کد تخفیف"}
         onSubmit={submitHandler}
         couponsData={formData}
         couponsDataOnChange={changeHandler}
         type={type}
         changeTypeHandler={(e) => setType(e.target.value)}
         products={products}
         setSelectedProducts={setSelectedProducts}
         expireDate={expireDate}
         changeExpireDateHandler={(value) => setExpireDate(value)}
         isLoading={isLoading}
         defaultValue={coupon.productIds}
      />
   );
};

export default EditCouponPage;
