"use client";

import CategoryForm from "@/components/CategoryForm";
import { useAddCategory } from "@/hooks/useCategories";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const AddCategoryPage = () => {
   const router = useRouter();

   const [formData, setFormData] = useState({
      title: "",
      englishTitle: "",
      description: "",
   });
   const [selectedType, setSelectedType] = useState("");

   const { isLoading, mutateAsync } = useAddCategory();

   const changeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         const { message } = await mutateAsync({
            ...formData,
            type: selectedType.value,
         });
         toast.success(message);
         router.push("/admin/categories");
      } catch (error) {
         toast.error(error?.response?.data?.message);
      }
   };

   return (
      <CategoryForm
         formTitle={"افزودن دسته بندی"}
         onSubmit={submitHandler}
         categoriesData={formData}
         categoriesDataOnChange={changeHandler}
         selectedType={selectedType}
         setSelectedType={setSelectedType}
         isLoading={isLoading}
      />
   );
};

export default AddCategoryPage;
