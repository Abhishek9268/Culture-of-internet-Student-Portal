import React from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  Bell, 
  Clock, 
  User, 
  MapPin, 
  Sparkles, 
  ShieldAlert, 
  Smartphone,
  ChevronRight,
  School
} from 'lucide-react';
import CoiLogo from './CoiLogo';

interface WelcomeScreenProps {
  onSelectStudent: () => void;
  onSelectAdmin: () => void;
}

export default function WelcomeScreen({ onSelectStudent, onSelectAdmin }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-[#0f172a] relative overflow-x-hidden pt-0 selection:bg-[#fbbf24] selection:text-[#0f172a] font-sans pb-16 md:pb-6">
      
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-75 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-200/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-100/10 rounded-full blur-[100px] pointer-events-none" />

      {/* ================= REFINED STICKY HEADER ================= */}
      <header className="sticky top-0 bg-white/85 backdrop-blur-md border-b border-slate-100 z-50 px-4 md:px-8 py-3 flex justify-between items-center select-none shadow-xs">
        <div className="flex items-center gap-3">
          <CoiLogo className="w-12 h-9" />
          <div>
            <span className="font-display font-black text-xs tracking-wider text-[#0e1c2f] block uppercase">
              Culture of Internet
            </span>
            <span className="text-[9px] font-mono uppercase font-bold text-slate-400 block tracking-widest leading-none">
              Academic Prestige
            </span>
          </div>
        </div>
      </header>

      {/* ================= HERO CONTENT WRAPPER ================= */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12 relative z-10 space-y-12">
        
        {/* Academic Excellence centered block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          
          <div className="inline-flex items-center gap-1.5 bg-[#fefce8] border border-[#fef3c7] text-[#854d0e] px-3.5 py-1 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest font-mono shadow-xs animate-fade-in select-none">
            <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
            <span>Academic Excellence</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-extrabold tracking-tight text-[#0e1c2f] leading-tight select-none">
            Culture of Internet: <br />
            <span className="bg-gradient-to-r from-[#b45309] to-[#d97706] bg-clip-text text-transparent">
              Your Gateway to Excellence
            </span>
          </h1>

          <p className="font-sans text-xs md:text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">
            Join a community of forward-thinking scholars. Access premium course materials, track your growth, and shape the digital future of academic prestige.
          </p>

        </div>

        {/* ================= PORTAL ACCESS CARD ================= */}
        <div className="max-w-md mx-auto w-full select-none">
          <button
            onClick={onSelectStudent}
            className="w-full group relative flex items-center justify-between p-4.5 bg-[#fdfbf7] hover:bg-[#fbf7ee] rounded-2xl border border-[#f5e1b8] hover:border-[#dfc38a] transition-all duration-350 hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(251,191,36,0.04)] text-left cursor-pointer"
          >
            {/* Soft inner ambient glow */}
            <div className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-r from-amber-500/0 via-amber-500/[0.015] to-amber-500/0 rounded-2xl pointer-events-none" />
            
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#102a43] text-[#fed65b] flex items-center justify-center shrink-0 shadow-md shadow-[#102a43]/15 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="truncate">
                <span className="block text-[10px] font-extrabold tracking-widest text-[#b45309] uppercase font-mono leading-none mb-1">
                  PORTAL ACCESS
                </span>
                <span className="block text-base md:text-lg font-extrabold text-[#0e1c2f] leading-tight">
                  Student Login
                </span>
              </div>
            </div>

            <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 shrink-0" />
            </div>
          </button>
        </div>

        {/* ================= ACTIVE SCHOLARS IMAGE CONTAINER ================= */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 max-w-2xl mx-auto h-[220px] md:h-[280px]">
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
            alt="Colleague developers discussing interactive layout components inside academic computer laboratory" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
          
          {/* Overlay golden tag */}
          <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 px-3.5 py-1 rounded-lg font-bold text-[10.5px] uppercase tracking-wider shadow-md select-none font-display">
            Active Learners 10K+ Students
          </div>
        </div>

        {/* ================= EMPOWERING JOURNEY GRID ================= */}
        <div className="space-y-6 pt-4">
          <div className="text-center select-none">
            <h2 className="text-sm md:text-md uppercase font-extrabold tracking-widest text-slate-400 font-display">
              Empowering Your Academic Journey
            </h2>
            <div className="w-20 h-1 bg-[#fed65b] mx-auto mt-2.5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Card 1: Attendance Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/55 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow min-h-[160px]">
              <div className="space-y-2.5">
                <div className="w-9 h-9 bg-amber-500/10 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Attendance Tracking
                </h4>
                <p className="text-[11.5px] text-slate-500 leading-normal">
                  Real-time attendance logs and digital check-ins with high-precision geofencing technology.
                </p>
              </div>
              <span className="text-[9px] font-mono font-bold tracking-wider text-amber-600 uppercase pt-2 select-none">
                PRECISION
              </span>
            </div>

            {/* Card 2: High Contrast Visual Course Progress */}
            <div className="bg-[#0e1c2f] text-white rounded-2xl p-5 border border-slate-800 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow min-h-[160px]">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between select-none">
                  <div className="w-9 h-9 bg-[#fed65b]/10 text-[#fed65b] rounded-xl flex items-center justify-center shrink-0">
                    <BookOpen className="w-4.5 h-4.5" />
                  </div>
                  {/* Gauge style bar representation */}
                  <span className="inline-flex items-center text-[10px] font-extrabold uppercase px-2 py-0.5 text-[#241a00] bg-[#fed65b] rounded font-mono">
                    75% COMPLETE
                  </span>
                </div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                  Course Progress
                </h4>
                <p className="text-[11.5px] text-slate-350 leading-normal">
                  Interactive donut charts and progress gauges to visualize your path to graduation and mastery.
                </p>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mt-3 select-none">
                <div className="bg-[#fed65b] h-full w-[75%]" />
              </div>
            </div>

            {/* Card 3: Announcements Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/55 shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow min-h-[160px]">
              <div className="space-y-2.5">
                <div className="w-9 h-9 bg-amber-500/10 text-amber-700 rounded-xl flex items-center justify-center shrink-0">
                  <Bell className="w-4.5 h-4.5" />
                </div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Announcements
                </h4>
                <p className="text-[11.5px] text-slate-500 leading-normal">
                  Instant notifications for faculty updates, events, and important academic deadlines.
                </p>
              </div>
              <span className="text-[9px] font-mono font-bold tracking-wider text-amber-600 uppercase pt-2 select-none">
                REAL-TIME
              </span>
            </div>

          </div>
        </div>

        {/* ================= DESIGN CRADLE / GOTHIC SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-4 border-t border-slate-200/50">
          
          <div className="space-y-4">
            <h2 className="font-serif text-2xl md:text-3xl font-black text-[#0e1c2f] leading-tight max-w-sm">
              Structured for Growth
            </h2>
            <p className="text-[12.5px] text-slate-500 leading-relaxed font-sans">
              Our digital campus isn't just about software; it's about creating a mental model of an organized digital environment where information hierarchy is immediate and intuitive.
            </p>
            
            <ul className="space-y-3 pt-1 text-slate-700">
              <li className="flex items-start gap-2 text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Premium Accreditation:</strong>
                  <span className="block text-[11px] text-slate-500">Recognized systems that meet international standards of academic integrity.</span>
                </div>
              </li>
              <li className="flex items-start gap-2 text-xs">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Secure Data Access:</strong>
                  <span className="block text-[11px] text-slate-500">Enterprise-grade security protecting your academic records and personal info.</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200/40 h-[220px]">
            <img 
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800" 
              alt="Gothic classic library brick style architecture building and courtyard represents long term academic heritage of university" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none"
            />
          </div>

        </div>

      </main>

      {/* ================= REFINED FOOTER ================= */}
      <footer className="w-full py-8 px-6 bg-slate-900 text-slate-400 text-xs space-y-6 mt-8 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2.5 max-w-sm">
            <div className="flex items-center gap-3">
              <CoiLogo className="w-10 h-7" />
              <span className="font-display font-black tracking-widest text-[#fed65b] uppercase">
                Culture of Internet
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Leading the digital transformation of higher education through innovative UI and structured excellence.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onSelectAdmin}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-[10px] rounded-lg transition-colors inline-flex items-center gap-1 border border-slate-700/50 uppercase tracking-widest"
              title="Identity authentication console for registrar officers"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#fed65b] shrink-0" />
              <span>Administrative Console</span>
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto border-t border-slate-800 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-500 font-sans">
          <span>COI PORTAL ENGINE V2.4.0</span>
          <span>© 2024 Culture of Internet. All rights reserved.</span>
        </div>
      </footer>

      {/* ================= SIMULATED BOTTOM MOBILE NAVIGATION BAR ================= */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-3 pt-1.5 bg-white z-40 rounded-t-xl shadow-[0_-4px_16px_rgba(0,0,0,0.06)] border-t border-slate-100 md:hidden select-none">
        
        {/* Home Option (Active) */}
        <button 
          onClick={() => {}}
          className="flex flex-col items-center justify-center rounded-2xl px-3.5 py-1 bg-[#fed65b] text-slate-950 font-bold"
        >
          <Smartphone className="w-4.5 h-4.5" />
          <span className="text-[9px] tracking-tight mt-0.5">Home</span>
        </button>

        {/* Schedule Option (Gates to Student Login) */}
        <button 
          onClick={onSelectStudent}
          className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-850 px-3.5 py-1"
        >
          <Clock className="w-4.5 h-4.5" />
          <span className="text-[9px] tracking-tight mt-0.5">Schedule</span>
        </button>

        {/* Reports Option (Gates to Student Login) */}
        <button 
          onClick={onSelectStudent}
          className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-850 px-3.5 py-1"
        >
          <BookOpen className="w-4.5 h-4.5" />
          <span className="text-[9px] tracking-tight mt-0.5">Course</span>
        </button>

        {/* Profile Option (Gates to Student Login) */}
        <button 
          onClick={onSelectStudent}
          className="flex flex-col items-center justify-center text-slate-500 hover:text-slate-850 px-3.5 py-1"
        >
          <User className="w-4.5 h-4.5" />
          <span className="text-[9px] tracking-tight mt-0.5">Profile</span>
        </button>

      </nav>

    </div>
  );
}
