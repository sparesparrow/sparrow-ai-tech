import React from 'react';
import PropTypes from 'prop-types';

const PrimaryButton = React.forwardRef(({ children, className = '', type = 'button', ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={`bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:bg-sky-700 dark:hover:bg-sky-600 dark:text-white disabled:opacity-60 ${className}`}
    {...props}
  >
    {children}
  </button>
));

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default PrimaryButton; 