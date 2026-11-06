'use client';

import React, { useState } from 'react';
import { StaffUser, UserRole } from '@/types/admin';
import { toBengaliNumber } from '@/lib/bangla-date';
import { Users, PlusCircle, ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

interface JournalistsManagerProps {
  staffList: StaffUser[];
  onToggleStatus: (id: string) => void;
  onHire: (data: Omit<StaffUser, 'id' | 'joinedAt' | 'totalSubmissions' | 'publishedCount' | 'isActive' | 'totalReadersGenerated'>) => void;
  onSwitchToStaff: (staff: StaffUser) => void;
}

export const JournalistsManager: React.FC<JournalistsManagerProps> = ({
  staffList,
  onToggleStatus,
  onHire,
  onSwitchToStaff,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('REPORTER');
  const [bureau, setBureau] = useState('ঢাকা');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onHire({
      name,
      email,
      role,
      bureau,
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&w=200&q=80`,
    });

    setName('');
    setEmail('');
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-red-700" />
            <span>সাংবাদিক ও নিউজরুম টিম ব্যবস্থাপনা (Journalists & Audit)</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            সাংবাদিকদের পারফরম্যান্স নিরীক্ষা করুন, সাময়িক বরখাস্ত (Suspend) বা নতুন নিয়োগ সম্পন্ন করুন।
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded transition-colors shadow-2xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>নতুন সাংবাদিক নিয়োগ দিন</span>
        </button>
      </div>

      {/* Journalists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {staffList.map((staff) => (
          <div
            key={staff.id}
            className={`bg-white border rounded-md p-5 shadow-xs flex flex-col justify-between ${
              staff.isActive ? 'border-gray-200' : 'border-red-300 bg-red-50/20 opacity-80'
            }`}
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0 ring-2 ring-gray-100">
                    <img
                      src={staff.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                      alt={staff.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-950 text-base">{staff.name}</h3>
                    <p className="text-xs text-gray-500">{staff.email}</p>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded mt-1 inline-block ${
                      staff.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-900'
                        : staff.role === 'SUB_EDITOR'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {staff.role === 'ADMIN' ? 'প্রধান সম্পাদক ও প্রকাশক' : staff.role === 'SUB_EDITOR' ? 'বার্তা সম্পাদক' : 'প্রতিবেদক'}
                    </span>
                  </div>
                </div>

                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  staff.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {staff.isActive ? 'সক্রিয়' : 'বরখাস্তকৃত'}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400 block">ব্যুরো / জেলা:</span>
                  <span className="font-bold text-gray-800">{staff.bureau}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">মোট পাঠক জেনারেট:</span>
                  <span className="font-bold text-emerald-700">{toBengaliNumber(staff.totalReadersGenerated.toLocaleString())}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              {staff.role !== 'ADMIN' && (
                <button
                  type="button"
                  onClick={() => onToggleStatus(staff.id)}
                  className={`font-bold text-xs hover:underline ${
                    staff.isActive ? 'text-red-700' : 'text-emerald-700'
                  }`}
                >
                  {staff.isActive ? 'সাময়িক বরখাস্ত করুন' : 'পুনরায় সক্রিয় করুন'}
                </button>
              )}

              <button
                type="button"
                onClick={() => onSwitchToStaff(staff)}
                className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1 ml-auto"
              >
                <span>অ্যাকাউন্টে ঢুকুন</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hire Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-700" />
                <span>নতুন সাংবাদিক / প্রতিনিধি নিয়োগ</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {success ? (
              <div className="py-6 text-center text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-600" />
                সাংবাদিক সফলভাবে নিয়োগ দেওয়া হয়েছে!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">সাংবাদিকের পূর্ণ নাম</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: তানভীর আহমেদ"
                    className="w-full border border-gray-300 rounded p-2 text-xs outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">অফিসিয়াল ইমেইল</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tanvir@thebengaldesk.com"
                    className="w-full border border-gray-300 rounded p-2 text-xs outline-none focus:border-red-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">পদবী (Role)</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-full border border-gray-300 rounded p-2 text-xs font-semibold bg-white outline-none focus:border-red-600"
                    >
                      <option value="REPORTER">মাঠপর্যায়ের প্রতিবেদক</option>
                      <option value="SUB_EDITOR">সহ-সম্পাদক / বার্তা বিভাগ</option>
                      <option value="ADMIN">যুগ্ম সম্পাদক</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">ব্যুরো / জেলা</label>
                    <input
                      type="text"
                      required
                      value={bureau}
                      onChange={(e) => setBureau(e.target.value)}
                      placeholder="যেমন: সিলেট ব্যুরো"
                      className="w-full border border-gray-300 rounded p-2 text-xs outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded shadow-xs"
                  >
                    নিয়োগ সম্পন্ন করুন
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
