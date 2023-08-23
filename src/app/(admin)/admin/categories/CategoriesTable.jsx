import { categoryListTableTHeads } from "@/constants/tableHeads";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const CategoriesTable = ({ categories }) => {
   return (
      <div className="overflow-auto pb-2 customScrollBar">
         <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
            <thead>
               <tr>
                  {categoryListTableTHeads.map((item) => {
                     return (
                        <th
                           className="table__th"
                           key={item.id}>
                           {item.label}
                        </th>
                     );
                  })}
               </tr>
            </thead>
            <tbody>
               {categories.map((category, index) => {
                  return (
                     <tr key={category._id}>
                        <td className="table__td">{toPersianDigits(index)}</td>
                        <td className="table__td">{category.title}</td>
                        <td className="table__td">{category.description}</td>
                        <td className="table__td">{category.englishTitle}</td>
                        <td className="table__td">{category.type}</td>
                        <td className="table__td">
                           <div className="flex items-center gap-x-2">
                              <button>
                                 <TrashIcon className="w-6 h-6 text-red-500" />
                              </button>
                              <Link
                                 className="block text-secondary-600"
                                 href={`/admin/categories/edit/${category._id}`}>
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

export default CategoriesTable;
