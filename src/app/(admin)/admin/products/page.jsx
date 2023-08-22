"use client";

import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import { useGetProducts } from "@/hooks/useProducts";
import ProductsTable from "./productsTable";

const ProductsPage = () => {
   const { data, isLoading } = useGetProducts();

   const { products } = data || [];

   // if (products) console.log(products);

   if (isLoading) return <ThreeDotsLoading />;

   return (
      <div className="container">
         <h1 className="text-2xl font-bold mb-6">اطلاعات محصولات</h1>
         <ProductsTable products={products} />
      </div>
   );
};

export default ProductsPage;
