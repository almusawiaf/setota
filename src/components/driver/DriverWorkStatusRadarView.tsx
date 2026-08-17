import React from 'react';
import { StootaDriver, ServiceOrder } from '../../types';
import { VEHICLE_CATEGORIES } from '../../data/categories';
import { Power, Wifi, MapPin, Radio, Compass, Award, DollarSign, TrendingUp, Navigation, AlertCircle } from 'lucide-react';

interface DriverWorkStatusRadarViewProps {
  driverProfile: StootaDriver;
  orders: ServiceOrder[];
  onToggleOnline: (isOnline: boolean) => void;
  onGoToOrders: () => void;
}

export const DriverWorkStatusRadarView: React.FC<DriverWorkStatusRadarViewProps> = ({
  driverProfile,
  orders,
  onToggleOnline,
  onGoToOrders,
}) => {
  const catInfo = VEHICLE_CATEGORIES[driverProfile.category] || {
    emoji: '🛺',
    nameAr: 'ستوتة',
    color: '#d97706',
    unit: 'قطعة',
  };

  const pendingOrders = orders.filter(
    (o) => o.stootaId === driverProfile.id && o.status === 'pending'
  );
  const activeOrders = orders.filter(
    (o) => o.stootaId === driverProfile.id && o.status === 'approved'
  );
  const completedOrders = orders.filter(
    (o) => o.stootaId === driverProfile.id && o.status === 'completed'
  );

  const totalEarningsToday = completedOrders.reduce((sum, ord) => sum + ord.totalPriceIqd, 0);

  return (
    <div className="space-y-4 font-sans text-slate-900 dark:text-slate-100 animate-in fade-in duration-200">
      
      {/* 1. Radar & Live Broadcast Visual Graphics Canvas */}
      <div className={`relative rounded-3xl p-5 overflow-hidden transition-all duration-500 border ${
        driverProfile.isOnline
          ? 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-emerald-500/40 shadow-xl ring-1 ring-emerald-500/20'
          : 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 shadow-md'
      }`}>
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

        {/* Top Header inside Radar Card */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${
              driverProfile.isOnline ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'
            }`} />
            <span className="text-xs font-black tracking-wide text-white flex items-center gap-1.5">
              <Radio className={`w-3.5 h-3.5 ${driverProfile.isOnline ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
              {driverProfile.isOnline ? 'رادار البث الحي المباشر (GPS فعال)' : 'رادار البث متوقف'}
            </span>
          </div>

          <div className="px-2.5 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-[10px] font-mono font-bold text-slate-300">
            نطاق 2.0 كم
          </div>
        </div>

        {/* Central Graphic Radar Canvas with Concentric Scanning Waves */}
        <div className="relative z-10 my-6 flex items-center justify-center min-h-[220px]">
          {/* Concentric Rings */}
          <div className="relative w-56 h-56 flex items-center justify-center">
            
            {/* Outer Ring 3 */}
            <div className={`absolute inset-0 rounded-full border border-dashed transition-all duration-700 ${
              driverProfile.isOnline ? 'border-emerald-500/30 scale-100' : 'border-slate-800 scale-95'
            }`} />

            {/* Middle Ring 2 */}
            <div className={`absolute w-40 h-40 rounded-full border transition-all duration-700 ${
              driverProfile.isOnline ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-800'
            }`} />

            {/* Inner Ring 1 */}
            <div className={`absolute w-24 h-24 rounded-full border transition-all duration-700 ${
              driverProfile.isOnline ? 'border-emerald-400/60 bg-emerald-500/10 animate-pulse' : 'border-slate-800'
            }`} />

            {/* Scanning Beam Animation when Online */}
            {driverProfile.isOnline && (
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none animate-spin [animation-duration:4s]">
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-emerald-400/30 via-emerald-500/10 to-transparent origin-bottom-right rounded-tl-full" />
              </div>
            )}

            {/* Nearby Simulated Customer Points on Radar */}
            {driverProfile.isOnline && (
              <>
                <div className="absolute top-6 right-10 flex items-center gap-1 bg-slate-800/90 px-1.5 py-0.5 rounded-md text-[9px] text-amber-300 border border-amber-500/30 shadow-xs animate-bounce [animation-duration:3s]">
                  <span>🏠 زبون</span>
                </div>
                <div className="absolute bottom-8 left-8 flex items-center gap-1 bg-slate-800/90 px-1.5 py-0.5 rounded-md text-[9px] text-sky-300 border border-sky-500/30 shadow-xs">
                  <span>🏪 طلب</span>
                </div>
                <div className="absolute top-16 left-12 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </>
            )}

            {/* Center Vehicle Beacon (The Driver's Stoota) */}
            <div className="relative z-20 flex flex-col items-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-2xl transition-all duration-300 ${
                driverProfile.isOnline
                  ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white ring-4 ring-emerald-400/40 scale-110 shadow-emerald-500/50'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}>
                {catInfo.emoji}
              </div>

              <div className="mt-2 text-center">
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full inline-block ${
                  driverProfile.isOnline
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {driverProfile.isOnline ? 'متاح للطلب الآن' : 'غير متصل'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Location & GPS readout */}
        <div className="relative z-10 bg-slate-800/80 backdrop-blur-md rounded-2xl p-3 border border-slate-700/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-bold truncate">{driverProfile.areaName}</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-800/60">
            GPS: ±3m دقة عالية
          </span>
        </div>

        {/* Main Interactive Power Button (Toggle Online/Offline) */}
        <div className="relative z-10 mt-3.5">
          <button
            onClick={() => onToggleOnline(!driverProfile.isOnline)}
            className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg ${
              driverProfile.isOnline
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-900/40 hover:scale-[0.99]'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 shadow-emerald-900/40 hover:scale-[1.01]'
            }`}
          >
            <Power className="w-5 h-5" />
            <span>
              {driverProfile.isOnline
                ? 'إيقاف وضع العمل (الخروج من الخريطة مؤقتاً)'
                : 'تفعيل وضع العمل والظهور لزبائن الكرادة 🟢'}
            </span>
          </button>
        </div>

      </div>

      {/* 2. Notification for Pending Orders if any */}
      {pendingOrders.length > 0 && (
        <div
          onClick={onGoToOrders}
          className="cursor-pointer bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-4 rounded-3xl shadow-lg border border-amber-400 flex items-center justify-between animate-bounce [animation-duration:2s]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-black">
              📥
            </div>
            <div>
              <h4 className="font-black text-sm">لديك {pendingOrders.length} طلب وارد جديد ينتظر قبولك!</h4>
              <p className="text-[11px] font-bold text-slate-900/80">انقر هنا لفتح صفحة الطلبات وتحديد وقت الوصول</p>
            </div>
          </div>
          <span className="text-xs font-black bg-white px-3 py-1.5 rounded-xl shadow-xs">
            عرض الطلب
          </span>
        </div>
      )}

      {/* 3. Driver Live Daily Performance KPIs */}
      <div className="grid grid-cols-3 gap-2.5">
        
        {/* KPI 1: Total Earnings Today */}
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold">أرباح اليوم</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <p className="text-sm font-black text-slate-900 dark:text-white font-mono">
            {totalEarningsToday.toLocaleString()}
          </p>
          <span className="text-[9px] text-slate-400 block font-sans">د.ع كاش</span>
        </div>

        {/* KPI 2: Completed Orders */}
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold">طلبات منفذة</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <p className="text-sm font-black text-slate-900 dark:text-white font-mono">
            {completedOrders.length}
          </p>
          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 block font-sans font-bold">
            {activeOrders.length > 0 ? `+${activeOrders.length} جارية` : '100% تسليم'}
          </span>
        </div>

        {/* KPI 3: Rating */}
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold">تقييم الزبائن</span>
            <Award className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-sm font-black text-slate-900 dark:text-white font-mono flex items-center gap-1">
            <span>⭐</span>
            <span>{driverProfile.rating}</span>
          </p>
          <span className="text-[9px] text-slate-400 block font-sans">
            ({driverProfile.reviewCount} تقييم)
          </span>
        </div>

      </div>

      {/* 4. Quick Guidelines for Stoota Driver */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 text-xs">
        <h4 className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-amber-500" />
          <span>إرشادات العمل المباشر:</span>
        </h4>
        <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px] pr-2">
          <li>• أبقِ زر وضع العمل مفعل طوال فترة تجوالك في الشارع لتظهر للزبائن القريبين.</li>
          <li>• عند استلام طلب، حدد الوقت الواقعي للوصول (ETA) بالدقائق لإشعار الزبون.</li>
          <li>• استلم المبلغ كاش عند تسليم البضاعة لباب الزبون ثم اضغط "تأكيد التسليم".</li>
        </ul>
      </div>

    </div>
  );
};
