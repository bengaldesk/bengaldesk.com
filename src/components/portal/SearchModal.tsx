'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Article, Language, CategorySlug } from '@/types/news';
import { Search, X, Clock, ArrowRight, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { formatTimeAgo, toBengaliNumber } from '@/lib/bangla-date';
import { categories } from '@/data/categories';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  currentLang: Language;
  onSelectArticle: (article: Article) => void;
}

const POPULAR_SEARCH_KEYWORDS = [
  'অর্থনৈতিক সংস্কার',
  'জাতীয় নির্বাচন',
  'কৃত্রিম বুদ্ধিমত্তা',
  'ক্রিকেট বিশ্বকাপ',
  'চট্টগ্রাম বন্দর',
  'মুদ্রাস্ফীতি',
  'মেট্রোরেল',
  'রফতানি বাণিজ্য',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  currentLang,
  onSelectArticle,
}) => {
  const isBn = currentLang === 'bn';
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  // Global ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle or open
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter articles based on query & category
  const filteredArticles = articles.filter((a) => {
    if (a.language !== currentLang) return false;
    if (selectedCategory !== 'all' && a.category !== selectedCategory) return false;

    if (!query.trim()) return selectedCategory !== 'all';

    const q = query.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      (a.subtitle && a.subtitle.toLowerCase().includes(q)) ||
      a.tags.some((t) => t.toLowerCase().includes(q)) ||
      a.author.nameBn.toLowerCase().includes(q) ||
      a.author.nameEn.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click-away backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[85vh]">
        
        {/* 1. Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center gap-3 bg-gray-50/60">
          <div className="p-2 bg-red-700 text-white rounded-lg shadow-2xs shrink-0">
            <Search className="w-5 h-5 text-white" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isBn
                ? 'সংবাদ শিরোনাম, বিষয়, সাংবাদিক বা কিওয়ার্ড দিয়ে অনুসন্ধান করুন...'
                : 'Search headlines, topics, authors or keywords...'
            }
            className="flex-1 text-base sm:text-lg font-medium outline-none text-gray-950 placeholder:text-gray-400 bg-transparent"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
              title="মুছুন"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-gray-600 hover:text-gray-950 bg-white border border-gray-300 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* 2. Popular Keywords & Category Filter Ribbon */}
        <div className="px-4 py-2.5 bg-gray-100/70 border-b border-gray-200 flex flex-col gap-2">
          
          {/* Popular Suggestions */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] font-bold text-gray-700 flex items-center gap-1 shrink-0">
              <TrendingUp className="w-3.5 h-3.5 text-red-700" />
              <span>{isBn ? 'জনপ্রিয়:' : 'Trending:'}</span>
            </span>
            {POPULAR_SEARCH_KEYWORDS.map((kw, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuery(kw)}
                className="px-2.5 py-0.5 text-xs bg-white hover:bg-red-50 hover:text-red-700 hover:border-red-300 text-gray-800 border border-gray-300 rounded-full shrink-0 transition-colors cursor-pointer font-medium"
              >
                #{kw}
              </button>
            ))}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-gray-950 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
            >
              {isBn ? 'সকল বিভাগ' : 'All Categories'}
            </button>
            {categories.slice(0, 7).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-2.5 py-1 rounded-md transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-red-700 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {isBn ? cat.nameBn : cat.nameEn}
              </button>
            ))}
          </div>

        </div>

        {/* 3. Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-gray-150">
          {query.trim() === '' && selectedCategory === 'all' ? (
            <div className="py-12 text-center">
              <Sparkles className="w-8 h-8 text-red-700 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-bold text-gray-950 mb-1">
                {isBn ? 'দ্রুত সংবাদ অনুসন্ধান' : 'Instant News Search'}
              </p>
              <p className="text-xs text-gray-600 max-w-md mx-auto">
                {isBn
                  ? 'উপরে কোনো শব্দ বা বিষয় টাইপ করুন অথবা জনপ্রিয় কিওয়ার্ডে ক্লিক করে মুহূর্তেই সংবাদ খুঁজে নিন।'
                  : 'Type any keyword above or click on trending tags to discover stories immediately.'}
              </p>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div>
              <p className="text-xs font-bold text-gray-600 mb-3">
                {isBn
                  ? `মোট ${toBengaliNumber(filteredArticles.length)}টি প্রাসঙ্গিক সংবাদ পাওয়া গেছে:`
                  : `Found ${filteredArticles.length} relevant articles:`}
              </p>
              <div className="space-y-3">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="p-3 rounded-xl flex items-start gap-4 cursor-pointer group hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-16 sm:w-28 sm:h-18 shrink-0 overflow-hidden rounded-lg bg-gray-100 shadow-2xs">
                      <img
                        src={article.featuredImage?.url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider block mb-0.5">
                        {categories.find((c) => c.slug === article.category)?.nameBn || article.category}
                      </span>
                      <h4 className={`text-sm sm:text-base font-bold text-gray-950 group-hover:text-red-700 transition-colors line-clamp-1 mb-1 leading-snug ${isBn ? 'bn-headline' : 'en-headline'}`}>
                        {article.title}
                      </h4>
                      <p className="text-xs text-gray-700 line-clamp-1 mb-1.5 font-normal">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-gray-600 font-medium">
                        <span>{isBn ? article.author.nameBn : article.author.nameEn}</span>
                        <span>•</span>
                        <span suppressHydrationWarning className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-500" />
                          {formatTimeAgo(article.publishedAt, currentLang)}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-700 self-center shrink-0 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-sm font-bold text-gray-950 mb-1">
                {isBn ? `"${query}" সম্পর্কিত কোনো সংবাদ পাওয়া যায়নি` : `No articles found matching "${query}"`}
              </p>
              <p className="text-xs text-gray-600">
                {isBn
                  ? 'দয়া করে বানান পরীক্ষা করুন অথবা অন্য কোনো সাধারণ কিওয়ার্ড দিয়ে চেষ্টা করুন।'
                  : 'Please check your spelling or try searching with different keywords.'}
              </p>
            </div>
          )}
        </div>

        {/* 4. Footer info */}
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 flex items-center justify-between">
          <span>{isBn ? 'দ্য বেঙ্গল ডেস্ক ডিজিটাল সার্চ ইঞ্জিন' : 'The Bengal Desk Digital Search Engine'}</span>
          <span>{isBn ? 'ক্লিক করে সরাসরি খবর পড়ুন' : 'Click to read story'}</span>
        </div>

      </div>
    </div>
  );
};
