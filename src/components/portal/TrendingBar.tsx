'use client';

import React from 'react';
import { trendingTopics } from '@/data/categories';
import { Language } from '@/types/news';
import { TrendingUp } from 'lucide-react';

interface TrendingBarProps {
  currentLang: Language;
  onSelectTopic?: (topic: string) => void;
}

export const TrendingBar: React.FC<TrendingBarProps> = ({ currentLang, onSelectTopic }) => {
  const isBn = currentLang === 'bn';

  return (
    <div className="bg-gray-50/80 border-b border-gray-200 py-1.5 hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5 overflow-hidden flex-1">
          <span className="flex items-center gap-1 font-bold text-[#052962] shrink-0 text-xs tracking-tight">
            <TrendingUp className="w-3.5 h-3.5" />
            {isBn ? 'আলোচিত বিষয়:' : 'Trending Topics:'}
          </span>
          <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {trendingTopics.map((topic, idx) => {
              const label = isBn ? topic.bn : topic.en;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectTopic && onSelectTopic(label)}
                  className="bg-white border border-gray-200 hover:border-[#052962] hover:text-[#052962] text-gray-700 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-colors shrink-0 shadow-2xs cursor-pointer"
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
