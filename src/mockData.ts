import { StudentProfile, AttendanceStats, ProgressStats, AssignmentStats, SessionHistory, ScheduleItem, AnnouncementItem, CourseModule } from './types';

export const INITIAL_MODULES: CourseModule[] = [
  {
    id: "mod-1",
    title: "HTML",
    hours: "24 Hrs",
    status: "Completed",
    topics: [
      { id: "mod-1-top-1", title: "Your First HTML Website | Basic structure of html", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", videoDuration: "14:22", completed: true },
      { id: "mod-1-top-2", title: "Heading, Paragraphs and Links | HTML", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", videoDuration: "10:15", completed: true },
      { id: "mod-1-top-3", title: "image, list and table in HTML", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", videoDuration: "18:40", completed: true },
      { id: "mod-1-top-4", title: "Structure of Forms in HTML", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", videoDuration: "15:10", completed: true },
      { id: "mod-1-top-5", title: "input tags in HTML", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", videoDuration: "12:05", completed: true },
      { id: "mod-1-top-6", title: "inline and block in HTML", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", videoDuration: "11:30", completed: true },
      { id: "mod-1-top-7", title: "id and class in HTML", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4", videoDuration: "09:45", completed: true },
      { id: "mod-1-top-8", title: "video ,audio and media in HTML", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", videoDuration: "22:15", completed: true },
      { id: "mod-1-top-9", title: "Semtertic tag HTML", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", videoDuration: "16:50", completed: true }
    ]
  },
  {
    id: "mod-2",
    title: "CSS",
    hours: "36 Hrs",
    status: "Active Progress",
    topics: [
      { id: "mod-2-top-1", title: "Introduction to CSS style sheets", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", videoDuration: "11:50", completed: true },
      { id: "mod-2-top-2", title: "CSS Selectors and rule priorities", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", videoDuration: "15:20", completed: true },
      { id: "mod-2-top-3", title: "The box-model layout parameters", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", videoDuration: "19:05", completed: true },
      { id: "mod-2-top-4", title: "Colors, borders and custom backgrounds", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", videoDuration: "14:14", completed: true },
      { id: "mod-2-top-5", title: "Typography styles, alignment, fonts", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", videoDuration: "13:40", completed: true },
      { id: "mod-2-top-6", title: "Flexbox setup: container and aligned items", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", videoDuration: "25:30", completed: true },
      { id: "mod-2-top-7", title: "Flexbox wrap, grow, and axis properties", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4", videoDuration: "18:22", completed: true },
      { id: "mod-2-top-8", title: "Grid systems: template columns and gaps", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", videoDuration: "21:10", completed: true },
      { id: "mod-2-top-9", title: "Media queries for responsive layouts", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", videoDuration: "17:45", completed: true },
      { id: "mod-2-top-10", title: "Standard mobile viewports layout rules", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", videoDuration: "12:30", completed: true },
      { id: "mod-2-top-11", title: "State variables and CSS customs theme variables", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", videoDuration: "16:05", completed: true },
      { id: "mod-2-top-12", title: "Transitions, keyframes, and micro hover styles", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", videoDuration: "14:50", completed: true },
      { id: "mod-2-top-13", title: "Utility styling workflow in Tailwind CSS v4", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", videoDuration: "28:15", completed: true }
    ]
  }
];

export const INITIAL_STUDENT: StudentProfile = {
  fullName: "Abhishek",
  gender: "Male",
  dateOfBirth: "2004-04-08",
  qualification: "Pursuing Graduation (Non-IT)",
  address: "kh no-18/19 Swaroop nagar delhi",
  regNo: "WD-0225-1310",
  password: "password123",
  phone: "9268570928",
  whatsapp: "9268570928",
  email: "Abhishekchaurasia5201@gmail.com",
  course: "Master Full Stack Web Design & Development with AI & AI Automation (MFSDDAI)",
  batch: "25fullstack0405",
  startDate: "2025-03-31",
  completionDate: "2026-05-15",
  addonValue: "no",
  parentName: "Rajkumar",
  parentContact: "9555299933",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwMpx09EzFj8-dTDnJ6lR0YN2lOkFkPO5ItrmmtOGsOSNHQDIQR_6rOdHtkLEJp5vRGJtZRDuTxn8pn9u6HPZs2iHPEGWiglfk8-baleBNEQZ5nSi6mnK7uRWelm1PATwHFVTlHxnbLwVIaotEIIIFJk3x7YmHQZY98UCy4Ww7tR4rBDk3tuO2TE8yQIhun4E0MXn7xS57yg2BbArmm8PveOphEe6P-slLMjD3MW8Vlbj7NhmezDeSwCMvKMWFQGimU65oivaRxBH6",
  modules: [...INITIAL_MODULES]
};

export const DEFAULT_ATTENDANCE: AttendanceStats = {
  present: 26,
  absent: 4,
  late: 0,
  online: 0,
  leave: 0,
  overallPercent: 87
};

export const DEFAULT_PROGRESS: ProgressStats = {
  completedClasses: 22,
  totalClasses: 22,
  overallPercent: 100
};

export const DEFAULT_ASSIGNMENTS: AssignmentStats = {
  submitted: 0,
  total: 5,
  overallPercent: 0
};

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ann-1",
    category: "CAMPUS NEWS",
    title: "Annual Tech Symposium 2026",
    subtitle: "Registration opens this Monday.",
    date: "2026-05-20",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN7D0OmpO0dKWpZAo0HzTDAhtAXBJcuaFWn7LOn1MORFEaZx8qUJHFfCLuK2iykTH1siAsH14i85NYDRsNkBgJII8zxujf1VJ7XItXJEE0BU00i08X4PmEOOq5y6JVNCejFNXxDYerz8mwTveGgq5SBE1QPl_SSWL9Hx-7JegmDjqOh0cMhidybrQEzR_xTWFIq6BwpR5en_KwYzHYBfrMBNDblnPu_nLxOCUjouAM-hrHv95y0wC4gqDVH-uJivcMvYZ-MFJ9QFxF"
  },
  {
    id: "ann-2",
    category: "PLACEMENT ALERT",
    title: "AI & Automation Internship Drive",
    subtitle: "Top tech partners hiring JavaScript / Full Stack developers.",
    date: "2026-05-22",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtW1jqdJ0BOsGYQCldXsqqo-92QWLEGX_Xl0Nfy3oeWRR5lCxuBGiiaaquL3hECiAHvnD0J1X-k6sDJoFSxtNekbHFkyttM-qiLCBBokeYOIGgFMY7fqfJ0PzxmP1UnHUoKbib4MYnyljRf-bGd6qOjEt-sju2ZrL4Da400pvtW8qykLqITbxW2Cc1mZGmWTvCghGzlUH9ZpmcCJXhO3vdrlgXsO2bLrgnwE6tGvt8y0FGx7_SduhQkBRvns2RLCP5Tc-49bodLFOR"
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: "sched-1",
    title: "Advanced Full Stack Practical",
    time: "09:00 AM - 10:30 AM",
    room: "Lab 302",
    instructor: "Dr. Vikram"
  },
  {
    id: "sched-2",
    title: "Applied AI Automation",
    time: "11:00 AM - 01:00 PM",
    room: "Lab B",
    instructor: "Prof. Gupta"
  },
  {
    id: "sched-3",
    title: "Machine Learning Seminar",
    time: "02:30 PM - 04:00 PM",
    room: "Main Hall",
    instructor: "Dr. Rahul Sharma"
  }
];

export const SESSIONS_LOG: SessionHistory[] = [
  { id: "s-1", date: "2026-05-20", topic: "React Hook Form & Validations", instructor: "Prof. Gupta", type: "Offline", status: "Present", time: "09:00 AM" },
  { id: "s-2", date: "2026-05-19", topic: "Building REST API in Express", instructor: "Prof. Gupta", type: "Offline", status: "Present", time: "09:00 AM" },
  { id: "s-3", date: "2026-05-18", topic: "AI Prompt Engineering with GenAI SDK", instructor: "Prof. Gupta", type: "Offline", status: "Present", time: "09:00 AM" },
  { id: "s-4", date: "2026-05-15", topic: "NextJS Routing and App Router", instructor: "Dr. Vikram", type: "Offline", status: "Absent", time: "11:00 AM" },
  { id: "s-5", date: "2026-05-14", topic: "Tailwind CSS v4 & Styling Layouts", instructor: "Dr. Vikram", type: "Offline", status: "Present", time: "11:00 AM" },
  { id: "s-6", date: "2026-05-13", topic: "Introduction to MongoDB and Mongoose", instructor: "Dr. Vikram", type: "Offline", status: "Present", time: "11:00 AM" },
  { id: "s-7", date: "2026-05-12", topic: "DOM Manipulation & Async JS", instructor: "Dr. Vikram", type: "Offline", status: "Absent", time: "11:00 AM" },
  { id: "s-8", date: "2026-05-11", topic: "HTML & CSS Best Practices", instructor: "Dr. Vikram", type: "Offline", status: "Absent", time: "11:00 AM" },
  { id: "s-9", date: "2026-05-10", topic: "Variables, Functions & Scopes", instructor: "Dr. Vikram", type: "Offline", status: "Present", time: "11:00 AM" }
];

export const ASSIGNMENTS_LIST = [
  { id: "asg-1", title: "Build React Portfolio using Tailwind", deadline: "2026-05-28", status: "Pending", course: "MFSDDAI" },
  { id: "asg-2", title: "Express Server Logger Middleware", deadline: "2026-05-25", status: "Pending", course: "MFSDDAI" },
  { id: "asg-3", title: "Gemini API Integration Script", deadline: "2026-05-18", status: "Submitted", score: "9/10", course: "MFSDDAI" },
  { id: "asg-4", title: "Responsive Flexbox Student Form Layout", deadline: "2026-05-10", status: "Submitted", score: "10/10", course: "MFSDDAI" },
  { id: "asg-5", title: "CSS Grid Bento Layout Challenge", deadline: "2026-05-02", status: "Submitted", score: "8/10", course: "MFSDDAI" }
];
