import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import NewAnalysis from './pages/NewAnalysis';

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analyze" element={<NewAnalysis />} />
        <Route path="/reports" element={<div className="p-8 text-slate-500">Reports Placeholder</div>} />
        <Route path="/settings" element={<div className="p-8 text-slate-500">Settings Placeholder</div>} />
        <Route path="*" element={<div className="p-8 text-slate-500">404 - Not Found</div>} />
      </Route>
    </Routes>
  );
}

export default App;
