'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/types/news';
import { toBengaliNumber } from '@/lib/bangla-date';
import { Vote, CheckCircle2, BarChart2 } from 'lucide-react';

interface DailyPollWidgetProps {
  currentLang: Language;
}

export const DailyPollWidget: React.FC<DailyPollWidgetProps> = ({ currentLang }) => {
  const isBn = currentLang === 'bn';
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [pollStats, setPollStats] = useState({
    yes: 62,
    no: 31,
    noComment: 7,
    totalVotes: 14820,
  });

  const question = isBn
    ? 'আসন্ন জাতীয় নির্বাচনে সর্বজনীন গ্রহণযোগ্যতা নিশ্চিতে নির্বাচন কমিশনের সংস্কার উদ্যোগ কি যথেষ্ট?'
    : 'Are the Election Commission\'s reform initiatives sufficient to ensure universal acceptability in the upcoming national election?';

  useEffect(() => {
    try {
      const savedVote = localStorage.getItem('bengaldesk_daily_poll_vote');
      if (savedVote) {
        setSelectedOption(savedVote);
        setHasVoted(true);
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  const handleVote = (option: 'yes' | 'no' | 'noComment') => {
    setSelectedOption(option);
    setHasVoted(true);
    setPollStats((prev) => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
    }));
    try {
      localStorage.setItem('bengaldesk_daily_poll_vote', option);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-4 sm:p-5 shadow-xs">
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 mb-3.5">
        <div className="flex items-center gap-2">
          <span className="p-1 bg-[#052962]/10 text-[#052962] rounded">
            <Vote className="w-4 h-4 text-[#052962]" />
          </span>
          <h4 className="text-sm font-bold text-gray-900">
            {isBn ? 'অনলাইন জরিপ' : 'Daily Poll'}
          </h4>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
          {isBn ? 'চলমান' : 'Active'}
        </span>
      </div>

      {/* Question */}
      <p className={`text-xs sm:text-sm font-semibold text-gray-900 mb-4 leading-snug ${isBn ? 'bn-headline' : 'en-body'}`}>
        {question}
      </p>

      {/* Options or Results */}
      {!hasVoted ? (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleVote('yes')}
            className="w-full text-left px-3.5 py-2 text-xs sm:text-sm font-medium border border-gray-200 hover:border-[#052962] hover:bg-blue-50/50 rounded transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>{isBn ? 'হ্যাঁ' : 'Yes'}</span>
            <span className="text-gray-300">○</span>
          </button>

          <button
            type="button"
            onClick={() => handleVote('no')}
            className="w-full text-left px-3.5 py-2 text-xs sm:text-sm font-medium border border-gray-200 hover:border-[#052962] hover:bg-blue-50/50 rounded transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>{isBn ? 'না' : 'No'}</span>
            <span className="text-gray-300">○</span>
          </button>

          <button
            type="button"
            onClick={() => handleVote('noComment')}
            className="w-full text-left px-3.5 py-2 text-xs sm:text-sm font-medium border border-gray-200 hover:border-[#052962] hover:bg-blue-50/50 rounded transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>{isBn ? 'মন্তব্য নেই' : 'No comment'}</span>
            <span className="text-gray-300">○</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Yes Result */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1 text-gray-800">
              <span className="flex items-center gap-1.5">
                {selectedOption === 'yes' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {isBn ? 'হ্যাঁ' : 'Yes'}
              </span>
              <span>{isBn ? toBengaliNumber(pollStats.yes) : pollStats.yes}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#052962] h-2 rounded-full transition-all duration-700"
                style={{ width: `${pollStats.yes}%` }}
              ></div>
            </div>
          </div>

          {/* No Result */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1 text-gray-800">
              <span className="flex items-center gap-1.5">
                {selectedOption === 'no' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {isBn ? 'না' : 'No'}
              </span>
              <span>{isBn ? toBengaliNumber(pollStats.no) : pollStats.no}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-700"
                style={{ width: `${pollStats.no}%` }}
              ></div>
            </div>
          </div>

          {/* No Comment Result */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1 text-gray-800">
              <span className="flex items-center gap-1.5">
                {selectedOption === 'noComment' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                {isBn ? 'মন্তব্য নেই' : 'No comment'}
              </span>
              <span>{isBn ? toBengaliNumber(pollStats.noComment) : pollStats.noComment}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gray-400 h-2 rounded-full transition-all duration-700"
                style={{ width: `${pollStats.noComment}%` }}
              ></div>
            </div>
          </div>

          {/* Total Votes */}
          <div className="pt-2.5 mt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <BarChart2 className="w-3.5 h-3.5" />
              {isBn ? 'মতামত গৃহীত হয়েছে' : 'Vote Recorded'}
            </span>
            <span>
              {isBn ? 'মোট ভোট: ' : 'Total Votes: '}
              <strong className="text-gray-800">{isBn ? toBengaliNumber(pollStats.totalVotes) : pollStats.totalVotes}</strong>
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
