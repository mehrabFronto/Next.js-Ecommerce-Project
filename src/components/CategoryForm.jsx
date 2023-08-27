"use client";

import TextField from "@/common/TextField";
import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import Select from "react-select";

const categoriesFormData = [
   {
      id: 1,
      label: "عنوان",
      name: "title",
   },
   {
      id: 2,
      label: "عنوان انگلیسی",
      name: "englishTitle",
   },
   {
      id: 3,
      label: "توضیحات",
      name: "description",
   },
];

export const categoriesTypes = [
   { id: 1, label: "محصول", value: "product" },
   { id: 2, label: "پست", value: "post" },
   { id: 3, label: "تیکت", value: "ticket" },
   { id: 4, label: "نظرات", value: "comment" },
];

const CategoryForm = ({
   formTitle,
   onSubmit,
   categoriesData,
   categoriesDataOnChange,
   selectedType,
   setSelectedType,
   isLoading,
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
               {categoriesFormData.map((data) => {
                  return (
                     <TextField
                        key={data.id}
                        label={data.label}
                        value={categoriesData[data.name] || ""}
                        name={data.name}
                        onChange={categoriesDataOnChange}
                     />
                  );
               })}
            </div>
            {/* category type */}
            <div>
               <label
                  htmlFor="type"
                  className="mb-2 block text-xl text-slate-800 font-semibold">
                  نوع
               </label>
               <Select
                  id="type"
                  onChange={setSelectedType}
                  options={categoriesTypes}
                  defaultValue={selectedType}
               />
            </div>
            {/* submit btn */}
            <button
               className="btn btn--primary mt-2"
               type="submit">
               {isLoading ? <ThreeDotsLoading /> : "تایید"}
            </button>
         </div>
      </form>
   );
};

export default CategoryForm;
