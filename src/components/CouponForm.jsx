import RadioInput from "@/common/RadioInput";
import TextField from "@/common/TextField";
import ThreeDotsLoading from "@/common/ThreeDotsLoading";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";

const couponsFormData = [
   {
      id: 1,
      label: "کد",
      name: "code",
   },
   {
      id: 2,
      label: "مقدار",
      name: "amount",
   },
   {
      id: 3,
      label: "ظرفیت",
      name: "usageLimit",
   },
];

const CouponForm = ({
   formTitle,
   onSubmit,
   couponsData,
   couponsDataOnChange,
   type,
   changeTypeHandler,
   products,
   setSelectedProducts,
   expireDate,
   changeExpireDateHandler,
   isLoading,
   defaultValue = "",
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
               {couponsFormData.map((data) => {
                  return (
                     <TextField
                        key={data.id}
                        name={data.name}
                        value={couponsData[data.name] || ""}
                        label={data.label}
                        onChange={couponsDataOnChange}
                     />
                  );
               })}
            </div>
            {/* expire date */}
            <div>
               <label
                  htmlFor="products"
                  className="mb-2 block text-xl text-slate-800 font-semibold">
                  تاریخ انقضا
               </label>
               <DatePicker
                  value={expireDate}
                  onChange={changeExpireDateHandler}
                  format="YYYY/MM/DD"
                  calendar={persian}
                  locale={persian_fa}
                  inputClass="textField__input"
               />
            </div>
            {/* products select option */}
            <div>
               <label
                  htmlFor="products"
                  className="mb-2 block text-xl text-slate-800 font-semibold">
                  شامل محصولات
               </label>
               <Select
                  isMulti
                  instanceId="products"
                  onChange={setSelectedProducts}
                  options={products}
                  getOptionLabel={(option) => option.title}
                  getOptionValue={(option) => option._id}
                  defaultValue={defaultValue}
               />
            </div>
            {/* coupon type */}
            <div>
               <label className="block mb-4 text-xl text-slate-800 font-semibold">
                  نوع
               </label>
               <div className="flex items-center gap-x-4 pr-2">
                  <RadioInput
                     name={"couponType"}
                     id="type-percent"
                     checked={type === "percent"}
                     label="درصد"
                     value="percent"
                     onChange={changeTypeHandler}
                  />
                  <RadioInput
                     name={"couponType"}
                     id="type-fixedProduct"
                     checked={type === "fixedProduct"}
                     label="قیمت ثابت"
                     value="fixedProduct"
                     onChange={changeTypeHandler}
                  />
               </div>
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

export default CouponForm;
