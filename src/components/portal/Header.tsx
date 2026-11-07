'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Language } from '@/types/news';
import { Menu, Search, User, Bookmark, LogOut, ChevronDown, Shield } from 'lucide-react';
import { BrandLogo } from '@/components/portal/BrandLogo';
import { NotificationPopover } from '@/components/portal/NotificationPopover';

interface HeaderProps {
  currentLang: Language;
  onToggleMobileMenu: () => void;
  onGoHome?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleMobileMenu,
  onGoHome,
  onOpenSearch,
}) => {
  const isBn = currentLang === 'bn';
  const { user, isAuthenticated, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isUserMenuOpen]);

  return (
    <header className="border-b border-[#031c44] bg-[#052962] text-white shadow-md relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          
          {/* ================= LEFT MODULE (Mobile Menu & Desktop Tag) ================= */}
          <div className="flex items-center gap-3 w-auto lg:w-1/4">
            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={onToggleMobileMenu}
              className="p-2 -ml-2 rounded-lg text-white hover:bg-white/15 transition-colors cursor-pointer lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Decorative Tag */}
            <div className="hidden lg:flex items-center gap-2.5">
              <span className="inline-block px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white bg-white/15 border border-white/20 rounded shadow-2xs">
                {isBn ? 'সত্যের সন্ধানে' : 'Verified News'}
              </span>
              <span className="text-xs text-blue-200 font-medium">
                {isBn ? 'সরাসরি সংবাদ' : 'Live Updates'}
              </span>
            </div>
          </div>

          {/* ================= CENTER MODULE: HIGH-GRADE VECTOR WHITE BRAND LOGO ================= */}
          {/* User Request: হেডারে লোগোর প্লেসিং অত্যন্ত প্রফেশনাল হতে হবে */}
          <div className="text-center flex-1 flex justify-center py-0.5">
            <BrandLogo
              variant="white"
              className="w-52 sm:w-68 md:w-80 lg:w-[380px] h-auto cursor-pointer"
              isBn={isBn}
              showTagline={true}
              onClick={onGoHome}
            />
          </div>

          {/* ================= RIGHT MODULE: SEARCH, NOTIFICATIONS & ACCOUNT ================= */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 w-auto lg:w-1/4">
            
            {/* 1. Quick Search Trigger */}
            {onOpenSearch && (
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2 text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
                title={isBn ? 'অনুসন্ধান' : 'Search'}
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            )}

            {/* 2. 100% Functional Notification Popover (Connected with User Account) */}
            <NotificationPopover currentLang={currentLang} />

            {/* 3. Saved Articles Bookmark */}
            <button
              type="button"
              className="hidden sm:inline-flex items-center p-2 text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
              title={isBn ? 'সংরক্ষিত সংবাদ' : 'Saved Articles'}
            >
              <Bookmark className="w-4 h-4 text-white" />
            </button>

            {/* 4. User Account / Login Button */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-white/15 hover:bg-white/25 border border-white/30 rounded-full text-xs font-bold transition-all cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-red-700 text-white font-bold flex items-center justify-center text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-blue-200" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 text-gray-900 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                    <div className="px-3.5 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-950 truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                    </div>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-gray-800 hover:bg-gray-100 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-red-700" />
                        <span>{isBn ? 'অ্যাডমিন প্যানেল' : 'Admin Desk'}</span>
                      </Link>
                    )}

                    <Link
                      href="/archive"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-gray-500" />
                      <span>{isBn ? 'সংরক্ষিত খবর' : 'Saved News'}</span>
                    </Link>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{isBn ? 'লগআউট' : 'Sign Out'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-md transition-all shadow-2xs hover:scale-105 active:scale-95"
              >
                <User className="w-3.5 h-3.5" />
                <span>{isBn ? 'লগইন' : 'Sign In'}</span>
              </Link>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
