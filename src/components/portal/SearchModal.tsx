'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Article, Language } from '@/types/news';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { formatTimeAgo } from '@/lib/bangla-date';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  currentLang: Language;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  currentLang,
  onSelectArticle,
}) => {
  const isBn = currentLang === 'bn';
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredArticles = query.trim()
    ? articles.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isBn
                ? 'সংবাদ শিরোনাম বা বিষয় দিয়ে খুঁজুন...'
                : 'Search headlines, topics or keywords...'
            }
            className="flex-1 text-base sm:text-lg outline-none text-gray-900 placeholder:text-gray-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        {/* Search Results / Suggestion */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-gray-100">
          {query.trim() === '' ? (
            <div className="py-6 text-center text-xs sm:text-sm text-gray-400">
              {isBn
                ? 'কোনো কিওয়ার্ড দিয়ে সন্ধান শুরু করুন (যেমন: অর্থনীতি, প্রযুক্তি, ক্রিকেট)'
                : 'Type any keyword to start searching (e.g., economy, tech, sports)'}
            </div>
          ) : filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="py-3 flex items-start justify-between gap-4 cursor-pointer group hover:bg-gray-50 px-2 rounded transition-colors"
              >
                <div className="flex-1">
                  <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-1 block">
                    {article.category}
                  </span>
                  <h4 className={`text-sm sm:text-base font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-1 ${isBn ? 'bn-headline' : 'en-headline'}`}>
                    {article.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                    {article.excerpt}
                  </p>
                  <span className="text-[10px] text-gray-400 mt-1 inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(article.publishedAt, currentLang)}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-red-700 shrink-0 self-center" />
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500 text-sm">
              {isBn
                ? `"${query}" সম্পর্কিত কোনো সংবাদ পাওয়া যায়নি।`
                : `No articles found matching "${query}".`}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
