import type React from "react"

export function Avatar({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`relative inline-flex h-10 w-10 overflow-hidden rounded-full ${className}`}>{children}</div>
}

export function AvatarImage({ src, alt = "", className = "" }: { src: string; alt?: string; className?: string }) {
  return <img src={src || "/placeholder.svg"} alt={alt} className={`h-full w-full object-cover ${className}`} />
}

export function AvatarFallback({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 ${className}`}>
      {children}
    </div>
  )
}
