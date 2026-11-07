'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BrandLogo } from '@/components/portal/BrandLogo';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Home,
  UserCheck,
} from 'lucide-react';
import { FacebookIcon } from '@/components/icons/SocialIcons';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন।');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMsg('পাসওয়ার্ড ন্যূনতম ৪ অক্ষরের হতে হবে।');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        router.push('/');
      } else {
        setErrorMsg(res.message || 'লগইন ব্যর্থ হয়েছে। তথ্য আবার যাচাই করুন।');
      }
    } catch {
      setErrorMsg('সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (role: 'reader' | 'admin') => {
    setIsLoading(true);
    const demoEmail = role === 'admin' ? 'admin@thebengaldesk.com' : 'reader@thebengaldesk.com';
    await login(demoEmail, 'password123');
    setIsLoading(false);
    router.push(role === 'admin' ? '/admin' : '/');
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
        <span className="text-xs text-gray-500 font-medium">নিরাপদ লগইন পোর্টাল</span>
      </div>

      {/* Main Container Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Column: Editorial Showcase (Brand Blue) */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-[#031c44] via-[#052962] to-[#0a3875] p-8 text-white flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <BrandLogo
              variant="white"
              className="w-44 h-auto mb-6"
              showTagline={false}
              isBn={true}
            />

            <h3 className="text-xl font-bold mb-3 leading-snug">
              বস্তুনিষ্ঠ সংবাদ ও মুক্ত আলোচনার সাথে যুক্ত থাকুন
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed mb-6 font-light">
              দ্য বেঙ্গল ডেস্কের পাঠক অ্যাকাউন্টের মাধ্যমে সর্বশেষ সংবাদে মতামত প্রকাশ করুন, পছন্দের খবর সংরক্ষণ করুন এবং ব্রেকিং অ্যালার্ট পান সরাসরি।
            </p>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-2.5 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>প্রতিটি খবরের নিচে তাৎক্ষণিক মন্তব্য ও প্রতিক্রিয়া</span>
              </div>
              <div className="flex items-center gap-2.5 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ব্রেকিং নিউজ ও বিশেষ সম্পাদকীয় নোটিফিকেশন</span>
              </div>
              <div className="flex items-center gap-2.5 text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ব্যক্তিগত বুকমার্ক ও রিডিং লিস্ট সিঙ্ক</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/15 text-[11px] text-blue-200">
            <ShieldCheck className="w-4 h-4 inline mr-1 text-blue-300" />
            <span>সম্পূর্ণ গোপনীয়তা ও ডাটা নিরাপত্তা নিশ্চিত</span>
          </div>

          {/* Decorative backdrop glow */}
          <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>

        {/* Right Column: Sign In Form */}
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
              লগইন করুন
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              আপনার নিবন্ধিত ইমেইল ও পাসওয়ার্ড দিয়ে অ্যাকাউন্টে প্রবেশ করুন
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
          <form onSubmit={handleSubmit} className="space-y-4">
            
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
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-gray-50/70 border border-gray-300 rounded-xl text-gray-950 focus:bg-white focus:outline-none focus:border-gray-950 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-900">
                  পাসওয়ার্ড *
                </label>
                <a href="#" className="text-xs text-red-700 font-bold hover:underline">
                  পাসওয়ার্ড ভুলে গেছেন?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-gray-50/70 border border-gray-300 rounded-xl text-gray-950 focus:bg-white focus:outline-none focus:border-gray-950 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-red-700 border-gray-300 rounded focus:ring-red-700"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs font-medium text-gray-700 cursor-pointer">
                আমাকে মনে রাখুন
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-gray-950 hover:bg-black text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <span>লগইন হচ্ছে...</span>
              ) : (
                <>
                  <span>লগইন করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-5 pt-4 border-t border-gray-100">
            <span className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 text-center">
              এক ক্লিকে টেস্ট অ্যাকাউন্ট দিয়ে প্রবেশ করুন:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('reader')}
                className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-xs font-bold transition-colors cursor-pointer text-center"
              >
                পাঠক ডেমো
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold transition-colors cursor-pointer text-center"
              >
                সম্পাদক ডেমো
              </button>
            </div>
          </div>

          {/* Social Sign-In Mockup */}
          <div className="mt-5">
            <div className="relative flex justify-center text-xs uppercase mb-3">
              <span className="bg-white px-2 text-gray-400 font-semibold text-[11px]">অথবা সোশ্যাল দিয়ে</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('reader')}
                className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 text-xs font-bold text-gray-800 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>গুগল</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('reader')}
                className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 text-xs font-bold text-[#1877F2] transition-colors cursor-pointer"
              >
                <FacebookIcon className="w-4 h-4" />
                <span>ফেসবুক</span>
              </button>
            </div>
          </div>

          {/* Link to Register */}
          <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-700">
            <span>নতুন পাঠক? </span>
            <Link href="/register" className="font-bold text-red-700 hover:underline">
              একটি নতুন অ্যাকাউন্ট খুলুন →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
