'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Language } from '@/types/news';
import { formatTimeAgo, toBengaliNumber } from '@/lib/bangla-date';
import {
  MessageSquare,
  ThumbsUp,
  CornerDownRight,
  Send,
  User,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

export interface CommentItem {
  id: string;
  articleId: string;
  authorName: string;
  authorEmail?: string;
  authorAvatar?: string;
  isVerified?: boolean;
  content: string;
  createdAt: number;
  likes: number;
  hasLiked?: boolean;
  replies?: CommentItem[];
}

interface CommentSectionProps {
  articleId: string;
  articleTitle: string;
  currentLang: Language;
}

const DEFAULT_COMMENTS_SEED: Record<string, CommentItem[]> = {
  default: [
    {
      id: 'c-1',
      articleId: 'default',
      authorName: 'কবিরুল ইসলাম',
      isVerified: true,
      content: 'অত্যন্ত সময়োপযোগী ও বিশদ বিশ্লেষণ। দেশের রফতানি খাতের বৈচিত্র্যকরণে সেমিকন্ডাক্টর ও হাইটেক শিল্পের কোনো বিকল্প নেই। সরকারের নীতি সহায়তা দ্রুত কার্যকর হওয়া জরুরি।',
      createdAt: Date.now() - 45 * 60 * 1000,
      likes: 14,
      replies: [
        {
          id: 'c-1-r1',
          articleId: 'default',
          authorName: 'ডা. আনিসুর রহমান',
          isVerified: false,
          content: 'একমত। বিশেষ করে স্থানীয় দক্ষ মানবসম্পদ তৈরিতে বিশ্ববিদ্যালয়গুলোর কারিকুলামেও দ্রুত সংস্কার আনা দরকার।',
          createdAt: Date.now() - 20 * 60 * 1000,
          likes: 6,
        },
      ],
    },
    {
      id: 'c-2',
      articleId: 'default',
      authorName: 'নাজমিন আক্তার',
      isVerified: true,
      content: 'দ্য বেঙ্গল ডেস্কের এই বিশেষ অনুসন্ধানী প্রতিবেদনটির জন্য ধন্যবাদ। তথ্যের উপস্থাপন ও আন্তর্জাতিক তুলনামূলক পরিসংখ্যান চমৎকার হয়েছে।',
      createdAt: Date.now() - 2 * 60 * 60 * 1000,
      likes: 9,
    },
  ],
};

export const CommentSection: React.FC<CommentSectionProps> = ({
  articleId,
  articleTitle,
  currentLang,
}) => {
  const isBn = currentLang === 'bn';
  const { user, isAuthenticated } = useAuth();

  const storageKey = `bengaldesk_comments_${articleId}`;

  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentText, setCommentText] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Load comments
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setComments(JSON.parse(stored));
      } else {
        // Seed default realistic comments
        const seeds = DEFAULT_COMMENTS_SEED[articleId] || DEFAULT_COMMENTS_SEED.default;
        setComments(seeds);
        localStorage.setItem(storageKey, JSON.stringify(seeds));
      }
    } catch {
      setComments(DEFAULT_COMMENTS_SEED.default);
    }
  }, [articleId, storageKey]);

  // Save comments helper
  const persistComments = (updated: CommentItem[]) => {
    setComments(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const authorName = isAuthenticated && user ? user.name : (guestName.trim() || 'সম্মানিত পাঠক');
    const authorEmail = isAuthenticated && user ? user.email : guestEmail.trim();

    const newComment: CommentItem = {
      id: `comment-${Date.now()}`,
      articleId,
      authorName,
      authorEmail,
      isVerified: isAuthenticated,
      content: commentText.trim(),
      createdAt: Date.now(),
      likes: 0,
      replies: [],
    };

    const next = [newComment, ...comments];
    persistComments(next);
    setCommentText('');
    setGuestName('');
    setGuestEmail('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3500);
  };

  const handlePostReply = (parentId: string) => {
    if (!replyText.trim()) return;
    const authorName = isAuthenticated && user ? user.name : (guestName.trim() || 'সম্মানিত পাঠক');

    const newReply: CommentItem = {
      id: `reply-${Date.now()}`,
      articleId,
      authorName,
      isVerified: isAuthenticated,
      content: replyText.trim(),
      createdAt: Date.now(),
      likes: 0,
    };

    const updated = comments.map((c) => {
      if (c.id === parentId) {
        return {
          ...c,
          replies: [...(c.replies || []), newReply],
        };
      }
      return c;
    });

    persistComments(updated);
    setReplyingToId(null);
    setReplyText('');
  };

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    const updated = comments.map((c) => {
      if (!isReply && c.id === commentId) {
        const nextLikes = c.hasLiked ? c.likes - 1 : c.likes + 1;
        return { ...c, likes: nextLikes, hasLiked: !c.hasLiked };
      }
      if (isReply && parentId && c.id === parentId && c.replies) {
        const updatedReplies = c.replies.map((r) => {
          if (r.id === commentId) {
            const nextLikes = r.hasLiked ? r.likes - 1 : r.likes + 1;
            return { ...r, likes: nextLikes, hasLiked: !r.hasLiked };
          }
          return r;
        });
        return { ...c, replies: updatedReplies };
      }
      return c;
    });
    persistComments(updated);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes;
    return b.createdAt - a.createdAt;
  });

  const totalCommentsCount = comments.reduce(
    (acc, curr) => acc + 1 + (curr.replies?.length || 0),
    0
  );

  return (
    <section className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t-2 border-gray-950">
      
      {/* 1. Header with Comment Count & Sort Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="w-6 h-6 text-red-700" />
          <h3 className={`text-xl sm:text-2xl font-black text-gray-950 ${isBn ? 'bn-headline' : 'en-headline'}`}>
            {isBn ? 'পাঠকের মন্তব্য' : 'Reader Comments'}
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs sm:text-sm font-extrabold border border-red-200">
            {isBn ? toBengaliNumber(totalCommentsCount) : totalCommentsCount}
          </span>
        </div>

        {/* Sort Tabs */}
        <div className="inline-flex rounded-lg bg-gray-100 p-0.5 text-xs font-bold text-gray-700">
          <button
            type="button"
            onClick={() => setSortBy('newest')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              sortBy === 'newest'
                ? 'bg-white text-gray-950 shadow-xs'
                : 'text-gray-600 hover:text-gray-950'
            }`}
          >
            {isBn ? 'সর্বশেষ' : 'Newest'}
          </button>
          <button
            type="button"
            onClick={() => setSortBy('popular')}
            className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
              sortBy === 'popular'
                ? 'bg-white text-gray-950 shadow-xs'
                : 'text-gray-600 hover:text-gray-950'
            }`}
          >
            {isBn ? 'জনপ্রিয়' : 'Popular'}
          </button>
        </div>
      </div>

      {/* 2. Success Alert */}
      {showSuccessToast && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            {isBn
              ? 'আপনার মন্তব্যটি সফলভাবে প্রকাশিত হয়েছে। ধন্যবাদ!'
              : 'Your comment has been posted successfully. Thank you!'}
          </span>
        </div>
      )}

      {/* 3. New Comment Submission Form */}
      <form onSubmit={handlePostComment} className="mb-8 p-4 sm:p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-2xs">
        {/* User Session Info or Guest Inputs */}
        <div className="flex items-center justify-between mb-3 text-xs">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-red-700 text-white font-bold flex items-center justify-center text-xs">
                {user.name.charAt(0)}
              </div>
              <span className="font-bold text-gray-950">
                {isBn ? `মন্তব্য করছেন: ${user.name}` : `Posting as: ${user.name}`}
              </span>
              <span className="text-[10px] bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded font-semibold border border-blue-200">
                ভেরিফাইড পাঠক
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4 text-gray-500" />
              <span>{isBn ? 'অতিথি হিসেবে মন্তব্য করুন অথবা' : 'Comment as guest or'}</span>
              <Link href="/login" className="font-bold text-red-700 hover:underline">
                {isBn ? 'লগইন করুন' : 'Sign in'}
              </Link>
            </div>
          )}
        </div>

        {/* Guest Input Fields (if not logged in) */}
        {!isAuthenticated && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder={isBn ? 'আপনার পূর্ণ নাম লিখুন *' : 'Your full name *'}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-950"
            />
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              placeholder={isBn ? 'ইমেইল (ঐচ্ছিক - গোপন রাখা হবে)' : 'Email (optional - kept private)'}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-gray-950"
            />
          </div>
        )}

        {/* Textarea */}
        <div className="relative mb-3">
          <textarea
            required
            rows={3}
            maxLength={600}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={
              isBn
                ? 'এই সংবাদের ওপর আপনার শালীন ও গঠনমূলক মতামত লিখুন...'
                : 'Write your constructive thoughts on this story...'
            }
            className="w-full p-3 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg text-gray-950 placeholder:text-gray-400 focus:outline-none focus:border-gray-950 resize-y"
          />
          <span className="absolute bottom-2.5 right-3 text-[11px] text-gray-400">
            {isBn ? toBengaliNumber(commentText.length) : commentText.length}/৬০০
          </span>
        </div>

        {/* Submit Button & Guidelines */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <p className="text-[11px] text-gray-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{isBn ? 'ব্যক্তি আক্রমণ বা উসকানিমূলক মন্তব্য থেকে বিরত থাকুন।' : 'Keep comments civil and constructive.'}</span>
          </p>

          <button
            type="submit"
            disabled={!commentText.trim()}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-red-700 hover:bg-red-800 disabled:bg-gray-300 text-white rounded-lg text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isBn ? 'মন্তব্য প্রকাশ করুন' : 'Post Comment'}</span>
          </button>
        </div>
      </form>

      {/* 4. Comments List */}
      <div className="space-y-4">
        {sortedComments.length === 0 ? (
          <div className="py-10 text-center text-gray-500 text-xs sm:text-sm">
            {isBn
              ? 'এখনো কোনো মন্তব্য নেই। প্রথম মন্তব্যটি করুন আপনিই!'
              : 'No comments yet. Be the first to share your perspective!'}
          </div>
        ) : (
          sortedComments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors shadow-2xs"
            >
              {/* Comment Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-stone-200 text-gray-800 font-bold flex items-center justify-center text-xs">
                    {comment.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-gray-950 text-xs sm:text-sm">
                        {comment.authorName}
                      </h4>
                      {comment.isVerified && (
                        <span title="ভেরিফাইড পাঠক">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-500">
                      {formatTimeAgo(new Date(comment.createdAt).toISOString(), currentLang)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Comment Content (Always pure black, high contrast) */}
              <p className="text-gray-950 text-xs sm:text-sm leading-relaxed mb-3 pl-1">
                {comment.content}
              </p>

              {/* Comment Actions: Like & Reply */}
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-600 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition-colors cursor-pointer ${
                    comment.hasLiked ? 'text-red-700 font-bold' : 'text-gray-700'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{isBn ? toBengaliNumber(comment.likes) : comment.likes}</span>
                  <span className="hidden sm:inline">{isBn ? 'পছন্দ' : 'Like'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                  className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                >
                  <CornerDownRight className="w-3.5 h-3.5" />
                  <span>{isBn ? 'উত্তর দিন' : 'Reply'}</span>
                </button>
              </div>

              {/* Reply Input Box (if active) */}
              {replyingToId === comment.id && (
                <div className="mt-3 pl-4 sm:pl-8 border-l-2 border-red-700 pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={isBn ? 'আপনার উত্তর লিখুন...' : 'Write your reply...'}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-950 focus:outline-none focus:border-gray-950"
                    />
                    <button
                      type="button"
                      onClick={() => handlePostReply(comment.id)}
                      className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-bold transition-all"
                    >
                      {isBn ? 'পাঠান' : 'Reply'}
                    </button>
                  </div>
                </div>
              )}

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-3 pl-4 sm:pl-6 border-l-2 border-gray-200 space-y-3 pt-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-50/70 p-2.5 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-gray-950 text-xs">
                            {reply.authorName}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            • {formatTimeAgo(new Date(reply.createdAt).toISOString(), currentLang)}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-900 text-xs pl-0.5 mb-1.5">{reply.content}</p>
                      <button
                        type="button"
                        onClick={() => handleLike(reply.id, true, comment.id)}
                        className={`flex items-center gap-1 text-[11px] font-semibold cursor-pointer ${
                          reply.hasLiked ? 'text-red-700 font-bold' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{isBn ? toBengaliNumber(reply.likes) : reply.likes}</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))
        )}
      </div>

    </section>
  );
};
