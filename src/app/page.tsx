'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { MacroCalculatorModal } from '@/components/MacroCalculatorModal';
import { FoodLoggerModal } from '@/components/FoodLoggerModal';
import { MacroProgressAnalytics } from '@/components/MacroProgressAnalytics';
import { MealTimeline } from '@/components/MealTimeline';
import { UserProfile, MacroTargets, FoodItem } from '@/types/nutrition';
import { calculateMacroTargets } from '@/lib/nutrition-calc';
import { HeartHandshake, PlusCircle, Sparkles } from 'lucide-react';

const DEFAULT_PROFILE: UserProfile = {
    age: 24,
    gender: 'male',
    weightKg: 72,
    heightCm: 178,
    activityLevel: 'moderate',
    goal: 'lose_weight',
    };

const INITIAL_FOODS: FoodItem[] = [
    {
        id: 'init-1',
        name: 'Rolled Oats with Berries',
        category: 'breakfast',
        servingSize: '1 bowl (60g oats)',
        calories: 230,
        protein: 8,
        carbs: 42,
        fat: 3,
        timestamp: '08:15 AM',
    },
    {
        id: 'init-2',
        name: 'Grilled Chicken & Brown Rice',
        category: 'lunch',
        servingSize: '150g chicken + 150g rice',
        calories: 412,
        protein: 50,
        carbs: 35,
        fat: 6.5,
        timestamp: '01:30 PM',
    },
    ];

export default function Home() {
const [activeTab, setActiveTab] = useState('dashboard');
const [isCalcOpen, setIsCalcOpen] = useState(false);
const [isLoggerOpen, setIsLoggerOpen] = useState(false);
const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
const [targets, setTargets] = useState<MacroTargets>(calculateMacroTargets(DEFAULT_PROFILE));
const [foodItems, setFoodItems] = useState<FoodItem[]>(INITIAL_FOODS);

// Load from local storage on mount
useEffect(() => {
    const savedProfile = localStorage.getItem('nutribyte_profile');
    if (savedProfile) {
    try {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setTargets(calculateMacroTargets(parsed));
    } catch (e) {
        console.error(e);
    }
    }

    const savedFoods = localStorage.getItem('nutribyte_foods');
    if (savedFoods) {
    try {
        setFoodItems(JSON.parse(savedFoods));
    } catch (e) {
        console.error(e);
    }
    }
}, []);

const handleSaveProfile = (newProfile: UserProfile, newTargets: MacroTargets) => {
    setProfile(newProfile);
    setTargets(newTargets);
    localStorage.setItem('nutribyte_profile', JSON.stringify(newProfile));
};

const handleAddFood = (food: FoodItem) => {
    const updated = [food, ...foodItems];
    setFoodItems(updated);
    localStorage.setItem('nutribyte_foods', JSON.stringify(updated));
};

const handleDeleteFood = (id: string) => {
    const updated = foodItems.filter(item => item.id !== id);
    setFoodItems(updated);
    localStorage.setItem('nutribyte_foods', JSON.stringify(updated));
};

return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar
            onOpenCalculator={() => setIsCalcOpen(true)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Welcome & Quick Action Banner */}
            <section className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-700/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-900/40 text-emerald-100 border border-emerald-400/20 mb-2">
                <HeartHandshake className="w-3.5 h-3.5" /> Target: {profile.goal.replace('_', ' ').toUpperCase()}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Today's Nutrition Compass</h1>
                <p className="text-emerald-100 text-sm mt-1">
                Scientific macro balance calibrated for {profile.weightKg}kg • {profile.gender}.
                </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
                <button
                onClick={() => setIsLoggerOpen(true)}
                className="px-4 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-white font-semibold text-sm rounded-xl shadow transition flex items-center gap-1.5"
                >
                <PlusCircle className="w-4 h-4" />
                <span>Log Meal</span>
                </button>
                <button
                onClick={() => setIsCalcOpen(true)}
                className="px-4 py-2.5 bg-white text-emerald-900 font-semibold text-sm rounded-xl shadow hover:bg-emerald-50 transition"
                >
                Adjust Goals
                </button>
            </div>
            </section>

            {/* Macro Progress Analytics */}
            <MacroProgressAnalytics targets={targets} items={foodItems} />

            {/* Meal Journal Timeline */}
            <MealTimeline
            items={foodItems}
            onDeleteItem={handleDeleteFood}
            onOpenLogger={() => setIsLoggerOpen(true)}
            />
        </main>

        <MacroCalculatorModal
            isOpen={isCalcOpen}
            onClose={() => setIsCalcOpen(false)}
            currentProfile={profile}
            onSaveProfile={handleSaveProfile}
        />

        <FoodLoggerModal
            isOpen={isLoggerOpen}
            onClose={() => setIsLoggerOpen(false)}
            onAddFood={handleAddFood}
        />
        </div>
    );
}