type ProgressProps = {
    value: number
    // max?: number
    className?: string
  }
  
  export function Progress({ value, /*max = 100,*/ className = "" }: ProgressProps) {
    const percentage = (Math.min(Math.max(0, value), 100) / 100) * 100
  
    return (
      <div className={`h-2 w-full overflow-hidden rounded-full bg-foreground/10 `}>
        <div
          className={`h-full transition-all ${className}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    )
  }