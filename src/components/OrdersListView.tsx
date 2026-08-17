import React from 'react';
import { ServiceOrder } from '../types';
import { VEHICLE_CATEGORIES } from '../data/categories';
import { Clock, CheckCircle2, XCircle, ChevronLeft, ShoppingBag, ArrowRight } from 'lucide-react';

interface OrdersListViewProps {
  orders: ServiceOrder[];
  onSelectOrder: (order: ServiceOrder) => void;
  onGoToMap: () => void;
}

export const OrdersListView: React.FC<OrdersListViewProps> = ({
  orders,
  onSelectOrder,
  onGoToMap,
}) => {
  return (
    <div className="space-y-3 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <span>طلباتي ({orders.length})</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            انقر على أي طلب لعرض التفاصيل الكاملة وتتبع السائق
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

      {/* Orders List or Empty State */}
      {orders.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 mx-auto flex items-center justify-center text-3xl">
            🛺
          </div>
          <h3 className="font-black text-sm text-slate-900 dark:text-white">لا توجد طلبات مسجلة حالياً</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            افتح خريطة الكرادة المباشرة وانقر على أي ستوتة لطلب الخدمة فوراً لباب بيتك
          </p>
          <button
            onClick={onGoToMap}
            className="px-5 py-2.5 rounded-2xl bg-amber-500 text-slate-950 text-xs font-black shadow-md hover:bg-amber-600 transition-all inline-flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>طلب ستوتة من الخريطة</span>
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {orders.map((order) => {
            const catInfo = VEHICLE_CATEGORIES[order.category] || {
              emoji: '🛺',
              nameAr: 'خدمة ستوتة',
              color: '#d97706',
            };

            return (
              <button
                key={order.id}
                onClick={() => onSelectOrder(order)}
                className="w-full text-right bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 group"
              >
                
                {/* Left Side Info */}
                <div className="flex items-center gap-3 truncate">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0 text-white"
                    style={{ backgroundColor: catInfo.color }}
                  >
                    {catInfo.emoji}
                  </div>

                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                        {order.stootaDriverName}
                      </h4>
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 shrink-0">
                        ({catInfo.nameAr})
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                      {order.items.map((i) => `${i.itemName} (${i.quantity})`).join('، ')}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                        {order.totalPriceIqd.toLocaleString()} د.ع
                      </span>
                      <span className="text-[10px] text-slate-400">
                        • {order.createdAt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side Status & Arrow */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {order.status === 'pending' && (
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 animate-spin" />
                      بانتظار السائق
                    </span>
                  )}
                  {order.status === 'approved' && (
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      بالطريق ({order.etaMinutes || 8} د)
                    </span>
                  )}
                  {order.status === 'rejected' && (
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 flex items-center gap-1">
                      <XCircle className="w-3 h-3 text-rose-600" />
                      اعتذار
                    </span>
                  )}
                  {order.status === 'completed' && (
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      تم الاستلام
                    </span>
                  )}

                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-amber-500 flex items-center gap-0.5 transition-colors">
                    <span>التفاصيل</span>
                    <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                  </span>
                </div>

              </button>
            );
          })}
        </div>
      )}

    </div>
  );
};
