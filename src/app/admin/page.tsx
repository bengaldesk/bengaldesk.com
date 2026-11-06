'use client';

import React, { useState } from 'react';
import { useNews } from '@/context/NewsContext';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ExecutiveKpiRibbon } from '@/components/admin/ExecutiveKpiRibbon';
import { ExecutiveOverviewTab } from '@/components/admin/ExecutiveOverviewTab';
import { EditorialReviewDesk } from '@/components/admin/EditorialReviewDesk';
import { FrontpageCurator } from '@/components/admin/FrontpageCurator';
import { JournalistsManager } from '@/components/admin/JournalistsManager';
import { AdMonetizationManager } from '@/components/admin/AdMonetizationManager';
import { DailyPollManager } from '@/components/admin/DailyPollManager';
import { SiteSettingsManager } from '@/components/admin/SiteSettingsManager';
import { StoryComposer } from '@/components/admin/StoryComposer';
import { ReporterMyStories } from '@/components/admin/ReporterMyStories';
import { toBengaliNumber } from '@/lib/bangla-date';
import {
  BarChart3,
  Clock,
  LayoutTemplate,
  Users,
  DollarSign,
  Vote,
  Settings,
  FileText,
  PlusCircle,
} from 'lucide-react';

export default function AdminPage() {
  const {
    articles,
    publishedArticles,
    staffList,
    currentUser,
    siteSettings,
    adSlots,
    activePoll,
    setCurrentUser,
    submitArticle,
    approveArticle,
    rejectArticle,
    setArticlePriority,
    hireJournalist,
    toggleStaffStatus,
    updateSiteSettings,
    toggleAdSlot,
    createPoll,
  } = useNews();

  const isReporter = currentUser.role === 'REPORTER';
  const isAdmin = currentUser.role === 'ADMIN' || currentUser.role === 'SUB_EDITOR';

  type TabType =
    | 'overview'
    | 'review'
    | 'curator'
    | 'journalists'
    | 'ads'
    | 'poll'
    | 'settings'
    | 'create'
    | 'my-stories';

  const [activeTab, setActiveTab] = useState<TabType>(isReporter ? 'my-stories' : 'overview');

  const pendingArticles = articles.filter((a) => a.status === 'PENDING_REVIEW');
  const reporterArticles = articles.filter((a) => a.author.id === currentUser.id);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col bn-ui text-gray-900">
      
      {/* 1. TOP HEADER & IDENTITY */}
      <AdminHeader
        siteName={siteSettings.siteNameBn}
        currentUser={currentUser}
        staffList={staffList}
        onSwitchUser={(staff) => {
          setCurrentUser(staff);
          setActiveTab(staff.role === 'REPORTER' ? 'my-stories' : 'overview');
        }}
      />

      {/* 2. EXECUTIVE KPI SUMMARY RIBBON (FOR ADMIN) */}
      {isAdmin && (
        <ExecutiveKpiRibbon
          publishedCount={publishedArticles.length}
          pendingCount={pendingArticles.length}
          staffCount={staffList.length}
          activeAdCount={adSlots.filter((a) => a.isActive).length}
        />
      )}

      {/* 3. NAVIGATION TABS */}
      <nav className="bg-white border-b border-gray-200 sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex space-x-1 py-1.5 text-xs sm:text-sm font-bold">
            
            {/* Chief Editor Master Tabs */}
            {isAdmin && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-red-50 text-red-700 font-extrabold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>ওভারভিউ ও এনালাইটিক্স</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('review')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors relative ${
                    activeTab === 'review'
                      ? 'bg-red-50 text-red-700 font-extrabold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>রিভিউ কিউ (অ্যাপ্রুভাল)</span>
                  {pendingArticles.length > 0 && (
                    <span className="bg-red-600 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                      {toBengaliNumber(pendingArticles.length)}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('curator')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'curator'
                      ? 'bg-red-50 text-red-700 font-extrabold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <LayoutTemplate className="w-4 h-4" />
                  <span>হোমপেজ কিউরেশন (ফ্রন্টপেজ লেআউট)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('journalists')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'journalists'
                      ? 'bg-red-50 text-red-700 font-extrabold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>সাংবাদিক ও নিউজরুম</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('ads')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'ads'
                      ? 'bg-red-50 text-red-700 font-extrabold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>বিজ্ঞাপন ও মনিটাইজেশন</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('poll')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'poll'
                      ? 'bg-red-50 text-red-700 font-extrabold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Vote className="w-4 h-4" />
                  <span>জনমত জরিপ</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-red-50 text-red-700 font-extrabold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>পত্রিকা পরিচিতি ও সেটিংস</span>
                </button>
              </>
            )}

            {/* Reporter View Tab */}
            {isReporter && (
              <button
                type="button"
                onClick={() => setActiveTab('my-stories')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                  activeTab === 'my-stories'
                    ? 'bg-red-50 text-red-700 font-extrabold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>আমার প্রেরিত সংবাদ ({toBengaliNumber(reporterArticles.length)})</span>
              </button>
            )}

            {/* Create Story Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('create')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors ${
                activeTab === 'create'
                  ? 'bg-red-50 text-red-700 font-extrabold'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isReporter ? 'নতুন সংবাদ জমা দিন' : 'সরাসরি সংবাদ রচনা'}</span>
            </button>

          </div>
        </div>
      </nav>

      {/* 4. MAIN WORKSPACE CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {isAdmin && activeTab === 'overview' && (
          <ExecutiveOverviewTab publishedArticles={publishedArticles} />
        )}

        {isAdmin && activeTab === 'review' && (
          <EditorialReviewDesk
            pendingArticles={pendingArticles}
            onApprove={(id, prio) => approveArticle(id, prio)}
            onReject={(id, note) => rejectArticle(id, note)}
          />
        )}

        {isAdmin && activeTab === 'curator' && (
          <FrontpageCurator
            publishedArticles={publishedArticles}
            onSetPriority={(id, prio) => setArticlePriority(id, prio)}
          />
        )}

        {isAdmin && activeTab === 'journalists' && (
          <JournalistsManager
            staffList={staffList}
            onToggleStatus={(id) => toggleStaffStatus(id)}
            onHire={(data) => hireJournalist(data)}
            onSwitchToStaff={(staff) => {
              setCurrentUser(staff);
              setActiveTab(staff.role === 'REPORTER' ? 'my-stories' : 'overview');
            }}
          />
        )}

        {isAdmin && activeTab === 'ads' && (
          <AdMonetizationManager
            adSlots={adSlots}
            onToggleAdSlot={(id) => toggleAdSlot(id)}
          />
        )}

        {isAdmin && activeTab === 'poll' && (
          <DailyPollManager
            activePoll={activePoll}
            onCreatePoll={(q, c) => createPoll(q, c)}
          />
        )}

        {isAdmin && activeTab === 'settings' && (
          <SiteSettingsManager
            siteSettings={siteSettings}
            onSave={(settings) => updateSiteSettings(settings)}
          />
        )}

        {isReporter && activeTab === 'my-stories' && (
          <ReporterMyStories
            currentUser={currentUser}
            reporterArticles={reporterArticles}
            onCreateNewClick={() => setActiveTab('create')}
          />
        )}

        {activeTab === 'create' && (
          <StoryComposer
            isReporter={isReporter}
            isAdmin={isAdmin}
            onSubmit={(articleData) => {
              submitArticle(articleData);
              if (isReporter) {
                setActiveTab('my-stories');
              } else {
                setActiveTab('overview');
              }
            }}
          />
        )}
      </main>

    </div>
  );
}
