import { Metadata } from 'next';
import { InfoPageLayout } from '@/components/portal/InfoPageLayout';
import { Target, Compass, Award, Users, BookOpen, ShieldCheck, HeartHandshake } from 'lucide-react';
import { BrandLogo } from '@/components/portal/BrandLogo';

export const metadata: Metadata = {
  title: 'আমাদের সম্পর্কে | About Us - দ্য বেঙ্গল ডেস্ক',
  description: 'দ্য বেঙ্গল ডেস্কের পরিচিতি, লক্ষ্য, সম্পাদকীয় নীতি ও সাংবাদিকতার অঙ্গীকার।',
};

export default function AboutPage() {
  return (
    <InfoPageLayout
      titleBn="আমাদের সম্পর্কে"
      titleEn="About The Bengal Desk"
      subtitleBn="বস্তুনিষ্ঠ, স্বাধীন ও নির্ভরযোগ্য সাংবাদিকতার প্রত্যয়ে প্রকাশিত আধুনিক জাতীয় দৈনিক।"
      subtitleEn="An independent, authoritative, and progressive digital newspaper upholding integrity in journalism."
      activePath="/about"
    >
      <div className="space-y-8 text-gray-800 text-sm sm:text-base leading-relaxed">
        
        {/* Brand Hero Callout */}
        <div className="p-6 bg-gradient-to-r from-blue-50/80 via-white to-blue-50/50 border border-blue-200/80 rounded-xl flex flex-col sm:flex-row items-center gap-6 shadow-xs">
          <div className="w-full sm:w-1/3 flex justify-center">
            <BrandLogo variant="brand" className="w-48 sm:w-56" showTagline={false} />
          </div>
          <div className="w-full sm:w-2/3 border-t sm:border-t-0 sm:border-l border-blue-200 pt-4 sm:pt-0 sm:pl-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
              বস্তুনিষ্ঠতার শক্তি, নিরপেক্ষতার সাহস
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              দ্রুত পরিবর্তনশীল বিশ্বের সাথে তাল মিলিয়ে বাংলাদেশের মাটি ও মানুষের কথা, অর্থনীতি, রাজনীতি, প্রযুক্তি ও অনুসন্ধানী সত্যকে পাঠকের দোরগোড়ায় পৌঁছে দিতে দ্য বেঙ্গল ডেস্ক নিরবচ্ছিন্নভাবে কাজ করে চলেছে।
            </p>
          </div>
        </div>

        {/* 1. আমাদের লক্ষ্য ও ভিশন */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
            <Target className="w-5 h-5 text-[#052962]" />
            <span>আমাদের লক্ষ্য ও দৃষ্টিভঙ্গি (Our Mission & Vision)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#052962] text-base mb-1.5 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#052962]" />
                <span>মিশন (Mission)</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                কোনো রাজনৈতিক বা বাণিজ্যিক প্রভাবমুক্ত থেকে নিখাদ সত্য উদঘাটন করা, জনগণের তথ্যের অধিকার সুরক্ষা করা এবং দেশের সার্বিক উন্নয়নে দায়িত্বশীল গণমাধ্যম হিসেবে ভূমিকা রাখা।
              </p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <h3 className="font-bold text-[#052962] text-base mb-1.5 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#052962]" />
                <span>ভিশন (Vision)</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                আন্তর্জাতিক সাংবাদিকতার সর্বোচ্চ মানদণ্ড ও সর্বাধুনিক প্রযুক্তির সমন্বয়ে দক্ষিণ এশিয়ার অন্যতম বিশ্বাসযোগ্য ও প্রভাবশালী ডিজিটাল সংবাদ প্রতিষ্ঠান হিসেবে নিজেকে প্রতিষ্ঠা করা।
              </p>
            </div>
          </div>
        </div>

        {/* 2. আমাদের মূল স্তম্ভসমূহ */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-[#052962]" />
            <span>আমাদের মৌলিক অঙ্গীকারসমূহ</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200/80 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#052962]/10 text-[#052962] flex items-center justify-center mb-2">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">১০০% তথ্যের সত্যতা</h4>
              <p className="text-xs text-gray-600">প্রতিটি সংবাদের সত্যতা প্রকাশের পূর্বে একাধিক নির্ভরযোগ্য সূত্রে যাচাই-বাছাই করা হয়।</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200/80 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#052962]/10 text-[#052962] flex items-center justify-center mb-2">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">নিরপেক্ষ দৃষ্টিভঙ্গি</h4>
              <p className="text-xs text-gray-600">সকল মত ও পক্ষের যৌক্তিক বক্তব্যকে সমান গুরুত্বের সাথে তুলে ধরা আমাদের সম্পাদকীয় নীতি।</p>
            </div>
            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200/80 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#052962]/10 text-[#052962] flex items-center justify-center mb-2">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">জনস্বার্থ প্রথম</h4>
              <p className="text-xs text-gray-600">সাধারণ মানুষের অধিকার, সুশাসন, অর্থনীতি ও জাতীয় অগ্রগতিই আমাদের সকল প্রতিবেদনের কেন্দ্রবিন্দু।</p>
            </div>
          </div>
        </div>

        {/* 3. সম্পাদকীয় নেতৃত্ব ও পরিচালনা পর্ষদ */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
            <Users className="w-5 h-5 text-[#052962]" />
            <span>সম্পাদকীয় নেতৃত্ব ও ব্যবস্থাপনা</span>
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm">
              <div>
                <span className="font-bold text-gray-900 block sm:inline">আহমেদ তানভীর</span>
                <span className="text-gray-500 sm:ml-2">— প্রধান সম্পাদক ও প্রকাশক</span>
              </div>
              <span className="text-[#052962] font-semibold">editor@thebengaldesk.com</span>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm">
              <div>
                <span className="font-bold text-gray-900 block sm:inline">শাহরিয়ার খান</span>
                <span className="text-gray-500 sm:ml-2">— বার্তা সম্পাদক (News Editor)</span>
              </div>
              <span className="text-[#052962] font-semibold">news@thebengaldesk.com</span>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm">
              <div>
                <span className="font-bold text-gray-900 block sm:inline">ড. সালমা চৌধুরী</span>
                <span className="text-gray-500 sm:ml-2">— প্রধান সম্পাদকীয় লেখক ও মতামত সমন্বয়ক</span>
              </div>
              <span className="text-[#052962] font-semibold">opinion@thebengaldesk.com</span>
            </div>
          </div>
        </div>

      </div>
    </InfoPageLayout>
  );
}
