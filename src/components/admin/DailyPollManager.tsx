'use client';

import React, { useState } from 'react';
import { EditorialPoll } from '@/types/admin';
import { toBengaliNumber } from '@/lib/bangla-date';
import { Vote } from 'lucide-react';

interface DailyPollManagerProps {
  activePoll: EditorialPoll;
  onCreatePoll: (question: string, category: string) => void;
}

export const DailyPollManager: React.FC<DailyPollManagerProps> = ({
  activePoll,
  onCreatePoll,
}) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [newCategory, setNewCategory] = useState('রাজনীতি ও নির্বাচন');
  const [pollSuccess, setPollSuccess] = useState(false);

  const totalVotes = activePoll.votesYes + activePoll.votesNo + activePoll.votesNoComment;
  const yesPct = totalVotes > 0 ? Math.round((activePoll.votesYes / totalVotes) * 100) : 0;
  const noPct = totalVotes > 0 ? Math.round((activePoll.votesNo / totalVotes) * 100) : 0;
  const noCommentPct = totalVotes > 0 ? Math.round((activePoll.votesNoComment / totalVotes) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    onCreatePoll(newQuestion, newCategory);
    setNewQuestion('');
    setPollSuccess(true);
    setTimeout(() => setPollSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-md border border-gray-200 shadow-xs">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-2">
          <Vote className="w-5 h-5 text-red-700" />
          <span>আজকের লাইভ জনমত জরিপ (Daily Poll)</span>
        </h2>
        <p className="text-xs text-gray-600 mb-6">
          প্রথম আলোর মতো প্রতিদিন পাঠকদের মতামতের জন্য সম্পাদকীয় পোল প্রকাশ করুন।
        </p>

        {/* Active Poll Card */}
        <div className="p-5 bg-gray-50 border border-gray-200 rounded-md mb-6">
          <span className="bg-red-100 text-red-800 font-bold text-xs px-2.5 py-0.5 rounded">
            {activePoll.category}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 bn-headline mt-2 mb-4">
            "{activePoll.question}"
          </h3>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>হ্যাঁ ({toBengaliNumber(activePoll.votesYes)} ভোট)</span>
                <span className="text-emerald-700">{toBengaliNumber(yesPct)}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${yesPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>না ({toBengaliNumber(activePoll.votesNo)} ভোট)</span>
                <span className="text-red-700">{toBengaliNumber(noPct)}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${noPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>মন্তব্য নেই ({toBengaliNumber(activePoll.votesNoComment)} ভোট)</span>
                <span className="text-gray-600">{toBengaliNumber(noCommentPct)}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: `${noCommentPct}%` }}></div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 mt-4 text-right">
            মোট সংগৃহীত ভোট: {toBengaliNumber(totalVotes.toLocaleString())}
          </p>
        </div>

        {/* Create New Poll Form */}
        <form onSubmit={handleSubmit} className="pt-4 border-t border-gray-200 space-y-4">
          <h4 className="font-bold text-sm text-gray-900">নতুন জনমত জরিপ প্রশ্ন প্রকাশ করুন:</h4>
          <div>
            <input
              type="text"
              required
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="যেমন: সরকারের বর্তমান সংস্কার কার্যক্রম কি টেকসই হবে বলে মনে করেন?"
              className="w-full border border-gray-300 rounded p-2.5 text-xs text-gray-900 outline-none focus:border-red-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="ক্যাটাগরি"
              className="border border-gray-300 rounded p-2 text-xs text-gray-900 outline-none focus:border-red-600 w-1/2"
            />
            <button
              type="submit"
              className="bg-red-700 hover:bg-red-800 text-white font-bold text-xs px-4 py-2 rounded transition-colors"
            >
              জরিপ লাইভ করুন
            </button>
          </div>

          {pollSuccess && (
            <p className="text-xs font-bold text-emerald-700">নতুন জনমত জরিপ সফলভাবে চালু হয়েছে!</p>
          )}
        </form>
      </div>
    </div>
  );
};
