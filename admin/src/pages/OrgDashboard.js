import React from 'react';

function OrgDashboard({
  user,
  featureFlags,
  handleOpenCreateModal,
  handleOpenEditModal,
  handleToggleFlag,
  handleDeleteFlag
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{user?.orgName} Space</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Feature Flags Controller</h1>
          <p className="text-slate-500 text-xs mt-0.5">Configure and toggle isolated feature flags within your organization.</p>
        </div>
        <div>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded transition cursor-pointer flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Create Flag
          </button>
        </div>
      </div>

      {featureFlags.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center max-w-md mx-auto space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">No feature flags configured</h4>
            <p className="text-slate-500 text-xs">There are no feature flags configured for {user?.orgName} yet. Click the button above to add one!</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureFlags.map((flag) => (
            <div 
              key={flag.flagId} 
              className={`bg-white border rounded-xl p-5 shadow-xs transition-all flex flex-col justify-between ${
                flag.isEnabled 
                  ? 'border-indigo-500/50 shadow-xs shadow-indigo-500/2' 
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <span className="font-mono text-[10px] font-bold uppercase bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded tracking-wide">
                    {flag.key}
                  </span>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={flag.isEnabled} 
                      onChange={() => handleToggleFlag(flag.flagId, flag.isEnabled)}
                      className="sr-only peer" 
                    />
                    <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-slate-900 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-100 border border-slate-300 peer-checked:border-indigo-400"></div>
                  </label>
                </div>

                <h4 className="text-base font-bold text-slate-900 mb-1 truncate">
                  {flag.name}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 h-9 mb-4">
                  {flag.description || <span className="text-slate-400 italic">No description provided.</span>}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span>Updated: {new Date(flag.updatedAt).toLocaleDateString()}</span>
                
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(flag)}
                    className="p-1 px-2.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent hover:border-slate-200 transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFlag(flag.flagId, flag.name)}
                    className="p-1 px-2.5 rounded hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-transparent hover:border-rose-100 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrgDashboard;
