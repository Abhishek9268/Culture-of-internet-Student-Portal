import React, { useState } from 'react';
import { StudentProfile, AttendanceStats, ProgressStats, AssignmentStats } from '../types';
import { 
  LayoutDashboard, User, BookOpen, FileText, LogOut, 
  Bell, HelpCircle, ExternalLink, RefreshCw, Calendar, 
  MapPin, Clock, Check, TrendingUp, ChevronRight
} from 'lucide-react';
import CoiLogo from './CoiLogo';

interface DashboardViewProps {
  student: StudentProfile;
  attendance: AttendanceStats;
  progress: ProgressStats;
  assignments: AssignmentStats;
  loginMode: 'Offline' | 'Online';
  onNavigate: (tab: string) => void;
  onLogout: () => void;
  // Extras to enrich user interactivity
  onShowSessions: () => void;
  onShowAssignments: () => void;
}

export default function DashboardView({
  student,
  attendance,
  progress,
  assignments,
  loginMode,
  onNavigate,
  onLogout,
  onShowSessions,
  onShowAssignments
}: DashboardViewProps) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to Merit Academy Student Portal", read: false },
    { id: 2, text: "Offline session stats for WD-0225-1310 compiled successfully", read: false },
    { id: 3, text: "Master Full Stack Web Design course guide available for download", read: true }
  ]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex-grow w-full flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      
      {/* ================= MAIN CONTENT SPACE ================= */}

        {/* ================= STICKY TOP APP BAR ================= */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-20 px-3 md:px-5 py-2 md:py-2.5 flex items-center justify-between shadow-sm select-none">
          
          <div className="flex items-center gap-2">
            <CoiLogo className="w-8 h-6" />
            <span className="text-[10px] font-bold tracking-widest text-[#b89531] font-display uppercase">COI</span>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="text-[11px] text-slate-500 font-medium font-sans">Overview</span>
          </div>

          {/* Interactive tools group */}
          <div className="flex items-center gap-3">
            
            {/* Status indicator badge (Online / Offline based on selection) */}
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold shadow-sm border border-slate-200/40">
              <span className={`w-1.5 h-1.5 rounded-full ${loginMode === 'Offline' ? 'bg-orange-600 animate-pulse' : 'bg-emerald-500'} shrink-0`} />
              {loginMode}
            </span>

            {/* Notification Bell trigger */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors bg-slate-100 rounded-full hover:bg-slate-200 relative"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 hover:bg-red-600 rounded-full text-[8px] font-extrabold text-white flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notification drop-down panel portal */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3.5 z-40 text-slate-800 animate-fade-in">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-bold text-xs">Notifications</span>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[10px] text-[#b89531] font-bold hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 mt-2 max-h-52 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`text-[11px] p-2 rounded-lg border ${n.read ? 'bg-slate-50/50 border-slate-100 text-slate-500' : 'bg-amber-500/5 border-amber-200 text-slate-800 font-medium'}`}>
                        {n.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Header User Avatar Block */}
            <div 
              onClick={() => onNavigate('profile')}
              className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden border border-amber-500/70 shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-transform shrink-0"
            >
              {student.avatarUrl ? (
                <img src={student.avatarUrl} alt={student.fullName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#0e1c2f] text-amber-400 font-black flex items-center justify-center text-xs uppercase">
                  {student.fullName.charAt(0)}
                </div>
              )}
            </div>

            {/* Quick Mobile-specific Logout Trigger in Top App Bar */}
            <button
              onClick={onLogout}
              className="md:hidden p-2 text-rose-650 bg-rose-50 border border-rose-100 hover:bg-rose-100 active:scale-95 hover:text-rose-700 transition-all rounded-full flex items-center justify-center shrink-0"
              title="Logout from Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </header>

        {/* ================= CENTRAL GRID & WORKSPACE COMPILATION ================= */}
        <main className="p-4 md:p-6 space-y-4 md:space-y-6">

          {/* ================= CORE PROFILE SUMMARY BANNER ================= */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* Dark Graphic Banner Box (lg:col-span-9) */}
            <div className="lg:col-span-9 bg-[#0e1c2f] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[190px] shadow-lg border border-slate-800">
              
              {/* Circular wave overlays matching layout */}
              <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[#132337]/40 rounded-l-full blur-sm -z-0 select-none pointer-events-none" />
              <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-[#fed65b]/5 rounded-full blur-2xl select-none pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-extrabold tracking-widest text-[#fed65b] uppercase font-display block">
                  WELCOME BACK
                </span>
                
                <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white leading-tight flex items-center gap-2">
                  {student.fullName} <span className="animate-wiggle inline-block shrink-0">👋</span>
                </h1>
                
                <p className="text-xs md:text-sm text-slate-300 font-sans leading-relaxed tracking-wide">
                  Here's your learning overview for today.
                </p>

                {/* Sub status chips */}
                <div className="flex flex-wrap gap-2.5 pt-2 select-none">
                  
                  <span className="inline-flex items-center text-[11px] font-bold text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/10 font-mono">
                    {student.regNo}
                  </span>

                  <span className="inline-flex items-center text-[11px] font-bold text-[#fed65b] bg-[#fed65b]/10 px-3 py-1 rounded-full border border-[#fed65b]/20 font-mono">
                    {student.batch}
                  </span>

                  <span className="inline-flex items-center text-[11px] font-bold text-sky-300 bg-sky-400/10 px-3 py-1 rounded-full border border-sky-400/20 font-sans">
                    Since Mar 2025
                  </span>

                </div>
              </div>

              {/* Circular dial gauge integrated into banner right corner */}
              <div className="md:absolute right-8 top-1/2 md:-translate-y-1/2 flex items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm self-start md:self-auto mt-4 md:mt-0 z-10 w-fit">
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#1d2d44" strokeWidth="6" />
                    <circle 
                      cx="32" 
                      cy="32" 
                      r="26" 
                      fill="none" 
                      stroke="#fed65b" 
                      strokeWidth="6" 
                      strokeDasharray={2 * Math.PI * 26}
                      strokeDashoffset={2 * Math.PI * 26 * (1 - (progress.overallPercent || 0) / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute font-display font-extrabold text-[12px] text-white">{(progress.overallPercent || 0)}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-[13px] text-white leading-tight">{(progress.overallPercent || 0)}%</span>
                  <span className="text-[10px] text-slate-400 font-sans uppercase font-bold tracking-wider leading-none mt-1">
                    Overall Progress
                  </span>
                </div>
              </div>

            </div>

            {/* Vertical static date badges (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-3 shrink-0">
              
              {/* Start Date Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-slate-600 shrink-0">
                    <Calendar className="w-5 h-5 text-[#0e1c2f]" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-extrabold text-slate-800 leading-tight">
                      {student.startDate}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase font-sans mt-0.5">
                      Start Date
                    </p>
                  </div>
                </div>
              </div>

              {/* Completion Date Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-slate-600 shrink-0">
                    <Calendar className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-extrabold text-slate-800 leading-tight">
                      {student.completionDate}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase font-sans mt-0.5">
                      Completion
                    </p>
                  </div>
                </div>
              </div>

              {/* Add-on value card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-extrabold text-slate-800 leading-tight capitalize">
                      {student.addonValue}
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase font-sans mt-0.5">
                      Add-on Value
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </section>

          {/* ================= CORE PERFORMANCE GAUGES ROW (ATTENDANCE, COURSE, PROGRESS) ================= */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Gauge 1: ATTENDANCE CARD */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 flex flex-col justify-between min-h-[290px] transition-all hover:shadow-md">
              
              <div>
                <span className="text-[11px] font-bold text-slate-400 tracking-wider font-sans uppercase block mb-4">
                  Attendance
                </span>
                
                {/* Radial progress cylinder */}
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="38" fill="none" stroke="#edf2f7" strokeWidth="8" />
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="38" 
                        fill="none" 
                        stroke="#10b981" 
                        strokeWidth="8" 
                        strokeDasharray={2 * Math.PI * 38}
                        strokeDashoffset={2 * Math.PI * 38 * (1 - attendance.overallPercent / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center leading-none">
                      <span className="font-display font-black text-2xl text-slate-800">{attendance.overallPercent}%</span>
                      <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider mt-0.5">Present</span>
                    </div>
                  </div>
                </div>

                {/* Detailed counts below */}
                <div className="grid grid-cols-5 gap-1.5 mt-2">
                  <div className="flex flex-col items-center bg-slate-50 py-2 px-1 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">P</span>
                    <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 w-full text-center py-0.5 rounded-md border border-emerald-100">{attendance.present}</span>
                  </div>
                  <div className="flex flex-col items-center bg-slate-50 py-2 px-1 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">A</span>
                    <span className="text-[11px] font-mono font-bold text-red-600 bg-red-50 w-full text-center py-0.5 rounded-md border border-red-100">{attendance.absent}</span>
                  </div>
                  <div className="flex flex-col items-center bg-slate-50 py-2 px-1 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">L</span>
                    <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 w-full text-center py-0.5 rounded-md">{attendance.late}</span>
                  </div>
                  <div className="flex flex-col items-center bg-slate-50 py-2 px-1 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">ON</span>
                    <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 w-full text-center py-0.5 rounded-md">{attendance.online}</span>
                  </div>
                  <div className="flex flex-col items-center bg-slate-50 py-2 px-1 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">LV</span>
                    <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 w-full text-center py-0.5 rounded-md">{attendance.leave}</span>
                  </div>
                </div>
              </div>

              {/* Action trigger footer */}
              <button
                onClick={onShowSessions}
                className="mt-6 flex items-center justify-center gap-1.5 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors border border-slate-200/50"
              >
                View Sessions <ChevronRight className="w-3.5 h-3.5" />
              </button>

            </div>

            {/* Gauge 2: COURSE PROGRESS CARD */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 flex flex-col justify-between min-h-[290px] transition-all hover:shadow-md">
              
              <div>
                <span className="text-[11px] font-bold text-slate-400 tracking-wider font-sans uppercase block mb-4">
                  Course Progress
                </span>
                
                {/* Radial progress cylinder */}
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="38" fill="none" stroke="#edf2f7" strokeWidth="8" />
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="38" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="8" 
                        strokeDasharray={2 * Math.PI * 38}
                        strokeDashoffset={2 * Math.PI * 38 * (1 - progress.overallPercent / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center leading-none">
                      <span className="font-display font-black text-2xl text-slate-800">{progress.overallPercent}%</span>
                      <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-wider mt-0.5">Completed</span>
                    </div>
                  </div>
                </div>

                {/* Sub details pills */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="flex items-center justify-center gap-2 bg-blue-50/50 border border-blue-100 py-2.5 px-3 rounded-xl text-center">
                    <span className="w-2 h-2 rounded-full bg-blue-600 block shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-700">{progress.completedClasses}/{progress.totalClasses} Done</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-red-50/40 border border-red-100 py-2.5 px-3 rounded-xl text-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 block shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-700">0 Left</span>
                  </div>
                </div>
              </div>

              {/* Action trigger footer */}
              <button
                onClick={() => onNavigate('course')}
                className="mt-6 flex items-center justify-center gap-1.5 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors border border-slate-200/50"
              >
                Go to Course <ChevronRight className="w-3.5 h-3.5" />
              </button>

            </div>

            {/* Gauge 3: ASSIGNMENTS TASK GAUGE CARD */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 flex flex-col justify-between min-h-[290px] transition-all hover:shadow-md">
              
              <div>
                <span className="text-[11px] font-bold text-slate-400 tracking-wider font-sans uppercase block mb-4">
                  Assignments
                </span>
                
                {/* Radial progress cylinder */}
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="38" fill="none" stroke="#edf2f7" strokeWidth="8" />
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="38" 
                        fill="none" 
                        stroke="#a855f7" 
                        strokeWidth="8" 
                        strokeDasharray={2 * Math.PI * 38}
                        strokeDashoffset={2 * Math.PI * 38 * (1 - assignments.overallPercent / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center leading-none">
                      <span className="font-display font-black text-2xl text-slate-800">{assignments.overallPercent}%</span>
                      <span className="text-[10px] text-purple-600 font-semibold uppercase tracking-wider mt-0.5">Submitted</span>
                    </div>
                  </div>
                </div>

                {/* Sub details pills */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="flex items-center justify-center gap-2 bg-purple-50/50 border border-purple-100 py-2.5 px-3 rounded-xl text-center">
                    <span className="w-2 h-2 rounded-full bg-purple-500 block shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-700">{assignments.submitted}/{assignments.total} Done</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-red-50/40 border border-red-100 py-2.5 px-3 rounded-xl text-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 block shrink-0" />
                    <span className="font-mono text-xs font-bold text-slate-700">{assignments.total - assignments.submitted} Left</span>
                  </div>
                </div>
              </div>

              {/* Action trigger footer */}
              <button
                onClick={onShowAssignments}
                className="mt-6 flex items-center justify-center gap-1.5 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold transition-colors border border-slate-200/50"
              >
                View Assignments <ChevronRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </section>

          {/* ================= SECONDARY DETAIL PANELS (ENROLLED COURSE SUMMARY AND ATTENDANCE POLICIES) ================= */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
            
            {/* LEFT CONTAINER: COURSE OVERVIEW AND GRADE STATUS */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center select-none">
                  <span className="text-[11px] font-bold text-slate-400 tracking-wider font-sans uppercase">
                    Course Overview
                  </span>
                  <span className="inline-flex items-center text-[10px] uppercase font-display font-extrabold text-[#745c00] bg-[#fed65b]/25 border border-amber-300 px-2.5 py-0.5 rounded-full">
                    ● ACTIVE SYLLABUS
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display text-base md:text-md font-bold text-[#0b1c30] tracking-tight leading-snug">
                    {student.course}
                  </h3>

                  {/* Automatic Progress & Grade indicators */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5 pb-2">
                    
                    {/* Grade Block */}
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl flex flex-col justify-center items-center text-center select-none">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Dynamic Grade</span>
                      {(() => {
                        const pct = progress.overallPercent || 0;
                        let grade = 'F';
                        let label = 'Pending';
                        let color = 'text-slate-500 bg-slate-100';
                        if (pct >= 95) { grade = 'A+'; label = 'Outstanding'; color = 'text-emerald-700 bg-emerald-50 border-emerald-100'; }
                        else if (pct >= 85) { grade = 'A'; label = 'Excellent'; color = 'text-teal-700 bg-teal-50 border-teal-100'; }
                        else if (pct >= 75) { grade = 'B+'; label = 'Very Good'; color = 'text-blue-700 bg-blue-50 border-blue-100'; }
                        else if (pct >= 65) { grade = 'B'; label = 'Good'; color = 'text-indigo-700 bg-indigo-50 border-indigo-100'; }
                        else if (pct >= 50) { grade = 'C'; label = 'Average'; color = 'text-amber-700 bg-amber-50 border-amber-100'; }
                        else if (pct > 0) { grade = 'D'; label = 'Needs Improvement'; color = 'text-orange-700 bg-orange-50 border-orange-100'; }
                        return (
                          <>
                            <span className="font-display font-black text-2.5xl leading-tight text-slate-800 tracking-tight mt-1">
                              {grade}
                            </span>
                            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 mt-1 border rounded-md ${color}`}>
                              {label}
                            </span>
                          </>
                        );
                      })()}
                    </div>

                    {/* Progress Stats Block */}
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-2xl flex flex-col justify-center items-center text-center select-none">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Lectures progress</span>
                      <span className="font-display font-black text-2.5xl leading-tight text-slate-800 tracking-tight mt-1">
                        {progress.completedClasses || 0}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium font-mono mt-1">
                        out of {progress.totalClasses || 0} topics
                      </span>
                    </div>

                  </div>

                  {/* Course visual horizontal progress bar */}
                  <div className="space-y-1 select-none pt-1">
                    <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      <span>Verification Completion</span>
                      <span>{progress.overallPercent || 0}% Complete</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40 p-[1px]">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${progress.overallPercent || 0}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-5.5 h-5.5 rounded bg-slate-100 flex items-center justify-center shrink-0">
                        <span className="text-xs">👥</span>
                      </div>
                      <span className="font-medium">Batch: <strong className="text-[#0b1c30] font-mono">{student.batch}</strong></span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-5.5 h-5.5 rounded bg-slate-100 flex items-center justify-center shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <span className="font-medium">Syllabus Launch: <strong className="text-[#0b1c30] font-mono">{student.startDate}</strong></span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Extra Course overview metrics helpful info */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  Practical Syllabus Complete
                </span>
                <span className="font-mono font-bold text-slate-800">100% Verified</span>
              </div>

            </div>

            {/* RIGHT CONTAINER: ATTENDANCE POLICY CARD */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/40 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center select-none">
                  <span className="text-[11px] font-bold text-slate-400 tracking-wider font-sans uppercase flex items-center gap-1.5">
                    📋 Attendance Policy
                  </span>
                  <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded">
                    ✓ Good
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 font-medium -mt-2">1 Year Full-Time Professional Course</p>

                {/* Progress bars matching detail lists */}
                <div className="space-y-4 pt-1">
                  
                  {/* Off Days metric */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span className="flex items-center gap-1.5 font-medium text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shrink-0" />
                        Off Days (Absent + Leave)
                      </span>
                      <span className="font-mono font-bold text-red-600">4/40</span>
                    </div>
                    {/* Progress slider track */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }} />
                    </div>
                    <p className="text-[10px] text-slate-400 text-right">36 remaining free days allowance</p>
                  </div>

                  {/* Online Classes metric */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span className="flex items-center gap-1.5 font-medium text-slate-600">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shrink-0" />
                        Online Classes
                      </span>
                      <span className="font-mono font-bold text-slate-800">0/20</span>
                    </div>
                    {/* Progress slider track */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '0%' }} />
                    </div>
                    <p className="text-[10px] text-slate-400 text-right">20 remaining online exceptions allowance</p>
                  </div>

                </div>
              </div>

              {/* No fine guarantee banner representing screenshot ₹0 block */}
              <div className="mt-5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between select-none">
                <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                  ✓ NO FINE ACCRUED
                </span>
                <span className="font-sans font-black text-lg text-emerald-600">₹0</span>
              </div>

            </div>

          </section>

        </main>

    </div>
  );
}
