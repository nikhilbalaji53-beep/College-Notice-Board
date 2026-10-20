import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Eye, 
  FileText, 
  AlertTriangle, 
  Calendar, 
  Users, 
  Paperclip,
  Check,
  Building2,
  Sparkles
} from 'lucide-react';
import { Notice, Category, Priority, TargetYear, TargetBranch } from '../types';

interface ComposeNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (notice: Omit<Notice, 'id' | 'createdAt' | 'readCount' | 'acknowledgmentCount'>) => void;
}

export const ComposeNoticeModal: React.FC<ComposeNoticeModalProps> = ({
  isOpen,
  onClose,
  onPublish,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Category>('Examination');
  const [department, setDepartment] = useState('Controller of Examinations');
  const [issuerAuthority, setIssuerAuthority] = useState('Prof. Dr. R. K. Varma');
  const [issuerDesignation, setIssuerDesignation] = useState('Controller of Examinations');
  const [priority, setPriority] = useState<Priority>('Normal');
  const [expiryDays, setExpiryDays] = useState(14);
  const [isPinned, setIsPinned] = useState(false);

  const [selectedYears, setSelectedYears] = useState<TargetYear[]>(['All Years']);
  const [selectedBranches, setSelectedBranches] = useState<TargetBranch[]>(['All Branches']);
  const [attachments, setAttachments] = useState<{ id: string; name: string; type: 'pdf' | 'image' | 'doc'; size: string }[]>([]);

  const yearsOptions: TargetYear[] = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'All Years'];
  const branchesOptions: TargetBranch[] = ['CSE', 'ECE', 'ME', 'CE', 'EEE', 'AI/DS', 'All Branches'];

  const handleToggleYear = (y: TargetYear) => {
    if (y === 'All Years') {
      setSelectedYears(['All Years']);
      return;
    }
    const filtered = selectedYears.filter(item => item !== 'All Years');
    if (filtered.includes(y)) {
      const result = filtered.filter(item => item !== y);
      setSelectedYears(result.length === 0 ? ['All Years'] : result);
    } else {
      setSelectedYears([...filtered, y]);
    }
  };

  const handleToggleBranch = (b: TargetBranch) => {
    if (b === 'All Branches') {
      setSelectedBranches(['All Branches']);
      return;
    }
    const filtered = selectedBranches.filter(item => item !== 'All Branches');
    if (filtered.includes(b)) {
      const result = filtered.filter(item => item !== b);
      setSelectedBranches(result.length === 0 ? ['All Branches'] : result);
    } else {
      setSelectedBranches([...filtered, b]);
    }
  };

  const handleAddSampleAttachment = () => {
    const sampleNames = [
      'Official_Circular_Annexure.pdf',
      'Student_Guidelines_2026.pdf',
      'Schedule_TimeTable.pdf'
    ];
    const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const newAtt = {
      id: `att-${Date.now()}`,
      name: randomName,
      type: 'pdf' as const,
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`
    };
    setAttachments(prev => [...prev, newAtt]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and circular content.");
      return;
    }

    const refNumber = `REF: NIT/${category.toUpperCase().slice(0, 4)}/2026/${Math.floor(100 + Math.random() * 900)}`;

    onPublish({
      refNumber,
      title,
      summary: summary || title,
      content,
      category,
      department,
      issuerAuthority,
      issuerDesignation,
      priority,
      expiryDate: new Date(Date.now() + expiryDays * 86400 * 1000).toISOString(),
      targetYears: selectedYears,
      targetBranches: selectedBranches,
      attachments,
      isPinned,
      status: 'active',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Compose New College Circular
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Publish to central student notice board
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Form / Preview Tabs */}
            <div className="flex items-center p-1 bg-slate-200 dark:bg-slate-800 rounded-lg text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeTab === 'form' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                Edit Form
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 ${
                  activeTab === 'preview' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {activeTab === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
            
            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Circular Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End-Semester Examination Schedule & Guidelines"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="Attendance">Attendance</option>
                  <option value="Examination">Examination</option>
                  <option value="Placement">Placement</option>
                  <option value="Department">Department</option>
                  <option value="Fees">Fees</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Clubs">Clubs</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            {/* Department & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Issuing Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Priority Broadcast
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High Priority</option>
                  <option value="Urgent">Urgent / Emergency Alert</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Notice Validity (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(parseInt(e.target.value) || 14)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Target Audience Filters */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-500" /> Target Audience Filters
              </h4>

              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">
                  Academic Year:
                </label>
                <div className="flex flex-wrap gap-2">
                  {yearsOptions.map((y) => {
                    const isChecked = selectedYears.includes(y);
                    return (
                      <button
                        key={y}
                        type="button"
                        onClick={() => handleToggleYear(y)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                          isChecked
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                        }`}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">
                  Engineering Branch:
                </label>
                <div className="flex flex-wrap gap-2">
                  {branchesOptions.map((b) => {
                    const isChecked = selectedBranches.includes(b);
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => handleToggleBranch(b)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                          isChecked
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Preview Snippet / Summary */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Card Preview Summary (2 Lines)
              </label>
              <input
                type="text"
                placeholder="Short summary displayed on feed cards..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Full Content */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Full Circular Body Content *
              </label>
              <textarea
                required
                rows={6}
                placeholder="Write full formatted notice text, directives, instructions, contact details..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-sans"
              />
            </div>

            {/* Signatory Authority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Signing Official Name
                </label>
                <input
                  type="text"
                  value={issuerAuthority}
                  onChange={(e) => setIssuerAuthority(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Official Designation
                </label>
                <input
                  type="text"
                  value={issuerDesignation}
                  onChange={(e) => setIssuerDesignation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Attachments Uploader Simulation & Pin Checkbox */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddSampleAttachment}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Attach PDF Document</span>
                </button>
                {attachments.length > 0 && (
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    {attachments.length} attached
                  </span>
                )}
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Pin to top of Student Feed</span>
              </label>

            </div>

            {/* Form Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20"
              >
                <Send className="w-4 h-4" />
                <span>Publish Circular</span>
              </button>
            </div>

          </form>
        ) : (
          /* Live Circular Preview Tab */
          <div className="p-8 max-h-[78vh] overflow-y-auto space-y-6">
            <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                NATIONAL INSTITUTE OF TECHNOLOGY
              </h2>
              <h1 className="text-sm font-bold uppercase text-slate-800 dark:text-slate-200">
                {department || 'Office of the Dean'}
              </h1>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {title || 'Untitled Circular'}
              </h2>
              <p className="text-xs text-slate-500">Target: {selectedYears.join(', ')} • {selectedBranches.join(', ')}</p>
            </div>

            <div className="prose dark:prose-invert max-w-none text-sm whitespace-pre-line">
              {content || 'No body content entered yet.'}
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-right">
              <p className="font-bold text-sm text-slate-900 dark:text-white">{issuerAuthority}</p>
              <p className="text-xs text-slate-500">{issuerDesignation}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
