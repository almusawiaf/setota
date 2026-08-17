import React, { useState } from 'react';
import { StootaDriver } from '../../types';
import { VEHICLE_CATEGORIES } from '../../data/categories';
import { User, Phone, MapPin, Clock, Share2, LogOut, Check, ExternalLink, ShieldCheck } from 'lucide-react';

interface DriverProfileDetailsPageProps {
  driverProfile: StootaDriver;
  onUpdateFacebook: (facebookUrl: string) => void;
  onSignOut: () => void;
}

export const DriverProfileDetailsPage: React.FC<DriverProfileDetailsPageProps> = ({
  driverProfile,
  onUpdateFacebook,
  onSignOut,
}) => {
  const catInfo = VEHICLE_CATEGORIES[driverProfile.category] || {
    emoji: '🛺',
    nameAr: 'ستوتة',
    color: '#d97706',
    unit: 'قطعة',
  };

  const [fbUrl, setFbUrl] = useState(driverProfile.facebookUrl || '');
  const [isEditingFb, setIsEditingFb] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveFacebook = () => {
    onUpdateFacebook(fbUrl);
    setIsEditingFb(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-3.5 font-sans text-slate-900 dark:text-slate-100 animate-in fade-in duration-200">
      
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-black text-sm shrink-0">
            👤
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900 dark:text-white">
              الملف الشخصي وصاحب الستوتة
            </h3>
            <p className="text-[10px] text-slate-500">إدارة معلومات الحساب وصفحة الفيسبوك</p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-500/30 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          <span>سائق موثق</span>
        </span>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-3.5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md text-white shrink-0"
            style={{ backgroundColor: catInfo.color }}
          >
            {catInfo.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {driverProfile.driverName}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-black">
                {catInfo.nameAr}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5" dir="ltr">
              {driverProfile.phone}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-500" />
              <span>منطقة العمل والتجوال المعتمدة:</span>
            </span>
            <p className="font-black text-xs text-slate-800 dark:text-slate-200">{driverProfile.areaName}</p>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>ساعات العمل اليومية:</span>
            </span>
            <p className="font-black text-xs text-slate-800 dark:text-slate-200">{driverProfile.workingHours}</p>
          </div>
        </div>
      </div>

      {/* Social & Contact Card */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-sky-500" />
            <span>صفحة الفيسبوك للتواصل المباشر مع الزبائن</span>
          </h4>
          <button
            onClick={() => setIsEditingFb(!isEditingFb)}
            className="text-amber-600 dark:text-amber-400 font-black text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40"
          >
            {isEditingFb ? 'إلغاء' : 'تعديل الرابط'}
          </button>
        </div>

        {savedSuccess && (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>تم حفظ رابط الفيسبوك بنجاح!</span>
          </div>
        )}

        {isEditingFb ? (
          <div className="space-y-2 pt-1">
            <input
              type="url"
              dir="ltr"
              value={fbUrl}
              onChange={(e) => setFbUrl(e.target.value)}
              placeholder="https://facebook.com/your-page"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-900 font-mono"
            />
            <button
              onClick={handleSaveFacebook}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-xs"
            >
              حفظ الرابط الجديد
            </button>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
            <span className="text-xs text-sky-600 dark:text-sky-400 font-semibold truncate max-w-[200px]" dir="ltr">
              {driverProfile.facebookUrl || 'https://facebook.com/stoota.karrada'}
            </span>
            {driverProfile.facebookUrl && (
              <a
                href={driverProfile.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Account Exit */}
      <div className="pt-2">
        <button
          onClick={onSignOut}
          className="w-full py-3 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 text-xs font-black flex items-center justify-center gap-2 hover:bg-rose-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج من حساب السائق</span>
        </button>
      </div>

    </div>
  );
};
