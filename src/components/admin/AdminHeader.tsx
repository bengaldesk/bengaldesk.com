'use client';

import React from 'react';
import Link from 'next/link';
import { StaffUser } from '@/types/admin';
import { Globe } from 'lucide-react';
import { BrandLogo } from '@/components/portal/BrandLogo';

interface AdminHeaderProps {
  siteName: string;
  currentUser: StaffUser;
  staffList: StaffUser[];
  onSwitchUser: (staff: StaffUser) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  siteName,
  currentUser,
  staffList,
  onSwitchUser,
}) => {
  return (
    <header className="bg-gray-950 text-white border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <BrandLogo
            variant="white"
            className="w-36 sm:w-44"
            showTagline={false}
          />
          <span className="text-[11px] bg-blue-950 text-blue-200 border border-blue-800 px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
            {currentUser.role === 'ADMIN' ? 'প্রধান সম্পাদক ও প্রকাশক কন্ট্রোল' : currentUser.role === 'REPORTER' ? 'সাংবাদিক ডেস্ক' : 'বার্তা বিভাগ'}
          </span>
        </div>

        {/* User & Role Switcher Simulator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 px-3 py-1.5 rounded-md text-xs">
            <span className="text-gray-400">লগইন:</span>
            <select
              value={currentUser.id}
              onChange={(e) => {
                const user = staffList.find((s) => s.id === e.target.value);
                if (user) onSwitchUser(user);
              }}
              className="bg-gray-800 text-white font-bold border border-gray-600 rounded px-2 py-0.5 outline-none cursor-pointer hover:border-red-500"
            >
              {staffList.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name} — {staff.role === 'ADMIN' ? 'প্রধান সম্পাদক ও প্রকাশক' : staff.role === 'SUB_EDITOR' ? 'বার্তা সম্পাদক' : `প্রতিবেদক (${staff.bureau})`}
                </option>
              ))}
            </select>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white px-3.5 py-1.5 rounded text-xs font-bold transition-colors shadow-xs"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>লাইভ ওয়েবসাইট</span>
          </Link>
        </div>

      </div>
    </header>
  );
};
