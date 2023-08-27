"use client";

import TextField from "@/common/TextField";
import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import Select from "react-select";
import { TagsInput } from "react-tag-input-component";

const productsFormData = [
   {
      id: 1,
      label: "عنوان",
      name: "title",
   },
   {
      id: 2,
      label: "توضیحات",
      name: "description",
   },
   {
      id: 3,
      label: "اسلاگ",
      name: "slug",
   },
   {
      id: 4,
      label: "برند",
      name: "brand",
   },
   {
      id: 5,
      label: "قیمت",
      name: "price",
   },
   {
      id: 6,
      label: "تخفیف",
      name: "discount",
   },
   {
      id: 7,
      label: "قیمت روی تخفیف",
      name: "offPrice",
   },
   {
      id: 8,
      label: "موجودی",
      name: "countInStock",
   },
   {
      id: 9,
      label: "لینک عکس محصول",
      name: "imageLink",
   },
];

const ProductForm = ({
   formTitle,
   onSubmit,
   tags,
   setTags,
   productData,
   productDataOnChange,
   categories,
   setSelectedCategory,
   isLoading,
   selectedCategory = "",
}) => {
   return (
      <form
         className="container max-w-screen-sm flex flex-col items-start gap-y-8 justify-center pb-24"
         onSubmit={onSubmit}>
         {/* Page title */}
         <h1 className="text-primary-600 text-3xl font-black">{formTitle}</h1>
         {/* inputs */}
         <div className="flex flex-col gap-y-6 w-full pr-2">
            {/* form data inputs */}
            <div className="space-y-4">
               {productsFormData.map((data) => {
                  return (
                     <TextField
                        key={data.id}
                        label={data.label}
                        name={data.name}
                        value={productData[data.name] || ""}
                        onChange={productDataOnChange}
                     />
                  );
               })}
            </div>
            {/* tags input */}
            <div>
               <label
                  className="mb-2 block text-xl text-slate-800 font-semibold"
                  htmlFor="tags">
                  تگ محصولات
               </label>
               <TagsInput
                  id="tags"
                  value={tags}
                  onChange={setTags}
                  name="tags"
               />
            </div>
            {/* categories select option */}
            <div>
               <label
                  htmlFor="category"
                  className="mb-2 block text-xl text-slate-800 font-semibold">
                  دسته بندی
               </label>
               <Select
                  id="category"
                  onChange={setSelectedCategory}
                  options={categories}
                  getOptionLabel={(option) => option.title}
                  getOptionValue={(option) => option._id}
                  defaultValue={selectedCategory}
               />
            </div>
            {/* submit btn */}
            <button
               className="w-full bg-primary-600 text-secondary-100 py-3 rounded-lg mt-2"
               type="submit">
               {isLoading ? <ThreeDotsLoading /> : "تایید"}
            </button>
         </div>
      </form>
   );
};

export default ProductForm;
