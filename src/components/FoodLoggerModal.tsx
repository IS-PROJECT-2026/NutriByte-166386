'use client';

import React, { useState } from 'react';
import { FoodItem } from '@/types/nutrition';
import { PRESET_FOODS, PresetFood } from '@/lib/preset-foods';
import { X, Search, Plus, Sparkles } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onAddFood: (food: FoodItem) => void;
}

export const FoodLoggerModal: React.FC<Props> = ({ isOpen, onClose, onAddFood }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPreset, setSelectedPreset] = useState<PresetFood | null>(null);

    const [name, setName] = useState('');
    const [category, setCategory] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
    const [servingSize, setServingSize] = useState('1 serving');
    const [calories, setCalories] = useState<number | ''>('');
    const [protein, setProtein] = useState<number | ''>('');
    const [carbs, setCarbs] = useState<number | ''>('');
    const [fat, setFat] = useState<number | ''>('');

    if (!isOpen) return null;

    const handleSelectPreset = (preset: PresetFood) => {
        setSelectedPreset(preset);
        setName(preset.name);
        setCategory(preset.category);
        setServingSize(preset.servingSize);
        setCalories(preset.calories);
        setProtein(preset.protein);
        setCarbs(preset.carbs);
        setFat(preset.fat);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || calories === '') return;

        const newItem: FoodItem = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        category,
        servingSize: servingSize || '1 serving',
        calories: Number(calories),
        protein: Number(protein) || 0,
        carbs: Number(carbs) || 0,
        fat: Number(fat) || 0,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        onAddFood(newItem);
        onClose();
        // reset
        setName('');
        setCalories('');
        setProtein('');
        setCarbs('');
        setFat('');
        setSelectedPreset(null);
    };

    const filteredPresets = PRESET_FOODS.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
                <h2 className="text-lg font-bold text-slate-800">Log Food or Meal</h2>
                <p className="text-xs text-slate-500">Pick from verified nutritional presets or enter custom macros</p>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition">
                <X className="w-5 h-5" />
            </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
            {/* Preset Search */}
            <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Quick Presets Library
                </label>
                <div className="relative mb-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                    type="text"
                    placeholder="Search food (e.g. Chicken, Oats, Eggs, Salmon)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {filteredPresets.slice(0, 5).map((preset) => (
                    <button
                    key={preset.name}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`text-xs px-3 py-1.5 rounded-lg border whitespace-nowrap transition text-left flex-shrink-0 ${
                        selectedPreset?.name === preset.name
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                    >
                    {preset.name} ({preset.calories} kcal)
                    </button>
                ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Food / Dish Name *</label>
                    <input
                    type="text"
                    required
                    placeholder="e.g. Greek Salad with Feta"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Meal Category</label>
                    <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                    <option value="breakfast">🍳 Breakfast</option>
                    <option value="lunch">🥗 Lunch</option>
                    <option value="dinner">🍽️ Dinner</option>
                    <option value="snack">🍎 Snack</option>
                    </select>
                </div>
                </div>

                <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Serving Size</label>
                <input
                    type="text"
                    placeholder="e.g. 1 bowl, 200g, 1 cup"
                    value={servingSize}
                    onChange={(e) => setServingSize(e.target.value)}
                    className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                    <label className="block text-xs font-semibold text-amber-600 mb-1">Calories (kcal) *</label>
                    <input
                    type="number"
                    required
                    min="0"
                    placeholder="0"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-white focus:ring-2 focus:ring-amber-500 outline-none font-medium"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-rose-600 mb-1">Protein (g)</label>
                    <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-white focus:ring-2 focus:ring-rose-500 outline-none font-medium"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-emerald-600 mb-1">Carbs (g)</label>
                    <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-indigo-600 mb-1">Fat (g)</label>
                    <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={fat}
                    onChange={(e) => setFat(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-5 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                >
                    <Plus className="w-4 h-4" />
                    Add to Daily Log
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};