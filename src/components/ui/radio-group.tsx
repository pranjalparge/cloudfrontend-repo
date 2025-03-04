import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex gap-4", className)} {...props}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<RadioGroupItemProps>, {
                isSelected: child.props.value === value,
                onClick: () => onValueChange(child.props.value),
              })
            : child
        )}
      </div>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  isSelected?: boolean;
}

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, value, isSelected, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md border border-input transition-all",
          isSelected
            ? "bg-black text-white border-black"
            : "bg-transparent text-gray-700 border-gray-300",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "w-4 h-4 border rounded-full flex items-center justify-center",
            isSelected ? "border-black" : "border-gray-400"
          )}
        >
          {isSelected && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
        </div>
        {props.children}
      </button>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
