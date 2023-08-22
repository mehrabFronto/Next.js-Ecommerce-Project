import { productListTableTHeads } from "@/constants/tableHeads";
import { priceUtils } from "@/utils/priceUtils";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProductsTable = ({ products }) => {
   return (
      <div className="overflow-auto pb-2 customScrollBar">
         <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
            <thead>
               <tr>
                  {productListTableTHeads.map((item) => {
                     return (
                        <th
                           key={item.id}
                           className="table__th">
                           {item.label}
                        </th>
                     );
                  })}
               </tr>
            </thead>
            <tbody>
               {products.map((product, index) => {
                  return (
                     <tr key={product._id}>
                        <td className="table__td">{toPersianDigits(index)}</td>
                        <td className="table__td">{product.title}</td>
                        <td className="table__td">{product.category.title}</td>
                        <td className="table__td">
                           {toPersianDigits(priceUtils(product.price))}
                        </td>
                        <td className="table__td">
                           {toPersianDigits(
                              priceUtils(product.price - product.offPrice),
                           )}
                        </td>
                        <td className="table__td">
                           {toPersianDigits(priceUtils(product.offPrice))}
                        </td>
                        <td className="table__td">
                           {toPersianDigits(product.countInStock)}
                        </td>
                        <td className="table__td">
                           <div className="flex items-center gap-x-2">
                              <button>
                                 <TrashIcon className="w-6 h-6 text-red-500" />
                              </button>
                              <Link
                                 className="block text-secondary-600"
                                 href={`/admin/edit/${product._id}`}>
                                 <PencilSquareIcon className="w-6 h-6" />
                              </Link>
                           </div>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

export default ProductsTable;
