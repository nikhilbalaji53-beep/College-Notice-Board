import React from 'react';
import { 
  Bookmark, 
  Paperclip, 
  Clock, 
  CheckCircle2, 
  Pin, 
  Building2, 
  FileText, 
  Image as ImageIcon,
  Share2,
  Users
} from 'lucide-react';
import { Notice } from '../types';

interface NoticeCardProps {
  notice: Notice;
  isBookmarked: boolean;
  isRead: boolean;
  isAcknowledged: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectNotice: (notice: Notice) => void;
  onOpenPdf: (notice: Notice, attachment: any) => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({
  notice,
  isBookmarked,
  isRead,
  isAcknowledged,
  onToggleBookmark,
  onSelectNotice,
  onOpenPdf,
}) => {
  // Format relative timestamp
  const getRelativeTime = (isoString: string) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Color mapping for departments/categories
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Examination':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Placement':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Emergency':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Fees':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Attendance':
        return 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800';
      case 'Clubs':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
      default:
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === 'Urgent') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200 dark:border-red-800 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> URGENT
        </span>
      );
    }
    if (priority === 'High') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          HIGH PRIORITY
        </span>
      );
    }
    return null;
  };

  return (
    <div className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md ${
      notice.isPinned 
        ? 'border-indigo-300 dark:border-indigo-800/80 ring-1 ring-indigo-500/20' 
        : 'border-slate-200/90 dark:border-slate-800'
    }`}>
      
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category / Department Badge */}
            <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${getCategoryStyles(notice.category)}`}>
              {notice.category}
            </span>

            {/* Priority Badge */}
            {getPriorityBadge(notice.priority)}

            {/* Pinned Pill */}
            {notice.isPinned && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                <Pin className="w-3 h-3 fill-indigo-600 dark:fill-indigo-400" /> Pinned
              </span>
            )}
          </div>

          {/* Action Icons: Bookmark & Read Status */}
          <div className="flex items-center gap-1">
            {isAcknowledged && (
              <span className="p-1 text-emerald-600 dark:text-emerald-400" title="Acknowledged by you">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(notice.id);
              }}
              className={`p-2 rounded-xl transition-all ${
                isBookmarked 
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Notice'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Circular Title */}
        <h3 
          onClick={() => onSelectNotice(notice)}
          className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug cursor-pointer group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 mb-2"
        >
          {notice.title}
        </h3>

        {/* 2-Line Preview Snippet */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {notice.summary}
        </p>

        {/* Target Audience Pill */}
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-500 dark:text-slate-400">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">
            Audience: {notice.targetYears.join(', ')} • {notice.targetBranches.join(', ')}
          </span>
        </div>
      </div>

      {/* Footer Area: Attachments, Timestamp & CTA */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Attachments Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {notice.attachments && notice.attachments.length > 0 ? (
            notice.attachments.map((att) => (
              <button
                key={att.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenPdf(notice, att);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/60 dark:hover:text-indigo-300 transition-colors"
              >
                {att.type === 'image' ? (
                  <ImageIcon className="w-3.5 h-3.5 text-rose-500" />
                ) : (
                  <FileText className="w-3.5 h-3.5 text-red-500" />
                )}
                <span className="truncate max-w-[120px]">{att.name}</span>
                <span className="text-[10px] text-slate-400">({att.size})</span>
              </button>
            ))
          ) : (
            <span className="text-xs text-slate-400 italic">No attachments</span>
          )}
        </div>

        {/* Time ago & Read CTA */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{getRelativeTime(notice.createdAt)}</span>
          </div>

          <button
            onClick={() => onSelectNotice(notice)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-indigo-600 group-hover:text-white transition-colors"
          >
            Open Circular
          </button>
        </div>

      </div>

    </div>
  );
};
