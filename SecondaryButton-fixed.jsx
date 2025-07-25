import React from 'react';

const SecondaryButton = ({ children, onClick, selected, disabled, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded border px-4 py-2 font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:focus-visible:ring-sky-600 ${
        selected
          ? 'border-sky-400 bg-sky-100 text-sky-700 dark:border-sky-600 dark:bg-sky-800 dark:text-sky-200'
          : 'border-sky-300 bg-white text-sky-700 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-300 dark:hover:bg-slate-700'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

SecondaryButton.displayName = 'SecondaryButton';

export default SecondaryButton;