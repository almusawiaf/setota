import React, { useState } from 'react';
import { StootaDriver, VehicleCategory, ServiceOrder, Review } from '../types';
import { VEHICLE_CATEGORIES } from '../data/categories';
import { InteractiveMap } from './InteractiveMap';
import { useGeolocation } from '../utils/useGeolocation';
import { Search, MapPin, SlidersHorizontal, Map, List, Star, Phone, Facebook, Clock, ArrowLeft, Navigation, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface CustomerViewProps {
  drivers: StootaDriver[];
  orders: ServiceOrder[];
  reviews: Review[];
  onOpenDetail: (driver: StootaDriver) => void;
  onDirectOrder: (driver: StootaDriver) => void;
  onIndirectOrder: (driver: StootaDriver) => void;
  onOpenReview: (order: ServiceOrder) => void;
  currentGpsLocation?: { lat: number; lng: number; addressAr?: string };
  onRequestGpsLocation?: () => void;
  hasRealGps?: boolean;
}

export const CustomerView: React.FC<CustomerViewProps> = ({
  drivers,
  orders,
  reviews,
  onOpenDetail,
  onDirectOrder,
  onIndirectOrder,
  onOpenReview,
  currentGpsLocation,
  onRequestGpsLocation,
  hasRealGps,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [radiusKm, setRadiusKm] = useState(2.0); // 2km as specified in document
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [customerLoc, setCustomerLoc] = useState({ lat: 33.3152, lng: 44.3661 }); // Baghdad Mansour/Karrada default

  const { userLocation, requestGpsLocation, hasRealGps: internalHasGps } = useGeolocation();

  const activeCustomerLocation = currentGpsLocation || userLocation;
  const activeGpsCallback = onRequestGpsLocation || requestGpsLocation;
  const activeHasRealGps = hasRealGps !== undefined ? hasRealGps : internalHasGps;

  // Filter Drivers by Category, Search, and Online state
  const filteredDrivers = drivers.filter((driver) => {
    const matchesCategory = selectedCategory === 'ALL' || driver.category === selectedCategory;
    const matchesSearch =
      driver.driverName.includes(searchQuery) ||
      driver.areaName.includes(searchQuery) ||
      VEHICLE_CATEGORIES[driver.category].nameAr.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const activeOnlineDrivers = filteredDrivers.filter((d) => d.isOnline);

  return (
    <div className="space-y-6">
      
      {/* Search, Filter Bar, and Distance Radius Slider */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث باسم صاحب الستوتة، نوع الخدمة (ماء، غاز، مخضر)، أو المنطقة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            />
          </div>

          {/* 2KM Radius Slider */}
          <div className="flex items-center gap-3 w-full lg:w-auto bg-amber-50 dark:bg-amber-950/30 px-3.5 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800/60">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="flex-1 lg:flex-none flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                مدى البحث المباشر: <span className="text-amber-600 dark:text-amber-400 font-black">{radiusKm} كم</span>
              </span>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.5"
                value={radiusKm}
                onChange={(e) => setRadiusKm(parseFloat(e.target.value))}
                className="w-24 accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Map vs List View Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'map'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              عرض الخريطة
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'list'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              عرض القائمة ({activeOnlineDrivers.length})
            </button>
          </div>

        </div>

        {/* Categories Chips Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCategory === 'ALL'
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs font-black'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            جميع الأنواع ({drivers.length})
          </button>

          {(Object.keys(VEHICLE_CATEGORIES) as VehicleCategory[]).map((catKey) => {
            const cat = VEHICLE_CATEGORIES[catKey];
            const isSelected = selectedCategory === catKey;
            const count = drivers.filter((d) => d.category === catKey).length;
            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs font-black'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>
                  {catKey === 'GAS_CYLINDER' ? '🔥' :
                   catKey === 'RO_WATER' ? '💧' :
                   catKey === 'VEGETABLES_FRUITS' ? '🥦' :
                   catKey === 'OLD_ITEMS' ? '📦' :
                   catKey === 'WATERMELON' ? '🍉' :
                   catKey === 'LIVE_CHICKEN' ? '🐔' :
                   catKey === 'SWEETS_COTTON_CANDY' ? '🍬' : '🛺'}
                </span>
                <span>{cat.nameAr}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  isSelected ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Content Area: Map or List */}
      {viewMode === 'map' ? (
        <div className="space-y-4">
          <InteractiveMap
            drivers={filteredDrivers}
            customerLocation={activeCustomerLocation}
            radiusKm={radiusKm}
            selectedCategory={selectedCategory}
            selectedDriver={null}
            onSelectDriver={onOpenDetail}
            onDirectOrder={onDirectOrder}
            onRequestGpsLocation={activeGpsCallback}
            hasRealGps={activeHasRealGps}
          />

          {/* Quick Active Stootas Bottom Scrollable List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                الستوتات الفاعلة حالياً بالمنطقة ({activeOnlineDrivers.length})
              </h3>
              <span className="text-xs text-slate-500 font-medium">انقر على الستوتة لطلب الخدمة</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeOnlineDrivers.slice(0, 6).map((driver) => {
                const catInfo = VEHICLE_CATEGORIES[driver.category];
                return (
                  <div
                    key={driver.id}
                    className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-md shrink-0"
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

                        <div>
                          <h4 className="text-sm font-black text-slate-900 dark:text-white">{driver.driverName}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{driver.areaName}</p>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {driver.rating}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-500">الخدمة:</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">{catInfo.nameAr}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-500">ساعات العمل:</span>
                        <span>{driver.workingHours}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onOpenDetail(driver)}
                        className="flex-1 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        الأسعار والتقييمات
                      </button>
                      <button
                        onClick={() => onDirectOrder(driver)}
                        className="flex-1 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        طلب مباشر
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Full List View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDrivers.map((driver) => {
            const catInfo = VEHICLE_CATEGORIES[driver.category];
            return (
              <div
                key={driver.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0"
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

                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white">{driver.driverName}</h4>
                      <p className="text-xs text-amber-600 dark:text-amber-400 font-bold mt-0.5">{catInfo.nameAr}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{driver.areaName}</p>
                    </div>
                  </div>

                  {driver.isOnline ? (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shrink-0">
                      متصل الآن
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                      غير متصل
                    </span>
                  )}
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">الهاتف:</span>
                    <span dir="ltr" className="font-mono font-bold">{driver.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">ساعات العمل:</span>
                    <span>{driver.workingHours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">التقييم:</span>
                    <span className="font-bold text-amber-600">★ {driver.rating} ({driver.reviewCount} تقييم)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onOpenDetail(driver)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    عرض التفاصيل والأسعار
                  </button>

                  <button
                    onClick={() => (driver.isOnline ? onDirectOrder(driver) : onIndirectOrder(driver))}
                    className={`flex-1 py-2.5 rounded-xl text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-1.5 ${
                      driver.isOnline ? 'bg-amber-600 hover:bg-amber-700' : 'bg-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    {driver.isOnline ? 'طلب مباشر' : 'طلب غير مباشر'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Customer Active Orders & Status Tracker */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-600" />
          متابعة الطلبات المباشرة وغير المباشرة ({orders.length})
        </h3>

        {orders.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">لا توجد طلبات سابقة مسجلة حالياً</p>
        ) : (
          <div className="space-y-3">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{ord.stootaDriverName}</span>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                      ({VEHICLE_CATEGORIES[ord.category].nameAr})
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                      {ord.isDirect ? 'مباشر' : 'غير مباشر'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                    الخدمات: {ord.items.map((i) => `${i.itemName} (عدد ${i.quantity})`).join('، ')}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    الموقع: {ord.customerLocation.addressAr} • إجمالي المبلغ: {ord.totalPriceIqd.toLocaleString()} د.ع
                  </p>

                  {/* Driver Feedback Message if approved or rejected */}
                  {ord.driverNote && (
                    <div className="mt-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-800 dark:text-amber-300">
                      رسالة صاحب الستوتة: "{ord.driverNote}"
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="flex flex-col items-end gap-2 shrink-0 w-full sm:w-auto">
                  {ord.status === 'pending' && (
                    <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      بانتظار موافقة السائق
                    </span>
                  )}

                  {ord.status === 'approved' && (
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1 mb-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        تمت الموافقة (قادم إليك خلال {ord.etaMinutes || 10} دقائق)
                      </span>
                      <button
                        onClick={() => onOpenReview(ord)}
                        className="text-xs font-bold text-amber-600 dark:text-amber-400 underline hover:text-amber-700"
                      >
                        تقييم الخدمة والأمانة
                      </button>
                    </div>
                  )}

                  {ord.status === 'rejected' && (
                    <span className="px-3 py-1 rounded-xl text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      اعتذار السائق (غير متوفر حالياً)
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
