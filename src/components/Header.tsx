import React from 'react';
import { Truck, Code2, Sun, Moon, MapPin, Activity, Shield, Smartphone } from 'lucide-react';

interface HeaderProps {
  activeTab: 'demo' | 'flutter';
  setActiveTab: (tab: 'demo' | 'flutter') => void;
  userRole: 'customer' | 'driver';
  setUserRole: (role: 'customer' | 'driver') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onOpenApkModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  darkMode,
  setDarkMode,
  onOpenApkModal,
}) => {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 shrink-0 z-30 sticky top-0 backdrop-blur-md">
      
      {/* Brand & Technical Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500 hover:bg-amber-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-amber-500/20 transition-all">
          S
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black tracking-tight text-slate-800 dark:text-white">
              تطبيق ستوتة
            </h1>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-slate-700">
              إصدار المعماري v3.1
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
            منصة ربط البائعين المتجولين بطالبي الخدمات بالخريطة المباشرة
          </p>
        </div>
      </div>

      {/* Center Mode Switcher (Demo vs Flutter Code) */}
      <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('demo')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'demo'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          التطبيق المباشر
        </button>
        
        <button
          onClick={() => setActiveTab('flutter')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'flutter'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          كود فلاتر Clean Arch
        </button>
      </div>

      {/* Right Controls: Location Indicator, Role Switch, Theme */}
      <div className="flex items-center gap-3">
        
        {/* Active Location & Firestore Live Badge */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-800/70 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <span className="w-2 h-2 bg-emerald-500 rounded-full ml-1.5 animate-pulse"></span>
            <span>Firestore سحابي مباشر</span>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-amber-500 ml-1.5" />
            <span>بغداد، الكرادة</span>
          </div>
        </div>

        {activeTab === 'demo' && (
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setUserRole('customer')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                userRole === 'customer'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              الزبون
            </button>
            <button
              onClick={() => setUserRole('driver')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                userRole === 'driver'
                  ? 'bg-amber-500 text-white shadow-xs font-bold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              صاحب الستوتة
            </button>
          </div>
        )}

        {onOpenApkModal && (
          <button
            onClick={onOpenApkModal}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            title="إنشاء ملف APK للهاتف"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">استخراج APK</span>
          </button>
        )}

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 border border-slate-200 dark:border-slate-700 transition-colors"
          title="تغيير المظهر"
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

      </div>

    </header>
  );
};

