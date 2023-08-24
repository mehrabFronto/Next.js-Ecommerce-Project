import { userPaymentTHeads } from "@/constants/tableHeads";
import { priceUtils } from "@/utils/priceUtils";
import { toLocaleDateString } from "@/utils/toLocalDateString";
import { toPersianDigits } from "@/utils/toPersianDigits";

const PaymentsTable = ({ payments }) => {
   return (
      <div className="overflow-auto pb-2 customScrollBar">
         <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
            <thead>
               <tr>
                  {userPaymentTHeads.map((item) => {
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
               {payments.map((payment, index) => {
                  return (
                     <tr key={payment._id}>
                        <td className="table__td">{toPersianDigits(index)}</td>
                        <td className="table__td">
                           {toPersianDigits(payment.invoiceNumber)}
                        </td>
                        <td className="table__td max-w-[280px] whitespace-nowrap truncate">
                           {payment.description}
                        </td>
                        <td className="table__td">
                           {payment.cart.productDetail.map((product) => {
                              return (
                                 <div key={product._id}>{product.title}</div>
                              );
                           })}
                        </td>
                        <td className="table__td">
                           {toPersianDigits(priceUtils(payment.amount))}
                        </td>
                        <td className="table__td">
                           {toLocaleDateString(payment.createdAt)}
                        </td>
                        <td className="table__td">
                           {payment.status === "COMPLETED" ? (
                              <span className="bg-success px-2 py-1 rounded-3xl text-secondary-100">
                                 موفق
                              </span>
                           ) : (
                              <span className="bg-error px-2 py-1 rounded-3xl text-secondary-100">
                                 ناموفق
                              </span>
                           )}
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </div>
   );
};

export default PaymentsTable;
