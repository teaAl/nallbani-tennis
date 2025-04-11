"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/cn"

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
  className?: string
}

export function CustomDropdown({ trigger, children, align = "left", className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 min-w-[12rem] rounded-md border border-gray-200 bg-white py-1 shadow-lg",
            align === "right" ? "right-0" : "left-0",
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export function DropdownItem({
  children,
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-4 py-1 text-xs font-semibold text-gray-500 uppercase", className)}>{children}</div>
}

export function DropdownSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 h-px bg-gray-200", className)} />
}
