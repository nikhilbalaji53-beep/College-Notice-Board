import React from 'react';
import { 
  Bell, 
  Search, 
  Moon, 
  Sun, 
  ShieldCheck, 
  GraduationCap, 
  Bookmark, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { ViewRole, ActiveTab } from '../types';

interface NavbarProps {
  role: ViewRole;
  setRole: (role: ViewRole) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  bookmarkedCount: number;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  resetToDefaultData: () => void;
  urgentCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  role,
  setRole,
  isDarkMode,
  toggleDarkMode,
  searchQuery,
  setSearchQuery,
  bookmarkedCount,
  activeTab,
  setActiveTab,
  resetToDefaultData,
  urgentCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('feed')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-indigo-800 text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
              {urgentCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-white dark:border-slate-900"></span>
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                  Campus<span className="text-indigo-600 dark:text-indigo-400">Pulse</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                  <Sparkles className="w-2.5 h-2.5 mr-0.5" /> PROTOTYPE
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                Digital College Circular & Notice Board
              </p>
            </div>
          </div>

          {/* Quick Search Input (Desktop) */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search circulars by keyword, ref no, or department..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'feed' && activeTab !== 'search') {
                    setActiveTab('feed');
                  }
                }}
                className="block w-full pl-9 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Actions & Role Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Bookmarks Counter Button */}
            <button
              onClick={() => setActiveTab('saved')}
              className={`relative p-2 rounded-xl transition-all ${
                activeTab === 'saved' 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="View Bookmarked Notices"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarkedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarkedCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setRole('student')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'student'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden sm:inline">Student</span>
              </button>

              <button
                onClick={() => setRole('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'admin'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Reset Data Button */}
            <button
              onClick={() => {
                if (window.confirm("Reset all notice board data to initial seed state?")) {
                  resetToDefaultData();
                }
              }}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors hidden lg:block"
              title="Reset Mock Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
