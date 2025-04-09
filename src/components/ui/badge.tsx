import type React from "react"

export function Badge({
  children,
  className = "",
  variant = "default",
}: { children: React.ReactNode; className?: string; variant?: "default" | "outline" | "secondary" | "primary" }) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    outline: "border border-gray-200 text-gray-800",
    secondary: "bg-gray-800 text-white",
    primary: "bg-pear text-gray-900",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
