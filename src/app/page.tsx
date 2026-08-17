'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { MacroCalculatorModal } from '@/components/MacroCalculatorModal';
import { FoodLoggerModal } from '@/components/FoodLoggerModal';
import { MacroProgressAnalytics } from '@/components/MacroProgressAnalytics';
import { MealTimeline } from '@/components/MealTimeline';
import { HydrationTracker } from '@/components/HydrationTracker';
import { DataBackupModal } from '@/components/DataBackupModal';
import { UserProfile, MacroTargets, FoodItem } from '@/types/nutrition';
import { calculateMacroTargets } from '@/lib/nutrition-calc';
import { HeartHandshake, PlusCircle, Database, Sparkles } from 'lucide-react';

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
        name: 'Rolled Oats with Greek Yogurt & Berries',
        category: 'breakfast',
        servingSize: '1 bowl (60g oats + 100g yogurt)',
        calories: 290,
        protein: 18,
        carbs: 46,
        fat: 3.5,
        timestamp: '08:15 AM',
    },
    {
        id: 'init-2',
        name: 'Grilled Chicken Breast & Brown Rice',
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
const [isBackupOpen, setIsBackupOpen] = useState(false);

const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
const [targets, setTargets] = useState<MacroTargets>(calculateMacroTargets(DEFAULT_PROFILE));
const [foodItems, setFoodItems] = useState<FoodItem[]>(INITIAL_FOODS);
const [waterMl, setWaterMl] = useState<number>(1250);

// Load from local storage
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

    const savedWater = localStorage.getItem('nutribyte_water');
    if (savedWater) {
    setWaterMl(Number(savedWater) || 0);
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

const handleUpdateWater = (amount: number) => {
    const newTotal = Math.max(0, waterMl + amount);
    setWaterMl(newTotal);
    localStorage.setItem('nutribyte_water', newTotal.toString());
};

const handleResetWater = () => {
    setWaterMl(0);
    localStorage.setItem('nutribyte_water', '0');
};

const handleRestoreData = (backup: { profile: UserProfile; foodItems: FoodItem[]; waterMl: number }) => {
    setProfile(backup.profile);
    setTargets(calculateMacroTargets(backup.profile));
    setFoodItems(backup.foodItems);
    setWaterMl(backup.waterMl || 0);

    localStorage.setItem('nutribyte_profile', JSON.stringify(backup.profile));
    localStorage.setItem('nutribyte_foods', JSON.stringify(backup.foodItems));
    localStorage.setItem('nutribyte_water', (backup.waterMl || 0).toString());
};

const handleClearAllData = () => {
    setFoodItems([]);
    setWaterMl(0);
    localStorage.removeItem('nutribyte_foods');
    localStorage.setItem('nutribyte_water', '0');
};

return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
    <Navbar
        onOpenCalculator={() => setIsCalcOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
    />

    <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Welcome & Global Action Header */}
        <section className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-700/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-900/40 text-emerald-100 border border-emerald-400/20 mb-2">
            <HeartHandshake className="w-3.5 h-3.5" /> Target: {profile.goal.replace('_', ' ').toUpperCase()}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">NutriByte Nutrition Workspace</h1>
            <p className="text-emerald-100 text-sm mt-1">
            Personalized macro targets: {targets.calories} kcal • {targets.proteinGrams}g Protein • {targets.carbsGrams}g Carbs • {targets.fatGrams}g Fat
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
            onClick={() => setIsBackupOpen(true)}
            className="px-4 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold text-sm rounded-xl transition flex items-center gap-1.5 border border-white/20"
            >
            <Database className="w-4 h-4" />
            <span>Data & Backup</span>
            </button>
        </div>
        </section>

        {/* Tab Switcher Body */}
        {activeTab === 'dashboard' ? (
        <>
            <MacroProgressAnalytics targets={targets} items={foodItems} />
            <MealTimeline
            items={foodItems}
            onDeleteItem={handleDeleteFood}
            onOpenLogger={() => setIsLoggerOpen(true)}
            />
        </>
        ) : (
        <HydrationTracker
            waterMl={waterMl}
            targetWaterMl={targets.waterMl}
            onUpdateWater={handleUpdateWater}
            onResetWater={handleResetWater}
        />
        )}
    </main>

    <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
        NutriByte v1.0.0 • Designed for Precision Health & Fitness Analytics • Deployed on GitHub Pages
        </div>
    </footer>

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

    <DataBackupModal
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
        profile={profile}
        foodItems={foodItems}
        waterMl={waterMl}
        onRestoreData={handleRestoreData}
        onClearAllData={handleClearAllData}
    />
    </div>
);
}