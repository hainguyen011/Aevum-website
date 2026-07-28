import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const variantClass = variant === 'primary' 
    ? 'btn-primary' 
    : variant === 'secondary' 
    ? 'btn-secondary' 
    : 'btn-secondary opacity-80 hover:opacity-100';

  const sizePadding = size === 'sm' 
    ? 'padding: 0.5rem 1rem; font-size: 0.8125rem;' 
    : size === 'lg' 
    ? 'padding: 0.9rem 2rem; font-size: 1rem;' 
    : '';

  return (
    <button 
      className={`btn ${variantClass} ${className}`}
      style={sizePadding ? { padding: size === 'sm' ? '0.5rem 1rem' : '0.9rem 2rem', fontSize: size === 'sm' ? '0.8125rem' : '1rem' } : {}}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : 18} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : 18} />}
    </button>
  );
};
