'use client';

import React, { useState } from 'react';
import { SiteSettings } from '@/types/admin';
import { Settings } from 'lucide-react';

interface SiteSettingsManagerProps {
  siteSettings: SiteSettings;
  onSave: (settings: Partial<SiteSettings>) => void;
}

export const SiteSettingsManager: React.FC<SiteSettingsManagerProps> = ({
  siteSettings,
  onSave,
}) => {
  const [form, setForm] = useState<SiteSettings>(siteSettings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 shadow-xs max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-700" />
            <span>সংবাদপত্র পরিচিতি, প্রকাশক ও আইনি তথ্য সেটিংস</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            সংবাদপত্রের মালিক ও প্রধান সম্পাদক হিসেবে কপিরাইট, প্রেস কাউন্সিল নিবন্ধন ও নিউজরুম ঠিকানা পরিবর্তন করুন।
          </p>
        </div>
        {saved && (
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded">
            সেটিংস সফলভাবে সংরক্ষিত!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">সংবাদপত্রের নাম (বাংলা)</label>
            <input
              type="text"
              value={form.siteNameBn}
              onChange={(e) => setForm({ ...form, siteNameBn: e.target.value })}
              className="w-full border p-2 rounded outline-none focus:border-red-600"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">সংবাদপত্রের নাম (English)</label>
            <input
              type="text"
              value={form.siteNameEn}
              onChange={(e) => setForm({ ...form, siteNameEn: e.target.value })}
              className="w-full border p-2 rounded outline-none focus:border-red-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">সম্পাদক ও প্রকাশকের নাম</label>
            <input
              type="text"
              value={form.editorName}
              onChange={(e) => setForm({ ...form, editorName: e.target.value, publisherName: e.target.value })}
              className="w-full border p-2 rounded outline-none focus:border-red-600"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">প্রেস কাউন্সিল / তথ্য মন্ত্রণালয় নিবন্ধন নং</label>
            <input
              type="text"
              value={form.registrationNumber}
              onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
              className="w-full border p-2 rounded outline-none focus:border-red-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 mb-1">বার্তা সম্পাদক</label>
            <input
              type="text"
              value={form.newsEditor}
              onChange={(e) => setForm({ ...form, newsEditor: e.target.value })}
              className="w-full border p-2 rounded outline-none focus:border-red-600"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 mb-1">হটলাইন ও ফোন নম্বর</label>
            <input
              type="text"
              value={form.hotlinePhone}
              onChange={(e) => setForm({ ...form, hotlinePhone: e.target.value })}
              className="w-full border p-2 rounded outline-none focus:border-red-600"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">কেন্দ্রীয় কার্যালয়ের ঠিকানা</label>
          <input
            type="text"
            value={form.officeAddress}
            onChange={(e) => setForm({ ...form, officeAddress: e.target.value })}
            className="w-full border p-2 rounded outline-none focus:border-red-600"
          />
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button
            type="submit"
            className="bg-red-700 hover:bg-red-800 text-white font-bold text-xs px-6 py-2 rounded shadow-xs"
          >
            সেটিংস সংরক্ষণ করুন
          </button>
        </div>
      </form>
    </div>
  );
};
