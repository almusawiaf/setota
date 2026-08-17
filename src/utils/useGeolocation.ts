import { useState, useEffect, useCallback } from 'react';
import { Location } from '../types';
import { reverseGeocodeCoordinates, findClosestIraqiPreset } from './geoUtils';

const STORAGE_KEY = 'stoota_user_saved_location';

// Default center: Baghdad Karrada (33.3050, 44.4250) only as an initial baseline before GPS kicks in
const INITIAL_BASELINE_LOCATION: Location = {
  lat: 33.3050,
  lng: 44.4250,
  addressAr: 'بغداد - الكرادة',
};

export function useGeolocation() {
  const [userLocation, setUserLocationState] = useState<Location>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      // ignore
    }
    return INITIAL_BASELINE_LOCATION;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRealGps, setHasRealGps] = useState<boolean>(false);

  // Updates location and persists to localStorage
  const setUserLocation = useCallback((newLoc: Location) => {
    setUserLocationState(newLoc);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLoc));
    } catch (e) {
      // ignore
    }
  }, []);

  const requestGpsLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('خاصية تحديد الموقع الجغرافي (GPS) غير مدعومة في جهازك.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Perform reverse geocoding to resolve real Iraqi neighborhood & city
        let resolvedAddress = findClosestIraqiPreset(lat, lng);
        try {
          const detailed = await reverseGeocodeCoordinates(lat, lng);
          if (detailed) {
            resolvedAddress = detailed;
          }
        } catch (e) {
          // fallback to preset
        }

        const freshLocation: Location = {
          lat: Number(lat.toFixed(5)),
          lng: Number(lng.toFixed(5)),
          addressAr: resolvedAddress,
        };

        setUserLocation(freshLocation);
        setHasRealGps(true);
        setLoading(false);
      },
      (err) => {
        console.warn('Geolocation position error:', err.message);
        setError('يرجى السماح بصلاحية الموقع في المتصفح أو اختيار منطقتك يدوياً.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [setUserLocation]);

  // Request GPS upon first mount
  useEffect(() => {
    requestGpsLocation();
  }, [requestGpsLocation]);

  return {
    userLocation,
    setUserLocation,
    loading,
    error,
    hasRealGps,
    requestGpsLocation,
  };
}

export { calculateDistanceMeters } from './geoUtils';
