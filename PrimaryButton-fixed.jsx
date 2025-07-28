import React from 'react';

const PrimaryButton = ({
  children,
  onClick,
  disabled,
  type = 'button',
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg bg-sky-600 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:opacity-60 dark:bg-sky-700 dark:text-white dark:hover:bg-sky-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;
