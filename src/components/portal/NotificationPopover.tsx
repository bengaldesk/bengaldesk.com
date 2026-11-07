'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Language } from '@/types/news';
import { toBengaliNumber } from '@/lib/bangla-date';
import {
  Bell,
  CheckCheck,
  Radio,
  BookOpen,
  MessageSquare,
  Sparkles,
  X,
  Volume2,
} from 'lucide-react';
import Link from 'next/link';

interface NotificationPopoverProps {
  currentLang: Language;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({ currentLang }) => {
  const isBn = currentLang === 'bn';
  const { user, isAuthenticated, notifications, unreadCount, markNotificationAsRead, markAllNotificationsAsRead } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'breaking' | 'editorial'>('all');
  const [browserAlertsEnabled, setBrowserAlertsEnabled] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'breaking':
        return <Radio className="w-4 h-4 text-red-600 animate-pulse" />;
      case 'editorial':
        return <BookOpen className="w-4 h-4 text-amber-600" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-blue-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
        title={isBn ? 'বিজ্ঞপ্তি' : 'Notifications'}
        aria-label="Open notifications"
      >
        <Bell className="w-5 h-5 text-white" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-[#052962] animate-bounce">
            {isBn ? toBengaliNumber(unreadCount) : unreadCount}
          </span>
        )}
      </button>

      {/* Floating Dropdown Modal */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 text-gray-900 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Header */}
          <div className="bg-[#052962] px-4 py-3 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-white" />
              <h4 className="font-bold text-sm">
                {isBn ? 'বিজ্ঞপ্তি ও সংবাদ অ্যালার্ট' : 'Notifications & Alerts'}
              </h4>
              {unreadCount > 0 && (
                <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {isBn ? `${toBengaliNumber(unreadCount)}টি নতুন` : `${unreadCount} new`}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Account Ribbon (if logged in) */}
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between text-xs">
            {isAuthenticated && user ? (
              <span className="font-semibold text-gray-800">
                {isBn ? `সংযুক্ত পাঠক: ${user.name}` : `Connected: ${user.name}`}
              </span>
            ) : (
              <div className="flex items-center gap-1.5 text-gray-600">
                <span>{isBn ? 'ব্যক্তিগত নোটিফিকেশনের জন্য' : 'For personalized alerts'}</span>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="font-bold text-red-700 hover:underline"
                >
                  {isBn ? 'লগইন করুন' : 'Sign in'}
                </Link>
              </div>
            )}

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                className="flex items-center gap-1 text-[11px] font-bold text-gray-700 hover:text-red-700 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5 text-gray-500" />
                <span>{isBn ? 'পঠিত চিহ্নিত করুন' : 'Mark all read'}</span>
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50/50 text-xs font-bold text-gray-600">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`flex-1 py-1.5 text-center transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'text-gray-950 border-b-2 border-red-700 font-black'
                  : 'hover:text-gray-900'
              }`}
            >
              {isBn ? 'সকল' : 'All'}
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('breaking')}
              className={`flex-1 py-1.5 text-center transition-colors cursor-pointer ${
                activeFilter === 'breaking'
                  ? 'text-gray-950 border-b-2 border-red-700 font-black'
                  : 'hover:text-gray-900'
              }`}
            >
              {isBn ? 'ব্রেকিং' : 'Breaking'}
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('editorial')}
              className={`flex-1 py-1.5 text-center transition-colors cursor-pointer ${
                activeFilter === 'editorial'
                  ? 'text-gray-950 border-b-2 border-red-700 font-black'
                  : 'hover:text-gray-900'
              }`}
            >
              {isBn ? 'সম্পাদকীয়' : 'Editorial'}
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 p-1">
            {filteredNotifications.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-500">
                {isBn ? 'কোনো নতুন বিজ্ঞপ্তি নেই' : 'No notifications found'}
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markNotificationAsRead(item.id)}
                  className={`p-3 rounded-lg flex items-start gap-3 cursor-pointer transition-colors ${
                    !item.read
                      ? 'bg-blue-50/40 hover:bg-blue-50'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="p-1.5 bg-white border border-gray-200 rounded-full shrink-0 shadow-2xs mt-0.5">
                    {getIconForType(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h5 className="text-xs font-bold text-gray-950 line-clamp-1">
                        {item.title}
                      </h5>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-red-600 shrink-0 ml-1"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-800 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium mt-1 inline-block">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Browser Alerts Quick Toggle Footer */}
          <div className="bg-gray-50 p-2.5 border-t border-gray-200 flex items-center justify-between text-xs text-gray-700">
            <span className="flex items-center gap-1.5 font-medium">
              <Volume2 className="w-3.5 h-3.5 text-gray-500" />
              <span>{isBn ? 'ব্রাউজার নোটিফিকেশন' : 'Browser Alerts'}</span>
            </span>
            <button
              type="button"
              onClick={() => setBrowserAlertsEnabled(!browserAlertsEnabled)}
              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                browserAlertsEnabled ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  browserAlertsEnabled ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
