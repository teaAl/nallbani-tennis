"use client"

import type React from "react"

type TextareaProps = {
  id?: string
  name?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  disabled?: boolean
  required?: boolean
  rows?: number
}

export function Textarea({
  id,
  name,
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false,
  required = false,
  rows = 3,
}: TextareaProps) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      rows={rows}
      className={`flex w-full rounded-md border border-foreground/30 bg-gray-800 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-pear/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
    />
  )
}
