"use client";

import CouponForm from "@/components/CouponForm";
import { useAddCoupon } from "@/hooks/useCoupons";
import { useGetProducts } from "@/hooks/useProducts";
import { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

const AddCouponPage = () => {
   const router = useRouter();

   const [formData, setFormData] = useState({
      code: "",
      amount: "",
      usageLimit: "",
   });
   const [type, setType] = useState("percent");
   const [selectedProducts, setSelectedProducts] = useState([]);
   const [expireDate, setExpireDate] = useState(new Date());

   const { data } = useGetProducts();
   const { products } = data || {};

   const { isLoading, mutateAsync } = useAddCoupon();

   const changeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         const { message } = await mutateAsync({
            ...formData,
            type,
            productIds: selectedProducts.map((p) => p._id),
            expireDate: new Date(expireDate).toISOString(),
         });
         toast.success(message);
         router.push("/admin/coupons");
      } catch (error) {
         toast.error(error?.response?.data?.message || error.message);
      }
   };

   return (
      <CouponForm
         formTitle="افزودن کد تخفبف"
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
      />
   );
};

export default AddCouponPage;
