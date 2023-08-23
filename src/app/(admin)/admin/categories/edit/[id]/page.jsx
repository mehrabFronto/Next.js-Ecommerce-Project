"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import CategoryForm, { categoriesTypes } from "@/components/CategoryForm";
import { useGetCategoryById, useUpdateCategory } from "@/hooks/useCategories";
import { includeObj } from "@/utils/objectUtils";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditCategoryPage = () => {
   const router = useRouter();
   const { id } = useParams();

   const [formData, setFormData] = useState({});
   const [selectedType, setSelectedType] = useState("");

   const queryClient = useQueryClient();
   const { data: categoryData, isLoading: fetchingCategory } =
      useGetCategoryById(id);
   const { category } = categoryData || {};
   const { isLoading, mutateAsync } = useUpdateCategory();

   const changeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         const { message } = await mutateAsync({
            data: { ...formData, type: selectedType.value },
            id: category._id,
         });
         toast.success(message);
         queryClient.invalidateQueries({ queryKey: ["get-category"] });
         router.push("/admin/categories");
      } catch (error) {
         toast.error(error?.response?.data?.message);
      }
   };

   const includesKey = ["title", "description", "type", "englishTitle"];

   useEffect(() => {
      if (category) {
         setFormData(includeObj(category, includesKey));
         setSelectedType(
            categoriesTypes.find((c) => c.value === category.type),
         );
      }
   }, [categoryData]);

   if (fetchingCategory) return <ThreeDotsLoading />;

   return (
      <CategoryForm
         formTitle={"ویرایش دسته بندی"}
         onSubmit={submitHandler}
         categoriesData={formData}
         categoriesDataOnChange={changeHandler}
         selectedType={categoriesTypes.find((c) => c.value === category.type)}
         setSelectedType={setSelectedType}
         isLoading={isLoading}
      />
   );
};

export default EditCategoryPage;
