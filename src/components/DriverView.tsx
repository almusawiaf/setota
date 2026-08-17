import React, { useState } from 'react';
import { StootaDriver, ServiceOrder, VehicleCategory, PriceItem } from '../types';
import { VEHICLE_CATEGORIES } from '../data/categories';
import { Power, Wifi, MapPin, Clock, Tag, Facebook, Phone, Check, X, Bell, Navigation, Plus, Trash2, ShieldCheck, AlertCircle } from 'lucide-react';

interface DriverViewProps {
  driverProfile: StootaDriver;
  incomingOrders: ServiceOrder[];
  onToggleOnline: (isOnline: boolean) => void;
  onApproveOrder: (orderId: string, etaMinutes: number, note: string) => void;
  onRejectOrder: (orderId: string, note: string) => void;
  onUpdatePrices: (prices: PriceItem[]) => void;
  onUpdateFacebook: (facebookUrl: string) => void;
}

export const DriverView: React.FC<DriverViewProps> = ({
  driverProfile,
  incomingOrders,
  onToggleOnline,
  onApproveOrder,
  onRejectOrder,
  onUpdatePrices,
  onUpdateFacebook,
}) => {
  const catInfo = VEHICLE_CATEGORIES[driverProfile.category];

  const [fbUrlInput, setFbUrlInput] = useState(driverProfile.facebookUrl || '');
  const [showFbEdit, setShowFbEdit] = useState(false);

  // Price Editing state
  const [pricesList, setPricesList] = useState<PriceItem[]>(driverProfile.prices);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState(1000);
  const [newItemUnit, setNewItemUnit] = useState(catInfo.unit);

  // Incoming Order Modal Response State
  const [selectedAlertOrder, setSelectedAlertOrder] = useState<ServiceOrder | null>(null);
  const [etaInput, setEtaInput] = useState(10);
  const [driverResponseNote, setDriverResponseNote] = useState('أنا بالطريق أخي الكريم، البضاعة متوفرة.');

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const newItem: PriceItem = {
      id: `p_${Date.now()}`,
      itemName: newItemName,
      priceIqd: newItemPrice,
      unit: newItemUnit,
    };
    const updated = [...pricesList, newItem];
    setPricesList(updated);
    onUpdatePrices(updated);
    setNewItemName('');
  };

  const handleRemoveItem = (id: string) => {
    const updated = pricesList.filter((p) => p.id !== id);
    setPricesList(updated);
    onUpdatePrices(updated);
  };

  const handleSaveFacebook = () => {
    onUpdateFacebook(fbUrlInput);
    setShowFbEdit(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Work Mode Toggle (حالة العمل) */}
      <div
        className={`p-6 rounded-3xl border transition-all shadow-md ${
          driverProfile.isOnline
            ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-500/30'
            : 'bg-gradient-to-r from-slate-800 to-slate-900 text-white border-slate-700'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black shadow-lg ${
                driverProfile.isOnline ? 'bg-white text-emerald-600' : 'bg-slate-700 text-slate-300'
              }`}
            >
              <Power className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black">
                  {driverProfile.isOnline ? 'وضع العمل مفعل (متصل الآن)' : 'وضع العمل متوقف'}
                </h2>
                <span className="flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-white/20 font-bold">
                  <Wifi className="w-3.5 h-3.5 animate-pulse" />
                  اتصال الأنترنت نشط
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 dark:text-slate-300 mt-1">
                {driverProfile.isOnline
                  ? 'موقعك والجولات التفاعلية تظهر حالياً للزبائن القريبين ضمن مدى 2 كم'
                  : 'عند البدء بالعمل في الشارع، قم بتفعيل هذه الوضعية ليتمكن الزبائن من رؤيتك على الخريطة'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onToggleOnline(!driverProfile.isOnline)}
            className={`px-8 py-3.5 rounded-2xl text-sm font-black shadow-xl transition-all flex items-center gap-2 ${
              driverProfile.isOnline
                ? 'bg-white text-emerald-800 hover:bg-emerald-50'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            <Power className="w-5 h-5" />
            {driverProfile.isOnline ? 'إيقاف وضع العمل (إخفاء الستوتة)' : 'تشغيل حالة العمل الآن'}
          </button>
        </div>
      </div>

      {/* Driver Configuration & Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Driver Profile Info Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            بيانات صاحب الستوتة
          </h3>

          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <p className="text-slate-400 font-medium">اسم السائق:</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{driverProfile.driverName}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <p className="text-slate-400 font-medium">نوع الستوتة / الخدمة:</p>
              <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5">{catInfo.nameAr}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <p className="text-slate-400 font-medium">منطقة الجولة والتواجد:</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{driverProfile.areaName}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <p className="text-slate-400 font-medium">رابط حساب الفيسبوك:</p>
                <button
                  onClick={() => setShowFbEdit(!showFbEdit)}
                  className="text-amber-600 text-[11px] font-bold hover:underline"
                >
                  {showFbEdit ? 'إلغاء' : 'ربط / تعديل'}
                </button>
              </div>

              {showFbEdit ? (
                <div className="mt-2 space-y-2">
                  <input
                    type="url"
                    value={fbUrlInput}
                    onChange={(e) => setFbUrlInput(e.target.value)}
                    placeholder="https://facebook.com/your.profile"
                    className="w-full p-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                  <button
                    onClick={handleSaveFacebook}
                    className="px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    حفظ الرابط
                  </button>
                </div>
              ) : (
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate mt-0.5">
                  {driverProfile.facebookUrl || 'غير مربوط حتى الآن'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Price List Manager */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-600" />
            إدارة قائمة الأسعار والبضائع المتوفرة
          </h3>

          {/* Add New Price Item Form */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">إضافة مادة/خدمة جديدة للقائمة:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="اسم المادة (مثال: قنينة غاز بلاستيك)"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
              />
              <input
                type="number"
                placeholder="السعر بالدينار العراقي"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(parseInt(e.target.value) || 0)}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono outline-none"
              />
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                إضافة المادة
              </button>
            </div>
          </div>

          {/* Current Price Items List */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {pricesList.map((item) => (
              <div key={item.id} className="p-3.5 bg-white dark:bg-slate-900 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{item.itemName}</span>
                  <span className="text-[11px] text-slate-400 mr-2">/ {item.unit}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-amber-600 dark:text-amber-400 font-mono">
                    {item.priceIqd.toLocaleString()} د.ع
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 rounded-lg hover:bg-rose-100 text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Incoming Requests Section (طلبات الخدمة المباشرة وغير المباشرة) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" />
            طلبات الخدمة الواردة من الزبائن ({incomingOrders.length})
          </h3>
          <span className="text-xs text-emerald-600 font-bold bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
            تنبيهات صوتية وفورية
          </span>
        </div>

        {incomingOrders.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">لا توجد طلبات جديدة معلقة حالياً</p>
        ) : (
          <div className="space-y-3">
            {incomingOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">{ord.customerName}</span>
                    <span dir="ltr" className="text-xs font-mono font-bold text-amber-600">
                      {ord.customerPhone}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-200 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold">
                      {ord.isDirect ? 'طلب مباشر' : 'حجز غير مباشر'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-semibold">
                    المواد المطلوبة: {ord.items.map((i) => `${i.itemName} (${i.quantity})`).join('، ')}
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    عنوان الزبون: {ord.customerLocation.addressAr} • المجموع: {ord.totalPriceIqd.toLocaleString()} د.ع
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedAlertOrder(ord)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-md"
                  >
                    <Check className="w-4 h-4" />
                    قبول وتحديد المسار
                  </button>

                  <button
                    onClick={() => onRejectOrder(ord.id, 'نعتذر من الزبون الكريم، المادة نفاذت حالياً.')}
                    className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    اعتذار
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approval & Route Calculation Dialog */}
      {selectedAlertOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 animate-scale-up">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">تأكيد قبول الطلب وتحديد وقت الوصول</h3>
            
            <p className="text-xs text-slate-600 dark:text-slate-300">
              الزبون: <span className="font-bold">{selectedAlertOrder.customerName}</span> ({selectedAlertOrder.customerLocation.addressAr})
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                وقت الوصول المقدر بالدقائق (ETA):
              </label>
              <input
                type="number"
                min="3"
                max="60"
                value={etaInput}
                onChange={(e) => setEtaInput(parseInt(e.target.value) || 5)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                إرسال رسالة خاصة للزبون:
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
                onClick={() => setSelectedAlertOrder(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
              >
                إلغاء
              </button>

              <button
                onClick={() => {
                  onApproveOrder(selectedAlertOrder.id, etaInput, driverResponseNote);
                  setSelectedAlertOrder(null);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md flex items-center gap-1.5"
              >
                <Navigation className="w-4 h-4" />
                تأكيد وبدء التوجه للزبون
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
