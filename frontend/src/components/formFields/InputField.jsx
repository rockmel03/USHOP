import { useId } from "react";
import Label from "./Label";

const InputField = ({
  label,
  labelProps,
  id,
  className,
  value,
  onChange,
  type = "text",
  editable = false,
  ...rest
}) => {
  let __id = useId();
  if (id) __id = id;

  return (
    <div>
      <div className="mb-2">
        <Label {...labelProps} label={label} htmlFor={__id} />
      </div>
      {editable ? (
        <input
          {...rest}
          type={type}
          id={__id}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${className}`}
        />
      ) : (
        <div
          {...rest}
          className={`block w-full rounded-lg border border-gray-300 p-2.5 text-sm ${className}`}
        >
          {value || "N/A"}
        </div>
      )}
    </div>
  );
};

export default InputField;
