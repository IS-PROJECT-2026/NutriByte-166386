# NutriByte — Precision Nutrition & Macro Tracker

[![Deploy Next.js to GitHub Pages](https://github.com/IS-PROJECT-2026/nutribyte-166386/actions/workflows/deploy.yml/badge.svg)](https://github.com/IS-PROJECT-2026/nutribyte-166386/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-emerald?style=flat-square&logo=github)](https://is-project-2026.github.io/nutribyte-166386/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**NutriByte** is an intelligent, client-side nutrition and macronutrient optimization platform built with Next.js 14, TypeScript, and Tailwind CSS. It empowers users to calculate scientifically backed caloric and macronutrient targets using the **Mifflin-St Jeor equation**, log meals against a verified preset database, track daily hydration, and export/restore data backups directly in the browser.

---

## Live Deployment

- **Live URL:** [https://is-project-2026.github.io/nutribyte-166386/](https://is-project-2026.github.io/nutribyte-166386/)
- **Repository:** `IS-PROJECT-2026/nutribyte-166386`

---

## Key Features

1. **Mifflin-St Jeor Metabolic Engine:** Computes Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) with objective-based caloric adjustments (Fat Loss `-500 kcal`, Maintenance, Muscle Gain `+350 kcal`).
2. **Real-Time Macro Gauges:** Visual progress indicators tracking Protein, Carbohydrates, and Fats against daily gram targets.
3. **Preset Food Library & Quick Logger:** Searchable database of common nutrient-dense foods (oats, chicken, eggs, salmon, avocado) plus custom macro entry.
4. **Meal Timeline Journal:** Categorized breakdown into Breakfast, Lunch, Dinner, and Snacks with per-meal caloric subtotals.
5. **Interactive Hydration Chamber:** Animated water level gauge with quick-log increments (+250ml / +500ml) calibrated to bodyweight.
6. **Zero-Backend Data Sovereignty:** Client-side local storage persistence with one-click JSON backup export and restore.

---

## Technology Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Static HTML Export)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **CI/CD & Hosting:** GitHub Actions & GitHub Pages

---

## Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/IS-PROJECT-2026/nutribyte-166386.git
cd nutribyte-166386

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build and export static assets
npm run build

```
