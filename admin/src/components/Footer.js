import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold text-sm text-slate-700">
          TenantFlag Control Console
        </span>
        <p>© 2026 Enterprise Feature Flag Dashboard. Secure Tenant Isolation.</p>
      </div>
    </footer>
  );
}

export default Footer;
