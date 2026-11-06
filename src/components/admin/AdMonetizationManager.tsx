'use client';

import React from 'react';
import { AdSlot } from '@/types/admin';
import { toBengaliNumber } from '@/lib/bangla-date';
import { DollarSign } from 'lucide-react';

interface AdMonetizationManagerProps {
  adSlots: AdSlot[];
  onToggleAdSlot: (id: string) => void;
}

export const AdMonetizationManager: React.FC<AdMonetizationManagerProps> = ({
  adSlots,
  onToggleAdSlot,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-md border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span>বিজ্ঞাপন ও স্পন্সরশিপ ব্যবস্থাপনা (Monetization & Ads)</span>
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            সংবাদপত্রের ডিজিটাল ব্যানার বিজ্ঞাপন, গুগল অ্যাড ম্যানেজার ও দেশি স্পন্সরদের বিজ্ঞাপন স্লট সক্রিয় বা বন্ধ করুন।
          </p>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded">
          সিপিএম ও রেভিনিউ ইঞ্জিন সক্রিয়
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adSlots.map((ad) => (
          <div key={ad.id} className="bg-white border border-gray-200 rounded-md p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {ad.dimensions}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  ad.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'
                }`}>
                  {ad.isActive ? 'সক্রিয় (Active)' : 'বন্ধ (Paused)'}
                </span>
              </div>

              <h4 className="font-bold text-sm text-gray-900 mb-1">{ad.name}</h4>
              <p className="text-xs text-emerald-700 font-semibold mb-3">বিজ্ঞাপনদাতা: {ad.advertiserName}</p>

              <div className="aspect-16/9 bg-gray-100 rounded overflow-hidden mb-3 border">
                <img src={ad.bannerUrl} alt={ad.name} className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded">
                <div>
                  <span className="text-gray-400 block text-[10px]">মোট ইম্প্রেশন</span>
                  <span className="font-bold">{toBengaliNumber(ad.totalImpressions.toLocaleString())}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">মোট ক্লিক</span>
                  <span className="font-bold text-blue-700">{toBengaliNumber(ad.totalClicks.toLocaleString())}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onToggleAdSlot(ad.id)}
                className={`w-full py-1.5 rounded text-xs font-bold transition-colors ${
                  ad.isActive
                    ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-300'
                    : 'bg-emerald-700 text-white hover:bg-emerald-800'
                }`}
              >
                {ad.isActive ? 'বিজ্ঞাপন বন্ধ করুন (Pause)' : 'বিজ্ঞাপন লাইভ করুন (Activate)'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
