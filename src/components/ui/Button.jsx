import React, { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Aevum OS Precision Pill Button Component
 * Reusable, accessible, and matches Google DeepMind / Aevum high-end pill aesthetics.
 * 
 * @param {'primary' | 'secondary' | 'ghost' | 'outline' | 'dark'} variant
 * @param {'sm' | 'md' | 'lg'} size
 * @param {boolean} arrow - Automatic right arrow icon
 * @param {React.ComponentType} icon - Custom icon component
 * @param {'left' | 'right'} iconPosition
 * @param {boolean} fullWidth
 * @param {string} href - Renders as <a> if provided
 * @param {boolean} disabled
 */
export const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  arrow = false,
  href,
  fullWidth = false,
  type = 'button',
  disabled = false,
  ...props
}, ref) => {
  // Base Pill Geometry & Micro-Interactions
  const baseClasses = "inline-flex items-center justify-center font-normal sm:font-medium font-sans rounded-full transition-all duration-200 select-none";

  // Size Variants with explicit min-height to maintain pixel-perfect height parity across variants
  const sizeClasses = {
    sm: "text-xs px-4 py-1.5 min-h-[32px] gap-1.5",
    md: "text-xs sm:text-sm px-6 py-2.5 sm:px-7 sm:py-2.5 min-h-[42px] sm:min-h-[44px] gap-2 tracking-tight",
    lg: "text-sm sm:text-base px-8 py-3.5 sm:px-9 sm:py-3.5 min-h-[48px] sm:min-h-[50px] gap-2.5",
  }[size] || "text-xs sm:text-sm px-6 py-2.5 sm:px-7 sm:py-2.5 min-h-[42px] sm:min-h-[44px] gap-2 tracking-tight";

  // Visual Theme Variants matching user reference image
  const variantClasses = {
    // Primary: Crisp pure white pill with black text and subtle hover lift
    primary: "btn-pill-primary bg-white text-black hover:bg-slate-100 hover:scale-[1.02] shadow-sm border border-transparent",
    
    // Secondary: Elegant dark translucent pill with faint border & subtle hover highlight
    secondary: "btn-pill-secondary text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-white/20 backdrop-blur-sm",
    
    // Ghost: Transparent with soft hover fill
    ghost: "btn-pill-ghost text-slate-300 hover:text-white bg-transparent hover:bg-white/[0.06] border border-transparent",
    
    // Outline: Distinct faint white border
    outline: "btn-pill-outline text-slate-200 hover:text-white bg-transparent border border-white/20 hover:border-white/40 hover:bg-white/[0.05]",

    // Dark: Solid dark background with subtle border
    dark: "btn-pill-dark bg-[#0d0e15] hover:bg-[#151722] text-white border border-white/10 hover:border-white/20",
  }[variant] || "btn-pill-primary bg-white text-black hover:bg-slate-100 hover:scale-[1.02] shadow-sm border border-transparent";

  const stateClasses = disabled 
    ? "opacity-50 pointer-events-none cursor-not-allowed" 
    : "cursor-pointer active:scale-[0.98]";

  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${stateClasses} ${widthClass} ${className}`.trim();

  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;

  const renderIcon = () => {
    if (arrow) {
      return <ArrowRight size={iconSize} className="stroke-[1.75] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />;
    }
    if (Icon) {
      return <Icon size={iconSize} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />;
    }
    return null;
  };

  const hasIcon = arrow || Icon;

  const content = (
    <>
      {hasIcon && iconPosition === 'left' && renderIcon()}
      <span className="leading-none">{children}</span>
      {hasIcon && iconPosition === 'right' && renderIcon()}
    </>
  );

  if (href && !disabled) {
    return (
      <a
        ref={ref}
        href={href}
        className={`${combinedClasses} group`}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={`${combinedClasses} group`}
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
