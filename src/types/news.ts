export type Language = 'bn' | 'en';

export type NewsPriority =
  | 'MAIN_LEAD'
  | 'SUB_LEAD'
  | 'CATEGORY_LEAD'
  | 'OPINION'
  | 'FEATURED'
  | 'NORMAL';

export type CategorySlug =
  | 'all'
  | 'bangladesh'
  | 'politics'
  | 'economy'
  | 'world'
  | 'sports'
  | 'entertainment'
  | 'technology'
  | 'opinion'
  | 'lifestyle';

export interface Category {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: CategorySlug;
  color?: string;
}

export interface Author {
  id: string;
  nameBn: string;
  nameEn: string;
  roleBn: string;
  roleEn: string;
  avatarUrl?: string;
  locationBn?: string;
  locationEn?: string;
}

export interface Article {
  id: string;
  slug: string;
  language: Language;
  translationOfId?: string; // Links to counterpart in other language
  title: string;
  subtitle?: string; // কাঁধের লেখা বা কিকার
  excerpt: string;
  content: string[]; // প্যারাগ্রাফ তালিকা
  category: CategorySlug;
  tags: string[];
  priority: NewsPriority;
  isBreaking?: boolean;
  isLive?: boolean;
  featuredImage: {
    url: string;
    caption: string;
    credit: string;
    width?: number;
    height?: number;
  };
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readTimeMinutes: number;
  viewCount: number;
}
