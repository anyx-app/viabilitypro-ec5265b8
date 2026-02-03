import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Users, Target, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Welcome back, Founder
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-8 leading-relaxed">
          Ready to validate your next big idea? Use our AI-powered tools to analyze market fit, competitors, and viability scores in seconds.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Action Card */}
          <Link
            to="/analyze"
            className="col-span-1 md:col-span-2 relative overflow-hidden group rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl shadow-blue-900/20 p-8 flex flex-col justify-between min-h-[240px] hover:scale-[1.01] transition-transform duration-300"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-4 border border-white/20">
                <Sparkles size={12} /> New Analysis
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Start a New Validation</h2>
              <p className="text-blue-100 max-w-md">
                Input your startup concept and let our engines crunch the numbers on market size, trends, and competition.
              </p>
            </div>
            <div className="relative z-10 mt-6 flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
              Launch Analysis <ArrowRight size={20} />
            </div>

            {/* Abstract Shapes Decoration */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-blue-500/30 rounded-full blur-2xl" />
          </Link>

          {/* Quick Stats / Info Card */}
          <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm flex flex-col justify-center">
            <h3 className="text-slate-500 font-medium mb-1 uppercase text-sm tracking-wider">Analysis Credits</h3>
            <div className="text-4xl font-bold text-slate-900 mb-4">Free Plan</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <TrendingUp size={16} />
                </div>
                <span className="text-sm">Market Trends Access</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Users size={16} />
                </div>
                <span className="text-sm">Demographic Data</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Target size={16} />
                </div>
                <span className="text-sm">Competitor SWOT</span>
              </div>
            </div>
            <button className="mt-6 w-full py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>

      {/* Recent Analyses Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Recent Projects</h2>
          <Link to="/reports" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
            View all projects
          </Link>
        </div>

        {/* Empty State (Skeleton for now) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <BarChart3 size={20} />
                </div>
                <span className="px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">Draft</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Untitled Project {i}</h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                Market analysis for a SaaS platform targeting freelance designers...
              </p>
              <div className="flex items-center text-xs text-slate-400">
                <span>Edited 2 days ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
