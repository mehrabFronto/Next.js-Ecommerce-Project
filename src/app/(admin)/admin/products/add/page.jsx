"use client";

import ProductForm from "@/components/ProductForm";
import { useGetCategories } from "@/hooks/useCategories";
import { useAddProduct } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AddProductPage = () => {
   const router = useRouter();

   const [formData, setFormData] = useState({
      title: "",
      description: "",
      slug: "",
      brand: "",
      price: "",
      offPrice: "",
      discount: "",
      countInStock: "",
      imageLink: "",
   });

   const [tags, setTags] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState("");

   const { data } = useGetCategories();
   const { categories } = data || {};

   const { isLoading, mutateAsync } = useAddProduct();

   const changeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         const { message } = await mutateAsync({
            ...formData,
            tags,
            category: selectedCategory._id,
         });
         router.push("/admin/products");
         toast.success(message);
      } catch (error) {
         toast.error(error?.response?.data?.message);
      }
   };

   return (
      <ProductForm
         onSubmit={submitHandler}
         tags={tags}
         setTags={setTags}
         productData={formData}
         productDataOnChange={changeHandler}
         categories={categories}
         selectedCategory={selectedCategory}
         setSelectedCategory={setSelectedCategory}
         isLoading={isLoading}
      />
   );
};

export default AddProductPage;
