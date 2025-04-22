import { useId } from "react";

const InputFeild = ({ label, type = "text", id, className, ...rest }) => {
  const _id = useId();

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id || id} className="font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id || _id}
        className={`rounded-full shadow-md py-2 px-4 w-full ${className}`}
        {...rest}
      />
    </div>
  );
};

export default InputFeild;
