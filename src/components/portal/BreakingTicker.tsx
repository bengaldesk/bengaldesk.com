'use client';

import React from 'react';
import { Article, Language } from '@/types/news';
import { Zap, ChevronRight } from 'lucide-react';

interface BreakingTickerProps {
  articles: Article[];
  currentLang: Language;
  onSelectArticle: (article: Article) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({
  articles,
  currentLang,
  onSelectArticle,
}) => {
  const isBn = currentLang === 'bn';
  const breakingNews = articles.filter((a) => a.isBreaking);

  if (breakingNews.length === 0) return null;

  const currentItem = breakingNews[0];

  return (
    <div className="bg-red-50 border-y border-red-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Breaking news animated badge */}
          <div className="shrink-0 flex items-center gap-1.5 bg-red-700 text-white px-2.5 py-1 rounded text-xs font-bold tracking-wider uppercase shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <Zap className="w-3.5 h-3.5" />
            <span className={isBn ? 'bn-badge' : 'font-sans'}>
              {isBn ? 'ব্রেকিং নিউজ' : 'BREAKING'}
            </span>
          </div>

          {/* Headline link */}
          <button
            type="button"
            onClick={() => onSelectArticle(currentItem)}
            className="flex-1 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-900 hover:text-red-700 transition-colors truncate flex items-center gap-2 group"
          >
            <span className={isBn ? 'bn-headline' : 'font-sans font-medium'}>
              {currentItem.title}
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-700 shrink-0 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
