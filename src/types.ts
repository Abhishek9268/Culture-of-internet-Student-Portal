export interface CourseTopic {
  id: string;
  title: string;
  videoUrl?: string; // YouTube / MP4 URL
  videoDuration?: string; // e.g. "12:45"
  completed?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  hours: string;
  status: 'Completed' | 'Active Progress' | 'Pending';
  topics: CourseTopic[];
}

export interface StudentProfile {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  qualification: string;
  address: string;
  regNo: string;
  password?: string; // secure portal custom password
  phone: string;
  whatsapp: string;
  email: string;
  course: string;
  batch: string;
  startDate: string;
  completionDate: string;
  addonValue: string;
  parentName: string;
  parentContact: string;
  avatarUrl?: string;
  modules?: CourseModule[]; // assigned curriculum roadmap/progress
  attendance?: AttendanceStats;
  progress?: ProgressStats;
  assignments?: AssignmentStats;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  online: number;
  leave: number;
  overallPercent: number;
}

export interface ProgressStats {
  completedClasses: number;
  totalClasses: number;
  overallPercent: number;
}

export interface AssignmentStats {
  submitted: number;
  total: number;
  overallPercent: number;
}

export interface SessionHistory {
  id: string;
  date: string;
  topic: string;
  instructor: string;
  type: 'Offline' | 'Online';
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  time: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  room: string;
  instructor: string;
}

export interface AnnouncementItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  date: string;
  imgUrl: string;
}
