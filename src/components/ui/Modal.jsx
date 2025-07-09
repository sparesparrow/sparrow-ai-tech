import React, { useEffect, useRef } from 'react';

const Modal = ({ open, onClose, title, children, className = '' }) => {
  const modalRef = useRef(null);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    if (modalRef.current) modalRef.current.focus();
    return () => {
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative w-full max-w-3xl mx-auto bg-slate-900 text-stone-100 rounded-xl shadow-2xl p-8 overflow-y-auto max-h-[90vh] border border-slate-700 focus:outline-none ${className}`}
      >
        <button onClick={onClose} aria-label="Close modal" className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl font-bold">×</button>
        {title && <h2 id="modal-title" className="text-2xl font-bold mb-6 text-sky-300">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal; 