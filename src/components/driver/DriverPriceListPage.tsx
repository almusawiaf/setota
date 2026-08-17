import React, { useState } from 'react';
import { PriceItem } from '../../types';
import { Plus, Trash2, Tag, Check, ShoppingCart } from 'lucide-react';

interface DriverPriceListPageProps {
  prices: PriceItem[];
  defaultUnit?: string;
  onUpdatePrices: (prices: PriceItem[]) => void;
}

export const DriverPriceListPage: React.FC<DriverPriceListPageProps> = ({
  prices,
  defaultUnit = 'قطعة',
  onUpdatePrices,
}) => {
  const [pricesList, setPricesList] = useState<PriceItem[]>(prices);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number | ''>(1000);
  const [newItemUnit, setNewItemUnit] = useState(defaultUnit);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleAddPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemPrice) return;
    
    const newItem: PriceItem = {
      id: `p_${Date.now()}`,
      itemName: newItemName.trim(),
      priceIqd: Number(newItemPrice),
      unit: newItemUnit,
    };
    
    const updated = [...pricesList, newItem];
    setPricesList(updated);
    onUpdatePrices(updated);
    
    setNewItemName('');
    setNewItemPrice(1000);
    setStatusMessage('تمت إضافة المادة بنجاح وتحديث أسعارك للزبائن!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleRemovePrice = (id: string) => {
    const updated = pricesList.filter((p) => p.id !== id);
    setPricesList(updated);
    onUpdatePrices(updated);
  };

  return (
    <div className="space-y-3.5 font-sans text-slate-900 dark:text-slate-100 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-sm shrink-0">
            🏷️
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900 dark:text-white">
              إدارة قائمة الأسعار والسلع
            </h3>
            <p className="text-[10px] text-slate-500">تظهر هذه المواد تلقائياً لزبائن الكرادة عند الطلب</p>
          </div>
        </div>

        <span className="text-[11px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-xl">
          {pricesList.length} مادة
        </span>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Add New Item Form Card */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-amber-500" />
          <span>إضافة سلعة أو خدمة جديدة</span>
        </h4>

        <form onSubmit={handleAddPrice} className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                اسم المادة / السلعة:
              </label>
              <input
                type="text"
                placeholder="مثال: قنينة غاز حديد أصلية"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                السعر بالدينار (د.ع):
              </label>
              <input
                type="number"
                placeholder="مثال: 7000"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value ? Number(e.target.value) : '')}
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                الوحدة:
              </label>
              <input
                type="text"
                placeholder="مثال: قنينة / كغم / قطعة"
                value={newItemUnit}
                onChange={(e) => setNewItemUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-2xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>حفظ المادة ونشرها للزبائن</span>
          </button>
        </form>
      </div>

      {/* Published Prices List */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <ShoppingCart className="w-3.5 h-3.5 text-amber-500" />
          <span>المواد والأسعار المنشورة حالياً بالستوتة:</span>
        </h4>

        {pricesList.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">لم تقم بإضافة أي مواد بعد. أضف أسعارك ليتمكن الزبائن من الطلب.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {pricesList.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-black text-slate-900 dark:text-white text-xs sm:text-sm">{item.itemName}</span>
                  <span className="text-[11px] text-slate-400 mr-2 font-medium">لكل ({item.unit})</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-black text-amber-600 dark:text-amber-400 text-xs sm:text-sm font-mono">
                    {item.priceIqd.toLocaleString()} د.ع
                  </span>
                  <button
                    onClick={() => handleRemovePrice(item.id)}
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="حذف المادة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
