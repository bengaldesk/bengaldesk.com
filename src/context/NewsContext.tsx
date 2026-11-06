'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockArticles } from '@/data/mock-news';
import { initialStaffList } from '@/data/mock-staff';
import {
  AdminArticle,
  StaffUser,
  ArticleStatus,
  UserRole,
  SiteSettings,
  AdSlot,
  EditorialPoll,
} from '@/types/admin';
import { Article, CategorySlug, NewsPriority } from '@/types/news';

interface NewsContextType {
  articles: AdminArticle[];
  publishedArticles: Article[];
  staffList: StaffUser[];
  currentUser: StaffUser;
  siteSettings: SiteSettings;
  adSlots: AdSlot[];
  activePoll: EditorialPoll;
  setCurrentUser: (user: StaffUser) => void;
  submitArticle: (data: Partial<AdminArticle>) => void;
  approveArticle: (id: string, priority?: NewsPriority) => void;
  rejectArticle: (id: string, feedbackNote: string) => void;
  deleteArticle: (id: string) => void;
  toggleBreaking: (id: string) => void;
  setArticlePriority: (id: string, priority: NewsPriority) => void;
  hireJournalist: (newStaff: Omit<StaffUser, 'id' | 'joinedAt' | 'totalSubmissions' | 'publishedCount' | 'isActive' | 'totalReadersGenerated'>) => void;
  toggleStaffStatus: (id: string) => void;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  toggleAdSlot: (id: string) => void;
  createPoll: (question: string, category: string) => void;
  votePoll: (choice: 'yes' | 'no' | 'noComment') => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

// Initial Articles
const initialAdminArticles: AdminArticle[] = [
  ...mockArticles.map((a) => ({
    ...a,
    status: 'PUBLISHED' as ArticleStatus,
  })),
  {
    id: 'pending-1',
    slug: 'chattogram-port-new-terminal-operational',
    language: 'bn',
    title: 'চট্টগ্রাম বন্দরে নতুন স্বয়ংক্রিয় টার্মিনাল চালু: পণ্য খালাসের সময় কমবে অর্ধেকে',
    subtitle: 'বন্দর অর্থনীতি ও লজিস্টিকস রূপান্তর',
    excerpt: 'চট্টগ্রাম সমুদ্রবন্দরে আজ সকালে আনুষ্ঠানিকভাবে নতুন অটোমেটেড কনটেইনার টার্মিনাল চালু হয়েছে। এর ফলে জাহাজের অপেক্ষার সময় উল্লেখযোগ্যভাবে হ্রাস পাবে।',
    content: [
      'চট্টগ্রাম বন্দর কর্তৃপক্ষের চেয়ারম্যান আজ সকালে এই অত্যাধুনিক টার্মিনালের উদ্বোধন করেন। এতে সংযুক্ত করা হয়েছে স্বয়ংক্রিয় স্ক্যানার ও রিমোট-কন্ট্রোলড ক্রেন।',
      'আমদানিকারক ও ব্যবসায়ীরা এই পদক্ষেপকে স্বাগত জানিয়ে বলেছেন, এর ফলে দেশের বৈদেশিক বাণিজ্যের গতি বৃদ্ধি পাবে।'
    ],
    category: 'economy',
    tags: ['চট্টগ্রাম', 'বন্দর', 'বাণিজ্য', 'অর্থনীতি'],
    priority: 'NORMAL',
    isBreaking: false,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
      caption: 'চট্টগ্রাম বন্দরের কনটেইনার টার্মিনালে পণ্য খালাসের দৃশ্য।',
      credit: 'ছবি: দ্য বেঙ্গল ডেস্ক',
    },
    author: {
      id: 'staff-rep-2',
      nameBn: 'সাদিয়া আফরিন',
      nameEn: 'Sadia Afrin',
      roleBn: 'বিশেষ প্রতিনিধি',
      roleEn: 'Special Correspondent',
      locationBn: 'চট্টগ্রাম ব্যুরো',
    },
    publishedAt: '2026-11-06T06:00:00.000Z',
    readTimeMinutes: 2,
    viewCount: 0,
    status: 'PENDING_REVIEW',
  },
  {
    id: 'rejected-1',
    slug: 'dhaka-traffic-control-ai-sensors',
    language: 'bn',
    title: 'রাজধানীর ট্রাফিক নিয়ন্ত্রণে কৃত্রিম বুদ্ধিমত্তার সেন্সর বসানোর উদ্যোগ',
    subtitle: 'নগর ব্যবস্থাপনা',
    excerpt: 'রাজধানীর প্রধান মোড়গুলোতে ট্রাফিকের চাপ অনুযায়ী স্বয়ংক্রিয় সিগন্যাল পরিবর্তনের জন্য স্মার্ট সেন্সর বসানোর কাজ শুরু হয়েছে।',
    content: ['পাইলট প্রজেক্ট হিসেবে প্রথমে শাহবাগ ও কারওয়ান বাজার মোড়ে এই সিস্টেম চালু করা হচ্ছে।'],
    category: 'bangladesh',
    tags: ['ট্রাফিক', 'ঢাকা', 'প্রযুক্তি'],
    priority: 'NORMAL',
    isBreaking: false,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
      caption: 'রাজধানীর ব্যস্ত সড়কে ট্রাফিক সিগন্যাল।',
      credit: 'ছবি: সংগৃহীত',
    },
    author: {
      id: 'staff-rep-1',
      nameBn: 'মাহমুদুল হাসান',
      nameEn: 'Mahmudul Hasan',
      roleBn: 'স্টাফ রিপোর্টার',
      roleEn: 'Staff Reporter',
      locationBn: 'ঢাকা',
    },
    publishedAt: '2026-11-06T05:00:00.000Z',
    readTimeMinutes: 2,
    viewCount: 0,
    status: 'REJECTED',
    editorialReview: {
      reviewedBy: 'শাহরিয়ার খান (বার্তা সম্পাদক)',
      reviewedAt: '2026-11-06T05:45:00.000Z',
      status: 'REJECTED',
      feedbackNote: 'দ্বিতীয় প্যারায় ট্রাফিক পুলিশের ঊর্ধ্বতন কর্তৃপক্ষের কোনো অফিসিয়াল বক্তব্য নেই। বক্তব্য যুক্ত করে পুনরায় জমা দিন।',
    },
  },
];

