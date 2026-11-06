'use client';

import React, { useState } from 'react';
import { AdminArticle } from '@/types/admin';
import { CategorySlug, NewsPriority, Language } from '@/types/news';
import { categories } from '@/data/categories';
import { Edit3, CheckCircle2, Zap, Send } from 'lucide-react';

interface StoryComposerProps {
  isReporter: boolean;
  isAdmin: boolean;
  onSubmit: (articleData: Partial<AdminArticle>) => void;
}

export const StoryComposer: React.FC<StoryComposerProps> = ({
  isReporter,
  isAdmin,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [contentParagraphs, setContentParagraphs] = useState('');
  const [category, setCategory] = useState<CategorySlug>('bangladesh');
  const [priority, setPriority] = useState<NewsPriority>('NORMAL');
  const [isBreaking, setIsBreaking] = useState(false);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80');
  const [imageCaption, setImageCaption] = useState('');
  const [imageCredit, setImageCredit] = useState('ছবি: দ্য বেঙ্গল ডেস্ক');
  const [newsLang, setNewsLang] = useState<Language>('bn');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      subtitle,
      excerpt: excerpt || title,
      content: contentParagraphs.split('\n\n').filter((p) => p.trim().length > 0),
      category,
      priority,
      isBreaking,
      language: newsLang,
      featuredImage: {
        url: imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
        caption: imageCaption || title,
        credit: imageCredit || 'ছবি: দ্য বেঙ্গল ডেস্ক',
      },
    });

    setTitle('');
    setSubtitle('');
    setExcerpt('');
    setContentParagraphs('');
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 shadow-xs max-w-4xl mx-auto">
      <div className="border-b border-gray-200 pb-3 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-red-700" />
            <span>{isReporter ? 'নতুন সংবাদ জমা দিন (Submit Story)' : 'সরাসরি সংবাদ প্রকাশ করুন'}</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {isReporter
              ? 'সংবাদটি লেখার পর জমা দিলে বার্তা সম্পাদক তা নিরীক্ষা করে সাইটে প্রকাশ করবেন।'
              : 'প্রধান সম্পাদক হিসেবে আপনার লেখা সংবাদ সরাসরি সাইটে প্রকাশিত হবে।'}
          </p>
        </div>

        {submitSuccess && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>সফলভাবে জমা হয়েছে!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">ভাষা (Language)</label>
            <select
              value={newsLang}
              onChange={(e) => setNewsLang(e.target.value as Language)}
              className="w-full border border-gray-300 rounded p-2 text-xs font-semibold bg-white outline-none focus:border-red-600"
            >
              <option value="bn">বাংলা (Bengali)</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">বিভাগ (Category)</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategorySlug)}
              className="w-full border border-gray-300 rounded p-2 text-xs font-semibold bg-white outline-none focus:border-red-600"
            >
              {categories.slice(1).map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.nameBn} ({c.nameEn})
                </option>
              ))}
            </select>
          </div>

          {isAdmin && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">হোমপেজ প্রায়োরিটি</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as NewsPriority)}
                className="w-full border border-gray-300 rounded p-2 text-xs font-semibold bg-white outline-none focus:border-red-600"
              >
                <option value="MAIN_LEAD">প্রধান লিড সংবাদ (Main Lead)</option>
                <option value="SUB_LEAD">সাব-লিড সংবাদ (Sub-Lead)</option>
                <option value="NORMAL">সাধারণ সংবাদ (Normal)</option>
                <option value="OPINION">সম্পাদকীয় / কলাম</option>
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            সংবাদের মূল শিরোনাম (Headline) <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="যেমন: প্রযুক্তি রফতানিতে নতুন দিগন্ত উন্মোচন..."
            className="w-full border border-gray-300 rounded p-2.5 text-base font-bold text-gray-900 outline-none focus:border-red-700"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            কাঁধের লেখা বা উপ-শিরোনাম (Kicker / Subtitle)
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="যেমন: বিশেষ অর্থনৈতিক সম্মেলন থেকে / ঢাকার বৈঠক"
            className="w-full border border-gray-300 rounded p-2 text-xs text-gray-800 outline-none focus:border-red-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 mb-1">ছবির URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-xs font-mono outline-none focus:border-red-700"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">ছবির ক্রেডিট</label>
            <input
              type="text"
              value={imageCredit}
              onChange={(e) => setImageCredit(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 text-xs outline-none focus:border-red-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            সংবাদের চুম্বক অংশ (Excerpt)
          </label>
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-xs text-gray-800 outline-none focus:border-red-700"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            সংবাদের বিস্তারিত বিবরণ (Body Paragraphs)
          </label>
          <textarea
            rows={6}
            required
            value={contentParagraphs}
            onChange={(e) => setContentParagraphs(e.target.value)}
            placeholder="প্যারাগ্রাফ আলাদা করতে ডাবল এন্টার (Enter) চাপুন..."
            className="w-full border border-gray-300 rounded p-3 text-sm text-gray-800 bn-body outline-none focus:border-red-700"
          />
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded">
            <input
              type="checkbox"
              id="breakingCheck"
              checked={isBreaking}
              onChange={(e) => setIsBreaking(e.target.checked)}
              className="w-4 h-4 text-red-700 rounded cursor-pointer"
            />
            <label htmlFor="breakingCheck" className="text-xs font-bold text-red-900 cursor-pointer flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              ব্রেকিং নিউজ হিসেবে সাইটের শীর্ষ লাল ফিতায় স্ক্রোল করান
            </label>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold text-sm px-6 py-2.5 rounded shadow-xs transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>{isReporter ? 'অনুমোদনের জন্য জমা দিন' : 'সরাসরি প্রকাশ করুন (Publish)'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
