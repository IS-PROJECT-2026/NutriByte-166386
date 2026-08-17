export interface PresetFood {
    name: string;
    category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    servingSize: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
}

export const PRESET_FOODS: PresetFood[] = [
    { name: 'Rolled Oats (Dry)', category: 'breakfast', servingSize: '50g', calories: 190, protein: 7, carbs: 34, fat: 3 },
    { name: 'Whole Eggs (Boiled/Fried)', category: 'breakfast', servingSize: '2 large (100g)', calories: 143, protein: 13, carbs: 1, fat: 10 },
    { name: 'Greek Yogurt (0% Fat)', category: 'breakfast', servingSize: '200g', calories: 120, protein: 20, carbs: 8, fat: 0 },
    { name: 'Grilled Chicken Breast', category: 'lunch', servingSize: '150g', calories: 247, protein: 46, carbs: 0, fat: 5 },
    { name: 'Brown Rice (Cooked)', category: 'lunch', servingSize: '150g', calories: 165, protein: 4, carbs: 35, fat: 1.5 },
    { name: 'Steamed Broccoli', category: 'lunch', servingSize: '100g', calories: 35, protein: 2.5, carbs: 7, fat: 0.4 },
    { name: 'Atlantic Salmon Fillet', category: 'dinner', servingSize: '150g', calories: 312, protein: 34, carbs: 0, fat: 19 },
    { name: 'Baked Sweet Potato', category: 'dinner', servingSize: '150g', calories: 135, protein: 3, carbs: 31, fat: 0.2 },
    { name: 'Avocado Hass', category: 'dinner', servingSize: '1/2 medium (75g)', calories: 120, protein: 1.5, carbs: 6, fat: 11 },
    { name: 'Whey Protein Isolate', category: 'snack', servingSize: '1 scoop (30g)', calories: 115, protein: 25, carbs: 1.5, fat: 0.5 },
    { name: 'Raw Almonds', category: 'snack', servingSize: '30g', calories: 174, protein: 6, carbs: 6, fat: 15 },
    { name: 'Banana (Medium)', category: 'snack', servingSize: '1 item (118g)', calories: 105, protein: 1.3, carbs: 27, fat: 0.3 },
    { name: 'Extra Virgin Olive Oil', category: 'dinner', servingSize: '1 tbsp (14ml)', calories: 119, protein: 0, carbs: 0, fat: 14 },
];