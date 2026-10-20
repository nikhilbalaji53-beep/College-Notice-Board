import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  Printer, 
  Download, 
  Building2, 
  Calendar, 
  FileText, 
  Eye, 
  Check, 
  Award,
  Users,
  ShieldCheck
} from 'lucide-react';
import { Notice } from '../types';

interface NoticeDetailModalProps {
  notice: Notice | null;
  onClose: () => void;
  isBookmarked: boolean;
  isAcknowledged: boolean;
  onToggleBookmark: (id: string) => void;
  onAcknowledge: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onOpenPdf: (notice: Notice, attachment: any) => void;
  onNavigateToAttendance?: () => void;
}

export const NoticeDetailModal: React.FC<NoticeDetailModalProps> = ({
  notice,
  onClose,
  isBookmarked,
  isAcknowledged,
  onToggleBookmark,
  onAcknowledge,
  onMarkAsRead,
  onOpenPdf,
  onNavigateToAttendance,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (notice) {
      onMarkAsRead(notice.id);
    }
  }, [notice]);

  if (!notice) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {notice.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {notice.refNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(notice.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950 dark:border-indigo-800 dark:text-indigo-300' 
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Share Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:block"
              title="Print Circular"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Institutional Header & Seal */}
          <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 mb-1">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              NATIONAL INSTITUTE OF TECHNOLOGY
            </h2>
            <h1 className="text-sm font-bold uppercase text-slate-800 dark:text-slate-200">
              {notice.department}
            </h1>
            <p className="text-[11px] font-mono text-slate-400">
              {notice.refNumber} • Published: {new Date(notice.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Title Banner */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {notice.priority === 'Urgent' && (
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                  URGENT BROADCAST
                </span>
              )}
              {notice.priority === 'High' && (
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  HIGH PRIORITY
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {notice.title}
            </h2>
          </div>

          {/* Audience Bar */}
          <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
              <Users className="w-4 h-4 text-indigo-500" />
              <span>Target Audience:</span>
            </div>
            <div>
              Years: <span className="font-medium text-slate-900 dark:text-white">{notice.targetYears.join(', ')}</span> | 
              Branches: <span className="font-medium text-slate-900 dark:text-white">{notice.targetBranches.join(', ')}</span>
            </div>
          </div>

          {/* Main Formatted Notice Content */}
          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line font-sans">
            {notice.content}
          </div>

          {/* Official Signatory Authority Stamp */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <div className="text-right space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" /> Verified Digital Issuer Signature
              </div>
              <p className="font-bold text-sm text-slate-900 dark:text-white">
                {notice.issuerAuthority}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {notice.issuerDesignation}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                Digitally Sealed via CampusPulse System
              </p>
            </div>
          </div>

          {/* Attachments Section */}
          {notice.attachments && notice.attachments.length > 0 && (
            <div className="pt-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Official Circular Attachments ({notice.attachments.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {notice.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 rounded-lg bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                          {att.name}
                        </p>
                        <p className="text-[10px] text-slate-400">PDF Document • {att.size}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenPdf(notice, att)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom CTA Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <span>Student Acknowledgments: </span>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {notice.acknowledgmentCount} students
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            {notice.category === 'Attendance' && onNavigateToAttendance && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToAttendance();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20 transition-all active:scale-95"
              >
                <span>View 55-Student Roster</span>
              </button>
            )}

            <button
              onClick={() => onAcknowledge(notice.id)}
              disabled={isAcknowledged}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                isAcknowledged
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-95'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAcknowledged ? 'Acknowledged & Marked as Read' : 'Acknowledge Circular'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
