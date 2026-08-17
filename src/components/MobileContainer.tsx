import React, { useState } from 'react';
import { MapPin, ShoppingBag, User, Smartphone, Monitor } from 'lucide-react';

interface MobileContainerProps {
  activeTab: 'map' | 'orders' | 'profile';
  setActiveTab: (tab: 'map' | 'orders' | 'profile') => void;
  children: React.ReactNode;
  orderCount?: number;
  isDriver?: boolean;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({
  activeTab,
  setActiveTab,
  children,
  orderCount = 0,
  isDriver = false,
}) => {
  const [isMobileFrameMode, setIsMobileFrameMode] = useState<boolean>(true);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Mobile Frame View Mode Toggle Bar */}
      <div className="w-full max-w-4xl mb-2 flex items-center justify-between bg-slate-200/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-2xl text-xs font-bold border border-slate-300/80 dark:border-slate-700">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <Smartphone className="w-4 h-4 text-amber-500" />
          <span className="font-black">
            تطبيق ستوتة العراقي {isDriver ? '• (واجهة صاحب الستوتة)' : '• (واجهة الزبون)'}
          </span>
        </div>

        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl shadow-xs border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setIsMobileFrameMode(true)}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 text-[11px] font-bold ${
              isMobileFrameMode
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            إطار الموبايل
          </button>
          <button
            onClick={() => setIsMobileFrameMode(false)}
            className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 text-[11px] font-bold ${
              !isMobileFrameMode
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            كامل الشاشة
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className={`w-full transition-all duration-300 ${
        isMobileFrameMode
          ? 'max-w-[430px] bg-slate-950 rounded-[44px] p-3 sm:p-3.5 border-[6px] border-slate-800 shadow-2xl my-1 relative'
          : 'max-w-4xl'
      }`}>

        {/* Smartphone top camera notch */}
        {isMobileFrameMode && (
          <div className="w-32 h-4 bg-slate-900 mx-auto rounded-b-2xl mb-1.5 flex items-center justify-center gap-2 relative z-30 shrink-0">
            <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></div>
            <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
          </div>
        )}

        {/* Screen Content Wrapper */}
        <div className={`w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 ${
          isMobileFrameMode
            ? 'rounded-[30px] overflow-hidden min-h-[620px] max-h-[820px] overflow-y-auto flex flex-col relative border border-slate-200/50 dark:border-slate-800/50 shadow-inner'
            : 'min-h-[500px]'
        }`}>
          
          {/* Main View Content Area */}
          <div className="flex-1 p-2.5 sm:p-3.5 overflow-y-auto">
            {children}
          </div>

          {/* Bottom Mobile Navigation Bar for Customer Mode */}
          {!isDriver && (
            <nav className="sticky bottom-0 z-40 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around text-[10px] font-bold shrink-0 shadow-lg">
              
              {/* 1. Map Tab */}
              <button
                onClick={() => setActiveTab('map')}
                className={`flex-1 py-1 flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'map'
                    ? 'text-amber-500 font-black scale-105'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                <div className={`p-1 rounded-xl ${activeTab === 'map' ? 'bg-amber-500/10' : ''}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <span>خريطة الستوتات</span>
              </button>

              {/* 2. Orders List Tab */}
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 py-1 flex flex-col items-center gap-1 relative transition-all ${
                  activeTab === 'orders'
                    ? 'text-amber-500 font-black scale-105'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                <div className={`p-1 rounded-xl relative ${activeTab === 'orders' ? 'bg-amber-500/10' : ''}`}>
                  <ShoppingBag className="w-5 h-5" />
                  {orderCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                      {orderCount}
                    </span>
                  )}
                </div>
                <span>طلباتي</span>
              </button>

              {/* 3. Customer Profile Tab */}
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-1 flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'profile'
                    ? 'text-amber-500 font-black scale-105'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                <div className={`p-1 rounded-xl ${activeTab === 'profile' ? 'bg-amber-500/10' : ''}`}>
                  <User className="w-5 h-5" />
                </div>
                <span>حسابي</span>
              </button>

            </nav>
          )}
        </div>

        {/* Smartphone Bottom Home Bar */}
        {isMobileFrameMode && (
          <div className="h-2.5 flex items-center justify-center mt-1">
            <div className="w-24 h-1 bg-slate-700 rounded-full"></div>
          </div>
        )}

      </div>
    </div>
  );
};
