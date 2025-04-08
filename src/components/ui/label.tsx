import type React from "react"

type LabelProps = {
  htmlFor?: string
  children: React.ReactNode
  className?: string
}

export function Label({ htmlFor, children, className = "" }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </label>
  )
}
