export function calculateWaterDeficit(current: number, target: number): number {
  return Math.max(0, target - current);
}
