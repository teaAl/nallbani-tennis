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
      className={`flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  )
}
