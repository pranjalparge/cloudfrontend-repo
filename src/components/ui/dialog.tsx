import * as React from "react";
import { cn } from "@/lib/utils";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children, className, ...props }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity",
        open ? "opacity-100" : "opacity-0 pointer-events-none",
        className
      )}
      onClick={() => onOpenChange(false)}
      {...props}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const DialogTrigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn("px-4 py-2 bg-blue-600 text-white rounded-md", className)}
      {...props}
    />
  )
);
DialogTrigger.displayName = "DialogTrigger";

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogContent: React.FC<DialogContentProps> = ({ className, children, ...props }) => (
  <div className={cn("p-4", className)} {...props}>
    {children}
  </div>
);

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader: React.FC<DialogHeaderProps> = ({ className, children, ...props }) => (
  <div className={cn("text-xl font-semibold mb-4", className)} {...props}>
    {children}
  </div>
);

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle: React.FC<DialogTitleProps> = ({ className, children, ...props }) => (
  <h2 className={cn("text-lg font-medium", className)} {...props}>
    {children}
  </h2>
);

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle };
