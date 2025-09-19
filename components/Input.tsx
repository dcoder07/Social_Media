import { NextPage } from "next";

interface InputProps {
  disabled?: boolean;
  value?: string;
  type?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: NextPage<InputProps> = ({
  disabled,
  value,
  type,
  placeholder,
  onChange,
}) => {
  return (
    <input
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      className='w-full p-4 text-lg bg-black border-2 border-black rounded-md outline-none text-white 
      focus:border-blue-700 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed'
    ></input>
  );
};

export default Input;
