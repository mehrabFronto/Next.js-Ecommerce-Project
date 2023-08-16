const TextField = ({ label, name, type = "text", placeholder, formik }) => {
   return (
      <div className="flex flex-col gap-y-2">
         <div className="w-full flex items-center justify-between">
            <label
               className="text-xl text-slate-800 font-semibold"
               htmlFor={name}>
               {label}
            </label>
            {formik.errors[name] && formik.touched[name] && (
               <p className="text-sm text-red-500 font-medium">
                  {formik.errors[name]}
               </p>
            )}
         </div>
         <input
            id={name}
            name={name}
            type={type}
            className="textField__input"
            placeholder={placeholder}
            {...formik.getFieldProps(name)}
         />
      </div>
   );
};

export default TextField;
