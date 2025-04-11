"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { cn } from "@/lib/cn"

interface RadioGroupContextValue {
  value: string
  onValueChange: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined)

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export function RadioGroup({ defaultValue, value, onValueChange, className, children, ...props }: RadioGroupProps) {
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || "")

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <RadioGroupContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange }}>
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  value: string
}

export function RadioGroupItem({ className, value, children, ...props }: RadioGroupItemProps) {
  const context = useContext(RadioGroupContext)
  if (!context) {
    throw new Error("RadioGroupItem must be used within a RadioGroup")
  }

  const { value: selectedValue, onValueChange } = context
  const isChecked = selectedValue === value

  return (
    <label className={cn("flex items-center space-x-2", className)}>
      <div className="relative flex h-5 w-5 items-center justify-center">
        <input
          type="radio"
          className="peer h-5 w-5 cursor-pointer opacity-0 absolute"
          checked={isChecked}
          value={value}
          onChange={() => onValueChange(value)}
          {...props}
        />
        <div
          className={cn(
            "h-5 w-5 rounded-full border flex items-center justify-center",
            isChecked ? "border-lime-500 bg-lime-50" : "border-gray-300",
          )}
        >
          {isChecked && <div className="h-2.5 w-2.5 rounded-full bg-lime-500" />}
        </div>
      </div>
      <div>{children}</div>
    </label>
  )
}
