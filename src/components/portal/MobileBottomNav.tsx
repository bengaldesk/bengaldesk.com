'use client';

import React from 'react';
import { Language, CategorySlug } from '@/types/news';
import { Home, Zap, Grid, Search, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentLang: Language;
  activeCategory: CategorySlug;
  onGoHome: () => void;
  onOpenCategories: () => void;
  onOpenSearch: () => void;
  onOpenBreaking: () => void;
  onOpenLogin: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentLang,
  activeCategory,
  onGoHome,
  onOpenCategories,
  onOpenSearch,
  onOpenBreaking,
  onOpenLogin,
}) => {
  const isBn = currentLang === 'bn';

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 lg:hidden shadow-lg safe-bottom">
      <div className="grid grid-cols-5 h-14">
        
        {/* 1. Home */}
        <button
          type="button"
          onClick={onGoHome}
          className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
            activeCategory === 'all' ? 'text-red-700 font-bold' : 'text-gray-600 hover:text-red-700'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">{isBn ? 'প্রচ্ছদ' : 'Home'}</span>
        </button>

        {/* 2. Breaking News */}
        <button
          type="button"
          onClick={onOpenBreaking}
          className="flex flex-col items-center justify-center gap-0.5 text-gray-600 hover:text-red-700 transition-colors"
        >
          <Zap className="w-5 h-5 text-red-600" />
          <span className="text-[10px]">{isBn ? 'ব্রেকিং' : 'Breaking'}</span>
        </button>

        {/* 3. Categories / Menu */}
        <button
          type="button"
          onClick={onOpenCategories}
          className={`flex flex-col items-center justify-center gap-0.5 transition-colors ${
            activeCategory !== 'all' ? 'text-red-700 font-bold' : 'text-gray-600 hover:text-red-700'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px]">{isBn ? 'বিভাগসমূহ' : 'Sections'}</span>
        </button>

        {/* 4. Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center gap-0.5 text-gray-600 hover:text-red-700 transition-colors"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px]">{isBn ? 'খুঁজুন' : 'Search'}</span>
        </button>

        {/* 5. Account / Admin shortcut */}
        <button
          type="button"
          onClick={onOpenLogin}
          className="flex flex-col items-center justify-center gap-0.5 text-gray-600 hover:text-red-700 transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">{isBn ? 'অ্যাকাউন্ট' : 'Account'}</span>
        </button>

      </div>
    </nav>
  );
};
