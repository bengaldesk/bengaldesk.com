'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/types/news';
import { toBengaliNumber } from '@/lib/bangla-date';
import { Vote, CheckCircle2, BarChart3, Users, Share2, Check } from 'lucide-react';

interface DailyPollWidgetProps {
  currentLang: Language;
}

export const DailyPollWidget: React.FC<DailyPollWidgetProps> = ({ currentLang }) => {
  const isBn = currentLang === 'bn';
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | 'noComment' | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pollStats, setPollStats] = useState({
    yes: 64,
    no: 29,
    noComment: 7,
    totalVotes: 15840,
  });

  const question = isBn
    ? 'আসন্ন জাতীয় নির্বাচনে সর্বজনীন গ্রহণযোগ্যতা নিশ্চিতে নির্বাচন কমিশনের বর্তমান সংস্কার উদ্যোগ কি যথেষ্ট?'
    : 'Are the Election Commission\'s current reform initiatives sufficient to ensure universal acceptability in the upcoming national election?';

  useEffect(() => {
    try {
      const savedVote = localStorage.getItem('bengaldesk_daily_poll_vote');
      if (savedVote) {
        setSelectedOption(savedVote as 'yes' | 'no' | 'noComment');
        setHasVoted(true);
        setShowResults(true);
      }
    } catch {}
  }, []);

  const handleSubmitVote = () => {
    if (!selectedOption) return;
    setHasVoted(true);
    setShowResults(true);
    setPollStats((prev) => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
    }));
    try {
      localStorage.setItem('bengaldesk_daily_poll_vote', selectedOption);
    } catch {}
  };

  const handleSharePoll = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white border-2 border-gray-900 rounded-xl p-4 sm:p-5 shadow-sm">
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b-2 border-gray-100 pb-3 mb-3.5">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-red-700 text-white rounded-md shadow-2xs">
            <BarChart3 className="w-4 h-4 text-white" />
          </span>
          <div>
            <h4 className="text-sm font-black text-gray-950 uppercase tracking-wide">
              {isBn ? 'অনলাইন পাঠক জরিপ' : 'Daily Public Poll'}
            </h4>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {isBn ? 'চলমান' : 'Live'}
        </span>
      </div>

      {/* Question */}
      <p className={`text-xs sm:text-sm font-bold text-gray-950 mb-4 leading-snug ${isBn ? 'bn-headline' : 'en-body'}`}>
        {question}
      </p>

      {/* Interactive Voting Mode vs Results Mode */}
      {!showResults ? (
        <div className="space-y-2.5">
          {/* Option: Yes */}
          <label
            onClick={() => setSelectedOption('yes')}
            className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-lg border-2 transition-all flex items-center justify-between cursor-pointer ${
              selectedOption === 'yes'
                ? 'border-gray-950 bg-gray-50 text-gray-950 shadow-2xs'
                : 'border-gray-200 hover:border-gray-400 bg-white text-gray-800'
            }`}
          >
            <span>{isBn ? 'হ্যাঁ' : 'Yes'}</span>
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedOption === 'yes' ? 'border-red-700 bg-red-700' : 'border-gray-400'}`}>
              {selectedOption === 'yes' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
            </span>
          </label>

          {/* Option: No */}
          <label
            onClick={() => setSelectedOption('no')}
            className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-lg border-2 transition-all flex items-center justify-between cursor-pointer ${
              selectedOption === 'no'
                ? 'border-gray-950 bg-gray-50 text-gray-950 shadow-2xs'
                : 'border-gray-200 hover:border-gray-400 bg-white text-gray-800'
            }`}
          >
            <span>{isBn ? 'না' : 'No'}</span>
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedOption === 'no' ? 'border-red-700 bg-red-700' : 'border-gray-400'}`}>
              {selectedOption === 'no' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
            </span>
          </label>

          {/* Option: No Comment */}
          <label
            onClick={() => setSelectedOption('noComment')}
            className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-lg border-2 transition-all flex items-center justify-between cursor-pointer ${
              selectedOption === 'noComment'
                ? 'border-gray-950 bg-gray-50 text-gray-950 shadow-2xs'
                : 'border-gray-200 hover:border-gray-400 bg-white text-gray-800'
            }`}
          >
            <span>{isBn ? 'মন্তব্য নেই' : 'No comment'}</span>
            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedOption === 'noComment' ? 'border-red-700 bg-red-700' : 'border-gray-400'}`}>
              {selectedOption === 'noComment' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
            </span>
          </label>

          {/* Submit Button & Results Link */}
          <div className="pt-2 flex items-center justify-between gap-2">
            <button
              type="button"
              disabled={!selectedOption}
              onClick={handleSubmitVote}
              className="flex-1 py-2 bg-red-700 hover:bg-red-800 disabled:bg-gray-300 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed text-center"
            >
              {isBn ? 'ভোট প্রদান করুন' : 'Submit Vote'}
            </button>
            <button
              type="button"
              onClick={() => setShowResults(true)}
              className="px-3 py-2 text-xs font-bold text-gray-700 hover:text-gray-950 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              {isBn ? 'ফলাফল' : 'Results'}
            </button>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-3 pt-1">
          {/* Yes Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1 text-gray-950">
              <span className="flex items-center gap-1.5">
                {selectedOption === 'yes' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {isBn ? 'হ্যাঁ' : 'Yes'}
              </span>
              <span className="font-extrabold">{isBn ? toBengaliNumber(pollStats.yes) : pollStats.yes}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${pollStats.yes}%` }}
              ></div>
            </div>
          </div>

          {/* No Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1 text-gray-950">
              <span className="flex items-center gap-1.5">
                {selectedOption === 'no' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {isBn ? 'না' : 'No'}
              </span>
              <span className="font-extrabold">{isBn ? toBengaliNumber(pollStats.no) : pollStats.no}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-red-600 h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${pollStats.no}%` }}
              ></div>
            </div>
          </div>

          {/* No Comment Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1 text-gray-950">
              <span className="flex items-center gap-1.5">
                {selectedOption === 'noComment' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {isBn ? 'মন্তব্য নেই' : 'No comment'}
              </span>
              <span className="font-extrabold">{isBn ? toBengaliNumber(pollStats.noComment) : pollStats.noComment}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gray-400 h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${pollStats.noComment}%` }}
              ></div>
            </div>
          </div>

          {/* Back to voting toggle if user hasn't actually voted */}
          {!hasVoted && (
            <button
              type="button"
              onClick={() => setShowResults(false)}
              className="text-xs text-red-700 font-bold hover:underline cursor-pointer block mt-2"
            >
              ← {isBn ? 'ভোট দিন' : 'Back to Vote'}
            </button>
          )}
        </div>
      )}

      {/* Widget Footer Stats & Share */}
      <div className="pt-3.5 mt-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-700 font-medium">
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-gray-500" />
          <span>
            {isBn
              ? `মোট ভোট: ${toBengaliNumber(pollStats.totalVotes)}`
              : `Total votes: ${pollStats.totalVotes}`}
          </span>
        </span>

        <button
          type="button"
          onClick={handleSharePoll}
          className="flex items-center gap-1 text-gray-700 hover:text-red-700 font-bold transition-colors cursor-pointer"
          title="জরিপ শেয়ার করুন"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600">{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>{isBn ? 'শেয়ার' : 'Share'}</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
};
