'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: 'reader' | 'subscriber' | 'journalist' | 'admin';
  joinedAt: string;
  isVerified?: boolean;
  savedArticles?: string[]; // IDs
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  timestamp: number;
  read: boolean;
  type: 'breaking' | 'editorial' | 'comment' | 'system';
  link?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  notifications: UserNotification[];
  unreadCount: number;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password?: string, phone?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  toggleSaveArticle: (articleId: string) => boolean;
  isArticleSaved: (articleId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'bengaldesk_user_session';
const NOTIFICATIONS_KEY = 'bengaldesk_user_notifications';
const SAVED_ARTICLES_KEY = 'bengaldesk_saved_articles';

const INITIAL_NOTIFICATIONS: UserNotification[] = [
  {
    id: 'notif-1',
    title: 'ব্রেকিং নিউজ অ্যালার্ট',
    message: 'প্রযুক্তি ও রফতানিতে নতুন দিগন্ত: দক্ষিণ এশিয়ায় নেতৃত্ব দিতে প্রস্তুত বাংলাদেশ।',
    time: '১০ মিনিট আগে',
    timestamp: Date.now() - 10 * 60 * 1000,
    read: false,
    type: 'breaking',
  },
  {
    id: 'notif-2',
    title: 'সম্পাদকীয় প্রতিবেদন',
    message: 'অর্থনৈতিক রূপান্তরের পথে নতুন চ্যালেঞ্জ ও সম্ভাবনা শীর্ষক বিশ্লেষণ প্রকাশিত হয়েছে।',
    time: '১ ঘণ্টা আগে',
    timestamp: Date.now() - 60 * 60 * 1000,
    read: false,
    type: 'editorial',
  },
  {
    id: 'notif-3',
    title: 'স্বাগতম দ্য বেঙ্গল ডেস্কে',
    message: 'বস্তুনিষ্ঠ ও নিরপেক্ষ সাংবাদিকতার সঙ্গে থাকার জন্য ধন্যবাদ। আপনার নোটিফিকেশন চালু রয়েছে।',
    time: 'আজ সকালে',
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    read: true,
    type: 'system',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<UserNotification[]>(INITIAL_NOTIFICATIONS);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedNotifs = localStorage.getItem(NOTIFICATIONS_KEY);
      if (storedNotifs) {
        setNotifications(JSON.parse(storedNotifs));
      }
      const storedSaved = localStorage.getItem(SAVED_ARTICLES_KEY);
      if (storedSaved) {
        setSavedArticles(JSON.parse(storedSaved));
      }
    } catch (e) {
      console.warn('LocalStorage access warning:', e);
    }
  }, []);

  const saveUserSession = (newUser: UserProfile | null) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const login = async (email: string): Promise<{ success: boolean; message?: string }> => {
    // Generate or restore profile
    const namePart = email.split('@')[0] || 'পাঠক';
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    
    const loggedUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: formattedName === 'Admin' ? 'নির্বাহী সম্পাদক' : formattedName === 'Reader' ? 'সেলিম রেজা' : formattedName,
      email: email,
      role: email.includes('admin') ? 'admin' : 'reader',
      joinedAt: new Date().toISOString(),
      isVerified: true,
      savedArticles: savedArticles,
    };

    saveUserSession(loggedUser);

    // Add welcome notification
    const welcomeNotif: UserNotification = {
      id: `notif-${Date.now()}`,
      title: 'সফলভাবে লগইন হয়েছে',
      message: `${loggedUser.name}, দ্য বেঙ্গল ডেস্ক পাঠক প্ল্যাটফর্মে আপনাকে স্বাগতম!`,
      time: 'এইমাত্র',
      timestamp: Date.now(),
      read: false,
      type: 'system',
    };
    const updated = [welcomeNotif, ...notifications];
    setNotifications(updated);
    try {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    } catch {}

    return { success: true };
  };

  const register = async (name: string, email: string, _password?: string, phone?: string): Promise<{ success: boolean; message?: string }> => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      role: 'reader',
      joinedAt: new Date().toISOString(),
      isVerified: true,
      savedArticles: [],
    };

    saveUserSession(newUser);

    const welcomeNotif: UserNotification = {
      id: `notif-${Date.now()}`,
      title: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে',
      message: `${newUser.name}, দ্য বেঙ্গল ডেস্কে নিবন্ধন সম্পন্ন করার জন্য অভিনন্দন!`,
      time: 'এইমাত্র',
      timestamp: Date.now(),
      read: false,
      type: 'system',
    };
    const updated = [welcomeNotif, ...notifications];
    setNotifications(updated);
    try {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    } catch {}

    return { success: true };
  };

  const logout = () => {
    saveUserSession(null);
  };

  const markNotificationAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    try {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const markAllNotificationsAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    try {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const toggleSaveArticle = (articleId: string): boolean => {
    let nextSaved: string[];
    let isSaved = false;
    if (savedArticles.includes(articleId)) {
      nextSaved = savedArticles.filter((id) => id !== articleId);
      isSaved = false;
    } else {
      nextSaved = [...savedArticles, articleId];
      isSaved = true;
    }
    setSavedArticles(nextSaved);
    try {
      localStorage.setItem(SAVED_ARTICLES_KEY, JSON.stringify(nextSaved));
    } catch {}
    return isSaved;
  };

  const isArticleSaved = (articleId: string) => savedArticles.includes(articleId);

  const unreadCount = mounted ? notifications.filter((n) => !n.read).length : 0;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        notifications,
        unreadCount,
        login,
        register,
        logout,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        toggleSaveArticle,
        isArticleSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
