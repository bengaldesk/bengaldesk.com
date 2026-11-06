import { Metadata } from 'next';
import { InfoPageLayout } from '@/components/portal/InfoPageLayout';
import { CheckCircle2, RefreshCw, EyeOff, Scale, ShieldAlert, Award, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'সম্পাদকীয় নীতিমালা ও আচরণবিধি | Editorial Policy - দ্য বেঙ্গল ডেস্ক',
  description: 'দ্য বেঙ্গল ডেস্কের সম্পাদকীয় নীতি, ফ্যাক্ট-চেকিং গাইডলাইন ও সংবাদ সংশোধন নীতিমালা।',
};

export default function EditorialPolicyPage() {
  return (
    <InfoPageLayout
      titleBn="সম্পাদকীয় নীতিমালা ও আচরণবিধি"
      titleEn="Editorial Policy & Code of Ethics"
      subtitleBn="নির্ভুল সাংবাদিকতা, ফ্যাক্ট-চেক মানদণ্ড ও সংবাদ সংশোধন সংক্রান্ত প্রাতিষ্ঠানিক নির্দেশিকা।"
      subtitleEn="Institutional guidelines on fact-checking, corrections, source verification, and editorial integrity."
      activePath="/editorial-policy"
    >
      <div className="space-y-8 text-gray-800 text-sm sm:text-base leading-relaxed">
        
        {/* Intro Banner */}
        <div className="p-4 bg-emerald-50/70 border-l-4 border-emerald-600 rounded-r-lg text-xs sm:text-sm text-gray-700">
          <p className="font-semibold text-gray-900 mb-1">সম্পাদকীয় অঙ্গীকার:</p>
          <p>
            দ্য বেঙ্গল ডেস্ক বিশ্বাস করে—গণমাধ্যমের সবচেয়ে বড় শক্তি হলো সত্যনিষ্ঠতা ও গ্রহণযোগ্যতা। যেকোনো চাঞ্চল্যকর খবরের আগে তথ্যের নিখুঁত সত্যতা নিরূপণ করাই আমাদের প্রথম অগ্রাধিকার।
          </p>
        </div>

        {/* 1. ফ্যাক্ট-চেকিং ও সত্যতা যাচাই */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-[#052962]" />
            <span>১. ফ্যাক্ট-চেকিং ও তথ্য যাচাইয়ের মানদণ্ড</span>
          </h2>
          <p className="mb-2">
            আমাদের নিউজরুমে প্রতিটি প্রতিবেদন প্রকাশের আগে তিন-স্তরের সম্পাদকীয় যাচাই ব্যবস্থার (Three-Tier Editorial Verification) মধ্য দিয়ে যায়:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>প্রাথমিক উৎস যাচাই:</strong> কোনো প্রত্যক্ষদর্শী, অফিশিয়াল ডকুমেন্ট বা সরকারি গ্যাজেট ছাড়া মুখে মুখে শোনা কথার ভিত্তিতে খবর প্রচার করা হয় না।</li>
            <li><strong>দ্বিতীয় পক্ষের বক্তব্য:</strong> কারো বিরুদ্ধে অভিযোগসংবলিত প্রতিবেদন তৈরি হলে অবশ্যই অভিযুক্ত ব্যক্তি বা প্রতিষ্ঠানের বক্তব্য গ্রহণের জন্য প্রয়োজনীয় সময় ও সুযোগ দেওয়া হয়।</li>
            <li><strong>তথ্যপ্রযুক্তি ও ইমেজ ফরেনসিক:</strong> সামাজিক যোগাযোগমাধ্যম থেকে পাওয়া ছবি বা ভিডিও প্রকাশের পূর্বে তার মেটাডাটা ও রিভার্স ইমেজ যাচাই করে নিশ্চিত করা হয়।</li>
          </ul>
        </div>

        {/* 2. ভুল সংশোধন নীতিমালা (Corrections Policy) */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
            <RefreshCw className="w-5 h-5 text-[#052962]" />
            <span>২. স্পষ্ট ও স্বচ্ছ ভুল সংশোধন নীতি (Corrections Policy)</span>
          </h2>
          <p className="mb-2">
            অসাবধানতাবশত কোনো তথ্যে বা বানানে ভুল পরিলক্ষিত হলে দ্য বেঙ্গল ডেস্ক তা ধামাচাপা দেয় না; বরং অত্যন্ত বিনয়ের সাথে তা দ্রুত সংশোধন করে এবং সংবাদের নিচে ‘সংশোধন’ বা ‘আপডেট’ নোট যোগ করে।
          </p>
          <p className="text-xs text-gray-600">
            কোনো সংবাদের তথ্য সংশোধনের প্রয়োজন মনে হলে যে কেউ <a href="mailto:corrections@thebengaldesk.com" className="text-[#052962] font-bold underline">corrections@thebengaldesk.com</a> এ ইমেইল করে উপযুক্ত প্রমাণসহ জানাতে পারেন।
          </p>
        </div>

        {/* 3. পরিচয় গোপন রাখার নীতিমালা (Anonymous Sources) */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
            <EyeOff className="w-5 h-5 text-[#052962]" />
            <span>৩. পরিচয় গোপন রাখার সুরক্ষা (Unnamed Sources)</span>
          </h2>
          <p>
            সাধারণত আমরা সূত্রের নাম ও পরিচয় স্পষ্টভাবে প্রকাশের পক্ষপাতী। তবে কোনো জনস্বার্থমূলক বা অত্যন্ত স্পর্শকাতর অনুসন্ধানী প্রতিবেদনের ক্ষেত্রে সূত্রের জীবন, চাকরি বা শারীরিক নিরাপত্তার ঝুঁকি থাকলে প্রধান সম্পাদকের সরাসরি লিখিত অনুমোদনক্রমে নাম প্রকাশ না করার সিদ্ধান্ত নেওয়া হয়।
          </p>
        </div>

        {/* 4. স্বার্থের সংঘাত (Conflict of Interest) */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
            <Scale className="w-5 h-5 text-[#052962]" />
            <span>৪. স্বার্থের সংঘাত ও বাণিজ্যিক উপহার বর্জন</span>
          </h2>
          <p>
            দ্য বেঙ্গল ডেস্কের কোনো সাংবাদিক বা সম্পাদক কোনো রাজনৈতিক দল, করপোরেট প্রতিষ্ঠান বা সুবিধাভোগী গোষ্ঠীর কাছ থেকে কোনো ধরনের আর্থিক সুবিধা, মূল্যবান উপহার বা বিশেষ আতিথেয়তা গ্রহণ করতে পারেন না। বিজ্ঞাপন বিভাগ ও সম্পাদকীয় বিভাগ সম্পূর্ণ স্বাধীন ও স্বতন্ত্রভাবে পরিচালিত হয়।
          </p>
        </div>

      </div>
    </InfoPageLayout>
  );
}
