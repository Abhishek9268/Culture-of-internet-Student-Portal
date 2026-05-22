import React, { useState, useEffect, useRef } from 'react';
import { StudentProfile, AttendanceStats, ProgressStats, AssignmentStats, CourseModule, CourseTopic } from '../types';
import { 
  ShieldAlert, Save, ArrowLeft, CheckCircle2, User, BookOpen, 
  Trash, Plus, UserPlus, Key, Info, HelpCircle, Film, Upload, 
  Settings, Users, Activity, BarChart, ChevronRight, CheckSquare, RefreshCw, Send, Check,
  Eye, EyeOff
} from 'lucide-react';
import CoiLogo from './CoiLogo';

// ==========================================
// MASTER ADMINISTRATIVE CREDENTIALS
// Change this constant to update the Admin password key:
const MASTER_ADMIN_PASSKEY = "admin123";
// ==========================================

interface AdminDashboardViewProps {
  students: StudentProfile[];
  onUpdateStudents: (updatedStudents: StudentProfile[]) => void;
  onBack: () => void;
}

export default function AdminDashboardView({
  students,
  onUpdateStudents,
  onBack
}: AdminDashboardViewProps) {
  // References for scrolling containers
  const directoryListRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Master Security Admin login status
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Course management tabs: 'identity' | 'metrics' | 'syllabus'
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'identity' | 'metrics' | 'syllabus'>('identity');

  // Selected student index from the directory
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Helper function to handle selecting student and scroll workspace on mobile
  const handleSelectStudent = (index: number) => {
    setSelectedIdx(index);
    setTimeout(() => {
      if (window.innerWidth < 1024 && workspaceRef.current) {
        workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Customizable Student Enrollment Modal state
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState<boolean>(false);
  const [enrollName, setEnrollName] = useState<string>('');
  const [enrollRegNo, setEnrollRegNo] = useState<string>('');
  const [enrollPassword, setEnrollPassword] = useState<string>('password123');
  const [enrollEmail, setEnrollEmail] = useState<string>('');
  const [enrollBatch, setEnrollBatch] = useState<string>('25fullstack0405');
  const [enrollCourse, setEnrollCourse] = useState<string>('Master Full Stack Web Design & Development with AI & AI Automation (MFSDDAI)');
  const [enrollPhone, setEnrollPhone] = useState<string>('');
  const [enrollGender, setEnrollGender] = useState<string>('Male');

  // Dynamic state values for editing student fields
  const [uName, setUName] = useState('');
  const [uRegNo, setURegNo] = useState('');
  const [uPassword, setUPassword] = useState('');
  const [uBatch, setUBatch] = useState('');
  const [uPhone, setUPhone] = useState('');
  const [uWhatsapp, setUWhatsapp] = useState('');
  const [uEmail, setUEmail] = useState('');
  const [uAddon, setUAddon] = useState('');
  const [uCourse, setUCourse] = useState('');
  const [uParent, setUParent] = useState('');
  const [uParentContact, setUParentContact] = useState('');
  const [uGender, setUGender] = useState('');
  const [uDob, setUDob] = useState('');
  const [uQualification, setUQualification] = useState('');
  const [uAddress, setUAddress] = useState('');
  const [uStartDate, setUStartDate] = useState('');
  const [uCompletionDate, setUCompletionDate] = useState('');

  // Attendance metrics values
  const [attPresent, setAttPresent] = useState(0);
  const [attAbsent, setAttAbsent] = useState(0);
  const [attLate, setAttLate] = useState(0);
  const [attOnline, setAttOnline] = useState(0);
  const [attLeave, setAttLeave] = useState(0);

  // Progress class markers
  const [progCompleted, setProgCompleted] = useState(0);
  const [progTotal, setProgTotal] = useState(30);

  // Assignments counters
  const [asgSubmitted, setAsgSubmitted] = useState(0);
  const [asgTotal, setAsgTotal] = useState(5);

  // Active student's assigned modules
  const [currentModules, setCurrentModules] = useState<CourseModule[]>([]);

  // Selected module index to edit topics
  const [editingModuleId, setEditingModuleId] = useState<string>('');
  
  // Create Module Form fields
  const [newModTitle, setNewModTitle] = useState('');
  const [newModHours, setNewModHours] = useState('30 Hrs');
  const [newModStatus, setNewModStatus] = useState<'Completed' | 'Active Progress' | 'Pending'>('Active Progress');
  const [newModTopicsCsv, setNewModTopicsCsv] = useState('');

  // Create Individual Topic inside active module form
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicDuration, setNewTopicDuration] = useState('15:00');
  const [newTopicVideoUrl, setNewTopicVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');

  // Video Drag-and-Drop Mock upload state
  const [uploadedVideoName, setUploadedVideoName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Sync state whenever selected student changes
  useEffect(() => {
    if (students.length > 0 && selectedIdx < students.length) {
      const s = students[selectedIdx];
      setUName(s.fullName || '');
      setURegNo(s.regNo || '');
      setUPassword(s.password || 'password123');
      setUBatch(s.batch || '25fullstack0405');
      setUPhone(s.phone || '');
      setUWhatsapp(s.whatsapp || '');
      setUEmail(s.email || '');
      setUAddon(s.addonValue || 'no');
      setUCourse(s.course || '');
      setUParent(s.parentName || '');
      setUParentContact(s.parentContact || '');
      setUGender(s.gender || 'Male');
      setUDob(s.dateOfBirth || '');
      setUQualification(s.qualification || '');
      setUAddress(s.address || '');
      setUStartDate(s.startDate || '2025-03-31');
      setUCompletionDate(s.completionDate || '2026-05-15');

      const att = s.attendance || { present: 0, absent: 0, late: 0, online: 0, leave: 0 };
      setAttPresent(att.present);
      setAttAbsent(att.absent);
      setAttLate(att.late);
      setAttOnline(att.online);
      setAttLeave(att.leave);

      const prog = s.progress || { completedClasses: 0, totalClasses: 22 };
      setProgCompleted(prog.completedClasses);
      setProgTotal(prog.totalClasses);

      const asg = s.assignments || { submitted: 0, total: 5 };
      setAsgSubmitted(asg.submitted);
      setAsgTotal(asg.total);

      const mods = s.modules || [];
      setCurrentModules(mods);

      if (mods.length > 0) {
        setEditingModuleId(mods[0].id);
      } else {
        setEditingModuleId('');
      }
    }
  }, [selectedIdx, students]);

  // Master update to trigger save profile details and sync
  const handleSaveStudentConfiguration = () => {
    if (!uName.trim()) {
      alert("Name is required.");
      return;
    }
    if (!uRegNo.trim()) {
      alert("Registration No. is required.");
      return;
    }

    const totalDays = Number(attPresent) + Number(attAbsent) + Number(attLate) + Number(attLeave);
    const attPercent = totalDays > 0 ? Math.round(((Number(attPresent) + Number(attOnline)) / totalDays) * 100) : 100;
    const overallProgPercent = Number(progTotal) > 0 ? Math.round((Number(progCompleted) / Number(progTotal)) * 100) : 0;
    const overallAsgPercent = Number(asgTotal) > 0 ? Math.round((Number(asgSubmitted) / Number(asgTotal)) * 100) : 0;

    const updatedProfile: StudentProfile = {
      ...students[selectedIdx],
      fullName: uName.trim(),
      regNo: uRegNo.trim().toUpperCase(),
      password: uPassword.trim(),
      batch: uBatch.trim(),
      phone: uPhone.trim(),
      whatsapp: uWhatsapp.trim() || uPhone.trim(),
      email: uEmail.trim(),
      addonValue: uAddon,
      course: uCourse.trim(),
      parentName: uParent.trim(),
      parentContact: uParentContact.trim(),
      gender: uGender,
      dateOfBirth: uDob,
      qualification: uQualification,
      address: uAddress,
      startDate: uStartDate,
      completionDate: uCompletionDate,
      modules: currentModules,
      attendance: {
        present: Number(attPresent),
        absent: Number(attAbsent),
        late: Number(attLate),
        online: Number(attOnline),
        leave: Number(attLeave),
        overallPercent: Math.min(100, Math.max(0, attPercent))
      },
      progress: {
        completedClasses: Number(progCompleted),
        totalClasses: Number(progTotal),
        overallPercent: Math.min(100, Math.max(0, overallProgPercent))
      },
      assignments: {
        submitted: Number(asgSubmitted),
        total: Number(asgTotal),
        overallPercent: Math.min(100, Math.max(0, overallAsgPercent))
      }
    };

    const nextList = students.map((item, idx) => idx === selectedIdx ? updatedProfile : item);
    onUpdateStudents(nextList);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Create a brand new module with comma-separated list of topics
  const handleCreateModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModTitle.trim()) {
      alert("Please specify a syllabus module name.");
      return;
    }

    const topicsCompiled: CourseTopic[] = newModTopicsCsv
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
      .map((title, index) => {
        // distribute default video streams to make it ready to use
        const samples = [
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        ];
        return {
          id: `topic-${Date.now()}-${index}`,
          title,
          videoUrl: samples[index % samples.length],
          videoDuration: `${Math.floor(8 + Math.random() * 15)}:20`,
          completed: false
        };
      });

    const newModule: CourseModule = {
      id: `mod-${Date.now()}`,
      title: newModTitle.trim(),
      hours: newModHours.trim() || '30 Hrs',
      status: newModStatus,
      topics: topicsCompiled
    };

    const updatedModules = [...currentModules, newModule];
    setCurrentModules(updatedModules);
    setEditingModuleId(newModule.id);

    // Save of modules list
    const nextList = students.map((st, i) => i === selectedIdx ? { ...st, modules: updatedModules } : st);
    onUpdateStudents(nextList);

    setNewModTitle('');
    setNewModTopicsCsv('');
    alert(`Successfully created module "${newModule.title}" with ${topicsCompiled.length} lecture topics!`);
  };

  // Add individual topic to editing module
  const handleAddNewTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) {
      alert("Please specify topic title!");
      return;
    }

    const newTopic: CourseTopic = {
      id: `top-ind-${Date.now()}`,
      title: newTopicTitle.trim(),
      videoUrl: newTopicVideoUrl.trim() || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      videoDuration: newTopicDuration || '15:10',
      completed: false
    };

    const updatedModules = currentModules.map(m => {
      if (m.id === editingModuleId) {
        return {
          ...m,
          topics: [...(m.topics || []), newTopic]
        };
      }
      return m;
    });

    setCurrentModules(updatedModules);

    const nextList = students.map((st, i) => i === selectedIdx ? { ...st, modules: updatedModules } : st);
    onUpdateStudents(nextList);

    setNewTopicTitle('');
    alert(`Added topic "${newTopic.title}" successfully.`);
  };

  // Remove a module from roadmap
  const handleDeleteModule = (moduleId: string) => {
    const updatedModules = currentModules.filter(m => m.id !== moduleId);
    setCurrentModules(updatedModules);
    if (editingModuleId === moduleId && updatedModules.length > 0) {
      setEditingModuleId(updatedModules[0].id);
    }

    const nextList = students.map((st, i) => i === selectedIdx ? { ...st, modules: updatedModules } : st);
    onUpdateStudents(nextList);
  };

  // Delete individual topic from a module
  const handleDeleteTopic = (moduleId: string, topicId: string) => {
    const updatedModules = currentModules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          topics: m.topics.filter(t => t.id !== topicId)
        };
      }
      return m;
    });

    setCurrentModules(updatedModules);

    const nextList = students.map((st, i) => i === selectedIdx ? { ...st, modules: updatedModules } : st);
    onUpdateStudents(nextList);
  };

  // Edit fields of a topic interactively
  const handleUpdateTopicField = (moduleId: string, topicId: string, updatedFields: Partial<CourseTopic>) => {
    const updatedModules = currentModules.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          topics: m.topics.map(t => t.id === topicId ? { ...t, ...updatedFields } : t)
        };
      }
      return m;
    });

    setCurrentModules(updatedModules);

    const nextList = students.map((st, i) => i === selectedIdx ? { ...st, modules: updatedModules } : st);
    onUpdateStudents(nextList);
  };

  // Push / broadcast current student's course modules roadmap to all students
  const handleBroadcastCourseSyllabus = () => {
    const confirmBroadcast = window.confirm("Are you sure you want to broadcast the current selected student's Course Syllabus, Video lectures structure, and Modules to ALL student profiles enrolled? This will overwrite their roadmap.");
    if (confirmBroadcast) {
      const nextList = students.map(s => ({
        ...s,
        modules: [...currentModules]
      }));
      onUpdateStudents(nextList);
      alert(`Successfully broadcasted syllabus roadmap modules directory structure to all ${students.length} students!`);
    }
  };

  // Simulated drag and drop video upload
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFileSimulate(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFileSimulate(e.target.files[0]);
    }
  };

  const processFileSimulate = (file: File) => {
    setUploadedVideoName(file.name);
    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Set simulated video input link
          setNewTopicVideoUrl(`https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`);
          setNewTopicTitle(file.name.replace(/\.[^/.]+$/, ""));
          return 100;
        }
        return prev + 15;
      });
    }, 150);
  };

  // Open modal with pre-generated defaults
  const handleOpenEnrollModal = () => {
    const randomReg = `WD-0225-${Math.floor(1000 + Math.random() * 9000)}`;
    setEnrollName('');
    setEnrollEmail('');
    setEnrollPhone('');
    setEnrollRegNo(randomReg);
    setEnrollPassword('password123');
    setEnrollGender('Male');
    setEnrollBatch('25fullstack0405');
    setIsEnrollModalOpen(true);
  };

  // Complete student creation
  const handleExecuteEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollName.trim()) {
      alert("Name is required!");
      return;
    }

    const regUpper = enrollRegNo.trim().toUpperCase();
    if (students.some(s => s.regNo.toUpperCase() === regUpper)) {
      alert(`Conflict: A student with Registration Number "${regUpper}" already exists in the system database.`);
      return;
    }

    const newStudent: StudentProfile = {
      fullName: enrollName.trim(),
      gender: enrollGender,
      dateOfBirth: "2004-10-18",
      qualification: "Pursuing Graduation",
      address: "Swaroop Nagar, Delhi - 110042",
      regNo: regUpper,
      password: enrollPassword.trim() || 'password123',
      phone: enrollPhone.trim() || "9123456789",
      whatsapp: enrollPhone.trim() || "9123456789",
      email: enrollEmail.trim() || `${enrollName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      course: enrollCourse.trim(),
      batch: enrollBatch.trim(),
      startDate: new Date().toISOString().split('T')[0],
      completionDate: "2027-06-01",
      addonValue: "no",
      parentName: "Guardian Alpha",
      parentContact: enrollPhone.trim() || "9123456780",
      // copy modules of selected student so they get assigned the layout directly
      modules: currentModules.length > 0 ? [...currentModules] : [
        {
          id: "mod-default",
          title: "HTML",
          hours: "24 Hrs",
          status: "Active Progress",
          topics: [
            { id: "mod-def-top-1", title: "Your First HTML Website | Basic structure of html", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", videoDuration: "14:22", completed: false },
            { id: "mod-def-top-2", title: "Heading, Paragraphs and Links | HTML", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", videoDuration: "10:15", completed: false }
          ]
        }
      ],
      attendance: { present: 6, absent: 0, late: 0, online: 1, leave: 0, overallPercent: 100 },
      progress: { completedClasses: 1, totalClasses: 25, overallPercent: 4 },
      assignments: { submitted: 1, total: 5, overallPercent: 20 }
    };

    const nextList = [...students, newStudent];
    onUpdateStudents(nextList);
    setSelectedIdx(nextList.length - 1);
    setIsEnrollModalOpen(false);

    // Automatically scroll to the newly enrolled student inside the directory list and their workspace
    setTimeout(() => {
      if (directoryListRef.current) {
        directoryListRef.current.scrollTo({
          top: directoryListRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
      if (workspaceRef.current) {
        workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleDeleteStudent = (indexToDelete: number) => {
    if (students.length <= 1) {
      alert("Error: You must retain at least one student user profile in the security ledger to prevent rendering zero fallback conditions.");
      return;
    }
    const confirmed = window.confirm(`Permanently delete user ${students[indexToDelete].fullName} (${students[indexToDelete].regNo})? This action is irreversible.`);
    if (confirmed) {
      const filtered = students.filter((_, idx) => idx !== indexToDelete);
      onUpdateStudents(filtered);
      setSelectedIdx(0);
    }
  };

  // Filter students by query search
  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Authentication Gate design matching student portal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#0b121f] text-slate-100 flex flex-col justify-center items-center px-4 py-8 relative font-sans selection:bg-amber-400 select-none">
        {/* Subtle grid background pattern and glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-sm bg-gradient-to-b from-[#111c2e] to-[#0d1624] rounded-2xl p-6 md:p-8 border border-[#1e2f47] shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-10 space-y-6 relative">
          {/* Logo & Header block */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-1">
              <CoiLogo className="w-16 h-16 transform hover:scale-105 transition-transform duration-300" />
            </div>
            <h2 className="font-display text-lg font-black tracking-tight uppercase text-white flex items-center justify-center gap-1.5">
              <span>Security Registry Gate</span>
            </h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Administrative credentials and cryptographic master verification are required.
            </p>
          </div>

          {/* Secure System Warning */}
          <div className="bg-[#182335]/80 rounded-xl p-3 border border-[#23354f] flex gap-2.5 items-start text-left">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-[10px] text-slate-300 leading-relaxed font-mono">
              <span className="text-amber-400 font-bold block uppercase mb-0.5">Authorized Officers Only</span>
              All login sessions, administrative actions, and record mutations are signed, encrypted, and electronically recorded.
            </div>
          </div>

          {authError && (
            <div className="bg-red-950/40 border border-red-500/40 text-red-200 px-3 py-2.5 rounded-lg text-xs text-center animate-fade-in font-semibold flex items-center justify-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping shrink-0" />
              {authError}
            </div>
          )}

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (adminPassword.trim() === MASTER_ADMIN_PASSKEY) {
                setIsAuthenticated(true);
                setAuthError('');
              } else {
                setAuthError('INVALID PASSKEY RECORD MATCH');
              }
            }} 
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-slate-400">
                  Administrative Access Passkey
                </label>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <Key className="w-3.5 h-3.5" />
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin passkey..."
                  className="w-full bg-[#121f33] text-white border border-[#223550] focus:border-amber-400 focus:bg-[#14233a] focus:ring-1 focus:ring-amber-400/20 pl-9 pr-10 py-2.5 rounded-xl text-left text-xs transition-all shadow-inner focus:outline-none placeholder:text-slate-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#fed65b] hover:bg-amber-400 active:scale-[0.98] text-[#132337] font-black rounded-xl text-[11px] uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Verify Credentials & Secure Access
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full py-2.5 bg-[#121f33]/70 hover:bg-[#15243b] text-slate-300 font-bold rounded-xl text-[11px] uppercase tracking-wider transition-all border border-[#223550]/40 flex items-center justify-center gap-1 cursor-pointer"
            >
              ← Back to Main Page
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff] text-[#0b1c30] flex flex-col justify-between font-sans select-none">
      
      {/* ================= BAR HEADER BRANDED MATCHING STUDENT PANEL ================= */}
      <header className="bg-[#0e1c2f] text-white px-4 md:px-6 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 shadow-sm">
        
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
            title="Return back to Selection"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold tracking-widest text-[#fed65b] font-mono uppercase">COI ADMINISTRATIVE</span>
              <span className="text-slate-500 font-mono text-[8px] bg-slate-800 px-1.5 py-0.5 rounded">AUTHENTICATED</span>
            </div>
            <h2 className="text-base md:text-lg font-black font-display tracking-tight text-white mt-0.5">
              Academy Registry Control Center
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={handleOpenEnrollModal}
            className="flex-1 md:flex-initial px-3 py-1.5 bg-[#fed65b] hover:bg-amber-400 text-slate-950 text-xs font-black rounded-lg flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer text-center"
          >
            <UserPlus className="w-3.5 h-3.5 shrink-0" />
            <span>Enroll New Student</span>
          </button>
          
          <button
            onClick={handleBroadcastCourseSyllabus}
            className="flex-1 md:flex-initial px-3 py-1.5 bg-indigo-600 hover:bg-indigo-505 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all border border-indigo-500/20 cursor-pointer text-center"
            title="Broadcast selection's course roadmap to everyone"
          >
            <RefreshCw className="w-3 h-3" /> Broadcast Syllabus to All
          </button>
        </div>

      </header>

      {/* ================= CORE PERFORMANCE TILES ================= */}
      <section className="bg-slate-50 p-2.5 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2.5">
          
          <div className="bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-xs flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">Enrolled Students</span>
              <span className="font-display font-bold text-xs text-[#0e1c2f] leading-none block truncate mt-0.5">{students.length} profile rows</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-xs flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">Dynamic Syllabus</span>
              <span className="font-display font-bold text-xs text-[#0e1c2f] leading-none block truncate mt-0.5">
                {currentModules.length} Modules Assigned
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-xs flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">Registry Security</span>
              <span className="font-display font-bold text-xs text-emerald-600 leading-none block truncate mt-0.5">ONLINE SECURE</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-2.5 border border-slate-200/80 shadow-xs flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <BarChart className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">Current Selection</span>
              <span className="font-display font-bold text-xs text-[#0e1c2f] truncate block mt-0.5 uppercase max-w-[120px]">
                {students[selectedIdx]?.fullName || "None"}
              </span>
            </div>
          </div>

        </div>
      </section>

      {saveSuccess && (
        <div className="mx-4 md:mx-6 mt-3 bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-xl flex items-center gap-2 text-xs animate-fade-in font-sans">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="text-[11px]">
            <strong>Success:</strong> Administrative sync complete! Selected student details and modules are pushed to live directory records.
          </div>
        </div>
      )}

      {/* ================= MAIN DOCK GRID LAYOUT ================= */}
      <div className="flex-grow p-3 md:p-4 lg:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 max-w-7xl mx-auto w-full">
               {/* LEFT COMPONENT: SYSTEM INVENTORY & FIND BAR (Col span 4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-3 md:p-3.5 border border-slate-200/60 shadow-xs space-y-3">
          
          <div className="space-y-1.5">
            <h3 className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 font-display flex items-center gap-1">
              <span>🔍 Quick Find Student Profile</span>
            </h3>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, code or ID..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-850 px-3 py-1.5 rounded-lg text-xs font-semibold focus:bg-white focus:border-[#0e1c2f] focus:outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[9px] uppercase font-mono text-slate-400 font-bold px-1">
              <span>Directory user listing</span>
              <span>Total: {filteredStudents.length}</span>
            </div>

            <div ref={directoryListRef} className="space-y-1.5 max-h-[300px] lg:max-h-[550px] overflow-y-auto pr-0.5">
              {filteredStudents.length === 0 ? (
                <div className="p-6 border border-dashed rounded-xl text-center text-xs text-slate-400">
                  No matching student records found. Change search filter parameters or enroll a candidate.
                </div>
              ) : (
                filteredStudents.map((st) => {
                  const originalIndex = students.findIndex(s => s.regNo === st.regNo);
                  const isSelected = originalIndex === selectedIdx;

                  return (
                    <div 
                      key={st.regNo}
                      className={`w-full flex items-center justify-between p-2 rounded-xl border transition-all ${
                        isSelected 
                          ? 'bg-[#0e1c2f] border-transparent text-white shadow-sm' 
                          : 'bg-slate-50 border-slate-200/50 text-[#0b1c30] hover:bg-slate-100/60'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectStudent(originalIndex)}
                        className="flex-grow flex items-center gap-2 text-left min-w-0"
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-black text-xs shrink-0 tracking-wider ${
                          isSelected ? 'bg-[#fed65b] text-[#241a00]' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {st.fullName ? st.fullName.charAt(0).toUpperCase() : "S"}
                        </div>
                        <div className="truncate">
                          <span className="font-extrabold text-[11px] block truncate uppercase">
                            {st.fullName}
                          </span>
                          <span className={`text-[9px] font-mono block mt-0.5 ${isSelected ? 'text-slate-350' : 'text-slate-400'}`}>
                            🔑 Reg: {st.regNo}
                          </span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteStudent(originalIndex)}
                        className={`p-1.5 rounded-md transition-all ${
                          isSelected ? 'text-rose-400 hover:bg-slate-800' : 'text-slate-400 hover:text-red-500 hover:bg-slate-200/55'
                        }`}
                        title="Permanently remove Student profile"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-150 text-[10px] text-slate-500 font-medium">
            <span className="font-extrabold text-slate-700 block uppercase mb-1">Passcodes & Login Registry:</span>
            By default, students login using their Registration ID as ID and <code className="bg-slate-200 font-mono text-slate-800 px-1 rounded text-[9px]">password123</code> or custom passcodes.
          </div>

        </div>

        {/* RIGHT COMPONENT: INTEGRATED SYSTEM FORMEDITOR & COURSE SYLLABUS PANEL (Col span 8) */}
        <div ref={workspaceRef} className="lg:col-span-8 bg-white rounded-2xl p-4 md:p-5 border border-slate-200/60 shadow-xs space-y-5">
          
          {/* Header Row presenting selected student state */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase font-mono block">SYSTEM CONFIG STATE</span>
              <h3 className="font-display font-black text-[#0e1c2f] text-base md:text-lg uppercase">
                ⚙️ {uName || "Syllabus Registry"}
              </h3>
            </div>

            {/* TAB SELECT MENU */}
            <div className="flex bg-slate-100 p-1 rounded-xl self-stretch sm:self-auto text-xs font-bold leading-none select-none">
              <button
                type="button"
                onClick={() => setActiveAdminSubTab('identity')}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg transition-all ${
                  activeAdminSubTab === 'identity' ? 'bg-[#0e1c2f] text-white' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Identity
              </button>
              <button
                type="button"
                onClick={() => setActiveAdminSubTab('metrics')}
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg transition-all ${
                  activeAdminSubTab === 'metrics' ? 'bg-[#0e1c2f] text-white' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                Grades
              </button>
              <button
                type="button"
                className={`flex-1 sm:flex-none px-3.5 py-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                  activeAdminSubTab === 'syllabus' ? 'bg-[#0e1c2f] text-white' : 'text-slate-600 hover:text-slate-800'
                }`}
                onClick={() => setActiveAdminSubTab('syllabus')}
              >
                <Film className="w-3.5 h-3.5" /> Course & Videos
              </button>
            </div>
          </div>

          {/* TAB PANEL 1: IDENTITY EDITING FORM */}
          {activeAdminSubTab === 'identity' && (
            <div className="space-y-3 animate-fade-in text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 block">Student Name (View Only for student)</label>
                  <input 
                    type="text" 
                    value={uName} 
                    onChange={(e) => setUName(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg focus:bg-white focus:border-[#0e1c2f] focus:outline-none font-bold text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 block">Registration NO Code ID</label>
                  <input 
                    type="text" 
                    value={uRegNo} 
                    onChange={(e) => setURegNo(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none font-mono font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 block">Registry Password</label>
                  <input 
                    type="text" 
                    value={uPassword} 
                    onChange={(e) => setUPassword(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none font-mono text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 block">Official Batch ID</label>
                  <input 
                    type="text" 
                    value={uBatch} 
                    onChange={(e) => setUBatch(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-indigo-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 block">Gender</label>
                  <select 
                    value={uGender}
                    onChange={(e) => setUGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-indigo-505 text-xs"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 block">Official Email Identifier</label>
                  <input 
                    type="email" 
                    value={uEmail} 
                    onChange={(e) => setUEmail(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-indigo-501 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 block">Mobile Phone</label>
                  <input 
                    type="text" 
                    value={uPhone} 
                    onChange={(e) => setUPhone(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-indigo-501 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 block">Highest Qualification</label>
                  <input 
                    type="text" 
                    value={uQualification} 
                    onChange={(e) => setUQualification(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 block">Syllabus Program Course</label>
                  <input 
                    type="text" 
                    value={uCourse} 
                    onChange={(e) => setUCourse(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-[#b89531] block">Father/Guardian</label>
                  <input 
                    type="text" 
                    value={uParent} 
                    onChange={(e) => setUParent(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 block">Guardian Phone</label>
                  <input 
                    type="text" 
                    value={uParentContact} 
                    onChange={(e) => setUParentContact(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-slate-400 block">Date of Birth</label>
                  <input 
                    type="date" 
                    value={uDob} 
                    onChange={(e) => setUDob(e.target.value)} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase font-bold text-slate-400 block">Residential Location Address</label>
                <textarea 
                  value={uAddress} 
                  onChange={(e) => setUAddress(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg focus:bg-white focus:outline-none text-xs leading-relaxed resize-none h-11"
                />
              </div>

              <div className="pt-1.5 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveStudentConfiguration}
                  className="px-4 py-2 bg-[#0e1c2f] hover:bg-slate-800 text-white font-bold rounded-lg flex items-center gap-1.5 transition-all shadow text-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-[#fed65b]" /> Save Candidate Identity Changes
                </button>
              </div>
            </div>
          )}

          {/* TAB PANEL 2: GRADES & METRICS EDITOR */}
          {activeAdminSubTab === 'metrics' && (
            <div className="space-y-5 animate-fade-in text-xs md:text-sm">
              
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-3">
                <h4 className="font-display font-black text-xs text-[#0e1c2f] uppercase tracking-wide">
                  Class Attendance logs Counters
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                    <label className="text-[9px] uppercase font-bold text-emerald-600 block">Present Classes</label>
                    <input 
                      type="number" 
                      value={attPresent} 
                      onChange={(e) => setAttPresent(Number(e.target.value))} 
                      className="w-full bg-transparent text-center font-display font-black text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                    <label className="text-[9px] uppercase font-bold text-red-600 block">Absent Classes</label>
                    <input 
                      type="number" 
                      value={attAbsent} 
                      onChange={(e) => setAttAbsent(Number(e.target.value))} 
                      className="w-full bg-transparent text-center font-display font-black text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                    <label className="text-[9px] uppercase font-bold text-slate-500 block">Late Entries</label>
                    <input 
                      type="number" 
                      value={attLate} 
                      onChange={(e) => setAttLate(Number(e.target.value))} 
                      className="w-full bg-transparent text-center font-display font-black text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                    <label className="text-[9px] uppercase font-bold text-cyan-600 block">Online Sessions</label>
                    <input 
                      type="number" 
                      value={attOnline} 
                      onChange={(e) => setAttOnline(Number(e.target.value))} 
                      className="w-full bg-transparent text-center font-display font-black text-slate-800 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                    <label className="text-[9px] uppercase font-bold text-amber-600 block">Leave Approved</label>
                    <input 
                      type="number" 
                      value={attLeave} 
                      onChange={(e) => setAttLeave(Number(e.target.value))} 
                      className="w-full bg-transparent text-center font-display font-black text-slate-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-3.5">
                  <h4 className="font-display font-black text-xs text-[#0e1c2f] uppercase tracking-wide">
                    Classes Syllabus Progress
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200">
                      <label className="text-[9px] uppercase font-bold text-slate-400 block">Hours completed</label>
                      <input 
                        type="number" 
                        value={progCompleted} 
                        onChange={(e) => setProgCompleted(Number(e.target.value))} 
                        className="w-full bg-transparent font-display font-black text-slate-800 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200">
                      <label className="text-[9px] uppercase font-bold text-slate-400 block">Total Syllabus Hours</label>
                      <input 
                        type="number" 
                        value={progTotal} 
                        onChange={(e) => setProgTotal(Number(e.target.value))} 
                        className="w-full bg-transparent font-display font-black text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 space-y-3.5">
                  <h4 className="font-display font-black text-xs text-[#0e1c2f] uppercase tracking-wide">
                    Capstone Assignment Submissions
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200">
                      <label className="text-[9px] uppercase font-bold text-slate-400 block">Assignments Submitted</label>
                      <input 
                        type="number" 
                        value={asgSubmitted} 
                        onChange={(e) => setAsgSubmitted(Number(e.target.value))} 
                        className="w-full bg-transparent font-display font-black text-slate-800 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200">
                      <label className="text-[9px] uppercase font-bold text-slate-400 block">Total Pushed Projects</label>
                      <input 
                        type="number" 
                        value={asgTotal} 
                        onChange={(e) => setAsgTotal(Number(e.target.value))} 
                        className="w-full bg-transparent font-display font-black text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveStudentConfiguration}
                  className="px-5 py-3 bg-[#0e1c2f] hover:bg-slate-800 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow"
                >
                  <Save className="w-4 h-4 text-[#fed65b]" /> Save Academic Grades & Metrics
                </button>
              </div>

            </div>
          )}

          {/* TAB PANEL 3: VIDEO UPOADS & TOPIC-WISE SYLLABUS LESSONS MANAGER */}
          {activeAdminSubTab === 'syllabus' && (
            <div className="space-y-6 animate-fade-in text-xs md:text-sm">
              
              {/* CURRENT SYLLABUS DIRECTORY SUMMARY */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-[#0e1c2f] font-sans">
                  <h4 className="text-xs font-black uppercase tracking-wide flex items-center gap-1">
                    📖 Current Allocated Roadmaps ({currentModules.length})
                  </h4>
                  <button 
                    onClick={handleBroadcastCourseSyllabus}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-indigo-700 px-2 py-1 rounded font-bold transition-all flex items-center gap-1"
                  >
                    Broadcast syllabus to everyone
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentModules.map(m => {
                    const isEditingThis = editingModuleId === m.id;
                    const countTopics = m.topics?.length || 0;

                    return (
                      <div 
                        key={m.id}
                        onClick={() => setEditingModuleId(m.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                          isEditingThis 
                            ? 'bg-[#0e1c2f]/5 border-[#0e1c2f] ring-1 ring-[#0e1c2f]' 
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100/60'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-1">
                          <span className="font-black text-[#0e1c2f] text-xs uppercase font-sans tracking-wide">
                            {m.title}
                          </span>
                          <span className={`text-[9.5px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                            m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {m.status}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mt-3 text-[10px] text-slate-500 font-mono font-bold">
                          <span>⏱ {m.hours} Hours</span>
                          <span>📑 {countTopics} topic videos</span>
                        </div>

                        <div className="mt-3 flex gap-2 justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteModule(m.id);
                            }}
                            className="text-[10px] text-red-600 hover:bg-red-50 px-2 py-1 rounded font-semibold"
                          >
                            Remove Module
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ACTIVE SELECTED MODULE EDITING PANEL */}
              {editingModuleId && (
                <div className="bg-slate-50 p-4 md:p-5 rounded-3xl border border-slate-200 space-y-4">
                  
                  {/* Active Heading */}
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[9px] uppercase font-black text-amber-600 font-mono">Editing Active syllabus content</span>
                      <h4 className="font-display font-black text-sm text-[#0e1c2f] uppercase">
                        {currentModules.find(m => m.id === editingModuleId)?.title}
                      </h4>
                    </div>

                    <span className="text-xs px-2.5 py-1 bg-[#0e1c2f] text-white rounded-lg font-mono font-bold">
                      {currentModules.find(m => m.id === editingModuleId)?.topics?.length || 0} topics
                    </span>
                  </div>

                  {/* ACTIVE REVENUE LECTURES LISTING */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">
                      Topic-Wise Video Lists & Course Contents
                    </span>

                    <div className="bg-white rounded-2xl divide-y divide-slate-100 border border-slate-200 overflow-hidden max-h-[350px] overflow-y-auto">
                      {currentModules.find(m => m.id === editingModuleId)?.topics?.map((topic, idx) => (
                        <div key={topic.id} className="p-3.5 space-y-3 hover:bg-slate-50 transition-all text-xs">
                          
                          {/* Title block with inline changes */}
                          <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
                            <div className="flex items-center gap-2 w-full sm:max-w-md">
                              <span className="text-[10px] font-mono font-bold text-slate-400">#{(idx+1).toString().padStart(2, '0')}</span>
                              <input 
                                type="text"
                                value={topic.title}
                                onChange={(e) => handleUpdateTopicField(editingModuleId, topic.id, { title: e.target.value })}
                                className="font-bold text-slate-800 bg-transparent hover:bg-slate-200/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1.5 py-1 text-xs flex-grow font-sans uppercase"
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteTopic(editingModuleId, topic.id)}
                              className="text-[10px] text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg font-bold"
                            >
                              Delete Topic
                            </button>
                          </div>

                          {/* Video metadata configuration row */}
                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                            <div className="sm:col-span-8 flex items-center gap-1">
                              <span className="text-[10px] font-mono text-slate-400 shrink-0 select-none">Video Link:</span>
                              <input 
                                type="text"
                                value={topic.videoUrl || ''}
                                placeholder="https://..."
                                onChange={(e) => handleUpdateTopicField(editingModuleId, topic.id, { videoUrl: e.target.value })}
                                className="font-mono text-[10.5px] bg-[#f8f9ff] text-slate-700 border border-slate-200 px-2 py-1 rounded w-full focus:outline-none"
                              />
                            </div>

                            <div className="sm:col-span-2 flex items-center gap-1">
                              <span className="text-[10px] font-mono text-slate-400 shrink-0 select-none">Len:</span>
                              <input 
                                type="text"
                                value={topic.videoDuration || '15:00'}
                                onChange={(e) => handleUpdateTopicField(editingModuleId, topic.id, { videoDuration: e.target.value })}
                                className="font-mono text-[10.5px] text-center bg-[#f8f9ff] text-slate-700 border border-slate-200 px-1 py-1 rounded w-full focus:outline-none font-bold"
                              />
                            </div>

                            <div className="sm:col-span-2 flex items-center justify-end gap-1.5 select-none">
                              <button
                                onClick={() => handleUpdateTopicField(editingModuleId, topic.id, { completed: !topic.completed })}
                                className={`px-2 py-1 text-[10.1px] font-bold rounded-lg transition-colors border ${
                                  topic.completed 
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                                    : 'bg-slate-100 border-slate-200 text-slate-500'
                                }`}
                              >
                                {topic.completed ? '✓ Done' : 'Pending'}
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}

                      {(!currentModules.find(m => m.id === editingModuleId)?.topics || 
                        currentModules.find(m => m.id === editingModuleId)?.topics?.length === 0) && (
                        <div className="p-8 text-center text-slate-400 italic">
                          No lecture video topics configured yet. Use the tool below to build course content.
                        </div>
                      )}
                    </div>

                  </div>

                  {/* FORM TO ADD NEW TOPIC CARD & INTEGRALL SIMULATION BOX */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-4">
                    <h5 className="text-[10.5px] font-black uppercase tracking-wider text-[#0e1c2f] flex items-center gap-1 select-none">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      Add Individual Lecture Topic & Video Resource
                    </h5>

                    {/* Drag and Drop Video simulated Box */}
                    <div 
                      onDragEnter={handleDrag} 
                      onDragOver={handleDrag} 
                      onDragLeave={handleDrag} 
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all ${
                        dragActive ? 'border-amber-400 bg-amber-50/50' : 'border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <input 
                        type="file" 
                        accept="video/mp4,video/x-m4v,video/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        onChange={handleFileChange}
                      />
                      <div className="space-y-1.5 select-none text-xs">
                        <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                        <p className="font-bold text-slate-700">Drag & Drop Class Video File Here</p>
                        <p className="text-[10px] text-slate-400">or click to choose video file (simulates upload & auto-names topic)</p>
                      </div>

                      {isUploading && (
                        <div className="absolute inset-0 bg-white/95 flex flex-col justify-center items-center p-4 rounded-xl animate-fade-in z-20">
                          <span className="font-bold text-xs text-[#0e1c2f] animate-pulse">Uploading Class Video: {uploadedVideoName}</span>
                          <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden max-w-xs">
                            <div className="bg-emerald-500 h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Standard form feeds */}
                    <form onSubmit={handleAddNewTopic} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Topic Lecture Title</label>
                        <input 
                          type="text"
                          required
                          value={newTopicTitle}
                          onChange={(e) => setNewTopicTitle(e.target.value)}
                          placeholder="Your First HTML Website | Basic structure of html"
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-2 rounded-xl focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Length (MM:SS)</label>
                        <input 
                          type="text"
                          required
                          value={newTopicDuration}
                          onChange={(e) => setNewTopicDuration(e.target.value)}
                          placeholder="15:10"
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-3 py-2 rounded-xl focus:bg-white focus:outline-none font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[10px] uppercase font-bold text-slate-400">Mock streaming URL link address</label>
                        <input 
                          type="text"
                          value={newTopicVideoUrl}
                          onChange={(e) => setNewTopicVideoUrl(e.target.value)}
                          className="w-full font-mono text-[10px] bg-slate-50 border border-slate-200 text-slate-800 px-3 py-2 rounded-xl focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div className="flex items-end select-none">
                        <button
                          type="submit"
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow"
                        >
                          ⚡ Add Topic Video
                        </button>
                      </div>
                    </form>
                  </div>

                </div>
              )}

              {/* BRAND MODULE MAKER OVERALL ROADMAP FORM */}
              <form onSubmit={handleCreateModule} className="bg-slate-50 p-4 rounded-3xl border border-slate-200 space-y-4">
                <h5 className="font-display font-black text-sm text-[#0e1c2f] uppercase flex items-center gap-1.5 select-none pb-2 border-b border-slate-200">
                  🧬 Push & Setup Brand New Course Module Structure
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Course Module Syllabus Name</label>
                    <input 
                      type="text" 
                      required
                      value={newModTitle} 
                      onChange={(e) => setNewModTitle(e.target.value)} 
                      placeholder="e.g. Node Package Automation Tools"
                      className="w-full bg-slate-100 border border-slate-200 text-slate-800 px-3 py-2.5 rounded-xl text-xs focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Syllabus hour count (Hrs)</label>
                    <input 
                      type="text" 
                      required
                      value={newModHours} 
                      onChange={(e) => setNewModHours(e.target.value)} 
                      placeholder="e.g. 40 Hrs"
                      className="w-full bg-slate-100 border border-slate-200 text-slate-800 px-3 py-2.5 rounded-xl text-xs focus:bg-white focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 block">
                    Initial Initial topics list (Comma-Separated string to batch generate)
                  </label>
                  <input 
                    type="text" 
                    value={newModTopicsCsv} 
                    onChange={(e) => setNewModTopicsCsv(e.target.value)} 
                    placeholder="e.g. Topic title 1, Topic title 2, Topic title 3"
                    className="w-full bg-slate-100 border border-slate-200 text-slate-800 px-3 py-2.5 rounded-xl text-xs focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex justify-between items-center pt-2 select-none">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold text-slate-400 block">Standard Module Status</label>
                    <select 
                      value={newModStatus}
                      onChange={(e) => setNewModStatus(e.target.value as any)}
                      className="bg-slate-100 border border-slate-200 text-slate-800 px-3 py-2 rounded-xl text-xs font-semibold"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Active Progress">Active Progress</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-5 bg-[#0e1c2f] hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow"
                  >
                    🚀 Push Core Course Module
                  </button>
                </div>
              </form>

            </div>
          )}

        </div>

      </div>

      {/* STUDENT REGISTRATION ENROLLMENT DIALOG OVERLAY */}
      {isEnrollModalOpen && (
        <div className="fixed inset-0 bg-[#0b1c30]/85 backdrop-blur-md z-50 overflow-y-auto px-4 py-8 flex justify-center items-start md:items-center font-sans text-[#0b1c30]">
          <div className="bg-white rounded-[32px] p-6 md:p-8 max-w-lg w-full border border-slate-150 shadow-2xl space-y-6 animate-fade-in text-xs md:text-sm my-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 select-none">
              <h3 className="font-display font-black text-[#0e1c2f] text-base uppercase flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" />
                Enroll Dynamic Candidate Profile
              </h3>
              <button 
                onClick={() => setIsEnrollModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-extrabold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteEnroll} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9.5px] uppercase font-bold text-slate-400 block">Student Candidate Full Name</label>
                <input 
                  type="text"
                  required
                  value={enrollName}
                  onChange={(e) => setEnrollName(e.target.value)}
                  placeholder="e.g. Abhishek Kumar"
                  className="w-full bg-slate-50 border border-slate-250 text-slate-850 px-3.5 py-2.5 rounded-xl text-xs focus:bg-white focus:outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9.5px] uppercase font-bold text-slate-400 block">Registration Code ID</label>
                  <input 
                    type="text"
                    required
                    value={enrollRegNo}
                    onChange={(e) => setEnrollRegNo(e.target.value)}
                    placeholder="e.g. WD-0225-1310"
                    className="w-full bg-slate-50 border border-slate-250 text-slate-850 px-3.5 py-2.5 rounded-xl text-xs focus:bg-white focus:outline-none font-mono font-extrabold text-[#b89531]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9.5px] uppercase font-bold text-slate-400 block">Initial Password Access Code</label>
                  <input 
                    type="text"
                    required
                    value={enrollPassword}
                    onChange={(e) => setEnrollPassword(e.target.value)}
                    placeholder="password123"
                    className="w-full bg-slate-50 border border-slate-250 text-slate-850 px-3.5 py-2.5 rounded-xl text-xs focus:bg-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-1 select-none">
                <div className="space-y-0.5">
                  <label className="text-[9px] uppercase font-bold text-slate-400">Gender</label>
                  <select 
                    value={enrollGender} 
                    onChange={(e) => setEnrollGender(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-2 text-xs rounded-lg"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-0.5">
                  <label className="text-[9px] uppercase font-bold text-slate-400">Cohort Batch</label>
                  <input 
                    type="text" 
                    value={enrollBatch} 
                    onChange={(e) => setEnrollBatch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 p-2 text-xs rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9.5px] uppercase font-bold text-slate-400 block">Student Telephone Contact</label>
                  <input 
                    type="text"
                    value={enrollPhone}
                    onChange={(e) => setEnrollPhone(e.target.value)}
                    placeholder="92685xxxxx"
                    className="w-full bg-slate-50 border border-slate-250 text-slate-850 px-3.5 py-2.5 rounded-xl text-xs focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9.5px] uppercase font-bold text-slate-400 block">Email Address</label>
                  <input 
                    type="email"
                    value={enrollEmail}
                    onChange={(e) => setEnrollEmail(e.target.value)}
                    placeholder="e.g. student@gmail.com"
                    className="w-full bg-slate-50 border border-slate-250 text-slate-850 px-3.5 py-2.5 rounded-xl text-xs focus:bg-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9.5px] uppercase font-bold text-slate-400 block">Enrolled Study Course</label>
                <input 
                  type="text"
                  required
                  value={enrollCourse}
                  onChange={(e) => setEnrollCourse(e.target.value)}
                  className="w-full bg-slate-50 border border-[#fed65b]/45 text-slate-850 px-3.5 py-2 rounded-xl text-xs text-[#0e1c2f] font-bold"
                />
              </div>

              <div className="pt-4 flex gap-3 select-none">
                <button
                  type="submit"
                  className="flex-grow py-3 bg-[#0e1c2f] hover:bg-slate-800 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all"
                >
                  ⚡ Register and Create Profile
                </button>
                <button
                  type="button"
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-205 text-slate-500 font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= BAR FOOTER ================= */}
      <footer className="p-4 border-t border-slate-200 text-center text-[10px] text-slate-400 bg-white">
        Merit Academy Control Panel • Secure Override Status: OPTIMAL • Encrypted Session Authorized
      </footer>
      
    </div>
  );
}
