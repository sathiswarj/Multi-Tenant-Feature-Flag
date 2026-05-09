import React from 'react';

function SuperDashboard({
  organizations,
  setShowOnboardModal,
  setSelectedOrgDetails,
  fetchOrganizations
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Super Admin Space</span>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">Tenant Organizations Management</h1>
          <p className="text-slate-500 text-xs mt-0.5">Provision and manage active organization tenants on the platform.</p>
        </div>
        <div>
          <button
            onClick={() => setShowOnboardModal(true)}
            className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded transition cursor-pointer flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Onboard Org
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">
            Active Tenants ({organizations.length})
          </h3>
          <button
            onClick={fetchOrganizations}
            className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition cursor-pointer flex items-center justify-center"
            title="Refresh List"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.213 15M20.913 9H16" />
            </svg>
          </button>
        </div>

        <div className="overflow-x-auto">
          {organizations.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium text-sm">
              No active organizations found. Click "Onboard Org" to provision your first tenant.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  <th className="pb-2.5 pr-4">Tenant ID</th>
                  <th className="pb-2.5">Organization Name</th>
                  <th className="pb-2.5">Administrators</th>
                  <th className="pb-2.5">Flags</th>
                  <th className="pb-2.5">Status</th>
                  <th className="pb-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {organizations.map((org) => (
                  <tr key={org.orgId} className="hover:bg-slate-50/60 transition-all text-sm">
                    <td className="py-3 pr-4 font-mono text-xs text-indigo-600 font-bold">{org.orgId}</td>
                    <td className="py-3 font-semibold text-slate-800">{org.name}</td>
                    <td className="py-3">
                      {org.admins && org.admins.length > 0 ? (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {org.admins.slice(0, 2).map(email => (
                            <span key={email} className="text-[10px] bg-slate-100 border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                              {email}
                            </span>
                          ))}
                          {org.admins.length > 2 && (
                            <span className="text-[10px] bg-indigo-50 border border-indigo-200 text-indigo-700 px-1.5 py-0.5 rounded font-bold">
                              +{org.admins.length - 2} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic font-medium">Pending Signup</span>
                      )}
                    </td>
                    <td className="py-3 font-semibold text-slate-700 text-xs">
                      {org.flagsCount !== undefined ? `${org.flagsCount} flags` : '0 flags'}
                    </td>
                    <td className="py-3">
                      {org.admins && org.admins.length > 0 ? (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800">
                          Pending Setup
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => setSelectedOrgDetails(org)}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-wider rounded transition cursor-pointer"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuperDashboard;
