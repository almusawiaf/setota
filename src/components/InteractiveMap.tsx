import React, { useEffect, useRef, useCallback } from 'react';
import { StootaDriver, VehicleCategory, Location } from '../types';
import { VEHICLE_CATEGORIES } from '../data/categories';
import { Navigation, Phone, X, Star, ShoppingBag, Eye, Crosshair } from 'lucide-react';
import { reverseGeocodeCoordinates, findClosestIraqiPreset } from '../utils/geoUtils';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
  drivers: StootaDriver[];
  customerLocation: Location;
  radiusKm: number;
  selectedCategory: VehicleCategory | 'ALL';
  selectedDriver: StootaDriver | null;
  onSelectDriver: (driver: StootaDriver | null) => void;
  onOpenDetailModal: (driver: StootaDriver) => void;
  onDirectOrder: (driver: StootaDriver) => void;
  onRequestGpsLocation?: () => void;
  onLocationChange?: (newLocation: Location) => void;
  hasRealGps?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  drivers,
  customerLocation,
  radiusKm,
  selectedCategory,
  selectedDriver,
  onSelectDriver,
  onOpenDetailModal,
  onDirectOrder,
  onRequestGpsLocation,
  onLocationChange,
  hasRealGps,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const circleRef = useRef<L.Circle | null>(null);

  // Handle location update from map click or marker drag
  const handleMapCoordSelected = useCallback(async (lat: number, lng: number) => {
    if (!onLocationChange) return;

    let addressAr = findClosestIraqiPreset(lat, lng);
    try {
      const resolved = await reverseGeocodeCoordinates(lat, lng);
      if (resolved) addressAr = resolved;
    } catch (e) {
      // ignore
    }

    onLocationChange({
      lat: Number(lat.toFixed(5)),
      lng: Number(lng.toFixed(5)),
      addressAr,
    });
  }, [onLocationChange]);

  // Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [customerLocation.lat, customerLocation.lng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
      });

      // Ultra-clean CartoDB / OSM tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Add Zoom Control at top-left
      L.control.zoom({ position: 'topleft' }).addTo(map);

      // Map click handler to set user location anywhere in Iraq or the world
      map.on('click', (e: L.LeafletMouseEvent) => {
        handleMapCoordSelected(e.latlng.lat, e.latlng.lng);
      });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [handleMapCoordSelected]);

  // Update Customer Location Marker & Circle
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Customer Location Pin (Blue Pulse with Drag capability)
    const customerIcon = L.divIcon({
      className: 'customer-gps-pin',
      html: `
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: grab;">
          <div style="
            width: 34px;
            height: 34px;
            background: linear-gradient(135deg, #0284c7, #0369a1);
            border: 3px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 4px 14px rgba(2,132,199,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 16px;
          ">
            📍
          </div>
          <div style="
            margin-top: 2px;
            background: #0f172a;
            color: #ffffff;
            font-size: 10px;
            font-weight: 800;
            padding: 2px 6px;
            border-radius: 6px;
            white-space: nowrap;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          ">
            موقعك
          </div>
        </div>
      `,
      iconSize: [60, 50],
      iconAnchor: [30, 17],
    });

    const custKey = 'user_loc_pin';
    if (markersRef.current[custKey]) {
      markersRef.current[custKey].setLatLng([customerLocation.lat, customerLocation.lng]);
    } else {
      const custMarker = L.marker([customerLocation.lat, customerLocation.lng], { 
        icon: customerIcon,
        draggable: true,
      }).addTo(map);

      custMarker.on('dragend', (e) => {
        const marker = e.target;
        const position = marker.getLatLng();
        handleMapCoordSelected(position.lat, position.lng);
      });

      custMarker.bindPopup('<b>موقع طلبك الحالي</b><br>' + (customerLocation.addressAr || 'موقعك المباشر'));
      markersRef.current[custKey] = custMarker;
    }

    // Pan map to new customer location smoothly
    map.flyTo([customerLocation.lat, customerLocation.lng], 15, { animate: true, duration: 0.8 });

    // Update Radius Circle
    if (circleRef.current) {
      circleRef.current.setLatLng([customerLocation.lat, customerLocation.lng]);
      circleRef.current.setRadius(radiusKm * 1000);
    } else {
      circleRef.current = L.circle([customerLocation.lat, customerLocation.lng], {
        color: '#0284c7',
        fillColor: '#38bdf8',
        fillOpacity: 0.08,
        weight: 1.5,
        dashArray: '5, 5',
        radius: radiusKm * 1000,
      }).addTo(map);
    }
  }, [customerLocation, radiusKm, handleMapCoordSelected]);

  // Update Driver Vehicle Markers on the Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Filter drivers if category selected
    const activeDrivers = drivers.filter(
      (d) => selectedCategory === 'ALL' || d.category === selectedCategory
    );

    // Remove deleted or non-matching driver markers
    Object.keys(markersRef.current).forEach((key) => {
      if (key !== 'user_loc_pin' && !activeDrivers.find((d) => d.id === key)) {
        markersRef.current[key].remove();
        delete markersRef.current[key];
      }
    });

    // Render individual custom vehicle icon for each stoota
    activeDrivers.forEach((driver) => {
      const catInfo = VEHICLE_CATEGORIES[driver.category] || {
        emoji: '🛺',
        color: '#d97706',
        nameAr: 'ستوتة',
      };
      const isSelected = selectedDriver?.id === driver.id;

      const driverIcon = L.divIcon({
        className: 'stoota-vehicle-marker',
        html: `
          <div style="
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            transform: scale(${isSelected ? 1.25 : 1});
            transition: all 0.25s ease;
            z-index: ${isSelected ? 999 : 10};
          ">
            <div style="
              width: ${isSelected ? '46px' : '40px'};
              height: ${isSelected ? '46px' : '40px'};
              background-color: ${driver.isOnline ? catInfo.color : '#64748b'};
              border: 3px solid ${isSelected ? '#f59e0b' : '#ffffff'};
              border-radius: 50%;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: ${isSelected ? '22px' : '18px'};
            ">
              ${catInfo.emoji}
            </div>

            <!-- Online Badge -->
            ${
              driver.isOnline
                ? `<div style="
                    position: absolute;
                    top: -2px;
                    right: 6px;
                    width: 12px;
                    height: 12px;
                    background-color: #22c55e;
                    border: 2px solid white;
                    border-radius: 50%;
                  "></div>`
                : ''
            }

            <!-- Clean Label Underneath -->
            <div style="
              margin-top: 2px;
              background: rgba(15, 23, 42, 0.88);
              backdrop-filter: blur(4px);
              color: #ffffff;
              font-size: 10px;
              font-weight: 700;
              padding: 1px 6px;
              border-radius: 999px;
              white-space: nowrap;
              border: 1px solid rgba(255,255,255,0.2);
              box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            ">
              ${catInfo.nameAr}
            </div>
          </div>
        `,
        iconSize: [70, 60],
        iconAnchor: [35, 24],
      });

      if (markersRef.current[driver.id]) {
        markersRef.current[driver.id].setLatLng([driver.location.lat, driver.location.lng]);
        markersRef.current[driver.id].setIcon(driverIcon);
      } else {
        const marker = L.marker([driver.location.lat, driver.location.lng], { icon: driverIcon }).addTo(map);

        marker.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          onSelectDriver(driver);
        });

        markersRef.current[driver.id] = marker;
      }
    });
  }, [drivers, selectedCategory, selectedDriver, onSelectDriver]);

  // Center on customer
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([customerLocation.lat, customerLocation.lng], 15, { animate: true });
    }
    if (onRequestGpsLocation) {
      onRequestGpsLocation();
    }
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[520px] rounded-3xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800">
      
      {/* The Leaflet Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Top Controls: Location & GPS */}
      <div className="absolute top-3 right-3 left-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
        
        {/* Active Neighborhood Tag */}
        <div className="pointer-events-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-100 max-w-[70%] truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
          <span className="truncate">{customerLocation.addressAr || 'الموقع الحالي'}</span>
        </div>

        {/* GPS Quick Recenter Button */}
        <button
          onClick={handleRecenter}
          className="pointer-events-auto bg-white dark:bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-700 dark:text-slate-200 p-2.5 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 transition-all flex items-center gap-1.5 text-xs font-bold shrink-0"
          title="تحديث وتحديد موقعي الحالي بالـ GPS"
        >
          <Navigation className="w-4 h-4 text-amber-500" />
          <span className="hidden sm:inline">{hasRealGps ? 'موقعي (GPS)' : 'تحديث GPS'}</span>
        </button>
      </div>

      {/* Map Interactive Hint Badge */}
      <div className="absolute top-14 left-3 z-10 pointer-events-none">
        <div className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-xl shadow-xs border border-white/10 flex items-center gap-1.5 font-medium">
          <Crosshair className="w-3 h-3 text-amber-400" />
          <span>انقر على الخريطة لتغيير مكانك</span>
        </div>
      </div>

      {/* When a Stoota Icon is Clicked on the Map: Direct Mobile Bottom Sheet */}
      {selectedDriver && (
        <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-amber-500/30 text-slate-900 dark:text-slate-100 transition-all animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header of the Selected Stoota */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md shrink-0 text-white"
                style={{ backgroundColor: VEHICLE_CATEGORIES[selectedDriver.category]?.color || '#d97706' }}
              >
                {VEHICLE_CATEGORIES[selectedDriver.category]?.emoji || '🛺'}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    {selectedDriver.driverName}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {selectedDriver.rating} ({selectedDriver.reviewCount})
                  </span>
                </div>

                <p className="text-xs text-amber-600 dark:text-amber-400 font-bold mt-0.5">
                  {VEHICLE_CATEGORIES[selectedDriver.category]?.nameAr} • {selectedDriver.location.addressAr || selectedDriver.areaName}
                </p>
              </div>
            </div>

            {/* Cancel / Dismiss Button */}
            <button
              onClick={() => onSelectDriver(null)}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="إلغاء وإغلاق العرض"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Price List Highlights */}
          <div className="mt-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-500 dark:text-slate-400 mb-1">
              <span>قائمة الأسعار والخدمة:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-black">متصل وجاهز الآن 🟢</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {selectedDriver.prices.slice(0, 3).map((item) => (
                <span
                  key={item.id}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-bold"
                >
                  {item.itemName}: <span className="text-amber-600 dark:text-amber-400 font-black">{item.priceIqd.toLocaleString()} د.ع</span>
                </span>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons: Dismiss vs Details vs Call vs Proceed with Order */}
          <div className="mt-3 grid grid-cols-4 gap-1.5 text-xs">
            {/* Dismiss Button */}
            <button
              onClick={() => onSelectDriver(null)}
              className="py-2 px-1 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center"
            >
              إلغاء
            </button>

            {/* View Full Details Button */}
            <button
              onClick={() => onOpenDetailModal(selectedDriver)}
              className="py-2 px-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold transition-all flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>التفاصيل</span>
            </button>

            {/* Direct Call */}
            <a
              href={`tel:${selectedDriver.phone}`}
              className="py-2 px-1 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60 font-bold flex items-center justify-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>اتصال</span>
            </a>

            {/* Proceed with Order Button */}
            <button
              onClick={() => onDirectOrder(selectedDriver)}
              className="py-2 px-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-md transition-all flex items-center justify-center gap-1"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>طلب الآن</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
