// Bengali numeral converter
export function toBengaliNumber(num: number | string): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
}

// Convert English month to Bangla
const bnMonths = [
  'জানুয়ারি',
  'ফেব্রুয়ারি',
  'মার্চ',
  'এপ্রিল',
  'মে',
  'জুন',
  'জুলাই',
  'আগস্ট',
  'সেপ্টেম্বর',
  'অক্টোবর',
  'নভেম্বর',
  'ডিসেম্বর',
];

const bnDays = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
  'শুক্রবার',
  'শনিবার',
];

// Approximate Gregorian to Bengali Calendar converter
// (Traditional revised Bengali Calendar by Bangla Academy)
export function getBengaliCalendarDate(date: Date = new Date('2026-11-06T07:30:00.000Z')): {
  day: string;
  month: string;
  year: string;
  fullDateStr: string;
} {
  const gDay = date.getDate();
  const gMonth = date.getMonth(); // 0 to 11
  const gYear = date.getFullYear();

  let bYear = gYear - 593;
  if (gMonth < 3 || (gMonth === 3 && gDay < 14)) {
    bYear -= 1;
  }

  const banglaMonthNames = [
    'বৈশাখ',
    'জ্যৈষ্ঠ',
    'আষাঢ়',
    'শ্রাবণ',
    'ভাদ্র',
    'আশ্বিন',
    'কার্তিক',
    'অগ্রহায়ণ',
    'পৌষ',
    'মাঘ',
    'ফাল্গুন',
    'চৈত্র',
  ];

  const startDayOfBoishakh = new Date(gYear, 3, 14); // April 14
  let diffDays = Math.floor(
    (date.getTime() - startDayOfBoishakh.getTime()) / (1000 * 60 * 60 * 24)
  );

  let bMonthIndex = 0;
  let bDay = 1;

  if (diffDays >= 0) {
    const monthLengths = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];
    for (let i = 0; i < 12; i++) {
      if (diffDays < monthLengths[i]) {
        bMonthIndex = i;
        bDay = diffDays + 1;
        break;
      }
      diffDays -= monthLengths[i];
    }
  } else {
    bMonthIndex = 11;
    bDay = 30 + diffDays;
    if (bDay <= 0) bDay = 1;
  }

  const bnDayStr = toBengaliNumber(bDay);
  const bnYearStr = toBengaliNumber(bYear);
  const bnMonthStr = banglaMonthNames[bMonthIndex];

  return {
    day: bnDayStr,
    month: bnMonthStr,
    year: bnYearStr,
    fullDateStr: `${bnDayStr} ${bnMonthStr} ${bnYearStr}`,
  };
}

// Deterministic static reference date for SSR & prerender
const STATIC_PRERENDER_DATE = new Date('2026-11-06T07:30:00.000Z');

// Full Header Date Formatter
export function getFormattedHeaderDate(lang: 'bn' | 'en' = 'bn'): string {
  const date = typeof window === 'undefined' ? STATIC_PRERENDER_DATE : new Date();
  if (lang === 'en') {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  const dayName = bnDays[date.getDay()];
  const gDayBn = toBengaliNumber(date.getDate());
  const gMonthBn = bnMonths[date.getMonth()];
  const gYearBn = toBengaliNumber(date.getFullYear());
  const banglaCal = getBengaliCalendarDate(date);

  return `${dayName}, ${gDayBn} ${gMonthBn} ${gYearBn} | ${banglaCal.fullDateStr} বঙ্গাব্দ`;
}

// Relative time in Bengali (e.g., '১০ মিনিট আগে')
export function formatTimeAgo(dateString: string, lang: 'bn' | 'en' = 'bn'): string {
  const date = new Date(dateString);
  const now = typeof window === 'undefined' ? STATIC_PRERENDER_DATE : new Date();
  const diffInMinutes = Math.max(1, Math.floor((now.getTime() - date.getTime()) / (1000 * 60)));

  if (lang === 'en') {
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const hours = Math.floor(diffInMinutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }

  if (diffInMinutes < 60) {
    return `${toBengaliNumber(diffInMinutes)} মিনিট আগে`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${toBengaliNumber(diffInHours)} ঘণ্টা আগে`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  return `${toBengaliNumber(diffInDays)} দিন আগে`;
}
