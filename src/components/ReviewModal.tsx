import React, { useState } from 'react';
import { ServiceOrder, Review } from '../types';
import { X, Star, Send, CheckCircle } from 'lucide-react';

interface ReviewModalProps {
  order: ServiceOrder | null;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  order,
  onClose,
  onSubmitReview,
}) => {
  if (!order) return null;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('صاحب خدمة أمين وعملي ونزيه جداً. أنصح بالتعامل معه.');
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: `rev_${Date.now()}`,
      stootaId: order.stootaId,
      customerName: order.customerName,
      rating,
      comment,
      date: 'الآن',
      serviceType: order.category,
    };

    onSubmitReview(newReview);
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3">
      <div className="bg-white dark:bg-slate-900 w-full max-w-[410px] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="p-4 bg-amber-600 text-white flex items-center justify-between">
          <div>
            <h3 className="font-black text-lg">تقييم الخدمة المقدمة</h3>
            <p className="text-xs text-amber-100">البائع: {order.stootaDriverName}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full bg-black/20 hover:bg-black/40 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isDone ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">شكراً لك! تم إضافة تقييمك بنجاح.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 text-center">
                قيم أمانة وجودة ونزاهة صاحب الستوتة:
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                اكتب تعليقك وتجربتك مع الخدمة:
              </label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              نشر التقييم والتعليق
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
