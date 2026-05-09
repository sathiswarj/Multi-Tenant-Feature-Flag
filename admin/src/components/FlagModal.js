import React, { useState, useEffect } from 'react';

function FlagModal({ show, editingFlag, onClose, onSave, loading }) {
  const [key, setKey] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (editingFlag) {
      setKey(editingFlag.key);
      setName(editingFlag.name);
      setDesc(editingFlag.description || '');
      setEnabled(editingFlag.isEnabled || false);
    } else {
      setKey('');
      setName('');
      setDesc('');
      setEnabled(false);
    }
  }, [editingFlag, show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ key, name, description: desc, isEnabled: enabled });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          {editingFlag ? 'Edit Feature Flag' : 'Create Feature Flag'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Flag Key (Unique Code)</label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="e.g. beta-checkout-flow"
              className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition font-mono"
              disabled={!!editingFlag}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Beta Checkout Flow"
              className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What does this feature flag control?"
              className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition h-20 resize-none"
            />
          </div>

          <div className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="flagEnabled"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-800 bg-white"
            />
            <label htmlFor="flagEnabled" className="text-sm font-medium text-slate-700 select-none cursor-pointer">Enable immediately on creation</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider rounded border border-slate-200 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider rounded transition cursor-pointer"
            >
              {loading ? 'Saving...' : 'Save Flag'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FlagModal;
