import { Category } from '@/types/news';

export const categories: Category[] = [
  { id: '1', nameBn: 'প্রচ্ছদ', nameEn: 'Home', slug: 'all' },
  { id: '2', nameBn: 'বাংলাদেশ', nameEn: 'Bangladesh', slug: 'bangladesh' },
  { id: '3', nameBn: 'রাজনীতি', nameEn: 'Politics', slug: 'politics' },
  { id: '4', nameBn: 'অর্থনীতি', nameEn: 'Economy', slug: 'economy' },
  { id: '5', nameBn: 'আন্তর্জাতিক', nameEn: 'World', slug: 'world' },
  { id: '6', nameBn: 'খেলাধুলা', nameEn: 'Sports', slug: 'sports' },
  { id: '7', nameBn: 'বিনোদন', nameEn: 'Entertainment', slug: 'entertainment' },
  { id: '8', nameBn: 'প্রযুক্তি', nameEn: 'Technology', slug: 'technology' },
  { id: '9', nameBn: 'মতামত', nameEn: 'Opinion', slug: 'opinion' },
  { id: '10', nameBn: 'জীবনযাপন', nameEn: 'Lifestyle', slug: 'lifestyle' },
];

export const trendingTopics = [
  { bn: '#অর্থনৈতিক_সংস্কার', en: '#EconomicReform' },
  { bn: '#জাতীয়_নির্বাচন', en: '#NationalElection' },
  { bn: '#কৃত্রিম_বুদ্ধিমত্তা', en: '#AITech' },
  { bn: '#ক্রিকেট_বিশ্বকাপ', en: '#CricketWorldCup' },
  { bn: '#মেট্রোরেল', en: '#MetroRail' },
];
