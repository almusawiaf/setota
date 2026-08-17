import React, { useState } from 'react';
import { StootaDriver, ServiceOrder, UserProfile } from '../types';
import { VEHICLE_CATEGORIES } from '../data/categories';
import { X, Send, ShoppingBag, CheckCircle, Plus, Minus } from 'lucide-react';

interface NewOrderModalProps {
  driver: StootaDriver | null;
  currentUser?: UserProfile;
  isDirect: boolean;
  onClose: () => void;
  onSubmitOrder: (order: ServiceOrder) => void;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  driver,
  currentUser,
  isDirect,
  onClose,
  onSubmitOrder,
}) => {
  if (!driver) return null;

  const catInfo = VEHICLE_CATEGORIES[driver.category] || {
    emoji: '🛺',
    nameAr: 'خدمة ستوتة',
    color: '#d97706',
  };

  // Selected quantities for each item in price list
  const [quantities, setQuantities] = useState<{ [itemId: string]: number }>(() => {
    const initial: { [itemId: string]: number } = {};
    if (driver.prices.length > 0) {
      initial[driver.prices[0].id] = 1;
    }
    return initial;
  });

  const [customerName, setCustomerName] = useState(currentUser?.name || 'سارة العبيدي');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '07719998877');
  const [customerAddress, setCustomerAddress] = useState(
    currentUser?.location?.addressAr || 'الكرادة داخل - محلة 903 زقاق 14'
  );
  const [requestedTime, setRequestedTime] = useState(
    isDirect ? 'فوراً (طلب مباشر عبر الـ GPS)' : 'اليوم الساعة 05:00 عصراً'
  );
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [itemId]: next };
    });
  };

  // Calculate Total Price
  const selectedItems = driver.prices
    .filter((p) => (quantities[p.id] || 0) > 0)
    .map((p) => ({
      itemName: p.itemName,
      quantity: quantities[p.id],
      unitPrice: p.priceIqd,
    }));

  const totalPriceIqd = selectedItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert('يرجى تحديد كمية واحدة على الأقل من المواد المطلوبة');
      return;
    }

    const newOrder: ServiceOrder = {
      id: `ord_${Date.now()}`,
      stootaId: driver.id,
      stootaDriverName: driver.driverName,
      stootaPhone: driver.phone,
      category: driver.category,
      customerName,
      customerPhone,
      customerLocation: {
        lat: currentUser?.location?.lat || driver.location.lat - 0.001,
        lng: currentUser?.location?.lng || driver.location.lng + 0.001,
        addressAr: customerAddress,
      },
      isDirect,
      items: selectedItems,
      totalPriceIqd,
      requestedTime,
      notes,
      status: 'pending',
      createdAt: 'الآن',
    };

    onSubmitOrder(newOrder);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-[410px] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[88vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-3.5 bg-amber-500 text-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/30 flex items-center justify-center text-xl font-bold">
              {catInfo.emoji}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-slate-950 text-amber-400">
                  {isDirect ? 'طلب مباشر' : 'حجز مسبق'}
                </span>
                <h2 className="text-sm font-black text-slate-950">{driver.driverName}</h2>
              </div>
              <p className="text-[11px] font-bold opacity-90">
                {catInfo.nameAr} • {driver.areaName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-black/10 text-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">تم إرسال الطلب بنجاح!</h3>
            <p className="text-xs text-slate-500">
              تم إشعار صاحب الستوتة ({driver.driverName}). ستتمكن من تتبع حالة الطلب من تبويب "المتابعة والطلبات".
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            
            {/* Items Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                حدد الكميات المطلوبة:
              </label>

              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {driver.prices.map((p) => {
                  const qty = quantities[p.id] || 0;
                  return (
                    <div
                      key={p.id}
                      className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between ${
                        qty > 0
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{p.itemName}</p>
                        <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                          {p.priceIqd.toLocaleString()} د.ع / {p.unit}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(p.id, -1)}
                          className="w-7 h-7 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center hover:bg-slate-300 font-bold text-xs"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-xs font-black text-slate-900 dark:text-white">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(p.id, 1)}
                          className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center hover:bg-amber-600 font-bold text-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Calculation Display */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">المجموع المطلوب:</span>
              <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                {totalPriceIqd.toLocaleString()} دينار عراقي
              </span>
            </div>

            {/* Customer Inputs */}
            <div className="space-y-2.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  اسم الزبون:
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  رقم الهاتف:
                </label>
                <input
                  type="text"
                  required
                  dir="ltr"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  عنوان التسليم في الكرادة:
                </label>
                <input
                  type="text"
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100"
              >
                إلغاء
              </button>

              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-md flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>إرسال الطلب الآن ({totalPriceIqd.toLocaleString()} د.ع)</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
