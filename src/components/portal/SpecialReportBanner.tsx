'use client';

import React from 'react';
import { Article, Language } from '@/types/news';
import { formatTimeAgo } from '@/lib/bangla-date';
import { ShieldAlert, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface SpecialReportBannerProps {
  articles: Article[];
  currentLang: Language;
  onSelectArticle: (article: Article) => void;
}

export const SpecialReportBanner: React.FC<SpecialReportBannerProps> = ({
  articles,
  currentLang,
  onSelectArticle,
}) => {
  const isBn = currentLang === 'bn';

  // Find a high-priority economy or politics or lead article for special spotlight
  const langArticles = articles.filter((a) => a.language === currentLang);
  const specialArticle =
    langArticles.find((a) => a.priority === 'CATEGORY_LEAD' && (a.category === 'economy' || a.category === 'bangladesh')) ||
    langArticles[0];

  if (!specialArticle) return null;

  return (
    <section className="py-6 sm:py-8 bg-gradient-to-r from-[#031c44] via-[#052962] to-[#0a3875] text-white my-6 sm:my-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Top Label */}
        <div className="flex items-center justify-between pb-3 mb-4 sm:mb-6 border-b border-white/15">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-amber-400/20 text-amber-300 rounded">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </span>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300">
              {isBn ? 'দ্য বেঙ্গল ডেস্ক বিশেষ প্রতিবেদন' : 'The Bengal Desk In-Depth'}
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-blue-200">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-300" />
            {isBn ? 'অনুসন্ধানী সাংবাদিকতা' : 'Investigative Journalism'}
          </span>
        </div>

        {/* Feature Grid */}
        <div
          onClick={() => onSelectArticle(specialArticle)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center cursor-pointer group"
        >
          {/* Image (7 cols) */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-xl sm:rounded-2xl aspect-16/10 sm:aspect-16/9 bg-slate-800 shadow-xl border border-white/10">
            <img
              src={specialArticle.featuredImage?.url}
              alt={specialArticle.title}
              className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            {specialArticle.featuredImage?.caption && (
              <p className="absolute bottom-2.5 left-3 right-3 text-white/90 text-xs line-clamp-1">
                {specialArticle.featuredImage.caption}
              </p>
            )}
          </div>

          {/* Text Content (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="inline-block px-2.5 py-0.5 text-[11px] font-bold text-amber-300 bg-amber-400/10 border border-amber-300/30 rounded w-fit mb-2.5">
              {specialArticle.subtitle || (isBn ? 'বিশেষ অনুসন্ধান' : 'Exclusive')}
            </span>

            <h3
              className={`text-xl sm:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-blue-200 transition-colors mb-3 leading-snug ${
                isBn ? 'bn-headline' : 'en-headline'
              }`}
            >
              {specialArticle.title}
            </h3>

            <p
              className={`text-blue-100/90 text-xs sm:text-sm lg:text-[15px] mb-4 line-clamp-3 leading-relaxed ${
                isBn ? 'bn-body' : 'en-body'
              }`}
            >
              {specialArticle.excerpt}
            </p>

            <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-blue-200">
              <span className="font-semibold text-white">
                {isBn ? specialArticle.author.nameBn : specialArticle.author.nameEn}
              </span>
              <div className="flex items-center gap-3">
                <span suppressHydrationWarning className="flex items-center gap-1 text-blue-200">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTimeAgo(specialArticle.publishedAt, currentLang)}
                </span>
                <span className="inline-flex items-center gap-1 text-amber-300 font-bold group-hover:translate-x-1 transition-transform">
                  <span>{isBn ? 'সম্পূর্ণ পড়ুন' : 'Read Full'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
