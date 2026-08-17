import { UserProfile, MacroTargets } from '@/types/nutrition';

export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,       // Little or no exercise
  light: 1.375,         // Exercise 1-3 days/week
  moderate: 1.55,       // Exercise 3-5 days/week
  very_active: 1.725,   // Hard exercise 6-7 days/week
  extra_active: 1.9,    // Heavy physical job or training 2x/day
};

export const GOAL_CALORIE_ADJUSTMENTS = {
  lose_weight: -500,    // 500 kcal deficit
  maintain: 0,          // Maintenance
  gain_muscle: 350,     // Lean surplus
};

/**
 * Calculates BMR using the Mifflin-St Jeor Equation:
 * Men: BMR = 10W + 6.25H - 5A + 5
 * Women: BMR = 10W + 6.25H - 5A - 161
 */
export function calculateBMR(profile: UserProfile): number {
    const { weightKg, heightCm, age, gender } = profile;
    const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
    return Math.round(gender === 'male' ? base + 5 : base - 161);
}

/**
 * Calculates TDEE and target macronutrient breakdown
 */
export function calculateMacroTargets(profile: UserProfile): MacroTargets {
    const bmr = calculateBMR(profile);
    const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[profile.activityLevel]);
    const targetCalories = Math.max(1200, tdee + GOAL_CALORIE_ADJUSTMENTS[profile.goal]);

    // Macro splits based on fitness goal
    let proteinRatio = 0.30;
    let carbRatio = 0.40;
    let fatRatio = 0.30;

    if (profile.goal === 'lose_weight') {
        proteinRatio = 0.35; // Higher protein to preserve lean mass
        carbRatio = 0.35;
        fatRatio = 0.30;
    } else if (profile.goal === 'gain_muscle') {
        proteinRatio = 0.25;
        carbRatio = 0.50; // Carbohydrate fuel for training
        fatRatio = 0.25;
    }

    const proteinCalories = targetCalories * proteinRatio;
    const carbCalories = targetCalories * carbRatio;
    const fatCalories = targetCalories * fatRatio;

    return {
        calories: targetCalories,
        proteinGrams: Math.round(proteinCalories / 4), // 4 kcal per gram protein
        carbsGrams: Math.round(carbCalories / 4),       // 4 kcal per gram carbohydrate
        fatGrams: Math.round(fatCalories / 9),         // 9 kcal per gram fat
        waterMl: Math.round(profile.weightKg * 35),    // ~35ml per kg bodyweight
    };
}