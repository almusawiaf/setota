import { Location, StootaDriver } from '../types';
import { IRAQI_AREAS_PRESETS } from '../data/iraqiLocations';

// Calculates distance in meters between two coordinates
export function calculateDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

// Finds the closest Iraqi city/area name for given coordinates
export function findClosestIraqiPreset(lat: number, lng: number): string {
  let closestName = '';
  let minDistance = Infinity;

  for (const preset of IRAQI_AREAS_PRESETS) {
    const dist = calculateDistanceMeters(lat, lng, preset.lat, preset.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closestName = `${preset.city} - ${preset.nameAr}`;
    }
  }

  // If within 15 km of a known preset, use it
  if (minDistance <= 15000 && closestName) {
    return closestName;
  }

  return `الموقع الحالي (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
}

// Reverse geocode using OpenStreetMap Nominatim with fast fallback
export async function reverseGeocodeCoordinates(lat: number, lng: number): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1&accept-language=ar`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const addr = data.address;
      if (addr) {
        const suburb = addr.suburb || addr.neighbourhood || addr.quarter || addr.residential || '';
        const road = addr.road || '';
        const city = addr.city || addr.town || addr.county || addr.state || 'العراق';

        const parts = [suburb, road, city].filter(Boolean);
        if (parts.length > 0) {
          return parts.join('، ');
        }
      }
      if (data.display_name) {
        const shortName = data.display_name.split(',').slice(0, 3).join('، ');
        return shortName;
      }
    }
  } catch (err) {
    // Network or timeout: fallback to closest Iraqi preset
  }

  return findClosestIraqiPreset(lat, lng);
}

// Fixed relative offsets (in degrees) to spread 10 drivers realistically in any neighborhood (radius 300m - 1400m)
const DRIVER_OFFSETS = [
  { dLat: +0.0028, dLng: -0.0035 }, // NW ~400m
  { dLat: -0.0032, dLng: +0.0042 }, // SE ~500m
  { dLat: +0.0051, dLng: +0.0020 }, // NE ~600m
  { dLat: -0.0045, dLng: -0.0038 }, // SW ~600m
  { dLat: +0.0018, dLng: +0.0065 }, // E ~700m
  { dLat: -0.0062, dLng: +0.0012 }, // S ~700m
  { dLat: +0.0075, dLng: -0.0022 }, // N ~800m
  { dLat: -0.0021, dLng: -0.0078 }, // W ~850m
  { dLat: +0.0060, dLng: +0.0068 }, // Far NE ~1000m
  { dLat: -0.0070, dLng: -0.0060 }, // Far SW ~1100m
];

// Anchors driver fleet dynamically around ANY customer location
export function anchorDriversAroundLocation(
  baseDrivers: StootaDriver[],
  centerLocation: Location
): StootaDriver[] {
  const centerArea = centerLocation.addressAr || 'الحي الحالي';

  return baseDrivers.map((driver, index) => {
    const offset = DRIVER_OFFSETS[index % DRIVER_OFFSETS.length];
    const newLat = centerLocation.lat + offset.dLat;
    const newLng = centerLocation.lng + offset.dLng;

    return {
      ...driver,
      areaName: `${centerArea.split('-')[0].trim()} - محيط ${driver.driverName.split(' ')[0]}`,
      location: {
        lat: Number(newLat.toFixed(5)),
        lng: Number(newLng.toFixed(5)),
        addressAr: `محيط ${centerArea}`,
      },
    };
  });
}
