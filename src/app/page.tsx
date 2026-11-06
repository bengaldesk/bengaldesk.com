'use client';

import React, { useState } from 'react';
import { useNews } from '@/context/NewsContext';
import { Article, Language, CategorySlug } from '@/types/news';
import { TopBar } from '@/components/portal/TopBar';
import { Header } from '@/components/portal/Header';
import { Navbar } from '@/components/portal/Navbar';
import { Footer } from '@/components/portal/Footer';
import { BreakingTicker } from '@/components/portal/BreakingTicker';
import { TrendingBar } from '@/components/portal/TrendingBar';
import { MainLeadSection } from '@/components/portal/MainLeadSection';
import { CategoryBlock } from '@/components/portal/CategoryBlock';
import { ArticleDetailView } from '@/components/portal/ArticleDetailView';
import { SearchModal } from '@/components/portal/SearchModal';
import { categories } from '@/data/categories';
import { formatTimeAgo } from '@/lib/bangla-date';
import { Clock } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { publishedArticles } = useNews();
  const [currentLang, setCurrentLang] = useState<Language>('bn');
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isBn = currentLang === 'bn';

  // Articles filtered by language
  const localizedArticles = publishedArticles.filter((a) => a.language === currentLang);

  // If a specific category is chosen
  const filteredCategoryArticles =
    selectedCategory === 'all'
      ? localizedArticles
      : localizedArticles.filter((a) => a.category === selectedCategory);

  // Handle switching language (and smoothly keeping counterpart article if reading an article)
  const handleLanguageChange = (newLang: Language, counterpartId?: string) => {
    setCurrentLang(newLang);
    if (selectedArticle) {
      if (counterpartId) {
        const found = publishedArticles.find((a) => a.id === counterpartId);
        if (found) setSelectedArticle(found);
      } else {
        const match = publishedArticles.find(
          (a) =>
            a.language === newLang &&
            (a.id === selectedArticle.translationOfId ||
              a.translationOfId === selectedArticle.id)
        );
        if (match) {
          setSelectedArticle(match);
        } else {
          setSelectedArticle(null);
        }
      }
    }
  };

  const breakingArticles = localizedArticles.filter((a) => a.isBreaking);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-red-700 selection:text-white">
      
      {/* 1. Top Bar */}
      <TopBar
        currentLang={currentLang}
        onLanguageChange={(lang) => handleLanguageChange(lang)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 2. Main Logo Masthead */}
      <Header
        currentLang={currentLang}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onGoHome={() => {
          setSelectedCategory('all');
          setSelectedArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 3. Sticky Navigation Mega-Menu */}
      <Navbar
        currentLang={currentLang}
        selectedCategory={selectedCategory}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          setSelectedArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* 4. Breaking News Ticker */}
      <BreakingTicker
        articles={localizedArticles}
        currentLang={currentLang}
        onSelectArticle={(article) => {
          setSelectedArticle(article);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4.1 Dedicated Trending Topics Bar (Prothom Alo / Kaler Kantho Style) */}
      <TrendingBar currentLang={currentLang} />

      {/* 5. Main Body Content Area */}
      <main className="flex-1">
        {selectedArticle ? (
          /* Single Article Reading View */
          <ArticleDetailView
            article={selectedArticle}
            allArticles={publishedArticles}
            currentLang={currentLang}
            onBack={() => {
              setSelectedArticle(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectArticle={(art) => {
              setSelectedArticle(art);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSwitchLanguage={(targetLang, counterpartId) =>
              handleLanguageChange(targetLang, counterpartId)
            }
          />
        ) : selectedCategory === 'all' ? (
          /* Homepage: Prothom Alo 3-Column Lead + Category Sections */
          <>
            {/* The 3-Column Asymmetric Lead Grid */}
            <MainLeadSection
              articles={publishedArticles}
              currentLang={currentLang}
              onSelectArticle={(article) => {
                setSelectedArticle(article);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Category Blocks Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
              <CategoryBlock
                categorySlug="bangladesh"
                articles={publishedArticles}
                currentLang={currentLang}
                onSelectArticle={(article) => {
                  setSelectedArticle(article);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewCategory={(slug) => {
                  setSelectedCategory(slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              <CategoryBlock
                categorySlug="politics"
                articles={publishedArticles}
                currentLang={currentLang}
                onSelectArticle={(article) => {
                  setSelectedArticle(article);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewCategory={(slug) => {
                  setSelectedCategory(slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              <CategoryBlock
                categorySlug="economy"
                articles={publishedArticles}
                currentLang={currentLang}
                onSelectArticle={(article) => {
                  setSelectedArticle(article);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewCategory={(slug) => {
                  setSelectedCategory(slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              <CategoryBlock
                categorySlug="world"
                articles={publishedArticles}
                currentLang={currentLang}
                onSelectArticle={(article) => {
                  setSelectedArticle(article);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewCategory={(slug) => {
                  setSelectedCategory(slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              <CategoryBlock
                categorySlug="sports"
                articles={publishedArticles}
                currentLang={currentLang}
                onSelectArticle={(article) => {
                  setSelectedArticle(article);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewCategory={(slug) => {
                  setSelectedCategory(slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              <CategoryBlock
                categorySlug="entertainment"
                articles={publishedArticles}
                currentLang={currentLang}
                onSelectArticle={(article) => {
                  setSelectedArticle(article);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewCategory={(slug) => {
                  setSelectedCategory(slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              <CategoryBlock
                categorySlug="technology"
                articles={publishedArticles}
                currentLang={currentLang}
                onSelectArticle={(article) => {
                  setSelectedArticle(article);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewCategory={(slug) => {
                  setSelectedCategory(slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />

              <CategoryBlock
                categorySlug="lifestyle"
                articles={publishedArticles}
                currentLang={currentLang}
                onSelectArticle={(article) => {
                  setSelectedArticle(article);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onViewCategory={(slug) => {
                  setSelectedCategory(slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </>
        ) : (
          /* Specific Category Archive View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="border-b-2 border-red-700 pb-2.5 mb-5 flex items-center justify-between">
              <h2 className={`text-xl sm:text-2xl md:text-3xl font-black text-gray-900 ${isBn ? 'bn-headline' : 'en-headline'}`}>
                {categories.find((c) => c.slug === selectedCategory)?.[isBn ? 'nameBn' : 'nameEn']}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="text-xs sm:text-sm font-semibold text-red-700 hover:underline"
              >
                {isBn ? '← প্রচ্ছদে ফিরে যান' : '← Back to Home'}
              </button>
            </div>

            {filteredCategoryArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredCategoryArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => {
                      setSelectedArticle(art);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="cursor-pointer group flex flex-col justify-between border border-gray-200 p-3 sm:p-4 rounded-xs hover:shadow-xs transition-shadow bg-white active:bg-gray-50"
                  >
                    <div>
                      <div className="relative overflow-hidden rounded-xs bg-gray-100 aspect-16/10 mb-2.5">
                        <img
                          src={art.featuredImage.url}
                          alt={art.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className={`text-sm sm:text-base font-bold text-gray-900 group-hover:text-red-700 transition-colors mb-1.5 ${isBn ? 'bn-sublead' : 'en-headline'}`}>
                        {art.title}
                      </h3>
                      <p className={`text-xs text-gray-600 line-clamp-2 sm:line-clamp-3 mb-3 ${isBn ? 'bn-body' : 'en-body'}`}>
                        {art.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-400 pt-2 border-t border-gray-100">
                      <span>{isBn ? art.author.nameBn : art.author.nameEn}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(art.publishedAt, currentLang)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-gray-500 text-sm">
                {isBn
                  ? 'এই মুহূর্তে এই বিভাগে কোনো সংবাদ প্রকাশিত হয়নি।'
                  : 'No articles currently published in this category.'}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 6. Footer */}
      <Footer currentLang={currentLang} />

      {/* 7. Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={publishedArticles}
        currentLang={currentLang}
        onSelectArticle={(article) => {
          setSelectedArticle(article);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
