import { NextPage } from "next";

interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  disabled?: boolean;
  outline?: boolean;
  onClick: () => void;
}

const Button: NextPage<ButtonProps> = ({
  label,
  disabled,
  secondary,
  fullWidth,
  outline,
  large,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
  rounded-full
  font-semibold
  hover:opacity-80
  hover: cursor-pointer
  transition
  ${disabled ? "opacity-70 cursor-not-allowed" : ""}
  ${fullWidth ? "w-full" : "w-fit"}
  ${secondary ? "bg-white" : "bg-blue-700"}
  ${secondary ? "text-black" : "text-white"}
  ${secondary ? "border-black" : "bg-blue-700"}
  ${large ? "text-xl" : "text-md"}
  ${large ? "px-5" : "px-4"}
  ${large ? "py-3" : "py-2"}
  ${outline ? "bg-transparent" : ""}
  ${outline ? "border-white" : ""}
  ${outline ? "text-white" : ""}
  `}
    >
      {label}
    </button>
  );
};

export default Button;
