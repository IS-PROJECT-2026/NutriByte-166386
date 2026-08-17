export function calculateWaterDeficit(current: number, target: number): number {
  return Math.max(0, target - current);
}

export function formatMacroRatio(protein: number, carbs: number, fat: number): string {
  const total = protein + carbs + fat;
  if (total === 0) return '0/0/0';
  return `${Math.round((protein/total)*100)}/${Math.round((carbs/total)*100)}/${Math.round((fat/total)*100)}`;
}
