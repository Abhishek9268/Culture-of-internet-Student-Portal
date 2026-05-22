import React, { useState } from 'react';
import { 
  StudentProfile, AttendanceStats, ProgressStats, 
  AssignmentStats, SessionHistory 
} from './types';
import { 
  INITIAL_STUDENT, DEFAULT_ATTENDANCE, DEFAULT_PROGRESS, 
  DEFAULT_ASSIGNMENTS, SESSIONS_LOG, ASSIGNMENTS_LIST 
} from './mockData';

// import components
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import DashboardView from './components/DashboardView';
import ProfileView from './components/ProfileView';
import CourseView from './components/CourseView';
import TermsAndConditionsView from './components/TermsAndConditionsView';
import AdminDashboardView from './components/AdminDashboardView';
import CoiLogo from './components/CoiLogo';

import { 
  X, CheckSquare, Clock, Calendar, Bookmark, BarChart, 
  ExternalLink, Sparkles, AlertCircle, FileText, LayoutDashboard, 
  User, BookOpen, LogOut, Check, Send
} from 'lucide-react';

export default function App() {
  // Navigation Screens State: 'welcome' | 'login' | 'admin' | 'portal'
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login' | 'admin' | 'portal'>('welcome');
  
  // Portal Sub Tabs State: 'dashboard' | 'profile' | 'course' | 'terms'
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Master Student Directory List with default multiple student profiles pre-configured
  const [students, setStudents] = useState<StudentProfile[]>([
    {
      ...INITIAL_STUDENT,
      password: "password123",
      attendance: { ...DEFAULT_ATTENDANCE },
      progress: { ...DEFAULT_PROGRESS },
      assignments: { ...DEFAULT_ASSIGNMENTS },
    },
    {
      fullName: "Rahul Sharma",
      gender: "Male",
      dateOfBirth: "2004-05-12",
      qualification: "Pursuing Graduation (BCA)",
      address: "B-22 Sector 9 Dwarka, Delhi",
      regNo: "WD-0225-8888",
      password: "password123",
      phone: "9871234567",
      whatsapp: "9871234567",
      email: "rahul.sharma@example.com",
      course: "Master Full Stack Web Design & Development with AI & AI Automation (MFSDDAI)",
      batch: "25fullstack0405",
      startDate: "2025-04-01",
      completionDate: "2026-06-01",
      addonValue: "yes",
      parentName: "Sanjay Sharma",
      parentContact: "9812345678",
      avatarUrl: undefined,
      modules: [
        { 
          id: "mod-1", 
          title: "HTML", 
          hours: "24 Hrs", 
          status: "Completed", 
          topics: [
            { id: "mod-1-1", title: "Your First HTML Website | Basic structure of html", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", videoDuration: "14:22", completed: true },
            { id: "mod-1-2", title: "Heading, Paragraphs and Links | HTML", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", videoDuration: "10:15", completed: true }
          ] 
        },
        { 
          id: "mod-2", 
          title: "CSS", 
          hours: "36 Hrs", 
          status: "Active Progress", 
          topics: [
            { id: "mod-2-1", title: "Introduction to CSS style sheets", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", videoDuration: "11:50", completed: false }
          ] 
        }
      ],
      attendance: {
        present: 18,
        absent: 2,
        late: 1,
        online: 4,
        leave: 0,
        overallPercent: 90
      },
      progress: {
        completedClasses: 12,
        totalClasses: 30,
        overallPercent: 40
      },
      assignments: {
        submitted: 3,
        total: 5,
        overallPercent: 60
      }
    },
    {
      fullName: "Priya Patel",
      gender: "Female",
      dateOfBirth: "2005-11-20",
      qualification: "Senior Secondary (12th Passed)",
      address: "H.No 112 Gali 4 Swaroop Nagar, Delhi",
      regNo: "WD-0225-7777",
      password: "password123",
      phone: "9312345670",
      whatsapp: "9312345670",
      email: "priya.patel@example.com",
      course: "Master Full Stack Web Design & Development with AI & AI Automation (MFSDDAI)",
      batch: "25fullstack0405",
      startDate: "2025-04-10",
      completionDate: "2026-06-10",
      addonValue: "no",
      parentName: "Dinesh Patel",
      parentContact: "9312345679",
      avatarUrl: undefined,
      modules: [
        { 
          id: "mod-1", 
          title: "HTML", 
          hours: "24 Hrs", 
          status: "Active Progress", 
          topics: [
            { id: "mod-1-1", title: "Your First HTML Website | Basic structure of html", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", videoDuration: "14:22", completed: true }
          ] 
        }
      ],
      attendance: {
        present: 8,
        absent: 1,
        late: 0,
        online: 0,
        leave: 1,
        overallPercent: 80
      },
      progress: {
        completedClasses: 5,
        totalClasses: 25,
        overallPercent: 20
      },
      assignments: {
        submitted: 1,
        total: 5,
        overallPercent: 20
      }
    }
  ]);

  // Master Reactive Database state reflecting active logged-in student
  const [student, setStudent] = useState<StudentProfile>({
    ...INITIAL_STUDENT,
    password: "password123",
    attendance: { ...DEFAULT_ATTENDANCE },
    progress: { ...DEFAULT_PROGRESS },
    assignments: { ...DEFAULT_ASSIGNMENTS },
  });
  
  const [attendance, setAttendance] = useState<AttendanceStats>({ ...DEFAULT_ATTENDANCE });
  const [progress, setProgress] = useState<ProgressStats>({ ...DEFAULT_PROGRESS });
  const [assignments, setAssignments] = useState<AssignmentStats>({ ...DEFAULT_ASSIGNMENTS });
  const [loginMode, setLoginMode] = useState<'Offline' | 'Online'>('Offline');

  // Modal / Drawer overlays state
  const [sessionsModalOpen, setSessionsModalOpen] = useState(false);
  const [assignmentsModalOpen, setAssignmentsModalOpen] = useState(false);

  // Live editable sessions listing state
  const [sessions, setSessions] = useState<SessionHistory[]>([...SESSIONS_LOG]);
  const [assignmentsList, setAssignmentsList] = useState([...ASSIGNMENTS_LIST]);

  // Handle student login transition matching exact Reg No details
  const handleLoginSuccess = (regNo: string, mode: 'Offline' | 'Online') => {
    setLoginMode(mode);
    const matched = students.find(s => s.regNo.toUpperCase() === regNo.trim().toUpperCase());
    if (matched) {
      setStudent(matched);
      if (matched.attendance) setAttendance(matched.attendance);
      if (matched.progress) setProgress(matched.progress);
      if (matched.assignments) setAssignments(matched.assignments);
    }
    setCurrentScreen('portal');
    setActiveTab('dashboard');
  };

  // Helper inside Student Profile view to update details reactively
  const handleUpdateStudentProfile = (updatedProfile: StudentProfile) => {
    setStudent(updatedProfile);
    setStudents(prev => prev.map(s => s.regNo.toUpperCase() === updatedProfile.regNo.toUpperCase() ? updatedProfile : s));
  };

  const handleToggleTopicCompletion = (moduleId: string, topicId: string) => {
    if (!student.modules) return;
    const updatedModules = student.modules.map(m => {
      if (m.id === moduleId) {
        const updatedTopics = m.topics.map(t => {
          if (t.id === topicId) {
            return { ...t, completed: !t.completed };
          }
          return t;
        });

        // Check if all topics in this module are completed, and update module status
        const allDone = updatedTopics.every(t => t.completed);
        const noneDone = updatedTopics.every(t => !t.completed);
        let nextStatus: 'Completed' | 'Active Progress' | 'Pending' = 'Active Progress';
        if (allDone) nextStatus = 'Completed';
        else if (noneDone) nextStatus = 'Pending';

        return {
          ...m,
          topics: updatedTopics,
          status: nextStatus
        };
      }
      return m;
    });

    const updatedProfile = {
      ...student,
      modules: updatedModules
    };

    // Calculate dynamic course progress percent!
    const totalTopics = updatedModules.reduce((acc, current) => acc + (current.topics?.length || 0), 0);
    const completedTopics = updatedModules.reduce((acc, current) => acc + (current.topics?.filter(t => t.completed).length || 0), 0);
    const overallPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    if (updatedProfile.progress) {
      updatedProfile.progress = {
        ...updatedProfile.progress,
        completedClasses: completedTopics,
        totalClasses: totalTopics,
        overallPercent: overallPercent
      };
      setProgress(updatedProfile.progress);
    }

    handleUpdateStudentProfile(updatedProfile);
  };

  // Handle master Admin overrides save updating the dynamic list
  const handleAdminUpdateStudents = (updatedStudentsList: StudentProfile[]) => {
    setStudents(updatedStudentsList);
    // Sync current viewer if active
    const activeMatch = updatedStudentsList.find(s => s.regNo.toUpperCase() === student.regNo.toUpperCase());
    if (activeMatch) {
      setStudent(activeMatch);
      if (activeMatch.attendance) setAttendance(activeMatch.attendance);
      if (activeMatch.progress) setProgress(activeMatch.progress);
      if (activeMatch.assignments) setAssignments(activeMatch.assignments);
    }
  };

  // Interactive: Submit an assignment to instantly raise submission progress stats!
  const submitAssignment = (id: string) => {
    const updated = assignmentsList.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Submitted', score: 'Grading...' };
      }
      return item;
    });
    setAssignmentsList(updated);

    // Dynamic Recalculation
    const submittedCount = updated.filter(item => item.status === 'Submitted').length;
    const totalCount = updated.length;
    const percent = Math.round((submittedCount / totalCount) * 100);

    setAssignments({
      submitted: submittedCount,
      total: totalCount,
      overallPercent: percent
    });
  };

  // Interactive helper to switch session status dynamically
  const toggleSessionSelection = (id: string) => {
    const updated = sessions.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Present' ? 'Absent' : 'Present';
        return { ...item, status: nextStatus };
      }
      return item;
    });
    setSessions(updated);

    // Dynamic Attendance Re-calculation
    const presentCount = updated.filter(s => s.status === 'Present').length;
    const absentCount = updated.filter(s => s.status === 'Absent').length;
    const totalDays = updated.length;
    const percent = totalDays > 0 ? Math.round((presentCount / totalDays) * 100) : 0;

    setAttendance(prev => ({
      ...prev,
      present: presentCount,
      absent: absentCount,
      overallPercent: percent
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">
      
      {/* 1. Welcome Landing Screen */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen 
          onSelectStudent={() => setCurrentScreen('login')}
          onSelectAdmin={() => setCurrentScreen('admin')}
        />
      )}

      {/* 2. Login Screen Portal (Culture of Internet) */}
      {currentScreen === 'login' && (
        <LoginScreen 
          students={students}
          onLoginSuccess={handleLoginSuccess}
          onBack={() => setCurrentScreen('welcome')}
        />
      )}

      {/* 3. Administrative Override Control Center */}
      {currentScreen === 'admin' && (
        <AdminDashboardView 
          students={students}
          onUpdateStudents={handleAdminUpdateStudents}
          onBack={() => setCurrentScreen('welcome')}
        />
      )}

      {/* 4. Student Logged-in Portal Shell */}
      {currentScreen === 'portal' && (
        <div className="flex h-screen overflow-hidden">
          
          {/* ================= DESKTOP SIDEBAR ================= */}
          <aside className="hidden md:flex flex-col w-64 bg-[#0e1c2f] border-r border-[#193254] text-white shrink-0 justify-between">
            
            <div className="flex flex-col flex-grow">
              
              {/* Sidebar Header Title Crest */}
              <div className="p-6 border-b border-[#132844] flex items-center gap-3 select-none">
                <CoiLogo className="w-14 h-11" />
                <div>
                  <div className="font-display font-extrabold text-[11px] tracking-wider text-[#fed65b] leading-tight uppercase font-black">
                    Culture of
                  </div>
                  <div className="font-display font-black text-[12px] tracking-widest text-white leading-none uppercase mt-0.5">
                    Internet
                  </div>
                </div>
              </div>

              {/* Sidebar navigation list */}
              <div className="p-4">
                
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-3 mb-2 select-none">
                  Main menu
                </p>
                
                <nav className="space-y-1">
                  
                  {/* Dashboard trigger */}
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-150 border-l-4 ${
                      activeTab === 'dashboard' 
                        ? 'bg-[#fed65b]/10 text-[#fed65b] border-l-[#fed65b]' 
                        : 'text-slate-300 hover:text-white hover:bg-[#1a3455] border-l-transparent'
                    }`}
                  >
                    <LayoutDashboard className="w-5 h-5 shrink-0" />
                    <span>Dashboard</span>
                  </button>

                  {/* Profile trigger */}
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-150 border-l-4 ${
                      activeTab === 'profile' 
                        ? 'bg-[#fed65b]/10 text-[#fed65b] border-l-[#fed65b]' 
                        : 'text-slate-300 hover:text-white hover:bg-[#1a3455] border-l-transparent'
                    }`}
                  >
                    <User className="w-5 h-5 shrink-0" />
                    <span>My Profile</span>
                  </button>

                  {/* Course trigger */}
                  <button
                    onClick={() => setActiveTab('course')}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-150 border-l-4 ${
                      activeTab === 'course' 
                        ? 'bg-[#fed65b]/10 text-[#fed65b] border-l-[#fed65b]' 
                        : 'text-slate-300 hover:text-white hover:bg-[#1a3455] border-l-transparent'
                    }`}
                  >
                    <BookOpen className="w-5 h-5 shrink-0" />
                    <span>My Course</span>
                  </button>

                </nav>

              </div>

              {/* Legal group */}
              <div className="mt-4 p-4 border-t border-[#132844]">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-3 mb-2 select-none">
                  Legal
                </p>
                
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-150 border-l-4 ${
                    activeTab === 'terms' 
                      ? 'bg-[#fed65b]/10 text-[#fed65b] border-l-[#fed65b]' 
                      : 'text-slate-300 hover:text-white hover:bg-[#1a3455] border-l-transparent'
                  }`}
                >
                  <FileText className="w-5 h-5 shrink-0" />
                  <span>Terms & Conditions</span>
                </button>
              </div>

            </div>

            {/* Logout button */}
            <div className="p-4 border-t border-[#132844] mb-3">
              <button
                onClick={() => setCurrentScreen('welcome')}
                className="w-full flex items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-950/25 rounded-xl text-sm font-bold transition-all"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                <span>Logout</span>
              </button>
            </div>

          </aside>

          {/* ================= PORTAL COMPONENT ROUTER FOR ACTIVE VIEWS ================= */}
          <div className="flex-grow flex flex-col min-w-0 overflow-y-auto no-scrollbar pb-24 md:pb-0">

            {activeTab === 'dashboard' && (
              <DashboardView 
                student={student}
                attendance={attendance}
                progress={progress}
                assignments={assignments}
                loginMode={loginMode}
                onNavigate={(tab) => setActiveTab(tab)}
                onLogout={() => setCurrentScreen('welcome')}
                onShowSessions={() => setSessionsModalOpen(true)}
                onShowAssignments={() => setAssignmentsModalOpen(true)}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileView 
                student={student}
                loginMode={loginMode}
                onUpdateStudent={handleUpdateStudentProfile}
                onNavigate={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'course' && (
              <CourseView 
                modules={student.modules} 
                onToggleTopicCompletion={handleToggleTopicCompletion} 
              />
            )}

            {activeTab === 'terms' && (
              <TermsAndConditionsView />
            )}

          </div>

          {/* ================= MOBILE BOTTOM NAVIGATION BAR (Screenshots 5 & 6) ================= */}
          <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 bg-[#e5eeff] dark:bg-[#0e1c2f] z-30 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.06)] border-t border-slate-200/50 md:hidden select-none">
            
            {/* Nav option 1: Home (active if tab === dashboard) */}
            <button 
              onClick={() => {
                setActiveTab('dashboard');
                setSessionsModalOpen(false);
                setAssignmentsModalOpen(false);
              }}
              className={`flex flex-col items-center justify-center rounded-3xl px-4 py-1.5 transition-transform duration-200 active:scale-95 ${
                activeTab === 'dashboard' && !sessionsModalOpen && !assignmentsModalOpen
                  ? 'bg-[#fed65b] text-[#241a00] font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-tight mt-0.5">Home</span>
            </button>

            {/* Nav option 2: Schedule (directly triggers sessions listing modal) */}
            <button 
              onClick={() => {
                setActiveTab('dashboard');
                setSessionsModalOpen(true);
                setAssignmentsModalOpen(false);
              }}
              className={`flex flex-col items-center justify-center rounded-3xl px-4 py-1.5 transition-transform duration-200 active:scale-95 ${
                sessionsModalOpen 
                  ? 'bg-[#fed65b] text-[#241a00] font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-tight mt-0.5">Schedule</span>
            </button>

            {/* Nav option 3: Course (triggers Assignments overview/course tab) */}
            <button 
              onClick={() => {
                setActiveTab('course');
                setSessionsModalOpen(false);
                setAssignmentsModalOpen(false);
              }}
              className={`flex flex-col items-center justify-center rounded-3xl px-4 py-1.5 transition-transform duration-200 active:scale-95 ${
                activeTab === 'course' 
                  ? 'bg-[#fed65b] text-[#241a00] font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-tight mt-0.5">Course</span>
            </button>

            {/* Nav option 4: Profile (active if tab === profile) */}
            <button 
              onClick={() => {
                setActiveTab('profile');
                setSessionsModalOpen(false);
                setAssignmentsModalOpen(false);
              }}
              className={`flex flex-col items-center justify-center rounded-3xl px-4 py-1.5 transition-transform duration-200 active:scale-95 ${
                activeTab === 'profile' 
                  ? 'bg-[#fed65b] text-[#241a00] font-bold'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-tight mt-0.5">Profile</span>
            </button>

            {/* Nav option 5: Logout (direct screen transition) */}
            <button 
              onClick={() => {
                setCurrentScreen('welcome');
              }}
              className="flex flex-col items-center justify-center rounded-3xl px-4 py-1.5 transition-transform duration-200 active:scale-95 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-350"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-[10px] font-bold tracking-tight mt-0.5 text-rose-500">Logout</span>
            </button>

          </nav>

        </div>
      )}

      {/* ========================================================================================= */}
      {/* ================= INTERACTIVE OVERLAY MODAL: HISTORIC SESSIONS LOG (SCHEDULE) ================= */}
      {sessionsModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
          <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-slide-up">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#0e1c2f] text-white flex justify-between items-center select-none shrink-0 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-white text-base">Classroom Sessions Registry</h3>
                  <p className="text-[10px] text-slate-400 font-sans tracking-wide">Click items to toggle Present/Absent status in real-time!</p>
                </div>
              </div>
              
              <button 
                onClick={() => setSessionsModalOpen(false)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll List */}
            <div className="flex-grow p-6 overflow-y-auto space-y-4 no-scrollbar">
              
              {/* Alert note about live calculation updates */}
              <div className="bg-amber-500/5 border border-amber-200/50 p-4 rounded-xl flex items-start gap-2.5 text-xs text-slate-700 select-none">
                <Sparkles className="w-4.5 h-4.5 text-[#b89531] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Simulation Override Tip:</strong> Click on any session's status chip below. Toggling statuses automatically recalculates the global <strong>Attendance Stats</strong> (e.g. 87%) on the main dashboard instantly!
                </p>
              </div>

              <div className="space-y-3">
                {sessions.map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => toggleSessionSelection(s.id)}
                    className="flex justify-between items-center gap-4 bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl border border-slate-200/30 transition-all cursor-pointer group hover:border-slate-300"
                  >
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-slate-800 text-xs md:text-sm group-hover:text-amber-800 transition-colors">
                        {s.topic}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {s.date} • {s.time} • Instructor: {s.instructor}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-200/50 px-2 py-0.5 rounded uppercase font-bold">
                        {s.type}
                      </span>

                      <span className={`inline-flex items-center text-[11px] font-bold px-3 py-1 rounded-full ${
                        s.status === 'Present' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {s.status === 'Present' ? '✓ Present' : '✗ Absent'}
                      </span>

                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Modal persistent CTA */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0 select-none">
              <button 
                onClick={() => setSessionsModalOpen(false)}
                className="px-5 py-2.5 bg-[#0e1c2f] hover:bg-slate-850 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Close Logs View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* ================= INTERACTIVE OVERLAY MODAL: HOMEWORK / ASSIGNMENTS TRAY ================= */}
      {assignmentsModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in font-sans">
          <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-slide-up">
            
            {/* Modal Header */}
            <div className="p-6 bg-[#0e1c2f] text-white flex justify-between items-center select-none shrink-0 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-500 shrink-0">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-white text-base">Student Course Assignments</h3>
                  <p className="text-[10px] text-slate-400 font-sans tracking-wide">Manage, submit and verify grade logs instantly!</p>
                </div>
              </div>
              
              <button 
                onClick={() => setAssignmentsModalOpen(false)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll content area */}
            <div className="flex-grow p-6 overflow-y-auto space-y-4 no-scrollbar">
              
              {/* Info banner explaining interactivity of submission */}
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-start gap-2.5 text-xs text-slate-700 select-none">
                <Sparkles className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Submit Simulations:</strong> Click on <span className="font-bold text-emerald-700">Submit Now</span> on any pending homework below. Submitting homework will automatically compute and raise your <strong>Assignments Dial</strong> (currently {assignments.overallPercent}%) on the Dashboard!
                </p>
              </div>

              <div className="space-y-3">
                {assignmentsList.map(item => (
                  <div 
                    key={item.id} 
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/30"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#b89531] font-mono leading-none block mb-0.5">
                        {item.course} Assessment
                      </span>
                      <h4 className="font-display font-black text-slate-800 text-xs md:text-sm">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Deadline: {item.deadline}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                      
                      {item.status === 'Submitted' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-slate-500 font-mono bg-slate-200/50 px-2.5 py-1 rounded">
                            Grade: <strong className="text-slate-800">{item.score || 'Grading...'}</strong>
                          </span>
                          <span className="inline-flex items-center text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                            ✓ Submitted
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-medium">Pending Submission</span>
                          <button
                            onClick={() => submitAssignment(item.id)}
                            className="bg-[#fed65b] text-[#241a00] font-bold text-xs py-1.5 px-3 rounded-lg hover:bg-amber-400 transition-colors shadow-sm flex items-center gap-1 shrink-0"
                          >
                            <Send className="w-3 h-3" /> Submit Now
                          </button>
                        </div>
                      )}

                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Modal Action CTA */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0 select-none">
              <button 
                onClick={() => setAssignmentsModalOpen(false)}
                className="px-5 py-2.5 bg-[#0e1c2f] hover:bg-slate-850 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                Close Assignments View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
