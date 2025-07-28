import PropTypes from 'prop-types';

const _Card = ({ title, description, children, href, onClick, className = '', ...props }) => {
  const _isLink = !!href;
  const _baseClass = `block bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${className}`;

  if (isLink) {
    return (
      <a
        href={href}
        className={baseClass}
        tabIndex={0}
        onKeyDown={(_e) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick(_e);
          }
        }}
        {...props}
      >
        <h3 className="mb-2 text-lg font-semibold text-sky-700 dark:text-sky-300">{title}</h3>
        {description && <p className="mb-2 text-slate-600 dark:text-stone-300">{description}</p>}
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
      onKeyDown={(_e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(_e);
        }
      }}
      {...props}
    >
      <h3 className="mb-2 text-lg font-semibold text-sky-700 dark:text-sky-300">{title}</h3>
      {description && <p className="mb-2 text-slate-600 dark:text-stone-300">{description}</p>}
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
