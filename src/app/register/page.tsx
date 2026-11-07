'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BrandLogo } from '@/components/portal/BrandLogo';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Home,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন।');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে।');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('উভয় পাসওয়ার্ড একই হতে হবে।');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('অনুগ্রহ করে ব্যবহারের শর্তাবলী ও গোপনীয়তা নীতিতে সম্মতি দিন।');
      return;
    }

    setIsLoading(true);
    try {
      const res = await register(name, email, password, phone);
      if (res.success) {
        router.push('/');
      } else {
        setErrorMsg(res.message || 'নিবন্ধন সম্পন্ন করা সম্ভব হয়নি।');
      }
    } catch {
      setErrorMsg('সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Top Header Navigation */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-red-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>প্রচ্ছদে ফিরে যান</span>
        </Link>
        <span className="text-xs text-gray-500 font-medium">নতুন পাঠক নিবন্ধন</span>
      </div>

      {/* Main Container Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Column: Editorial Showcase */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-[#031c44] via-[#052962] to-[#0a3875] p-8 text-white flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <BrandLogo
              variant="white"
              className="w-44 h-auto mb-6"
              showTagline={false}
              isBn={true}
            />

            <h3 className="text-xl font-bold mb-3 leading-snug">
              স্বাধীন সাংবাদিকতার সাথে যুক্ত হোন আজই
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed mb-6 font-light">
              দ্য বেঙ্গল ডেস্কের সদস্য হয়ে বস্তুনিষ্ঠ তথ্যপ্রবাহের অংশীদার হোন। আপনার মতামত দেশের নীতি ও সমাজ পরিবর্তনে ভূমিকা রাখবে।
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-2.5 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>সম্পূর্ণ বিনামূল্যে আজীবন পাঠক অ্যাকাউন্ট</span>
              </div>
              <div className="flex items-center gap-2.5 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>সংবাদ প্রতিবেদনে আপনার মন্তব্য ও সরাসরি আলোচনা</span>
              </div>
              <div className="flex items-center gap-2.5 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>পছন্দের বিভাগ ও বিষয়ভিত্তিক বিশেষ নিউজলেটার</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/15 text-[11px] text-blue-200">
            <ShieldCheck className="w-4 h-4 inline mr-1 text-blue-300" />
            <span>আমরা আপনার তথ্যের শতভাগ সুরক্ষা নিশ্চিত করি</span>
          </div>

          {/* Decorative backdrop glow */}
          <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>

        {/* Right Column: Register Form */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* Header Mobile Brand */}
          <div className="md:hidden text-center mb-6">
            <BrandLogo
              variant="brand"
              className="w-48 h-auto mx-auto"
              showTagline={true}
              isBn={true}
            />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 mb-1 tracking-tight">
              অ্যাকাউন্ট তৈরি করুন
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              নিচের ফরমটি পূরণ করে দ্য বেঙ্গল ডেস্কের কমিউনিটিতে যোগ দিন
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">
                পূর্ণ নাম *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: তানভীর হাসান"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50/70 border border-gray-300 rounded-xl text-gray-950 focus:bg-white focus:outline-none focus:border-gray-950 transition-colors"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">
                ইমেইল ঠিকানা *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50/70 border border-gray-300 rounded-xl text-gray-950 focus:bg-white focus:outline-none focus:border-gray-950 transition-colors"
                />
              </div>
            </div>

            {/* Phone Field (Optional) */}
            <div>
              <label className="block text-xs font-bold text-gray-900 mb-1">
                মোবাইল নম্বর <span className="text-gray-400 font-normal">(ঐচ্ছিক)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50/70 border border-gray-300 rounded-xl text-gray-950 focus:bg-white focus:outline-none focus:border-gray-950 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">
                  পাসওয়ার্ড *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="ন্যূনতম ৬ অক্ষর"
                    className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-gray-50/70 border border-gray-300 rounded-xl text-gray-950 focus:bg-white focus:outline-none focus:border-gray-950 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-900 mb-1">
                  পাসওয়ার্ড নিশ্চিতকরণ *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="পুনরায় পাসওয়ার্ড দিন"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50/70 border border-gray-300 rounded-xl text-gray-950 focus:bg-white focus:outline-none focus:border-gray-950 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start pt-1">
              <input
                id="agree-terms"
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-red-700 border-gray-300 rounded focus:ring-red-700"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-xs text-gray-700 leading-snug cursor-pointer">
                আমি দ্য বেঙ্গল ডেস্কের{' '}
                <Link href="/terms" target="_blank" className="font-bold text-red-700 hover:underline">
                  ব্যবহারের শর্তাবলী
                </Link>{' '}
                এবং{' '}
                <Link href="/privacy" target="_blank" className="font-bold text-red-700 hover:underline">
                  গোপনীয়তা নীতি
                </Link>
                -তে সম্মতি প্রদান করছি।
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-gray-950 hover:bg-black text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
            >
              {isLoading ? (
                <span>নিবন্ধন হচ্ছে...</span>
              ) : (
                <>
                  <span>নিবন্ধন সম্পন্ন করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Link to Sign In */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-700">
            <span>ইতিমধ্যে অ্যাকাউন্ট রয়েছে? </span>
            <Link href="/login" className="font-bold text-red-700 hover:underline">
              সরাসরি লগইন করুন →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
