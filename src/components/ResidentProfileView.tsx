import React from 'react';
import { UserProfile, StootaDriver, VehicleCategory } from '../types';
import { VEHICLE_CATEGORIES } from '../data/categories';
import { User, MapPin, Phone, Check, ShieldCheck, Truck, PlusCircle, ArrowLeftRight } from 'lucide-react';

interface ResidentProfileViewProps {
  currentUser: UserProfile;
  residentialUsers: UserProfile[];
  onSelectUser: (user: UserProfile) => void;
  onSwitchToDriverMode: () => void;
  onOpenRegisterNewDriver: () => void;
}

export const ResidentProfileView: React.FC<ResidentProfileViewProps> = ({
  currentUser,
  residentialUsers,
  onSelectUser,
  onSwitchToDriverMode,
  onOpenRegisterNewDriver,
}) => {
  return (
    <div className="space-y-4 font-sans">
      
      {/* Current Active Resident Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-md">
            👤
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {currentUser.name}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                حساب زبون نشط
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1 font-mono">
              <Phone className="w-3 h-3 text-amber-500" />
              <span dir="ltr">{currentUser.phone}</span>
            </p>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
          <span className="text-slate-400 font-medium">العنوان السكني المعتمد للتوصيل:</span>
          <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            {currentUser.location?.addressAr || 'حي الكرادة - بغداد'}
          </p>
        </div>

        {/* Quick Driver Mode Switch */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={onSwitchToDriverMode}
            className="flex-1 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <Truck className="w-4 h-4 text-amber-600" />
            <span>الدخول كصاحب ستوتة</span>
          </button>

          <button
            onClick={onOpenRegisterNewDriver}
            className="flex-1 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>تسجيل ستوتة جديدة</span>
          </button>
        </div>
      </div>

      {/* 10 Neighborhood Residents Switcher */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <ArrowLeftRight className="w-4 h-4 text-amber-500" />
              <span>تبديل حساب الساكن (10 حسابات جاهزة بالكرادة)</span>
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              انقر على أي شخص لتسجيل الدخول الفوري وتجربة الطلب من موقعه
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 max-h-72 overflow-y-auto pr-1">
          {residentialUsers.map((user, idx) => {
            const isSelected = currentUser.id === user.id;
            return (
              <button
                key={user.id}
                onClick={() => onSelectUser(user)}
                className={`p-3 rounded-2xl text-right transition-all flex items-center justify-between border ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-slate-900 dark:text-white font-black shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-[11px] flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 shrink-0">
                    {idx + 1}
                  </span>
                  <div className="truncate text-xs">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.location?.addressAr}</p>
                  </div>
                </div>

                {isSelected ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-black shrink-0">
                    الحالي ✓
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium shrink-0">اختيار</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
