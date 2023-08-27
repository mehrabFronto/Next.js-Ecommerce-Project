const TextField = ({ label, name, value, onChange }) => {
   return (
      <div className="flex flex-col w-full gap-y-2">
         {/* label */}
         <label
            htmlFor={name}
            className="text-xl text-slate-800 font-semibold">
            {label}
         </label>
         {/* input */}
         <input
            value={value}
            name={name}
            type="text"
            id={name}
            className="textField__input"
            placeholder={`${label}...`}
            onChange={onChange}
         />
      </div>
   );
};

export default TextField;
