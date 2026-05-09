import React, { useState, useEffect } from 'react';
import './App.css';

import Toast from './components/Toast';
import FlagModal from './components/FlagModal';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import EndUserPage from './pages/EndUserPage';
import SuperDashboard from './pages/SuperDashboard';
import OrgDashboard from './pages/OrgDashboard';

import {
  fetchHealthStats,
  fetchPublicOrgs,
  fetchSuperOrgs,
  fetchOrgFeatureFlags
} from './service/ApiGetRequest';

import {
  loginUser,
  signupUser,
  createOrg,
  toggleFeatureFlag,
  saveFeatureFlag,
  deleteFeatureFlag
} from './service/ApiPostRequest';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  
  const [activeTab, setActiveTab] = useState('login'); 
  const [sidebarTab, setSidebarTab] = useState('flags'); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupOrgId, setSignupOrgId] = useState('');
  const [loginRole, setLoginRole] = useState('org_admin');
  
  const [newOrgName, setNewOrgName] = useState('');
  const [organizations, setOrganizations] = useState([]);
  
  const [featureFlags, setFeatureFlags] = useState([]);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [editingFlag, setEditingFlag] = useState(null);
  
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [selectedOrgDetails, setSelectedOrgDetails] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiStats, setApiStats] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    fetchStats();
    fetchPublicOrganizations();
    
    if (token && user) {
      if (user.role === 'super_admin') {
        setActiveTab('super_dashboard');
        setSidebarTab('tenants');
        fetchOrganizations();
      } else if (user.role === 'org_admin') {
        setActiveTab('org_dashboard');
        setSidebarTab('flags');
        fetchFeatureFlags(token);
      }
    } else {
      setActiveTab('login');
    }
  }, [token]);

  const fetchStats = () => {
    fetchHealthStats()
      .then(data => {
        if (data.stats) setApiStats(data.stats);
      })
      .catch(err => console.error('Error fetching stats:', err));
  };

  const fetchPublicOrganizations = () => {
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
  };

  const fetchOrganizations = () => {
    if (!token) return;
    fetchSuperOrgs(token)
      .then(data => {
        if (Array.isArray(data)) setOrganizations(data);
      })
      .catch(err => {
        console.error('Error fetching organizations:', err);
        handleLogout();
      });
  };

  const fetchFeatureFlags = (authToken) => {
    const activeTok = authToken || token;
    if (!activeTok) return;
    fetchOrgFeatureFlags(activeTok)
      .then(data => {
        if (Array.isArray(data)) setFeatureFlags(data);
      })
      .catch(err => {
        console.error('Error fetching feature flags:', err);
        handleLogout();
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password.', 'error');
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(email, password);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setToken(data.token);
      setUser(data);
      
      showToast(`Welcome back, ${data.email}!`, 'success');
      
      if (data.role === 'super_admin') {
        setActiveTab('super_dashboard');
      } else {
        setActiveTab('org_dashboard');
      }
      
      setEmail('');
      setPassword('');
      fetchStats();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signupEmail || !signupPassword || !signupOrgId) {
      showToast('Please fill in all signup fields.', 'error');
      return;
    }

    setLoading(true);
    try {
      const data = await signupUser(signupEmail, signupPassword, signupOrgId);

      showToast(data.message || 'Signup successful! Please log in.', 'success');
      
      setEmail(signupEmail);
      setActiveTab('login');
      setLoginRole('org_admin');
      setSignupEmail('');
      setSignupPassword('');
      fetchStats();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setActiveTab('login');
    setFeatureFlags([]);
    setOrganizations([]);
    showToast('Logged out successfully.', 'success');
  };
  const handleCreateOrg = async (e) => {
    e.preventDefault();
    if (!newOrgName.trim()) {
      showToast('Organization name cannot be empty.', 'error');
      return;
    }

    setLoading(true);
    try {
      const data = await createOrg(newOrgName.trim(), token);

      showToast(`Organization "${data.name}" created successfully!`, 'success');
      setNewOrgName('');
      fetchOrganizations();
      fetchPublicOrganizations();
      fetchStats();
      setShowOnboardModal(false);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFlag = async (flagId, currentStatus) => {
    try {
      const data = await toggleFeatureFlag(flagId, !currentStatus, token);

      setFeatureFlags(prev => prev.map(f => f.flagId === flagId ? data : f));
      showToast(`Flag "${data.name}" is now ${data.isEnabled ? 'ENABLED' : 'DISABLED'}.`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleOpenCreateModal = () => {
    setEditingFlag(null);
    setShowFlagModal(true);
  };

  const handleOpenEditModal = (flag) => {
    setEditingFlag(flag);
    setShowFlagModal(true);
  };

  const handleSaveFlag = async (formValues) => {
    setLoading(true);
    const flagId = editingFlag ? editingFlag.flagId : null;

    try {
      const data = await saveFeatureFlag(formValues, flagId, token);

      if (editingFlag) {
        setFeatureFlags(prev => prev.map(f => f.flagId === editingFlag.flagId ? data : f));
        showToast(`Feature flag "${data.name}" updated successfully!`, 'success');
      } else {
        setFeatureFlags(prev => [data, ...prev]);
        showToast(`Feature flag "${data.name}" created successfully!`, 'success');
      }

      setShowFlagModal(false);
      fetchStats();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFlag = async (flagId, flagName) => {
    if (!window.confirm(`Are you sure you want to delete the feature flag "${flagName}"?`)) {
      return;
    }

    try {
      await deleteFeatureFlag(flagId, token);

      setFeatureFlags(prev => prev.filter(f => f.flagId !== flagId));
      showToast(`Feature flag "${flagName}" deleted successfully.`, 'success');
      fetchStats();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex font-sans selection:bg-slate-900 selection:text-white">
      <Toast toast={toast} />

      {activeTab === 'login' || activeTab === 'signup' || activeTab === 'user' ? (
        <div className="flex-grow flex items-center justify-center p-6 min-h-screen bg-slate-50">
          {activeTab === 'login' && (
            <LoginPage
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              handleLogin={handleLogin}
              onGoToSignup={() => setActiveTab('signup')}
              onGoToUser={() => setActiveTab('user')}
            />
          )}
          {activeTab === 'signup' && (
            <SignupPage
              signupEmail={signupEmail}
              setSignupEmail={setSignupEmail}
              signupPassword={signupPassword}
              setSignupPassword={setSignupPassword}
              signupOrgId={signupOrgId}
              setSignupOrgId={setSignupOrgId}
              loading={loading}
              handleSignup={handleSignup}
              onGoToLogin={() => setActiveTab('login')}
            />
          )}
          {activeTab === 'user' && (
            <EndUserPage
              onBackToLogin={() => setActiveTab('login')}
            />
          )}
        </div>
      ) : (
        <div className="flex w-full min-h-screen">
          <Sidebar
            user={user}
            sidebarTab={sidebarTab}
            setSidebarTab={setSidebarTab}
            handleLogout={handleLogout}
          />

          <div className="flex-1 flex flex-col bg-slate-50 overflow-y-auto">
            <Topbar user={user} />

            <main className="p-8 flex-grow">
              {activeTab === 'super_dashboard' && sidebarTab === 'tenants' && (
                <SuperDashboard
                  organizations={organizations}
                  setShowOnboardModal={setShowOnboardModal}
                  setSelectedOrgDetails={setSelectedOrgDetails}
                  fetchOrganizations={fetchOrganizations}
                />
              )}
              {activeTab === 'super_dashboard' && sidebarTab === 'stats' && (
                <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-4 shadow-sm max-w-2xl animate-fade-in">
                  <h3 className="text-lg font-bold text-slate-900">System Infrastructure Metrics</h3>
                  <p className="text-slate-500 text-sm">Monitoring of registered database structures across tenant scopes.</p>
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Organizations</p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">{organizations.length}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Features Registered</p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">{apiStats?.flagsCount || 0}</p>
                    </div>
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tenant Admins</p>
                      <p className="text-2xl font-bold text-slate-800 mt-1">{apiStats?.usersCount || 0}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'org_dashboard' && sidebarTab === 'flags' && (
                <OrgDashboard
                  user={user}
                  featureFlags={featureFlags}
                  handleOpenCreateModal={handleOpenCreateModal}
                  handleOpenEditModal={handleOpenEditModal}
                  handleToggleFlag={handleToggleFlag}
                  handleDeleteFlag={handleDeleteFlag}
                />
              )}
              {activeTab === 'org_dashboard' && sidebarTab === 'settings' && (
                <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-4 shadow-sm max-w-xl animate-fade-in">
                  <h3 className="text-lg font-bold text-slate-900">Tenant Configuration</h3>
                  <div className="space-y-3 pt-2 text-sm">
                    <div className="flex justify-between pb-3 border-b border-slate-100">
                      <span className="font-semibold text-slate-500">Organization Name</span>
                      <span className="font-bold text-slate-800">{user?.orgName}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-slate-100">
                      <span className="font-semibold text-slate-500">Tenant Identifier</span>
                      <span className="font-mono font-bold text-indigo-600">{user?.orgId}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-slate-100">
                      <span className="font-semibold text-slate-500">Admin Email</span>
                      <span className="font-bold text-slate-800">{user?.email}</span>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      <FlagModal
        show={showFlagModal}
        editingFlag={editingFlag}
        onClose={() => setShowFlagModal(false)}
        onSave={handleSaveFlag}
        loading={loading}
      />

      {showOnboardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl relative animate-scale-up">
            <button
              onClick={() => setShowOnboardModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              Onboard Organization
            </h3>

            <form onSubmit={handleCreateOrg} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Organization Name</label>
                <input
                  type="text"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  placeholder="e.g. Wayne Enterprises"
                  className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 transition"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOnboardModal(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider rounded border border-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider rounded transition cursor-pointer"
                >
                  {loading ? 'Creating...' : 'Create Org'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedOrgDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 shadow-xl relative animate-scale-up">
            <button
              onClick={() => setSelectedOrgDetails(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Tenant Profile</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1 mb-6">
              {selectedOrgDetails.name}
            </h3>

            <div className="space-y-4">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tenant Identifier (UUID)</span>
                <p className="font-mono text-xs text-indigo-600 font-bold select-all break-all">{selectedOrgDetails.orgId}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Feature Flags</span>
                  <p className="text-base font-bold text-slate-800">{selectedOrgDetails.flagsCount || 0} registered</p>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Onboarding Date</span>
                  <p className="text-sm font-semibold text-slate-800">{new Date(selectedOrgDetails.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registered Administrators</span>
                {selectedOrgDetails.admins && selectedOrgDetails.admins.length > 0 ? (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {selectedOrgDetails.admins.map(email => (
                      <div key={email} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded px-2.5 py-1.5 shadow-2xs">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {email}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 italic py-1">No admin accounts registered yet. Ready for onboarding.</div>
                )}
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Integration Status</span>
                {selectedOrgDetails.admins && selectedOrgDetails.admins.length > 0 ? (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">
                    Active Tenant
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800">
                    Pending Admin Setup
                  </span>
                )}
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedOrgDetails(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded transition cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
