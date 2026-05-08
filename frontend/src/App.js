import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState('Connecting...');
  const [healthStatus, setHealthStatus] = useState(null);

  useEffect(() => {
    // Fetch from backend
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(data => {
        setBackendMessage(data.message);
      })
      .catch(err => {
        console.error('Error connecting to backend:', err);
        setBackendMessage('Backend offline (Start backend server to connect)');
      });

    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setHealthStatus(data))
      .catch(err => console.error('Health check failed:', err));
  }, []);

  const demoProducts = [
    {
      id: 1,
      name: "AeroGlide Pro Sneakers",
      category: "Footwear",
      price: "$129.99",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Quantum Sound Headset",
      category: "Audio",
      price: "$189.50",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
      badge: "New Release"
    },
    {
      id: 3,
      name: "Nova Chronograph Watch",
      category: "Accessories",
      price: "$245.00",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      badge: "Trending"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Background Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[128px] pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 shadow-md shadow-indigo-500/20">
              <img src={logo} className="w-6 h-6 animate-spin-slow" alt="logo" />
            </div>
            <span className="font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-600">
              ApexStore
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#home" className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="#shop" className="hover:text-indigo-600 transition-colors">Shop</a>
            <a href="#backend" className="hover:text-indigo-600 transition-colors">Backend Connection</a>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              React 18 + Tailwind v3
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full relative z-10">
        {/* Hero Section */}
        <section id="home" className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/15 text-indigo-700 text-xs font-semibold mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            Ready for Development
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
            Next-Gen E-Commerce <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-600">
              React & Express Boilerplate
            </span>
          </h1>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            A premium fullstack workspace designed with Tailwind CSS, built-in React routing support, and a complete Express backend API structure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#shop"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-300"
            >
              Explore Products
            </a>
            <a
              href="#backend"
              className="px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-300"
            >
              Check Backend Connection
            </a>
          </div>
        </section>

        {/* Backend Status Section */}
        <section id="backend" className="mb-20">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-md shadow-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[64px] pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="flex h-3 w-3 relative">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${backendMessage.includes('offline') ? 'bg-rose-400' : 'bg-emerald-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${backendMessage.includes('offline') ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                  </span>
                  Backend API Live Connection
                </h2>
                <p className="text-slate-500 text-sm max-w-xl">
                  Real-time synchronization with your Express server. Run the backend and watch this update instantly.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 min-w-[280px] font-mono text-sm shadow-inner">
                <div className="flex justify-between mb-3 pb-3 border-b border-slate-200">
                  <span className="text-slate-400">API Status:</span>
                  <span className={backendMessage.includes('offline') ? 'text-rose-600 font-semibold' : 'text-emerald-600 font-semibold'}>
                    {backendMessage.includes('offline') ? 'Offline' : 'Connected'}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-slate-700">
                    <span className="text-indigo-600 font-medium">GET /</span> → <span className="text-slate-600">"{backendMessage}"</span>
                  </div>
                  {healthStatus && (
                    <div className="text-slate-700 mt-2">
                      <span className="text-indigo-600 font-medium">GET /api/health</span> → <span className="text-emerald-600">"OK"</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Showcase */}
        <section id="shop" className="mb-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Featured Collection</h2>
              <p className="text-slate-500 text-sm">Experience smooth hover effects and responsive premium grid card designs.</p>
            </div>
            <span className="text-indigo-600 font-semibold text-sm hover:text-indigo-500 cursor-pointer transition-colors">
              View all products →
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {demoProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white border border-slate-200/80 hover:border-indigo-200 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-indigo-600/90 text-white font-bold text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {product.badge}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{product.category}</span>
                    <h3 className="font-bold text-lg text-slate-800 mt-1 group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                    <span className="text-xl font-extrabold text-slate-900">{product.price}</span>
                    <div className="flex items-center text-amber-500 gap-1 text-sm">
                      ★ <span className="text-slate-600 font-semibold">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-12 relative z-10 text-center text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 text-slate-600">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">ApexStore</span>
            </div>
            <div className="flex gap-6 font-medium">
              <span className="hover:text-indigo-600 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-indigo-600 cursor-pointer">Terms of Service</span>
              <span className="hover:text-indigo-600 cursor-pointer">Contact</span>
            </div>
          </div>
          <p>© 2026 ApexStore Premium Fullstack Starter. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
