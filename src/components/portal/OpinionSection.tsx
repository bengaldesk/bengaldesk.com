'use client';

import React from 'react';
import { Article, Language, CategorySlug } from '@/types/news';
import { Quote, Feather, ChevronRight, Clock } from 'lucide-react';

interface OpinionSectionProps {
  articles: Article[];
  currentLang: Language;
  onSelectArticle: (article: Article) => void;
  onViewCategory?: (slug: CategorySlug) => void;
}

// 4 Distinguished Columnists as requested by user
const EMINENT_COLUMNISTS = [
  {
    id: 'op-col-1',
    author: {
      nameBn: 'সৈয়দ মনজুরুল হক',
      nameEn: 'Syed Manzurul Huq',
      roleBn: 'লেখক ও কলামিস্ট',
      roleEn: 'Author & Columnist',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    titleBn: 'শিক্ষা ও সংস্কৃতির সংকট: নতুন প্রজন্মের বুদ্ধিবৃত্তিক জাগরণের অন্বেষা',
    titleEn: 'Crisis of Education and Culture: Searching for Intellectual Renaissance',
    excerptBn: 'সমাজ পরিবর্তনের মূল চালিকাশক্তি শিক্ষা ও মুক্তচিন্তা। পাঠ্যক্রমের আধুনিকায়নের পাশাপাশি তরুণ সমাজকে সৃজনশীল চিন্তায় উদ্বুদ্ধ করার সময় এখনই।',
    excerptEn: 'Education and free thinking are prime drivers of change. Now is the time to encourage creative intellect among youth.',
    readTimeMinutes: 4,
  },
  {
    id: 'op-col-2',
    author: {
      nameBn: 'আসিফ আহমেদ',
      nameEn: 'Asif Ahmed',
      roleBn: 'সাবেক ক্রীড়াবিদ ও ক্রীড়া বিশ্লেষক',
      roleEn: 'Former Athlete & Sports Analyst',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    },
    titleBn: 'টাইগারদের ধারাবাহিক সাফল্য ও টেস্ট ক্রিকেটের ভবিষ্যৎ পথরেখা',
    titleEn: 'Tigers Continuous Success and Future Trajectory of Test Cricket',
    excerptBn: 'হোম কন্ডিশনের পাশাপাশি বিদেশের মাটিতেও দাপুটে পারফরম্যান্স বজায় রাখতে পেস বোলিং ও মিডল অর্ডারের ধারাবাহিকতা জরুরি।',
    excerptEn: 'Maintaining pace bowling and middle order consistency is vital to deliver winning cricket at home and abroad.',
    readTimeMinutes: 3,
  },
  {
    id: 'op-col-3',
    author: {
      nameBn: 'ড. ফাহমিদা সুলতানা',
      nameEn: 'Dr. Fahmida Sultana',
      roleBn: 'রাজনৈতিক বিশ্লেষক ও গবেষক',
      roleEn: 'Political Analyst & Researcher',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    titleBn: 'সুশাসন ও জবাবদিহিতা: গণতান্ত্রিক প্রতিষ্ঠানের ক্ষমতায়নের বিকল্প নেই',
    titleEn: 'Good Governance and Accountability: No Alternative to Strong Institutions',
    excerptBn: 'টেকসই গণতন্ত্রের ভিত নির্ভর করে শক্তিশালী ও স্বাধীন সাংবিধানিক প্রতিষ্ঠানের ওপর। রাষ্ট্র সংস্কারে জনআকাঙ্ক্ষার প্রতিফলন অপরিহার্য।',
    excerptEn: 'Sustainable democracy relies on robust constitutional institutions reflecting people aspirations.',
    readTimeMinutes: 5,
  },
  {
    id: 'op-col-4',
    author: {
      nameBn: 'ড. আব্দুল করিম চৌধুরী',
      nameEn: 'Dr. Abdul Karim Chowdhury',
      roleBn: 'অধ্যাপক, অর্থনীতি বিভাগ',
      roleEn: 'Professor of Economics',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    },
    titleBn: 'মূল্যস্ফীতি নিয়ন্ত্রণ ও টেকসই প্রবৃদ্ধি: সমকালীন সামষ্টিক অর্থনৈতিক চ্যালেঞ্জ',
    titleEn: 'Inflation Control and Sustainable Growth: Macroeconomic Challenges',
    excerptBn: 'মুদ্রানীতি ও রাজস্বনীতির কার্যকর সমন্বয়ের মাধ্যমেই বৈদেশিক মুদ্রার রিজার্ভ স্থিতিশীল রাখা এবং কর্মসংস্থান সৃষ্টি সম্ভব।',
    excerptEn: 'Coordinated monetary and fiscal policy is vital to stabilize foreign reserves and generate employment.',
    readTimeMinutes: 4,
  },
];

export const OpinionSection: React.FC<OpinionSectionProps> = ({
  articles,
  currentLang,
  onSelectArticle,
  onViewCategory,
}) => {
  const isBn = currentLang === 'bn';

  const handleCardClick = (colItem: typeof EMINENT_COLUMNISTS[0]) => {
    // Check if an existing article matches or generate virtual article for detail view
    const matching = articles.find((a) => a.title.includes(colItem.titleBn.slice(0, 15)));
    if (matching) {
      onSelectArticle(matching);
    } else {
      const virtualArticle: Article = {
        id: colItem.id,
        slug: `opinion-${colItem.id}`,
        language: currentLang,
        title: isBn ? colItem.titleBn : colItem.titleEn,
        subtitle: isBn ? colItem.author.roleBn : colItem.author.roleEn,
        excerpt: isBn ? colItem.excerptBn : colItem.excerptEn,
        content: [
          isBn ? colItem.excerptBn : colItem.excerptEn,
          isBn
            ? 'সমকালীন জাতীয় ও আন্তর্জাতিক প্রেক্ষাপটে এই বিষয়টি অত্যন্ত গভীর পর্যালোচনার দাবি রাখে। নীতি নির্ধারকদের বাস্তবসম্মত পদক্ষেপ গ্রহণ এখন সময়ের দাবি।'
            : 'In contemporary national and global contexts, this subject requires thorough intellectual scrutiny. Strategic policy execution is imperative.',
          isBn
            ? 'সামাজিক রূপান্তরের প্রতিটি ধাপে জনসচেতনতা এবং প্রাতিষ্ঠানিক স্বচ্ছতা নিশ্চিত করা আবশ্যক। আমরা আশা করি সংশ্লিষ্ট মহল বিষয়টির গুরুত্ব অনুধাবন করবেন।'
            : 'At every stage of societal transformation, public awareness and institutional integrity must be upheld.',
        ],
        category: 'opinion',
        tags: ['মতামত', 'সম্পাদকীয়', 'বিশ্লেষণ'],
        author: {
          id: colItem.id,
          nameBn: colItem.author.nameBn,
          nameEn: colItem.author.nameEn,
          roleBn: colItem.author.roleBn,
          roleEn: colItem.author.roleEn,
          avatarUrl: colItem.author.avatarUrl,
          locationBn: 'ঢাকা',
          locationEn: 'Dhaka',
        },
        publishedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        featuredImage: {
          url: colItem.author.avatarUrl,
          caption: isBn ? colItem.author.nameBn : colItem.author.nameEn,
          credit: isBn ? 'দ্য বেঙ্গল ডেস্ক কলাম' : 'The Bengal Desk Opinion',
        },
        readTimeMinutes: colItem.readTimeMinutes,
        priority: 'OPINION',
        viewCount: 1420,
      };
      onSelectArticle(virtualArticle);
    }
  };

  return (
    <section className="py-6 sm:py-8 bg-stone-50 border-y border-stone-200 my-6 sm:my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-2 mb-5 sm:mb-6 border-b-2 border-red-700">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-red-700 text-white rounded-xs">
              <Feather className="w-4 h-4 text-white" />
            </span>
            <h3
              className={`text-lg sm:text-xl md:text-2xl font-bold text-gray-950 ${
                isBn ? 'bn-headline' : 'en-headline'
              }`}
            >
              {isBn ? 'মতামত ও সম্পাদকীয়' : 'Opinion & Editorial'}
            </h3>
          </div>
          {onViewCategory && (
            <button
              type="button"
              onClick={() => onViewCategory('opinion')}
              className="text-xs sm:text-sm font-bold text-gray-700 hover:text-red-700 flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              <span>{isBn ? 'সব মতামত' : 'All Opinions'}</span>
              <ChevronRight className="w-4 h-4 text-red-700" />
            </button>
          )}
        </div>

        {/* 4-Column Opinion Cards Grid with Distinct People & Roles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {EMINENT_COLUMNISTS.map((item) => (
            <article
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:shadow-md hover:border-red-700/40 transition-all cursor-pointer group relative"
            >
              <div className="relative">
                {/* Decorative quote icon */}
                <Quote className="w-8 h-8 text-stone-200 absolute -top-1 -right-1 pointer-events-none group-hover:text-red-100 transition-colors" />

                {/* Author Info: Distinct Photo, Name, and Specific Social Identity */}
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-100 ring-2 ring-gray-200 group-hover:ring-red-700 transition-all shrink-0">
                    <img
                      src={item.author.avatarUrl}
                      alt={item.author.nameBn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-950 group-hover:text-red-700 transition-colors line-clamp-1">
                      {isBn ? item.author.nameBn : item.author.nameEn}
                    </h4>
                    <p className="text-[11px] text-gray-700 font-medium line-clamp-1">
                      {isBn ? item.author.roleBn : item.author.roleEn}
                    </p>
                  </div>
                </div>

                {/* Headline / Column Title */}
                <h3
                  className={`text-sm sm:text-base font-bold text-gray-950 group-hover:text-red-700 transition-colors leading-snug mb-2 line-clamp-3 ${
                    isBn ? 'bn-headline' : 'en-headline'
                  }`}
                >
                  {isBn ? item.titleBn : item.titleEn}
                </h3>

                {/* Excerpt */}
                <p
                  className={`text-xs text-gray-700 line-clamp-2 ${
                    isBn ? 'bn-body' : 'en-body'
                  }`}
                >
                  {isBn ? item.excerptBn : item.excerptEn}
                </p>
              </div>

              {/* Read column button */}
              <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-gray-600 font-medium">
                <span className="text-gray-950 font-bold group-hover:text-red-700 group-hover:underline">
                  {isBn ? 'কলাম পড়ুন →' : 'Read Column →'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-500" />
                  {item.readTimeMinutes} {isBn ? 'মিনিট' : 'min'}
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
