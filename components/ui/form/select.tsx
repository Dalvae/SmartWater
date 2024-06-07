import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/utils/cn";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./field-wrapper";

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  registration: Partial<UseFormRegisterReturn>;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  (props, ref) => {
    const {
      label,
      options,
      error,
      className,
      defaultValue,
      registration,
      onChange,
    } = props;

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(event);
      }
      if (registration?.onChange) {
        registration.onChange(event);
      }
    };

    return (
      <FieldWrapper label={label} error={error}>
        <select
          className={cn(
            "mt-1 block w-full rounded-md border-gray-600 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm",
            className
          )}
          defaultValue={defaultValue}
          {...registration}
          ref={ref}
          onChange={handleChange}
        >
          {options.map(({ label, value }) => (
            <option key={label?.toString()} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FieldWrapper>
    );
  }
);
Select.displayName = "Select";
