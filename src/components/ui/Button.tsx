// Placeholder for Button Component
import React from 'react';

export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="bg-accent text-white px-4 py-2 hover:bg-opacity-80 transition-colors" {...props}>
      {children}
    </button>
  );
};
