export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extra_active';
export type NutritionGoal = 'lose_weight' | 'maintain' | 'gain_muscle';

export interface UserProfile {
    age: number;
    gender: Gender;
    weightKg: number;
    heightCm: number;
    activityLevel: ActivityLevel;
    goal: NutritionGoal;
}

export interface MacroTargets {
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
    waterMl: number;
}

export interface FoodItem {
    id: string;
    name: string;
    category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    servingSize: string;
    timestamp: string;
}