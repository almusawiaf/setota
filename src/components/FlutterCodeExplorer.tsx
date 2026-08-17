import React, { useState } from 'react';
import { FLUTTER_CODEBASE } from '../data/flutterCodebase';
import { Code2, Copy, Check, FileCode, Layers, Cpu, Compass, BookOpen, CheckCircle } from 'lucide-react';

export const FlutterCodeExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(FLUTTER_CODEBASE[1]); // lib/main.dart default
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner & Architecture Highlights */}
      <div className="bg-gradient-to-r from-slate-900 to-amber-950 text-white p-6 rounded-3xl border border-amber-500/20 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black">هيكلية كود فلاتر (Flutter Clean Architecture)</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              نموذج برمجيات متكامل Dart 3+ مع إدارة الحالة عبر Riverpod والتصميم المتكيف Material 3
            </p>
          </div>
        </div>

        {/* Architecture Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="text-amber-400 font-bold block mb-1">🏛️ N-Tier Clean Architecture</span>
            <span className="text-slate-300">فصل العرض (Presentation)، الدومين (Domain)، والبيانات (Data)</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="text-amber-400 font-bold block mb-1">⚡ Riverpod 2.x State Management</span>
            <span className="text-slate-300">إدارة تفاعلية للحالات وسائق الستوتة المباشر</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="text-amber-400 font-bold block mb-1">🗺️ GoRouter & Flutter Map</span>
            <span className="text-slate-300">تتبع الخرائط التفاعلية ضمن مدى 2 كم والتنقّلات</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
            <span className="text-amber-400 font-bold block mb-1">🎨 Material 3 + Cupertino</span>
            <span className="text-slate-300">تصميم عربي يدعم الخطوط والوضع الليلي/النهاري</span>
          </div>
        </div>
      </div>

      {/* Code File Explorer Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* File Tree Sidebar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider px-2 mb-3">
            ملفات المشروع (Flutter Dart Files)
          </h3>

          <div className="space-y-1">
            {FLUTTER_CODEBASE.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-right p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className="w-4 h-4 shrink-0" />
                    <span className="truncate">{file.path}</span>
                  </div>

                  <span className="text-[10px] opacity-75 font-mono uppercase px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">
                    {file.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code View Canvas */}
        <div className="lg:col-span-3 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
          
          {/* Code Header Bar */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-mono font-bold text-slate-300 mr-2">{selectedFile.path}</span>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'تم النسخ!' : 'نسخ الكود'}
            </button>
          </div>

          {/* Code Output */}
          <div className="p-5 overflow-x-auto font-mono text-xs text-emerald-400 leading-relaxed max-h-[600px] overflow-y-auto">
            <pre dir="ltr" className="whitespace-pre">
              <code>{selectedFile.code}</code>
            </pre>
          </div>

        </div>

      </div>

      {/* Step-by-Step Implementation Roadmap */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-600" />
          خارطة الطريق التنفيذية لتطوير باقي الوحدات (Step-by-Step Implementation Roadmap)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">المرحلة الأولى: البنية والخرائط</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              إعداد حزمة geolocator و flutter_map وبث موقع GPS الحي لسائق الستوتة كل 10 ثوانٍ عبر WebSockets / Firebase Realtime DB.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">المرحلة الثانية: الإشعارات والفيسبوك</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              تفعيل Firebase Cloud Messaging (FCM) لتنبيه السائق صوتياً بالطلب المباشر، وتكامل OAuth لربط حساب الفيسبوك.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">المرحلة الثالثة: الطلبات والمسارات</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              حساب المسار الأقصر نحو طالب الخدمة عبر OSRM / OpenStreetMap Routing وزر الموافقة الفورية مع إرسال وقت الوصول ETA.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
              4
            </span>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">المرحلة الرابعة: التقييمات والأمانة</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              شاشة تقييم أمانة ونزاهة صاحب الستوتة وترتيب السائقين الأعلى تقييماً في المنطقة لتعزيز الثقة المجتمعية.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
