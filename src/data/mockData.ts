import { StootaDriver, Review, ServiceOrder, UserProfile } from '../types';

// Centered in Baghdad - Karrada Residential District
export const KARRADA_CENTER = { lat: 33.3050, lng: 44.4250, addressAr: 'بغداد - حي الكرادة الشرقية' };

// 10 Hardcoded Residential Users in Baghdad - Karrada Neighborhood
export const RESIDENTIAL_USERS: UserProfile[] = [
  {
    id: 'user_1',
    name: 'سارة العبيدي',
    phone: '07719998877',
    role: 'customer',
    location: { lat: 33.3075, lng: 44.4230, addressAr: 'الكرادة داخل - محلة 903 زقاق 14 قرب فندق بابل' }
  },
  {
    id: 'user_2',
    name: 'د. حيدر المعموري',
    phone: '07801122334',
    role: 'customer',
    location: { lat: 33.3040, lng: 44.4280, addressAr: 'الكرادة - تقاطع العطار، عمارة الأطباء' }
  },
  {
    id: 'user_3',
    name: 'أم مصطفى الجبوري',
    phone: '07705544332',
    role: 'customer',
    location: { lat: 33.3020, lng: 44.4210, addressAr: 'الكرادة - محلة سبع قصور، فرع الجامع الكبير' }
  },
  {
    id: 'user_4',
    name: 'علي الكرخي',
    phone: '07908877665',
    role: 'customer',
    location: { lat: 33.3090, lng: 44.4180, addressAr: 'شارع أبو نؤاس - قرب مدخل الجسر المعلق' }
  },
  {
    id: 'user_5',
    name: 'زينب التميمي',
    phone: '07723344556',
    role: 'customer',
    location: { lat: 33.3060, lng: 44.4310, addressAr: 'الكرادة - شارع 52، خلف الأسواق المركزية' }
  },
  {
    id: 'user_6',
    name: 'مهند السعدي',
    phone: '07817788990',
    role: 'customer',
    location: { lat: 33.3010, lng: 44.4330, addressAr: 'الكرادة - شارع العرصات الهندية، زقاق 7' }
  },
  {
    id: 'user_7',
    name: 'الحاجة أم سرمد',
    phone: '07736655441',
    role: 'customer',
    location: { lat: 33.3115, lng: 44.4260, addressAr: 'الكرادة داخل - قرب ساحة كهرمانة' }
  },
  {
    id: 'user_8',
    name: 'مصطفى الشمري',
    phone: '07904455667',
    role: 'customer',
    location: { lat: 33.3035, lng: 44.4160, addressAr: 'الكرادة - شارع حسينية عبد الرسول علي' }
  },
  {
    id: 'user_9',
    name: 'نور الهدى الزيدي',
    phone: '07821199334',
    role: 'customer',
    location: { lat: 33.3085, lng: 44.4350, addressAr: 'الكرادة - منطقة المسبح قرب السفارة الألمانية' }
  },
  {
    id: 'user_10',
    name: 'كرار البغدادي',
    phone: '07742233118',
    role: 'customer',
    location: { lat: 33.3005, lng: 44.4245, addressAr: 'الكرادة - شارع الصادق، مجمع الدير السكني' }
  }
];

