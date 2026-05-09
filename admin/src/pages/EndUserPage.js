import React, { useState, useEffect } from 'react';
import { checkFeatureFlagStatus, fetchPublicOrgs } from '../service/ApiGetRequest';

function EndUserPage({ onBackToLogin }) {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState('');
  const [featureKey, setFeatureKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPublicOrgs()
      .then(data => {
        if (Array.isArray(data)) {
          setOrganizations(data);
        }
      })
      .catch(err => console.error('Error fetching public organizations:', err));
  }, []);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!selectedOrgId || !featureKey.trim()) {
      setError('Please select an organization and enter a feature key.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await checkFeatureFlagStatus(selectedOrgId, featureKey.trim());
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">Feature Checker</h2>
        <p className="text-slate-500 text-xs mt-1">Verify if a feature flag is enabled for your organization</p>
      </div>

      <form onSubmit={handleCheck} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Your Organization</label>
          <select
            value={selectedOrgId}
            onChange={(e) => setSelectedOrgId(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition cursor-pointer"
            required
          >
            <option value="">Select your organization</option>
            {organizations.map(org => (
              <option key={org.orgId} value={org.orgId}>{org.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Feature Key</label>
          <input
            type="text"
            value={featureKey}
            onChange={(e) => setFeatureKey(e.target.value)}
            placeholder="e.g. beta_billing_v2"
            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded transition cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Check Status'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded text-rose-700 text-xs font-semibold">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500">Organization</span>
            <span className="text-xs font-bold text-slate-800">{result.orgName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500">Feature Key</span>
            <span className="font-mono text-xs font-bold text-indigo-600">{result.key}</span>
          </div>
          <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500">Status</span>
            <span className={`text-xs font-black uppercase px-2 py-0.5 rounded ${result.isEnabled
              ? 'bg-emerald-100 border border-emerald-300 text-emerald-800'
              : 'bg-slate-200 border border-slate-300 text-slate-700'
              }`}>
              {result.isEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      )}

      <div className="text-center mt-6 pt-4 border-t border-slate-100">
        <button
          onClick={onBackToLogin}
          className="text-xs text-indigo-600 font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer"
        >
          Back to Administrative Login
        </button>
      </div>
    </div>
  );
}

export default EndUserPage;
