import { useId } from "react";
import Label from "./Label";

const SelectOptionsField = ({
  options,
  labelProps,
  label,
  id,
  className,
  value,
  onChange,
  editable = true,
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
        <select
          {...rest}
          value={value}
          onChange={onChange}
          id={__id}
          className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${className}`}
        >
          <option>Select</option>
          {Object.entries(options).map(([value, name]) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      ) : (
        <div
          className={`block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${className}`}
        >
          {value || "N/A"}
        </div>
      )}
    </div>
  );
};

export default SelectOptionsField;
