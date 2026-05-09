import React from 'react';

function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 animate-fade-in ${
      toast.type === 'error' 
        ? 'bg-rose-950/90 border-rose-500/30 text-rose-200' 
        : 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200'
    }`}>
      {toast.type === 'error' ? (
        <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      <span className="font-medium text-sm">{toast.message}</span>
    </div>
  );
}

export default Toast;
