'use client';

import React from 'react';
import { Article } from '@/types/news';
import { toBengaliNumber } from '@/lib/bangla-date';
import { Flame, TrendingUp, Building } from 'lucide-react';

interface ExecutiveOverviewTabProps {
  publishedArticles: Article[];
}

export const ExecutiveOverviewTab: React.FC<ExecutiveOverviewTabProps> = ({
  publishedArticles,
}) => {
  return (
    <div className="space-y-8">
      {/* Top performing articles & traffic sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left (2 cols): Top 5 Viral / Most Read Stories */}
        <div className="lg:col-span-2 bg-white p-6 rounded-md border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>আজকের সর্বাধিক পঠিত ও আলোচিত সংবাদ (Top Trending)</span>
            </h3>
            <span className="text-xs text-gray-400">লাইভ ভিউয়ার কাউন্টার</span>
          </div>

          <div className="divide-y divide-gray-100">
            {publishedArticles
              .sort((a, b) => b.viewCount - a.viewCount)
              .slice(0, 5)
              .map((art, idx) => (
                <div key={art.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 font-black text-xs flex items-center justify-center">
                      {toBengaliNumber(idx + 1)}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-1 hover:text-red-700 cursor-pointer">
                        {art.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {art.category} • লেখক: {art.author.nameBn} ({art.author.locationBn})
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-gray-900">
                      {toBengaliNumber(art.viewCount.toLocaleString())}
                    </span>
                    <span className="text-[10px] text-gray-400 block">পাঠক পড়েছেন</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Right (1 col): Traffic Source Breakdown */}
        <div className="bg-white p-6 rounded-md border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 pb-3 mb-4 border-b border-gray-200">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>ট্রাফিক ও পাঠক সোর্স বিশ্লেষণ</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>ফেসবুক ও সোশ্যাল মিডিয়া</span>
                  <span className="text-blue-700">৬৫%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-2 rounded-full w-[65%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>গুগল সার্চ ও নিউজ (Organic SEO)</span>
                  <span className="text-emerald-700">২৩%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full w-[23%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>সরাসরি ভিজিটর (Direct Web & App)</span>
                  <span className="text-red-700">১২%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-700 h-2 rounded-full w-[12%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 bg-gray-50 p-3 rounded text-[11px] text-gray-600">
            <p className="font-bold text-gray-900 mb-1">সম্পাদকীয় পর্যবেক্ষণ:</p>
            <p>আজ সকালে প্রকাশিত প্রযুক্তি ও অর্থনৈতিক রূপান্তর প্রতিবেদনটি ফেসবুকে সবচেয়ে দ্রুত শেয়ার হচ্ছে।</p>
          </div>
        </div>

      </div>

      {/* Bureau Performance Matrix */}
      <div className="bg-white p-6 rounded-md border border-gray-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <Building className="w-5 h-5 text-purple-600" />
            <span>ব্যুরো ও বিভাগীয় কার্যালয় পারফরম্যান্স</span>
          </h3>
          <span className="text-xs text-gray-400">এই মাসের সামগ্রিক প্রতিবেদন</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-md bg-purple-50/40">
            <h4 className="font-bold text-sm text-purple-950">ঢাকা কেন্দ্রীয় ব্যুরো</h4>
            <p className="text-xs text-gray-500 mt-1">৮ জন সাংবাদিক • ৪৪টি সংবাদ</p>
            <p className="text-lg font-black text-purple-900 mt-2">৩,৪৫,০০০ ভিউ</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-md bg-blue-50/40">
            <h4 className="font-bold text-sm text-blue-950">চট্টগ্রাম বিভাগীয় ব্যুরো</h4>
            <p className="text-xs text-gray-500 mt-1">৩ জন প্রতিনিধি • ১৬টি সংবাদ</p>
            <p className="text-lg font-black text-blue-900 mt-2">৯৮,০০০ ভিউ</p>
          </div>

          <div className="p-4 border border-gray-200 rounded-md bg-emerald-50/40">
            <h4 className="font-bold text-sm text-emerald-950">সিলেট ও অন্যান্য জেলা</h4>
            <p className="text-xs text-gray-500 mt-1">৪ জন প্রতিনিধি • ১২টি সংবাদ</p>
            <p className="text-lg font-black text-emerald-900 mt-2">৬৪,০০০ ভিউ</p>
          </div>
        </div>
      </div>
    </div>
  );
};
