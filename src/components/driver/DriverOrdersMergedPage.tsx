import React, { useState } from 'react';
import { ServiceOrder } from '../../types';
import { 
  Inbox, 
  Truck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Clock, 
  Check, 
  Navigation, 
  AlertCircle, 
  XCircle,
  Package
} from 'lucide-react';

interface DriverOrdersMergedPageProps {
  orders: ServiceOrder[];
  driverId: string;
  isOnline: boolean;
  onApproveOrder: (orderId: string, etaMinutes: number, note: string) => void;
  onRejectOrder: (orderId: string, note: string) => void;
  onCompleteOrder: (orderId: string) => void;
}

export const DriverOrdersMergedPage: React.FC<DriverOrdersMergedPageProps> = ({
  orders,
  driverId,
  isOnline,
  onApproveOrder,
  onRejectOrder,
  onCompleteOrder,
}) => {
  const [activeFilter, setActiveFilter] = useState<'pending' | 'approved' | 'completed'>('pending');
  const [selectedOrderToApprove, setSelectedOrderToApprove] = useState<ServiceOrder | null>(null);
  const [etaInput, setEtaInput] = useState(8);
  const [driverResponseNote, setDriverResponseNote] = useState('أنا بالطريق أخي الكريم، البضاعة متوفرة وجاهزة.');

  // Filter orders for this driver
  const driverOrders = orders.filter((o) => o.stootaId === driverId);
  const pendingOrders = driverOrders.filter((o) => o.status === 'pending');
  const approvedOrders = driverOrders.filter((o) => o.status === 'approved');
  const completedOrders = driverOrders.filter((o) => o.status === 'completed');

  // Currently viewed list
  const currentList =
    activeFilter === 'pending'
      ? pendingOrders
      : activeFilter === 'approved'
      ? approvedOrders
      : completedOrders;

  return (
    <div className="space-y-3.5 font-sans text-slate-900 dark:text-slate-100 animate-in fade-in duration-200">
      
      {/* Top Header & Segmented Filter Tabs */}
      <div className="bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <Package className="w-4 h-4 text-amber-500" />
            <span>إدارة طلبات الستوتة ({driverOrders.length})</span>
          </span>
          <span className="text-[10px] text-slate-400 font-bold">
            {isOnline ? '🟢 البث المباشر يعمل' : '🔴 غير متصل'}
          </span>
        </div>

        {/* 3 Unified Filter Tabs */}
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
          
          {/* 1. Pending Incoming Tab */}
          <button
            onClick={() => setActiveFilter('pending')}
            className={`py-2 px-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1 relative ${
              activeFilter === 'pending'
                ? 'bg-amber-500 text-slate-950 shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>الواردة</span>
            {pendingOrders.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                activeFilter === 'pending' ? 'bg-slate-950 text-white' : 'bg-rose-500 text-white animate-pulse'
              }`}>
                {pendingOrders.length}
              </span>
            )}
          </button>

          {/* 2. Active Approved Tab */}
          <button
            onClick={() => setActiveFilter('approved')}
            className={`py-2 px-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1 relative ${
              activeFilter === 'approved'
                ? 'bg-emerald-600 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>الجارية</span>
            {approvedOrders.length > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                activeFilter === 'approved' ? 'bg-white text-emerald-800' : 'bg-emerald-600 text-white'
              }`}>
                {approvedOrders.length}
              </span>
            )}
          </button>

          {/* 3. Completed Tab */}
          <button
            onClick={() => setActiveFilter('completed')}
            className={`py-2 px-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1 ${
              activeFilter === 'completed'
                ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-xs font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>المكتملة ({completedOrders.length})</span>
          </button>

        </div>
      </div>

      {/* Offline Alert when checking pending */}
      {!isOnline && activeFilter === 'pending' && (
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>وضع العمل متوقف حالياً. فعّله من تبويب "وضع العمل" لاستقبال الطلبات الفورية.</span>
        </div>
      )}

      {/* List Render */}
      {currentList.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center text-2xl text-slate-500">
            {activeFilter === 'pending' ? '📥' : activeFilter === 'approved' ? '🚚' : '✅'}
          </div>
          <h3 className="font-black text-sm text-slate-900 dark:text-white">
            {activeFilter === 'pending'
              ? 'لا توجد طلبات واردة جديدة حالياً'
              : activeFilter === 'approved'
              ? 'لا توجد طلبات جارية قيد التوصيل'
              : 'لم تكتمل أي طلبات اليوم بعد'}
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {activeFilter === 'pending'
              ? 'ستصلك الطلبات فوراً مع إشعار عند قيام زبائن الكرادة بالطلب من ستوتتك.'
              : activeFilter === 'approved'
              ? 'عند قبولك لأي طلب وارد، سيظهر هنا لمتابعة مسار التوصيل والتسليم.'
              : 'جميع الطلبات التي يتم تأكيد تسليمها بنجاح تُحفظ هنا في السجل.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {currentList.map((ord) => (
            <div
              key={ord.id}
              className={`bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border-2 shadow-sm space-y-3.5 ${
                ord.status === 'pending'
                  ? 'border-amber-500/60'
                  : ord.status === 'approved'
                  ? 'border-emerald-500/60'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Header: Customer & Total IQD */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-lg shrink-0 ${
                    ord.status === 'pending'
                      ? 'bg-amber-500/15 text-amber-600'
                      : ord.status === 'approved'
                      ? 'bg-emerald-500/15 text-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}>
                    👤
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-sm text-slate-900 dark:text-white">
                        {ord.customerName}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        ord.status === 'pending'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                          : ord.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {ord.status === 'pending'
                          ? 'طلب وارد جديد'
                          : ord.status === 'approved'
                          ? `قيد التوصيل (${ord.etaMinutes || 8} د)`
                          : 'تم التسليم والمحاسبة ✓'}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-500 mt-0.5" dir="ltr">
                      {ord.customerPhone}
                    </p>
                  </div>
                </div>

                <div className="text-left">
                  <span className="text-base font-black text-amber-600 dark:text-amber-400 font-mono block">
                    {ord.totalPriceIqd.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-400">دينار عراقي</span>
                </div>
              </div>

              {/* Items Summary */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs space-y-1.5">
                <p className="font-black text-slate-800 dark:text-slate-200 text-[11px]">
                  تفاصيل المواد المطلوبة:
                </p>
                <div className="space-y-1 pr-1">
                  {ord.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-slate-600 dark:text-slate-300 text-xs">
                      <span>• {it.itemName} (الكمية: {it.quantity})</span>
                      <span className="font-mono">{(it.quantity * it.unitPrice).toLocaleString()} د.ع</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-700 dark:text-slate-300">
                  <div className="flex items-center gap-1 truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate text-[11px] font-bold">{ord.customerLocation.addressAr}</span>
                  </div>

                  {ord.customerPhone && (
                    <a
                      href={`tel:${ord.customerPhone}`}
                      className="px-2.5 py-1 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-[11px] font-black flex items-center gap-1 shadow-xs shrink-0"
                    >
                      <Phone className="w-3 h-3" />
                      <span>اتصال</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Contextual Action Buttons */}
              {ord.status === 'pending' && (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onRejectOrder(ord.id, 'نعتذر من الزبون، المادة غير متوفرة حالياً.')}
                    className="px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 text-slate-600 dark:text-slate-400 text-xs font-black transition-colors"
                  >
                    اعتذار
                  </button>

                  <button
                    onClick={() => setSelectedOrderToApprove(ord)}
                    className="flex-1 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>قبول الطلب وتحديد وقت الوصول (ETA)</span>
                  </button>
                </div>
              )}

              {ord.status === 'approved' && (
                <div className="space-y-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center justify-between">
                    <span className="font-bold text-amber-900 dark:text-amber-300 text-[11px]">
                      المبلغ المطلوب استلامه نقداً كاش:
                    </span>
                    <span className="font-black text-amber-600 dark:text-amber-400 font-mono">
                      {ord.totalPriceIqd.toLocaleString()} د.ع
                    </span>
                  </div>

                  <button
                    onClick={() => onCompleteOrder(ord.id)}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تأكيد الوصول وتسليم البضاعة واستلام المبلغ ✓</span>
                  </button>
                </div>
              )}

              {ord.status === 'completed' && (
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>تم استلام مبلغ {ord.totalPriceIqd.toLocaleString()} د.ع نقداً بنجاح.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Approval & ETA Modal */}
      {selectedOrderToApprove && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-black">
                ⏱️
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  قبول طلب {selectedOrderToApprove.customerName}
                </h3>
                <p className="text-xs text-slate-500">حدد وقت الوصول ورسالتك للزبون</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                الوقت المقدر للوصول لباب الزبون (بالدقائق):
              </label>
              <input
                type="number"
                min="2"
                max="60"
                value={etaInput}
                onChange={(e) => setEtaInput(parseInt(e.target.value) || 5)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-mono font-black text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                رسالة إشعار للزبون:
              </label>
              <input
                type="text"
                value={driverResponseNote}
                onChange={(e) => setDriverResponseNote(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedOrderToApprove(null)}
                className="px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
              >
                إلغاء
              </button>
              <button
                onClick={() => {
                  onApproveOrder(selectedOrderToApprove.id, etaInput, driverResponseNote);
                  setSelectedOrderToApprove(null);
                  setActiveFilter('approved');
                }}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-2xl shadow-md flex items-center gap-1.5"
              >
                <Navigation className="w-4 h-4" />
                <span>تأكيد والبدء بالتوجه</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
