'use client';

import React from 'react';
import { Apple, Settings2, Sparkles, BarChart3, Droplet } from 'lucide-react';

interface NavbarProps {
    onOpenCalculator: () => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCalculator, activeTab, setActiveTab }) => {
    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-md shadow-emerald-500/20">
                <Apple className="w-5 h-5" />
            </div>
            <div>
                <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-lg tracking-tight">NutriByte</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">PRO</span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">Intelligent Nutrition Engine</p>
            </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 sm:gap-2">
            <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
            </button>

            <button
                onClick={() => setActiveTab('hydration')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                activeTab === 'hydration'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
                <Droplet className="w-4 h-4" />
                <span className="hidden sm:inline">Hydration</span>
            </button>

            <button
                onClick={onOpenCalculator}
                className="ml-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium transition shadow-sm flex items-center gap-1.5"
            >
                <Settings2 className="w-4 h-4" />
                <span>Target Setup</span>
            </button>
            </nav>
        </div>
        </header>
    );
};