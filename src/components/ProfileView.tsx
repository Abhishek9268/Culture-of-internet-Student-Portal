import React, { useState, useRef } from 'react';
import { StudentProfile } from '../types';
import { 
  User, Phone, Mail, MapPin, Calendar, Award, 
  Book, Users, ArrowLeft, Camera, Upload, Trash2
} from 'lucide-react';

interface ProfileViewProps {
  student: StudentProfile;
  loginMode: 'Offline' | 'Online';
  onUpdateStudent?: (updated: StudentProfile) => void;
  onNavigate: (tab: string) => void;
}

export default function ProfileView({ student, loginMode, onUpdateStudent, onNavigate }: ProfileViewProps) {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Institutional limit: Image size must be smaller than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (onUpdateStudent) {
        onUpdateStudent({
          ...student,
          avatarUrl: base64String
        });
      }
      setShowEditMenu(false);
      setError('');
    };
    reader.onerror = () => {
      setError("Failed to read selected image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    if (onUpdateStudent) {
      onUpdateStudent({
        ...student,
        avatarUrl: urlInput.trim()
      });
    }
    setUrlInput('');
    setShowEditMenu(false);
    setError('');
  };

  const handleRemoveAvatar = () => {
    if (onUpdateStudent) {
      onUpdateStudent({
        ...student,
        avatarUrl: undefined
      });
    }
    setShowEditMenu(false);
    setError('');
  };

  return (
    <div className="flex-grow w-full bg-[#f8f9ff] text-[#0b1c30] p-4 md:p-6 space-y-6">
      
      {/* Top action helper path and view indicators */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/50 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest text-[#b89531] font-display uppercase">COI</span>
            <span className="text-slate-400">/</span>
            <span className="text-xs text-slate-500 font-medium font-sans">Profile</span>
          </div>
          <h2 className="font-display text-xl md:text-2xl font-extrabold tracking-tight mt-1 text-[#0e1c2f]">
            My Profile
          </h2>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 sm:flex-initial px-4 py-2 text-xs font-bold bg-white text-slate-700 rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>

          <div className="flex-1 sm:flex-initial px-4 py-2 text-xs font-extrabold bg-[#0e1c2f] text-emerald-400 rounded-xl border border-emerald-500/20 shadow-sm flex items-center justify-center gap-1.5 select-none font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Verified Profile
          </div>
        </div>
      </div>

      {/* ================= HEADER COVER BRAND BOX ================= */}
      <section className="bg-[#0e1c2f] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-6 shadow-md border border-slate-800">
        
        {/* Abstract background graphics */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[#132337]/40 rounded-l-full blur-sm -z-0 select-none pointer-events-none" />
        
        {/* Circular Avatar Badge with Interactive Editing Camera Button */}
        <div className="relative shrink-0 select-none z-10 flex flex-col items-center">
          <div 
            onClick={() => setShowEditMenu(!showEditMenu)}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-[#fed65b] to-sky-400 shadow-md cursor-pointer relative overflow-hidden group active:scale-95 transition-all"
            title="Edit profile photo"
          >
            {/* Hover Camera Overlay mask */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] md:text-xs font-bold gap-1 rounded-full">
              <Camera className="w-5 h-5 md:w-6 h-6 text-[#fed65b]" />
              <span>Change Photo</span>
            </div>

            {student.avatarUrl ? (
              <img 
                src={student.avatarUrl} 
                alt={student.fullName} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full border-4 border-[#0e1c2f]" 
              />
            ) : (
              <div className="w-full h-full bg-[#0e1c2f] text-[#fed65b] font-display font-black flex items-center justify-center text-4xl uppercase rounded-full">
                {student.fullName ? student.fullName.charAt(0) : "S"}
              </div>
            )}
          </div>

          <button 
            onClick={() => setShowEditMenu(!showEditMenu)}
            className="mt-2.5 px-3 py-1 bg-[#16273d] text-[11px] font-bold text-[#fed65b] hover:bg-[#203652] rounded-full border border-slate-700/60 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Camera className="w-3 h-3 shrink-0" />
            <span>Edit Photo</span>
          </button>

          {/* Sleek Floating Image Edit Menu */}
          {showEditMenu && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white text-slate-800 p-4 rounded-2xl shadow-xl border border-slate-200 z-50 w-72 max-w-[calc(100vw-2rem)] space-y-4 animate-fade-in">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <span className="font-bold text-[11px] font-display text-[#0e1c2f] uppercase tracking-wider">Update Profile Image</span>
                <button 
                  onClick={() => { setShowEditMenu(false); setError(''); }}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold px-1"
                >
                  ✕
                </button>
              </div>

              {error && (
                <p className="text-[10px] text-red-650 font-semibold bg-red-50 p-1.5 rounded">{error}</p>
              )}

              <div className="grid grid-cols-2 gap-2">
                {/* Option 1: Choose File */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-700 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                >
                  <Upload className="w-5 h-5 text-[#b89531]" />
                  <span className="text-[10px] font-mono font-bold">Choose File</span>
                </button>
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />

                {/* Option 2: Remove avatar / reset */}
                <button
                  onClick={handleRemoveAvatar}
                  disabled={!student.avatarUrl}
                  className="p-2.5 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 disabled:opacity-40 disabled:hover:bg-slate-50 disabled:hover:text-slate-700 disabled:hover:border-slate-200 rounded-xl border border-slate-200 text-slate-700 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                >
                  <Trash2 className="w-5 h-5 text-rose-500" />
                  <span className="text-[10px] font-mono font-bold">Remove</span>
                </button>
              </div>

              <form onSubmit={handleUrlSubmit} className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Paste Web Link</label>
                <div className="flex gap-1.5">
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-grow bg-slate-50 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 focus:bg-white text-slate-800"
                  />
                  <button
                    type="submit"
                    className="bg-[#0e1c2f] hover:bg-slate-800 text-white font-bold text-xs px-3 rounded-lg flex items-center justify-center text-center shrink-0 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Identity texts */}
        <div className="text-center md:text-left space-y-3 relative z-10 self-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-white">
              {student.fullName}
            </h1>
            <p className="text-[#fed65b] font-mono text-xs mt-1 block">
              {student.email}
            </p>
          </div>

          {/* Sub status chips */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs select-none">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full text-slate-300 font-mono font-semibold border border-white/5">
              📁 {student.regNo}
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#fed65b]/10 rounded-full text-[#fed65b] font-sans font-semibold border border-[#fed65b]/20">
              🎓 {student.qualification}
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-400/10 rounded-full text-teal-300 font-mono font-semibold border border-teal-400/25">
              👥 {student.batch}
            </span>
          </div>
        </div>
      </section>

      {/* ================= DETAILS LIST GRID CONTAINER ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">

        {/* CARD 1: PERSONAL INFORMATION */}
        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-200/40 relative">
          <h3 className="font-display font-extrabold text-sm tracking-wider text-slate-800 uppercase flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <User className="w-4 h-4 text-amber-600 shrink-0" />
            Personal Details
          </h3>

          <div className="space-y-3.5 text-xs md:text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-50 gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Full Name</span>
              <span className="font-bold text-slate-800 uppercase tracking-wide">{student.fullName}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-50 gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Gender</span>
              <span className="font-bold text-slate-800">{student.gender}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-50 gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Date of Birth</span>
              <span className="font-bold font-mono text-slate-800">{student.dateOfBirth}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-50 gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Qualification</span>
              <span className="font-bold text-slate-800 pr-2">{student.qualification}</span>
            </div>

            <div className="flex justify-between items-start pb-3 border-b border-slate-50 gap-1.5">
              <span className="text-slate-500 font-medium font-sans shrink-0 mt-0.5">Address</span>
              <span className="font-bold text-slate-800 text-right md:max-w-xs">{student.address}</span>
            </div>

            <div className="flex justify-between items-center gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Registration No.</span>
              <span className="font-mono font-bold text-[#b89531]">{student.regNo}</span>
            </div>
          </div>
        </div>

        {/* CARD 2: CONTACT INFORMATION */}
        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-200/40 relative">
          <h3 className="font-display font-extrabold text-sm tracking-wider text-slate-800 uppercase flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <Phone className="w-4 h-4 text-amber-600 shrink-0" />
            Contact & Location details
          </h3>

          <div className="space-y-3.5 text-xs md:text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-50 gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Phone Mobile</span>
              <span className="font-bold text-slate-800 font-mono">{student.phone}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-50 gap-1.5">
              <span className="text-slate-500 font-medium font-sans">WhatsApp Link</span>
              <span className="font-bold text-slate-800 font-mono">{student.whatsapp}</span>
            </div>

            <div className="flex justify-between items-center gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Official Email</span>
              <span className="font-bold font-mono text-slate-800 break-all">{student.email}</span>
            </div>
          </div>
        </div>

        {/* CARD 3: COURSE INFORMATION */}
        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-200/40 relative">
          <h3 className="font-display font-extrabold text-sm tracking-wider text-slate-800 uppercase flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <Book className="w-4 h-4 text-amber-600 shrink-0" />
            Course Allocation
          </h3>

          <div className="space-y-3.5 text-xs md:text-sm">
            <div className="flex flex-col md:items-start justify-between pb-3 border-b border-slate-50 gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Course Program</span>
              <span className="font-bold text-slate-800 text-xs md:text-sm leading-relaxed text-amber-800 pr-2">
                {student.course}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-50 gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Batch Code</span>
              <span className="font-bold font-mono text-slate-800">{student.batch}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-50 gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Enroll Start</span>
              <span className="font-bold font-mono text-slate-800">{student.startDate}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-slate-50 gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Estimated End</span>
              <span className="font-bold font-mono text-slate-800">{student.completionDate}</span>
            </div>

            <div className="flex justify-between items-center gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Add-on Course Option</span>
              <span className="font-bold text-slate-800 capitalize bg-slate-100 px-2 py-0.5 rounded text-xs">{student.addonValue}</span>
            </div>
          </div>
        </div>

        {/* CARD 4: PARENT DETAILS */}
        <div className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-slate-200/40 relative">
          <h3 className="font-display font-extrabold text-sm tracking-wider text-slate-800 uppercase flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <Users className="w-4 h-4 text-amber-600 shrink-0" />
            Guardian Details
          </h3>

          <div className="space-y-3.5 text-xs md:text-sm">
            <div className="flex justify-between items-center pb-3 border-b border-slate-50 gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Father/guardian Name</span>
              <span className="font-bold text-slate-800">{student.parentName}</span>
            </div>

            <div className="flex justify-between items-center gap-1.5">
              <span className="text-slate-500 font-medium font-sans">Emergency Contact</span>
              <span className="font-bold text-slate-800 font-mono">{student.parentContact}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
