import React from 'react';

export default function DecorativeDivider({ text, rotation = '', align = '' }) {
  return (
    <div className={`relative w-full max-w-7xl mx-auto my-16 h-64 overflow-hidden no-print ${align}`}>
      <p
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[8vw] leading-none text-stone-200 opacity-60 whitespace-nowrap select-none pointer-events-none ${rotation}`}
        aria-hidden="true"
      >
        {text}
      </p>
    </div>
  );
}
