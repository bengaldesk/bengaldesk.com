import { Metadata } from 'next';
import { InfoPageLayout } from '@/components/portal/InfoPageLayout';
import { ShieldCheck, Lock, Eye, Bell, Database, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'গোপনীয়তা নীতি | Privacy Policy - দ্য বেঙ্গল ডেস্ক',
  description: 'দ্য বেঙ্গল ডেস্কের গোপনীয়তা নীতি ও পাঠক তথ্য সুরক্ষা নীতিমালা।',
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPageLayout
      titleBn="গোপনীয়তা নীতি"
      titleEn="Privacy Policy"
      subtitleBn="দ্য বেঙ্গল ডেস্ক আপনার ব্যক্তিগত তথ্যের সর্বোচ্চ সুরক্ষা ও গোপনীয়তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ।"
      subtitleEn="The Bengal Desk is committed to protecting your personal information and respecting your privacy."
      activePath="/privacy"
    >
      <div className="prose prose-slate max-w-none space-y-6 text-gray-800 text-sm sm:text-base leading-relaxed">
        
        {/* Intro Alert */}
        <div className="p-4 bg-blue-50/70 border-l-4 border-[#052962] rounded-r-lg text-xs sm:text-sm text-gray-700">
          <p className="font-semibold text-gray-900 mb-1">সর্বশেষ হালনাগাদ: ৬ নভেম্বর, ২০২৬</p>
          <p>
            এই গোপনীয়তা নীতিমালায় দ্য বেঙ্গল ডেস্ক (ওয়েবসাইট, মোবাইল অ্যাপ্লিকেশন ও ডিজিটাল সেবা)-এ আপনার তথ্যাবলী কীভাবে সংগৃহীত, ব্যবহৃত ও সংরক্ষিত হয় তা বিস্তারিত তুলে ধরা হয়েছে।
          </p>
        </div>

        {/* 1. আমরা কী কী তথ্য সংগ্রহ করি */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
            <Database className="w-5 h-5 text-[#052962]" />
            <span>১. আমরা কী কী তথ্য সংগ্রহ করি</span>
          </h2>
          <p className="mb-2">আমরা পাঠকদের কাছ থেকে নিম্নোক্ত তথ্যগুলো সংগ্রহ করতে পারি:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li><strong>সরাসরি প্রদত্ত তথ্য:</strong> আপনি যখন আমাদের নিউজলেটার সাবস্ক্রাইব করেন, অনলাইন মতামত জরিপে অংশ নেন অথবা কোনো খবর বা মন্তব্য পাঠান, তখন আপনার নাম, ইমেইল ঠিকানা বা ফোন নম্বর।</li>
            <li><strong>স্বয়ংক্রিয়ভাবে সংগৃহীত তথ্য:</strong> আপনার ডিভাইস ধরন, ব্রাউজার সংস্করণ, আইপি অ্যাড্রেস (IP Address), অপারেটিং সিস্টেম এবং ভিজিটের সময়কাল।</li>
            <li><strong>ব্যবহার সম্পর্কিত তথ্য:</strong> আপনি কোন কোন সংবাদ বেশি পড়ছেন এবং কতক্ষণ সাইটে অবস্থান করছেন তার অ্যানালিটিক্স ডাটা।</li>
          </ul>
        </div>

        {/* 2. তথ্যের ব্যবহার */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
            <Eye className="w-5 h-5 text-[#052962]" />
            <span>২. সংগৃহীত তথ্যের সদ্ব্যবহার</span>
          </h2>
          <p className="mb-2">সংগৃহীত তথ্যগুলো আমরা নিম্নলিখিত উদ্দেশ্যে ব্যবহার করি:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            <li>আপনাকে দ্রুততম ও নিরবচ্ছিন্ন সংবাদ পড়ার অভিজ্ঞতা দিতে।</li>
            <li>দৈনিক ও সান্ধ্যকালীন নিউজলেটার বা ব্রেকিং নিউজ নোটিফিকেশন পাঠাতে (আপনার সম্মতি সাপেক্ষে)।</li>
            <li>আমাদের সাইটের সার্ভার পারফরম্যান্স ও ট্রাফিক মনিটরিং উন্নত করতে।</li>
            <li>পাঠকের রুচি ও আগ্রহ অনুযায়ী প্রাসঙ্গিক সংবাদ কনটেন্ট প্রদর্শন করতে।</li>
          </ul>
        </div>

        {/* 3. কুকিজ ও ট্র্যাকিং প্রযুক্তি */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
            <Lock className="w-5 h-5 text-[#052962]" />
            <span>৩. কুকিজ (Cookies) ও ট্র্যাকিং পলিসি</span>
          </h2>
          <p>
            আমাদের সাইটে ব্যবহারকারীর ইউজার এক্সপেরিয়েন্স বাড়াতে এবং আপনার সংরক্ষিত খবর মনে রাখতে ব্রাউজার কুকিজ ব্যবহৃত হয়। আপনি চাইলে ব্রাউজারের সেটিংস থেকে কুকিজ নিষ্ক্রিয় করতে পারেন, তবে এতে ওয়েবসাইটের কিছু বিশেষ ফিচার সীমাবদ্ধ হতে পারে।
          </p>
        </div>

        {/* 4. তথ্য সুরক্ষা ও নিরাপত্তা */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-[#052962]" />
            <span>৪. তথ্যের সর্বোচ্চ নিরাপত্তা</span>
          </h2>
          <p>
            দ্য বেঙ্গল ডেস্ক সর্বাধুনিক এনক্রিপশন (SSL/TLS), ক্লাউডফ্লেয়ার ফায়ারওয়াল এবং ডাটাবেজ সিকিউরিটি প্রোটোকল অনুসরণ করে। আমরা কোনো অবস্থাতেই পাঠকদের ব্যক্তিগত তথ্য কোনো বাণিজ্যিক তৃতীয় পক্ষের কাছে বিক্রি বা ভাড়া দিই না।
          </p>
        </div>

        {/* 5. যোগাযোগের ঠিকানা */}
        <div className="pt-4 border-t border-gray-200">
          <h2 className="text-base sm:text-lg font-bold text-gray-950 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#052962]" />
            <span>গোপনীয়তা বিষয়ক অনুসন্ধান</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            আমাদের গোপনীয়তা নীতি সম্পর্কে কোনো জিজ্ঞাসা, মন্তব্য বা আপনার সংগৃহীত ডাটা মোছার অনুরোধ থাকলে সরাসরি ইমেইল করুন: <a href="mailto:privacy@thebengaldesk.com" className="text-[#052962] font-semibold underline">privacy@thebengaldesk.com</a>
          </p>
        </div>

      </div>
    </InfoPageLayout>
  );
}
