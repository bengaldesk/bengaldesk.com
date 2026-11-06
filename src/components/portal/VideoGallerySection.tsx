'use client';

import React, { useState } from 'react';
import { Article, Language } from '@/types/news';
import { Play, Video, Film, Eye, Clock } from 'lucide-react';
import { formatTimeAgo, toBengaliNumber } from '@/lib/bangla-date';

interface VideoItem {
  id: string;
  titleBn: string;
  titleEn: string;
  duration: string;
  thumbnailUrl: string;
  views: number;
  timeAgoBn: string;
  timeAgoEn: string;
}

const mockVideos: VideoItem[] = [
  {
    id: 'vid-1',
    titleBn: 'পাতাল মেট্রোরেলে যেভাবে সম্পন্ন হচ্ছে টানেল বোরিং: সরাসরি বিশেষ ভিডিও প্রতিবেদন',
    titleEn: 'Underground Metro Rail Tunnel Boring: Exclusive Video Walkthrough',
    duration: '০৪:২৫',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    views: 45200,
    timeAgoBn: '২ ঘণ্টা আগে',
    timeAgoEn: '2 hours ago',
  },
  {
    id: 'vid-2',
    titleBn: 'সুন্দরবনে বাঘের বংশবৃদ্ধিতে নতুন রেকর্ড: ক্যামেরায় ধরা পড়ল বাঘিনী ও শাবকের বিচরণ',
    titleEn: 'Sundarbans Tiger Census: Rare Footage of Tigress with Cubs',
    duration: '০৩:১৫',
    thumbnailUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80',
    views: 31000,
    timeAgoBn: '৪ ঘণ্টা আগে',
    timeAgoEn: '4 hours ago',
  },
  {
    id: 'vid-3',
    titleBn: 'চ্যাম্পিয়ন্স ট্রফির প্রস্তুতি ম্যাচে টাইগারদের বিধ্বংসী জয়: হাইলাইটস ও বিশ্লেষণ',
    titleEn: 'Champions Trophy Warmup: Tigers Dominant Victory Highlights',
    duration: '০৬:৪০',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80',
    views: 58900,
    timeAgoBn: '৬ ঘণ্টা আগে',
    timeAgoEn: '6 hours ago',
  },
  {
    id: 'vid-4',
    titleBn: 'কৃত্রিম বুদ্ধিমত্তার বিপ্লব ও ভবিষ্যতের কর্মসংস্থান: বিশেষজ্ঞদের মুখোমুখি সাক্ষাৎকার',
    titleEn: 'AI Revolution and the Future of Jobs: Roundtable with Tech Leaders',
    duration: '০৮:১২',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    views: 24100,
    timeAgoBn: '৮ ঘণ্টা আগে',
    timeAgoEn: '8 hours ago',
  },
];

interface VideoGallerySectionProps {
  currentLang: Language;
  onSelectArticle?: (article: Article) => void;
}

export const VideoGallerySection: React.FC<VideoGallerySectionProps> = ({ currentLang }) => {
  const isBn = currentLang === 'bn';
  const [activeVideo, setActiveVideo] = useState<VideoItem>(mockVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-7 sm:py-9 bg-slate-950 text-white my-6 sm:my-8 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-3 mb-5 sm:mb-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 bg-red-600 text-white rounded">
              <Video className="w-4 h-4 text-white" />
            </span>
            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-white ${isBn ? 'bn-headline' : 'en-headline'}`}>
              {isBn ? 'ভিডিও ও মাল্টিমিডিয়া' : 'Videos & Multimedia'}
            </h3>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline-flex items-center gap-1">
            <Film className="w-3.5 h-3.5 text-red-500" />
            {isBn ? 'বেঙ্গল ডেস্ক ভিজ্যুয়াল টিম' : 'Bengal Desk Visual Team'}
          </span>
        </div>

        {/* Video Layout: 1 Big Featured Video + 3 Thumbnails */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Featured Video Player (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-video bg-slate-900 border border-slate-800 group shadow-2xl">
              <img
                src={activeVideo.thumbnailUrl}
                alt={activeVideo.titleBn}
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:bg-red-600 transition-all cursor-pointer ring-4 ring-white/20"
                  aria-label="Play Video"
                >
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white translate-x-0.5" />
                </button>
              </div>

              {/* Duration badge */}
              <span className="absolute bottom-3 right-3 bg-black/85 text-white text-xs px-2.5 py-1 rounded font-mono font-bold tracking-wider">
                {activeVideo.duration}
              </span>
            </div>

            <div className="mt-3.5">
              <h4 className={`text-base sm:text-xl font-bold text-white leading-snug mb-2 ${isBn ? 'bn-headline' : 'en-headline'}`}>
                {isBn ? activeVideo.titleBn : activeVideo.titleEn}
              </h4>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  {isBn ? toBengaliNumber(activeVideo.views) : activeVideo.views.toLocaleString()} {isBn ? 'ভিউ' : 'views'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {isBn ? activeVideo.timeAgoBn : activeVideo.timeAgoEn}
                </span>
              </div>
            </div>
          </div>

          {/* Video Playlist Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {mockVideos.map((vid) => {
              const isSelected = vid.id === activeVideo.id;

              return (
                <div
                  key={vid.id}
                  onClick={() => {
                    setActiveVideo(vid);
                    setIsPlaying(false);
                  }}
                  className={`p-2.5 sm:p-3 rounded-md border cursor-pointer transition-all flex items-center gap-3 group ${
                    isSelected
                      ? 'bg-slate-900 border-red-500/60 shadow-md'
                      : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  {/* Thumbnail with mini play icon */}
                  <div className="relative w-28 sm:w-32 aspect-16/10 rounded-lg sm:rounded-xl overflow-hidden shrink-0 bg-slate-800">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.titleBn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-red-600/90 flex items-center justify-center">
                        <Play className="w-2.5 h-2.5 fill-white text-white translate-x-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] text-white px-1 py-0.2 rounded font-mono">
                      {vid.duration}
                    </span>
                  </div>

                  {/* Title and stats */}
                  <div className="flex-1 min-w-0">
                    <h5
                      className={`text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white line-clamp-2 leading-snug mb-1.5 ${
                        isSelected ? 'text-red-400 font-bold' : ''
                      } ${isBn ? 'bn-headline' : 'en-headline'}`}
                    >
                      {isBn ? vid.titleBn : vid.titleEn}
                    </h5>
                    <span className="text-[11px] text-slate-500">
                      {isBn ? vid.timeAgoBn : vid.timeAgoEn}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
