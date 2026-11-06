'use client';

import React, { useState } from 'react';
import { AdminArticle } from '@/types/admin';
import { NewsPriority } from '@/types/news';
import { categories } from '@/data/categories';
import { formatTimeAgo, toBengaliNumber } from '@/lib/bangla-date';
import { Clock, CheckCircle2, AlertCircle, Check } from 'lucide-react';

interface EditorialReviewDeskProps {
  pendingArticles: AdminArticle[];
  onApprove: (id: string, priority?: NewsPriority) => void;
  onReject: (id: string, feedbackNote: string) => void;
}

export const EditorialReviewDesk: React.FC<EditorialReviewDeskProps> = ({
  pendingArticles,
  onApprove,
  onReject,
}) => {
  const [rejectingArticleId, setRejectingArticleId] = useState<string | null>(null);
  const [feedbackNote, setFeedbackNote] = useState('');

  return (
    <div className="space-y-6">
      <div className="bg-white border-l-4 border-amber-500 p-4 rounded-xs shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <span>বার্তা বিভাগীয় পর্যালোচনা ডেস্ক (Editorial Review Desk)</span>
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            সাংবাদিকদের প্রেরিত খবরের সত্যতা, ভাষা ও ছবি নিরীক্ষা করে প্রকাশ করুন অথবা সংশোধনের নির্দেশ দিন।
          </p>
        </div>
        <span className="bg-amber-100 text-amber-900 font-black text-sm px-3 py-1 rounded-full border border-amber-300">
          {toBengaliNumber(pendingArticles.length)} টি অপেক্ষারত
        </span>
      </div>

      {pendingArticles.length === 0 ? (
        <div className="bg-white p-12 text-center rounded border border-gray-200">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-800">কোনো সংবাদ পর্যালোচনার অপেক্ষায় নেই</h3>
          <p className="text-xs text-gray-500 mt-1">
            সাংবাদিকরা নতুন কোনো সংবাদ পাঠালে তা সাথে সাথে এই ডেস্কে ভেসে উঠবে।
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white border border-gray-200 rounded-md p-5 shadow-xs hover:border-red-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-50 text-red-700 text-xs font-bold px-2 py-0.5 rounded border border-red-200">
                      {categories.find((c) => c.slug === art.category)?.nameBn || art.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      প্রেরণ: {formatTimeAgo(art.publishedAt, 'bn')}
                    </span>
                    <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                      লেখক: {art.author.nameBn} ({art.author.locationBn})
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-950 bn-headline">
                    {art.title}
                  </h3>

                  {art.subtitle && (
                    <p className="text-xs font-semibold text-red-800">
                      {art.subtitle}
                    </p>
                  )}

                  <p className="text-sm text-gray-700 bn-body line-clamp-2">
                    {art.excerpt}
                  </p>

                  <div className="pt-2 text-xs text-gray-500 italic space-y-1">
                    {art.content.slice(0, 2).map((p, idx) => (
                      <p key={idx} className="line-clamp-2">{p}</p>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-48 shrink-0">
                  <img
                    src={art.featuredImage.url}
                    alt={art.title}
                    className="w-full aspect-16/10 object-cover rounded border border-gray-200"
                  />
                  <p className="text-[10px] text-gray-500 mt-1 truncate">
                    {art.featuredImage.caption}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-gray-700">হোমপেজে অবস্থান নির্ধারণ:</span>
                  <select
                    defaultValue="NORMAL"
                    id={`prio-${art.id}`}
                    className="border border-gray-300 rounded px-2.5 py-1 text-xs bg-gray-50 font-bold outline-none cursor-pointer"
                  >
                    <option value="MAIN_LEAD">প্রধান জাতীয় লিড (Slot 1)</option>
                    <option value="SUB_LEAD">সাব-লিড নিউজ (Slot 2-4)</option>
                    <option value="NORMAL">সাধারণ সংবাদ</option>
                    <option value="OPINION">সম্পাদকীয় কলাম</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRejectingArticleId(art.id);
                      setFeedbackNote('');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold rounded transition-colors"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>সংশোধনের নির্দেশ দিন</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const sel = document.getElementById(`prio-${art.id}`) as HTMLSelectElement;
                      const chosenPriority = (sel?.value || 'NORMAL') as NewsPriority;
                      onApprove(art.id, chosenPriority);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded transition-colors shadow-2xs"
                  >
                    <Check className="w-4 h-4" />
                    <span>অনুমোদন ও প্রকাশ করুন</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectingArticleId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span>প্রতিবেদককে সংশোধনের নির্দেশ দিন</span>
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              বানান সংশোধন, অতিরিক্ত তথ্যসূত্র যোগ করা বা বক্তব্যের ঘাটতির বিষয়ে সাংবাদিকের জন্য সুনির্দিষ্ট মন্তব্য লিখুন।
            </p>

            <textarea
              rows={4}
              required
              value={feedbackNote}
              onChange={(e) => setFeedbackNote(e.target.value)}
              placeholder="যেমন: সংশ্লিষ্ট মন্ত্রণালয়ের কোনো অফিসিয়াল বক্তব্য নেই। বক্তব্য যুক্ত করে পুনরায় পাঠান..."
              className="w-full border border-gray-300 rounded p-2.5 text-xs text-gray-800 outline-none focus:border-red-600 mb-4"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setRejectingArticleId(null)}
                className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={() => {
                  if (feedbackNote.trim()) {
                    onReject(rejectingArticleId, feedbackNote);
                    setRejectingArticleId(null);
                  }
                }}
                className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded shadow-xs"
              >
                মন্তব্যসহ ফেরত পাঠান
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
