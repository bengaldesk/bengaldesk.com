'use client';

import React, { useState } from 'react';
import { Article, Language } from '@/types/news';
import { formatTimeAgo, toBengaliNumber } from '@/lib/bangla-date';
import { categories } from '@/data/categories';
import { SocialShareBar } from '@/components/portal/SocialShareBar';
import { CommentSection } from '@/components/portal/CommentSection';
import {
  Clock,
  Volume2,
  VolumeX,
  ChevronLeft,
  ArrowRight,
} from 'lucide-react';

interface ArticleDetailViewProps {
  article: Article;
  allArticles: Article[];
  currentLang: Language;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onSwitchLanguage: (targetLang: Language, counterpartArticleId?: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  allArticles,
  currentLang,
  onBack,
  onSelectArticle,
  onSwitchLanguage,
}) => {
  const isBn = currentLang === 'bn';
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Map category slug to proper Bengali or English label
  const getCategoryName = (slug: string) => {
    const found = categories.find((c) => c.slug === slug);
    if (found) return isBn ? found.nameBn : found.nameEn;
    const bnCategoryMap: Record<string, string> = {
      bangladesh: 'বাংলাদেশ',
      politics: 'রাজনীতি',
      economy: 'অর্থনীতি',
      world: 'আন্তর্জাতিক',
      sports: 'খেলাধুলা',
      entertainment: 'বিনোদন',
      technology: 'প্রযুক্তি',
      opinion: 'মতামত',
      lifestyle: 'জীবনযাপন',
    };
    return isBn ? (bnCategoryMap[slug.toLowerCase()] || slug) : slug.toUpperCase();
  };

  // Find counterpart article in other language if available
  const counterpartArticle = article.translationOfId
    ? allArticles.find((a) => a.id === article.translationOfId)
    : allArticles.find((a) => a.translationOfId === article.id);

  // Related articles
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.language === currentLang)
    .slice(0, 3);

  const fontSizeClass =
    fontSize === 'xlarge'
      ? 'text-lg sm:text-2xl leading-loose'
      : fontSize === 'large'
      ? 'text-base sm:text-xl leading-relaxed'
      : 'text-sm sm:text-lg leading-relaxed';

  return (
    <article className="py-4 sm:py-8 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* 1. Back button & Breadcrumb */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-800 hover:text-red-700 transition-colors active:text-red-700 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{isBn ? 'প্রচ্ছদে ফিরে যান' : 'Back to Home'}</span>
        </button>

        {/* Counterpart Language Switcher Pill */}
        {counterpartArticle && (
          <button
            type="button"
            onClick={() => {
              const targetLang = currentLang === 'bn' ? 'en' : 'bn';
              onSwitchLanguage(targetLang, counterpartArticle.id);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-full text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <span>{isBn ? 'Read in English' : 'বাংলায় পড়ুন'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 2. Category & Kicker (ALWAYS RED) */}
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs sm:text-sm font-bold text-red-700">
          {getCategoryName(article.category)}
        </span>
        {article.subtitle && (
          <>
            <span className="text-red-700 font-bold">•</span>
            <span className="text-xs sm:text-sm font-bold text-red-700 line-clamp-1">
              {article.subtitle}
            </span>
          </>
        )}
      </div>

      {/* 3. Main Article Title */}
      <h1
        className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-950 mb-3 sm:mb-4 leading-tight ${
          isBn ? 'bn-headline' : 'en-headline'
        }`}
      >
        {article.title}
      </h1>

      {/* 4. Author Byline (Circular Avatar + Stacked Name & Location) & Date */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-gray-200 text-xs sm:text-sm text-gray-800 mb-4 bg-gray-50/70 px-3 rounded-md">
        
        {/* Author Byline with Circular Avatar */}
        <div className="flex items-center gap-3">
          {article.author.avatarUrl ? (
            <img
              src={article.author.avatarUrl}
              alt={article.author.nameBn}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-red-700 text-white font-bold flex items-center justify-center text-sm shrink-0">
              {(isBn ? article.author.nameBn : article.author.nameEn)[0]}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-bold text-gray-950 text-xs sm:text-sm leading-tight">
              {isBn ? article.author.nameBn : article.author.nameEn}
            </span>
            <span className="text-[11px] text-gray-600 font-medium leading-tight mt-0.5">
              {article.author.locationBn
                ? isBn
                  ? article.author.locationBn
                  : article.author.locationEn
                : isBn
                ? article.author.roleBn
                : article.author.roleEn}
            </span>
          </div>
        </div>

        {/* Date & Reading Time */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs text-gray-700 font-medium">
          <span suppressHydrationWarning className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-600" />
            {formatTimeAgo(article.publishedAt, currentLang)}
          </span>
          <span>•</span>
          <span>
            {isBn
              ? `পড়তে: ${toBengaliNumber(article.readTimeMinutes)} মিনিট`
              : `${article.readTimeMinutes}m read`}
          </span>
        </div>
      </div>

      {/* 5. TOP Professional Social Share Bar (Right below headline/byline like Prothom Alo) */}
      <div className="mb-5">
        <SocialShareBar
          title={article.title}
          isBn={isBn}
          variant="top"
        />
      </div>

      {/* 6. Audio Listen & Font Resizer Bar */}
      <div className="bg-white py-1.5 px-3 border border-gray-200 rounded-md shadow-2xs mb-5 flex items-center justify-between">
        {/* Audio Listen Feature */}
        <button
          type="button"
          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
            isPlayingAudio
              ? 'bg-red-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          }`}
        >
          {isPlayingAudio ? (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span>{isBn ? 'থামান' : 'Stop'}</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-red-700" />
              <span>{isBn ? 'শুনুন' : 'Listen'}</span>
            </>
          )}
        </button>

        {/* Font Size Adjuster */}
        <div className="flex items-center gap-1 border border-gray-200 rounded p-0.5 text-xs font-bold text-gray-800">
          <span className="text-[11px] text-gray-500 mr-1 hidden sm:inline">{isBn ? 'ফন্ট সাইজ:' : 'Font:'}</span>
          <button
            type="button"
            onClick={() => setFontSize('normal')}
            className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${fontSize === 'normal' ? 'bg-gray-950 text-white' : 'hover:bg-gray-100'}`}
            title="স্বাভাবিক"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => setFontSize('large')}
            className={`px-2 py-0.5 rounded text-xs cursor-pointer ${fontSize === 'large' ? 'bg-gray-950 text-white' : 'hover:bg-gray-100'}`}
            title="বড়"
          >
            A+
          </button>
          <button
            type="button"
            onClick={() => setFontSize('xlarge')}
            className={`px-2 py-0.5 rounded text-sm cursor-pointer ${fontSize === 'xlarge' ? 'bg-gray-950 text-white' : 'hover:bg-gray-100'}`}
            title="আরও বড়"
          >
            A++
          </button>
        </div>
      </div>

      {/* 7. Featured Image with Caption */}
      <figure className="mb-6 sm:mb-8">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 aspect-16/10 mb-2 shadow-xs">
          <img
            src={article.featuredImage.url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        <figcaption className="text-xs text-gray-600 flex justify-between items-center px-1 font-medium">
          <span className="line-clamp-1">{article.featuredImage.caption}</span>
          <span className="font-bold text-gray-900 shrink-0 ml-2">{article.featuredImage.credit}</span>
        </figcaption>
      </figure>

      {/* 8. Excerpt Lead Paragraph */}
      <div className={`font-bold text-gray-950 mb-5 sm:mb-6 text-base sm:text-lg md:text-xl border-l-4 border-red-700 pl-3 sm:pl-4 py-1 leading-snug ${isBn ? 'bn-sublead' : 'en-body'}`}>
        {article.excerpt}
      </div>

      {/* 9. Article Body Content */}
      <div className={`space-y-4 sm:space-y-6 text-gray-950 font-normal ${fontSizeClass} ${isBn ? 'bn-body' : 'en-body'}`}>
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="tracking-normal">
            {paragraph}
          </p>
        ))}
      </div>

      {/* 10. BOTTOM Expanded Social Share Bar */}
      <SocialShareBar
        title={article.title}
        isBn={isBn}
        variant="bottom"
      />

      {/* 11. Tags List */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
          {isBn ? 'ট্যাগসমূহ:' : 'Tags:'}
        </h4>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block px-3 py-1 bg-gray-100 hover:bg-red-50 hover:text-red-700 text-gray-900 text-xs font-bold rounded-full cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 12. Full Reader Comments Section */}
      <CommentSection
        articleId={article.id}
        articleTitle={article.title}
        currentLang={currentLang}
      />

      {/* 13. Related News Section */}
      <div className="mt-12 pt-8 border-t-2 border-red-700 pb-16 lg:pb-0">
        <h3 className={`text-xl sm:text-2xl font-bold text-gray-950 mb-6 ${isBn ? 'bn-headline' : 'en-headline'}`}>
          {isBn ? 'সম্পর্কিত আরও খবর' : 'Related News'}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 divide-gray-100">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              onClick={() => {
                onSelectArticle(rel);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer group flex flex-row sm:flex-col items-start gap-3 sm:gap-0 pt-3 sm:pt-0"
            >
              <div className="w-24 h-16 sm:w-full sm:h-auto sm:aspect-16/10 shrink-0 overflow-hidden rounded-lg sm:rounded-xl bg-gray-100 mb-0 sm:mb-2 shadow-2xs">
                <img
                  src={rel.featuredImage.url}
                  alt={rel.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className={`text-xs sm:text-sm md:text-base font-bold text-gray-950 group-hover:text-red-700 transition-colors line-clamp-2 ${isBn ? 'bn-sublead' : 'en-headline'}`}>
                  {rel.title}
                </h4>
                <span suppressHydrationWarning className="text-xs text-gray-600 mt-1 block font-medium">
                  {formatTimeAgo(rel.publishedAt, currentLang)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </article>
  );
};
