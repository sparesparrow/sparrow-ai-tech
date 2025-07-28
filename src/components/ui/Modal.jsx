import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

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
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative mx-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 p-8 text-stone-100 shadow-2xl focus:outline-none ${className}`}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 text-2xl font-bold text-slate-400 hover:text-white"
        >
          ×
        </button>
        {title && (
          <h2 id="modal-title" className="mb-6 text-2xl font-bold text-sky-300">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
