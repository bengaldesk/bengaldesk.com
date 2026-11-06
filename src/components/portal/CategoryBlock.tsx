'use client';

import React from 'react';
import { Article, Language, CategorySlug } from '@/types/news';
import { categories } from '@/data/categories';
import { formatTimeAgo } from '@/lib/bangla-date';
import { ChevronRight, Clock } from 'lucide-react';

// Reliable SVG Data URI fallback that never fails even offline or if image 404s
const FALLBACK_SVG = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22500%22%20viewBox%3D%220%200%20800%20500%22%3E%3Crect%20fill%3D%22%23052962%22%20width%3D%22800%22%20height%3D%22500%22%2F%3E%3Ctext%20fill%3D%22%23ffffff%22%20font-family%3D%22sans-serif%22%20font-size%3D%2226%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%3E%E0%A6%A6%E0%A7%8D%E0%A6%AF%20%E0%A6%AC%E0%A7%87%E0%A6%99%E0%A7%8D%E0%A6%97%E0%A6%B2%20%E0%A6%A1%E0%A7%87%E0%A6%B8%E0%A7%8D%E0%A6%95%3C%2Ftext%3E%3C%2Fsvg%3E';

interface CategoryBlockProps {
  categorySlug: CategorySlug;
  articles: Article[];
  currentLang: Language;
  onSelectArticle: (article: Article) => void;
  onViewCategory: (slug: CategorySlug) => void;
  variant?: 'full' | 'compact';
}

