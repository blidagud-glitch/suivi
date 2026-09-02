import * as React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'emerald' }>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:pointer-events-none",
          "px-6 py-2.5",
          variant === 'default' && "bg-slate-900 text-white shadow-lg shadow-slate-200 hover:bg-slate-800",
          variant === 'emerald' && "bg-emerald-600 text-white hover:bg-emerald-700",
          variant === 'outline' && "border border-slate-300 text-slate-600 hover:bg-slate-50",
          variant === 'ghost' && "hover:bg-slate-100 text-slate-600",
          variant === 'destructive' && "bg-red-500 text-white hover:bg-red-600",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
