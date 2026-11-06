'use client';

import React from 'react';
import { Article, NewsPriority } from '@/types/news';
import { LayoutTemplate } from 'lucide-react';

interface FrontpageCuratorProps {
  publishedArticles: Article[];
  onSetPriority: (id: string, priority: NewsPriority) => void;
}

export const FrontpageCurator: React.FC<FrontpageCuratorProps> = ({
  publishedArticles,
  onSetPriority,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-md border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-red-700" />
            <span>হোমপেজ কিউরেশন ও ফ্রন্টপেজ লেআউট ম্যানেজার</span>
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            প্রধান সম্পাদক হিসেবে আপনি যেকোনো সংবাদকে এক ক্লিকে সাইটের ১ নম্বর প্রধান লিড বা সাব-লিড বানিয়ে ফ্রন্টপেজ সাজাতে পারবেন।
          </p>
        </div>
        <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded">
          রিয়েল-টাইম প্রিভিউ মোড
        </span>
      </div>

      {/* Current Layout Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Slot 1: Current Main Lead (6 cols) */}
        <div className="lg:col-span-6 bg-white border-2 border-red-700 rounded-md p-5 shadow-xs">
          <span className="inline-block bg-red-700 text-white font-black text-xs px-2.5 py-0.5 rounded uppercase tracking-wider mb-3">
            ১ নম্বর প্রধান লিড নিউজ (Main Lead)
          </span>
          {(() => {
            const lead = publishedArticles.find((a) => a.priority === 'MAIN_LEAD');
            if (!lead) return <p className="text-xs text-gray-500">কোনো প্রধান লিড নির্ধারিত নেই</p>;
            return (
              <div>
                <img
                  src={lead.featuredImage.url}
                  alt={lead.title}
                  className="w-full aspect-video object-cover rounded mb-2"
                />
                <h3 className="font-bold text-xl text-gray-950 bn-headline mb-1">{lead.title}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{lead.excerpt}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                  <span>লেখক: {lead.author.nameBn}</span>
                  <span className="font-bold text-emerald-700">হোমপেজে লাইভ চলছে</span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Slot 2-4: Sub-leads (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-gray-200 rounded-md p-5 shadow-xs">
          <span className="inline-block bg-blue-700 text-white font-black text-xs px-2.5 py-0.5 rounded uppercase tracking-wider mb-3">
            সাব-লিড নিউজ (Sub-Leads: Slot 2, 3, 4)
          </span>
          <div className="space-y-3 divide-y divide-gray-100">
            {publishedArticles
              .filter((a) => a.priority === 'SUB_LEAD')
              .slice(0, 3)
              .map((sub, idx) => (
                <div key={sub.id} className="pt-2 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-gray-400">স্লট #{idx + 2}</span>
                    <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{sub.title}</h4>
                    <span className="text-[11px] text-gray-500">{sub.author.nameBn}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSetPriority(sub.id, 'MAIN_LEAD')}
                    className="shrink-0 bg-red-50 hover:bg-red-700 text-red-700 hover:text-white border border-red-300 text-[11px] font-bold px-2 py-1 rounded transition-colors"
                  >
                    প্রধান লিড বানান ↑
                  </button>
                </div>
              ))}
          </div>
        </div>

      </div>

      {/* List to promote any article to Lead */}
      <div className="bg-white p-6 rounded-md border border-gray-200 shadow-xs">
        <h3 className="font-bold text-base text-gray-900 mb-4 border-b pb-2">
          অন্যান্য প্রকাশিত সংবাদ থেকে নতুন লিড নির্বাচন করুন
        </h3>
        <div className="space-y-3 divide-y divide-gray-100">
          {publishedArticles
            .filter((a) => a.priority !== 'MAIN_LEAD')
            .map((art) => (
              <div key={art.id} className="pt-3 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 mt-1">{art.title}</h4>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onSetPriority(art.id, 'MAIN_LEAD')}
                    className="bg-red-700 hover:bg-red-800 text-white text-xs font-bold px-3 py-1 rounded transition-colors"
                  >
                    প্রধান লিড করুন
                  </button>
                  <button
                    type="button"
                    onClick={() => onSetPriority(art.id, 'SUB_LEAD')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded transition-colors"
                  >
                    সাব-লিড করুন
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
  );
};
