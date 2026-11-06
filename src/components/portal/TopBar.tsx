'use client';

import React, { useState, useEffect } from 'react';
import { getFormattedHeaderDate } from '@/lib/bangla-date';
import { Language } from '@/types/news';
import { Search, BookOpen, Sun } from 'lucide-react';

interface TopBarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSearch: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenSearch,
}) => {
  const isBn = currentLang === 'bn';
  const [headerDate, setHeaderDate] = useState<string>('শুক্রবার, ২১ কার্তিক ১৪৩১');

  useEffect(() => {
    setHeaderDate(getFormattedHeaderDate(currentLang));
  }, [currentLang]);

  return (
    <div className="border-b border-gray-200 bg-gray-50/70 text-xs text-gray-600 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Date & Edition */}
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-700 min-h-[16px]">{headerDate}</span>
          <span className="hidden md:inline-block text-gray-300">|</span>
          <span className="hidden md:inline-flex items-center gap-1 text-gray-500">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            {isBn ? 'ঢাকা সংস্করণ' : 'Dhaka Edition'}
          </span>
        </div>

        {/* Action Tools & Language Switcher */}
        <div className="flex items-center gap-4">
          {/* Weather preview */}
          <div className="hidden lg:flex items-center gap-1.5 text-gray-600">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>{isBn ? 'ঢাকা ২৮° সে.' : 'Dhaka 28°C'}</span>
          </div>

          <span className="hidden lg:inline-block text-gray-300">|</span>

          {/* E-Paper Link placeholder */}
          <button
            type="button"
            className="hidden sm:flex items-center gap-1 font-medium hover:text-red-700 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-gray-500" />
            <span>{isBn ? 'ই-পেপার' : 'ePaper'}</span>
          </button>

          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-1 text-gray-600 hover:text-red-700 font-medium transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isBn ? 'খুঁজুন' : 'Search'}</span>
          </button>

          <span className="text-gray-300">|</span>

          {/* Language Switcher Button Toggle */}
          <div className="inline-flex items-center rounded-full bg-gray-200/80 p-0.5">
            <button
              type="button"
              onClick={() => onLanguageChange('bn')}
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                isBn
                  ? 'bg-[#052962] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                !isBn
                  ? 'bg-[#052962] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
