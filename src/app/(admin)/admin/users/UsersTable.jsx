import { userListTableHeads } from "@/constants/tableHeads";
import { toLocaleDateString } from "@/utils/toLocalDateString";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const UsersTable = ({ users }) => {
   return (
      <div className="overflow-auto pb-2 customScrollBar">
         <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
            <thead>
               <tr>
                  {userListTableHeads.map((item) => {
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
               {users.map((user, index) => {
                  return (
                     <tr key={user._id}>
                        <td className="table__td">{toPersianDigits(index)}</td>
                        <td className="table__td">{user.name}</td>
                        <td className="table__td">{user.email}</td>
                        <td className="table__td">
                           <div className="flex items-center gap-x-2">
                              {user.isVerifiedPhoneNumber && (
                                 <CheckCircleIcon className="w-5 h-5 text-success" />
                              )}
                              {toPersianDigits(user.phoneNumber)}
                           </div>
                        </td>
                        <td className="table__td">
                           <div className="space-y-2 max-h-20 overflow-y-auto customScrollBar">
                              {user.Products.map((product, index) => {
                                 return <div key={index}>{product.title}</div>;
                              })}
                           </div>
                        </td>
                        <td className="table__td">
                           {toLocaleDateString(user.createdAt)}
                        </td>
                        <td className="table__td">
                           <Link
                              href={`/admin/users/${user._id}`}
                              className="text-primary-600">
                              مشاهده جزییات
                           </Link>
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

export default UsersTable;
