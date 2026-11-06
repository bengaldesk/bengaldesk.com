'use client';

import React, { useState } from 'react';
import { Article, Language } from '@/types/news';
import { formatTimeAgo, toBengaliNumber } from '@/lib/bangla-date';
import { Clock, Flame, ChevronRight } from 'lucide-react';

interface MainLeadSectionProps {
  articles: Article[];
  currentLang: Language;
  onSelectArticle: (article: Article) => void;
}

export const MainLeadSection: React.FC<MainLeadSectionProps> = ({
  articles,
  currentLang,
  onSelectArticle,
}) => {
  const isBn = currentLang === 'bn';
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');

  // Filter articles based on priority and language
  const langArticles = articles.filter((a) => a.language === currentLang);
  const mainLead = langArticles.find((a) => a.priority === 'MAIN_LEAD') || langArticles[0];
  const subLeads = langArticles.filter((a) => a.priority === 'SUB_LEAD').slice(0, 3);
  const opinion = langArticles.find((a) => a.priority === 'OPINION');

  // Latest vs popular lists
  const latestList = [...langArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  const popularList = [...langArticles]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);

  const currentTabList = activeTab === 'latest' ? latestList : popularList;

  if (!mainLead) return null;

  return (
    <section className="py-4 sm:py-6 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* ================= COLUMN 1: MAIN LEAD (6 COLS) ================= */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <article
              onClick={() => onSelectArticle(mainLead)}
              className="cursor-pointer group flex flex-col h-full active:opacity-90"
            >
              {/* Lead Image with cinematic 16:9 ratio */}
              <div className="relative overflow-hidden rounded-xs bg-gray-100 aspect-video mb-3 shadow-2xs">
                <img
                  src={mainLead.featuredImage.url}
                  alt={mainLead.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <span className="absolute bottom-2 left-2 bg-black/75 text-white text-[10px] sm:text-[11px] px-2 py-0.5 rounded backdrop-blur-xs">
                  {mainLead.featuredImage.credit}
                </span>
              </div>

              {/* Kicker / Subtitle */}
              {mainLead.subtitle && (
                <p className="text-xs sm:text-sm font-semibold text-[#052962] mb-1.5 line-clamp-1">
                  {mainLead.subtitle}
                </p>
              )}

              {/* Main Headline */}
              <h2
                className={`text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold text-gray-950 group-hover:text-[#052962] transition-colors mb-2 sm:mb-3 ${
                  isBn ? 'bn-headline' : 'en-headline'
                }`}
              >
                {mainLead.title}
              </h2>

              {/* Excerpt Summary */}
              <p
                className={`text-gray-700 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 md:line-clamp-4 ${
                  isBn ? 'bn-body' : 'en-body'
                }`}
              >
                {mainLead.excerpt}
              </p>

              {/* Author & Timestamp */}
              <div className="mt-auto pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] sm:text-xs text-gray-500">
                <span className="font-semibold text-gray-800">
                  {isBn ? mainLead.author.nameBn : mainLead.author.nameEn}
                  {mainLead.author.locationBn && ` (${isBn ? mainLead.author.locationBn : mainLead.author.locationEn})`}
                </span>
                <span suppressHydrationWarning className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTimeAgo(mainLead.publishedAt, currentLang)}
                </span>
              </div>
            </article>
          </div>

          {/* ================= COLUMN 2: SUB-LEADS (3 COLS) ================= */}
          {/* On Mobile: Becomes sleek horizontal list cards with thumbnail on right */}
          {/* On Desktop: Becomes vertical newspaper column */}
          <div className="lg:col-span-3 lg:border-l lg:border-gray-200 lg:pl-6 flex flex-col divide-y divide-gray-200">
            {subLeads.map((sub, idx) => (
              <article
                key={sub.id}
                onClick={() => onSelectArticle(sub)}
                className={`cursor-pointer group flex flex-row lg:flex-col justify-between items-start gap-3 sm:gap-4 py-3 sm:py-4 active:bg-gray-50 lg:active:bg-transparent ${
                  idx === 0 ? 'lg:pt-0' : ''
                }`}
              >
                {/* Left (on Mobile) / Bottom (on Desktop): Headline & Info */}
                <div className="flex-1 order-1 lg:order-2">
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#052962] uppercase tracking-wider mb-1 block">
                    {sub.tags[0] || 'সংবাদ'}
                  </span>
                  <h3
                    className={`text-sm sm:text-base lg:text-lg font-bold text-gray-900 group-hover:text-[#052962] transition-colors line-clamp-2 mb-1.5 ${
                      isBn ? 'bn-sublead' : 'en-headline'
                    }`}
                  >
                    {sub.title}
                  </h3>
                  <span suppressHydrationWarning className="text-[11px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(sub.publishedAt, currentLang)}
                  </span>
                </div>

                {/* Right (on Mobile) / Top (on Desktop): Thumbnail image */}
                <div className="w-24 h-18 sm:w-28 sm:h-20 lg:w-full lg:h-auto lg:aspect-16/10 shrink-0 overflow-hidden rounded-xs bg-gray-100 order-2 lg:order-1 mb-0 lg:mb-2.5">
                  <img
                    src={sub.featuredImage.url}
                    alt={sub.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </article>
            ))}
          </div>

          {/* ================= COLUMN 3: OPINION & MOST READ (3 COLS) ================= */}
          <div className="lg:col-span-3 lg:border-l lg:border-gray-200 lg:pl-6 flex flex-col space-y-5">
            
            {/* 1. Opinion Feature Box */}
            {opinion && (
              <div
                onClick={() => onSelectArticle(opinion)}
                className="bg-amber-50/70 border border-amber-200/90 rounded-xs p-3.5 sm:p-4 cursor-pointer group hover:bg-amber-50 hover:shadow-2xs transition-all active:opacity-90"
              >
                <div className="flex items-center justify-between border-b border-amber-200 pb-1.5 mb-2.5">
                  <span className="text-[11px] sm:text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-700"></span>
                    {isBn ? 'সম্পাদকীয় ও কলাম' : 'Opinion & Column'}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mb-2">
                  {opinion.author.avatarUrl && (
                    <img
                      src={opinion.author.avatarUrl}
                      alt={opinion.author.nameBn}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-red-700/80 shrink-0"
                    />
                  )}
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">
                      {isBn ? opinion.author.nameBn : opinion.author.nameEn}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-gray-600 line-clamp-1">
                      {isBn ? opinion.author.roleBn : opinion.author.roleEn}
                    </p>
                  </div>
                </div>

                <h3
                  className={`text-xs sm:text-sm md:text-base font-bold text-gray-900 group-hover:text-[#052962] transition-colors line-clamp-2 ${
                    isBn ? 'bn-headline' : 'en-headline'
                  }`}
                >
                  {opinion.title}
                </h3>
              </div>
            )}

            {/* 2. Interactive Tabs: Latest vs Popular */}
            <div className="border border-gray-200 rounded-xs bg-white overflow-hidden shadow-2xs">
              {/* Tab Header */}
              <div className="flex border-b border-gray-200 text-xs sm:text-sm font-bold bg-gray-50">
                <button
                  type="button"
                  onClick={() => setActiveTab('latest')}
                  className={`flex-1 py-2 sm:py-2.5 text-center transition-colors relative ${
                    activeTab === 'latest'
                      ? 'text-[#052962] bg-white font-extrabold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {isBn ? 'সর্বশেষ' : 'Latest'}
                  {activeTab === 'latest' && (
                    <span className="absolute top-0 left-0 w-full h-0.5 bg-[#052962]"></span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('popular')}
                  className={`flex-1 py-2 sm:py-2.5 text-center transition-colors relative ${
                    activeTab === 'popular'
                      ? 'text-[#052962] bg-white font-extrabold'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    {isBn ? 'সর্বাধিক পঠিত' : 'Most Read'}
                  </span>
                  {activeTab === 'popular' && (
                    <span className="absolute top-0 left-0 w-full h-0.5 bg-[#052962]"></span>
                  )}
                </button>
              </div>

              {/* Tab Items List */}
              <div className="p-2 sm:p-3 divide-y divide-gray-100">
                {currentTabList.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectArticle(item)}
                    className="py-2 sm:py-2.5 flex items-start gap-2.5 sm:gap-3 cursor-pointer group hover:bg-gray-50 px-1 rounded transition-colors active:bg-gray-100"
                  >
                    <span className="text-base sm:text-xl font-black text-gray-300 group-hover:text-red-700 transition-colors w-4 sm:w-5 shrink-0 text-center">
                      {isBn ? toBengaliNumber(idx + 1) : idx + 1}
                    </span>
                    <div className="flex-1">
                      <h4
                        className={`text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 ${
                          isBn ? 'bn-headline' : 'en-headline'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <span suppressHydrationWarning className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5 inline-block">
                        {formatTimeAgo(item.publishedAt, currentLang)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
