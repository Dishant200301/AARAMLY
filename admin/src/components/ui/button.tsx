import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
    
    const variantStyles = {
      default: "bg-black text-white hover:bg-neutral-800 shadow-2xs",
      destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-2xs",
      outline: "border border-neutral-200 bg-white text-black hover:bg-neutral-100 shadow-2xs",
      secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200/80",
      ghost: "hover:bg-neutral-100 hover:text-black",
      link: "text-black underline-offset-4 hover:underline",
    }

    const sizeStyles = {
      default: "h-9 px-3.5 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-5 text-sm",
      icon: "h-8 w-8",
    }

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

    return (
      <button
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
