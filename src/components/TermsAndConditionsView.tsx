import React from 'react';
import { ShieldCheck, FileText, AlertTriangle, Scale } from 'lucide-react';

export default function TermsAndConditionsView() {
  return (
    <div className="flex-grow w-full bg-[#f8f9ff] text-[#0b1c30] p-6 space-y-6">
      
      {/* Page Header */}
      <div className="border-b border-slate-200/50 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-widest text-[#b89531] font-display uppercase">COI</span>
          <span className="text-slate-400">/</span>
          <span className="text-xs text-slate-500 font-medium font-sans">Legal</span>
        </div>
        <h2 className="font-display text-2xl font-extrabold tracking-tight mt-1 text-[#0e1c2f]">
          Terms & Conditions
        </h2>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/40 shadow-sm max-w-4xl space-y-6">
        
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-[#0e1c2f] text-base leading-tight">
              Institutional Code of Conduct & Statutes
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-0.5">App Version 2.4.1 • Effective May 2026</p>
          </div>
        </div>

        {/* Content list block */}
        <div className="space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
          
          <div className="space-y-2">
            <h4 className="font-display font-black text-xs text-[#0e1c2f] uppercase tracking-wider">
              1. Minimum Attendance threshold (85%)
            </h4>
            <p className="text-slate-600">
              As a core requirement for certification and job placement support, students must maintain a minimum attendance of <strong>85%</strong>. Failure to make up for absent days or missing sessions using appropriate leave applications will invalidate practical term submission credentials and lead to automated fine triggers.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-black text-xs text-[#0e1c2f] uppercase tracking-wider">
              2. Attendance Penalty & Fine Guidelines
            </h4>
            <p className="text-slate-600">
              Students who exceed the designated <strong className="text-red-700">Allowable Leave Cap (40 days)</strong> or skip online classes without approval will trigger fine calculations computed dynamically. Fines start at <span className="font-bold">₹100 per unapproved absence</span>. Currently, Abhishek's record shows <span className="font-bold text-emerald-600">₹0 Fines</span> due to excellent standing (87% attendance, only 4 off days).
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-black text-xs text-[#0e1c2f] uppercase tracking-wider">
              3. Practical Submission & Evaluative Rules
            </h4>
            <p className="text-slate-600">
              All homework, practical code repositories, and term logs must be uploaded. Evaluation is measured under structured GPA protocols, requiring a minimum cumulative mark of <span className="font-bold">2.5 GPA</span> to remain in optimal standing for job placement interviews.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-black text-xs text-[#0e1c2f] uppercase tracking-wider">
              4. Code of Integrity & Honor Code
            </h4>
            <p className="text-slate-600">
              Academic work, full stack builds, and script APIs must be authentic code written by the student. Any instances of unreferenced duplication, plagiarism, or illegal credential sharing on the Merit Academy network will immediately lead to standard disciplinary review by the academic registrar.
            </p>
          </div>

        </div>

        {/* Affirmation Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-300 text-amber-900/80 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#b89531] shrink-0 mt-0.5" />
          <p className="leading-normal">
            By entering the Culture of Internet Student Portal, you declare you understand the attendance penalty guidelines and accept the terms of study. For any registration disputes, notify your batch representative.
          </p>
        </div>

      </div>

    </div>
  );
}
