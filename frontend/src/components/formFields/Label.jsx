const Label = ({ label, className, ...rest }) => {
  return (
    label && (
      <label
        {...rest}
        className={`block text-sm font-medium text-gray-900 ${className}`}
      >
        {label}
      </label>
    )
  );
};

export default Label;
