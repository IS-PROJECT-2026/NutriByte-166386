'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { MacroCalculatorModal } from '@/components/MacroCalculatorModal';
import { UserProfile, MacroTargets } from '@/types/nutrition';
import { calculateMacroTargets } from '@/lib/nutrition-calc';
import { Flame, Droplet, Dumbbell, Wheat, Beef, HeartHandshake } from 'lucide-react';

const DEFAULT_PROFILE: UserProfile = {
    age: 24,
    gender: 'male',
    weightKg: 72,
    heightCm: 178,
    activityLevel: 'moderate',
    goal: 'lose_weight',
};

export default function Home() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isCalcOpen, setIsCalcOpen] = useState(false);
    const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
    const [targets, setTargets] = useState<MacroTargets>(calculateMacroTargets(DEFAULT_PROFILE));

    // Load profile from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('nutribyte_profile');
        if (saved) {
        try {
            const parsed = JSON.parse(saved);
            setProfile(parsed);
            setTargets(calculateMacroTargets(parsed));
        } catch (e) {
            console.error('Failed to parse saved profile', e);
        }
        }
    }, []);

    const handleSaveProfile = (newProfile: UserProfile, newTargets: MacroTargets) => {
        setProfile(newProfile);
        setTargets(newTargets);
        localStorage.setItem('nutribyte_profile', JSON.stringify(newProfile));
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar
            onOpenCalculator={() => setIsCalcOpen(true)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Welcome & Goal Banner */}
            <section className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-700/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-900/40 text-emerald-100 border border-emerald-400/20 mb-2">
                <HeartHandshake className="w-3.5 h-3.5" /> Objective: {profile.goal.replace('_', ' ').toUpperCase()}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Today's Nutrition Compass</h1>
                <p className="text-emerald-100 text-sm mt-1">
                Personalized target based on {profile.weightKg}kg bodyweight & {profile.activityLevel.replace('_', ' ')} routine.
                </p>
            </div>
            <button
                onClick={() => setIsCalcOpen(true)}
                className="px-4 py-2.5 bg-white text-emerald-900 font-semibold text-sm rounded-xl shadow hover:bg-emerald-50 transition"
            >
                Adjust Caloric Goals
            </button>
            </section>

            {/* Target Cards Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Flame className="w-6 h-6" />
                </div>
                <div>
                <p className="text-xs font-medium text-slate-500">Target Calories</p>
                <h3 className="text-2xl font-bold text-slate-900">{targets.calories} <span className="text-xs font-normal text-slate-500">kcal</span></h3>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                <Beef className="w-6 h-6" />
                </div>
                <div>
                <p className="text-xs font-medium text-slate-500">Target Protein</p>
                <h3 className="text-2xl font-bold text-slate-900">{targets.proteinGrams} <span className="text-xs font-normal text-slate-500">grams</span></h3>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Wheat className="w-6 h-6" />
                </div>
                <div>
                <p className="text-xs font-medium text-slate-500">Target Carbs</p>
                <h3 className="text-2xl font-bold text-slate-900">{targets.carbsGrams} <span className="text-xs font-normal text-slate-500">grams</span></h3>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                <p className="text-xs font-medium text-slate-500">Target Fats</p>
                <h3 className="text-2xl font-bold text-slate-900">{targets.fatGrams} <span className="text-xs font-normal text-slate-500">grams</span></h3>
                </div>
            </div>
            </section>
        </main>

        <MacroCalculatorModal
            isOpen={isCalcOpen}
            onClose={() => setIsCalcOpen(false)}
            currentProfile={profile}
            onSaveProfile={handleSaveProfile}
        />
        </div>
    );
}