// 10 Hardcoded Stootas (Diverse Categories) in the SAME Residential Neighborhood (Karrada)
export const MOCK_DRIVERS: StootaDriver[] = [
  {
    id: 'stoota_1',
    driverName: 'أبو أحمد الغازي',
    phone: '07701234567',
    facebookUrl: 'https://facebook.com/abu.ahmed.gas.karrada',
    category: 'GAS_CYLINDER',
    areaName: 'الكرادة - داخل وسبع قصور',
    workingHours: '08:00 ص - 08:00 م',
    isOnline: true,
    location: { lat: 33.3065, lng: 44.4240, addressAr: 'الكرادة داخل - شارع فندق بابل فرع 6' },
    rating: 4.9,
    reviewCount: 142,
    lastActive: 'الآن',
    prices: [
      { id: 'p1', itemName: 'تبديل قنينة غاز حديد', priceIqd: 7000, unit: 'قنينة' },
      { id: 'p2', itemName: 'تبديل قنينة بلاستيك حديثة', priceIqd: 8000, unit: 'قنينة' },
      { id: 'p3', itemName: 'توصيل وتركيب صمام ومنظم', priceIqd: 3000, unit: 'قطعة' }
    ]
  },
  {
    id: 'stoota_2',
    driverName: 'أبو حيدر لماء الأرو',
    phone: '07809876543',
    facebookUrl: 'https://facebook.com/water.ro.karrada',
    category: 'RO_WATER',
    areaName: 'الكرادة - العطار والمسبح',
    workingHours: '07:30 ص - 09:00 م',
    isOnline: true,
    location: { lat: 33.3045, lng: 44.4270, addressAr: 'الكرادة - تقاطع العطار قرب أسواق النور' },
    rating: 4.8,
    reviewCount: 118,
    lastActive: 'الآن',
    prices: [
      { id: 'p4', itemName: 'تعبئة مطارة ماء أرو 20 لتر', priceIqd: 1000, unit: 'مطارة' },
      { id: 'p5', itemName: 'مطارة ماء جديدة مع الصنبور', priceIqd: 6000, unit: 'مطارة' },
      { id: 'p6', itemName: 'سيت ماء كاسات صغير (12 كاس)', priceIqd: 2500, unit: 'سيت' }
    ]
  },
  {
    id: 'stoota_3',
    driverName: 'ستوتة أبو عباس للمخضر والفواكه',
    phone: '07712349876',
    facebookUrl: 'https://facebook.com/abu.abbas.fresh.veg',
    category: 'VEGETABLES_FRUITS',
    areaName: 'الكرادة - شارع 52 والعرصات',
    workingHours: '06:30 ص - 02:30 م',
    isOnline: true,
    location: { lat: 33.3080, lng: 44.4290, addressAr: 'الكرادة - شارع 52 الخدمي' },
    rating: 4.9,
    reviewCount: 205,
    lastActive: 'الآن',
    prices: [
      { id: 'p7', itemName: 'طماطة زبيرية درجة اولى', priceIqd: 1000, unit: 'كغم' },
      { id: 'p8', itemName: 'بتيته حمرة رملية حلوة', priceIqd: 1250, unit: 'كغم' },
      { id: 'p9', itemName: 'خيار حلي حلواني ماء ورد', priceIqd: 1500, unit: 'كغم' },
      { id: 'p10', itemName: 'موز كوستاريكي سومري', priceIqd: 2000, unit: 'كغم' }
    ]
  },
  {
    id: 'stoota_4',
    driverName: 'الحاج أبو كرار لشراء العتيك',
    phone: '07901112233',
    facebookUrl: 'https://facebook.com/ateek.karrada.buying',
    category: 'OLD_ITEMS',
    areaName: 'الكرادة - عموم المنطقة والمحلات',
    workingHours: '08:00 ص - 06:00 م',
    isOnline: true,
    location: { lat: 33.3030, lng: 44.4220, addressAr: 'الكرادة - سبع قصور قرب حسينية البو شجاع' },
    rating: 4.7,
    reviewCount: 88,
    lastActive: 'الآن',
    prices: [
      { id: 'p11', itemName: 'شراء بطاريات سيارات قديمة', priceIqd: 15000, unit: 'بطارية' },
      { id: 'p12', itemName: 'شراء أجهزة سباليت وثلاجات عاطلة', priceIqd: 35000, unit: 'جهاز' },
      { id: 'p13', itemName: 'شراء حديد ونحاس وسكراب منزلي', priceIqd: 600, unit: 'كغم' }
    ]
  },
  {
    id: 'stoota_5',
    driverName: 'أبو علي للركي والبطيخ العراقي',
    phone: '07812223344',
    category: 'WATERMELON',
    areaName: 'الكرادة - أبو نؤاس والشارع العام',
    workingHours: '09:00 ص - 11:00 م',
    isOnline: true,
    location: { lat: 33.3095, lng: 44.4210, addressAr: 'شارع أبو نؤاس - مدخل كازينو الكرادة' },
    rating: 5.0,
    reviewCount: 167,
    lastActive: 'الآن',
    prices: [
      { id: 'p14', itemName: 'ركي الموصل احمر شرط السكين', priceIqd: 750, unit: 'كغم' },
      { id: 'p15', itemName: 'بطيخ سامراء العسل حلو ومقرمش', priceIqd: 1000, unit: 'كغم' },
      { id: 'p16', itemName: 'شرحة ركي باردة طازجة', priceIqd: 1500, unit: 'قطعة' }
    ]
  },
  {
    id: 'stoota_6',
    driverName: 'أبو حسين للدجاج الحي بالوزن',
    phone: '07728889900',
    category: 'LIVE_CHICKEN',
    areaName: 'الكرادة - ساحة كهرمانة والفرعي',
    workingHours: '07:00 ص - 01:30 م',
    isOnline: true,
    location: { lat: 33.3110, lng: 44.4255, addressAr: 'الكرادة - قرب فلكة كهرمانة' },
    rating: 4.8,
    reviewCount: 93,
    lastActive: 'الآن',
    prices: [
      { id: 'p17', itemName: 'دجاج مزارع حي بالوزن', priceIqd: 3500, unit: 'كغم' },
      { id: 'p18', itemName: 'خدمة الذبح والتنظيف السريع الفوري', priceIqd: 1000, unit: 'دجاجة' }
    ]
  },
  {
    id: 'stoota_7',
    driverName: 'عمو فاضل - شعر بنات وغزل البنات',
    phone: '07839991122',
    category: 'SWEETS_COTTON_CANDY',
    areaName: 'الكرادة - المسبح وحديقة الأمة',
    workingHours: '03:30 م - 11:30 م',
    isOnline: true,
    location: { lat: 33.3070, lng: 44.4340, addressAr: 'الكرادة - شارع المسبح قرب متنزه العائلة' },
    rating: 4.9,
    reviewCount: 194,
    lastActive: 'الآن',
    prices: [
      { id: 'p19', itemName: 'كيس شعر بنات وردي/أزرق عائلي', priceIqd: 1000, unit: 'كيس' },
      { id: 'p20', itemName: 'علبة غزل البنات مشكل مع كركلي', priceIqd: 2500, unit: 'علبة' }
    ]
  },
  {
    id: 'stoota_8',
    driverName: 'أبو مصطفى للصمون الحجري والكعك',
    phone: '07703332211',
    category: 'HOT_BREAD',
    areaName: 'الكرادة - العرصات والشارع التجاري',
    workingHours: '06:00 ص - 08:00 م',
    isOnline: true,
    location: { lat: 33.3025, lng: 44.4305, addressAr: 'الكرادة - تقاطع العرصات مع شارع بابل' },
    rating: 4.9,
    reviewCount: 132,
    lastActive: 'الآن',
    prices: [
      { id: 'p21', itemName: 'سيت صمون حجري حار (8 صمونات)', priceIqd: 1000, unit: 'سيت' },
      { id: 'p22', itemName: 'كيس كعك أبو السمسم العراقي الهش', priceIqd: 2000, unit: 'كيس' },
      { id: 'p23', itemName: 'خبز تنور عراقي حار (6 أرغفة)', priceIqd: 1000, unit: 'كيس' }
    ]
  },
  {
    id: 'stoota_9',
    driverName: 'أبو سجاد للسمك الحي والمسكوف',
    phone: '07815556677',
    category: 'FRESH_FISH',
    areaName: 'الكرادة - كورنيش أبو نؤاس',
    workingHours: '10:00 ص - 10:00 م',
    isOnline: true,
    location: { lat: 33.3085, lng: 44.4195, addressAr: 'أبو نؤاس - رصيف السمك قرب حديقة شهريار' },
    rating: 5.0,
    reviewCount: 176,
    lastActive: 'الآن',
    prices: [
      { id: 'p24', itemName: 'سمك كارب دجلة حي بالوزن', priceIqd: 6500, unit: 'كغم' },
      { id: 'p25', itemName: 'سمك شبوط / سمتي نهري طازج', priceIqd: 8000, unit: 'كغم' },
      { id: 'p26', itemName: 'خدمة شوي مسكوف عراقي بالتبيل', priceIqd: 3000, unit: 'سمكة' }
    ]
  },
  {
    id: 'stoota_10',
    driverName: 'أبو مريم لخدمات الستوتة والنقل والتصليح',
    phone: '07748883322',
    category: 'HOME_REPAIRS_CARGO',
    areaName: 'الكرادة - عموم المحلات والأفرع',
    workingHours: '07:00 ص - 09:00 م',
    isOnline: true,
    location: { lat: 33.3055, lng: 44.4215, addressAr: 'الكرادة داخل - قرب مجمع النورس السكني' },
    rating: 4.8,
    reviewCount: 110,
    lastActive: 'الآن',
    prices: [
      { id: 'p27', itemName: 'نقل أحمال خفيفة وأثاث ضمن الكرادة', priceIqd: 10000, unit: 'مشوار' },
      { id: 'p28', itemName: 'توصيل طلبات سريعة وشحنات شخصية', priceIqd: 3000, unit: 'توصيل' },
      { id: 'p29', itemName: 'تصليح مضخات ماء وتأسيسات خفيفة', priceIqd: 15000, unit: 'عمل' }
    ]
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    stootaId: 'stoota_1',
    customerName: 'سارة العبيدي',
    rating: 5,
    comment: 'صاحب خدمة أمين وعملي ونزيه جداً. وصل القنينة للطبق الثاني وربطها وشيك الغاز فوراً!',
    date: 'منذ ساعة',
    serviceType: 'قناني غاز'
  },
  {
    id: 'rev_2',
    stootaId: 'stoota_2',
    customerName: 'د. حيدر المعموري',
    rating: 5,
    comment: 'ماء أرو فلتر نقي جداً ومطارات نظيفة ومعقمة. دائماً نطلب منه بالعيادة والبيت.',
    date: 'منذ 3 ساعات',
    serviceType: 'ماء أرو مفلتر'
  },
  {
    id: 'rev_3',
    stootaId: 'stoota_3',
    customerName: 'أم مصطفى الجبوري',
    rating: 5,
    comment: 'المخضر طازج أسعار احسن من العلاوي وتوصيل لباب البيت بنفس الدقيقة.',
    date: 'أمس',
    serviceType: 'مخضر وفواكه'
  },
  {
    id: 'rev_4',
    stootaId: 'stoota_9',
    customerName: 'علي الكرخي',
    rating: 5,
    comment: 'سمك كارب حي مسكوف على أصوله تتبيلة بغدادية روعة وتوصيل حار يلهب!',
    date: 'منذ يومين',
    serviceType: 'سمك حي ومسكوف'
  }
];

