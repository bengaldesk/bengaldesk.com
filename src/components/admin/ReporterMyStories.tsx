'use client';

import React from 'react';
import { AdminArticle, StaffUser } from '@/types/admin';
import { formatTimeAgo, toBengaliNumber } from '@/lib/bangla-date';
import { FileText, CheckCircle2, Clock, AlertCircle, MessageSquare, PlusCircle } from 'lucide-react';

interface ReporterMyStoriesProps {
  currentUser: StaffUser;
  reporterArticles: AdminArticle[];
  onCreateNewClick: () => void;
}

export const ReporterMyStories: React.FC<ReporterMyStoriesProps> = ({
  currentUser,
  reporterArticles,
  onCreateNewClick,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-md border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-red-700 text-white font-bold flex items-center justify-center text-lg">
            {currentUser.name[0]}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{currentUser.name}</h2>
            <p className="text-xs text-gray-500">
              {currentUser.bureau} • স্টাফ রিপোর্টার
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {toBengaliNumber(reporterArticles.filter((a) => a.status === 'PUBLISHED').length)} টি প্রকাশিত
          </span>
          <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
            <Clock className="w-3.5 h-3.5" />
            {toBengaliNumber(reporterArticles.filter((a) => a.status === 'PENDING_REVIEW').length)} টি পর্যালোচনায়
          </span>
          <span className="flex items-center gap-1 text-red-700 bg-red-50 px-2.5 py-1 rounded">
            <AlertCircle className="w-3.5 h-3.5" />
            {toBengaliNumber(reporterArticles.filter((a) => a.status === 'REJECTED').length)} টি সংশোধন
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reporterArticles.length === 0 ? (
          <div className="bg-white p-12 text-center rounded border border-gray-200">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-700">আপনি এখনো কোনো সংবাদ জমা দেননি</p>
            <button
              type="button"
              onClick={onCreateNewClick}
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:underline"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>নতুন সংবাদ তৈরি করুন</span>
            </button>
          </div>
        ) : (
          reporterArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white border border-gray-200 rounded-md p-4 shadow-xs flex flex-col md:flex-row items-start justify-between gap-4"
            >
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  {art.status === 'PUBLISHED' && (
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      প্রকাশিত (Live)
                    </span>
                  )}
                  {art.status === 'PENDING_REVIEW' && (
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 font-bold text-xs px-2.5 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      অ্যাপ্রুভালের জন্য বার্তা বিভাগে অপেক্ষারত
                    </span>
                  )}
                  {art.status === 'REJECTED' && (
                    <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 font-bold text-xs px-2.5 py-0.5 rounded-full">
                      <AlertCircle className="w-3 h-3" />
                      সংশোধনের প্রয়োজন
                    </span>
                  )}
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(art.publishedAt, 'bn')}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 bn-headline">
                  {art.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">{art.excerpt}</p>

                {art.status === 'REJECTED' && art.editorialReview?.feedbackNote && (
                  <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-600 rounded-xs text-xs text-red-900">
                    <p className="font-bold flex items-center gap-1 mb-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>বার্তা সম্পাদকের মন্তব্য ({art.editorialReview.reviewedBy}):</span>
                    </p>
                    <p className="text-red-800 italic">
                      "{art.editorialReview.feedbackNote}"
                    </p>
                  </div>
                )}
              </div>

              <div className="w-28 h-20 shrink-0 overflow-hidden rounded border border-gray-200">
                <img src={art.featuredImage.url} alt={art.title} className="w-full h-full object-cover" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