// Initial Site Settings
const defaultSiteSettings: SiteSettings = {
  siteNameBn: 'দ্য বেঙ্গল ডেস্ক',
  siteNameEn: 'THE BENGAL DESK',
  taglineBn: 'বস্তুনিষ্ঠ, স্বাধীন ও নির্ভরযোগ্য সংবাদপত্র',
  taglineEn: 'Independent, Objective & Authoritative Journalism',
  editorName: 'আহমেদ তানভীর',
  publisherName: 'আহমেদ তানভীর',
  executiveEditor: 'শাহেদ হোসেন',
  newsEditor: 'শাহরিয়ার খান',
  registrationNumber: 'প্রেস কাউন্সিল রেজি: নং-১০৮৪/২৪',
  officeAddress: 'কাওরান বাজার, ঢাকা-১২১৫, বাংলাদেশ',
  hotlinePhone: '+৮৮০ ২ ৯৮৭৬৫৪৩',
  contactEmail: 'editor@thebengaldesk.com',
  facebookUrl: 'https://facebook.com/thebengaldesk',
  youtubeUrl: 'https://youtube.com/@thebengaldesk',
  ePaperUrl: 'https://epaper.thebengaldesk.com',
};

// Initial Ad Slots
const initialAdSlots: AdSlot[] = [
  {
    id: 'ad-top-leaderboard',
    name: 'টপ হেডার লিডারবোর্ড (Header Leaderboard)',
    placement: 'HEADER_LEADERBOARD',
    dimensions: '728x90',
    advertiserName: 'প্রাইম ব্যাংক বাংলাদেশ',
    bannerUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    targetUrl: 'https://example.com',
    isActive: true,
    totalClicks: 1420,
    totalImpressions: 48500,
  },
  {
    id: 'ad-sidebar-square',
    name: 'সাইডবার রেক্টেঙ্গেল (Sidebar Box)',
    placement: 'SIDEBAR_RECTANGLE',
    dimensions: '300x250',
    advertiserName: 'গ্রিনল্যান্ড রিয়েল এস্টেট',
    bannerUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80',
    targetUrl: 'https://example.com',
    isActive: true,
    totalClicks: 890,
    totalImpressions: 32100,
  },
  {
    id: 'ad-in-article',
    name: 'খবরের ভেতরে নেটিভ ব্যানার (In-Article)',
    placement: 'IN_ARTICLE',
    dimensions: '600x120',
    advertiserName: 'মেঘনা ক্লাউড সলিউশনস',
    bannerUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    targetUrl: 'https://example.com',
    isActive: false,
    totalClicks: 420,
    totalImpressions: 15400,
  },
];

// Initial Poll
const initialPoll: EditorialPoll = {
  id: 'poll-1',
  question: 'নির্বাচন কমিশন ও বিচার বিভাগীয় সংস্কার কি কাঙ্ক্ষিত ইতিবাচক পরিবর্তনের দিকে যাচ্ছে বলে আপনি মনে করেন?',
  category: 'রাজনীতি ও সুশাসন',
  createdAt: '২০২৬-১১-০৫',
  isActive: true,
  votesYes: 4820,
  votesNo: 1240,
  votesNoComment: 380,
};