export const MOCK_ORDERS: ServiceOrder[] = [
  {
    id: 'ord_101',
    stootaId: 'stoota_1',
    stootaDriverName: 'أبو أحمد الغازي',
    stootaPhone: '07701234567',
    category: 'GAS_CYLINDER',
    customerName: 'سارة العبيدي',
    customerPhone: '07719998877',
    customerLocation: { lat: 33.3075, lng: 44.4230, addressAr: 'الكرادة داخل - محلة 903 زقاق 14' },
    isDirect: true,
    items: [{ itemName: 'تبديل قنينة غاز حديد', quantity: 1, unitPrice: 7000 }],
    totalPriceIqd: 7000,
    requestedTime: 'فوراً (خدمة مباشرة بالـ GPS)',
    status: 'approved',
    etaMinutes: 6,
    driverNote: 'أنا بالطريق أختي الكريمة، مسافة فرعين وأكون يم البيت.',
    createdAt: 'قبل 10 دقائق'
  },
  {
    id: 'ord_102',
    stootaId: 'stoota_3',
    stootaDriverName: 'ستوتة أبو عباس للمخضر والفواكه',
    stootaPhone: '07712349876',
    category: 'VEGETABLES_FRUITS',
    customerName: 'د. حيدر المعموري',
    customerPhone: '07801122334',
    customerLocation: { lat: 33.3040, lng: 44.4280, addressAr: 'الكرادة - تقاطع العطار، عمارة الأطباء' },
    isDirect: false,
    items: [
      { itemName: 'طماطة زبيرية', quantity: 3, unitPrice: 1000 },
      { itemName: 'بتيته حمرة', quantity: 2, unitPrice: 1250 }
    ],
    totalPriceIqd: 5500,
    requestedTime: 'اليوم الساعة 04:00 عصراً',
    status: 'pending',
    createdAt: 'قبل 4 دقائق'
  }
];
