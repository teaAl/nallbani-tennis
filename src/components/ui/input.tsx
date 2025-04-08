"use client"

import type React from "react"

type InputProps = {
  id?: string
  name?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  disabled?: boolean
  required?: boolean
}

export function Input({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false,
  required = false,
}: InputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`flex h-10 w-full text-foreground rounded-md border border-foreground/30 bg-gray-800 px-3 py-2 text-sm placeholder:text-foreground/40 focus:outline-none  focus:border-pear/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
    />
  )
}
