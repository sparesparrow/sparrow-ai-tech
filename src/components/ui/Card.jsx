import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, description, children, href, onClick, className = '', ...props }) => {
  const isLink = !!href;
  const baseClass = `block bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${className}`;

  if (isLink) {
    return (
      <a
        href={href}
        className={baseClass}
        tabIndex={0}
        onKeyDown={e => { if (onClick && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick(e); } }}
        {...props}
      >
        <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-300 mb-2">{title}</h3>
        {description && <p className="text-slate-600 dark:text-stone-300 mb-2">{description}</p>}
        {children}
      </a>
    );
  }
  return (
    <div
      className={baseClass}
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={e => { if (onClick && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onClick(e); } }}
      {...props}
    >
      <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-300 mb-2">{title}</h3>
      {description && <p className="text-slate-600 dark:text-stone-300 mb-2">{description}</p>}
      {children}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Card; 