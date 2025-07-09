import React from 'react';
import PropTypes from 'prop-types';

const SkeletonLoader = ({ type = 'card', count = 1, className = '' }) => {
  const skeletons = Array.from({ length: count });
  if (type === 'card') {
    return (
      <div role="status" aria-busy="true" className={`flex gap-4 ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="w-72 h-32 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }
  if (type === 'image') {
    return (
      <div role="status" aria-busy="true" className={className}>
        <div className="w-full h-64 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
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