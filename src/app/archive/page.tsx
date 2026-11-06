'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { InfoPageLayout } from '@/components/portal/InfoPageLayout';
import { useNews } from '@/context/NewsContext';
import { categories } from '@/data/categories';
import { formatTimeAgo, toBengaliNumber } from '@/lib/bangla-date';
import { Archive, Calendar, Filter, Search, Clock, ArrowRight } from 'lucide-react';

export default function ArchivePage() {
  const { publishedArticles } = useNews();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-06');

  // Filter articles based on category and query
  const filteredArticles = useMemo(() => {
    return publishedArticles.filter((article) => {
      const matchCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [publishedArticles, selectedCategory, searchQuery]);

  return (
    <InfoPageLayout
      titleBn="সংবাদ আর্কাইভ"
      titleEn="News Archive"
      subtitleBn="দ্য বেঙ্গল ডেস্কের অতীত সংখ্যা, তারিখভিত্তিক প্রতিবেদন এবং পুরোনো সকল খবর অনুসন্ধান করুন।"
      subtitleEn="Browse historical news editions, search by date, and explore our published archives."
      activePath="/archive"
    >
      <div className="space-y-6 text-gray-800 text-sm sm:text-base">
        
        {/* Archive Search & Filter Bar */}
        <div className="p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            
            {/* Search Query */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="কীওয়ার্ড দিয়ে খুঁজুন (যেমন: মেট্রোরেল, নির্বাচন)..."
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#052962]"
              />
            </div>

            {/* Category Filter */}
            <div className="sm:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#052962]"
              >
                <option value="all">সকল বিভাগ (All Categories)</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.nameBn}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div className="sm:col-span-3 flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg px-2.5 py-1">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full text-xs text-gray-700 bg-transparent focus:outline-hidden"
              />
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
            <span>
              মোট প্রাপ্ত ফলাফল: <strong className="text-gray-900">{toBengaliNumber(filteredArticles.length)}টি</strong>
            </span>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-red-700 hover:underline font-semibold"
              >
                ফিল্টার রিসেট করুন
              </button>
            )}
          </div>
        </div>

        {/* Articles List */}
        {filteredArticles.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="py-4 flex flex-col sm:flex-row gap-4 items-start group"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-40 sm:h-26 shrink-0 aspect-16/10 rounded-lg overflow-hidden bg-gray-100 shadow-2xs">
                  <img
                    src={article.featuredImage?.url}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold text-[#052962] bg-blue-50 px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                    <span suppressHydrationWarning className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(article.publishedAt, 'bn')}
                    </span>
                  </div>

                  <Link
                    href="/"
                    className="block text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#052962] transition-colors mb-1.5 leading-snug bn-headline"
                  >
                    {article.title}
                  </Link>

                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 bn-body">
                    {article.excerpt}
                  </p>

                  <div className="mt-2 text-xs text-gray-500">
                    প্রতিবেদক: <strong className="text-gray-700">{article.author.nameBn}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-gray-500 text-sm">
            এই ক্যাটাগরি বা কীওয়ার্ডে কোনো আর্কাইভ সংবাদ পাওয়া যায়নি।
          </div>
        )}

      </div>
    </InfoPageLayout>
  );
}
