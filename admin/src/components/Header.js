import React from 'react';

function Header({ user, handleLogout }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-slate-900 text-white font-bold">
            TF
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            TenantFlag
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-slate-900">{user.email}</p>
                <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">
                  {user.role === 'super_admin' ? 'Super Admin' : user.orgName}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}

export default Header;
