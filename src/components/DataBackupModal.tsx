'use client';

import React, { useRef } from 'react';
import { UserProfile, FoodItem } from '@/types/nutrition';
import { Download, Upload, Trash2, X, Database, ShieldCheck } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    profile: UserProfile;
    foodItems: FoodItem[];
    waterMl: number;
    onRestoreData: (backup: { profile: UserProfile; foodItems: FoodItem[]; waterMl: number }) => void;
    onClearAllData: () => void;
}

export const DataBackupModal: React.FC<Props> = ({
    isOpen,
    onClose,
    profile,
    foodItems,
    waterMl,
    onRestoreData,
    onClearAllData,
    }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleExportJSON = () => {
        const backupData = {
        app: 'NutriByte',
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        data: {
            profile,
            foodItems,
            waterMl,
        },
        };

        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nutribyte-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
        try {
            const json = JSON.parse(event.target?.result as string);
            if (json.data && json.data.profile && json.data.foodItems) {
            onRestoreData(json.data);
            alert('Data backup successfully restored!');
            onClose();
            } else {
            alert('Invalid NutriByte backup file structure.');
            }
        } catch (err) {
            alert('Failed to parse JSON file.');
        }
        };
        reader.readAsText(file);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-slate-800">Data Management & Backup</h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition">
                <X className="w-5 h-5" />
            </button>
            </div>

            <div className="p-6 space-y-4">
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>All your biometric inputs and food logs are securely preserved in your browser's local sandbox.</span>
            </div>

            <div className="space-y-3 pt-2">
                {/* Export */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition">
                <div>
                    <p className="text-xs font-bold text-slate-800">Export Backup JSON</p>
                    <p className="text-[11px] text-slate-500">Download complete meal history & profile targets</p>
                </div>
                <button
                    onClick={handleExportJSON}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                >
                    <Download className="w-3.5 h-3.5" /> Export
                </button>
                </div>

                {/* Import */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition">
                <div>
                    <p className="text-xs font-bold text-slate-800">Restore from JSON</p>
                    <p className="text-[11px] text-slate-500">Upload a previously saved NutriByte JSON file</p>
                </div>
                <div>
                    <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImportJSON}
                    accept=".json"
                    className="hidden"
                    />
                    <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                    <Upload className="w-3.5 h-3.5" /> Restore
                    </button>
                </div>
                </div>

                {/* Reset */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-rose-100 bg-rose-50/40">
                <div>
                    <p className="text-xs font-bold text-rose-800">Clear All Records</p>
                    <p className="text-[11px] text-rose-600">Reset local food logs and restore defaults</p>
                </div>
                <button
                    onClick={() => {
                    if (confirm('Are you sure you want to reset all logged meals and water data?')) {
                        onClearAllData();
                        onClose();
                    }
                    }}
                    className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                >
                    <Trash2 className="w-3.5 h-3.5" /> Reset
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};