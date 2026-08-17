'use client';

import React from 'react';
import { MacroTargets, FoodItem } from '@/types/nutrition';
import { Flame, Beef, Wheat, Dumbbell } from 'lucide-react';

interface Props {
    targets: MacroTargets;
    items: FoodItem[];
}

export const MacroProgressAnalytics: React.FC<Props> = ({ targets, items }) => {
    const totals = items.reduce(
        (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fat: acc.fat + item.fat,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const caloriesRemaining = Math.max(0, targets.calories - totals.calories);
    const calPercent = Math.min(100, Math.round((totals.calories / targets.calories) * 100)) || 0;
    const proteinPercent = Math.min(100, Math.round((totals.protein / targets.proteinGrams) * 100)) || 0;
    const carbsPercent = Math.min(100, Math.round((totals.carbs / targets.carbsGrams) * 100)) || 0;
    const fatPercent = Math.min(100, Math.round((totals.fat / targets.fatGrams) * 100)) || 0;

    return (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
            <h2 className="text-lg font-bold text-slate-800">Macro & Calorie Balance</h2>
            <p className="text-xs text-slate-500">Real-time daily intake versus scientific targets</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-semibold text-slate-700">
                {caloriesRemaining} kcal remaining
            </span>
            </div>
        </div>

        {/* Main Calories Progress Bar */}
        <div>
            <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm font-semibold text-slate-700">Total Energy Consumed</span>
            <span className="text-xs font-bold text-slate-500">
                {totals.calories} / {targets.calories} kcal ({calPercent}%)
            </span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden">
            <div
                className={`h-full transition-all duration-500 rounded-full ${
                totals.calories > targets.calories ? 'bg-amber-600' : 'bg-emerald-500'
                }`}
                style={{ width: `${calPercent}%` }}
            />
            </div>
        </div>

        {/* Macronutrient Gauges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Protein */}
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-rose-700 font-semibold text-xs">
                <Beef className="w-4 h-4" />
                <span>Protein</span>
                </div>
                <span className="text-xs font-bold text-rose-800">{proteinPercent}%</span>
            </div>
            <div>
                <div className="text-xl font-black text-rose-900 mb-1.5">
                {totals.protein} <span className="text-xs font-normal text-rose-600">/ {targets.proteinGrams}g</span>
                </div>
                <div className="w-full h-2 bg-rose-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${proteinPercent}%` }}
                />
                </div>
            </div>
            </div>

            {/* Carbohydrates */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
                <Wheat className="w-4 h-4" />
                <span>Carbohydrates</span>
                </div>
                <span className="text-xs font-bold text-emerald-800">{carbsPercent}%</span>
            </div>
            <div>
                <div className="text-xl font-black text-emerald-900 mb-1.5">
                {totals.carbs} <span className="text-xs font-normal text-emerald-600">/ {targets.carbsGrams}g</span>
                </div>
                <div className="w-full h-2 bg-emerald-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${carbsPercent}%` }}
                />
                </div>
            </div>
            </div>

            {/* Fats */}
            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs">
                <Dumbbell className="w-4 h-4" />
                <span>Healthy Fats</span>
                </div>
                <span className="text-xs font-bold text-indigo-800">{fatPercent}%</span>
            </div>
            <div>
                <div className="text-xl font-black text-indigo-900 mb-1.5">
                {totals.fat} <span className="text-xs font-normal text-indigo-600">/ {targets.fatGrams}g</span>
                </div>
                <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${fatPercent}%` }}
                />
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};