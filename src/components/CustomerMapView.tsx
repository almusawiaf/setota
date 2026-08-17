import React, { useState } from 'react';
import { StootaDriver, VehicleCategory, UserProfile, Location } from '../types';
import { VEHICLE_CATEGORIES } from '../data/categories';
import { InteractiveMap } from './InteractiveMap';
import { LocationPickerModal } from './LocationPickerModal';
import { Search, SlidersHorizontal, MapPin, Edit2, Navigation } from 'lucide-react';

interface CustomerMapViewProps {
  drivers: StootaDriver[];
  currentUser: UserProfile;
  onOpenDetailModal: (driver: StootaDriver) => void;
  onDirectOrder: (driver: StootaDriver) => void;
  onRequestGpsLocation?: () => void;
  onUpdateLocation?: (newLocation: Location) => void;
  hasRealGps?: boolean;
}

export const CustomerMapView: React.FC<CustomerMapViewProps> = ({
  drivers,
  currentUser,
  onOpenDetailModal,
  onDirectOrder,
  onRequestGpsLocation,
  onUpdateLocation,
  hasRealGps,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [radiusKm, setRadiusKm] = useState(2.0);
  const [selectedDriverOnMap, setSelectedDriverOnMap] = useState<StootaDriver | null>(null);
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);

  // Filter Drivers by Category & Search
  const filteredDrivers = drivers.filter((driver) => {
    const matchesCategory = selectedCategory === 'ALL' || driver.category === selectedCategory;
    const matchesSearch =
      driver.driverName.includes(searchQuery) ||
      driver.areaName.includes(searchQuery) ||
      VEHICLE_CATEGORIES[driver.category]?.nameAr.includes(searchQuery) ||
      driver.prices.some((p) => p.itemName.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  const activeCustomerLocation: Location = currentUser.location || {
    lat: 33.3050,
    lng: 44.4250,
    addressAr: 'حي الكرادة - بغداد',
  };

  const handleSaveNewLocation = (newLoc: Location) => {
    if (onUpdateLocation) {
      onUpdateLocation(newLoc);
    }
  };

  return (
    <div className="space-y-3 font-sans">
      
      {/* Top Customer Location Bar with Direct Click-to-Change */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-2">
        <button
          onClick={() => setIsLocationPickerOpen(true)}
          className="flex items-center gap-2.5 overflow-hidden text-right hover:opacity-80 transition-opacity flex-1 min-w-0"
          title="اضغط لتغيير موقعك أو اختيار منطقتك في العراق"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-sm shrink-0">
            📍
          </div>
          <div className="truncate">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                موقع التوصيل: {currentUser.name}
              </span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-1.5 py-0.2 rounded-md font-bold flex items-center gap-0.5 shrink-0">
                <Edit2 className="w-2.5 h-2.5" />
                تغيير
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
              <span className="truncate">{activeCustomerLocation.addressAr || 'حي الكرادة - بغداد'}</span>
            </p>
          </div>
        </button>

        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800/40 text-[11px] font-bold text-slate-700 dark:text-slate-300 shrink-0">
          <SlidersHorizontal className="w-3 h-3 text-amber-600" />
          <span>محيط {radiusKm} كم</span>
        </div>
      </div>

      {/* Filter and Icon-Only Shapes Bar */}
      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
        
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="بحث سريع عن سلعة أو سائق..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-9 pl-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Rectangle Icon Grid - All icons visible at once within phone frame without scrolling */}
        <div className="p-1.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
          <div className="grid grid-cols-5 gap-1.5">
            {/* 1. ALL Categories Shape */}
            <button
              onClick={() => setSelectedCategory('ALL')}
              title="عرض كافة الستوتات (الكل)"
              className={`h-10 rounded-xl flex flex-col items-center justify-center text-base transition-all border ${
                selectedCategory === 'ALL'
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-black ring-2 ring-amber-500/30'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>🌐</span>
              <span className="text-[8px] font-black leading-none mt-0.5">الكل</span>
            </button>

            {/* Individual Category Icon Shapes */}
            {(Object.keys(VEHICLE_CATEGORIES) as VehicleCategory[]).map((catKey) => {
              const cat = VEHICLE_CATEGORIES[catKey];
              const isSelected = selectedCategory === catKey;
              const count = drivers.filter((d) => d.category === catKey).length;
              if (count === 0) return null;

              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  title={cat.nameAr}
                  className={`relative h-10 rounded-xl flex flex-col items-center justify-center text-base transition-all border ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-black ring-2 ring-amber-500/30'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span className="text-[8px] font-bold leading-none mt-0.5 truncate max-w-[90%] opacity-85">
                    {cat.nameAr.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Main Interactive Map */}
      <InteractiveMap
        drivers={filteredDrivers}
        customerLocation={activeCustomerLocation}
        radiusKm={radiusKm}
        selectedCategory={selectedCategory}
        selectedDriver={selectedDriverOnMap}
        onSelectDriver={(driver) => setSelectedDriverOnMap(driver)}
        onOpenDetailModal={onOpenDetailModal}
        onDirectOrder={onDirectOrder}
        onRequestGpsLocation={onRequestGpsLocation || (() => setIsLocationPickerOpen(true))}
        onLocationChange={handleSaveNewLocation}
        hasRealGps={hasRealGps}
      />

      {/* Location Selector Modal */}
      <LocationPickerModal
        isOpen={isLocationPickerOpen}
        onClose={() => setIsLocationPickerOpen(false)}
        currentLocation={activeCustomerLocation}
        onSaveLocation={handleSaveNewLocation}
        onRequestRealGps={onRequestGpsLocation}
      />

    </div>
  );
};
