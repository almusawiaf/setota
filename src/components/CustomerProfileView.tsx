import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Phone, MapPin, ShoppingBag, ShieldCheck, LogOut, Bell, Heart, Edit3, Check } from 'lucide-react';

interface CustomerProfileViewProps {
  customer: UserProfile;
  ordersCount: number;
  onUpdateProfile: (updated: UserProfile) => void;
  onSignOut: () => void;
  onGoToOrders: () => void;
}

export const CustomerProfileView: React.FC<CustomerProfileViewProps> = ({
  customer,
  ordersCount,
  onUpdateProfile,
  onSignOut,
  onGoToOrders,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(customer.name);
  const [phone, setPhone] = useState(customer.phone);
  const [address, setAddress] = useState(customer.location?.addressAr || 'حي الكرادة - بغداد');

  const handleSave = () => {
    onUpdateProfile({
      ...customer,
      name,
      phone,
      location: {
        lat: customer.location?.lat || 33.3050,
        lng: customer.location?.lng || 44.4250,
        addressAr: address,
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-4 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Customer Identity Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-black text-2xl shadow-md">
              👤
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900 dark:text-white">
                  {customer.name}
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold">
                  حساب زبون
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-mono" dir="ltr">
                {customer.phone}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 text-xs font-bold transition-colors"
            title="تعديل بيانات الحساب"
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        {/* Address and Info Section */}
        {isEditing ? (
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">الاسم:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">رقم الهاتف:</label>
              <input
                type="text"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">عنوان التوصيل:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-200"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                حفظ التعديلات
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
            <span className="text-slate-400 font-medium">عنوان السكن المعتمد لتوصيل الستوتة:</span>
            <p className="font-bold text-slate-800 dark:text-slate-200 mt-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              {customer.location?.addressAr || 'حي الكرادة - بغداد'}
            </p>
          </div>
        )}
      </div>

      {/* Orders Activity Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-amber-500" />
          <span>نشاط الطلبات</span>
        </h3>

        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">الطلبات المسجلة بالحساب</p>
            <p className="text-[11px] text-slate-500 mt-0.5">يمكنك متابعة حالة السائق والوقت المقدر للوصول</p>
          </div>
          <button
            onClick={onGoToOrders}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-xs hover:bg-amber-600 transition-all shrink-0"
          >
            عرض الطلبات ({ordersCount})
          </button>
        </div>
      </div>

      {/* Trust and Safety Badge */}
      <div className="p-4 rounded-3xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
        <span>جميع أصحاب الستوتات والبائعين في منطقتك معتمدين وموثقين بالاسم ورقم الهاتف.</span>
      </div>

      {/* Logout / Switch Role Button */}
      <div className="pt-2">
        <button
          onClick={onSignOut}
          className="w-full py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 text-xs font-black transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج / تبديل الحساب</span>
        </button>
      </div>

    </div>
  );
};
