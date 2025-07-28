import PropTypes from 'prop-types';

const _SkeletonLoader = ({ type = 'card', count = 1, className = '' }) => {
  const _skeletons = Array.from({ length: count });
  if (type === 'card') {
    return (
      <div role="status" aria-busy="true" className={`flex gap-4 ${className}`}>
        {skeletons.map((_, i) => (
          <div
            key={i}
            className="h-32 w-72 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700"
          />
        ))}
      </div>
    );
  }
  if (type === 'image') {
    return (
      <div role="status" aria-busy="true" className={className}>
        <div className="h-64 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    );
  }
  return null;
};

SkeletonLoader.propTypes = {
  type: PropTypes.string,
  count: PropTypes.number,
  className: PropTypes.string,
};

export default SkeletonLoader;
