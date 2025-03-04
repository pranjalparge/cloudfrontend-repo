import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ className, value, onChange, children, ...props }) => {
  return (
    <div className={cn("relative", className)}>
      <select
        className={cn(
          "block w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          className
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex items-center justify-between w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        className
      )}
      {...props}
    />
  )
);
SelectTrigger.displayName = "SelectTrigger";

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SelectContent: React.FC<SelectContentProps> = ({ className, children, ...props }) => (
  <div className={cn("absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg", className)} {...props}>
    {children}
  </div>
);

export interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const SelectItem: React.FC<SelectItemProps> = ({ className, children, ...props }) => (
  <option className={cn("py-2 px-3 text-gray-900", className)} {...props}>
    {children}
  </option>
);

export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {}

const SelectValue: React.FC<SelectValueProps> = ({ className, children, ...props }) => (
  <span className={cn("text-gray-900", className)} {...props}>
    {children}
  </span>
);

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
