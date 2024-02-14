const Button = ({
  children,
  type = "button",
  bgColor = "bg-dark-1",
  textColor = "text-light-1",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`px-3 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default Button;
