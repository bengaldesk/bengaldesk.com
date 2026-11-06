import { Metadata } from 'next';
import { InfoPageLayout } from '@/components/portal/InfoPageLayout';
import { Megaphone, TrendingUp, Users, Monitor, Award, Download, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'বিজ্ঞাপন ও স্পনসরশিপ | Advertise - দ্য বেঙ্গল ডেস্ক',
  description: 'দ্য বেঙ্গল ডেস্কে বিজ্ঞাপন দিন। ডিজিটাল মিডিয়া কিট, পাঠক পরিসংখ্যান ও অ্যাড রেটকার্ড।',
};

export default function AdvertisePage() {
  return (
    <InfoPageLayout
      titleBn="বিজ্ঞাপন ও বাণিজ্যিক প্রচার"
      titleEn="Advertise with Us"
      subtitleBn="বাংলাদেশের সবচেয়ে সম্ভাবনাময়, সচেতন ও শিক্ষিত পাঠকশ্রেণীর কাছে আপনার ব্র্যান্ডকে তুলে ধরুন।"
      subtitleEn="Reach high-income, informed, and influential digital readers across Bangladesh and the global diaspora."
      activePath="/advertise"
    >
      <div className="space-y-8 text-gray-800 text-sm sm:text-base leading-relaxed">
        
        {/* Readership Highlights */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#052962]" />
            <span>কেন দ্য বেঙ্গল ডেস্কে বিজ্ঞাপন দেবেন?</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 text-center">
            <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-xl">
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#052962]">২.৫M+</span>
              <span className="text-xs text-gray-600 mt-1 block">মাসিক ইউনিক ভিজিটর</span>
            </div>
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
              <span className="block text-2xl sm:text-3xl font-extrabold text-emerald-700">১২M+</span>
              <span className="text-xs text-gray-600 mt-1 block">মাসিক পেজভিউ</span>
            </div>
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl">
              <span className="block text-2xl sm:text-3xl font-extrabold text-amber-600">৬৮%</span>
              <span className="text-xs text-gray-600 mt-1 block">২৫-৪৪ বছর বয়সী তরুণ ও পেশাজীবী</span>
            </div>
            <div className="p-4 bg-purple-50/70 border border-purple-200/80 rounded-xl">
              <span className="block text-2xl sm:text-3xl font-extrabold text-purple-700">৮২%</span>
              <span className="text-xs text-gray-600 mt-1 block">স্মার্টফোন ও মোবাইল ট্রাফিক</span>
            </div>
          </div>
        </div>

        {/* Ad Formats & Placements */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
            <Monitor className="w-5 h-5 text-[#052962]" />
            <span>বিজ্ঞাপনের ফরম্যাট ও ডিসপ্লে সাইজ</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-white space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-sm">টপ লিডারবোর্ড (Leaderboard)</h3>
                <span className="text-xs bg-blue-50 text-[#052962] px-2 py-0.5 rounded font-mono">970x90 / 728x90</span>
              </div>
              <p className="text-xs text-gray-600">
                হেডারের ঠিক নিচে বা প্রধান সংবাদের উপরে অবস্থান। সর্বোচ্চ ইম্প্রেশন ও ব্র্যান্ড রিকলের জন্য আদর্শ।
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg bg-white space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-sm">ইন-আর্টিকেল ব্যানার (In-Article MPU)</h3>
                <span className="text-xs bg-blue-50 text-[#052962] px-2 py-0.5 rounded font-mono">300x250 / 336x280</span>
              </div>
              <p className="text-xs text-gray-600">
                খবরের লেখার মাঝে স্বাভাবিকভাবে মিশে থাকা বিজ্ঞাপন। সর্বোচ্চ ক্লিক-থ্রু রেট (CTR) নিশ্চিত করে।
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg bg-white space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-sm">স্পনসরড আর্টিকেল / ব্রান্ডেড কনটেন্ট</h3>
                <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">Native Story</span>
              </div>
              <p className="text-xs text-gray-600">
                আপনার প্রতিষ্ঠানের সাফল্য, পণ্য বা সেবার বিশেষ প্রতিবেদন যা আমাদের বিশেষ প্রতিবেদক দলের মাধ্যমে রচিত হয়।
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg bg-white space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-sm">ভিডিও প্রি-রোল ও মাল্টিমিডিয়া</h3>
                <span className="text-xs bg-red-50 text-red-700 px-2 py-0.5 rounded">Video Ad</span>
              </div>
              <p className="text-xs text-gray-600">
                আমাদের নিয়মিত ভিডিও বুলেটিন ও এক্সক্লুসিভ ভিডিও প্লেয়ারে ৫-১৫ সেকেন্ডের ভিডিও প্রচার।
              </p>
            </div>
          </div>
        </div>

        {/* Media Kit Request & Contact */}
        <div className="p-6 bg-[#052962] text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold mb-1">পূর্ণাঙ্গ মিডিয়া কিট ও রেটকার্ড চান?</h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-lg leading-relaxed">
              আমাদের বাণিজ্যিক দলের সাথে কথা বলে আপনার বাজেটের মধ্যে সেরা ব্র্যান্ড প্রচার পরিকল্পনা চূড়ান্ত করুন।
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="mailto:ads@thebengaldesk.com?subject=Advertisement%20Inquiry%20-%20The%20Bengal%20Desk"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>রেটকার্ডের জন্য ইমেইল করুন</span>
            </a>
          </div>
        </div>

        {/* Commercial Department Contact */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm text-gray-700">
          <p className="font-bold text-gray-900 mb-1">বাণিজ্যিক ও বিজ্ঞাপন বিভাগ সরাসরি যোগাযোগ:</p>
          <p>মোবাইল / হোয়াটসঅ্যাপ: +৮৮০ ১৭xxxxxxxx (ম্যানেজার, করপোরেট সেলস)</p>
          <p>ইমেইল: <a href="mailto:ads@thebengaldesk.com" className="text-[#052962] font-semibold underline">ads@thebengaldesk.com</a></p>
        </div>

      </div>
    </InfoPageLayout>
  );
}
