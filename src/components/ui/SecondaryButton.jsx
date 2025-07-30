import React from 'react';
import PropTypes from 'prop-types';

const SecondaryButton = React.forwardRef(({ children, className = '', selected = false, type = 'button', ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={`px-4 py-2 rounded border font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:focus-visible:ring-sky-600 ${selected ? 'bg-sky-100 text-sky-700 border-sky-400 dark:bg-sky-800 dark:text-sky-200 dark:border-sky-600' : 'bg-white text-sky-700 border-sky-300 dark:bg-slate-800 dark:text-sky-300 dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-slate-700'} ${className}`}
    aria-pressed={selected}
    {...props}
  >
    {children}
  </button>
));

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  selected: PropTypes.bool,
  type: PropTypes.string,
};

export default SecondaryButton; 