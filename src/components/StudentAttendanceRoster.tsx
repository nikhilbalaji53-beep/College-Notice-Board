import React, { useState, useMemo } from 'react';
import { 
  UserCheck, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  AlertTriangle, 
  CheckCircle2, 
  AlertOctagon, 
  ArrowUpDown, 
  Mail, 
  Building2, 
  GraduationCap, 
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { StudentAttendance } from '../types';
import { MOCK_STUDENTS_ATTENDANCE, getAttendanceStats } from '../data/mockAttendance';

interface StudentAttendanceRosterProps {
  onBackToFeed?: () => void;
  onOpenNotice?: () => void;
}

export const StudentAttendanceRoster: React.FC<StudentAttendanceRosterProps> = ({
  onBackToFeed,
  onOpenNotice,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'All' | 'Critical' | 'Warning' | 'Eligible' | 'Excellent'>('All');
  const [sortBy, setSortBy] = useState<'percentage-asc' | 'percentage-desc' | 'rollNo' | 'name'>('percentage-asc');
  const [selectedStudent, setSelectedStudent] = useState<StudentAttendance | null>(null);
  const [alertSentId, setAlertSentId] = useState<string | null>(null);

  const stats = useMemo(() => getAttendanceStats(MOCK_STUDENTS_ATTENDANCE), []);

  // Filter & Sort
  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS_ATTENDANCE.filter((student) => {
      // Search
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        student.name.toLowerCase().includes(query) || 
        student.rollNo.toLowerCase().includes(query) ||
        student.mentor.toLowerCase().includes(query);

      // Status Filter
      let matchesStatus = true;
      if (selectedStatusFilter === 'Critical') {
        matchesStatus = student.percentage < 65;
      } else if (selectedStatusFilter === 'Warning') {
        matchesStatus = student.percentage >= 65 && student.percentage < 75;
      } else if (selectedStatusFilter === 'Eligible') {
        matchesStatus = student.percentage >= 75;
      } else if (selectedStatusFilter === 'Excellent') {
        matchesStatus = student.percentage >= 85;
      }

      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'percentage-asc') {
        return a.percentage - b.percentage;
      }
      if (sortBy === 'percentage-desc') {
        return b.percentage - a.percentage;
      }
      if (sortBy === 'rollNo') {
        return a.rollNo.localeCompare(b.rollNo);
      }
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedStatusFilter, sortBy]);

  // Export CSV
  const handleDownloadCsv = () => {
    const headers = ['Roll Number,Student Name,Branch,Semester,Section,Total Classes,Attended Classes,Attendance %,Status,Mentor,Email'];
    const rows = filteredStudents.map(s => 
      `"${s.rollNo}","${s.name}","${s.branch}","${s.semester}","${s.section}",${s.totalClasses},${s.attendedClasses},"${s.percentage}%","${s.status}","${s.mentor}","${s.email}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NIT_Attendance_Roster_55Students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendWarning = (student: StudentAttendance) => {
    setAlertSentId(student.id);
    setTimeout(() => {
      setAlertSentId(null);
    }, 3000);
  };

  const getStatusBadge = (percentage: number) => {
    if (percentage < 65) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-300 dark:border-red-800">
          <AlertOctagon className="w-3 h-3 text-red-600" />
          Critical (&lt;65%)
        </span>
      );
    }
    if (percentage < 75) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          Shortage (65-74%)
        </span>
      );
    }
    if (percentage >= 85) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Distinction (≥85%)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
        <CheckCircle2 className="w-3 h-3 text-blue-600" />
        Eligible (75-84%)
      </span>
    );
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage < 65) return 'bg-red-500';
    if (percentage < 75) return 'bg-amber-500';
    if (percentage >= 85) return 'bg-emerald-500';
    return 'bg-blue-500';
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 lg:pb-0">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-400/30">
                <UserCheck className="w-3 h-3" /> Official Attendance Wing
              </span>
              <span className="text-xs text-teal-200/80 font-mono">
                Academic Session Autumn 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Student Attendance Roster
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Consolidated attendance report for <strong className="text-white font-semibold">CSE 5th Semester Section A (55 Enrolled Members)</strong>. Minimum 75% attendance is required for examination hall ticket clearance.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenNotice && (
              <button
                onClick={onOpenNotice}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md transition-colors"
                title="View Official Circular"
              >
                <Info className="w-4 h-4 text-teal-300" />
                <span>Attendance Circular</span>
              </button>
            )}

            <button
              onClick={handleDownloadCsv}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-600/30 transition-transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV (55 Records)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total Enrolled */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Total Members</span>
            <GraduationCap className="w-4 h-4 text-teal-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {stats.total}
            </h3>
            <span className="text-xs text-slate-500 font-medium">Students</span>
          </div>
          <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold mt-1">
            CSE Sec-A Cohort (55 total)
          </p>
        </div>

        {/* Average Attendance */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Class Average</span>
            <UserCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {stats.averagePercentage}%
            </h3>
            <span className="text-xs text-slate-500 font-medium">Aggregate</span>
          </div>
          <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1">
            90 Total Class Sessions
          </p>
        </div>

        {/* Shortage Zone */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Shortage (&lt;75%)</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {stats.totalShortage}
            </h3>
            <span className="text-xs text-slate-500 font-medium">Students</span>
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
            {stats.critical} Critical + {stats.warning} Warning
          </p>
        </div>

        {/* Eligible for Exam */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Eligible (&ge;75%)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {stats.eligible}
            </h3>
            <span className="text-xs text-slate-500 font-medium">Students</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            {Math.round((stats.eligible / stats.total) * 100)}% Clearance Rate
          </p>
        </div>

      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search by Roll Number or Name */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search 55 members by name, roll no, or mentor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-teal-600" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="percentage-asc">Attendance % (Low to High - Shortage First)</option>
              <option value="percentage-desc">Attendance % (High to Low - Top Attendee)</option>
              <option value="rollNo">Roll Number (NIT2024CS001...)</option>
              <option value="name">Student Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => setSelectedStatusFilter('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedStatusFilter === 'All'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Members ({stats.total})
          </button>

          <button
            onClick={() => setSelectedStatusFilter('Critical')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedStatusFilter === 'Critical'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800 hover:bg-red-100'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            Critical &lt;65% ({stats.critical})
          </button>

          <button
            onClick={() => setSelectedStatusFilter('Warning')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedStatusFilter === 'Warning'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Shortage Zone 65-74% ({stats.warning})
          </button>

          <button
            onClick={() => setSelectedStatusFilter('Eligible')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedStatusFilter === 'Eligible'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Eligible &ge;75% ({stats.eligible})
          </button>

          <button
            onClick={() => setSelectedStatusFilter('Excellent')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedStatusFilter === 'Excellent'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Distinction &ge;85% ({stats.excellent})
          </button>
        </div>

      </div>

      {/* 4. Active Filter Summary */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500">
        <div>
          Showing <span className="font-bold text-slate-900 dark:text-white">{filteredStudents.length}</span> of {stats.total} registered student members
          {selectedStatusFilter !== 'All' && ` (${selectedStatusFilter} filter)`}
        </div>
        <div className="hidden sm:block">
          Minimum Threshold: <span className="font-bold text-teal-600">75% attendance</span> (68/90 sessions)
        </div>
      </div>

      {/* 5. Student Attendance Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Roll No & Student</th>
                <th className="px-4 py-3.5">Branch / Sec</th>
                <th className="px-4 py-3.5 text-center">Classes Attended</th>
                <th className="px-4 py-3.5 min-w-[180px]">Attendance % Progress</th>
                <th className="px-4 py-3.5 text-center">Eligibility Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredStudents.map((student) => {
                const isShortage = student.percentage < 75;
                const isAlertSent = alertSentId === student.id;

                return (
                  <tr 
                    key={student.id} 
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                      student.percentage < 65 
                        ? 'bg-red-50/30 dark:bg-red-950/10' 
                        : student.percentage < 75 
                        ? 'bg-amber-50/30 dark:bg-amber-950/10' 
                        : ''
                    }`}
                  >
                    
                    {/* Roll No & Student Details */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          student.percentage < 65
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                            : student.percentage < 75
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
                        }`}>
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white leading-tight">
                            {student.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[11px] text-slate-500 font-semibold">
                              {student.rollNo}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              • {student.mentor}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Branch & Section */}
                    <td className="px-4 py-3.5 font-medium">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {student.branch} Sec-{student.section}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{student.semester}</p>
                    </td>

                    {/* Attended / Total */}
                    <td className="px-4 py-3.5 text-center">
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {student.attendedClasses} <span className="text-xs font-normal text-slate-400">/ {student.totalClasses}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {student.totalClasses - student.attendedClasses} missed
                      </p>
                    </td>

                    {/* Visual Progress Bar & % */}
                    <td className="px-4 py-3.5">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-extrabold ${
                            student.percentage < 65 
                              ? 'text-red-600 dark:text-red-400' 
                              : student.percentage < 75 
                              ? 'text-amber-600 dark:text-amber-400' 
                              : student.percentage >= 85 
                              ? 'text-emerald-600 dark:text-emerald-400' 
                              : 'text-blue-600 dark:text-blue-400'
                          }`}>
                            {student.percentage}%
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {student.percentage >= 75 ? 'Above 75%' : `${(75 - student.percentage).toFixed(1)}% short`}
                          </span>
                        </div>

                        {/* Progress Bar Track */}
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden relative">
                          {/* 75% Target Marker */}
                          <div 
                            className="absolute top-0 bottom-0 w-0.5 bg-slate-400 dark:bg-slate-300 z-10" 
                            style={{ left: '75%' }} 
                            title="75% Requirement"
                          ></div>
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor(student.percentage)}`}
                            style={{ width: `${student.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Status Pill */}
                    <td className="px-4 py-3.5 text-center">
                      {getStatusBadge(student.percentage)}
                    </td>

                    {/* Action Buttons */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isShortage ? (
                          <button
                            onClick={() => handleSendWarning(student)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                              isAlertSent
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/60 dark:text-red-300'
                            }`}
                            title="Send Shortage SMS / Email Warning"
                          >
                            <Mail className="w-3 h-3" />
                            <span>{isAlertSent ? 'Alert Sent' : 'Warn'}</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 px-2 py-1">
                            Cleared
                          </span>
                        )}

                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="View Student Record"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Student Detail Drawer / Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div 
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                  {selectedStudent.rollNo}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedStudent.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedStudent.branch} • Section {selectedStudent.section} • {selectedStudent.semester}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                &times;
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">Attendance Percentage</span>
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {selectedStudent.percentage}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${getProgressBarColor(selectedStudent.percentage)}`}
                  style={{ width: `${selectedStudent.percentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 pt-1">
                <span>Classes Attended: <strong>{selectedStudent.attendedClasses}</strong> / {selectedStudent.totalClasses}</span>
                <span>Missed: <strong>{selectedStudent.totalClasses - selectedStudent.attendedClasses}</strong></span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Faculty Mentor:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudent.mentor}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Official Campus Email:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedStudent.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Hall Ticket Status:</span>
                <span className={`font-bold ${selectedStudent.percentage >= 75 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {selectedStudent.percentage >= 75 ? 'Cleared for Examination' : 'On Hold (Shortage Warning)'}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                Close
              </button>
              {selectedStudent.percentage < 75 && (
                <button
                  onClick={() => {
                    handleSendWarning(selectedStudent);
                    setSelectedStudent(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-700 shadow-sm"
                >
                  Dispatch Shortage Notice
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
