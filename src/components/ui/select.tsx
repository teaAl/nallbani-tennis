"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { Check, ChevronDown } from "lucide-react";

interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Select({
  defaultValue,
  value,
  onValueChange,
  className,
  children,
  ...props
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Sync internal state with value prop
  useEffect(() => {
    if (value !== undefined && value !== selectedValue) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            selectedValue,
            onValueChange: handleValueChange,
            isOpen,
            setIsOpen,
          });
        }
        return child;
      })}
    </div>
  );
}

interface SelectTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  selectedValue?: string;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function SelectTrigger({
  className,
  selectedValue,
  isOpen,
  setIsOpen,
  children,
  ...props
}: SelectTriggerProps & { onValueChange?: any }) {
  // Remove onValueChange from props if present
  const { onValueChange, ...rest } = props;
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => setIsOpen?.(!isOpen)}
      {...rest}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
  selectedValue?: string;
}

export function SelectValue({
  className,
  placeholder,
  selectedValue,
  ...props
}: SelectValueProps & { onValueChange?: any }) {
  // Remove onValueChange from props if present
  const { onValueChange, ...rest } = props;
  return (
    <span
      className={cn("text-sm", !selectedValue && "text-gray-400", className)}
      {...rest}
    >
      {selectedValue || placeholder || "Select an option"}
    </span>
  );
}

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

export function SelectContent({
  className,
  isOpen,
  children,
  ...props
}: SelectContentProps & {
  onValueChange?: any;
  selectedValue?: any;
  setIsOpen?: any;
}) {
  if (!isOpen) return null;
  // Remove custom props from ...props before spreading
  const { onValueChange, selectedValue, setIsOpen, ...rest } = props;
  return (
    <div
      className={cn(
        "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white p-1 text-sm shadow-md",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

export function SelectItem({
  className,
  value,
  selectedValue,
  onValueChange,
  children,
  ...props
}: SelectItemProps & { isOpen?: any; setIsOpen?: any }) {
  const isSelected = selectedValue === value;
  const { isOpen, setIsOpen, ...rest } = props;
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100",
        isSelected && "bg-gray-100",
        className
      )}
      onClick={() => onValueChange?.(value)}
      {...rest}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      <span className="text-sm">{children}</span>
    </div>
  );
}
