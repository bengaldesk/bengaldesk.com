'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TopBar } from '@/components/portal/TopBar';
import { Header } from '@/components/portal/Header';
import { Navbar } from '@/components/portal/Navbar';
import { Footer } from '@/components/portal/Footer';
import { BackToTop } from '@/components/portal/BackToTop';
import { Language } from '@/types/news';
import { ChevronRight, Home, Shield, FileText, Megaphone, Archive, Users, PhoneCall, CheckCircle } from 'lucide-react';

interface InfoPageLayoutProps {
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  activePath: '/about' | '/privacy' | '/terms' | '/contact' | '/advertise' | '/archive' | '/editorial-policy';
  children: React.ReactNode;
}

const navLinks = [
  { href: '/about', labelBn: 'আমাদের সম্পর্কে', labelEn: 'About Us', icon: Users },
  { href: '/editorial-policy', labelBn: 'সম্পাদকীয় নীতিমালা', labelEn: 'Editorial Policy', icon: CheckCircle },
  { href: '/privacy', labelBn: 'গোপনীয়তা নীতি', labelEn: 'Privacy Policy', icon: Shield },
  { href: '/terms', labelBn: 'ব্যবহারের শর্তাবলী', labelEn: 'Terms of Use', icon: FileText },
  { href: '/advertise', labelBn: 'বিজ্ঞাপন ও রেটকার্ড', labelEn: 'Advertise', icon: Megaphone },
  { href: '/contact', labelBn: 'যোগাযোগ ও নিউজরুম', labelEn: 'Contact Us', icon: PhoneCall },
  { href: '/archive', labelBn: 'সংবাদ আর্কাইভ', labelEn: 'News Archive', icon: Archive },
];

export const InfoPageLayout: React.FC<InfoPageLayoutProps> = ({
  titleBn,
  titleEn,
  subtitleBn,
  subtitleEn,
  activePath,
  children,
}) => {
  const [currentLang, setCurrentLang] = useState<Language>('bn');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isBn = currentLang === 'bn';

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 text-gray-900 selection:bg-[#052962] selection:text-white">
      {/* 1. Top Bar */}
      <TopBar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenSearch={() => {}}
      />

      {/* 2. Header */}
      <Header
        currentLang={currentLang}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* 3. Sticky Navbar */}
      <Navbar
        currentLang={currentLang}
        selectedCategory="all"
        onSelectCategory={() => {}}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* 4. Page Hero / Header Banner */}
      <div className="bg-[#052962] text-white py-8 sm:py-12 border-b border-blue-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-blue-200 mb-3" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>{isBn ? 'প্রচ্ছদ' : 'Home'}</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-blue-300" />
            <span className="text-white font-semibold">{isBn ? titleBn : titleEn}</span>
          </nav>

          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight ${isBn ? 'bn-headline' : 'en-headline'}`}>
            {isBn ? titleBn : titleEn}
          </h1>
          <p className={`text-blue-100/90 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed ${isBn ? 'bn-body' : 'en-body'}`}>
            {isBn ? subtitleBn : subtitleEn}
          </p>

        </div>
      </div>

      {/* 5. Main Content with Sidebar */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar (3 cols) */}
          <aside className="lg:col-span-3 bg-white border border-gray-200 rounded-xl p-4 shadow-xs sticky top-20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 px-2">
              {isBn ? 'নীতিমালা ও তথ্য' : 'Policies & Info'}
            </h3>
            <nav className="space-y-1">
              {navLinks.map((item) => {
                const isActive = item.href === activePath;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#052962] text-white shadow-xs'
                        : 'text-gray-700 hover:bg-blue-50/60 hover:text-[#052962]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-gray-400'}`} />
                    <span>{isBn ? item.labelBn : item.labelEn}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-gray-100 px-2 text-xs text-gray-500 space-y-1">
              <p className="font-bold text-gray-800">{isBn ? 'দ্য বেঙ্গল ডেস্ক ডিজিটাল' : 'The Bengal Desk Digital'}</p>
              <p>{isBn ? 'কপিরাইট © ২০২৬' : 'Copyright © 2026'}</p>
              <p>{isBn ? 'সর্বস্বত্ব সংরক্ষিত' : 'All rights reserved'}</p>
            </div>
          </aside>

          {/* Right Main Body Content (9 cols) */}
          <div className="lg:col-span-9 bg-white border border-gray-200 rounded-xl p-6 sm:p-8 md:p-10 shadow-xs">
            {children}
          </div>

        </div>
      </main>

      {/* 6. Footer */}
      <Footer currentLang={currentLang} />

      {/* 7. Floating Back to Top */}
      <BackToTop />
    </div>
  );
};
