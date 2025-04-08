"use client"

import type React from "react"

type ButtonProps = {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "destructive" | "link"
  size?: "default" | "sm" | "lg"
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit" | "reset"
}

export function Button({
  children,
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  onClick,
  type = "button",
}: ButtonProps) {
  const variantClasses = {
    default: "bg-green-500 text-white hover:bg-green-600",
    outline: "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    link: "bg-transparent text-green-500 hover:underline p-0",
  }

  const sizeClasses = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1 text-xs",
    lg: "px-6 py-3 text-base",
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