export const CategoryBlock: React.FC<CategoryBlockProps> = ({
  categorySlug,
  articles,
  currentLang,
  onSelectArticle,
  onViewCategory,
  variant = 'full',
}) => {
  const isBn = currentLang === 'bn';
  const categoryInfo = categories.find((c) => c.slug === categorySlug);
  const categoryName = categoryInfo ? (isBn ? categoryInfo.nameBn : categoryInfo.nameEn) : categorySlug;

  // Filter articles belonging to this category and language
  const categoryArticles = articles.filter(
    (a) => a.category === categorySlug && a.language === currentLang
  );

  if (categoryArticles.length === 0) return null;

  const leadArticle = categoryArticles[0];
  const sideArticles = categoryArticles.slice(1, variant === 'compact' ? 3 : 4);

  // Compact Variant (Used for Dual-Column Side-by-Side Category Blocks)
  if (variant === 'compact') {
    return (
      <section className="py-4 sm:py-5 border-b border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-1.5 mb-3 border-b-2 border-[#052962]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-4 sm:h-5 bg-[#052962] inline-block rounded-2xs"></span>
            <h3
              className={`text-base sm:text-lg md:text-xl font-bold text-gray-900 ${
                isBn ? 'bn-headline' : 'en-headline'
              }`}
            >
              {categoryName}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onViewCategory(categorySlug)}
            className="text-xs font-semibold text-gray-500 hover:text-[#052962] flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            <span>{isBn ? 'আরও' : 'More'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#052962]" />
          </button>
        </div>

        {/* Compact Lead */}
        <article
          onClick={() => onSelectArticle(leadArticle)}
          className="cursor-pointer group mb-3.5 active:opacity-90"
        >
          <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-gray-100 aspect-16/10 mb-2 shadow-xs">
            <img
              src={leadArticle.featuredImage?.url || FALLBACK_SVG}
              alt={leadArticle.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = FALLBACK_SVG;
              }}
              className="w-full h-full object-cover"
            />
          </div>
          <h4
            className={`text-sm sm:text-base font-bold text-gray-950 group-hover:text-[#052962] transition-colors mb-1 line-clamp-2 ${
              isBn ? 'bn-headline' : 'en-headline'
            }`}
          >
            {leadArticle.title}
          </h4>
          <p className={`text-gray-600 text-xs line-clamp-2 mb-1.5 ${isBn ? 'bn-body' : 'en-body'}`}>
            {leadArticle.excerpt}
          </p>
          <span suppressHydrationWarning className="text-[10px] text-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatTimeAgo(leadArticle.publishedAt, currentLang)}
          </span>
        </article>

        {/* Compact Sub-items */}
        <div className="space-y-3 divide-y divide-gray-150 pt-1">
          {sideArticles.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectArticle(item)}
              className="pt-2.5 cursor-pointer group flex items-start gap-3 justify-between active:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h5
                  className={`text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#052962] transition-colors line-clamp-2 leading-snug mb-1 ${
                    isBn ? 'bn-sublead' : 'en-headline'
                  }`}
                >
                  {item.title}
                </h5>
                <span suppressHydrationWarning className="text-[10px] sm:text-[11px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(item.publishedAt, currentLang)}
                </span>
              </div>
              <div className="w-22 h-16 sm:w-26 sm:h-18 shrink-0 overflow-hidden rounded-lg bg-gray-100 shadow-2xs">
                <img
                  src={item.featuredImage?.url || FALLBACK_SVG}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_SVG;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  // Full Variant (1 Large Lead 7 cols + 3 Sides 5 cols)
  return (
    <section className="py-5 sm:py-6 border-b border-gray-200">
      {/* Category Section Header (Prothom Alo signature ribbon in Brand Color) */}
      <div className="flex items-center justify-between pb-2 mb-3.5 sm:mb-4 border-b-2 border-[#052962]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-5 sm:h-6 bg-[#052962] inline-block rounded-2xs"></span>
          <h3
            className={`text-lg sm:text-xl md:text-2xl font-bold text-gray-900 ${
              isBn ? 'bn-headline' : 'en-headline'
            }`}
          >
            {categoryName}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onViewCategory(categorySlug)}
          className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#052962] flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          <span>{isBn ? 'আরও খবর' : 'More'}</span>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#052962]" />
        </button>
      </div>

      {/* Category Grid: 1 Lead + 3 Side Items */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Category Lead (7 cols) */}
        <article
          onClick={() => onSelectArticle(leadArticle)}
          className="md:col-span-7 cursor-pointer group flex flex-col justify-between active:opacity-90"
        >
          <div>
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 aspect-16/10 mb-2.5 shadow-xs">
              <img
                src={leadArticle.featuredImage?.url || FALLBACK_SVG}
                alt={leadArticle.title}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_SVG;
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <h4
              className={`text-base sm:text-xl md:text-2xl font-bold text-gray-950 group-hover:text-[#052962] transition-colors mb-1.5 sm:mb-2 ${
                isBn ? 'bn-headline' : 'en-headline'
              }`}
            >
              {leadArticle.title}
            </h4>

            <p
              className={`text-gray-600 text-xs sm:text-sm mb-2.5 line-clamp-2 ${
                isBn ? 'bn-body' : 'en-body'
              }`}
            >
              {leadArticle.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span className="font-medium text-gray-700">{isBn ? leadArticle.author.nameBn : leadArticle.author.nameEn}</span>
            <span suppressHydrationWarning className="flex items-center gap-1 text-gray-400">
              <Clock className="w-3 h-3" />
              {formatTimeAgo(leadArticle.publishedAt, currentLang)}
            </span>
          </div>
        </article>

        {/* Side Items (5 cols): Responsive horizontal card on all devices */}
        <div className="md:col-span-5 flex flex-col divide-y divide-gray-100">
          {sideArticles.length > 0 ? (
            sideArticles.map((item, idx) => (
              <article
                key={item.id}
                onClick={() => onSelectArticle(item)}
                className={`cursor-pointer group flex gap-3 items-start py-3 active:bg-gray-50 transition-colors ${
                  idx === 0 ? 'md:pt-0' : ''
                }`}
              >
                <div className="flex-1">
                  <h5
                    className={`text-xs sm:text-sm md:text-base font-bold text-gray-900 group-hover:text-[#052962] transition-colors line-clamp-2 mb-1 ${
                      isBn ? 'bn-sublead' : 'en-headline'
                    }`}
                  >
                    {item.title}
                  </h5>
                  <span suppressHydrationWarning className="text-[10px] sm:text-[11px] text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(item.publishedAt, currentLang)}
                  </span>
                </div>
                <div className="w-24 h-16 sm:w-28 sm:h-20 shrink-0 overflow-hidden rounded-lg sm:rounded-xl bg-gray-100 shadow-2xs">
                  <img
                    src={item.featuredImage?.url || FALLBACK_SVG}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_SVG;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </article>
            ))
          ) : (
            <div className="py-4 text-xs text-gray-400 italic">
              {isBn ? 'এই বিভাগে আরও সংবাদ দ্রুত যুক্ত হচ্ছে...' : 'More news coming soon...'}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
