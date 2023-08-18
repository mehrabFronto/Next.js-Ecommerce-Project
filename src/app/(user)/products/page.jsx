import { getAllCategories } from "@/services/categoriesServices";
import { getAllProducts } from "@/services/productsServices";
import queryString from "query-string";
import CategoriesSideBar from "./CategoriesSideBar";

export const dynamic = "force-dynamic";

const ProductsPage = async ({ searchParams }) => {
   const { products } = await getAllProducts(
      queryString.stringify(searchParams),
   );
   const { categories } = await getAllCategories();

   const renderProducts = () => {
      return products.map((product) => {
         return (
            <div
               key={product._id}
               className="col-span-3 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-lg p-4 min-h-[380px]">
               {product.title}
            </div>
         );
      });
   };

   return (
      <div className="w-full max-h-screen grid grid-cols-4 gap-4 xl:gap-8">
         <h1 className="col-span-4 text-3xl font-bold">صفحه محصولات</h1>
         {/* categories */}
         <div className="col-span-1 hidden md:block">
            <div className="bg-secondary-200 shadow-lg rounded-xl sticky top-20 lg:top-28 p-3 xl:p-4">
               <CategoriesSideBar categories={categories} />
            </div>
         </div>
         {/* products */}
         <div
            className="col-span-4 md:col-span-3 grid grid-cols-3 md:grid-cols-4 xl:grid-cols-3 gap-8 bg-secondary-200 
            shadow-lg rounded-xl p-3 xl:p-4">
            {renderProducts()}
         </div>
      </div>
   );
};

export default ProductsPage;
