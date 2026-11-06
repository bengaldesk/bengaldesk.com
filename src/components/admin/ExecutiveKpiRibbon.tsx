'use client';

import React from 'react';
import { toBengaliNumber } from '@/lib/bangla-date';

interface ExecutiveKpiRibbonProps {
  publishedCount: number;
  pendingCount: number;
  staffCount: number;
  activeAdCount: number;
}

export const ExecutiveKpiRibbon: React.FC<ExecutiveKpiRibbonProps> = ({
  publishedCount,
  pendingCount,
  staffCount,
  activeAdCount,
}) => {
  return (
    <section className="bg-white border-b border-gray-200 py-3 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <div className="p-2.5 bg-red-50/60 border border-red-100 rounded flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500">লাইভ পাঠক (Realtime)</p>
            <p className="text-lg font-black text-red-700">১,৪৮২ জন</p>
          </div>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
          </span>
        </div>

        <div className="p-2.5 bg-gray-50 border border-gray-200 rounded">
          <p className="text-[11px] font-bold text-gray-500">আজকের পেজভিউ</p>
          <p className="text-lg font-black text-gray-900">১,৮৪,৫০০</p>
        </div>

        <div className="p-2.5 bg-gray-50 border border-gray-200 rounded">
          <p className="text-[11px] font-bold text-gray-500">প্রকাশিত সংবাদ</p>
          <p className="text-lg font-black text-emerald-700">{toBengaliNumber(publishedCount)} টি</p>
        </div>

        <div className="p-2.5 bg-gray-50 border border-gray-200 rounded">
          <p className="text-[11px] font-bold text-gray-500">রিভিউ কিউ (অপেক্ষারত)</p>
          <p className="text-lg font-black text-amber-600">{toBengaliNumber(pendingCount)} টি</p>
        </div>

        <div className="p-2.5 bg-gray-50 border border-gray-200 rounded">
          <p className="text-[11px] font-bold text-gray-500">সাংবাদিক ও টিম</p>
          <p className="text-lg font-black text-purple-700">{toBengaliNumber(staffCount)} জন</p>
        </div>

        <div className="p-2.5 bg-gray-50 border border-gray-200 rounded">
          <p className="text-[11px] font-bold text-gray-500">বিজ্ঞাপন স্লট সক্রিয়</p>
          <p className="text-lg font-black text-blue-700">{toBengaliNumber(activeAdCount)} টি</p>
        </div>

      </div>
    </section>
  );
};
