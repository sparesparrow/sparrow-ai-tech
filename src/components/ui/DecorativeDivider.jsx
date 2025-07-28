import React from 'react';

export default function DecorativeDivider({ text, rotation = '', align = '' }) {
  return (
    <div
      className={`no-print relative mx-auto my-16 h-64 w-full max-w-7xl overflow-hidden ${align}`}
    >
      <p
        className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-mono text-[8vw] leading-none text-stone-200 opacity-60 ${rotation}`}
        aria-hidden="true"
      >
        {text}
      </p>
    </div>
  );
}
