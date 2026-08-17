import React from 'react';
import { Truck, MapPin, ShieldCheck, Zap, PhoneCall, Smartphone, Users, ChevronLeft, ArrowRight, Flame, Droplets, Apple, Recycle, Star, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../types';

interface LandingPageProps {
  onStartAuth: (role: UserRole) => void;
  onExploreDemo: () => void;
  onOpenFlutterCode: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAuth,
  onExploreDemo,
  onOpenFlutterCode,
}) => {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-2xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>أول منصة رقمية متكاملة لخدمات الستوتات والبائعين المتجولين في العراق</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              تطبيق <span className="text-amber-500">ستوتة</span> 🛺
              <br />
              طلب الخدمات والبضائع المتجولة بالخريطة المباشرة
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              ربط أصحاب الستوتات والبائعين المتجولين (ماء أرو، قناني غاز، مخضر، عتيك، ركي، دجاج حي) بالأهالي والعائلات في الأحياء والمدن العراقية بتتبع مباشر ودقيق عبر الـ GPS.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onStartAuth('driver')}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 active:scale-95"
              >
                <Truck className="w-4 h-4" />
                <span>انضم كصاحب ستوتة (صاحب عمل)</span>
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => onStartAuth('customer')}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2 active:scale-95"
              >
                <Users className="w-4 h-4 text-sky-400" />
                <span>تسجيل كطالب خدمة (زبون)</span>
              </button>

              <button
                onClick={onExploreDemo}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs sm:text-sm border border-white/10 transition-all"
              >
                دخول الخريطة المباشرة
              </button>
            </div>

            {/* Key stats badges */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-800">
                <span className="block text-lg font-black text-amber-400">100%</span>
                <span className="text-[11px] text-slate-400">مجاني بدون عمولة</span>
              </div>
              <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-800">
                <span className="block text-lg font-black text-emerald-400">مباشر GPS</span>
                <span className="text-[11px] text-slate-400">تحديد موقع دقيق</span>
              </div>
              <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-800">
                <span className="block text-lg font-black text-sky-400">عراقي 100%</span>
                <span className="text-[11px] text-slate-400">مصمم للشارع العراقي</span>
              </div>
            </div>
          </div>

          {/* Smartphone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[300px] h-[520px] bg-slate-950 border-4 border-slate-700 rounded-[36px] shadow-2xl overflow-hidden relative flex flex-col">
              {/* Notch */}
              <div className="w-28 h-4 bg-slate-800 mx-auto rounded-b-xl flex items-center justify-center shrink-0">
                <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-700"></div>
              </div>

              {/* Mobile App Viewport Preview */}
              <div className="flex-1 bg-slate-900 p-4 space-y-3 overflow-hidden text-right" dir="rtl">
                <div className="flex items-center justify-between bg-slate-800 p-2 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-amber-400">الكرادة، بغداد</span>
                  </div>
                  <span className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">أونلاين</span>
                </div>

                {/* Simulated Mini Map Card */}
                <div className="h-32 bg-slate-800/90 rounded-2xl relative border border-slate-700 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px] opacity-20"></div>
                  <div className="absolute top-8 left-12 w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center shadow-lg text-sm">
                    🛺
                  </div>
                  <div className="absolute bottom-6 right-10 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center shadow-lg text-xs">
                    📍
                  </div>
                  <div className="absolute bottom-2 left-2 bg-slate-900/90 px-2 py-1 rounded text-[9px] text-amber-400 font-mono">
                    2 ستوتة قريبة جداً
                  </div>
                </div>

                {/* Mini Vendor Card */}
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">عباس أبو الماء RO</span>
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-950/60 px-1.5 py-0.5 rounded">
                      ★ 4.9
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">دبة ماء كبيرة: 1,000 د.ع • يبعد 350 متر</p>
                  <button
                    onClick={onExploreDemo}
                    className="w-full py-1.5 bg-amber-500 text-slate-950 rounded-lg text-[10px] font-black text-center"
                  >
                    اطلب الآن (توصيل مباشر)
                  </button>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="h-4 bg-slate-950 flex items-center justify-center shrink-0">
                <div className="w-20 h-1 bg-slate-700 rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Categories Grid */}
      <section className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">أنواع الخدمات والستوتات المغطاة</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">تغطية شاملة لكل البائعين المتجولين والخدمات المنزليّة السريعة</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all space-y-2">
            <span className="text-2xl">💧</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">ماء أرو (RO Water)</h3>
            <p className="text-xs text-slate-500">توصيل دبات الماء المعقمة والكاسات للمنازل والمحلات</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all space-y-2">
            <span className="text-2xl">🔥</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">قناني غاز الطبخ</h3>
            <p className="text-xs text-slate-500">تبديل قناني الغاز مباشرة مع الخدمة السريعة</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all space-y-2">
            <span className="text-2xl">📦</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">عتيك وبضاعة مستعملة</h3>
            <p className="text-xs text-slate-500">شراء وتجميع الأغراض المستعملة والمعدنيات</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all space-y-2">
            <span className="text-2xl">🥦</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">مخضر وفاكهة طازجة</h3>
            <p className="text-xs text-slate-500">خضروات وفواكه طازجة تصل لباب البيت</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all space-y-2">
            <span className="text-2xl">🍉</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">ركي وبطيخ موسمي</h3>
            <p className="text-xs text-slate-500">ركي عراقي طازج مع خدمة الفحص والتوصيل</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all space-y-2">
            <span className="text-2xl">🐔</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">دجاج حي طازج</h3>
            <p className="text-xs text-slate-500">دجاج حي وتجهيزات طازجة مباشرة للمنازل</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all space-y-2">
            <span className="text-2xl">🍬</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">حلويات وغزل البنات</h3>
            <p className="text-xs text-slate-500">أطعمة خفيفة ومسليات للمناسبات والأحياء</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2 flex flex-col justify-center items-center text-center">
            <Truck className="w-8 h-8 text-amber-500" />
            <h3 className="font-black text-sm text-amber-600 dark:text-amber-400">ستوتة أخرى</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">سجل بضاعتك الخاصة الآن</p>
          </div>
        </div>
      </section>

      {/* Direct vs Indirect Order Explanation */}
      <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">آلية العمل المتطورة</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">خيارات مرنة تضمن وصول الخدمة سواء كان السائق متصلاً بالإنترنت أو غير متصل</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Direct Order */}
          <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg">
              ⚡
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">1. الطلب المباشر (Online Direct)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              عندما تكون الستوتة متصلة بالإنترنت ومفعلة لخاصية التتبع، تظهر على الخريطة المباشرة في نطاق 2 كم. يمكنك توجيه طلب مباشر وسريع ويحصل السائق على إشعار صوتي فوري للتوجه لموقعك.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-bold text-amber-700 dark:text-amber-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>توصيل فوري خلال 5 - 15 دقيقة</span>
            </div>
          </div>

          {/* Indirect Order */}
          <div className="p-5 rounded-2xl bg-sky-500/5 border border-sky-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-lg">
              📩
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">2. الطلب المجدول / الأوفلاين (Offline Request)</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              في حال كانت الستوتة غير متصلة بالإنترنت مؤقتاً، يمكنك إرسال سفينة طلب أو الاتصال المباشر برقم الهاتف المحفوظ وتزويده بالطلب ليتم مروره بك في جولته القادمة.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-bold text-sky-700 dark:text-sky-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>حجز مسبق وتنظيم للمناطق</span>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Architecture & Code Access Callout */}
      <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 text-xs font-mono font-bold">
            Flutter Clean Architecture v3.1
          </div>
          <h3 className="text-xl font-bold">جاهز للتطوير بتطبيق Flutter حقيقي بلغة Dart</h3>
          <p className="text-xs text-slate-400 max-w-xl">
            يتضمن التطبيق الهيكلية الكاملة بـ Riverpod & Clean Architecture مع ملفات Dart الجاهزة للنسخ أو التنسيق والتنفيذ المباشر.
          </p>
        </div>

        <button
          onClick={onOpenFlutterCode}
          className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs whitespace-nowrap shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          عرض كود فلاتر المحدث بالكامل
        </button>
      </section>
    </div>
  );
};
