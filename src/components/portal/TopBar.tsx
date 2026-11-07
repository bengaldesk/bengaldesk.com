'use client';

import React, { useState, useEffect } from 'react';
import { getFormattedHeaderDate } from '@/lib/bangla-date';
import { Language } from '@/types/news';
import { Search, Sun, Globe } from 'lucide-react';

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
    <div className="border-b border-gray-200 bg-gray-50/90 text-xs text-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Date & English Version Switcher (Replaced ঢাকা সংস্করণ) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="font-bold text-gray-950 min-h-[16px]">{headerDate}</span>
          <span className="text-gray-300">|</span>
          
          {/* User Request: ঢাকা সংস্করণ যেখানে লেখা আছে সেখানে দেবে English Version */}
          <button
            type="button"
            onClick={() => onLanguageChange(isBn ? 'en' : 'bn')}
            className="inline-flex items-center gap-1.5 font-bold text-gray-950 hover:text-red-700 transition-colors cursor-pointer group"
            title={isBn ? 'Switch to English Version' : 'বাংলা ভার্সনে পরিবর্তন করুন'}
          >
            <span className="w-2 h-2 rounded-full bg-red-700 group-hover:scale-125 transition-transform"></span>
            <span className="underline decoration-red-700/50 underline-offset-2">
              {isBn ? 'English Version' : 'বাংলা সংস্করণ'}
            </span>
          </button>
        </div>

        {/* Action Tools: Weather, Search & Language Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Weather preview */}
          <div className="hidden lg:flex items-center gap-1.5 text-gray-900 font-medium">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>{isBn ? 'ঢাকা ২৮° সে.' : 'Dhaka 28°C'}</span>
          </div>

          <span className="hidden lg:inline-block text-gray-300">|</span>

          {/* Professional Search Button with Ctrl+K shortcut badge */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded-full text-xs font-bold text-gray-950 transition-all shadow-2xs hover:border-gray-400 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-red-700" />
            <span>{isBn ? 'অনুসন্ধান' : 'Search'}</span>
            <kbd className="hidden sm:inline-block bg-gray-100 border border-gray-300 rounded px-1.5 py-0.2 text-[10px] text-gray-600 font-mono">
              Ctrl K
            </kbd>
          </button>

          <span className="text-gray-300">|</span>

          {/* Direct Language Switcher Toggle */}
          <div className="inline-flex items-center rounded-full bg-gray-200 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => onLanguageChange('bn')}
              className={`px-3 py-0.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isBn
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-gray-800 hover:text-gray-950'
              }`}
            >
              বাংলা
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-0.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                !isBn
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-gray-800 hover:text-gray-950'
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
