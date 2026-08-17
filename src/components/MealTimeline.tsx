'use client';

import React from 'react';
import { FoodItem } from '@/types/nutrition';
import { Trash2, Utensils, Plus } from 'lucide-react';

interface Props {
    items: FoodItem[];
    onDeleteItem: (id: string) => void;
    onOpenLogger: () => void;
}

const CATEGORIES: Array<{ key: 'breakfast' | 'lunch' | 'dinner' | 'snack'; label: string; icon: string }> = [
    { key: 'breakfast', label: 'Breakfast', icon: '🍳' },
    { key: 'lunch', label: 'Lunch', icon: '🥗' },
    { key: 'dinner', label: 'Dinner', icon: '🍽️' },
    { key: 'snack', label: 'Snacks & Supplements', icon: '🍎' },
];

export const MealTimeline: React.FC<Props> = ({ items, onDeleteItem, onOpenLogger }) => {
    return (
        <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
            <h2 className="text-lg font-bold text-slate-800">Daily Meal Journal</h2>
            <p className="text-xs text-slate-500">Timeline of logged meals with nutritional sub-totals</p>
            </div>
            <button
            onClick={onOpenLogger}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition shadow-sm flex items-center gap-1.5"
            >
            <Plus className="w-4 h-4" />
            <span>Log Food</span>
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORIES.map(({ key, label, icon }) => {
            const categoryItems = items.filter(item => item.category === key);
            const subtotalCal = categoryItems.reduce((acc, curr) => acc + curr.calories, 0);
            const subtotalProtein = categoryItems.reduce((acc, curr) => acc + curr.protein, 0);

            return (
                <div key={key} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                    <span className="text-xl">{icon}</span>
                    <h3 className="font-bold text-slate-800 text-sm">{label}</h3>
                    </div>
                    <div className="text-right">
                    <span className="text-xs font-bold text-slate-800">{subtotalCal} kcal</span>
                    <span className="text-[11px] text-slate-400 block">{subtotalProtein}g protein</span>
                    </div>
                </div>

                {categoryItems.length === 0 ? (
                    <div className="py-6 text-center text-slate-400 text-xs flex-1 flex flex-col items-center justify-center">
                    <Utensils className="w-6 h-6 text-slate-300 mb-1 stroke-1" />
                    No items logged for this meal yet.
                    </div>
                ) : (
                    <div className="space-y-2 flex-1">
                    {categoryItems.map((item) => (
                        <div
                        key={item.id}
                        className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition"
                        >
                        <div className="min-w-0 pr-2">
                            <p className="text-xs font-semibold text-slate-800 truncate">{item.name}</p>
                            <p className="text-[11px] text-slate-500">
                            {item.servingSize} • <span className="font-mono text-emerald-600">{item.calories} kcal</span> (P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g)
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">{item.timestamp}</span>
                            <button
                            onClick={() => onDeleteItem(item.id)}
                            className="p-1 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Remove item"
                            >
                            <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>
            );
            })}
        </div>
        </div>
    );
};