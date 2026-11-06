'use client';

import React from 'react';
import { Article, Language } from '@/types/news';
import { Quote, Feather, ChevronRight } from 'lucide-react';

interface OpinionSectionProps {
  articles: Article[];
  currentLang: Language;
  onSelectArticle: (article: Article) => void;
  onViewCategory?: (slug: string) => void;
}

export const OpinionSection: React.FC<OpinionSectionProps> = ({
  articles,
  currentLang,
  onSelectArticle,
  onViewCategory,
}) => {
  const isBn = currentLang === 'bn';

  // Filter opinion articles or high-level analysis
  const opinionArticles = articles
    .filter((a) => (a.category === 'opinion' || a.priority === 'OPINION') && a.language === currentLang)
    .slice(0, 4);

  // If not enough opinion items, grab from others with author
  const fallbackList = articles
    .filter((a) => a.language === currentLang && a.author)
    .slice(0, 4);

  const displayList = opinionArticles.length >= 2 ? opinionArticles : fallbackList;

  if (displayList.length === 0) return null;

  return (
    <section className="py-6 sm:py-8 bg-stone-50 border-y border-stone-200 my-6 sm:my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-2 mb-5 sm:mb-6 border-b-2 border-[#052962]">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-[#052962] text-white rounded-xs">
              <Feather className="w-4 h-4 text-white" />
            </span>
            <h3
              className={`text-lg sm:text-xl md:text-2xl font-bold text-gray-900 ${
                isBn ? 'bn-headline' : 'en-headline'
              }`}
            >
              {isBn ? 'মতামত ও সম্পাদকীয়' : 'Opinion & Editorial'}
            </h3>
          </div>
          {onViewCategory && (
            <button
              type="button"
              onClick={() => onViewCategory('opinion')}
              className="text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#052962] flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              <span>{isBn ? 'সব মতামত' : 'All Opinions'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#052962]" />
            </button>
          )}
        </div>

        {/* 4-Column Opinion Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {displayList.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectArticle(item)}
              className="bg-white border border-stone-200 rounded-sm p-4 sm:p-5 flex flex-col justify-between hover:shadow-md hover:border-[#052962]/40 transition-all cursor-pointer group relative"
            >
              <div className="relative">
                {/* Decorative quote icon */}
                <Quote className="w-8 h-8 text-stone-200 absolute -top-1 -right-1 pointer-events-none group-hover:text-blue-100 transition-colors" />

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-100 ring-2 ring-[#052962]/20 shrink-0">
                    <img
                      src={
                        item.author.avatarUrl ||
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
                      }
                      alt={item.author.nameBn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#052962] transition-colors line-clamp-1">
                      {isBn ? item.author.nameBn : item.author.nameEn}
                    </h4>
                    <p className="text-[11px] text-gray-500 line-clamp-1">
                      {isBn ? item.author.roleBn : item.author.roleEn}
                    </p>
                  </div>
                </div>

                {/* Headline / Column Title */}
                <h3
                  className={`text-sm sm:text-base font-bold text-gray-950 group-hover:text-[#052962] transition-colors leading-snug mb-2 line-clamp-3 ${
                    isBn ? 'bn-headline' : 'en-headline'
                  }`}
                >
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p
                  className={`text-xs text-gray-600 line-clamp-2 ${
                    isBn ? 'bn-body' : 'en-body'
                  }`}
                >
                  {item.excerpt}
                </p>
              </div>

              {/* Read column button */}
              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-gray-400">
                <span className="text-[#052962] font-semibold group-hover:underline">
                  {isBn ? 'কলাম পড়ুন →' : 'Read Column →'}
                </span>
                <span>{item.readTimeMinutes} {isBn ? 'মিনিট' : 'min'}</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
