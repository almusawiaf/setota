import React, { useState } from 'react';
import { Smartphone, Download, CheckCircle2, ShieldCheck, Terminal, HelpCircle, ExternalLink } from 'lucide-react';

export function ApkBuildModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 bg-emerald-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base">بناء وتثبيت التطبيق الأصلي (Android APK)</h3>
              <p className="text-xs text-emerald-100 font-medium">خطوات بسيطة للحصول على تطبيق حقيقي بهاتفك بدون متصفح</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-800 dark:text-slate-200 text-sm">
          
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-emerald-900 dark:text-emerald-200">
              <strong className="block font-bold mb-0.5">المشروع مهيأ ومربوط مسبقاً بـ Capacitor & Firebase!</strong>
              تم تضمين ملف <code className="bg-emerald-100 dark:bg-emerald-900/60 px-1 py-0.5 rounded font-mono text-[11px]">capacitor.config.ts</code> مع معرف التطبيق <code className="bg-emerald-100 dark:bg-emerald-900/60 px-1 py-0.5 rounded font-mono text-[11px]">com.stoota.app</code>.
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>3 خطوات سهلة لاستخراج ملف APK على حاسوبك (Windows):</span>
            </h4>

            {/* Step 1 */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white mb-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">1</span>
                <span>تنزيل ملفات المشروع (ZIP)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                من قائمة إعدادات AI Studio في الأعلى، اختر <strong>Export / Download as ZIP</strong> وفك الضغط في مجلد على حاسوبك.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white mb-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">2</span>
                <span>بناء مشروع الأندرويد بالأمر التالي</span>
              </div>
              <div className="bg-slate-950 text-emerald-400 p-2.5 rounded-xl font-mono text-xs overflow-x-auto text-left" dir="ltr">
                npm run build<br/>
                npx cap add android<br/>
                npx cap open android
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white mb-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">3</span>
                <span>استخراج ملف APK أو AAB مباشرة</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                سيفتح برنامج <strong>Android Studio</strong> تلقائياً:
                اضغط من القائمة العلوية على <span className="font-mono bg-slate-200 dark:bg-slate-700 px-1 rounded text-[11px]">Build &gt; Build Bundle(s) / APK(s) &gt; Build APK</span>.
                ستحصل فوراً على ملف <code className="text-emerald-600 dark:text-emerald-400 font-bold">app-debug.apk</code> لتثبيته في أي هاتف أندرويد مباشرة!
              </p>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-2xl border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>للنشر على متجر Google Play Store:</strong> تتبع نفس الخطوات وتختار <span className="font-mono">Generate Signed Bundle / APK</span> وترفع ملف <span className="font-mono">.aab</span> في حساب Google Play Console الخاص بك.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">معرف الحزمة: com.stoota.app</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
          >
            فهمت ذلك، إغلاق
          </button>
        </div>

      </div>
    </div>
  );
}
