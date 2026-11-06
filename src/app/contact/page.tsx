'use client';

import React, { useState } from 'react';
import { InfoPageLayout } from '@/components/portal/InfoPageLayout';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSent(true);
  };

  return (
    <InfoPageLayout
      titleBn="যোগাযোগ ও নিউজরুম"
      titleEn="Contact & Newsroom"
      subtitleBn="আপনার যেকোনো সংবাদ টিপস, তথ্য, মতামত বা অনুসন্ধানের জন্য বেঙ্গল ডেস্কের সাথে সরাসরি যোগাযোগ করুন।"
      subtitleEn="Get in touch with our newsroom, editorial desk, business team, or send news tips directly."
      activePath="/contact"
    >
      <div className="space-y-8 text-gray-800 text-sm sm:text-base leading-relaxed">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 sm:p-5 bg-blue-50/60 border border-blue-200/80 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-[#052962] text-white flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">কেন্দ্রীয় কার্যালয়</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              বেঙ্গল মিডিয়া টাওয়ার, প্লট ১২, বীর উত্তম সি আর দত্ত রোড, কাওরান বাজার, ঢাকা-১২১৫, বাংলাদেশ।
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-emerald-50/60 border border-emerald-200/80 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center mb-3">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">টেলিফোন ও হটলাইন</h3>
            <div className="text-xs sm:text-sm text-gray-600 space-y-1">
              <p>নিউজরুম: +৮৮০ ২ ৯৮৭৬৫৪৩</p>
              <p>বিজ্ঞাপন বিভাগ: +৮৮০ ২ ৯৮৭৬৫৪৪</p>
              <p>হটলাইন: ০৯৬১২-৩৩৪৫৬৭</p>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-purple-50/60 border border-purple-200/80 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center mb-3">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">ইমেইল ঠিকানা</h3>
            <div className="text-xs sm:text-sm text-gray-600 space-y-1">
              <p>সাধারণ: info@thebengaldesk.com</p>
              <p>বার্তা বিভাগ: newsdesk@thebengaldesk.com</p>
              <p>বিজ্ঞাপন: ads@thebengaldesk.com</p>
            </div>
          </div>
        </div>

        {/* Interactive Contact Form */}
        <div className="border border-gray-200 rounded-xl p-6 sm:p-8 bg-white shadow-2xs">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-5">
            <MessageSquare className="w-5 h-5 text-[#052962]" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              আমাদের সরাসরি বার্তা বা সংবাদ টিপস পাঠান
            </h3>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    আপনার পূর্ণ নাম *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="উদাঃ রফিকুল ইসলাম"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#052962] bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    ইমেইল ঠিকানা *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#052962] bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    মোবাইল নম্বর (ঐচ্ছিক)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="০১৭xxxxxxxx"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#052962] bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    যোগাযোগের বিষয়
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#052962] bg-gray-50 focus:bg-white"
                  >
                    <option value="general">সাধারণ জিজ্ঞাসা (General Inquiry)</option>
                    <option value="tip">সংবাদ টিপস বা তথ্য (News Tip)</option>
                    <option value="opinion">মতামত বা চিঠি (Letter to Editor)</option>
                    <option value="ads">বিজ্ঞাপন বা স্পনসরশিপ (Advertising)</option>
                    <option value="correction">সংশোধন বা আপত্তি (Correction/Complaint)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  আপনার বার্তা বা সংবাদের বিবরণ *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="বিস্তারিত এখানে লিখুন..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#052962] bg-gray-50 focus:bg-white"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#052962] hover:bg-[#073a8a] text-white font-bold rounded-lg transition-colors flex items-center gap-2 text-xs sm:text-sm cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>বার্তা পাঠান</span>
              </button>
            </form>
          ) : (
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">ধন্যবাদ! আপনার বার্তাটি সফলভাবে পৌঁছাল।</h4>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                আমাদের সংশ্লিষ্ট নিউজরুম টিম খুব দ্রুত আপনার বার্তার মূল্যায়ন করে প্রয়োজনে আপনার সাথে যোগাযোগ করবে।
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSent(false);
                  setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
                }}
                className="mt-3 text-xs text-[#052962] font-semibold hover:underline cursor-pointer"
              >
                আরেকটি বার্তা পাঠান
              </button>
            </div>
          )}
        </div>

      </div>
    </InfoPageLayout>
  );
}
