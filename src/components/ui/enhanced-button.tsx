import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-gradient-primary text-primary-foreground shadow-primary hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold",
        viral: "bg-gradient-secondary text-secondary-foreground shadow-secondary hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold",
        accent: "bg-gradient-accent text-accent-foreground shadow-accent hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold",
        success: "bg-gradient-success text-foreground shadow-accent hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold",
        instagram: "bg-gradient-instagram text-white shadow-accent hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold",
        tiktok: "bg-gradient-tiktok text-white shadow-secondary hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold",
        youtube: "bg-gradient-youtube text-white shadow-secondary hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold",
        facebook: "bg-gradient-facebook text-white shadow-primary hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 sm:h-9 rounded-md px-3 text-xs sm:text-sm",
        lg: "h-10 sm:h-11 rounded-md px-6 sm:px-8 text-sm sm:text-base",
        xl: "h-12 sm:h-14 rounded-lg px-8 sm:px-12 text-base sm:text-lg",
        icon: "h-9 w-9 sm:h-10 sm:w-10",
        mobile: "h-11 rounded-lg px-6 text-base active:scale-95 transition-transform",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }