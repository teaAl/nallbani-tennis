"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/cn"
import { X } from "lucide-react"

interface Toast {
  id: string
  title: string
  description?: string
  type?: "default" | "success" | "error" | "warning"
}

interface ToasterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Toaster({ className, ...props }: ToasterProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const handleToast = (event: CustomEvent<Toast>) => {
      const toast = event.detail
      setToasts((prev) => [...prev, { ...toast, id: Math.random().toString(36).substring(2, 9) }])
    }

    window.addEventListener("toast" as any, handleToast as any)
    return () => {
      window.removeEventListener("toast" as any, handleToast as any)
    }
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <div className={cn("fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 md:max-w-[420px]", className)} {...props}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex w-full items-center justify-between space-x-4 rounded-md border p-4 shadow-lg",
            toast.type === "success" && "bg-green-50 border-green-200",
            toast.type === "error" && "bg-red-50 border-red-200",
            toast.type === "warning" && "bg-yellow-50 border-yellow-200",
            !toast.type && "bg-white border-gray-200",
          )}
        >
          <div className="flex-1">
            <div className="font-medium">{toast.title}</div>
            {toast.description && <div className="text-sm text-gray-500">{toast.description}</div>}
          </div>
          <button
            className="inline-flex h-6 w-6 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            onClick={() => removeToast(toast.id)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      ))}
    </div>
  )
}

// Helper function to show toasts
export function toast(props: Omit<Toast, "id">) {
  const event = new CustomEvent("toast", { detail: props })
  window.dispatchEvent(event)
}
