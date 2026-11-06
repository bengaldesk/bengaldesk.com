'use client';

import React, { useState, useEffect } from 'react';
import { Article, Language } from '@/types/news';
import { formatTimeAgo, toBengaliNumber } from '@/lib/bangla-date';
import { FacebookIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import {
  Clock,
  Volume2,
  VolumeX,
  Link as LinkIcon,
  Check,
  ChevronLeft,
  ArrowRight,
  Share2,
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
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find counterpart article in other language if available
  const counterpartArticle = article.translationOfId
    ? allArticles.find((a) => a.id === article.translationOfId)
    : allArticles.find((a) => a.translationOfId === article.id);

  // Related articles
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.language === currentLang)
    .slice(0, 3);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const fontSizeClass =
    fontSize === 'xlarge'
      ? 'text-lg sm:text-2xl leading-loose'
      : fontSize === 'large'
      ? 'text-base sm:text-xl leading-relaxed'
      : 'text-sm sm:text-lg leading-relaxed';

  return (
    <article className="py-4 sm:py-8 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* 1. Sticky Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-red-700 z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 2. Back button & Breadcrumb */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-600 hover:text-red-700 transition-colors active:text-red-700"
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
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-full text-xs font-bold transition-all shadow-2xs"
          >
            <span>{isBn ? 'Read in English' : 'বাংলায় পড়ুন'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* 3. Category & Kicker */}
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 px-2 py-0.5 rounded">
          {article.category}
        </span>
        {article.subtitle && (
          <span className="text-xs sm:text-sm font-semibold text-gray-500 line-clamp-1">
            {article.subtitle}
          </span>
        )}
      </div>

      {/* 4. Main Article Title */}
      <h1
        className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-950 mb-3 sm:mb-4 ${
          isBn ? 'bn-headline' : 'en-headline'
        }`}
      >
        {article.title}
      </h1>

      {/* 5. Author Byline, Date & Reading Time */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-2.5 sm:py-3 border-y border-gray-200 text-xs sm:text-sm text-gray-600 mb-5 sm:mb-6 bg-gray-50/60 px-3 rounded-xs">
        <div className="flex items-center gap-2">
          {article.author.avatarUrl ? (
            <img
              src={article.author.avatarUrl}
              alt={article.author.nameBn}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-300"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-red-700 text-white font-bold flex items-center justify-center text-xs">
              {(isBn ? article.author.nameBn : article.author.nameEn)[0]}
            </div>
          )}
          <div>
            <p className="font-bold text-gray-900 text-xs sm:text-sm">
              {isBn ? article.author.nameBn : article.author.nameEn}
            </p>
            <p className="text-[10px] sm:text-[11px] text-gray-500">
              {isBn ? article.author.roleBn : article.author.roleEn}
              {article.author.locationBn && ` • ${isBn ? article.author.locationBn : article.author.locationEn}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-gray-500">
          <span suppressHydrationWarning className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
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

      {/* 6. Floating Reading & Share Bar (Thumb-friendly on mobile) */}
      <div className="sticky top-12 z-20 bg-white/95 backdrop-blur-md py-1.5 sm:py-2 px-3 border border-gray-200 rounded-md shadow-xs mb-5 sm:mb-6 flex items-center justify-between">
        {/* Audio Listen Feature */}
        <button
          type="button"
          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded text-xs font-semibold transition-colors ${
            isPlayingAudio
              ? 'bg-red-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
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

        {/* Text size controls & Social share */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Font Size Adjuster */}
          <div className="flex items-center gap-0.5 border border-gray-200 rounded p-0.5 text-xs font-bold text-gray-700">
            <button
              type="button"
              onClick={() => setFontSize('normal')}
              className={`px-1.5 sm:px-2 py-0.5 rounded text-[11px] ${fontSize === 'normal' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100'}`}
              title="স্বাভাবিক"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize('large')}
              className={`px-1.5 sm:px-2 py-0.5 rounded text-xs ${fontSize === 'large' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100'}`}
              title="বড়"
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setFontSize('xlarge')}
              className={`px-1.5 sm:px-2 py-0.5 rounded text-sm ${fontSize === 'xlarge' ? 'bg-gray-200 text-gray-900' : 'hover:bg-gray-100'}`}
              title="আরও বড়"
            >
              A++
            </button>
          </div>

          {/* Social Share Buttons */}
          <button
            type="button"
            className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Facebook"
          >
            <FacebookIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 text-gray-600 hover:text-sky-500 hover:bg-sky-50 rounded transition-colors"
            title="Twitter"
          >
            <TwitterIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="p-1.5 text-gray-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Copy Link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
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
        <figcaption className="text-[11px] sm:text-xs text-gray-500 flex justify-between items-center px-1">
          <span className="line-clamp-1">{article.featuredImage.caption}</span>
          <span className="font-semibold text-gray-700 shrink-0 ml-2">{article.featuredImage.credit}</span>
        </figcaption>
      </figure>

      {/* 8. Excerpt Lead Paragraph */}
      <div className={`font-semibold text-gray-900 mb-5 sm:mb-6 text-base sm:text-lg md:text-xl border-l-4 border-red-700 pl-3 sm:pl-4 py-1 ${isBn ? 'bn-sublead' : 'en-body'}`}>
        {article.excerpt}
      </div>

      {/* 9. Article Body Content */}
      <div className={`space-y-4 sm:space-y-6 text-gray-800 ${fontSizeClass} ${isBn ? 'bn-body' : 'en-body'}`}>
        {article.content.map((paragraph, idx) => (
          <p key={idx} className="tracking-normal">
            {paragraph}
          </p>
        ))}
      </div>

      {/* 10. Tags List */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          {isBn ? 'ট্যাগসমূহ:' : 'Tags:'}
        </h4>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block px-2.5 sm:px-3 py-1 bg-gray-100 hover:bg-red-50 hover:text-red-700 text-gray-700 text-xs font-medium rounded-full cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 11. Related News Section (Mobile-optimized cards) */}
      <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t-2 border-red-700 pb-16 lg:pb-0">
        <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 ${isBn ? 'bn-headline' : 'en-headline'}`}>
          {isBn ? 'সম্পর্কিত আরও খবর' : 'Related News'}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 divide-y sm:divide-y-0 divide-gray-100">
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
                <h4 className={`text-xs sm:text-sm md:text-base font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-2 ${isBn ? 'bn-sublead' : 'en-headline'}`}>
                  {rel.title}
                </h4>
                <span suppressHydrationWarning className="text-[10px] sm:text-[11px] text-gray-400 mt-1 block">
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
