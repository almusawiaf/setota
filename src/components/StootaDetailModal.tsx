import React from 'react';
import { StootaDriver, Review } from '../types';
import { VEHICLE_CATEGORIES } from '../data/categories';
import { X, Phone, Facebook, Star, Clock, MapPin, Tag, Navigation, Calendar, MessageSquare } from 'lucide-react';

interface StootaDetailModalProps {
  driver: StootaDriver | null;
  reviews: Review[];
  onClose: () => void;
  onDirectOrder: (driver: StootaDriver) => void;
  onIndirectOrder: (driver: StootaDriver) => void;
}

export const StootaDetailModal: React.FC<StootaDetailModalProps> = ({
  driver,
  reviews,
  onClose,
  onDirectOrder,
  onIndirectOrder,
}) => {
  if (!driver) return null;

  const catInfo = VEHICLE_CATEGORIES[driver.category];
  const driverReviews = reviews.filter((r) => r.stootaId === driver.id);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-[410px] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[88vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header Banner */}
        <div className="relative p-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 left-3 p-1.5 rounded-full bg-black/25 hover:bg-black/40 text-white transition-colors"
            title="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div
              className="w-13 h-13 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md border-2 border-white/30 shrink-0"
              style={{ backgroundColor: catInfo.color }}
            >
              {driver.category === 'GAS_CYLINDER' ? '🔥' :
               driver.category === 'RO_WATER' ? '💧' :
               driver.category === 'VEGETABLES_FRUITS' ? '🍎' :
               driver.category === 'OLD_ITEMS' ? '♻️' :
               driver.category === 'WATERMELON' ? '🍉' :
               driver.category === 'LIVE_CHICKEN' ? '🐔' :
               driver.category === 'SWEETS_COTTON_CANDY' ? '🍬' : '🛺'}
            </div>

            <div className="min-w-0 flex-1 pr-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-black truncate">{driver.driverName}</h2>
                {driver.isOnline ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500 text-white flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    متصل
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-500 text-white">
                    غير متصل
                  </span>
                )}
              </div>
              <p className="text-amber-100 text-xs font-semibold mt-0.5 truncate">
                {catInfo.nameAr} • {driver.areaName}
              </p>
            </div>
          </div>
        </div>

        {/* Driver Details Body */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {/* Rating, Phone, Facebook Banner in Mobile-Friendly Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center justify-center">
              <div className="p-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mb-1">
                <Star className="w-4 h-4 fill-amber-500" />
              </div>
              <p className="text-[10px] text-slate-400 font-bold">التقييم</p>
              <p className="text-xs font-black text-slate-900 dark:text-white">
                {driver.rating} ({driver.reviewCount})
              </p>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center justify-center">
              <div className="p-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mb-1">
                <Phone className="w-4 h-4" />
              </div>
              <p className="text-[10px] text-slate-400 font-bold">اتصال</p>
              <a href={`tel:${driver.phone}`} dir="ltr" className="text-[11px] font-bold font-mono text-emerald-600 dark:text-emerald-400 truncate max-w-full">
                {driver.phone}
              </a>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center justify-center">
              <div className="p-1.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-1">
                <Facebook className="w-4 h-4" />
              </div>
              <p className="text-[10px] text-slate-400 font-bold">فيسبوك</p>
              {driver.facebookUrl ? (
                <a
                  href={driver.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-blue-600 dark:text-blue-400 font-bold truncate max-w-full hover:underline"
                >
                  صفحته
                </a>
              ) : (
                <span className="text-[10px] text-slate-400">غير مربوط</span>
              )}
            </div>
          </div>

          {/* Location & Hours */}
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 dark:text-amber-400">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>أوقات العمل: {driver.workingHours}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>منطقة التواجد: {driver.location.addressAr || driver.areaName}</span>
            </div>
          </div>

          {/* Pricing List */}
          <div>
            <h3 className="text-xs font-black text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              قائمة البضائع والأسعار المعتمدة
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              {driver.prices.map((price) => (
                <div key={price.id} className="p-2.5 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{price.itemName}</span>
                  <div className="text-left">
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                      {price.priceIqd.toLocaleString()} د.ع
                    </span>
                    <span className="text-[10px] text-slate-400 mr-1">/ {price.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div>
            <h3 className="text-xs font-black text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
              تقييمات وآراء الزبائن ({driverReviews.length})
            </h3>

            {driverReviews.length === 0 ? (
              <p className="text-[11px] text-slate-400 italic p-2.5 text-center bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                لا توجد تقييمات مسجلة بعد لهذا البائع
              </p>
            ) : (
              <div className="space-y-2">
                {driverReviews.map((rev) => (
                  <div key={rev.id} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">{rev.customerName}</span>
                      <div className="flex items-center gap-1 text-amber-500 text-[11px]">
                        {'★'.repeat(rev.rating)}
                        <span className="text-slate-400 text-[9px] mr-1">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Action Buttons */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 shrink-0">
          <button
            onClick={() => onDirectOrder(driver)}
            disabled={!driver.isOnline}
            className={`w-full py-2.5 px-4 rounded-2xl text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-1.5 ${
              driver.isOnline
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20'
                : 'bg-slate-400 cursor-not-allowed'
            }`}
          >
            <Navigation className="w-4 h-4" />
            {driver.isOnline ? 'طلب خدمة مباشرة فورية' : 'السائق غير متصل بالخدمة المباشرة'}
          </button>

          <button
            onClick={() => onIndirectOrder(driver)}
            className="w-full py-2 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            ترك طلب غير مباشر (حجز مسبق)
          </button>
        </div>

      </div>
    </div>
  );
};
