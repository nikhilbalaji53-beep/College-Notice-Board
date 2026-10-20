import React from 'react';
import { UrgentAlertBanner } from './UrgentAlertBanner';
import { FilterChips } from './FilterChips';
import { NoticeCard } from './NoticeCard';
import { Notice, Category, TargetYear, TargetBranch } from '../types';
import { Filter, Search, RotateCcw, Sparkles, Building, UserCheck, ChevronRight } from 'lucide-react';

interface StudentFeedProps {
  notices: Notice[];
  urgentNotices: Notice[];
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  selectedYear: string;
  setSelectedYear: (y: string) => void;
  selectedBranch: string;
  setSelectedBranch: (b: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkedIds: string[];
  readIds: string[];
  acknowledgedIds: string[];
  onToggleBookmark: (id: string) => void;
  onSelectNotice: (notice: Notice) => void;
  onOpenPdf: (notice: Notice, attachment: any) => void;
  categoryCounts: Record<string, number>;
  onNavigateToAttendance?: () => void;
}

export const StudentFeed: React.FC<StudentFeedProps> = ({
  notices,
  urgentNotices,
  selectedCategory,
  setSelectedCategory,
  selectedYear,
  setSelectedYear,
  selectedBranch,
  setSelectedBranch,
  searchQuery,
  setSearchQuery,
  bookmarkedIds,
  readIds,
  acknowledgedIds,
  onToggleBookmark,
  onSelectNotice,
  onOpenPdf,
  categoryCounts,
  onNavigateToAttendance,
}) => {
  const yearsOptions = ['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year'];
  const branchesOptions = ['All Branches', 'CSE', 'ECE', 'ME', 'CE', 'EEE', 'AI/DS'];

  // Filter Notices Logic
  const filteredNotices = notices.filter((notice) => {
    // Search query matching
    const queryLower = searchQuery.toLowerCase().trim();
    const matchesQuery = !queryLower || (
      notice.title.toLowerCase().includes(queryLower) ||
      notice.summary.toLowerCase().includes(queryLower) ||
      notice.content.toLowerCase().includes(queryLower) ||
      notice.refNumber.toLowerCase().includes(queryLower) ||
      notice.department.toLowerCase().includes(queryLower)
    );

    // Category matching
    const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;

    // Target Year matching
    const matchesYear = selectedYear === 'All Years' || 
      notice.targetYears.includes('All Years' as TargetYear) || 
      notice.targetYears.includes(selectedYear as TargetYear);

    // Target Branch matching
    const matchesBranch = selectedBranch === 'All Branches' || 
      notice.targetBranches.includes('All Branches' as TargetBranch) || 
      notice.targetBranches.includes(selectedBranch as TargetBranch);

    return matchesQuery && matchesCategory && matchesYear && matchesBranch;
  });

  const isFilterActive = selectedCategory !== 'All' || selectedYear !== 'All Years' || selectedBranch !== 'All Branches' || !!searchQuery;

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedYear('All Years');
    setSelectedBranch('All Branches');
    setSearchQuery('');
  };

  return (
    <div className="space-y-4 animate-fade-in pb-16 lg:pb-0">
      
      {/* 1. Urgent Broadcast Banner */}
      <UrgentAlertBanner 
        urgentNotices={urgentNotices} 
        onSelectNotice={onSelectNotice} 
      />

      {/* 2. Top Filter Controls Header */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        
        {/* Mobile Search Bar */}
        <div className="relative md:hidden">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search circulars by keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Audience Dropdown Selectors */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
              <Filter className="w-3.5 h-3.5 text-indigo-500" />
              <span>Filter Audience:</span>
            </div>

            {/* Year Dropdown */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500"
            >
              {yearsOptions.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            {/* Branch Dropdown */}
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500"
            >
              {branchesOptions.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters CTA */}
          {isFilterActive && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline self-end sm:self-center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Category Chips Carousel */}
        <FilterChips 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />

      </div>

      {/* Attendance Wing Interactive Banner */}
      {(selectedCategory === 'Attendance' || selectedCategory === 'All') && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 via-teal-100/40 to-emerald-50 dark:from-teal-950/40 dark:via-teal-900/20 dark:to-emerald-950/40 border border-teal-200 dark:border-teal-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-teal-600 text-white shrink-0 shadow-xs">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-teal-950 dark:text-teal-100">
                  Student Attendance Roster & Wing (55 Enrolled Members)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-teal-200/80 text-teal-900 dark:bg-teal-900/80 dark:text-teal-200">
                  CSE 5th Sem Sec-A
                </span>
              </div>
              <p className="text-xs text-teal-800 dark:text-teal-300 mt-1">
                Class Aggregate: <strong className="font-bold">78.2%</strong> • <span className="text-emerald-700 dark:text-emerald-300 font-semibold">46 Eligible (&ge;75%)</span> • <span className="text-rose-700 dark:text-rose-400 font-semibold">9 in Shortage Zone (&lt;75%)</span>
              </p>
            </div>
          </div>
          {onNavigateToAttendance && (
            <button
              onClick={onNavigateToAttendance}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 shrink-0 self-start sm:self-auto transition-transform active:scale-95"
            >
              <span>View 55 Members Roster</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* 3. Feed Summary Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            {selectedCategory === 'All' ? 'Campus Announcements' : `${selectedCategory} Circulars`}
          </h2>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {filteredNotices.length} notices
          </span>
        </div>
      </div>

      {/* 4. Notice Cards List / Grid */}
      {filteredNotices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              isBookmarked={bookmarkedIds.includes(notice.id)}
              isRead={readIds.includes(notice.id)}
              isAcknowledged={acknowledgedIds.includes(notice.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectNotice={onSelectNotice}
              onOpenPdf={onOpenPdf}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-1">
            <Building className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No circulars match your active filters
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, selecting "All Categories", or choosing "All Years" and "All Branches".
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
};
