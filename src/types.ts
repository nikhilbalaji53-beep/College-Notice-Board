export type Category = 
  | 'All'
  | 'Examination' 
  | 'Placement' 
  | 'Department' 
  | 'Attendance'
  | 'Clubs' 
  | 'Fees' 
  | 'Emergency' 
  | 'General';

export type Priority = 'Urgent' | 'High' | 'Normal';

export type TargetYear = '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'All Years';
export type TargetBranch = 'CSE' | 'ECE' | 'ME' | 'CE' | 'EEE' | 'AI/DS' | 'All Branches';

export interface Attachment {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc';
  size: string;
  url?: string;
  previewUrl?: string;
}

export interface Notice {
  id: string;
  refNumber: string;
  title: string;
  summary: string;
  content: string;
  category: Category;
  department: string;
  issuerAuthority: string;
  issuerDesignation: string;
  priority: Priority;
  createdAt: string; // ISO string
  expiryDate: string; // ISO string
  targetYears: TargetYear[];
  targetBranches: TargetBranch[];
  attachments: Attachment[];
  isPinned?: boolean;
  readCount: number;
  acknowledgmentCount: number;
  status: 'active' | 'scheduled' | 'expired' | 'draft';
}

export interface StudentAttendance {
  id: string;
  rollNo: string;
  name: string;
  branch: 'CSE' | 'ECE' | 'ME' | 'CE' | 'EEE' | 'AI/DS';
  semester: string;
  section: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  status: 'Critical' | 'Warning' | 'Good' | 'Excellent';
  mentor: string;
  email: string;
  lastUpdated: string;
}

export type ViewRole = 'student' | 'admin';

export type ActiveTab = 'feed' | 'search' | 'saved' | 'admin' | 'analytics' | 'attendance';
