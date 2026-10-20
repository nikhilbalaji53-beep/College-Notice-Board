import React, { useState } from 'react';
import { useNoticeStore } from './hooks/useNoticeStore';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileBottomBar } from './components/MobileBottomBar';
import { StudentFeed } from './components/StudentFeed';
import { AdminDashboard } from './components/AdminDashboard';
import { NoticeDetailModal } from './components/NoticeDetailModal';
import { ComposeNoticeModal } from './components/ComposeNoticeModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { StudentAttendanceRoster } from './components/StudentAttendanceRoster';
import { Notice, Attachment } from './types';
import { Bookmark, Sparkles, AlertTriangle } from 'lucide-react';

export function App() {
  const {
    notices,
    bookmarkedIds,
    acknowledgedIds,
    readIds,
    role,
    setRole,
    isDarkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedYear,
    setSelectedYear,
    selectedBranch,
    setSelectedBranch,
    activeTab,
    setActiveTab,
    selectedNotice,
    setSelectedNotice,
    toggleBookmark,
    acknowledgeNotice,
    markAsRead,
    addNotice,
    deleteNotice,
    togglePin,
    resetToDefaultData,
  } = useNoticeStore();

  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activePdfAttachment, setActivePdfAttachment] = useState<{ notice: Notice; attachment: Attachment } | null>(null);

  // Compute category counts
  const categoryCounts = notices.reduce((acc, notice) => {
    acc['All'] = (acc['All'] || 0) + 1;
    acc[notice.category] = (acc[notice.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Urgent notices for banner
  const urgentNotices = notices.filter(n => n.priority === 'Urgent');

  // Bookmarked notices list for Saved tab
  const savedNotices = notices.filter(n => bookmarkedIds.includes(n.id));

  const handleOpenPdf = (notice: Notice, attachment: Attachment) => {
    setActivePdfAttachment({ notice, attachment });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Navbar Header */}
      <Navbar
        role={role}
        setRole={setRole}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        bookmarkedCount={bookmarkedIds.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        resetToDefaultData={resetToDefaultData}
        urgentCount={urgentNotices.length}
      />

      {/* Main Layout Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex gap-6 px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Desktop Sidebar */}
        <Sidebar
          role={role}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          bookmarkedCount={bookmarkedIds.length}
        />

        {/* Dynamic Main Content View Area */}
        <main className="flex-1 min-w-0">
          
          {/* Saved / Bookmarked Tab */}
          {activeTab === 'saved' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
                <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
                  <Bookmark className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-indigo-950 dark:text-indigo-100">
                    Your Saved Bookmarks ({savedNotices.length})
                  </h2>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300">
                    Quick access to important circulars saved for offline reference.
                  </p>
                </div>
              </div>

              {savedNotices.length > 0 ? (
                <StudentFeed
                  notices={savedNotices}
                  urgentNotices={[]}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedYear={selectedYear}
                  setSelectedYear={setSelectedYear}
                  selectedBranch={selectedBranch}
                  setSelectedBranch={setSelectedBranch}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  bookmarkedIds={bookmarkedIds}
                  readIds={readIds}
                  acknowledgedIds={acknowledgedIds}
                  onToggleBookmark={toggleBookmark}
                  onSelectNotice={setSelectedNotice}
                  onOpenPdf={handleOpenPdf}
                  categoryCounts={categoryCounts}
                />
              ) : (
                <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    No bookmarked circulars yet
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Click the bookmark icon on any notice card to save it here for quick reference.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Admin Dashboard Tab */}
          {(activeTab === 'admin' || activeTab === 'analytics') && role === 'admin' && (
            <AdminDashboard
              notices={notices}
              onOpenCompose={() => setIsComposeOpen(true)}
              onSelectNotice={setSelectedNotice}
              onDeleteNotice={deleteNotice}
              onTogglePin={togglePin}
            />
          )}

          {/* Student Attendance Roster Tab */}
          {activeTab === 'attendance' && (
            <StudentAttendanceRoster
              onBackToFeed={() => setActiveTab('feed')}
              onOpenNotice={() => {
                setSelectedCategory('Attendance');
                setActiveTab('feed');
              }}
            />
          )}

          {/* Home Feed & Search Tab */}
          {(activeTab === 'feed' || activeTab === 'search') && (
            <StudentFeed
              notices={notices}
              urgentNotices={urgentNotices}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              bookmarkedIds={bookmarkedIds}
              readIds={readIds}
              acknowledgedIds={acknowledgedIds}
              onToggleBookmark={toggleBookmark}
              onSelectNotice={setSelectedNotice}
              onOpenPdf={handleOpenPdf}
              categoryCounts={categoryCounts}
              onNavigateToAttendance={() => setActiveTab('attendance')}
            />
          )}

        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomBar
        role={role}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkedCount={bookmarkedIds.length}
      />

      {/* Notice Detail Modal */}
      <NoticeDetailModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
        isBookmarked={selectedNotice ? bookmarkedIds.includes(selectedNotice.id) : false}
        isAcknowledged={selectedNotice ? acknowledgedIds.includes(selectedNotice.id) : false}
        onToggleBookmark={toggleBookmark}
        onAcknowledge={acknowledgeNotice}
        onMarkAsRead={markAsRead}
        onOpenPdf={handleOpenPdf}
        onNavigateToAttendance={() => setActiveTab('attendance')}
      />

      {/* Compose Notice Modal */}
      <ComposeNoticeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onPublish={addNotice}
      />

      {/* PDF Attachment Viewer Modal */}
      {activePdfAttachment && (
        <PdfViewerModal
          notice={activePdfAttachment.notice}
          attachment={activePdfAttachment.attachment}
          onClose={() => setActivePdfAttachment(null)}
        />
      )}

    </div>
  );
}
export default App;
