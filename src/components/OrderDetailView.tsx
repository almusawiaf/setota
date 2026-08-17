import React from 'react';
import { ServiceOrder } from '../types';
import { VEHICLE_CATEGORIES } from '../data/categories';
import { ArrowRight, Phone, MapPin, Clock, CheckCircle, Star, AlertCircle, ShoppingBag, Truck, Calendar } from 'lucide-react';

interface OrderDetailViewProps {
  order: ServiceOrder;
  onBack: () => void;
  onOpenReview: (order: ServiceOrder) => void;
  onCancelOrder?: (orderId: string) => void;
}

export const OrderDetailView: React.FC<OrderDetailViewProps> = ({
  order,
  onBack,
  onOpenReview,
  onCancelOrder,
}) => {
  const catInfo = VEHICLE_CATEGORIES[order.category] || {
    emoji: '🛺',
    nameAr: 'خدمة ستوتة',
    color: '#d97706',
  };

  return (
    <div className="space-y-4 font-sans text-slate-900 dark:text-slate-100 animate-in fade-in duration-200">
      
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-black transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>رجوع لقائمة الطلبات</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-400">
          رقم الطلب: #{order.id.slice(-6)}
        </span>
      </div>

      {/* Driver & Category Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md shrink-0 text-white"
              style={{ backgroundColor: catInfo.color }}
            >
              {catInfo.emoji}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {order.stootaDriverName}
                </h3>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  ({catInfo.nameAr})
                </span>
              </div>

              <p className="text-xs text-slate-500 mt-0.5">
                {order.isDirect ? 'طلب مباشر عبر الـ GPS' : 'حجز مجدول مسبقاً'} • {order.createdAt}
              </p>
            </div>
          </div>

          <a
            href={`tel:${order.stootaPhone}`}
            className="p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-md transition-all flex items-center gap-1.5 text-xs font-bold shrink-0"
            title="اتصال مباشر بالسائق"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">اتصال</span>
          </a>
        </div>

        {/* Live Tracking Progress Step Indicator */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-500">حالة المسار والتوصيل:</span>
            {order.status === 'pending' && (
              <span className="text-amber-600 font-black flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                بانتظار موافقة السائق
              </span>
            )}
            {order.status === 'approved' && (
              <span className="text-emerald-600 font-black flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                قادم إليك (خلال {order.etaMinutes || 6} دقائق)
              </span>
            )}
            {order.status === 'completed' && (
              <span className="text-emerald-600 font-black">تم التسليم بنجاح ✓</span>
            )}
            {order.status === 'rejected' && (
              <span className="text-rose-600 font-black">نعتذر، تم رفض الطلب</span>
            )}
          </div>

          {/* Stepper Dots */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold pt-1">
            <div className={`p-2 rounded-xl border ${
              order.status === 'pending' || order.status === 'approved' || order.status === 'completed'
                ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-300 font-black'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-400'
            }`}>
              1. إرسال الطلب
            </div>
            <div className={`p-2 rounded-xl border ${
              order.status === 'approved' || order.status === 'completed'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-black'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-400'
            }`}>
              2. السائق بالطريق
            </div>
            <div className={`p-2 rounded-xl border ${
              order.status === 'completed'
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-black'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-400'
            }`}>
              3. الاستلام والدفع
            </div>
          </div>

          {order.driverNote && (
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-bold">
              💬 رسالة من السائق: "{order.driverNote}"
            </div>
          )}
        </div>
      </div>

      {/* Bill & Items Receipt */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
          قائمة المواد والتفاصيل المالية:
        </h4>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">{item.itemName}</p>
                <p className="text-[11px] text-slate-400">الكمية: {item.quantity} × {item.unitPrice.toLocaleString()} د.ع</p>
              </div>
              <span className="font-black text-slate-900 dark:text-white">
                {(item.quantity * item.unitPrice).toLocaleString()} د.ع
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-sm font-black text-slate-900 dark:text-white">المجموع الكلي المطلوب:</span>
          <span className="text-base font-black text-amber-600 dark:text-amber-400">
            {order.totalPriceIqd.toLocaleString()} دينار عراقي
          </span>
        </div>
      </div>

      {/* Delivery Location Card */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 text-xs">
        <span className="font-bold text-slate-500">عنوان التسليم:</span>
        <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{order.customerLocation.addressAr}</span>
        </p>
      </div>

      {/* Action Buttons: Rating or Contact */}
      <div className="pt-2 flex items-center gap-2">
        <a
          href={`tel:${order.stootaPhone}`}
          className="flex-1 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition-all"
        >
          <Phone className="w-4 h-4" />
          <span>اتصال بالسائق ({order.stootaPhone})</span>
        </a>

        {order.status === 'approved' && !order.hasBeenReviewed && (
          <button
            onClick={() => onOpenReview(order)}
            className="flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition-all"
          >
            <Star className="w-4 h-4" />
            <span>تقييم الخدمة</span>
          </button>
        )}
      </div>

    </div>
  );
};
