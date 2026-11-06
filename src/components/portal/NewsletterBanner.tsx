'use client';

import React, { useState } from 'react';
import { Language } from '@/types/news';
import { Mail, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface NewsletterBannerProps {
  currentLang: Language;
}

export const NewsletterBanner: React.FC<NewsletterBannerProps> = ({ currentLang }) => {
  const isBn = currentLang === 'bn';
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  return (
    <section className="my-8 sm:my-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#052962] via-[#07337a] to-[#031c44] text-white rounded-lg p-6 sm:p-8 md:p-10 shadow-lg border border-blue-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-blue-200 mb-3 border border-white/10">
                <Mail className="w-3.5 h-3.5" />
                <span>{isBn ? 'প্রতিদিনের নিউজলেটার' : 'Daily Newsletter'}</span>
              </div>

              <h3 className={`text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight ${isBn ? 'bn-headline' : 'en-headline'}`}>
                {isBn
                  ? 'দিনের সেরা সংবাদগুলো সরাসরি আপনার ইনবক্সে'
                  : 'The day\'s most crucial stories delivered to your inbox'}
              </h3>

              <p className={`text-blue-100/90 text-xs sm:text-sm max-w-xl leading-relaxed ${isBn ? 'bn-body' : 'en-body'}`}>
                {isBn
                  ? 'সকাল ও সন্ধ্যার শীর্ষ সংবাদ, অনুসন্ধানী প্রতিবেদন এবং সম্পাদকীয় বিশ্লেষণের সংকলন নিয়ে যুক্ত থাকুন দ্য বেঙ্গল ডেস্ক-এর সাথে।'
                  : 'Stay informed with our curated morning & evening briefs, exclusive investigations, and authoritative editorial commentary.'}
              </p>

              <div className="mt-3 flex items-center gap-2 text-[11px] text-blue-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? 'সম্পূর্ণ স্প্যাম-মুক্ত • যেকোনো সময় আনসাবস্ক্রাইবযোগ্য' : '100% Spam-free • Unsubscribe at any time'}</span>
              </div>
            </div>

            {/* Right Form (5 cols) */}
            <div className="lg:col-span-5">
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isBn ? 'আপনার ইমেইল অ্যাড্রেস লিখুন...' : 'Enter your email address...'}
                    required
                    className="flex-1 px-4 py-3 text-xs sm:text-sm bg-white text-gray-900 rounded-md placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 shadow-sm"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-gray-950 rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    <span>{isBn ? 'সাবস্ক্রাইব' : 'Subscribe'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="bg-white/10 border border-emerald-400/40 rounded-md p-4 text-center backdrop-blur-xs">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 mx-auto flex items-center justify-center mb-2">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {isBn ? 'অভিনন্দন! আপনি সফলভাবে যুক্ত হয়েছেন' : 'Thank you for subscribing!'}
                  </h4>
                  <p className="text-xs text-blue-200">
                    {isBn
                      ? 'পরবর্তী নিউজলেটারটি খুব শীঘ্রই আপনার ইনবক্সে পৌঁছাবে।'
                      : 'The next edition will be on its way to your inbox shortly.'}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
