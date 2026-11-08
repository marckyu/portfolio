import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = HTMLMotionProps<"a"> & {
  variant?: ButtonVariant;
  children?: ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-gradient-to-r from-[#4f8cff] to-[#7a5af8] text-white shadow-[0_0_20px_rgba(79,140,255,0.3)] hover:shadow-[0_0_30px_rgba(79,140,255,0.6)]",
  secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
  ghost: "text-gray-400 hover:text-white",
};

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ className = "", variant = "primary", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4f8cff]";

    return (
      <motion.a
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </motion.a>
    );
  }
);

Button.displayName = "Button";