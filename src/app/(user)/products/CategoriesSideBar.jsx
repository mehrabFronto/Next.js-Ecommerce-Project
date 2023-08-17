import CheckBox from "@/common/CheckBox";
import { useState } from "react";

const CategoriesSideBar = ({ categories }) => {
   const [selectedCategories, setSelectedCategories] = useState([]);

   const changeHandler = ({ target }) => {
      if (selectedCategories.includes(target.value)) {
         const filteredItems = selectedCategories.filter(
            (items) => !items.includes(target.value),
         );
         setSelectedCategories(filteredItems);
      } else {
         setSelectedCategories([...selectedCategories, target.value]);
      }
   };

   const renderCategories = () => {
      return categories.map((category) => {
         return (
            <CheckBox
               key={category._id}
               id={category._id}
               value={category.englishTitle}
               name="product-category"
               label={category.title}
               checked={selectedCategories.includes(category.englishTitle)}
               onChange={changeHandler}>
               {category.title}
            </CheckBox>
         );
      });
   };

   return (
      <>
         <h2 className="text-2xl font-semibold mb-6">دسته بندی ها</h2>
         <ul className="space-y-4">{renderCategories()}</ul>
      </>
   );
};

export default CategoriesSideBar;
