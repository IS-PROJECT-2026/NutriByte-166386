import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "NutriByte — Precision Nutrition & Macro Tracker",
    description: "Track your macronutrients, calories, and daily hydration with intuitive analytics.",
};

export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body className="antialiased text-slate-800 bg-slate-50 min-h-screen">
            {children}
        </body>
        </html>
    );
}