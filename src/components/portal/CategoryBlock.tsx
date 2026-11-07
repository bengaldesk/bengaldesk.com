'use client';

import React from 'react';
import { Article, Language, CategorySlug } from '@/types/news';
import { formatTimeAgo } from '@/lib/bangla-date';
import { categories } from '@/data/categories';
import { ChevronRight, Clock } from 'lucide-react';

interface CategoryBlockProps {
  categorySlug: CategorySlug;
  articles: Article[];
  currentLang: Language;
  onSelectArticle: (article: Article) => void;
  onViewCategory: (slug: CategorySlug) => void;
  variant?: 'compact' | 'full';
}

const FALLBACK_SVG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect fill="%23f3f4f6" width="400" height="250"/><text fill="%239ca3af" font-family="sans-serif" font-size="14" dy="10.5" font-weight="bold" x="50%" y="50%" text-anchor="middle">দ্য বেঙ্গল ডেস্ক</text></svg>';

export const CategoryBlock: React.FC<CategoryBlockProps> = ({
  categorySlug,
  articles,
  currentLang,
  onSelectArticle,
  onViewCategory,
  variant = 'compact',
}) => {
  const isBn = currentLang === 'bn';

  // Find category object to ensure Bengali name in Bengali mode
  const catObj = categories.find((c) => c.slug === categorySlug);
  const categoryName = catObj ? (isBn ? catObj.nameBn : catObj.nameEn) : categorySlug;

  // Filter articles for this category and language
  const categoryArticles = articles.filter(
    (a) => a.category === categorySlug && a.language === currentLang
  );

  if (categoryArticles.length === 0) return null;

  const leadArticle = categoryArticles[0];
  const secondLeadArticle = categoryArticles[1] || categoryArticles[0];
  const sideArticles = categoryArticles.slice(variant === 'compact' ? 1 : 2, variant === 'compact' ? 4 : 6);

  // Compact Variant (Used for Dual-Column Side-by-Side Category Blocks on Home)
  if (variant === 'compact') {
    return (
      <section className="py-4 sm:py-5 border-b border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-1.5 mb-3.5 border-b-2 border-red-700">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-5 bg-red-700 inline-block rounded-2xs"></span>
            <h3
              className={`text-lg sm:text-xl font-black text-gray-950 ${
                isBn ? 'bn-headline' : 'en-headline'
              }`}
            >
              {categoryName}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onViewCategory(categorySlug)}
            className="text-xs sm:text-sm font-bold text-gray-800 hover:text-red-700 flex items-center gap-0.5 transition-colors cursor-pointer"
          >
            <span>{isBn ? 'আরও' : 'More'}</span>
            <ChevronRight className="w-4 h-4 text-red-700" />
          </button>
        </div>

        {/* Compact Lead */}
        <article
          onClick={() => onSelectArticle(leadArticle)}
          className="cursor-pointer group mb-4 active:opacity-90"
        >
          <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-16/10 mb-2.5 shadow-xs">
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

          {/* Subtitle / Kicker (ALWAYS RED) */}
          {leadArticle.subtitle && (
            <p className="text-xs font-bold text-red-700 mb-1 line-clamp-1">
              {leadArticle.subtitle}
            </p>
          )}

          <h4
            className={`text-base sm:text-lg font-bold text-gray-950 group-hover:text-red-700 transition-colors mb-1.5 line-clamp-2 leading-snug ${
              isBn ? 'bn-headline' : 'en-headline'
            }`}
          >
            {leadArticle.title}
          </h4>

          <p className={`text-gray-800 text-xs sm:text-sm line-clamp-2 mb-2 ${isBn ? 'bn-body' : 'en-body'}`}>
            {leadArticle.excerpt}
          </p>

          {/* Author Byline with Circular Avatar + Timestamp */}
          <div className="flex items-center justify-between text-xs text-gray-700 pt-1.5 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {leadArticle.author?.avatarUrl ? (
                <img
                  src={leadArticle.author.avatarUrl}
                  alt={leadArticle.author.nameBn}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-200"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-red-700 text-white font-bold flex items-center justify-center text-[10px]">
                  {(isBn ? leadArticle.author.nameBn : leadArticle.author.nameEn)[0]}
                </div>
              )}
              <span className="font-bold text-gray-900 text-xs">
                {isBn ? leadArticle.author.nameBn : leadArticle.author.nameEn}
              </span>
            </div>
            <span suppressHydrationWarning className="flex items-center gap-1 text-gray-600 font-medium text-[11px]">
              <Clock className="w-3 h-3 text-gray-500" />
              {formatTimeAgo(leadArticle.publishedAt, currentLang)}
            </span>
          </div>
        </article>

        {/* Compact Sub-items: Horizontal cards */}
        <div className="space-y-3 divide-y divide-gray-150 pt-1">
          {categoryArticles.slice(1, 3).map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectArticle(item)}
              className="pt-2.5 cursor-pointer group flex items-start gap-3 justify-between active:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <h5
                  className={`text-xs sm:text-sm font-bold text-gray-950 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug mb-1 ${
                    isBn ? 'bn-sublead' : 'en-headline'
                  }`}
                >
                  {item.title}
                </h5>
                <span suppressHydrationWarning className="text-[11px] text-gray-600 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-500" />
                  {formatTimeAgo(item.publishedAt, currentLang)}
                </span>
              </div>
              <div className="w-22 h-16 sm:w-24 sm:h-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 shadow-2xs">
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

  // Full Variant:
  // User instruction: "এইভাবে সেকশনগুলোতে যেটাকে হাইলাইট করা হচ্ছে নিউজ সেটাকে এতো বড় না করে দুইটা রাখা যায় পিসি ভিউতে । তবে মোবাইলে একটাঈ থাকবে"
  // On PC: 2 Highlighted Lead Cards side-by-side (`grid-cols-1 md:grid-cols-2`)
  // On Mobile: Only 1 lead card!
  return (
    <section className="py-5 sm:py-6 border-b border-gray-200">
      {/* Category Section Header */}
      <div className="flex items-center justify-between pb-2 mb-4 sm:mb-5 border-b-2 border-red-700">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-6 bg-red-700 inline-block rounded-2xs"></span>
          <h3
            className={`text-xl sm:text-2xl font-black text-gray-950 ${
              isBn ? 'bn-headline' : 'en-headline'
            }`}
          >
            {categoryName}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => onViewCategory(categorySlug)}
          className="text-xs sm:text-sm font-bold text-gray-800 hover:text-red-700 flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          <span>{isBn ? 'আরও খবর' : 'More'}</span>
          <ChevronRight className="w-4 h-4 text-red-700" />
        </button>
      </div>

      {/* Featured Highlighted Grid: 2 Cards on PC, 1 Card on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5">
        
        {/* Highlight 1 (Lead Article) */}
        <article
          onClick={() => onSelectArticle(leadArticle)}
          className="cursor-pointer group flex flex-col justify-between active:opacity-90"
        >
          <div>
            <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-16/10 mb-2.5 shadow-xs">
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

            {/* Kicker / Shoulder (ALWAYS RED) */}
            {leadArticle.subtitle && (
              <p className="text-xs font-bold text-red-700 mb-1 line-clamp-1">
                {leadArticle.subtitle}
              </p>
            )}

            <h4
              className={`text-base sm:text-lg md:text-xl font-bold text-gray-950 group-hover:text-red-700 transition-colors mb-1.5 leading-snug ${
                isBn ? 'bn-headline' : 'en-headline'
              }`}
            >
              {leadArticle.title}
            </h4>

            <p
              className={`text-gray-800 text-xs sm:text-sm mb-2.5 line-clamp-2 ${
                isBn ? 'bn-body' : 'en-body'
              }`}
            >
              {leadArticle.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-700 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {leadArticle.author?.avatarUrl ? (
                <img
                  src={leadArticle.author.avatarUrl}
                  alt={leadArticle.author.nameBn}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-200"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-red-700 text-white font-bold flex items-center justify-center text-[10px]">
                  {(isBn ? leadArticle.author.nameBn : leadArticle.author.nameEn)[0]}
                </div>
              )}
              <span className="font-bold text-gray-900 text-xs">
                {isBn ? leadArticle.author.nameBn : leadArticle.author.nameEn}
              </span>
            </div>
            <span suppressHydrationWarning className="flex items-center gap-1 text-gray-600 font-medium">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              {formatTimeAgo(leadArticle.publishedAt, currentLang)}
            </span>
          </div>
        </article>

        {/* Highlight 2 (Visible on PC, hidden on mobile as requested) */}
        {categoryArticles.length > 1 && (
          <article
            onClick={() => onSelectArticle(secondLeadArticle)}
            className="hidden md:flex cursor-pointer group flex-col justify-between active:opacity-90"
          >
            <div>
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-16/10 mb-2.5 shadow-xs">
                <img
                  src={secondLeadArticle.featuredImage?.url || FALLBACK_SVG}
                  alt={secondLeadArticle.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_SVG;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Kicker / Shoulder (ALWAYS RED) */}
              {secondLeadArticle.subtitle && (
                <p className="text-xs font-bold text-red-700 mb-1 line-clamp-1">
                  {secondLeadArticle.subtitle}
                </p>
              )}

              <h4
                className={`text-base sm:text-lg md:text-xl font-bold text-gray-950 group-hover:text-red-700 transition-colors mb-1.5 leading-snug ${
                  isBn ? 'bn-headline' : 'en-headline'
                }`}
              >
                {secondLeadArticle.title}
              </h4>

              <p
                className={`text-gray-800 text-xs sm:text-sm mb-2.5 line-clamp-2 ${
                  isBn ? 'bn-body' : 'en-body'
                }`}
              >
                {secondLeadArticle.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-700 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {secondLeadArticle.author?.avatarUrl ? (
                  <img
                    src={secondLeadArticle.author.avatarUrl}
                    alt={secondLeadArticle.author.nameBn}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-200"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-red-700 text-white font-bold flex items-center justify-center text-[10px]">
                    {(isBn ? secondLeadArticle.author.nameBn : secondLeadArticle.author.nameEn)[0]}
                  </div>
                )}
                <span className="font-bold text-gray-900 text-xs">
                  {isBn ? secondLeadArticle.author.nameBn : secondLeadArticle.author.nameEn}
                </span>
              </div>
              <span suppressHydrationWarning className="flex items-center gap-1 text-gray-600 font-medium">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                {formatTimeAgo(secondLeadArticle.publishedAt, currentLang)}
              </span>
            </div>
          </article>
        )}

      </div>

      {/* Secondary Horizontal Items */}
      {sideArticles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-3 border-t border-gray-150">
          {sideArticles.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectArticle(item)}
              className="cursor-pointer group flex gap-3 items-start py-1 active:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <h5
                  className={`text-xs sm:text-sm font-bold text-gray-950 group-hover:text-red-700 transition-colors line-clamp-2 mb-1 leading-snug ${
                    isBn ? 'bn-sublead' : 'en-headline'
                  }`}
                >
                  {item.title}
                </h5>
                <span suppressHydrationWarning className="text-[11px] text-gray-600 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-500" />
                  {formatTimeAgo(item.publishedAt, currentLang)}
                </span>
              </div>
              <div className="w-20 h-14 sm:w-22 sm:h-15 shrink-0 overflow-hidden rounded-lg bg-gray-100 shadow-2xs">
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
      )}
    </section>
  );
};
