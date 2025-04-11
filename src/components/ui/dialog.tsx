"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/cn"
import { X } from "lucide-react"

interface DialogProps {
  children: React.ReactNode
  className?: string
}

export function Dialog({ children, className }: DialogProps) {
  return <div className={cn("relative", className)}>{children}</div>
}

interface DialogTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}

export function DialogTrigger({ children, asChild = false, ...props }: DialogTriggerProps) {
  const Comp: React.ElementType = asChild ? "div" : "button"
  return React.createElement(Comp, props, children)
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogContent({ children, className, ...props }: DialogContentProps) {
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
    const trigger = document.querySelector("[data-dialog-trigger]")
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={ref} className={cn("relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg", className)} {...props}>
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  )
}

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
}

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />
}
