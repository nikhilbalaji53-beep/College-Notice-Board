import React from 'react';
import { 
  Home, 
  Search, 
  Bookmark, 
  LayoutDashboard, 
  BarChart3, 
  Building2, 
  FileText, 
  Award, 
  CreditCard, 
  AlertTriangle,
  Users,
  Building,
  UserCheck
} from 'lucide-react';
import { ViewRole, ActiveTab, Category } from '../types';

interface SidebarProps {
  role: ViewRole;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  bookmarkedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  activeTab,
  setActiveTab,
  selectedCategory,
  setSelectedCategory,
  bookmarkedCount,
}) => {
  const mainNavItems = [
    { id: 'feed', label: 'Home Feed', icon: Home, show: true },
    { id: 'attendance', label: 'Attendance (55)', icon: UserCheck, badge: 55, show: true },
    { id: 'search', label: 'Explore & Search', icon: Search, show: true },
    { id: 'saved', label: 'Bookmarked', icon: Bookmark, badge: bookmarkedCount, show: true },
    { id: 'admin', label: 'Admin Dashboard', icon: LayoutDashboard, show: role === 'admin' },
    { id: 'analytics', label: 'Notice Analytics', icon: BarChart3, show: role === 'admin' },
  ];

  const categoriesList: { name: Category; icon: React.ElementType; color: string }[] = [
    { name: 'Attendance', icon: UserCheck, color: 'text-teal-500' },
    { name: 'Examination', icon: FileText, color: 'text-amber-500' },
    { name: 'Placement', icon: Award, color: 'text-emerald-500' },
    { name: 'Department', icon: Building2, color: 'text-blue-500' },
    { name: 'Fees', icon: CreditCard, color: 'text-purple-500' },
    { name: 'Emergency', icon: AlertTriangle, color: 'text-rose-500' },
    { name: 'Clubs', icon: Users, color: 'text-indigo-500' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 p-4 space-y-6">
      
      {/* Navigation Links */}
      <div>
        <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Navigation
        </h3>
        <nav className="space-y-1">
          {mainNavItems.filter(item => item.show).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                    isActive ? 'bg-indigo-800 text-white' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Departments & Category Fast Filter */}
      <div>
        <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Categories & Wings
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveTab('feed');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedCategory === 'All' && activeTab === 'feed'
                ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
            }`}
          >
            <Building className="w-4 h-4 text-slate-400" />
            <span>All Categories</span>
          </button>

          {categoriesList.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name && activeTab === 'feed';
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setActiveTab('feed');
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${cat.color}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Official Seal / Institutional Footer Info */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 mb-2">
          <Building2 className="w-5 h-5" />
        </div>
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          NIT Central Notice System
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
          Official Academic Broadcast Hub
        </p>
      </div>

    </aside>
  );
};
