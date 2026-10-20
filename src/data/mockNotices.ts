import { Notice } from '../types';

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'notice-1',
    refNumber: 'REF: NIT/EXAM/2026/089',
    title: 'Urgent: Autumn Semester 2026 Final Examination Schedule & Protocol',
    summary: 'The Controller of Examinations has published the final timetable for B.Tech Autumn 2026 semester exams. Strict compliance with admit card guidelines is mandated.',
    content: `### OFFICE OF THE CONTROLLER OF EXAMINATIONS
**NATIONAL INSTITUTE OF TECHNOLOGY**

**Circular Ref:** REF/NIT/EXAM/2026/089  
**Date:** September 24, 2026

All undergraduate and postgraduate students are hereby notified that the **Autumn Semester End-Term Examinations** will commence from **October 12, 2026**.

#### Key Directives & Examination Rules:
1. **Admit Card Mandatory:** Hall tickets will be issued via the Student Portal effective October 01, 2026. No student will be admitted without a printed hall ticket and valid Institute ID card.
2. **Reporting Time:** Students must report to the allocated examination hall at least **25 minutes prior** to the scheduled commencement.
3. **Electronic Gadgets Prohibited:** Mobile phones, smartwatches, programmable calculators, and Bluetooth devices are strictly prohibited inside the examination halls.
4. **Attendance Clearance:** Minimum 75% attendance criteria applies strictly. Students with condonation requests must submit documents to their respective HODs by September 28.

#### Examination Timetable Highlights:
- **3rd & 4th Year (All Branches):** Morning Slot (09:30 AM – 12:30 PM)
- **1st & 2nd Year (All Branches):** Afternoon Slot (02:00 PM – 05:00 PM)

*Detailed venue allocation seating charts will be published 48 hours prior on department notice boards.*`,
    category: 'Examination',
    department: 'Controller of Examinations',
    issuerAuthority: 'Prof. Dr. R. K. Varma',
    issuerDesignation: 'Controller of Examinations',
    priority: 'Urgent',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(), // 2 hours ago
    expiryDate: new Date(Date.now() + 20 * 86400 * 1000).toISOString(),
    targetYears: ['All Years'],
    targetBranches: ['All Branches'],
    attachments: [
      {
        id: 'att-1',
        name: 'Autumn_2026_Exam_Timetable_Final.pdf',
        type: 'pdf',
        size: '2.4 MB'
      },
      {
        id: 'att-2',
        name: 'Exam_Hall_Seating_Protocol.pdf',
        type: 'pdf',
        size: '1.1 MB'
      }
    ],
    isPinned: true,
    readCount: 1420,
    acknowledgmentCount: 980,
    status: 'active'
  },
  {
    id: 'notice-2',
    refNumber: 'REF: T&P/DRIVE/2026/042',
    title: 'Placement Drive 2026: Google & Microsoft On-Campus Registration Open',
    summary: 'Training & Placement Cell invites applications for Software Development Engineer (SDE) roles from final year B.Tech (CSE, ECE, AI/DS) students.',
    content: `### TRAINING & PLACEMENT CELL
**CAMPUS RECRUITMENT NOTICE 2026-27**

**Ref:** T&P/DRIVE/2026/042  
**Eligible Batches:** 2027 Graduating Class (4th Year B.Tech CSE, ECE, AI/DS)

We are pleased to announce the upcoming on-campus recruitment drives by **Google Cloud India** and **Microsoft Development Center**.

#### Position & Compensation Details:
- **Google Cloud:** Software Engineer (L3) | CTC: 32 LPA + Equity Options
- **Microsoft:** SDE-1 (Full Time) | CTC: 28.5 LPA + Performance Bonus

#### Selection Process:
1. **Online Coding Assessment:** October 04, 2026 (06:00 PM – 08:00 PM) at Central Computer Lab.
2. **Technical Interviews (3 Rounds):** October 07 - October 08, 2026.
3. **HR & Cultural Fit Round:** October 09, 2026.

#### Eligibility Criteria:
- CGPA: 7.50 and above (No active backlogs)
- Resume must be formatted as per T&P Standard Template v3.2.

**Registration Deadline:** September 30, 2026 by 11:59 PM sharp via the Placement Portal.`,
    category: 'Placement',
    department: 'Training & Placement Cell',
    issuerAuthority: 'Dr. Meenakshi Sundaram',
    issuerDesignation: 'Head, Training & Placement Cell',
    priority: 'High',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(), // 14 hours ago
    expiryDate: new Date(Date.now() + 10 * 86400 * 1000).toISOString(),
    targetYears: ['4th Year'],
    targetBranches: ['CSE', 'ECE', 'AI/DS'],
    attachments: [
      {
        id: 'att-3',
        name: 'Google_Microsoft_Job_Description_2026.pdf',
        type: 'pdf',
        size: '3.8 MB'
      },
      {
        id: 'att-4',
        name: 'T&P_Resume_Format_2026.doc',
        type: 'doc',
        size: '450 KB'
      }
    ],
    isPinned: true,
    readCount: 890,
    acknowledgmentCount: 640,
    status: 'active'
  },
  {
    id: 'notice-3',
    refNumber: 'REF: ADMIN/EMERGENCY/2026/012',
    title: 'Emergency Circular: Severe Weather Warning & Temporary Campus Lockdown',
    summary: 'In view of heavy rainfall alert issued by IMD, all offline classes and lab sessions stand suspended for September 26, 2026. Online classes will resume.',
    content: `### OFFICE OF THE REGISTRAR
**EMERGENCY CAMPUS BROADCAST**

**Ref:** ADMIN/EMERGENCY/2026/012  
**Urgency:** High Priority Instant Broadcast

As per the severe weather warning and heavy precipitation alert issued by the State Meteorological Department for the next 24 hours:

1. **Classes Suspended:** All undergraduate and postgraduate in-person classes, laboratory practicals, and outdoor sports activities scheduled for **Friday, September 26, 2026** are hereby suspended.
2. **Online Mode:** Faculty members are requested to conduct lectures online via Microsoft Teams as per the regular timetable.
3. **Essential Services:** Campus Health Center, Hostels, Central Mess, and Security Services will remain operational 24x7.
4. **Emergency Helpline:** Campus Emergency Security Helpline: **+91 98765-43210** / Ext: 4444.

Students residing in hostels are advised to stay indoors and avoid unnecessary travel outside campus premises.`,
    category: 'Emergency',
    department: 'Office of the Registrar',
    issuerAuthority: 'Col. S. P. Sharma (Retd.)',
    issuerDesignation: 'Registrar & Chief Security Officer',
    priority: 'Urgent',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 2 * 86400 * 1000).toISOString(),
    targetYears: ['All Years'],
    targetBranches: ['All Branches'],
    attachments: [],
    isPinned: true,
    readCount: 2450,
    acknowledgmentCount: 1890,
    status: 'active'
  },
  {
    id: 'notice-4',
    refNumber: 'REF: FIN/FEES/2026/055',
    title: 'Extension of Autumn Semester Fee Payment Deadline & Late Fine Waiver',
    summary: 'The Finance Committee has extended the semester fee payment deadline to October 10, 2026 without late fee charges for all registered students.',
    content: `### FINANCE & ACCOUNTS DEPARTMENT
**OFFICIAL CIRCULAR**

**Ref:** FIN/FEES/2026/055  
**Date:** September 22, 2026

Considering representations received from the Student Council regarding banking server downtime during the previous week, the Competent Authority has approved the extension of semester fee payment.

#### Extended Schedule:
- **Last Date without Late Fee:** **October 10, 2026**
- **Last Date with ₹1,000 Late Fee:** October 18, 2026
- **Registration Freeze Date:** October 20, 2026

#### Payment Modes Accepted:
- Online SBI Collect Portal (Net Banking / UPI / Credit Card)
- Demand Draft in favor of "Director, National Institute of Technology" payable at Campus Branch.

*Note: Receipts generated online must be saved and submitted to the Academic Section for semester hall ticket issuance.*`,
    category: 'Fees',
    department: 'Finance & Accounts',
    issuerAuthority: 'Shri V. K. Nambiar',
    issuerDesignation: 'Finance Officer',
    priority: 'Normal',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 15 * 86400 * 1000).toISOString(),
    targetYears: ['All Years'],
    targetBranches: ['All Branches'],
    attachments: [
      {
        id: 'att-5',
        name: 'Fee_Structure_Autumn_2026.pdf',
        type: 'pdf',
        size: '1.8 MB'
      }
    ],
    readCount: 1120,
    acknowledgmentCount: 510,
    status: 'active'
  },
  {
    id: 'notice-5',
    refNumber: 'REF: CSE/DEPT/2026/102',
    title: 'CSE Dept: 7th Semester B.Tech Minor Project Phase-I Defense Schedule',
    summary: 'Department of Computer Science & Engineering announces project presentation panels and schedule for 4th year students on October 05-06, 2026.',
    content: `### DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
**ACADEMIC NOTICE**

**Ref:** CSE/DEPT/2026/102  
**Target:** 4th Year B.Tech CSE (Batches A1 to A4 & B1 to B4)

The Phase-I Major/Minor Project Evaluation and Defense for 7th Semester CSE students will take place as per the following schedule in **Software Engineering Lab 2 & 3**.

#### Evaluation Requirements:
1. **PPT Presentation:** Max 12 slides covering Problem Statement, System Architecture, Tech Stack, Live Prototype Demo, and Gantt Chart.
2. **Hard Copy Report:** 1 spiral-bound interim report signed by the faculty project supervisor.
3. **Working Demo:** Code repository link (GitHub/GitLab) must be pushed by October 03, 11:59 PM.

#### Panel Allocation:
- **Panel 1 (AI & Machine Learning):** Prof. Dr. S. Mukherjee & Prof. Ananya Roy (Lab 2)
- **Panel 2 (Cybersecurity & Systems):** Prof. K. V. Rao & Dr. T. Singh (Lab 3)

Attendance is mandatory for all team members. Failure to present will result in an 'Incomplete' grade.`,
    category: 'Department',
    department: 'Department of CSE',
    issuerAuthority: 'Prof. Dr. S. Mukherjee',
    issuerDesignation: 'Head of Department, CSE',
    priority: 'High',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 12 * 86400 * 1000).toISOString(),
    targetYears: ['4th Year'],
    targetBranches: ['CSE', 'AI/DS'],
    attachments: [
      {
        id: 'att-6',
        name: 'CSE_Project_Defense_Panels_Schedule.pdf',
        type: 'pdf',
        size: '980 KB'
      }
    ],
    readCount: 430,
    acknowledgmentCount: 310,
    status: 'active'
  },
  {
    id: 'notice-6',
    refNumber: 'REF: CLUB/HACK/2026/007',
    title: 'HackPulse 2026: 36-Hour National Hackathon Call for Registrations',
    summary: 'The Coding Society presents HackPulse 2026 with cash prizes worth ₹2.5 Lakhs. Open to all engineering branches and academic years.',
    content: `### THE CODING SOCIETY & INNOVATION CELL
**FLAGSHIP EVENT ANNOUNCEMENT**

**Ref:** CLUB/HACK/2026/007  
**Theme:** "Building Smart & Sustainable Campus Solutions"

Get ready for the biggest flagship event of the year! **HackPulse 2026** is a 36-hour hackathon bringing together over 500+ developers, designers, and innovators.

#### Prize Pool & Tracks:
- 🏆 **1st Prize:** ₹1,000,000 + Incubation Support
- 🥈 **2nd Prize:** ₹60,000 + Gadget Goodies
- 🥉 **3rd Prize:** ₹40,000
- 💡 **Best All-Girls Team Prize:** ₹25,000

#### Event Dates & Venue:
- **Dates:** October 18 - October 20, 2026
- **Venue:** Central Auditorium & Student Activity Center (SAC)
- **Free Food, Swag Bags, Energy Drinks & Mentorship included for all participants.**

*Register your team of 2-4 members at hackpulse2026.dev before October 08, 2026.*`,
    category: 'Clubs',
    department: 'Student Activity Center',
    issuerAuthority: 'Devendra Patel',
    issuerDesignation: 'Student Coordinator, Coding Society',
    priority: 'Normal',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 14 * 86400 * 1000).toISOString(),
    targetYears: ['All Years'],
    targetBranches: ['All Branches'],
    attachments: [
      {
        id: 'att-7',
        name: 'HackPulse_2026_Rulebook_and_Tracks.pdf',
        type: 'pdf',
        size: '4.2 MB'
      },
      {
        id: 'att-8',
        name: 'Poster_HackPulse2026.png',
        type: 'image',
        size: '1.5 MB'
      }
    ],
    readCount: 1680,
    acknowledgmentCount: 420,
    status: 'active'
  },
  {
    id: 'notice-7',
    refNumber: 'REF: HOSTEL/MESS/2026/019',
    title: 'Hostel Maintenance & Mess Timing Revisions for Winter Term',
    summary: 'Chief Warden issues updated mess operational hours, biometric gate access rules, and night pass requests procedure.',
    content: `### OFFICE OF THE CHIEF WARDEN
**HOSTEL & CAMPUS LIVING NOTICE**

**Ref:** HOSTEL/MESS/2026/019

All hostel residents (Hostel A, B, C, D and Girls Hostel 1 & 2) are requested to take note of the revised operational rules effective October 01, 2026:

#### Revised Mess Timings:
- **Breakfast:** 07:30 AM – 09:30 AM
- **Lunch:** 12:15 PM – 02:15 PM
- **Evening Snacks:** 05:00 PM – 06:30 PM
- **Dinner:** 07:30 PM – 09:45 PM

#### Security & Biometric Attendance:
1. Hostel entry gate curfew is fixed at **10:00 PM**. Late entries require prior permission from Warden via Hostels App.
2. Biometric punch at hostel entrance is compulsory during morning departure and night entry.`,
    category: 'General',
    department: 'Office of Chief Warden',
    issuerAuthority: 'Prof. G. S. Bhatia',
    issuerDesignation: 'Chief Warden',
    priority: 'Normal',
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 30 * 86400 * 1000).toISOString(),
    targetYears: ['All Years'],
    targetBranches: ['All Branches'],
    attachments: [],
    readCount: 950,
    acknowledgmentCount: 710,
    status: 'active'
  },
  {
    id: 'notice-attn-1',
    refNumber: 'REF: NIT/ACAD/ATTN/2026/031',
    title: 'Urgent: 5th Semester Consolidated Attendance Roster (55 Students) & Hall Ticket Clearance',
    summary: 'The Academic Section has published the official attendance figures for Section A (55 enrolled students). 9 students having attendance below 75% are placed on mandatory shortage alert.',
    content: `### OFFICE OF THE DEAN (ACADEMIC AFFAIRS)
**OFFICIAL ATTENDANCE NOTIFICATION & EXAM CLEARANCE**

**Circular Ref:** NIT/ACAD/ATTN/2026/031  
**Date:** October 18, 2026  
**Audience:** 3rd Year B.Tech (CSE Section A - 55 Enrolled Students)

As per Senate Academic Regulation Sec 4.2(a), all students must maintain a minimum of **75% attendance** in aggregate across lecture and practical sessions to be eligible for the upcoming End-Semester Examination.

#### Section Attendance Overview (55 Students):
- **Total Enrolled Students:** 55 Members
- **Overall Class Average:** 78.2%
- **Students Eligible (> 75%):** 46 Members (Cleared for Hall Tickets)
- **Students in Shortage Zone (65% - 74%):** 4 Members (Eligible for Condonation upon medical verification)
- **Critical Shortage (< 65%):** 5 Members (Immediate Parent-Teacher meeting required)

#### Action Plan for Shortage Students:
1. Students having attendance between 65% and 74.9% must submit their condonation petitions along with medical certificates signed by the Institute Medical Officer before **October 25, 2026**.
2. Students below 65% must report to the Departmental Disciplinary Committee room along with their local guardian.
3. Admit cards for students with attendance shortages will be placed on administrative hold until clearance.

*You can inspect individual student attendance percentages and class tallies directly via the live Attendance Roster in CampusPulse.*`,
    category: 'Attendance',
    department: 'Office of Dean (Academics)',
    issuerAuthority: 'Prof. Dr. Arvind Swaminathan',
    issuerDesignation: 'Dean of Academic Affairs',
    priority: 'Urgent',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 14 * 86400 * 1000).toISOString(),
    targetYears: ['3rd Year'],
    targetBranches: ['CSE', 'AI/DS'],
    attachments: [
      {
        id: 'att-attn-1',
        name: 'CSE_Sem5_SecA_Attendance_Roster_55Students.pdf',
        type: 'pdf',
        size: '1.4 MB'
      },
      {
        id: 'att-attn-2',
        name: 'Attendance_Condonation_Form_2026.pdf',
        type: 'pdf',
        size: '620 KB'
      }
    ],
    isPinned: true,
    readCount: 1840,
    acknowledgmentCount: 1250,
    status: 'active'
  },
  {
    id: 'notice-attn-2',
    refNumber: 'REF: NIT/ACAD/ATTN/2026/034',
    title: 'Department of Attendance & Student Records: Condonation Fee Waiver Policy',
    summary: 'Guidelines on condonation fee waivers for students participating in Inter-NIT Sports, Hackathons, and cultural delegations during the autumn term.',
    content: `### DEAN OF STUDENT AFFAIRS
**ATTENDANCE DUTY-LEAVE & CONDONATION DIRECTIVE**

**Circular Ref:** NIT/ACAD/ATTN/2026/034  
**Date:** October 15, 2026

Students who represented the Institute in authorized academic conferences, hackathons, Inter-NIT sports tournaments, and NCC/NSS camps may claim attendance credit (Duty Leave / OD):

1. **Submission Window:** October 16 – October 24, 2026.
2. **Required Documents:** Event participation certificate signed by the Faculty-in-Charge and travel clearance slips.
3. Maximum OD credit allowed: 10% of total instructional hours.

Once verified, revised attendance percentages will be reflected on the central notice board and student portal.`,
    category: 'Attendance',
    department: 'Dean of Student Affairs',
    issuerAuthority: 'Dr. Radheshyam Sharma',
    issuerDesignation: 'Dean of Student Affairs',
    priority: 'Normal',
    createdAt: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    expiryDate: new Date(Date.now() + 18 * 86400 * 1000).toISOString(),
    targetYears: ['All Years'],
    targetBranches: ['All Branches'],
    attachments: [
      {
        id: 'att-attn-3',
        name: 'Duty_Leave_Application_Form.pdf',
        type: 'pdf',
        size: '480 KB'
      }
    ],
    readCount: 670,
    acknowledgmentCount: 410,
    status: 'active'
  }
];

