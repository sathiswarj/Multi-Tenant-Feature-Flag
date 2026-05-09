import React from 'react';

function Sidebar({ user, sidebarTab, setSidebarTab, handleLogout }) {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 shrink-0">
      <div>
        <div className="h-16 px-6 border-b border-slate-800 flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-white text-slate-900 font-black flex items-center justify-center text-sm shadow">
            TF
          </div>
          <span className="font-extrabold text-white text-base tracking-tight">TenantFlag</span>
        </div>

        <nav className="p-4 space-y-1">
          {user?.role === 'super_admin' ? (
            <>
              <button
                onClick={() => setSidebarTab('tenants')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-semibold transition cursor-pointer ${
                  sidebarTab === 'tenants' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Tenants List
              </button>
              <button
                onClick={() => setSidebarTab('stats')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-semibold transition cursor-pointer ${
                  sidebarTab === 'stats' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                System Statistics
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setSidebarTab('flags')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-semibold transition cursor-pointer ${
                  sidebarTab === 'flags' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Feature Flags
              </button>
              <button
                onClick={() => setSidebarTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-semibold transition cursor-pointer ${
                  sidebarTab === 'settings' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
                Tenant Config
              </button>
            </>
          )}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 flex flex-col gap-3">
        <div className="px-2">
          <p className="text-xs text-slate-400 font-semibold truncate">{user?.email}</p>
          <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest mt-0.5">
            {user?.role === 'super_admin' ? 'Super Admin' : user?.orgName}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-2 text-xs font-semibold rounded bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border border-slate-700/60 hover:border-rose-500/10 transition cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
