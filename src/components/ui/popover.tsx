"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/cn"

interface PopoverProps {
  children: React.ReactNode
  className?: string
}

export function Popover({ children, className }: PopoverProps) {
  return <div className={cn("relative", className)}>{children}</div>
}

interface PopoverTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

export function PopoverTrigger({ children, asChild = false, ...props }: PopoverTriggerProps) {
  if (asChild) {
    return <div {...props}>{children}</div>
  }
  return <button {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>
}

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end"
}

export function PopoverContent({ children, className, align = "center", ...props }: PopoverContentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Toggle open state when trigger is clicked
  useEffect(() => {
    const trigger = ref.current?.previousElementSibling
    if (!trigger) return

    const handleClick = () => {
      setIsOpen((prev) => !prev)
    }

    trigger.addEventListener("click", handleClick)
    return () => {
      trigger.removeEventListener("click", handleClick)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 w-72 rounded-md border bg-white p-4 shadow-md outline-none",
        align === "center" && "left-1/2 -translate-x-1/2",
        align === "start" && "left-0",
        align === "end" && "right-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
