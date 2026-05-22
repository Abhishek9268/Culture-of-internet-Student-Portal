import React, { useState } from 'react';
import { Shield, BookOpen, AlertCircle, ArrowLeft, Eye, EyeOff, UserCheck } from 'lucide-react';
import { StudentProfile } from '../types';

interface LoginScreenProps {
  students: StudentProfile[];
  onLoginSuccess: (regNo: string, mode: 'Offline' | 'Online') => void;
  onBack: () => void;
}

export default function LoginScreen({ students, onLoginSuccess, onBack }: LoginScreenProps) {
  const [regNo, setRegNo] = useState('WD-0225-1310');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<'Offline' | 'Online'>('Offline');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNo.trim()) {
      setErrorMessage('Please enter your Registration Number.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    // Verify student exists and has matching password
    const enteredReg = regNo.trim().toUpperCase();
    const match = students.find(s => s.regNo.toUpperCase() === enteredReg);

    if (!match) {
      setErrorMessage(`Academic error: Registration identifier "${regNo}" was not found in our directory. Make sure you have created this account inside the Control Panel.`);
      return;
    }

    if ((match.password || 'password123') !== password) {
      setErrorMessage(`Verification failure: The security password entered for "${match.fullName}" does not match institutional records.`);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(match.regNo, mode);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full bg-[#0e1c2f] text-white flex flex-col items-center justify-center p-4 relative font-sans">
      
      {/* Decorative top header / return back button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-sm border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Selection
        </button>
      </div>

      {/* Centered and optimized single-column card portal layout */}
      <div className="w-full max-w-md bg-[#132337] rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.4)] border border-slate-800 p-6 md:p-8 my-3 z-10 animate-fade-in">
        
        <div className="space-y-4">
            
            {/* Header copy */}
            <div className="text-center md:text-left select-none">
              <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-white mb-1">
                Student Login
              </h2>
              <p className="text-slate-400 font-sans text-xs">
                Access your learning dashboard
              </p>
            </div>

            {/* ERROR DISPLACEMENT MESSAGE */}
            {errorMessage && (
              <div className="bg-red-950/40 border border-red-500/50 text-red-200 p-2.5 flex items-start gap-2.5 text-xs rounded-xl animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Offline vs Online mode toggle buttons mimicking the exact screenshot look */}
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setMode('Offline')}
                className={`flex-1 py-2 px-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ${
                  mode === 'Offline'
                    ? 'bg-[#d0a747] text-[#0e1c2f] shadow-md shadow-amber-900/15'
                    : 'bg-slate-800/40 hover:bg-slate-800/70 text-slate-300 border border-slate-700/50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-orange-700 block animate-pulse shrink-0" />
                Offline
              </button>
              
              <button
                type="button"
                onClick={() => setMode('Online')}
                className={`flex-1 py-2 px-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ${
                  mode === 'Online'
                    ? 'bg-[#d0a747] text-[#0e1c2f] shadow-md shadow-amber-900/15'
                    : 'bg-slate-800/40 hover:bg-slate-800/70 text-slate-300 border border-slate-700/50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 block shrink-0" />
                Online
              </button>
            </div>

            {/* Main Fields Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Registration Input Field matching exact structure in mockup */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold tracking-wider text-[#a0aec0] uppercase font-display">
                  REGISTRATION NO.
                </label>
                <div className="relative font-mono">
                  <input
                    type="text"
                    required
                    value={regNo}
                    onChange={(e) => setRegNo(e.target.value)}
                    placeholder="WD-XXXX-XXXX"
                    className="w-full bg-[#ecf2fe] text-slate-900 px-3.5 py-2.5 rounded-xl font-semibold border-2 border-transparent focus:border-[#d0a747] focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 text-xs md:text-sm shadow-inner text-center md:text-left"
                  />
                </div>
              </div>

              {/* Password Input Field with Show Password visibility toggle */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-bold tracking-wider text-[#a0aec0] uppercase font-display">
                    PASSWORD
                  </label>
                </div>
                
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#ecf2fe] text-slate-900 pr-10 pl-3.5 py-2.5 rounded-xl font-semibold border-2 border-transparent focus:border-[#d0a747] focus:bg-white focus:outline-none transition-all placeholder:text-slate-400 text-xs md:text-sm shadow-inner text-center md:text-left"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-all"
                    title={showPassword ? "Hide password font characters" : "Reveal input password font characters"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password links */}
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <label className="flex items-center gap-1.5 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-800 text-[#d0a747] focus:ring-0"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => alert("Secret Key / Forgot Password Process: Please enter registration number 'WD-0225-1310' on the form, standard classroom password is prefilled. For recovery assistance, contact Culture of Internet Registrar.")}
                  className="text-[#d0a747] font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
               {/* Login Submit CTA with golden shadow */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#fed65b] hover:bg-amber-400 disabled:bg-[#fed65b]/45 text-[#0e1c2f] font-black py-3 px-5 rounded-xl shadow-lg shadow-amber-950/10 active:scale-98 transition-all flex items-center justify-center gap-1.5 font-display text-xs uppercase tracking-wider"
              >
                {isLoading ? 'Decrypting Access Token...' : 'Authenticate & Enter Portal'}
              </button>

            </form>

          </div>

      </div>

    </div>
  );
}
