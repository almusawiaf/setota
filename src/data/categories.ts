import { CategoryInfo, VehicleCategory } from '../types';

export const VEHICLE_CATEGORIES: Record<VehicleCategory, CategoryInfo> = {
  GAS_CYLINDER: {
    id: 'GAS_CYLINDER',
    nameAr: 'قناني غاز',
    nameEn: 'LPG Gas',
    emoji: '🔥',
    iconName: 'Flame',
    color: '#ea580c',
    bgLight: '#ffedd5',
    description: 'تبديل وتوصيل قناني الغاز السائل للطبخ المنزلي',
    unit: 'قنينة'
  },
  RO_WATER: {
    id: 'RO_WATER',
    nameAr: 'ماء أرو مفلتر',
    nameEn: 'RO Water',
    emoji: '💧',
    iconName: 'Droplets',
    color: '#0284c7',
    bgLight: '#e0f2fe',
    description: 'توصيل مطارات وقناني ماء الشرب المفلتر (RO) للمنازل',
    unit: 'دبة / مطارة'
  },
  VEGETABLES_FRUITS: {
    id: 'VEGETABLES_FRUITS',
    nameAr: 'مخضر وفواكه',
    nameEn: 'Fresh Produce',
    emoji: '🥦',
    iconName: 'Apple',
    color: '#16a34a',
    bgLight: '#dcfce7',
    description: 'بيع الخضار والفواكه الطازجة باب البيت بأسعار يومية',
    unit: 'كيلوغرام'
  },
  OLD_ITEMS: {
    id: 'OLD_ITEMS',
    nameAr: 'شراء عتيك وخردة',
    nameEn: 'Used Goods',
    emoji: '📦',
    iconName: 'Recycle',
    color: '#78350f',
    bgLight: '#fef3c7',
    description: 'شراء الخردة والأجهزة المستعملة والأثاث القديم والحديد',
    unit: 'كغم / جهاز'
  },
  WATERMELON: {
    id: 'WATERMELON',
    nameAr: 'ركي وبطيخ عراقي',
    nameEn: 'Watermelon',
    emoji: '🍉',
    iconName: 'Citrus',
    color: '#dc2626',
    bgLight: '#fee2e2',
    description: 'ركي وبطيخ أحمر حلو شرط السكين مع التوصيل للباب',
    unit: 'كغم'
  },
  LIVE_CHICKEN: {
    id: 'LIVE_CHICKEN',
    nameAr: 'دجاج حي بالوزن',
    nameEn: 'Live Poultry',
    emoji: '🐔',
    iconName: 'Egg',
    color: '#d97706',
    bgLight: '#fef3c7',
    description: 'دجاج عربي ومحلي حي بالوزن مع إمكانية الذبح والتنظيف',
    unit: 'دجاجة / كغم'
  },
  SWEETS_COTTON_CANDY: {
    id: 'SWEETS_COTTON_CANDY',
    nameAr: 'حلويات وشعر بنات',
    nameEn: 'Cotton Candy',
    emoji: '🍬',
    iconName: 'Candy',
    color: '#db2777',
    bgLight: '#fce7f3',
    description: 'حلويات الأطفال، شعر بنات وردي، موطى وغزل البنات',
    unit: 'كيس / علبة'
  },
  HOT_BREAD: {
    id: 'HOT_BREAD',
    nameAr: 'صمون حار ومخبوزات',
    nameEn: 'Hot Bread',
    emoji: '🍞',
    iconName: 'Wheat',
    color: '#b45309',
    bgLight: '#fef3c7',
    description: 'صمون عراقي حجري حار طازج من الفرن وكعك سمسم',
    unit: 'سيت / كيس'
  },
  FRESH_FISH: {
    id: 'FRESH_FISH',
    nameAr: 'سمك حي ومسكوف',
    nameEn: 'Fresh Fish',
    emoji: '🐟',
    iconName: 'Fish',
    color: '#0891b2',
    bgLight: '#cffafe',
    description: 'سمك كارب وسمتي دجلة طازج حي مع خدمة الشوي والمسكوف',
    unit: 'سمكة / كغم'
  },
  HOME_REPAIRS_CARGO: {
    id: 'HOME_REPAIRS_CARGO',
    nameAr: 'ستوتة حمل وتصليحات',
    nameEn: 'Cargo & Repairs',
    emoji: '🛺',
    iconName: 'Wrench',
    color: '#4f46e5',
    bgLight: '#e0e7ff',
    description: 'نقل أحمال خفيفة، تصليح مضخات، حدادة وتفريغ أغراض',
    unit: 'نقلة / مشوار'
  }
};
