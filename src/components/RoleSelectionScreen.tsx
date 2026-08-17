import React, { useState } from 'react';
import { UserProfile, StootaDriver, UserRole } from '../types';
import { VEHICLE_CATEGORIES } from '../data/categories';
import { Users, Truck, ArrowRight, ShieldCheck, Phone, MapPin, ChevronLeft, Plus } from 'lucide-react';

interface RoleSelectionScreenProps {
  residentialUsers: UserProfile[];
  stootaDrivers: StootaDriver[];
  onSelectCustomer: (user: UserProfile) => void;
  onSelectDriver: (driver: StootaDriver) => void;
  onOpenRegisterCustomer: () => void;
  onOpenRegisterDriver: () => void;
}

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({
  residentialUsers,
  stootaDrivers,
  onSelectCustomer,
  onSelectDriver,
  onOpenRegisterCustomer,
  onOpenRegisterDriver,
}) => {
  const [selectedRole, setSelectedRole] = useState<'customer' | 'driver' | null>(null);

  return (
    <div className="min-h-[580px] flex flex-col justify-between p-4 sm:p-6 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Brand Header */}
      <div className="text-center space-y-2 py-4">
        <div className="w-16 h-16 rounded-3xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-3xl shadow-xl shadow-amber-500/20 mx-auto">
          🛺
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          تطبيق ستوتة العراق
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
          المنصة الأولى لربط البائعين المتجولين وأصحاب الستوتات بطالبي الخدمات بالخريطة الحية
        </p>
      </div>

      {/* Main Selection Step */}
      {!selectedRole ? (
        <div className="space-y-4 my-auto py-4">
          <p className="text-xs font-black text-center text-slate-700 dark:text-slate-300">
            حدد نوع حسابك لبدء استخدام التطبيق:
          </p>

          <div className="grid grid-cols-1 gap-3">
            
            {/* Customer Option Card */}
            <button
              onClick={() => setSelectedRole('customer')}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 text-right transition-all shadow-sm hover:shadow-md group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shrink-0">
                  🏠
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      أنا زبون / طالب خدمة
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold">
                      أهالي الحي
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    طلب قناني الغاز، ماء RO، مخضر، صمون، أو سمك لباب البيت مباشرة
                  </p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-amber-500 group-hover:-translate-x-1 transition-all shrink-0" />
            </button>

            {/* Driver Option Card */}
            <button
              onClick={() => setSelectedRole('driver')}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 text-right transition-all shadow-sm hover:shadow-md group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shrink-0">
                  🛺
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      أنا صاحب ستوتة / مقدم خدمة
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold">
                      بائع متجول
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    تفعيل وضع العمل، استلام طلبات الزبائن، وإدارة قائمة الأسعار
                  </p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-amber-500 group-hover:-translate-x-1 transition-all shrink-0" />
            </button>

          </div>
        </div>
      ) : selectedRole === 'customer' ? (
        /* Customer Selection Step */
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedRole(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
            >
              <ArrowRight className="w-4 h-4" />
              <span>رجوع لاختيار الدور</span>
            </button>
            <span className="text-xs font-black text-sky-600 dark:text-sky-400">
              دخول كزبون (أهالي الكرادة)
            </span>
          </div>

          {/* Quick Register New Customer */}
          <button
            onClick={onOpenRegisterCustomer}
            className="w-full p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل حساب زبون جديد برقم هاتفي</span>
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[11px] font-bold text-slate-400">أو اختر أحد سكان الكرادة</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* List of 10 Resident Customer Accounts */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {residentialUsers.map((user, idx) => (
              <button
                key={user.id}
                onClick={() => onSelectCustomer(user)}
                className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 text-right transition-all flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-7 h-7 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-black text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <p className="font-black text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.location?.addressAr}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 shrink-0">دخول ⟵</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Driver Selection Step */
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedRole(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
            >
              <ArrowRight className="w-4 h-4" />
              <span>رجوع لاختيار الدور</span>
            </button>
            <span className="text-xs font-black text-amber-600 dark:text-amber-400">
              دخول كصاحب ستوتة (بائع متجول)
            </span>
          </div>

          {/* Quick Register New Driver */}
          <button
            onClick={onOpenRegisterDriver}
            className="w-full p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>تسجيل ستوتة وبائع جديد في المنطقة</span>
          </button>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-3 text-[11px] font-bold text-slate-400">أو اختر أحد أصحاب الستوتات الـ 10</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* List of 10 Stoota Drivers */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {stootaDrivers.map((driver) => {
              const catInfo = VEHICLE_CATEGORIES[driver.category] || { emoji: '🛺', nameAr: 'ستوتة' };
              return (
                <button
                  key={driver.id}
                  onClick={() => onSelectDriver(driver)}
                  className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-right transition-all flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="w-8 h-8 rounded-xl flex items-center justify-center text-base shrink-0 bg-slate-100 dark:bg-slate-800">
                      {catInfo.emoji}
                    </span>
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <p className="font-black text-slate-900 dark:text-white">{driver.driverName}</p>
                        <span className="text-[10px] text-amber-600 font-bold">({catInfo.nameAr})</span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">{driver.areaName}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 shrink-0">فتح اللوحة ⟵</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Trust & Location Footer Note */}
      <div className="pt-4 text-center">
        <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>نطاق جغرافي مباشر - بغداد حي الكرادة الشرقية</span>
        </p>
      </div>

    </div>
  );
};
