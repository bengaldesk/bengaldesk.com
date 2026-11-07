'use client';

import React from 'react';
import Link from 'next/link';
import { Language } from '@/types/news';
import { categories } from '@/data/categories';
import { FacebookIcon, TwitterIcon, YoutubeIcon, LinkedinIcon } from '@/components/icons/SocialIcons';
import { Mail, Phone, MapPin } from 'lucide-react';
import { BrandLogo } from '@/components/portal/BrandLogo';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const isBn = currentLang === 'bn';

  return (
    <footer className="bg-gray-950 text-gray-300 border-t-4 border-red-700 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-gray-800">
          
          {/* Col 1: Brand & Editorial Identity */}
          <div className="space-y-4">
            <div className="flex items-start">
              <BrandLogo
                variant="white"
                className="w-48 sm:w-56"
                showTagline={false}
                isBn={isBn}
              />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {isBn
                ? 'বস্তুনিষ্ঠ, স্বাধীন ও দায়িত্বশীল সাংবাদিকতার প্রত্যয়ে প্রকাশিত একটি জাতীয় ডিজিটাল সংবাদপত্র।'
                : 'An independent, objective, and responsible national digital newspaper delivering high-integrity journalism.'}
            </p>
            <div className="text-xs text-gray-400 space-y-1">
              <p><strong className="text-gray-200">{isBn ? 'সম্পাদক ও প্রকাশক:' : 'Editor & Publisher:'}</strong> {isBn ? 'আহমেদ তানভীর' : 'Ahmed Tanvir'}</p>
              <p><strong className="text-gray-200">{isBn ? 'বার্তা সম্পাদক:' : 'News Editor:'}</strong> {isBn ? 'শাহরিয়ার খান' : 'Shahriar Khan'}</p>
            </div>
          </div>

          {/* Col 2: Quick Category Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-red-700 pl-2">
              {isBn ? 'বিভাগসমূহ' : 'Categories'}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categories.slice(1).map((cat) => (
                <span
                  key={cat.id}
                  className="hover:text-red-400 cursor-pointer transition-colors"
                >
                  {isBn ? cat.nameBn : cat.nameEn}
                </span>
              ))}
            </div>
          </div>

          {/* Col 3: Contact & Newsroom Address */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-red-700 pl-2">
              {isBn ? 'যোগাযোগ ও নিউজরুম' : 'Newsroom & Contact'}
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{isBn ? 'কাওরান বাজার, ঢাকা-১২১৫, বাংলাদেশ' : 'Karwan Bazar, Dhaka-1215, Bangladesh'}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>+৮৮০ ২ ৯৮৭৬৫৪৩</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>newsdesk@thebengaldesk.com</span>
              </p>
            </div>
          </div>

          {/* Col 4: Social & Ethics */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-l-2 border-red-700 pl-2">
              {isBn ? 'সামাজিক যোগাযোগ' : 'Connect with Us'}
            </h4>
            <div className="flex items-center gap-2 mb-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-black flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <TwitterIcon className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-blue-700 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="text-[11px] text-gray-500">
              {isBn
                ? 'স্বত্ব © ২০২৬ দ্য বেঙ্গল ডেস্ক। এই পোর্টালে প্রকাশিত সকল সংবাদ, ছবি ও লেখার স্বত্ব সংরক্ষিত।'
                : 'Copyright © 2026 The Bengal Desk. All rights reserved across all editions.'}
            </p>
          </div>

        </div>

        {/* Bottom Legal, Policy & SEO Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/about" className="hover:text-white transition-colors">{isBn ? 'আমাদের সম্পর্কে' : 'About Us'}</Link>
            <Link href="/editorial-policy" className="hover:text-white transition-colors">{isBn ? 'সম্পাদকীয় নীতিমালা' : 'Editorial Policy'}</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">{isBn ? 'গোপনীয়তা নীতি' : 'Privacy Policy'}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{isBn ? 'ব্যবহারের শর্তাবলী' : 'Terms of Use'}</Link>
            <Link href="/advertise" className="hover:text-white transition-colors">{isBn ? 'বিজ্ঞাপন' : 'Advertising'}</Link>
            <Link href="/archive" className="hover:text-white transition-colors">{isBn ? 'আর্কাইভ' : 'Archive'}</Link>
            <Link href="/contact" className="hover:text-white transition-colors">{isBn ? 'যোগাযোগ' : 'Contact Us'}</Link>
          </div>
          <p className="text-gray-400 text-xs">
            © 2026 {isBn ? 'দ্য বেঙ্গল ডেস্ক। সর্বস্বত্ব সংরক্ষিত।' : 'The Bengal Desk. All rights reserved.'}
          </p>
        </div>

      </div>
    </footer>
  );
};
