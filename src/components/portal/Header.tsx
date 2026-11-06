'use client';

import React from 'react';
import Link from 'next/link';
import { Language } from '@/types/news';
import { Menu, Bell, User, Bookmark } from 'lucide-react';
import { BrandLogo } from '@/components/portal/BrandLogo';

interface HeaderProps {
  currentLang: Language;
  onToggleMobileMenu: () => void;
  onGoHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleMobileMenu,
  onGoHome,
}) => {
  const isBn = currentLang === 'bn';

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5">
        <div className="flex items-center justify-between">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={onToggleMobileMenu}
              className="p-2 -ml-2 rounded-md text-gray-700 hover:text-[#052962] hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Left Decorative or Special Editions (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 w-1/4">
            <span className="inline-block px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#052962] bg-[#052962]/5 border border-[#052962]/20 rounded">
              {isBn ? 'সত্যের সন্ধানে' : 'Verified News'}
            </span>
            <span className="text-xs text-gray-500">
              {isBn ? 'সরাসরি সংবাদ আপডেট' : 'Live News Updates'}
            </span>
          </div>

          {/* Center: Main High-Grade Vector Brand Logo */}
          <div className="text-center flex-1 lg:w-2/4 flex justify-center">
            <BrandLogo
              variant="brand"
              className="w-56 sm:w-72 md:w-88 lg:w-[400px] h-auto"
              isBn={isBn}
              showTagline={true}
              onClick={onGoHome}
            />
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center justify-end gap-2 w-1/4">
            <button
              type="button"
              className="hidden sm:inline-flex items-center p-2 text-gray-600 hover:text-[#052962] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              title={isBn ? 'সংরক্ষিত খবর' : 'Saved Articles'}
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="hidden sm:inline-flex items-center p-2 text-gray-600 hover:text-[#052962] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              title={isBn ? 'বিজ্ঞপ্তি' : 'Notifications'}
            >
              <Bell className="w-4 h-4" />
            </button>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-[#052962] hover:bg-blue-50/50 border border-gray-300 rounded-md transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isBn ? 'লগইন' : 'Sign In'}</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};
