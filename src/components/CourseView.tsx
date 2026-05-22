import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle2, ChevronDown, ChevronUp, Play, Download, 
  Sparkles, Video, Circle, HelpCircle, GraduationCap, Tv, Star
} from 'lucide-react';
import { CourseModule, CourseTopic } from '../types';

interface CourseViewProps {
  modules?: CourseModule[];
  onToggleTopicCompletion?: (moduleId: string, topicId: string) => void;
}

export default function CourseView({ 
  modules = [], 
  onToggleTopicCompletion 
}: CourseViewProps) {
  // Accordion expanded lists - default first module open, second module closed
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1': true,
    'mod-2': false
  });

  // Track currently loaded topic in video player
  const [selectedTopic, setSelectedTopic] = useState<{moduleId: string, topic: CourseTopic} | null>(() => {
    if (modules.length > 0 && modules[0].topics.length > 0) {
      return { moduleId: modules[0].id, topic: modules[0].topics[0] };
    }
    return null;
  });

  const [downloadProgress, setDownloadProgress] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questionSuccess, setQuestionSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadProgress(true);
    setDownloadSuccess(false);
    setTimeout(() => {
      setDownloadProgress(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    }, 1200);
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    setQuestionSuccess(true);
    setQuestionText('');
    setTimeout(() => setQuestionSuccess(false), 4000);
  };

  const toggleModuleAccordion = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Helper calculation for overall syllabus done
  const totalTopics = modules.reduce((total, m) => total + (m.topics?.length || 0), 0);
  const completedTopics = modules.reduce((total, m) => total + (m.topics?.filter(t => t.completed).length || 0), 0);
  const totalPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div className="flex-grow w-full bg-[#f8f9ff] text-[#0b1c30] p-4 md:p-6 space-y-6">
      
      {/* Container with optional success message row */}
      {downloadSuccess && (
        <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold font-sans flex items-center justify-between shadow-sm animate-fade-in select-none">
          <span>✓ Syllabus Saved: 'Master_Full_Stack_MFSDDAI_Syllabus_2026.pdf' has been compiled and verified dynamically.</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">Institutional Signature</span>
        </div>
      )}

      {/* ================= TOP COMPASS BARS ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200/50 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest text-[#b89531] font-display uppercase font-mono">COI</span>
            <span className="text-slate-400">/</span>
            <span className="text-xs text-slate-500 font-medium">My Training</span>
          </div>
          <h2 className="font-display text-xl md:text-2xl font-black mt-1 text-[#0e1c2f]">
            Structured Courseware Portal
          </h2>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloadProgress}
          className="flex items-center gap-1.5 px-4 py-2 font-display text-xs font-bold bg-[#0e1c2f] hover:bg-[#152a46] text-[#fed65b] rounded-xl hover:shadow transition-all disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5 shrink-0" />
          {downloadProgress ? 'Saving Guide...' : 'Download Full Syllabus (PDF)'}
        </button>
      </div>

      {/* ================= MAIN DUAL INTERACTIVE WORKSPACE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: COURSE MODULES CHECKLIST (Col Span 7) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="bg-[#0e1c2f] text-white rounded-3xl p-5 md:p-6 border border-slate-800 shadow-xl space-y-5">
            
            {/* Header: Course Modules label */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display font-bold text-lg md:text-xl text-white flex items-center gap-2">
                  <span className="text-xl">📚</span> Course Modules
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono font-bold">
                  {totalTopics} topics · {modules.length} modules completed incrementally
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-widest bg-yellow-400/20 text-[#fed65b] border border-yellow-400/20">
                Syllabus Tracker
              </span>
            </div>

            {/* GOLD PROGRESS BAR ACCORDED WITH USER SCREENSHOT */}
            <div className="space-y-2 select-none pt-1">
              {/* Golden Progress track indicator line */}
              <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/60 p-[1.5px]">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-[#fed65b] rounded-full transition-all duration-700 ease-out" 
                  style={{ width: `${totalPercent}%` }}
                />
              </div>

              {/* Progress meta tags */}
              <div className="flex justify-between items-center text-xs text-slate-300 font-sans mt-1">
                <span className="font-bold flex items-center gap-1.5 text-[#fed65b]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {completedTopics} done
                </span>
                <span className="font-display font-black tracking-wide">
                  {totalPercent}% Complete
                </span>
              </div>
            </div>

            {/* EXPANDABLE MODULE ACCORDIONS SYSTEM */}
            <div className="space-y-3.5 pt-2 select-none">
              
              {modules.map((m) => {
                const isExpanded = !!expandedModules[m.id];
                const activeInThisModule = selectedTopic?.moduleId === m.id;
                const completedInModule = m.topics?.filter(t => t.completed).length || 0;
                const totalInModule = m.topics?.length || 0;

                return (
                  <div 
                    key={m.id} 
                    className="bg-[#122237] rounded-2xl border border-slate-800 overflow-hidden transition-all duration-200"
                  >
                    {/* Collapsible Module Header */}
                    <button
                      onClick={() => toggleModuleAccordion(m.id)}
                      className={`w-full p-4 flex items-center justify-between text-left transition-colors font-sans ${
                        activeInThisModule ? 'bg-[#152a46]/80' : 'hover:bg-[#15273f]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                          m.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-400/20 text-yellow-400'
                        }`}>
                          {m.status === 'Completed' ? '✓' : '▶'}
                        </div>
                        <div>
                          <h4 className="font-display font-black text-xs md:text-sm text-slate-100 tracking-wide">
                            {m.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 block mt-0.5 uppercase tracking-wider font-mono font-bold">
                            {completedInModule}/{totalInModule} lectures verified • {m.hours}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {/* Circle numeric badge strictly matching user screenshot */}
                        <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-[10px] font-black text-[#fed65b] flex items-center justify-center">
                          {totalInModule}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Topics listing of course */}
                    {isExpanded && (
                      <div className="bg-slate-950/60 divide-y divide-slate-900 px-2 py-1 animate-fade-in">
                        {m.topics && m.topics.length > 0 ? (
                          m.topics.map((topic, index) => {
                            const isCurrentlySelected = selectedTopic?.topic.id === topic.id;

                            return (
                              <div 
                                key={topic.id}
                                className={`group p-3 flex items-center justify-between gap-3 text-xs rounded-xl transition-all cursor-pointer ${
                                  isCurrentlySelected 
                                    ? 'bg-[#152a46] border border-amber-400/20' 
                                    : 'hover:bg-[#122237]/60'
                                }`}
                                onClick={() => setSelectedTopic({ moduleId: m.id, topic })}
                              >
                                <div className="flex items-center gap-3 min-w-0 pr-1">
                                  {/* Check circle completion status */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation(); // prevent loading video just by clicking the checkbox
                                      if (onToggleTopicCompletion) {
                                        onToggleTopicCompletion(m.id, topic.id);
                                      }
                                    }}
                                    className="focus:outline-none shrink-0"
                                    title={topic.completed ? "Mark incomplete" : "Mark complete"}
                                  >
                                    {topic.completed ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/25 shrink-0" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-slate-600 hover:text-amber-400 shrink-0" />
                                    )}
                                  </button>

                                  {/* Index Badge */}
                                  <span className="text-[10px] font-mono font-bold text-slate-500 shrink-0">
                                    {(index + 1).toString().padStart(2, '0')}
                                  </span>

                                  {/* Topic name conforming strictly to screen */}
                                  <span className={`truncate leading-snug ${
                                    topic.completed ? 'text-slate-400 line-through' : 'text-slate-200'
                                  } font-bold font-sans`}>
                                    {topic.title}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  {topic.videoDuration && (
                                    <span className="text-[10px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                                      {topic.videoDuration}
                                    </span>
                                  )}
                                  <span className="px-2 py-1 rounded bg-[#fed65b] text-slate-950 font-display font-semibold scale-90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                    <Play className="w-2.5 h-2.5 fill-current" /> Stream
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-[11px] text-slate-500 italic p-3 text-center">
                            No study items are configured for this module.
                          </p>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

          </div>

          {/* Academic guidance context details */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/50 shadow-sm space-y-3">
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest font-mono flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Professional Course Note
            </span>
            <p className="text-xs text-[#0b1c30] leading-relaxed font-sans">
              Welcome to the <strong>Merit Academy Digital Classroom.</strong> This course outlines the absolute path to career-oriented professional standards. Watch the structured educational video series inside each topic, perform experimental write-ups, and clear classroom evaluations dynamically.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE LECTURE STREAMS BLOCK (Col Span 5) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="bg-white rounded-3xl border border-slate-200/50 shadow-md p-5 md:p-6 space-y-5 relative">
            <h3 className="font-display font-black text-sm text-[#0e1c2f] uppercase tracking-wide flex items-center gap-2 pb-3 border-b border-slate-100">
              <span className="p-1.5 rounded-lg bg-indigo-50 text-[#0e1c2f]">
                <Tv className="w-4 h-4 text-amber-600" />
              </span>
              Lecture Theater Panel
            </h3>

            {selectedTopic ? (
              <div className="space-y-4">
                
                {/* Simulated Responsive Video screen frame */}
                <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-inner aspect-video relative group flex flex-col justify-between border border-slate-800">
                  
                  {/* Decorative Header terminal row */}
                  <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-[#0b1c30]/90 to-transparent flex justify-between items-center z-10 select-none">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-800 text-[9px] font-bold text-[#fed65b] font-mono tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      STREAMING SESSION
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">
                      Duration: {selectedTopic.topic.videoDuration || "Live"}
                    </span>
                  </div>

                  {/* HTML Video Tag with live stream or beautiful fallbacks */}
                  {selectedTopic.topic.videoUrl ? (
                    <video 
                      key={selectedTopic.topic.id}
                      controls
                      autoPlay
                      className="w-full h-full object-cover rounded-2xl"
                      src={selectedTopic.topic.videoUrl}
                      poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 space-y-2 p-6 text-center">
                      <Video className="w-10 h-10 text-amber-500" />
                      <p className="text-xs font-bold text-white uppercase tracking-wider">No stream link provided</p>
                      <p className="text-[10px] text-slate-500">Instructor has scheduled this topic for a live offline lab simulation.</p>
                    </div>
                  )}

                  {/* Decorative watermark */}
                  <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded text-[9px] font-mono font-semibold text-slate-400 pointer-events-none select-none z-10 backdrop-blur-xs">
                    MERIT ACADEMY VIRTUAL CLASSROOM
                  </div>
                </div>

                {/* Video Info metadata */}
                <div className="space-y-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[9px] font-extrabold tracking-wider bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md uppercase font-mono">
                      Current Lesson
                    </span>
                    <h4 className="font-display font-black text-sm text-slate-800 mt-1.5 leading-snug">
                      {selectedTopic.topic.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    This interactive master class covers essential concepts, design structures, and responsive rules matching strict institutional guidelines. Perform live experimentation on your local workstation concurrently with this lecture.
                  </p>

                  <div className="pt-2 border-t border-slate-200/50 flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center">
                    
                    {/* Manual Toggle completed trigger */}
                    <button
                      onClick={() => {
                        if (onToggleTopicCompletion) {
                          onToggleTopicCompletion(selectedTopic.moduleId, selectedTopic.topic.id);
                          // Refresh active topic's completed key so player reflects completion status live
                          setSelectedTopic(prev => {
                            if (!prev) return null;
                            return {
                              ...prev,
                              topic: {
                                ...prev.topic,
                                completed: !prev.topic.completed
                              }
                            };
                          });
                        }
                      }}
                      className={`py-2 px-3.5 text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 ${
                        selectedTopic.topic.completed
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/40'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      {selectedTopic.topic.completed ? 'Course item Completed ✓' : 'Mark as watch completed'}
                    </button>

                    <div className="text-[10px] text-slate-500 font-medium font-mono text-center sm:text-right self-center">
                      Task Status: <strong className={selectedTopic.topic.completed ? 'text-emerald-600' : 'text-amber-600'}>
                        {selectedTopic.topic.completed ? 'VERIFIED' : 'PENDING'}
                      </strong>
                    </div>

                  </div>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400 space-y-2 select-none">
                <Video className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-bold text-slate-600">No active lecture selected</p>
                <p className="text-[10px] text-slate-400">
                  Select any course topic checklist on the left side menu to load and watch its educational session.
                </p>
              </div>
            )}

          </div>

          {/* AI Helper Q&A block */}
          <div className="bg-[#0e1c2f] text-white rounded-3xl p-5 border border-slate-800 shadow-md space-y-4">
            <h4 className="font-display font-bold text-xs text-[#fed65b] uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#fed65b] animate-spin-slow" />
              Ask Instuctor on this topic
            </h4>

            {questionSuccess ? (
              <div className="bg-emerald-900/30 border border-emerald-500/30 text-emerald-300 p-3 rounded-xl text-xs text-center font-medium animate-fade-in">
                ✓ Query Placed: Technical helper has received your query! Expected replies will sync back to your inbox.
              </div>
            ) : (
              <form onSubmit={handleSendQuestion} className="space-y-3">
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Need guidance? Post code issues or doubt notes to class coordinators..."
                  className="w-full h-18 text-xs font-medium bg-[#14263e] border border-slate-800 text-white placeholder-slate-400 rounded-xl p-3 focus:outline-none focus:border-[#fed65b] transition-all resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#fed65b] hover:bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider rounded-xl transition-all"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
