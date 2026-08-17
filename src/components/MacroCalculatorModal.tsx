'use client';

import React, { useState } from 'react';
import { UserProfile, MacroTargets } from '@/types/nutrition';
import { calculateMacroTargets, calculateBMR } from '@/lib/nutrition-calc';
import { X, Flame, Dumbbell, Scale, Check } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    currentProfile: UserProfile;
    onSaveProfile: (profile: UserProfile, targets: MacroTargets) => void;
}

export const MacroCalculatorModal: React.FC<Props> = ({
    isOpen,
    onClose,
    currentProfile,
    onSaveProfile,
    }) => {
    const [profile, setProfile] = useState<UserProfile>(currentProfile);

    if (!isOpen) return null;

    const bmr = calculateBMR(profile);
    const previewTargets = calculateMacroTargets(profile);

    const handleSave = () => {
        onSaveProfile(profile, previewTargets);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
                <h2 className="text-lg font-bold text-slate-800">Calorie & Macro Calculator</h2>
                <p className="text-xs text-slate-500">Mifflin-St Jeor Scientific Nutrition Formulation</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition">
                <X className="w-5 h-5" />
            </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-5">
            {/* Biometrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Gender</label>
                <select
                    value={profile.gender}
                    onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                </div>

                <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Age (yrs)</label>
                <input
                    type="number"
                    min="14"
                    max="100"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                </div>

                <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Weight (kg)</label>
                <input
                    type="number"
                    min="30"
                    max="250"
                    value={profile.weightKg}
                    onChange={(e) => setProfile({ ...profile, weightKg: Number(e.target.value) })}
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                </div>

                <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Height (cm)</label>
                <input
                    type="number"
                    min="100"
                    max="250"
                    value={profile.heightCm}
                    onChange={(e) => setProfile({ ...profile, heightCm: Number(e.target.value) })}
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                </div>
            </div>

            {/* Activity Level */}
            <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Daily Physical Activity</label>
                <select
                value={profile.activityLevel}
                onChange={(e) => setProfile({ ...profile, activityLevel: e.target.value as any })}
                className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                <option value="sedentary">Sedentary (Desk job, little/no exercise)</option>
                <option value="light">Light Activity (Exercise 1-3 days/week)</option>
                <option value="moderate">Moderate Activity (Exercise 3-5 days/week)</option>
                <option value="very_active">Very Active (Heavy training 6-7 days/week)</option>
                <option value="extra_active">Extra Active (Athlete / physical labor)</option>
                </select>
            </div>

            {/* Primary Goal */}
            <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Primary Fitness Objective</label>
                <div className="grid grid-cols-3 gap-2">
                <button
                    type="button"
                    onClick={() => setProfile({ ...profile, goal: 'lose_weight' })}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                    profile.goal === 'lose_weight'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                >
                    <Scale className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs">Fat Loss (-500 kcal)</span>
                </button>

                <button
                    type="button"
                    onClick={() => setProfile({ ...profile, goal: 'maintain' })}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                    profile.goal === 'maintain'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                >
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span className="text-xs">Maintain Weight</span>
                </button>

                <button
                    type="button"
                    onClick={() => setProfile({ ...profile, goal: 'gain_muscle' })}
                    className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                    profile.goal === 'gain_muscle'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold shadow-sm'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                >
                    <Dumbbell className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs">Muscle Build (+350 kcal)</span>
                </button>
                </div>
            </div>

            {/* Live Calculated Output Box */}
            <div className="bg-slate-900 rounded-xl p-4 text-white">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800 text-xs">
                <span className="text-slate-400">Base Metabolic Rate (BMR): <strong>{bmr} kcal</strong></span>
                <span className="text-emerald-400 font-semibold">Recommended Daily Target</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                <div>
                    <span className="text-3xl font-extrabold tracking-tight">{previewTargets.calories}</span>
                    <span className="text-slate-400 text-xs ml-1">kcal / day</span>
                </div>
                <div className="flex gap-3 text-xs">
                    <span className="px-2 py-1 bg-emerald-950/80 border border-emerald-500/30 rounded text-emerald-300 font-mono">
                    P: {previewTargets.proteinGrams}g
                    </span>
                    <span className="px-2 py-1 bg-amber-950/80 border border-amber-500/30 rounded text-amber-300 font-mono">
                    C: {previewTargets.carbsGrams}g
                    </span>
                    <span className="px-2 py-1 bg-rose-950/80 border border-rose-500/30 rounded text-rose-300 font-mono">
                    F: {previewTargets.fatGrams}g
                    </span>
                </div>
                </div>
            </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition"
            >
                Cancel
            </button>
            <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
            >
                <Check className="w-4 h-4" />
                Apply Target Profile
            </button>
            </div>
        </div>
        </div>
    );
};