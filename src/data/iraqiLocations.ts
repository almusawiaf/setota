export interface IraqiAreaPreset {
  id: string;
  city: string;
  nameAr: string;
  lat: number;
  lng: number;
}

export const IRAQI_AREAS_PRESETS: IraqiAreaPreset[] = [
  // Baghdad
  { id: 'bg_karrada_dakhil', city: 'بغداد', nameAr: 'الكرادة داخل (فندق بابل / العطار)', lat: 33.3050, lng: 44.4250 },
  { id: 'bg_karrada_kharij', city: 'بغداد', nameAr: 'الكرادة خارج (سبع قصور / العرصات)', lat: 33.2980, lng: 44.4350 },
  { id: 'bg_mansour', city: 'بغداد', nameAr: 'المنصور (شارع 14 رمضان / الرواد)', lat: 33.3152, lng: 44.3540 },
  { id: 'bg_kadhimiya', city: 'بغداد', nameAr: 'الكاظمية (قرب الصحن الكاظمي)', lat: 33.3810, lng: 44.3420 },
  { id: 'bg_aadhamiya', city: 'بغداد', nameAr: 'الأعظمية (قرب ساحة عنتر)', lat: 33.3680, lng: 44.3640 },
  { id: 'bg_zayouna', city: 'بغداد', nameAr: 'زيونة (شارع الربيعي / ميسلون)', lat: 33.3240, lng: 44.4490 },
  { id: 'bg_yarmouk', city: 'بغداد', nameAr: 'اليرموك (الأربع شوارع)', lat: 33.2970, lng: 44.3480 },
  { id: 'bg_saydiya', city: 'بغداد', nameAr: 'السيدية (شارع التجاري)', lat: 33.2530, lng: 44.3550 },
  { id: 'bg_dora', city: 'بغداد', nameAr: 'الدورة (حي الآثوريين / المهدية)', lat: 33.2680, lng: 44.3980 },
  { id: 'bg_ghadeer', city: 'بغداد', nameAr: 'الغدير والمشتل', lat: 33.3110, lng: 44.4820 },
  { id: 'bg_shaab', city: 'بغداد', nameAr: 'الشعب وحي أور', lat: 33.4020, lng: 44.4050 },
  { id: 'bg_sadr', city: 'بغداد', nameAr: 'مدينة الصدر (الجوادر / الفلاح)', lat: 33.3850, lng: 44.4600 },
  { id: 'bg_bayaa', city: 'بغداد', nameAr: 'البياع وحي العامل', lat: 33.2720, lng: 44.3380 },
  
  // Basra
  { id: 'basra_ashar', city: 'البصرة', nameAr: 'البصرة - العشار والكورنيش', lat: 30.5085, lng: 47.8320 },
  { id: 'basra_jazair', city: 'البصرة', nameAr: 'البصرة - الجزائر والجبيلة', lat: 30.5210, lng: 47.8150 },
  
  // Najaf
  { id: 'najaf_center', city: 'النجف الأشرف', nameAr: 'النجف - شارع المدينة والروان', lat: 31.9960, lng: 44.3370 },
  { id: 'najaf_kufa', city: 'النجف الأشرف', nameAr: 'الكوفة - قرب مسجد الكوفة', lat: 32.0290, lng: 44.4020 },
  
  // Karbala
  { id: 'karbala_center', city: 'كربلاء المقدسة', nameAr: 'كربلاء - حي الحسين وشارع السناتر', lat: 32.6160, lng: 44.0250 },
  
  // Erbil & Sulaymaniyah
  { id: 'erbil_center', city: 'أربيل', nameAr: 'أربيل - قرب القلعة وشارع 60', lat: 36.1910, lng: 44.0090 },
  { id: 'sulay_center', city: 'السليمانية', nameAr: 'السليمانية - شارع سالم / سرجنار', lat: 35.5610, lng: 45.4340 },
  
  // Mosul & Kirkuk & Hilla
  { id: 'mosul_center', city: 'الموصل', nameAr: 'الموصل - حي الزهور والمجموعة الثقافية', lat: 36.3580, lng: 43.1550 },
  { id: 'hilla_center', city: 'بابل / الحلة', nameAr: 'الحلة - شارع 40 / باب المشهد', lat: 32.4830, lng: 44.4310 },
  { id: 'kirkuk_center', city: 'كركوك', nameAr: 'كركوك - طريق بغداد وشارع القدس', lat: 35.4670, lng: 44.3920 }
];
