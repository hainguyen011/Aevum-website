import React from 'react';

export const Card = ({
  children,
  className = '',
  glow = false,
  padding = 'p-6',
  style = {},
  ...props
}) => {
  return (
    <div 
      className={`glass-card ${className}`}
      style={{
        padding: padding === 'none' ? '0' : padding === 'sm' ? '1rem' : '1.5rem',
        ...style
      }}
      {...props}
    >
      {glow && (
        <div 
          className="glow-backdrop" 
          style={{ top: '-100px', right: '-100px', opacity: 0.6 }}
        />
      )}
      {children}
    </div>
  );
};
