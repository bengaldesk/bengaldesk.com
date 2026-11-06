'use client';

import React from 'react';
import { categories } from '@/data/categories';
import { Language, CategorySlug } from '@/types/news';
import { X, Menu } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  selectedCategory: CategorySlug;
  onSelectCategory: (slug: CategorySlug) => void;
  isMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  selectedCategory,
  onSelectCategory,
  isMobileMenuOpen,
  onCloseMobileMenu,
}) => {
  const isBn = currentLang === 'bn';

  return (
    <>
      {/* Desktop & Tablet Sticky Navigation Bar - Dedicated 100% to Categories */}
      <nav className="sticky top-0 z-40 bg-white border-b-2 border-[#052962] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11 sm:h-12">
            
            {/* Category Navigation Items (Clean, No Scrollbar, Generous Spacing, Never Cut Off) */}
            <div
              className="flex items-center justify-start lg:justify-between w-full gap-2 sm:gap-3 md:gap-4 lg:gap-3 xl:gap-5 overflow-x-auto no-scrollbar py-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                const label = isBn ? cat.nameBn : cat.nameEn;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onSelectCategory(cat.slug)}
                    className={`shrink-0 whitespace-nowrap px-2 sm:px-2.5 py-1 text-xs sm:text-sm lg:text-[15px] font-bold transition-all relative ${
                      isActive
                        ? 'text-[#052962] font-black'
                        : 'text-gray-800 hover:text-[#052962]'
                    } ${isBn ? 'bn-ui' : 'font-sans'}`}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#052962]"></span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobileMenu}
        />
      )}

      {/* Mobile Sliding Navigation Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-700 rounded-xs"></span>
            <span className="font-bold text-gray-900 text-base">
              {isBn ? 'সকল বিভাগ' : 'All Categories'}
            </span>
          </div>
          <button
            type="button"
            onClick={onCloseMobileMenu}
            className="p-1.5 rounded-md text-gray-600 hover:text-red-700 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(100vh-80px)] divide-y divide-gray-100">
          <div className="py-2 space-y-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.slug;
              const label = isBn ? cat.nameBn : cat.nameEn;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    onCloseMobileMenu();
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-base font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#052962]/10 text-[#052962] font-bold'
                      : 'text-gray-800 hover:bg-gray-100 hover:text-[#052962]'
                  } ${isBn ? 'bn-ui' : 'font-sans'}`}
                >
                  <span>{label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#052962]"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
