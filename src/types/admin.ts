import { Article, Language, CategorySlug, NewsPriority } from './news';

export type UserRole = 'ADMIN' | 'SUB_EDITOR' | 'REPORTER';

export type ArticleStatus = 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED' | 'REJECTED';

export interface EditorialReview {
  reviewedBy: string;
  reviewedAt: string;
  status: ArticleStatus;
  feedbackNote?: string;
}

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bureau: string;
  avatarUrl?: string;
  phone?: string;
  joinedAt: string;
  totalSubmissions: number;
  publishedCount: number;
  isActive: boolean;
  totalReadersGenerated: number;
}

export interface AdminArticle extends Article {
  status: ArticleStatus;
  editorialReview?: EditorialReview;
}

// Executive Site Settings
export interface SiteSettings {
  siteNameBn: string;
  siteNameEn: string;
  taglineBn: string;
  taglineEn: string;
  editorName: string;
  publisherName: string;
  executiveEditor: string;
  newsEditor: string;
  registrationNumber: string;
  officeAddress: string;
  hotlinePhone: string;
  contactEmail: string;
  facebookUrl: string;
  youtubeUrl: string;
  ePaperUrl: string;
}

// Ad Slot Configuration
export interface AdSlot {
  id: string;
  name: string;
  placement: 'HEADER_LEADERBOARD' | 'SIDEBAR_RECTANGLE' | 'IN_ARTICLE';
  dimensions: string; // যেমন: "728x90" বা "300x250"
  advertiserName: string;
  bannerUrl: string;
  targetUrl: string;
  isActive: boolean;
  totalClicks: number;
  totalImpressions: number;
}

// Editorial Daily Poll (জনমত জরিপ)
export interface EditorialPoll {
  id: string;
  question: string;
  category: string;
  createdAt: string;
  isActive: boolean;
  votesYes: number;
  votesNo: number;
  votesNoComment: number;
}
