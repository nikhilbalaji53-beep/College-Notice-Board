import React, { useState } from 'react';
import { AlertOctagon, ChevronRight, X, Sparkles, Clock } from 'lucide-react';
import { Notice } from '../types';

interface UrgentAlertBannerProps {
  urgentNotices: Notice[];
  onSelectNotice: (notice: Notice) => void;
}

export const UrgentAlertBanner: React.FC<UrgentAlertBannerProps> = ({
  urgentNotices,
  onSelectNotice,
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (dismissed || urgentNotices.length === 0) return null;

  const activeNotice = urgentNotices[currentIndex % urgentNotices.length];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-lg shadow-red-500/15 p-4 sm:p-5 mb-6 animate-fade-in">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        
        {/* Urgent Icon & Text */}
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md shrink-0 flex items-center justify-center">
            <AlertOctagon className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-white text-red-700 shadow-xs">
                Emergency Alert
              </span>
              <span className="flex items-center text-xs text-red-100 font-medium">
                <Clock className="w-3 h-3 mr-1" />
                Time Sensitive
              </span>
            </div>
            <h4 className="font-bold text-base sm:text-lg leading-snug text-white line-clamp-1">
              {activeNotice.title}
            </h4>
            <p className="text-xs text-red-100/90 line-clamp-1 max-w-2xl">
              {activeNotice.summary}
            </p>
          </div>
        </div>

        {/* Action Button & Carousel Controls */}
        <div className="flex items-center gap-2 sm:self-center shrink-0 justify-between sm:justify-end">
          {urgentNotices.length > 1 && (
            <div className="flex items-center gap-1 bg-black/20 backdrop-blur-xs px-2 py-1 rounded-lg text-xs">
              <span>{currentIndex + 1} of {urgentNotices.length}</span>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % urgentNotices.length)}
                className="ml-1 hover:text-red-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={() => onSelectNotice(activeNotice)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-red-700 hover:bg-red-50 font-bold text-xs shadow-md transition-transform active:scale-95"
          >
            <span>Read Circular</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-red-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
