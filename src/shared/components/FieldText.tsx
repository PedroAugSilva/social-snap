import { twMerge } from "tailwind-merge";
import { InputHTMLAttributes, LegacyRef } from "react";
import { ComponentProps } from "react";
import { ChangeHandler, RegisterOptions } from "react-hook-form";

type FieldTextProps = {
  type?: "password" | "email" | "text";
  placeholder?: string;
  label?: string;
  className?: string;
  onChange?: any;
  onBlur?: any;
  name: string;
  ref: any;
};

export const FieldText = ({
  type = "text",
  label,
  placeholder,
  className,
  ...props
}: FieldTextProps) => {
  return (
    <div className="py-1">
      {label && <span className="px-1 text-sm text-gray-600">{label}</span>}

      <input
        placeholder={placeholder ?? `${label}...`}
        type={type}
        {...props}
        className={twMerge(
          "text-md block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-md transition-all focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none",
          className,
        )}
      />
    </div>
  );
};
