import React, { useState } from 'react';
import { Location } from '../types';
import { IRAQI_AREAS_PRESETS, IraqiAreaPreset } from '../data/iraqiLocations';
import { MapPin, Navigation, Search, Check, Crosshair, AlertCircle } from 'lucide-react';

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: Location;
  onSaveLocation: (newLocation: Location) => void;
  onRequestRealGps?: () => void;
}

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSaveLocation,
  onRequestRealGps,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('الكل');
  const [searchFilter, setSearchFilter] = useState('');
  const [customAddress, setCustomAddress] = useState(currentLocation.addressAr || '');
  const [customLat, setCustomLat] = useState(currentLocation.lat.toString());
  const [customLng, setCustomLng] = useState(currentLocation.lng.toString());
  const [activeTab, setActiveTab] = useState<'preset' | 'gps' | 'manual'>('preset');

  if (!isOpen) return null;

  const cities = ['الكل', 'بغداد', 'النجف الأشرف', 'كربلاء المقدسة', 'البصرة', 'بابل / الحلة', 'أربيل', 'الموصل', 'السليمانية', 'كركوك'];

  const filteredPresets = IRAQI_AREAS_PRESETS.filter((p) => {
    const matchCity = selectedCity === 'الكل' || p.city === selectedCity;
    const matchSearch =
      p.nameAr.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.city.toLowerCase().includes(searchFilter.toLowerCase());
    return matchCity && matchSearch;
  });

  const handleSelectPreset = (preset: IraqiAreaPreset) => {
    onSaveLocation({
      lat: preset.lat,
      lng: preset.lng,
      addressAr: `${preset.nameAr}`,
    });
    onClose();
  };

  const handleManualSave = () => {
    const lat = parseFloat(customLat);
    const lng = parseFloat(customLng);
    if (isNaN(lat) || isNaN(lng)) return;

    onSaveLocation({
      lat,
      lng,
      addressAr: customAddress.trim() || `موقع مخصص (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
    });
    onClose();
  };

  const handleUseGPS = () => {
    if (onRequestRealGps) {
      onRequestRealGps();
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onSaveLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            addressAr: `موقعي المباشر عبر GPS (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`,
          });
          onClose();
        },
        (err) => {
          alert('يرجى السماح بالوصول إلى الموقع في المتصفح أو اختيار منطقتك من القائمة.');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-4 bg-amber-500 text-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base">تحديد وتعديل موقعك الحالي</h3>
              <p className="text-xs text-amber-950/80 font-medium">اختر منطقتك الحقيقية في العراق لتظهر الستوتات القريبة منك بدقة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center font-bold text-slate-950 text-base transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Selection */}
        <div className="p-3 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex gap-2">
          <button
            onClick={() => setActiveTab('preset')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'preset'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>اختر منطقتك</span>
          </button>

          <button
            onClick={() => setActiveTab('gps')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'gps'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>تحديد تلقائي (GPS)</span>
          </button>

          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'manual'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>عنوان مخصص</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-3 text-slate-800 dark:text-slate-200 text-sm flex-1">
          
          {/* Currently Selected Location Notice */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-500 dark:text-slate-400">الموقع المسجل حالياً:</span>
                <p className="font-black text-slate-900 dark:text-white mt-0.5">{currentLocation.addressAr || 'غير محدد'}</p>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
              {currentLocation.lat.toFixed(3)}, {currentLocation.lng.toFixed(3)}
            </span>
          </div>

          {/* TAB 1: PRESET REGIONS */}
          {activeTab === 'preset' && (
            <div className="space-y-3">
              {/* Search preset */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث عن منطقتك (مثال: الكرادة، المنصور، الكاظمية، البصرة...)"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* City quick filter chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all ${
                      selectedCity === city
                        ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Preset List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                {filteredPresets.map((preset) => {
                  const isCurrent = Math.abs(preset.lat - currentLocation.lat) < 0.005 && Math.abs(preset.lng - currentLocation.lng) < 0.005;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-3 rounded-2xl border text-right transition-all flex items-start justify-between gap-2 ${
                        isCurrent
                          ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-xs ring-1 ring-amber-500'
                          : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold">
                          {preset.city}
                        </span>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1">
                          {preset.nameAr}
                        </h4>
                      </div>
                      {isCurrent && <Check className="w-4 h-4 text-amber-600 shrink-0 mt-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: GPS LOCATE */}
          {activeTab === 'gps' && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto text-2xl shadow-inner animate-pulse">
                <Navigation className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-black text-sm text-slate-900 dark:text-white">جلب إحداثيات GPS الدقيقة من جهازك</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                  سيطلب متصفحك أو هاتفك الإذن بالوصول للموقع لتحديد مكانك الفعلي بدقة متناهية.
                </p>
              </div>

              <button
                onClick={handleUseGPS}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all inline-flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>تحديث الموقع عبر GPS الآن</span>
              </button>
            </div>
          )}

          {/* TAB 3: MANUAL ENTRY */}
          {activeTab === 'manual' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  اسم أو وصف منطقتك وعنوانك:
                </label>
                <input
                  type="text"
                  placeholder="مثال: بغداد - اليرموك قرب جامع المأمون"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    خط العرض (Latitude):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={customLat}
                    onChange={(e) => setCustomLat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    خط الطول (Longitude):
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={customLng}
                    onChange={(e) => setCustomLng(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleManualSave}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all"
                >
                  حفظ وتطبيق الموقع
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500">العراق 🇮🇶</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 transition-colors"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
