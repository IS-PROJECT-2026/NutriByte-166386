'use client';

import React from 'react';
import { Droplet, Plus, Minus, RotateCcw, Award } from 'lucide-react';

interface Props {
    waterMl: number;
    targetWaterMl: number;
    onUpdateWater: (amount: number) => void;
    onResetWater: () => void;
}

export const HydrationTracker: React.FC<Props> = ({
    waterMl,
    targetWaterMl,
    onUpdateWater,
    onResetWater,
    }) => {
    const percentage = Math.min(100, Math.round((waterMl / targetWaterMl) * 100)) || 0;
    const glasses = Math.round(waterMl / 250);
    const targetGlasses = Math.round(targetWaterMl / 250);

    return (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
            <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Droplet className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Hydration Chamber</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">Daily water balance (calibrated at 35ml per kg bodyweight)</p>
            </div>
            <div className="flex items-center gap-2">
            <button
                onClick={onResetWater}
                className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1 transition"
            >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Day
            </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Visual Water Tank */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="relative w-28 h-44 bg-slate-200/80 rounded-2xl overflow-hidden border-2 border-blue-200 shadow-inner flex flex-col justify-end">
                <div
                className="bg-gradient-to-t from-blue-600 to-sky-400 w-full transition-all duration-700 ease-out"
                style={{ height: `${percentage}%` }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-slate-900 drop-shadow-sm">
                <span className="text-2xl font-black">{percentage}%</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Hydrated</span>
                </div>
            </div>
            <p className="text-xs text-slate-500 mt-3 font-medium">
                {glasses} of {targetGlasses} standard glasses
            </p>
            </div>

            {/* Counter Stats */}
            <div className="space-y-4 md:col-span-2">
            <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
                <p className="text-xs font-semibold text-blue-700">Intake Logged</p>
                <p className="text-2xl font-black text-blue-900 mt-1">{(waterMl / 1000).toFixed(2)} <span className="text-xs font-normal text-blue-600">L</span></p>
                <p className="text-[11px] text-blue-600/80 mt-0.5">{waterMl} ml</p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-semibold text-slate-600">Target Fluid</p>
                <p className="text-2xl font-black text-slate-800 mt-1">{(targetWaterMl / 1000).toFixed(2)} <span className="text-xs font-normal text-slate-500">L</span></p>
                <p className="text-[11px] text-slate-500 mt-0.5">{targetWaterMl} ml</p>
                </div>
            </div>

            {/* Quick-Add Buttons */}
            <div>
                <p className="text-xs font-semibold text-slate-700 mb-2">Quick Log Water</p>
                <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => onUpdateWater(250)}
                    className="px-3.5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                >
                    <Plus className="w-3.5 h-3.5" /> +250 ml (Glass)
                </button>

                <button
                    onClick={() => onUpdateWater(500)}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
                >
                    <Plus className="w-3.5 h-3.5" /> +500 ml (Bottle)
                </button>

                <button
                    onClick={() => onUpdateWater(-250)}
                    disabled={waterMl <= 0}
                    className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition flex items-center gap-1 disabled:opacity-40"
                >
                    <Minus className="w-3.5 h-3.5" /> -250 ml
                </button>
                </div>
            </div>

            {percentage >= 100 && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span><strong>Hydration Goal Met!</strong> Your fluid intake supports optimal cellular metabolism.</span>
                </div>
            )}
            </div>
        </div>
        </div>
    );
};