type SeparatorProps = {
    orientation?: "horizontal" | "vertical"
    className?: string
  }
  
  export function Separator({ orientation = "horizontal", className = "" }: SeparatorProps) {
    return (
      <div
        className={`${orientation === "horizontal" ? "h-px w-full" : "h-full w-px"} bg-gray-200 ${className}`}
        role="separator"
      />
    )
  }
  