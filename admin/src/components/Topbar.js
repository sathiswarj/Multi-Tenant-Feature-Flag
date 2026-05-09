import React from 'react';

function Topbar({ user }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
      <span className="font-bold text-slate-800 text-sm">
        {user?.role === 'super_admin' ? 'Root Administration Panel' : `${user?.orgName} Management Board`}
      </span>
      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
        <span>Active Tenant ID: <strong className="text-slate-700 font-mono">{user?.orgId || 'root'}</strong></span>
      </div>
    </header>
  );
}

export default Topbar;
