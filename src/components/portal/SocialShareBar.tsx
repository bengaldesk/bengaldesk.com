'use client';

import React, { useState } from 'react';
import {
  Link as LinkIcon,
  Check,
  Mail,
  Printer,
  Share2,
} from 'lucide-react';
import { FacebookIcon, TwitterIcon } from '@/components/icons/SocialIcons';

interface SocialShareBarProps {
  title: string;
  url?: string;
  isBn?: boolean;
  variant?: 'top' | 'bottom';
  className?: string;
}

export const SocialShareBar: React.FC<SocialShareBarProps> = ({
  title,
  url,
  isBn = true,
  variant = 'top',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return 'https://thebengaldesk.com';
  };

  const shareUrl = getShareUrl();
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // WhatsApp SVG
  const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  // LinkedIn SVG
  const LinkedInIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );

  if (variant === 'top') {
    return (
      <div className={`flex flex-wrap items-center justify-between gap-3 py-2 px-3 bg-gray-50/80 border border-gray-200 rounded-lg text-xs ${className}`}>
        {/* Left: Share Label */}
        <div className="flex items-center gap-1.5 font-bold text-gray-900">
          <Share2 className="w-3.5 h-3.5 text-red-700" />
          <span>{isBn ? 'শেয়ার করুন:' : 'Share:'}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded text-[11px] font-bold transition-all shadow-2xs hover:scale-105 active:scale-95"
            title="Facebook এ শেয়ার করুন"
          >
            <FacebookIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ফেসবুক</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 bg-[#25D366] hover:bg-[#20ba59] text-white rounded text-[11px] font-bold transition-all shadow-2xs hover:scale-105 active:scale-95"
            title="WhatsApp এ পাঠান"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">হোয়াটসঅ্যাপ</span>
          </a>

          {/* Twitter / X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 bg-black hover:bg-gray-800 text-white rounded text-[11px] font-bold transition-all shadow-2xs hover:scale-105 active:scale-95"
            title="X (Twitter) এ পোস্ট করুন"
          >
            <TwitterIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">এক্স</span>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 px-2.5 py-1 bg-[#0A66C2] hover:bg-[#084e96] text-white rounded text-[11px] font-bold transition-all shadow-2xs hover:scale-105 active:scale-95"
            title="LinkedIn এ শেয়ার করুন"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span>লিংকডইন</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}`}
            className="p-1.5 text-gray-700 hover:text-red-700 hover:bg-gray-200/80 rounded transition-colors"
            title="ইমেইল করুন"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>

          {/* Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="p-1.5 text-gray-700 hover:text-gray-950 hover:bg-gray-200/80 rounded transition-colors cursor-pointer"
            title="প্রিন্ট করুন"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          {/* Copy Link with live feedback */}
          <button
            type="button"
            onClick={handleCopyLink}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
            title="লিংক কপি করুন"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{isBn ? 'কপি হয়েছে!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <LinkIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isBn ? 'কপি লিংক' : 'Copy'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Bottom Variant: Elaborate, bold & call to action
  return (
    <div className={`p-4 sm:p-5 bg-stone-50 border border-stone-200 rounded-xl my-6 sm:my-8 ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-gray-950 text-base sm:text-lg mb-0.5">
            {isBn ? 'সংবাদটি বন্ধুদের সাথে শেয়ার করুন' : 'Share this story with your network'}
          </h4>
          <p className="text-xs text-gray-600">
            {isBn
              ? 'বস্তুনিষ্ঠ ও তথ্যভিত্তিক সাংবাদিকতা ছড়িয়ে দিতে আপনার সমর্থন প্রয়োজন।'
              : 'Help spread independent journalism by sharing with your community.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-md text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <FacebookIcon className="w-4 h-4" />
            <span>ফেসবুক</span>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-md text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>হোয়াটসঅ্যাপ</span>
          </a>

          {/* X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-gray-800 text-white rounded-md text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <TwitterIcon className="w-4 h-4" />
            <span>এক্স</span>
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A66C2] hover:bg-[#084e96] text-white rounded-md text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <LinkedInIcon className="w-4 h-4" />
            <span>লিংকডইন</span>
          </a>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-100 text-gray-800'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>{isBn ? 'লিংক কপি হয়েছে!' : 'Link Copied!'}</span>
              </>
            ) : (
              <>
                <LinkIcon className="w-4 h-4" />
                <span>{isBn ? 'লিংক কপি' : 'Copy Link'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
