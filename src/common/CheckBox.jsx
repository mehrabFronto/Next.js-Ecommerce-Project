const CheckBox = ({ name, id, checked, value, onChange, label }) => {
   return (
      <div>
         <input
            type="checkbox"
            name={name}
            id={id}
            checked={checked}
            value={value}
            onChange={onChange}
            className="cursor-pointer form-checkbox rounded-[5px] border-2 border-secondary-400 bg-transparent
            w-4 h-4 checked:text-primary-600 ml-2"
         />
         <label htmlFor={id}>{label}</label>
      </div>
   );
};

export default CheckBox;
