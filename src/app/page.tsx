import React from 'react';
import { Activity, Apple, Flame, Droplets } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto">
        <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6">
            <div>
            <div className="flex items-center gap-2 justify-center md:justify-start text-emerald-600 font-bold text-2xl">
                <Apple className="w-8 h-8" />
                <span>NutriByte</span>
            </div>
            <p className="text-slate-500 mt-1 text-sm">Smart Calorie & Macronutrient Optimization Platform</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3 justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                <Activity className="w-3.5 h-3.5" /> v1.0 Foundation Ready
            </span>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Flame className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-sm font-medium text-slate-500">Target Daily Energy</h3>
                <p className="text-2xl font-bold text-slate-800">2,200 kcal</p>
            </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Droplets className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-sm font-medium text-slate-500">Hydration Goal</h3>
                <p className="text-2xl font-bold text-slate-800">2.5 L</p>
            </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Activity className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-sm font-medium text-slate-500">Macro Split</h3>
                <p className="text-2xl font-bold text-slate-800">40 / 30 / 30</p>
            </div>
            </div>
        </div>
        </main>
    );
}