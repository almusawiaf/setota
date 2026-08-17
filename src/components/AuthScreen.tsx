import React, { useState } from 'react';
import { UserRole, VehicleCategory, PriceItem, UserProfile } from '../types';
import { VEHICLE_CATEGORIES } from '../data/categories';
import { Truck, Users, Phone, MapPin, Clock, Facebook, Plus, Trash2, ShieldCheck, Navigation, CheckCircle } from 'lucide-react';

interface AuthScreenProps {
  initialRole?: UserRole;
  currentGpsLocation: { lat: number; lng: number; addressAr?: string };
  onSuccessAuth: (user: UserProfile) => void;
  onCancel?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  initialRole = 'driver',
  currentGpsLocation,
  onSuccessAuth,
  onCancel,
}) => {
  const [role, setRole] = useState<UserRole>(initialRole === 'guest' ? 'driver' : initialRole);

  // Common Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('0770');

  // Driver Fields
  const [category, setCategory] = useState<VehicleCategory>('RO_WATER');
  const [areaName, setAreaName] = useState('بغداد - الكرادة والعرصات');
  const [workingHours, setWorkingHours] = useState('08:00 صباحاً - 08:00 مساءً');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [prices, setPrices] = useState<PriceItem[]>([
    { id: '1', itemName: 'دبة ماء أرو كبيرة 20 لتر', priceIqd: 1000, unit: 'دبة' },
    { id: '2', itemName: 'كارتون ماء كاسات 48 قطعة', priceIqd: 2500, unit: 'كارتون' },
  ]);

  // Price addition state
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number | ''>('');
  const [newItemUnit, setNewItemUnit] = useState('دبة');

  const handleAddPrice = () => {
    if (!newItemName.trim() || !newItemPrice) return;
    setPrices((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        itemName: newItemName.trim(),
        priceIqd: Number(newItemPrice),
        unit: newItemUnit.trim() || 'قطعة',
      },
    ]);
    setNewItemName('');
    setNewItemPrice('');
  };

  const handleRemovePrice = (id: string) => {
    setPrices((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('الرجاء إدخال الاسم ورقم الهاتف.');
      return;
    }

    const userProfile: UserProfile = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      role: role,
      location: {
        lat: currentGpsLocation.lat,
        lng: currentGpsLocation.lng,
        addressAr: areaName || currentGpsLocation.addressAr,
      },
      category: role === 'driver' ? category : undefined,
      areaName: role === 'driver' ? areaName : undefined,
      workingHours: role === 'driver' ? workingHours : undefined,
      facebookUrl: role === 'driver' ? facebookUrl : undefined,
      prices: role === 'driver' ? prices : undefined,
    };

    onSuccessAuth(userProfile);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>منصة ستوتة العراق - تسجيل حساب جديد</span>
        </div>
        <h2 className="text-2xl font-black">انضم إلى شبكة البائعين أو طالبي الخدمة</h2>
        <p className="text-xs text-slate-300">اختر دورك لتوجيهك فوراً للواجهة المخصصة لنشاطك</p>

        {/* Role Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setRole('driver')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
              role === 'driver'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg font-black'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>صاحب ستوتة / بائع متجول (صاحب عمل)</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
              role === 'customer'
                ? 'bg-sky-500 text-white border-sky-400 shadow-lg font-black'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>طالب خدمة (زبون)</span>
          </button>
        </div>
      </div>

      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        
        {/* Personal Basic Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
            1. المعلومات الشخصية ورقم التواصل
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                الاسم الكامل <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder={role === 'driver' ? 'مثال: عباس محمد العراقي' : 'مثال: علي الحسين'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                رقم الهاتف (الواتساب والاتصال) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  dir="ltr"
                  placeholder="0770XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Vendor/Driver Specific Registration Data */}
        {role === 'driver' && (
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              2. بيانات الستوتة والخدمات المقدمة
            </h3>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                نوع البضاعة والخدمة <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(VEHICLE_CATEGORIES) as VehicleCategory[]).map((catKey) => {
                  const cat = VEHICLE_CATEGORIES[catKey];
                  const isSelected = category === catKey;
                  return (
                    <button
                      key={catKey}
                      type="button"
                      onClick={() => setCategory(catKey)}
                      className={`p-2.5 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                      }`}
                    >
                      <span className="text-base">
                        {catKey === 'GAS_CYLINDER' ? '🔥' :
                         catKey === 'RO_WATER' ? '💧' :
                         catKey === 'VEGETABLES_FRUITS' ? '🥦' :
                         catKey === 'OLD_ITEMS' ? '📦' :
                         catKey === 'WATERMELON' ? '🍉' :
                         catKey === 'LIVE_CHICKEN' ? '🐔' :
                         catKey === 'SWEETS_COTTON_CANDY' ? '🍬' : '🛺'}
                      </span>
                      <span className="truncate">{cat.nameAr}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Working Area & Working Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  منطقة وصوب العمل الرئيسية
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="مثال: بغداد - الكرادة والعرصات"
                    value={areaName}
                    onChange={(e) => setAreaName(e.target.value)}
                    className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  <MapPin className="w-4 h-4 text-amber-500 absolute right-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ساعات العمل اليومية
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="مثال: 08:00 ص - 08:00 م"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value)}
                    className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  <Clock className="w-4 h-4 text-amber-500 absolute right-3 top-3" />
                </div>
              </div>
            </div>

            {/* Facebook URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                صفحة الفيس بوك أو التواصل (اختياري)
              </label>
              <div className="relative">
                <input
                  type="url"
                  dir="ltr"
                  placeholder="https://facebook.com/yourpage"
                  value={facebookUrl}
                  onChange={(e) => setFacebookUrl(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <Facebook className="w-4 h-4 text-blue-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Price list Items */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                قائمة المنتجات والأسعار (دينار عراقي)
              </label>

              {/* Price Table */}
              <div className="space-y-2">
                {prices.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{p.itemName}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">
                        {p.priceIqd.toLocaleString()} د.ع / {p.unit}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemovePrice(p.id)}
                        className="text-slate-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add item control */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-2">
                <input
                  type="text"
                  placeholder="اسم السلعة (مثلاً: قنينة غاز مليانة)"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="sm:col-span-5 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                />
                <input
                  type="number"
                  placeholder="السعر (د.ع)"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value ? Number(e.target.value) : '')}
                  className="sm:col-span-4 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddPrice}
                  className="sm:col-span-3 py-2 px-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 hover:bg-amber-600 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  إضافة سعر
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Customer Location Preview */}
        {role === 'customer' && (
          <div className="p-4 bg-sky-50 dark:bg-sky-950/30 rounded-2xl border border-sky-200 dark:border-sky-800/50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-800 dark:text-sky-300">
              <Navigation className="w-4 h-4 text-sky-600" />
              <span>موقعك الجغرافي المباشر لطلب الخدمة</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              سيتم توجيه الستوتات القريبة فوراً بناءً على إحداثيات الـ GPS المباشرة الخاصة بك:
            </p>
            <div className="text-[11px] font-mono text-sky-700 dark:text-sky-400 bg-white dark:bg-slate-900 p-2 rounded-xl border border-sky-200 dark:border-sky-900">
              {currentGpsLocation.addressAr} ({currentGpsLocation.lat.toFixed(4)}, {currentGpsLocation.lng.toFixed(4)})
            </div>
          </div>
        )}

        {/* Submit Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold"
            >
              إلغاء
            </button>
          )}

          <button
            type="submit"
            className="flex-1 py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{role === 'driver' ? 'إنشاء حساب صاحب ستوتة وبدء استقبال الطلبات' : 'إنشاء حساب زبون والانتقال للخريطة المباشرة'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
