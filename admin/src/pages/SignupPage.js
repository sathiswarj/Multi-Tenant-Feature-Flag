import React, { useState, useEffect } from 'react';
import { fetchPublicOrgs } from '../service/ApiGetRequest';

function SignupPage({
  signupEmail,
  setSignupEmail,
  signupPassword,
  setSignupPassword,
  signupOrgId,
  setSignupOrgId,
  loading,
  handleSignup,
  onGoToLogin
}) {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetchPublicOrgs()
      .then(data => {
        if (Array.isArray(data)) {
          setOrganizations(data);
          if (data.length > 0 && !signupOrgId) {
            setSignupOrgId(data[0].orgId);
          }
        }
      })
      .catch(err => console.error('Error fetching public organizations:', err));
  }, []);
  return (
    <div className="max-w-md mx-auto w-full bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">Create Admin Account</h2>
        <p className="text-slate-500 text-xs mt-1">Register as an organization administrator</p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select Organization</label>
          {organizations.length === 0 ? (
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-amber-800 text-xs font-semibold">
              No organizations found. Please log in as Super Admin first to onboard an organization.
            </div>
          ) : (
            <select
              value={signupOrgId}
              onChange={(e) => setSignupOrgId(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-900 focus:outline-none focus:border-slate-800 transition cursor-pointer"
              required
            >
              <option value="" disabled>-- Select your organization --</option>
              {organizations.map(org => (
                <option key={org.orgId} value={org.orgId}>{org.name}</option>
              ))}
            </select>
          )}
          <p className="text-[10px] text-slate-400 italic mt-1">
            Organizations are pre-provisioned by the Super Admin.
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            placeholder="your.email@tenant.com"
            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
          <input
            type="password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || organizations.length === 0}
          className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded transition cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="text-center mt-6 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500">
          Already have an account?{' '}
          <button
            onClick={onGoToLogin}
            className="text-indigo-600 font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
