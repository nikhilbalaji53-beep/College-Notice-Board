import React from 'react';
import { Home, Search, Bookmark, LayoutDashboard, UserCheck } from 'lucide-react';
import { ViewRole, ActiveTab } from '../types';

interface MobileBottomBarProps {
  role: ViewRole;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  bookmarkedCount: number;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  role,
  activeTab,
  setActiveTab,
  bookmarkedCount,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 lg:hidden py-1 px-3">
      <div className="flex items-center justify-around">
        
        {/* Feed */}
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${
            activeTab === 'feed'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1">Feed</span>
        </button>

        {/* Attendance (55) */}
        <button
          onClick={() => setActiveTab('attendance')}
          className={`relative flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${
            activeTab === 'attendance'
              ? 'text-teal-600 dark:text-teal-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <UserCheck className="w-5 h-5" />
          <span className="text-[10px] mt-1">Attendance</span>
          <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-teal-500"></span>
        </button>

        {/* Search */}
        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${
            activeTab === 'search'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] mt-1">Search</span>
        </button>

        {/* Saved */}
        <button
          onClick={() => setActiveTab('saved')}
          className={`relative flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${
            activeTab === 'saved'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Bookmark className="w-5 h-5" />
          {bookmarkedCount > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-indigo-600"></span>
          )}
          <span className="text-[10px] mt-1">Saved</span>
        </button>

        {/* Admin (Only if Admin Role) */}
        {role === 'admin' && (
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all ${
              activeTab === 'admin'
                ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] mt-1">Admin</span>
          </button>
        )}

      </div>
    </div>
  );
};
