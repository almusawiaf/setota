import React from 'react';
import { ServiceOrder, StootaDriver } from '../types';
import { VEHICLE_CATEGORIES } from '../data/categories';
import { Clock, CheckCircle2, XCircle, Phone, MapPin, Star, ShoppingBag, ArrowRight } from 'lucide-react';

interface OrdersTrackingViewProps {
  orders: ServiceOrder[];
  drivers: StootaDriver[];
  onOpenReview: (order: ServiceOrder) => void;
  onCancelOrder?: (orderId: string) => void;
  onGoToMap: () => void;
}

export const OrdersTrackingView: React.FC<OrdersTrackingViewProps> = ({
  orders,
  drivers,
  onOpenReview,
  onCancelOrder,
  onGoToMap,
}) => {
  return (
    <div className="space-y-4 font-sans">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <span>متابعة الطلبات المباشرة ({orders.length})</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            تتبع حالة الستوتة بالـ GPS والتواصل المباشر مع صاحب الخدمة
          </p>
        </div>

        <button
          onClick={onGoToMap}
          className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black shadow-xs hover:bg-amber-600 transition-all flex items-center gap-1"
        >
          <span>طلب جديد</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 mx-auto flex items-center justify-center text-3xl">
            🛺
          </div>
          <h3 className="font-black text-sm text-slate-900 dark:text-white">لا توجد طلبات جارية حالياً</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            افتح خريطة الكرادة المباشرة وانقر على أي ستوتة (ماء، غاز، مخضر، صمون...) لطلب الخدمة فوراً لباب بيتك
          </p>
          <button
            onClick={onGoToMap}
            className="px-5 py-2.5 rounded-2xl bg-amber-500 text-slate-950 text-xs font-black shadow-md hover:bg-amber-600 transition-all inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>انتقل إلى الخريطة التفاعلية</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const catInfo = VEHICLE_CATEGORIES[order.category] || {
              emoji: '🛺',
              nameAr: 'خدمة ستوتة',
              color: '#d97706',
            };

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                
                {/* Top: Driver & Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md shrink-0 text-white"
                      style={{ backgroundColor: catInfo.color }}
                    >
                      {catInfo.emoji}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white">
                          {order.stootaDriverName}
                        </h4>
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                          ({catInfo.nameAr})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        طلب {order.isDirect ? 'مباشر عبر GPS' : 'مسبق ومجدول'} • {order.createdAt}
                      </p>
                    </div>
                  </div>

                  {/* Status Pill */}
                  {order.status === 'pending' && (
                    <span className="px-2.5 py-1 rounded-xl text-[11px] font-black bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center gap-1 shrink-0">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      بانتظار الموافقة
                    </span>
                  )}
                  {order.status === 'approved' && (
                    <span className="px-2.5 py-1 rounded-xl text-[11px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      مقبول (قادم خلال {order.etaMinutes || 8} د)
                    </span>
                  )}
                  {order.status === 'rejected' && (
                    <span className="px-2.5 py-1 rounded-xl text-[11px] font-black bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 flex items-center gap-1 shrink-0">
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      اعتذار السائق
                    </span>
                  )}
                </div>

                {/* Tracking Progress Bar */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    <span className={order.status === 'pending' ? 'text-amber-600 font-black' : ''}>1. تم إرسال الطلب</span>
                    <span className={order.status === 'approved' ? 'text-emerald-600 font-black' : ''}>2. السائق بالطريق 🛺</span>
                    <span>3. الاستلام والدفع 💵</span>
                  </div>

                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        order.status === 'pending' ? 'w-1/3 bg-amber-500 animate-pulse' :
                        order.status === 'approved' ? 'w-2/3 bg-emerald-500' : 'w-full bg-slate-400'
                      }`}
                    ></div>
                  </div>

                  {order.driverNote && (
                    <div className="mt-1 p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 font-bold">
                      💬 رسالة السائق: "{order.driverNote}"
                    </div>
                  )}
                </div>

                {/* Items & Location Details */}
                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">الطلبات:</span>
                    <span className="font-bold">
                      {order.items.map((i) => `${i.itemName} × ${i.quantity}`).join('، ')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">موقع التوصيل:</span>
                    <span className="font-bold truncate max-w-[220px]">{order.customerLocation.addressAr}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-600 dark:text-slate-400">إجمالي المبلغ المطلوب:</span>
                    <span className="font-black text-amber-600 dark:text-amber-400 text-sm">
                      {order.totalPriceIqd.toLocaleString()} د.ع
                    </span>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={`tel:${order.stootaPhone}`}
                    className="px-3.5 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>اتصال بالسائق ({order.stootaPhone})</span>
                  </a>

                  {order.status === 'approved' && !order.hasBeenReviewed && (
                    <button
                      onClick={() => onOpenReview(order)}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-xs flex items-center gap-1.5"
                    >
                      <Star className="w-3.5 h-3.5" />
                      <span>تقييم الأمانة والخدمة</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
