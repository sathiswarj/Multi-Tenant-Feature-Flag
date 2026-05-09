import React from 'react';

function LoginPage({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  handleLogin,
  onGoToSignup,
  onGoToUser
}) {
  return (
    <div className="max-w-md mx-auto w-full bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">Sign In</h2>
        <p className="text-slate-500 text-xs mt-1">Access your feature flags dashboard</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">


        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@organization.com"
            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded transition cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>

      <div className="text-center mt-6 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500">
          Don't have an admin account?{' '}
          <button
            onClick={onGoToSignup}
            className="text-indigo-600 font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer"
          >
            Sign Up
          </button>
        </p>
        <p className="text-xs text-slate-500 mt-2">
          Are you an End User checking feature flag status?{' '}
          <button
            onClick={onGoToUser}
            className="text-indigo-600 font-semibold hover:underline bg-transparent border-0 p-0 cursor-pointer"
          >
            Check Features
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
