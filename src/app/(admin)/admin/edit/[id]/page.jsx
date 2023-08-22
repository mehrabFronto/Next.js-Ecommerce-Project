"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import ProductForm from "@/components/ProductForm";
import { useGetCategories } from "@/hooks/useCategories";
import { useGetProductById, useUpdateProduct } from "@/hooks/useProducts";
import { includeObj } from "@/utils/objectUtils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditProductPage = () => {
   const router = useRouter();
   const { id } = useParams();

   const [formData, setFormData] = useState({});
   const [tags, setTags] = useState([]);
   const [selectedCategory, setSelectedCategory] = useState("");

   const { data: categoriesData } = useGetCategories();
   const { categories } = categoriesData || {};

   const { data: productData, isLoading: fetchingProduct } =
      useGetProductById(id);
   const { product } = productData || {};

   const { isLoading, mutateAsync } = useUpdateProduct();

   const includesKey = [
      "title",
      "description",
      "slug",
      "brand",
      "price",
      "discount",
      "offPrice",
      "countInStock",
      "imageLink",
   ];

   useEffect(() => {
      if (product) {
         setFormData(includeObj(product, includesKey));
         setTags(product.tags);
         setSelectedCategory(product.category);
      }
   }, [productData]);

   const changeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const submitHandler = async (e) => {
      e.preventDefault();
      try {
         const { message } = await mutateAsync({
            data: { ...formData, tags, category: selectedCategory._id },
            id: product._id,
         });
         router.push("/admin/products");
         toast.success(message);
      } catch (error) {
         toast.error(error?.response?.data?.message);
      }
   };

   if (fetchingProduct) return <ThreeDotsLoading />;

   return (
      <ProductForm
         formTitle="ویرایش محصول"
         onSubmit={submitHandler}
         tags={product.tags}
         setTags={setTags}
         productData={formData}
         productDataOnChange={changeHandler}
         categories={categories}
         selectedCategory={product.category}
         setSelectedCategory={setSelectedCategory}
         isLoading={isLoading}
      />
   );
};

export default EditProductPage;
