import { Metadata } from 'next';
import { InfoPageLayout } from '@/components/portal/InfoPageLayout';
import { FileText, Copyright, AlertTriangle, ShieldAlert, Scale, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ব্যবহারের শর্তাবলী | Terms of Use - দ্য বেঙ্গল ডেস্ক',
  description: 'দ্য বেঙ্গল ডেস্ক পোর্টাল ব্যবহারের নিয়ম ও আইনি শর্তাবলী।',
};

export default function TermsPage() {
  return (
    <InfoPageLayout
      titleBn="ব্যবহারের শর্তাবলী"
      titleEn="Terms of Use"
      subtitleBn="দ্য বেঙ্গল ডেস্ক ওয়েবসাইট ও সেবা ব্যবহারের আইনি নীতিমালা ও গ্রাহক নির্দেশিকা।"
      subtitleEn="Legal terms, copyright regulations and conditions governing the use of The Bengal Desk portal."
      activePath="/terms"
    >
      <div className="prose prose-slate max-w-none space-y-6 text-gray-800 text-sm sm:text-base leading-relaxed">
        
        {/* Intro */}
        <div className="p-4 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-lg text-xs sm:text-sm text-gray-700">
          <p className="font-semibold text-gray-900 mb-1">গুরুত্বপূর্ণ নোটিশ:</p>
          <p>
            দ্য বেঙ্গল ডেস্ক-এর যে কোনো প্ল্যাটফর্ম, মোবাইল অ্যাপ্লিকেশন বা অনলাইন সেবা ব্রাউজ বা ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলীতে সম্পূর্ণ সম্মতি জ্ঞাপন করছেন।
          </p>
        </div>

        {/* 1. মেধাস্বত্ব ও কপিরাইট */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
            <Copyright className="w-5 h-5 text-[#052962]" />
            <span>১. মেধাস্বত্ব ও কনটেন্ট কপিরাইট</span>
          </h2>
          <p className="mb-2">
            দ্য বেঙ্গল ডেস্কে প্রকাশিত সকল সংবাদ, অনুসন্ধানী প্রতিবেদন, সম্পাদকীয়, বিশ্লেষণ, স্থিরচিত্র, গ্রাফিক্স, ভিডিও, অডিও এবং মূল ভেক্টর লোগোর স্বত্ব সর্বতোভাবে দ্য বেঙ্গল ডেস্ক ও তার প্রকাশকের সংরক্ষিত।
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>লিখিত পূর্বানুমতি ছাড়া কোনো কনটেন্ট হুবহু কপি, পুনঃপ্রকাশ, বাণিজ্যিক প্রচার বা বিক্রি সম্পূর্ণ নিষিদ্ধ।</li>
            <li>সংবাদের অংশবিশেষ উদ্ধৃতি হিসেবে ব্যবহারে অবশ্যই সুস্পষ্টভাবে <strong className="text-gray-900">“দ্য বেঙ্গল ডেস্ক”</strong>-কে ক্রেডিট ও অ্যাক্টিভ হাইপারলিংক প্রদান করতে হবে।</li>
          </ul>
        </div>

        {/* 2. ব্যবহারকারীর আচরণ ও মন্তব্য নীতি */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-[#052962]" />
            <span>২. ব্যবহারকারীর আচরণ ও মন্তব্য নীতিমালা</span>
          </h2>
          <p className="mb-2">
            আমাদের জরিপ, মতামত বা পাঠকদের উন্মুক্ত ফোরামে অংশ নেওয়ার ক্ষেত্রে পাঠকদের শালীনতা বজায় রাখতে হবে। কোনো অবস্থাতেই নিম্নোক্ত আচরণ গ্রহণযোগ্য নয়:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>ধর্মীয় বিদ্বেষ, সাম্প্রদায়িক উসকানি, অশ্লীল বা মানহানিকর কোনো বক্তব্য প্রকাশ।</li>
            <li>জাতীয় নিরাপত্তা বা জনশৃঙ্খলা বিঘ্নিত করে এমন কোনো বিভ্রান্তিকর বা উদ্দেশ্যপ্রণোদিত তথ্য ছড়ানো।</li>
            <li>স্প্যামিং, অপ্রাসঙ্গিক বাণিজ্যিক লিংক বা ফিশিং লিঙ্ক পোস্ট করা।</li>
          </ul>
        </div>

        {/* 3. দায়বদ্ধতা সীমাবদ্ধতা */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
            <ShieldAlert className="w-5 h-5 text-[#052962]" />
            <span>৩. দায়বদ্ধতা সীমাবদ্ধতা (Disclaimer of Liability)</span>
          </h2>
          <p>
            আমরা বস্তুনিষ্ঠ ও সঠিক তথ্য পরিবেশনে সদা সচেষ্ট। তবে যেকোনো সময়ে ইন্টারনেট সার্ভার বিপর্যয়, অনাকাঙ্ক্ষিত কারিগরি ত্রুটি বা তৃতীয় পক্ষের লিংকের তথ্যের যথার্থতার জন্য বেঙ্গল ডেস্ক কোনো বাণিজ্যিক ক্ষতিপূরণের দায়ভার গ্রহণ করে না।
          </p>
        </div>

        {/* 4. আইনগত এখতিয়ার */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
            <Scale className="w-5 h-5 text-[#052962]" />
            <span>৪. প্রযোজ্য আইন ও বিচারিক এখতিয়ার</span>
          </h2>
          <p>
            এই শর্তাবলী গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত আইন ও তথ্যপ্রযুক্তি বিধিমালার অধীনে পরিচালিত ও নিয়ন্ত্রিত হবে। যেকোনো বিরোধ নিষ্পত্তির ক্ষেত্রে ঢাকার উপযুক্ত আদালতের এখতিয়ার চূড়ান্ত হিসেবে গণ্য হবে।
          </p>
        </div>

        {/* 5. শর্তাবলীর পরিবর্তন */}
        <div className="pt-4 border-t border-gray-200">
          <h2 className="text-base sm:text-lg font-bold text-gray-950 mb-2 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#052962]" />
            <span>শর্তাবলীর পরিবর্তন ও পরিমার্জন</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            কর্তৃপক্ষ যেকোনো সময় পূর্ব ঘোষণা ছাড়াই এই শর্তাবলী সংশোধন বা পরিমার্জন করার অধিকার সংরক্ষণ করে। এ বিষয়ে প্রশ্নের জন্য যোগাযোগ করুন: <a href="mailto:legal@thebengaldesk.com" className="text-[#052962] font-semibold underline">legal@thebengaldesk.com</a>
          </p>
        </div>

      </div>
    </InfoPageLayout>
  );
}
