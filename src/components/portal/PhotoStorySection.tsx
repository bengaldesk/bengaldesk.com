'use client';

import React from 'react';
import { Article, Language } from '@/types/news';
import { Camera, Image as ImageIcon } from 'lucide-react';

interface PhotoStory {
  id: string;
  titleBn: string;
  titleEn: string;
  captionBn: string;
  captionEn: string;
  imageUrl: string;
  photographerBn: string;
  photographerEn: string;
}

const photoStories: PhotoStory[] = [
  {
    id: 'photo-1',
    titleBn: 'কুয়াশামোড়া শীতের সকালে কৃষকের কর্মব্যস্ততা',
    titleEn: 'Farmers at work in a misty winter dawn',
    captionBn: 'হেমন্তের শেষে উত্তর জনপদে জেঁকে বসেছে শীত, ভোরে ফসলের মাঠে ব্যস্ত কৃষকেরা।',
    captionEn: 'Early winter mist envelops northern fields as farmers start their daily routine.',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    photographerBn: 'ছবি: সাজ্জাদ হোসেন / বেঙ্গল ডেস্ক',
    photographerEn: 'Photo: Sajjad Hossain / Bengal Desk',
  },
  {
    id: 'photo-2',
    titleBn: 'বুড়িগঙ্গার তীরে পড়ন্ত বিকেলে নৌকার মেলা',
    titleEn: 'Evening rowboats along the Buriganga',
    captionBn: 'সূর্যাস্তের রক্তিম আভায় বুড়িগঙ্গার সদরঘাট প্রান্তে সারি সারি নৌকার দৃশ্য।',
    captionEn: 'Boats docked along Sadarghat terminal illuminated by the setting sun.',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    photographerBn: 'ছবি: তানভীর আহমেদ',
    photographerEn: 'Photo: Tanvir Ahmed',
  },
  {
    id: 'photo-3',
    titleBn: 'মেঘের রাজ্যে পাহাড়ি ঝর্ণার কলতান',
    titleEn: 'Mountain waterfalls amidst cloud cascades',
    captionBn: 'বান্দরবানের নীলগিরি পাদদেশে পাহাড়ি ঝর্ণার নয়নাভিরাম প্রবাহ।',
    captionEn: 'Crystal waters cascading down the foothills of Nilgiri in Bandarban.',
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
    photographerBn: 'ছবি: নাজমুল হাসান',
    photographerEn: 'Photo: Nazmul Hasan',
  },
  {
    id: 'photo-4',
    titleBn: 'ঐতিহাসিক লালবাগ কেল্লায় আলোক উৎসব',
    titleEn: 'Lalbagh Fort Illuminated at Heritage Night',
    captionBn: 'মুঘল ঐতিহ্যের সাক্ষী লালবাগ কেল্লার প্রাচীন প্রাচীরে উৎসবের রঙিন আলো।',
    captionEn: 'Centuries-old Mughal architectural gem bathed in festive amber glow.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    photographerBn: 'ছবি: ফারহানা রহমান',
    photographerEn: 'Photo: Farhana Rahman',
  },
];

interface PhotoStorySectionProps {
  currentLang: Language;
}

export const PhotoStorySection: React.FC<PhotoStorySectionProps> = ({ currentLang }) => {
  const isBn = currentLang === 'bn';

  return (
    <section className="py-6 sm:py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 mb-4 sm:mb-6 border-b-2 border-[#052962]">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-[#052962] text-white rounded-xs">
              <Camera className="w-4 h-4 text-white" />
            </span>
            <h3 className={`text-lg sm:text-xl md:text-2xl font-bold text-gray-900 ${isBn ? 'bn-headline' : 'en-headline'}`}>
              {isBn ? 'ছবিতে বাংলাদেশ ও বিশ্ব' : 'Photo Stories'}
            </h3>
          </div>
          <span className="text-xs text-gray-500 hidden sm:inline-flex items-center gap-1">
            <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
            {isBn ? 'ফটোসাংবাদিকতা' : 'Photojournalism'}
          </span>
        </div>

        {/* 4 Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {photoStories.map((photo) => (
            <div
              key={photo.id}
              className="group relative rounded-sm overflow-hidden bg-gray-900 aspect-4/3 cursor-pointer shadow-xs"
            >
              <img
                src={photo.imageUrl}
                alt={photo.titleBn}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                <span className="text-[10px] text-amber-300 font-mono tracking-wider block mb-1">
                  {isBn ? photo.photographerBn : photo.photographerEn}
                </span>
                <h4 className={`text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2 ${isBn ? 'bn-headline' : 'en-headline'}`}>
                  {isBn ? photo.titleBn : photo.titleEn}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
