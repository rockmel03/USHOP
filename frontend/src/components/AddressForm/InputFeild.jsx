import { useId } from "react";

const InputFeild = ({
  label,
  labelClassName,
  type = "text",
  id,
  className,
  ...rest
}) => {
  const _id = useId();
  const inputId = id || _id;

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className={`mb-2 block text-sm font-medium text-gray-900 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <input
        {...rest}
        type={type}
        id={inputId}
        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 ${className}`}
      />
    </div>
  );
};

export default InputFeild;
