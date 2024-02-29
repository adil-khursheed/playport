import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  {
    label,
    icon1,
    icon2,
    iconWidth = "w-5",
    iconHeight = "h-5",
    iconClassName = "",
    labelClassName = "",
    inputWrapperClassName = "",
    onClick,
    type = "text",
    className = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className={`inline-block mb-1 font-medium ${labelClassName}`}>
          {label}
        </label>
      )}

      <div
        className={`w-full flex items-center border border-dark-2 rounded-lg px-3 ${inputWrapperClassName}`}>
        {icon1 && (
          <div className={`${iconClassName} ${iconWidth} ${iconHeight}`}>
            {icon1}
          </div>
        )}
        <input
          type={type}
          id={id}
          ref={ref}
          className={`${className} w-full px-3 py-2 bg-transparent text-dark-1 outline-none`}
          {...props}
        />
        {icon2 && (
          <div
            className={`${iconClassName} ${iconWidth} ${iconHeight} cursor-pointer`}
            onClick={onClick}>
            {icon2}
          </div>
        )}
      </div>
    </div>
  );
});

export default Input;
