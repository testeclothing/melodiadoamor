import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  pulse?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  pulse = false,
  className = '',
  disabled,
  ...props 
}) => {
  const baseStyles = "font-bold py-4 px-8 rounded-full transition-all duration-300 transform shadow-lg text-lg flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-brand-500/30",
    secondary: "bg-white text-brand-600 hover:bg-brand-50 border border-brand-100",
    outline: "border-2 border-white text-white hover:bg-white/10"
  };

  const hoverEffects = disabled ? "opacity-50 cursor-not-allowed grayscale" : "hover:-translate-y-1 hover:from-brand-700 hover:to-brand-600";
  const pulseAnimation = pulse && !disabled ? "animate-pulse" : "";
  const widthClass = fullWidth ? "w-full" : "";

  // For primary variant specifically handle hover if not disabled
  const variantClasses = variants[variant];
  
  return (
    <button 
      className={`${baseStyles} ${variantClasses} ${hoverEffects} ${widthClass} ${pulseAnimation} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};