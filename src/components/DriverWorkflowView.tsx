import React, { useState } from 'react';
import { StootaDriver, ServiceOrder, PriceItem } from '../types';
import { Radio, Package, Tag, User } from 'lucide-react';
import { DriverWorkStatusRadarView } from './driver/DriverWorkStatusRadarView';
import { DriverOrdersMergedPage } from './driver/DriverOrdersMergedPage';
import { DriverPriceListPage } from './driver/DriverPriceListPage';
import { DriverProfileDetailsPage } from './driver/DriverProfileDetailsPage';

interface DriverWorkflowViewProps {
  driverProfile: StootaDriver;
  orders: ServiceOrder[];
  onToggleOnline: (isOnline: boolean) => void;
  onApproveOrder: (orderId: string, etaMinutes: number, note: string) => void;
  onRejectOrder: (orderId: string, note: string) => void;
  onCompleteOrder: (orderId: string) => void;
  onUpdatePrices: (prices: PriceItem[]) => void;
  onUpdateFacebook: (facebookUrl: string) => void;
  onSignOut: () => void;
}

export const DriverWorkflowView: React.FC<DriverWorkflowViewProps> = ({
  driverProfile,
  orders,
  onToggleOnline,
  onApproveOrder,
  onRejectOrder,
  onCompleteOrder,
  onUpdatePrices,
  onUpdateFacebook,
  onSignOut,
}) => {
  const [activeDriverTab, setActiveDriverTab] = useState<'status' | 'orders' | 'prices' | 'profile'>('status');

  // Count pending and active orders for badges
  const pendingOrdersCount = orders.filter(
    (o) => o.stootaId === driverProfile.id && o.status === 'pending'
  ).length;
  const activeOrdersCount = orders.filter(
    (o) => o.stootaId === driverProfile.id && o.status === 'approved'
  ).length;
  const totalOrdersBadge = pendingOrdersCount + activeOrdersCount;

  return (
    <div className="flex flex-col min-h-full font-sans text-slate-900 dark:text-slate-100 relative">
      
      {/* Active Tab Page Content */}
      <div className="flex-1 pb-16">
        
        {/* Tab 1: Live Graphic Radar & Work Status */}
        {activeDriverTab === 'status' && (
          <DriverWorkStatusRadarView
            driverProfile={driverProfile}
            orders={orders}
            onToggleOnline={onToggleOnline}
            onGoToOrders={() => setActiveDriverTab('orders')}
          />
        )}

        {/* Tab 2: Merged Orders (Incoming + Active + Completed) */}
        {activeDriverTab === 'orders' && (
          <DriverOrdersMergedPage
            orders={orders}
            driverId={driverProfile.id}
            isOnline={driverProfile.isOnline}
            onApproveOrder={onApproveOrder}
            onRejectOrder={onRejectOrder}
            onCompleteOrder={onCompleteOrder}
          />
        )}

        {/* Tab 3: Price List & Goods Management */}
        {activeDriverTab === 'prices' && (
          <DriverPriceListPage
            prices={driverProfile.prices}
            onUpdatePrices={onUpdatePrices}
          />
        )}

        {/* Tab 4: Driver Profile & Facebook Contact */}
        {activeDriverTab === 'profile' && (
          <DriverProfileDetailsPage
            driverProfile={driverProfile}
            onUpdateFacebook={onUpdateFacebook}
            onSignOut={onSignOut}
          />
        )}

      </div>

      {/* Driver Bottom Navigation Bar (Matching the Customer Navigation Style) */}
      <nav className="fixed sm:sticky bottom-0 left-0 right-0 z-40 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around text-[10px] font-bold shrink-0 shadow-lg">
        
        {/* 1. Radar / Work Status Tab */}
        <button
          onClick={() => setActiveDriverTab('status')}
          className={`flex-1 py-1 flex flex-col items-center gap-1 transition-all ${
            activeDriverTab === 'status'
              ? 'text-amber-500 font-black scale-105'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl relative ${activeDriverTab === 'status' ? 'bg-amber-500/10' : ''}`}>
            <Radio className="w-5 h-5" />
            {driverProfile.isOnline && (
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            )}
          </div>
          <span>وضع العمل</span>
        </button>

        {/* 2. Merged Orders Tab */}
        <button
          onClick={() => setActiveDriverTab('orders')}
          className={`flex-1 py-1 flex flex-col items-center gap-1 relative transition-all ${
            activeDriverTab === 'orders'
              ? 'text-amber-500 font-black scale-105'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl relative ${activeDriverTab === 'orders' ? 'bg-amber-500/10' : ''}`}>
            <Package className="w-5 h-5" />
            {totalOrdersBadge > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pulse">
                {totalOrdersBadge}
              </span>
            )}
          </div>
          <span>الطلبات</span>
        </button>

        {/* 3. Prices List Tab */}
        <button
          onClick={() => setActiveDriverTab('prices')}
          className={`flex-1 py-1 flex flex-col items-center gap-1 transition-all ${
            activeDriverTab === 'prices'
              ? 'text-amber-500 font-black scale-105'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl ${activeDriverTab === 'prices' ? 'bg-amber-500/10' : ''}`}>
            <Tag className="w-5 h-5" />
          </div>
          <span>قائمة الأسعار</span>
        </button>

        {/* 4. Driver Profile Tab */}
        <button
          onClick={() => setActiveDriverTab('profile')}
          className={`flex-1 py-1 flex flex-col items-center gap-1 transition-all ${
            activeDriverTab === 'profile'
              ? 'text-amber-500 font-black scale-105'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl ${activeDriverTab === 'profile' ? 'bg-amber-500/10' : ''}`}>
            <User className="w-5 h-5" />
          </div>
          <span>حسابي والتواصل</span>
        </button>

      </nav>

    </div>
  );
};