const CURRENT_DATA_VERSION = 'tbd_dataset_v4_2026_full';

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<AdminArticle[]>(initialAdminArticles);
  const [staffList, setStaffList] = useState<StaffUser[]>(initialStaffList);
  const [currentUser, setCurrentUser] = useState<StaffUser>(initialStaffList[0]); // Default: Chief Editor
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [adSlots, setAdSlots] = useState<AdSlot[]>(initialAdSlots);
  const [activePoll, setActivePoll] = useState<EditorialPoll>(initialPoll);

  // Load from localStorage on client with automatic version migration
  useEffect(() => {
    try {
      const savedVersion = localStorage.getItem('tbd_version');
      if (savedVersion !== CURRENT_DATA_VERSION) {
        // Upgrade stale cache to latest full dataset
        localStorage.setItem('tbd_version', CURRENT_DATA_VERSION);
        localStorage.setItem('tbd_articles', JSON.stringify(initialAdminArticles));
        localStorage.setItem('tbd_staff', JSON.stringify(initialStaffList));
        localStorage.setItem('tbd_settings', JSON.stringify(defaultSiteSettings));
        localStorage.setItem('tbd_ads', JSON.stringify(initialAdSlots));
        localStorage.setItem('tbd_poll', JSON.stringify(initialPoll));
        setArticles(initialAdminArticles);
        setStaffList(initialStaffList);
        setSiteSettings(defaultSiteSettings);
        setAdSlots(initialAdSlots);
        setActivePoll(initialPoll);
        return;
      }

      const savedArticles = localStorage.getItem('tbd_articles');
      if (savedArticles) setArticles(JSON.parse(savedArticles));

      const savedStaff = localStorage.getItem('tbd_staff');
      if (savedStaff) setStaffList(JSON.parse(savedStaff));

      const savedSettings = localStorage.getItem('tbd_settings');
      if (savedSettings) setSiteSettings(JSON.parse(savedSettings));

      const savedAds = localStorage.getItem('tbd_ads');
      if (savedAds) setAdSlots(JSON.parse(savedAds));

      const savedPoll = localStorage.getItem('tbd_poll');
      if (savedPoll) setActivePoll(JSON.parse(savedPoll));
    } catch {}
  }, []);

  const saveArticles = (newArticles: AdminArticle[]) => {
    setArticles(newArticles);
    try { localStorage.setItem('tbd_articles', JSON.stringify(newArticles)); } catch {}
  };

  const saveStaff = (newStaff: StaffUser[]) => {
    setStaffList(newStaff);
    try { localStorage.setItem('tbd_staff', JSON.stringify(newStaff)); } catch {}
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    const updated = { ...siteSettings, ...settings };
    setSiteSettings(updated);
    try { localStorage.setItem('tbd_settings', JSON.stringify(updated)); } catch {}
  };

  const toggleAdSlot = (id: string) => {
    const updated = adSlots.map((ad) => (ad.id === id ? { ...ad, isActive: !ad.isActive } : ad));
    setAdSlots(updated);
    try { localStorage.setItem('tbd_ads', JSON.stringify(updated)); } catch {}
  };

  const createPoll = (question: string, category: string) => {
    const newPoll: EditorialPoll = {
      id: `poll-${Date.now()}`,
      question,
      category,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true,
      votesYes: 0,
      votesNo: 0,
      votesNoComment: 0,
    };
    setActivePoll(newPoll);
    try { localStorage.setItem('tbd_poll', JSON.stringify(newPoll)); } catch {}
  };

  const votePoll = (choice: 'yes' | 'no' | 'noComment') => {
    const updated = {
      ...activePoll,
      votesYes: choice === 'yes' ? activePoll.votesYes + 1 : activePoll.votesYes,
      votesNo: choice === 'no' ? activePoll.votesNo + 1 : activePoll.votesNo,
      votesNoComment: choice === 'noComment' ? activePoll.votesNoComment + 1 : activePoll.votesNoComment,
    };
    setActivePoll(updated);
    try { localStorage.setItem('tbd_poll', JSON.stringify(updated)); } catch {}
  };

  // 1. Submit Article
  const submitArticle = (data: Partial<AdminArticle>) => {
    const isReporter = currentUser.role === 'REPORTER';
    const newArticle: AdminArticle = {
      id: `art-${Date.now()}`,
      slug: (data.title || 'news-item')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-'),
      language: data.language || 'bn',
      title: data.title || 'শিরোনামহীন সংবাদ',
      subtitle: data.subtitle || '',
      excerpt: data.excerpt || '',
      content: data.content && data.content.length > 0 ? data.content : ['সংবাদের বিস্তারিত এখানে সংরক্ষিত রয়েছে।'],
      category: data.category || 'bangladesh',
      tags: data.tags || ['সংবাদ'],
      priority: data.priority || 'NORMAL',
      isBreaking: data.isBreaking || false,
      featuredImage: data.featuredImage || {
        url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
        caption: 'সংবাদের প্রতীকী ছবি',
        credit: 'ছবি: দ্য বেঙ্গল ডেস্ক',
      },
      author: {
        id: currentUser.id,
        nameBn: currentUser.name,
        nameEn: currentUser.name,
        roleBn: currentUser.role === 'REPORTER' ? 'প্রতিবেদক' : 'সম্পাদক',
        roleEn: currentUser.role === 'REPORTER' ? 'Reporter' : 'Editor',
        locationBn: currentUser.bureau,
        avatarUrl: currentUser.avatarUrl,
      },
      publishedAt: new Date().toISOString(),
      readTimeMinutes: Math.max(1, Math.ceil((data.content?.join(' ').length || 200) / 400)),
      viewCount: 0,
      status: isReporter ? 'PENDING_REVIEW' : 'PUBLISHED',
    };

    saveArticles([newArticle, ...articles]);
  };

  // 2. Approve & Publish
  const approveArticle = (id: string, priority?: NewsPriority) => {
    const updated = articles.map((art) => {
      if (art.id === id) {
        return {
          ...art,
          status: 'PUBLISHED' as ArticleStatus,
          priority: priority || art.priority,
          publishedAt: new Date().toISOString(),
          editorialReview: {
            reviewedBy: `${currentUser.name} (${currentUser.role === 'ADMIN' ? 'প্রধান সম্পাদক' : 'বার্তা সম্পাদক'})`,
            reviewedAt: new Date().toISOString(),
            status: 'PUBLISHED' as ArticleStatus,
          },
        };
      }
      return art;
    });
    saveArticles(updated);
  };

  // 3. Reject Article
  const rejectArticle = (id: string, feedbackNote: string) => {
    const updated = articles.map((art) => {
      if (art.id === id) {
        return {
          ...art,
          status: 'REJECTED' as ArticleStatus,
          editorialReview: {
            reviewedBy: `${currentUser.name} (${currentUser.role === 'ADMIN' ? 'প্রধান সম্পাদক' : 'বার্তা সম্পাদক'})`,
            reviewedAt: new Date().toISOString(),
            status: 'REJECTED' as ArticleStatus,
            feedbackNote,
          },
        };
      }
      return art;
    });
    saveArticles(updated);
  };

  // 4. Delete Article
  const deleteArticle = (id: string) => {
    const updated = articles.filter((a) => a.id !== id);
    saveArticles(updated);
  };

  // 5. Toggle Breaking
  const toggleBreaking = (id: string) => {
    const updated = articles.map((a) => {
      if (a.id === id) return { ...a, isBreaking: !a.isBreaking };
      return a;
    });
    saveArticles(updated);
  };

  // 6. Set Article Frontpage Priority
  const setArticlePriority = (id: string, priority: NewsPriority) => {
    const updated = articles.map((a) => {
      if (a.id === id) return { ...a, priority };
      // If setting a new MAIN_LEAD, demote existing MAIN_LEAD to SUB_LEAD
      if (priority === 'MAIN_LEAD' && a.priority === 'MAIN_LEAD' && a.id !== id) {
        return { ...a, priority: 'SUB_LEAD' as NewsPriority };
      }
      return a;
    });
    saveArticles(updated);
  };

  // 7. Hire Journalist
  const hireJournalist = (newStaffData: Omit<StaffUser, 'id' | 'joinedAt' | 'totalSubmissions' | 'publishedCount' | 'isActive' | 'totalReadersGenerated'>) => {
    const newStaff: StaffUser = {
      ...newStaffData,
      id: `staff-${Date.now()}`,
      joinedAt: new Date().toISOString().split('T')[0],
      totalSubmissions: 0,
      publishedCount: 0,
      isActive: true,
      totalReadersGenerated: 0,
    };
    saveStaff([...staffList, newStaff]);
  };

  // 8. Suspend / Activate Journalist
  const toggleStaffStatus = (id: string) => {
    const updated = staffList.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s));
    saveStaff(updated);
  };

  const publishedArticles = articles.filter((a) => a.status === 'PUBLISHED');

  return (
    <NewsContext.Provider
      value={{
        articles,
        publishedArticles,
        staffList,
        currentUser,
        siteSettings,
        adSlots,
        activePoll,
        setCurrentUser,
        submitArticle,
        approveArticle,
        rejectArticle,
        deleteArticle,
        toggleBreaking,
        setArticlePriority,
        hireJournalist,
        toggleStaffStatus,
        updateSiteSettings,
        toggleAdSlot,
        createPoll,
        votePoll,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
