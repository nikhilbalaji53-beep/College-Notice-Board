import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  CheckCircle2, 
  AlertOctagon, 
  Plus, 
  Trash2, 
  Pin, 
  Search, 
  Filter,
  BarChart3,
  TrendingUp,
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Notice, Priority } from '../types';

interface AdminDashboardProps {
  notices: Notice[];
  onOpenCompose: () => void;
  onSelectNotice: (notice: Notice) => void;
  onDeleteNotice: (id: string) => void;
  onTogglePin: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  notices,
  onOpenCompose,
  onSelectNotice,
  onDeleteNotice,
  onTogglePin,
}) => {
  const [filterText, setFilterText] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Metric Computations
  const totalNotices = notices.length;
  const urgentNoticesCount = notices.filter(n => n.priority === 'Urgent').length;
  const totalReads = notices.reduce((acc, n) => acc + n.readCount, 0);
  const totalAcks = notices.reduce((acc, n) => acc + n.acknowledgmentCount, 0);
  const pinnedCount = notices.filter(n => n.isPinned).length;

  const filteredNotices = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(filterText.toLowerCase()) || 
                          n.refNumber.toLowerCase().includes(filterText.toLowerCase()) ||
                          n.department.toLowerCase().includes(filterText.toLowerCase());
    const matchesCategory = selectedCategoryFilter === 'All' || n.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Faculty & Admin Portal</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Notice Board Control Center</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Compose, manage, and broadcast official academic circulars, emergency announcements, and track student acknowledgment metrics.
          </p>
        </div>

        <button
          onClick={onOpenCompose}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Compose New Circular</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Active Circulars */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Circulars</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalNotices}</h3>
            <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
              {pinnedCount} pinned to top
            </p>
          </div>
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2: Total Reads */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Student Reads</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalReads.toLocaleString()}</h3>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +18.4% this week
            </p>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: Acknowledgments */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Student Acknowledgments</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalAcks.toLocaleString()}</h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Avg {totalNotices > 0 ? Math.round(totalAcks / totalNotices) : 0} per circular
            </p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4: Urgent Broadcasts */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Urgent Broadcasts</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{urgentNoticesCount}</h3>
            <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
              Active alert banners
            </p>
          </div>
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
            <AlertOctagon className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Notice Management Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        
        {/* Table Controls Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Circular Repository
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {filteredNotices.length} items
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Search filter input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Filter circulars..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category Dropdown Filter */}
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Attendance">Attendance</option>
              <option value="Examination">Examination</option>
              <option value="Placement">Placement</option>
              <option value="Department">Department</option>
              <option value="Fees">Fees</option>
              <option value="Emergency">Emergency</option>
              <option value="Clubs">Clubs</option>
            </select>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Reference / Category</th>
                <th className="px-4 py-3">Circular Title</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3 text-center">Reads</th>
                <th className="px-4 py-3 text-center">Acks</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
              {filteredNotices.map((n) => (
                <tr key={n.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  
                  {/* Ref & Category */}
                  <td className="px-4 py-3 space-y-1">
                    <span className="font-mono text-[11px] font-bold text-slate-900 dark:text-white block">
                      {n.refNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {n.category}
                    </span>
                  </td>

                  {/* Title */}
                  <td className="px-4 py-3">
                    <div 
                      onClick={() => onSelectNotice(n)}
                      className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer max-w-sm line-clamp-1"
                    >
                      {n.title}
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{n.department}</p>
                  </td>

                  {/* Priority */}
                  <td className="px-4 py-3">
                    {n.priority === 'Urgent' ? (
                      <span className="px-2 py-0.5 rounded font-extrabold text-[10px] bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                        URGENT
                      </span>
                    ) : n.priority === 'High' ? (
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        HIGH
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        NORMAL
                      </span>
                    )}
                  </td>

                  {/* Reads */}
                  <td className="px-4 py-3 text-center font-bold text-slate-900 dark:text-white">
                    {n.readCount}
                  </td>

                  {/* Acknowledgments */}
                  <td className="px-4 py-3 text-center font-bold text-emerald-600 dark:text-emerald-400">
                    {n.acknowledgmentCount}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onTogglePin(n.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          n.isPinned
                            ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950'
                            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title={n.isPinned ? "Unpin notice" : "Pin notice"}
                      >
                        <Pin className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onSelectNotice(n)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                        title="View Notice"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete circular "${n.title}"?`)) {
                            onDeleteNotice(n.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                        title="Delete Notice"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
