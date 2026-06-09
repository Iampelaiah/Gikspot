import React, { useState, useEffect, useRef } from "react";
import { 
  Cpu, Terminal, Layers, Music, Radio, Tv, Play, Pause, ChevronRight, 
  Send, Server, RefreshCw, Layers3, CheckCircle, Database, HelpCircle, 
  ArrowUpRight, Activity, Disc, Volume2, Wifi, ShieldAlert, Calendar, 
  Clock, User, Award, PlusCircle, BarChart2, DollarSign, Users, 
  ExternalLink, ArrowRight, ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { 
  MusicTrack, VideoShowcase, Fashionitem, CourseModule, TelemetryLog, ClientArchitectureResult 
} from "./types";
import { MOCK_TRACKS, MOCK_VIDEOS, MOCK_FASHION, INTRO_COURSES, COMMUNITY_CORNER_NOTES, STACKS } from "./data";

export default function App() {
  // Main workspace Category Tabs matching the mockup:
  // 1. MUSIC (Studio: Audio Distro & Playback)
  // 2. APPAREL (Studio: Tech Wear RFID & blueprints)
  // 3. SANDBOX (Labs: ECU & Automotive simulation)
  // 4. ARCHITECT (Labs: Gemini Cognitive Core Design)
  // 5. DATA BOARD (Labs: Enterprise Support & ERP Analytics)
  const [activeWorkspace, setActiveWorkspace] = useState<"MUSIC" | "APPAREL" | "SANDBOX" | "ARCHITECT" | "SUPPORT">("MUSIC");

  // Selection state within each division
  const [selectedTrack, setSelectedTrack] = useState<MusicTrack>(MOCK_TRACKS[0]);
  const [selectedFashion, setSelectedFashion] = useState<Fashionitem>(MOCK_FASHION[0]);
  const [selectedCourse, setSelectedCourse] = useState<CourseModule>(INTRO_COURSES[0]);
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState<number>(0);

  // Music Player Simulation
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(35);
  const [distroLogs, setDistroLogs] = useState<string[]>([
    "// PIPELINE_INIT: Gikspot audio core loaded successfully.",
    "// NET_GATEWAY: Secure streaming endpoint verified."
  ]);

  // Apparel RFID Simulator
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingResult, setPingResult] = useState<string | null>(null);

  // ECU Automotive Hardware Simulator
  const [ecuAddress, setEcuAddress] = useState<string>("0x1A4F");
  const [ecuOverride, setEcuOverride] = useState<string>("0xFF");
  const [ecuTerminalOutput, setEcuTerminalOutput] = useState<string[]>([
    "// SANDBOX v1.02 ready. Live Diagnostic ECU simulator loaded.",
    "// Instruction: Specify bus frame address register below, select READ ADDR NODE."
  ]);
  const [isReadingEcu, setIsReadingEcu] = useState<boolean>(false);
  const [canBusLoad, setCanBusLoad] = useState<number>(34);

  // AI Architect Workspace State
  const [requirementsText, setRequirementsText] = useState<string>(
    "Build a high-volume audio transcoding pipeline that automatically deploys creative assets to distributors and processes Web3 metadata tags on the fly."
  );
  const [isLoadingArch, setIsLoadingArch] = useState<boolean>(false);
  const [architectResult, setArchitectResult] = useState<ClientArchitectureResult | null>(null);

  // Support Scheduler Forms
  const [mentorSubject, setMentorSubject] = useState<string>("Systems Engineering / Embedded C");
  const [studentName, setStudentName] = useState<string>("");
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [isSchedulerSuccess, setIsSchedulerSuccess] = useState<boolean>(false);

  // Background Live Telemetry Tickers
  const [telemetryLogs, setTelemetryLogs] = useState<TelemetryLog[]>([
    { id: "1", timestamp: "11:20:01", node: "SYS_ECU_MGR", status: "OK", frequency: "74.71 MHz" },
    { id: "2", timestamp: "11:20:02", node: "LOM_STATE_A", status: "STABLE", frequency: "16.92 MHz" },
    { id: "3", timestamp: "11:20:03", node: "TX_GRID_BUS", status: "BUSY", frequency: "60.01 MHz" },
    { id: "4", timestamp: "11:20:04", node: "WAV_RENDERER", status: "OK", frequency: "48.00 KHz" }
  ]);
  const [stabilityVal, setStabilityVal] = useState<number>(99.98);
  const [clusterLoadVal, setClusterLoadVal] = useState<number>(68);

  // Real-time server telemetry simulation state loops
  useEffect(() => {
    const telemetryTimer = setInterval(() => {
      const timeStr = new Date().toUTCString().slice(17, 25);
      const randomNode = ["SYS_ECU_MGR", "LOM_STATE_A", "TX_GRID_BUS", "WAV_RENDERER", "NODE_CAN_0x4F", "NFC_EMB_TTY"][Math.floor(Math.random() * 6)];
      const randomStatus = (["OK", "STABLE", "BUSY", "WARNING"] as const)[Math.floor(Math.random() * 4)];
      const randomFreq = `${(12 + Math.random() * 88).toFixed(2)} ${Math.random() > 0.5 ? "MHz" : "FPS"}`;
      
      const newLog: TelemetryLog = {
        id: Math.random().toString(),
        timestamp: timeStr,
        node: randomNode,
        status: randomStatus,
        frequency: randomFreq
      };

      setTelemetryLogs(prev => [newLog, ...prev.slice(0, 3)]);
      
      setStabilityVal(prev => {
        const nextVal = prev + (Math.random() * 0.02 - 0.01);
        return parseFloat(Math.min(100, Math.max(99.4, nextVal)).toFixed(2));
      });
      
      setClusterLoadVal(prev => {
        const delta = Math.floor(Math.random() * 6) - 3;
        return Math.min(92, Math.max(50, prev + delta));
      });
    }, 3000);

    return () => clearInterval(telemetryTimer);
  }, []);

  // Music Player Transcoding Log Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            const actions = [
              `[TRANSCODE] Rendered 32-bit floating WAV master for '${selectedTrack.title}'`,
              `[ENCODE] Compressing high-fidelity AAC containers ... 100% OK`,
              `[METADATA] Generated secure cryptographic ISRC tag: GIK-M-${Math.floor(10000 + Math.random() * 90000)}`,
              `[DISTRIBUTION] Deployed master stems to Helsinki Concept Node.`,
              `[ROYALTY_ROUTING] Contract split registered securely inside Tokyo private Ledger.`
            ];
            const randomMsg = actions[Math.floor(Math.random() * actions.length)];
            setDistroLogs((prevLogs) => [
              `[${new Date().toLocaleTimeString()}] ${randomMsg}`,
              ...prevLogs.slice(0, 4)
            ]);
            return 0;
          }
          return prev + 1.2;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedTrack]);

  // CAN bus state random variations
  useEffect(() => {
    const interval = setInterval(() => {
      setCanBusLoad(() => Math.floor(22 + Math.random() * 15));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Preset templates for the AI Architect
  const qTemplates = [
    { title: "Embedded CAN bus telemetry", body: "Designing a low-latency telemetry parsing engine for high-speed automotive ECU data with cloud redundancy..." },
    { title: "Music distribution pipeline", body: "Build a high-volume audio transcoding pipeline that automatically deploys creative assets to distributors and processes Web3 metadata tags on the fly." },
    { title: "Interactive lookbook with RFID", body: "Create an e-commerce fashion lookbook with active RFID scan feeds, stock management triggers, and dynamic CAD pattern compilers." },
    { title: "Vocational developers framework", body: "A business mentoring portal for tech savvy communities offering standard curriculum logs, student progress diagnostics, and postgres ERP endpoints." }
  ];

  // Trigger real backend AI compiler with API
  const triggerArchitectQuery = async (reqString: string) => {
    if (!reqString || reqString.trim() === "") return;
    setIsLoadingArch(true);
    setArchitectResult(null);

    try {
      const response = await fetch("/api/architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requirements: reqString, divisionType: activeWorkspace === "ARCHITECT" ? "Joint" : "Labs" })
      });
      const data = await response.json();
      setArchitectResult(data);
    } catch (error) {
      console.error("Architect query error:", error);
    } finally {
      setIsLoadingArch(false);
    }
  };

  // Trigger simulated apparel scan
  const triggerNfcPing = () => {
    setIsPinging(true);
    setPingResult(null);
    setTimeout(() => {
      setIsPinging(false);
      setPingResult(`// INTERRUPT_NFC_0x200 [SUCCESS] | TAG_UID: ${selectedFashion.tagId} | DISPATCH_NODE: ${selectedFashion.distroChannels[0]} | TEMP: ${(21 + Math.random()*4).toFixed(1)}°C`);
    }, 1000);
  };

  // Trigger ECU Bus Read state
  const handleReadEcu = () => {
    setIsReadingEcu(true);
    setEcuTerminalOutput((prev) => [`[${new Date().toLocaleTimeString()}] [BUS] Intercepting chassis address ${ecuAddress}...`, ...prev]);
    setTimeout(() => {
      setIsReadingEcu(false);
      const hexVal = Math.floor(Math.random() * 255).toString(16).toUpperCase();
      setEcuTerminalOutput((prev) => [
        `[${new Date().toLocaleTimeString()}] [SUCCESS] Read Diagnostic: CHASSIS_FRAME_OK (0x${hexVal})`,
        `[${new Date().toLocaleTimeString()}] [CAN_COM] BUS_LINE_01 STATE: 2C 42 ${hexVal} FF 12 A9 09`,
        ...prev
      ]);
    }, 700);
  };

  // Trigger ECU Custom Injections
  const handleInjectEcu = () => {
    if (!ecuOverride) return;
    setEcuTerminalOutput((prev) => [
      `[${new Date().toLocaleTimeString()}] [MANUAL_INJECT] Direct-patching register ${ecuAddress} --> ${ecuOverride}`,
      `[${new Date().toLocaleTimeString()}] [SUCCESS] Custom bus message integrated into ECU cluster state files.`,
      ...prev
    ]);
  };

  // Mentorship advisory form submit
  const handleSchedulerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) return;
    setIsSchedulerSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#040608] text-[#f1f5f9] select-none cyber-grid px-4 py-6 md:p-10 relative overflow-x-hidden antialiased">
      
      {/* Visual glowing orbs referencing the high-end digital design */}
      <div className="absolute top-[-300px] left-[-300px] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-200px] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* ================= HEADER SECTION ================= */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#182335]/70 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-[#00f2fe] p-[1px]">
              <div className="w-full h-full bg-[#040608] rounded-xl flex items-center justify-center">
                <span className="w-3.5 h-3.5 bg-cyan-400 rounded-sm animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-widest text-white uppercase">
                gikspot
              </span>
              <span className="font-mono text-[9px] text-[#00b4d8] uppercase tracking-widest block font-bold mt-0.5">
                // SYSTEM CONTROL HUB
              </span>
            </div>
          </div>

          {/* Quick Realtime Active Metrics */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden md:flex items-center gap-2 bg-[#0c121b] border border-[#1b2533] px-3.5 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-400">STA STABILITY: <strong className="text-white font-bold">{stabilityVal}%</strong></span>
            </div>
            <div className="hidden lg:flex items-center gap-2 bg-[#0c121b] border border-[#1b2533] px-3.5 py-1.5 rounded-xl">
              <span className="text-slate-400">SYS LOAD: <strong className="text-cyan-400 font-bold">{clusterLoadVal}%</strong></span>
            </div>
            <div className="bg-[#00b4d8]/10 text-[#00b4d8] border border-[#00b4d8]/30 px-4 py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase">
              CORES SECURE // 2026
            </div>
          </div>
        </header>


        {/* ================= ECOSYSTEM EXPLAINER BANNER ================= */}
        <section className="bg-gradient-to-r from-[#0c131a] to-[#060a0f] border border-[#1d2a3c]/60 p-6 rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-500/[0.02] pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 border border-cyan-500/20 bg-cyan-950/20 px-3 py-1 rounded-full font-mono text-[9px] text-cyan-400 uppercase tracking-widest font-bold">
                🛠️ INTEGRATED GIKSPOT ENVIRONMENT
              </div>
              <h1 className="font-display font-bold text-2xl md:text-4xl text-white tracking-tight uppercase leading-none">
                BUILD SECURE SYSTEMS <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#00f2fe]">WITH OUR LABS & STUDIO_</span>
              </h1>
              <p className="font-sans text-xs text-slate-400 max-w-4xl leading-relaxed">
                Welcome to the complete Gikspot ecosystem workspace. Check out our high-performance streams: 
                <strong> Gikspot Studio</strong> automates your digital assets: lossless audio transcode pipelines, youtube showcases, and physical RFID smart-fashion layouts. 
                <strong> Gikspot Labs</strong> provides executive business management, vocational training in custom hardware/software controllers, and enterprise system consulting.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-end gap-3 font-mono text-xs">
              <button 
                onClick={() => {
                  setActiveWorkspace("ARCHITECT");
                  setRequirementsText("Build an enterprise telemetry dashboard for real-time CAN bus telemetry parsed over highly available cluster.");
                }} 
                className="px-5 py-3 h-12 rounded-xl bg-[#0c1117] hover:bg-[#121922] border border-[#1a2533] hover:border-cyan-400/50 text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all text-[11px] font-bold cursor-pointer"
              >
                <span>ARCHITECT</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
              <button 
                onClick={() => {
                  setActiveWorkspace("SANDBOX");
                }}
                className="px-5 py-3 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-[#008fc6] hover:scale-[1.02] text-[#070a0e] flex items-center justify-center gap-1.5 transition-all text-[11px] font-bold shadow-lg shadow-cyan-450/15 cursor-pointer"
              >
                <span>PLAY SANDBOX</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </div>
        </section>


        {/* ================= CORE STATISTICS TELEMETRY ROW ================= */}
        {/* Mirroring the overdue, average time, disponible metrics row of the requested high-contrast tablet aesthetic */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Tile 1: Active Streams */}
          <div className="bg-[#0c1117] rounded-[2rem] p-6 border border-[#1b2533] relative overflow-hidden group hover:border-cyan-400/20 transition-all flex flex-col justify-between h-[155px]">
            <div>
              <div className="flex justify-between items-center text-slate-450 font-mono text-[10px] uppercase tracking-wider">
                <span>ACTIVE STREAMS // STUDIO</span>
                <Music className="w-4 h-4 text-[#00b4d8]" />
              </div>
              <div className="font-display font-black text-3xl text-white mt-2">14 Nodes</div>
              <p className="font-mono text-[9px] text-slate-550 mt-1 uppercase tracking-wider">Automated Wave Transcoding</p>
            </div>
            <div className="space-y-1 mt-2">
              <div className="h-1 bg-[#121820] rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full w-3/4" />
              </div>
              <div className="flex justify-between font-mono text-[8px] text-slate-550 uppercase">
                <span>Lossless WAV</span>
                <span>75% Capacity</span>
              </div>
            </div>
          </div>

          {/* Tile 2: Contract Retainers */}
          <div className="bg-[#0c1117] rounded-[2rem] p-6 border border-[#1b2533] relative overflow-hidden group hover:border-cyan-400/20 transition-all flex flex-col justify-between h-[155px]">
            <div>
              <div className="flex justify-between items-center text-slate-450 font-mono text-[10px] uppercase tracking-wider">
                <span>CONTRACT RETAINERS // LABS</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="font-display font-black text-3xl text-white mt-1">$172,560</div>
              <p className="font-mono text-[9px] text-slate-550 mt-1 uppercase tracking-wider">Professional Services</p>
            </div>
            
            {/* Avatars init stack from metadata */}
            <div className="flex items-center justify-between text-xs pt-1.5">
              <div className="flex -space-x-2">
                <span className="w-6 h-6 rounded-full bg-slate-800 border border-[#0c1117] text-[8px] font-bold text-slate-200 flex items-center justify-center font-mono">LJ</span>
                <span className="w-6 h-6 rounded-full bg-cyan-950 border border-[#0c1117] text-[8px] font-bold text-[#00b4d8] flex items-center justify-center font-mono">SK</span>
                <span className="w-6 h-6 rounded-full bg-slate-800 border border-[#0c1117] text-[8px] font-bold text-slate-200 flex items-center justify-center font-mono">VR</span>
                <span className="w-6 h-6 rounded-full bg-[#12222a] border border-[#0c1117] text-[8px] font-bold text-cyan-400 flex items-center justify-center font-mono">MC</span>
                <span className="w-6 h-6 rounded-full bg-zinc-900 border border-[#0c1117] text-[8px] font-medium text-slate-550 flex items-center justify-center font-mono">+3</span>
              </div>
              <span className="font-mono text-[9px] text-[#00b4d8] font-bold">99% Delivery SLA</span>
            </div>
          </div>

          {/* Tile 3: Avg Deploy Latency */}
          <div className="bg-[#0c1117] rounded-[2rem] p-6 border border-[#1b2533] relative overflow-hidden group hover:border-cyan-400/20 transition-all flex flex-col justify-between h-[155px]">
            <div>
              <div className="flex justify-between items-center text-slate-450 font-mono text-[10px] uppercase tracking-wider">
                <span>DEPLOYMENT LATENCY // CORE</span>
                <Activity className="w-4 h-4 text-[#00b4d8] animate-pulse" />
              </div>
              <div className="font-display font-black text-3xl text-white mt-2">12 ms</div>
              <p className="font-mono text-[9px] text-slate-550 mt-1 uppercase tracking-wider">STABLE telemetry</p>
            </div>
            {/* Sparkline simulation using pure animated SVG lines */}
            <div className="h-6 w-full mt-2 relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                <motion.path 
                  d="M 0 15 Q 10 2 20 18 T 40 8 T 60 16 T 80 4 T 100 12" 
                  fill="none" 
                  stroke="#00b4d8" 
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                />
              </svg>
            </div>
          </div>

          {/* Tile 4: Available instant balance (Mirroring the payout instant balance) */}
          <div className="bg-[#0c1117] rounded-[2rem] p-6 border border-[#1b2533] relative overflow-hidden group hover:border-cyan-400/20 transition-all flex flex-col justify-between h-[155px]">
            <div>
              <div className="flex justify-between items-center text-slate-450 font-mono text-[10px] uppercase tracking-wider">
                <span>SANDBOX DEVELOPMENT POOL</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="font-display font-black text-3xl text-white mt-2">$214,390 USD</div>
            </div>
            
            <div className="flex items-center justify-between gap-2.5 pt-1 border-t border-[#16212e]">
              <div className="flex gap-1.5 font-mono text-[8px] text-slate-400">
                <span className="bg-[#101822] px-1.5 py-0.5 rounded border border-[#1b2533]">Stripe</span>
                <span className="bg-[#101822] px-1.5 py-0.5 rounded border border-[#1b2533]">Paypal</span>
              </div>
              <button 
                onClick={() => {
                  alert("Register Retainer triggered: Redirecting client authentication ledger node to your Stripe configuration container.");
                }}
                className="bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full text-[9px] font-mono leading-none tracking-widest uppercase font-black transition-all cursor-pointer"
              >
                PAY OUT NOW
              </button>
            </div>
          </div>

        </section>


        {/* ================= HIGH CONTRAST MAIN SPLIT INTERACTIVE WORKSPACE ================= */}
        <section className="space-y-6">
          
          {/* Top category tabs capsule. Pristine layout mirroring the elegant white capsule row */}
          <div className="bg-[#f1f5f9] border border-slate-200 text-slate-800 rounded-full p-1.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-1 max-w-4xl mx-auto shadow-2xl overflow-x-auto">
            {([
              { id: "MUSIC", label: "🎵 STUDIO MUSIC", sub: "Pipeline" },
              { id: "APPAREL", label: "📐 APPAREL NFC", sub: "Wearables" },
              { id: "SANDBOX", label: "💻 CHASSIS LAB", sub: "Simulator" },
              { id: "ARCHITECT", label: "🤖 COGNITIVE CORE", sub: "AI Designer" },
              { id: "SUPPORT", label: "📋 BACKLOG notes", sub: "Mentoring & ERP" }
            ] as const).map((tab) => {
              const isActive = activeWorkspace === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveWorkspace(tab.id);
                  }}
                  className={`w-full text-center py-2.5 sm:py-3 px-4 rounded-full font-mono text-[10px] sm:text-[11px] font-black tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? "bg-[#090d14] border border-[#090d14] text-white font-black shadow-lg" 
                      : "text-slate-500 hover:text-slate-900 font-bold"
                  }`}
                >
                  {tab.label}
                  <span className={`text-[8.5px] px-1.5 py-0.25 rounded font-black hidden lg:inline ${isActive ? "bg-cyan-500/20 text-[#00b4d8]" : "bg-slate-200 text-slate-600"}`}>
                    {tab.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Core Dual Column Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ================= LEFT COLUMN: THE WHITE MODERNIST WORKSPACE ================= */}
            {/* Matches the clean aesthetic of the white list box in the reference image */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-[2.5rem] p-6 shadow-2xl relative min-h-[580px] flex flex-col justify-between border border-slate-100">
              
              <div className="space-y-5">
                
                {/* Section Title */}
                <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                  <div>
                    <span className="font-mono text-[8px] text-[#00b4d8] uppercase tracking-widest font-black block">
                      // ACTIVE SEGMENT INDEX
                    </span>
                    <h2 className="font-display font-black text-lg text-slate-900 uppercase tracking-tight mt-0.5">
                      {activeWorkspace === "MUSIC" && "Music Buffer Stems"}
                      {activeWorkspace === "APPAREL" && "NFC Smart Apparel Outlets"}
                      {activeWorkspace === "SANDBOX" && "ECE Vocational Sandboxes"}
                      {activeWorkspace === "ARCHITECT" && "AI Architectural Presets"}
                      {activeWorkspace === "SUPPORT" && "Team Log Board / Advice"}
                    </h2>
                  </div>
                  
                  <span className="font-mono text-[9px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold">
                    {activeWorkspace === "MUSIC" && `${MOCK_TRACKS.length} buffers`}
                    {activeWorkspace === "APPAREL" && `${MOCK_FASHION.length} prototypes`}
                    {activeWorkspace === "SANDBOX" && `${INTRO_COURSES.length} courses`}
                    {activeWorkspace === "ARCHITECT" && `${qTemplates.length} prompts`}
                    {activeWorkspace === "SUPPORT" && `${COMMUNITY_CORNER_NOTES.length} posts`}
                  </span>
                </div>

                {/* Sub-Selection Lists depending on selected Category */}
                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                  
                  {/* ====== MUSIC TAB ====== */}
                  {activeWorkspace === "MUSIC" && MOCK_TRACKS.map((track) => {
                    const isSelected = selectedTrack.id === track.id;
                    return (
                      <motion.button
                        whileHover={{ y: -1, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        key={track.id}
                        onClick={() => {
                          setSelectedTrack(track);
                          setAudioProgress(0);
                          setIsPlaying(false);
                          setDistroLogs(prev => [`[${new Date().toLocaleTimeString()}] [BUFFER] Switched audio route: ${track.title}`, ...prev]);
                        }}
                        className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between gap-4 transition-all ${
                          isSelected 
                            ? "bg-slate-50 border-slate-300 text-slate-900 shadow-md" 
                            : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                            isSelected ? "bg-[#090d14] text-white" : "bg-slate-100 text-slate-500"
                          }`}>
                            {track.id.substring(3)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-sans font-extrabold text-xs text-slate-900 truncate">{track.title}</h4>
                            <p className="font-mono text-[9.5px] text-slate-500 truncate mt-0.5">{track.artist}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-mono uppercase font-black tracking-wider ${
                            isSelected ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                          }`}>
                            {isSelected ? "Active Stream" : track.bpm + " BPM"}
                          </span>
                          <span className="font-mono text-[9px] text-slate-400">{track.duration}</span>
                        </div>
                      </motion.button>
                    );
                  })}

                  {/* ====== APPAREL TAB ====== */}
                  {activeWorkspace === "APPAREL" && MOCK_FASHION.map((item) => {
                    const isSelected = selectedFashion.id === item.id;
                    return (
                      <motion.button
                        whileHover={{ y: -1, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        key={item.id}
                        onClick={() => {
                          setSelectedFashion(item);
                          setPingResult(null);
                        }}
                        className={`w-full p-4 rounded-2xl text-left border flex items-center justify-between gap-4 transition-all ${
                          isSelected 
                            ? "bg-slate-50 border-slate-300 text-slate-900 shadow-md" 
                            : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                            isSelected ? "bg-[#090d14] text-white" : "bg-slate-100 text-slate-500"
                          }`}>
                            CAD
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-sans font-extrabold text-xs text-slate-900 truncate">{item.name}</h4>
                            <p className="font-mono text-[9px] text-slate-500 truncate mt-0.5">{item.season}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className="bg-[#00b4d8]/10 text-[#00b4d8] px-2 py-0.5 rounded-full text-[8px] font-mono leading-none font-bold">
                            {item.tagId}
                          </span>
                          <span className="font-mono text-[9.5px] text-slate-400">STOCK: {item.inventory}</span>
                        </div>
                      </motion.button>
                    );
                  })}

                  {/* ====== SANDBOX TAB ====== */}
                  {activeWorkspace === "SANDBOX" && INTRO_COURSES.map((course) => {
                    const isSelected = selectedCourse.id === course.id;
                    return (
                      <motion.button
                        whileHover={{ y: -1, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        key={course.id}
                        onClick={() => {
                          setSelectedCourse(course);
                        }}
                        className={`w-full p-4 rounded-2xl text-left border flex flex-col gap-2 transition-all ${
                          isSelected 
                            ? "bg-slate-50 border-slate-300 text-slate-900 shadow-md" 
                            : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-black leading-none">
                            {course.id.toUpperCase()} • STATIONS
                          </span>
                          <span className="bg-slate-100 text-slate-700 font-mono text-[9px] px-2.5 py-0.5 rounded-full font-bold">
                            {course.duration}
                          </span>
                        </div>

                        <h4 className="font-sans font-extrabold text-xs text-slate-900">{course.title}</h4>
                        
                        <div className="flex flex-wrap gap-1 mt-1">
                          {course.skills.slice(0, 3).map((sk) => (
                            <span key={sk} className="font-mono text-[8.5px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </motion.button>
                    );
                  })}

                  {/* ====== AI ARCHITECT TEMPLATES ====== */}
                  {activeWorkspace === "ARCHITECT" && qTemplates.map((tp, idx) => {
                    const isSelected = selectedTemplateIdx === idx;
                    return (
                      <motion.button
                        whileHover={{ y: -1, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        key={idx}
                        onClick={() => {
                          setSelectedTemplateIdx(idx);
                          setRequirementsText(tp.body);
                        }}
                        className={`w-full p-4 rounded-2xl text-left border flex flex-col gap-2 transition-all ${
                          isSelected 
                            ? "bg-slate-50 border-slate-300 text-slate-900 shadow-md" 
                            : "bg-white border-slate-100 text-slate-600 hover:border-slate-200"
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="font-mono text-[9px] text-[#00b4d8] uppercase tracking-widest font-black">
                            // PRESET 0{idx + 1}
                          </span>
                          <span className="font-mono text-[8px] bg-slate-150 text-slate-600 px-1.5 py-0.25 rounded font-black uppercase">
                            GEMINI CORE
                          </span>
                        </div>
                        <h4 className="font-sans font-extrabold text-xs text-slate-900">{tp.title}</h4>
                        <p className="font-sans text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{tp.body}</p>
                      </motion.button>
                    );
                  })}

                  {/* ====== REGISTER DEPT ENQUIRIES & COMMENTS ====== */}
                  {activeWorkspace === "SUPPORT" && (
                    <div className="space-y-4">
                      <span className="font-mono text-[10px] tracking-wider font-extrabold text-slate-500 uppercase block">
                        // SECURE MEMBER DIARIES
                      </span>
                      <div className="space-y-3.5">
                        {COMMUNITY_CORNER_NOTES.map((note) => (
                          <div key={note.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-mono font-extrabold text-xs text-slate-900">{note.author}</span>
                              <span className="font-mono text-[8px] bg-[#00b4d8]/10 text-[#00b4d8] border border-[#00b4d8]/20 px-2 py-0.5 rounded-full font-black uppercase">
                                {note.role}
                              </span>
                            </div>
                            <p className="font-sans text-xs text-slate-600 leading-relaxed italic">{note.content}</p>
                            <span className="font-mono text-[8.5px] text-slate-400 block text-right uppercase tracking-widest">{note.timestamp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Secure Footer Segment matching the subtle design detail of the reference diagram */}
              <div className="border-t border-slate-100 pt-5 mt-5 flex justify-between items-center text-slate-400 font-mono text-[9.5px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block animate-pulse" />
                  <span>LOCAL DIRECTORY READY</span>
                </div>
                <span>NODE-GRP: G1 // ADDR_0x00A</span>
              </div>

            </div>


            {/* ================= RIGHT COLUMN: THE SLATE CYBER-INDUSTRIAL PANEL ================= */}
            {/* Dark immersive view with play buttons, slider timelines, terminal outputs, diagnostic tools */}
            <div className="lg:col-span-7 bg-[#0e131a] text-slate-100 rounded-[2.5rem] p-7 border border-[#1e2a3b]/60 shadow-2xl relative min-h-[580px] flex flex-col justify-between">
              
              <div className="space-y-6">

                {/* Sub-Header Node */}
                <div className="flex justify-between items-center border-b border-[#182335] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-[#00b4d8]/10 rounded-xl border border-[#00b4d8]/20">
                      {activeWorkspace === "MUSIC" && <Music className="w-4 h-4 text-[#00b4d8]" />}
                      {activeWorkspace === "APPAREL" && <Layers className="w-4 h-4 text-[#00b4d8]" />}
                      {activeWorkspace === "SANDBOX" && <Terminal className="w-4 h-4 text-[#00b4d8]" />}
                      {activeWorkspace === "ARCHITECT" && <Cpu className="w-4 h-4 text-[#00b4d8]" />}
                      {activeWorkspace === "SUPPORT" && <Calendar className="w-4 h-4 text-[#00b4d8]" />}
                    </div>
                    <div>
                      <span className="font-mono text-[9px] text-[#00b4d8] uppercase tracking-widest font-black block">
                        {activeWorkspace === "MUSIC" && "// STUDIO_TRANSCODER_NODE"}
                        {activeWorkspace === "APPAREL" && "// Blueprints & Wearable Node"}
                        {activeWorkspace === "SANDBOX" && "// ECU chassis sandboxed terminal"}
                        {activeWorkspace === "ARCHITECT" && "// COGNITIVE BUILD ENGINE"}
                        {activeWorkspace === "SUPPORT" && "// ADVISORY COHORT PORTAL"}
                      </span>
                      <h3 className="font-display font-medium text-xs tracking-wider text-slate-300 uppercase leading-none mt-0.5">
                        {activeWorkspace === "MUSIC" && "Lossless Wave Transcoding Simulator"}
                        {activeWorkspace === "APPAREL" && "NFC/RFID Embedded Tag Config"}
                        {activeWorkspace === "SANDBOX" && "Live Microcontroller Simulator"}
                        {activeWorkspace === "ARCHITECT" && "Gemini System Blueprint Compiler"}
                        {activeWorkspace === "SUPPORT" && "Advisory scheduler and ERP indicator"}
                      </h3>
                    </div>
                  </div>

                  <span className="font-mono text-[9px] text-[#00b4d8] bg-[#0d1622] px-2.5 py-1 rounded border border-[#00b4d8]/20 font-bold uppercase tracking-wider">
                    {activeWorkspace === "MUSIC" && "24-Bit / FLAC"}
                    {activeWorkspace === "APPAREL" && "ISO_15693"}
                    {activeWorkspace === "SANDBOX" && "Bus active"}
                    {activeWorkspace === "ARCHITECT" && "gemini-3.5"}
                    {activeWorkspace === "SUPPORT" && "ISO 27001"}
                  </span>
                </div>


                {/* Dynamic Screen Inner Interfaces depending on workspace tab */}
                <div>
                  
                  {/* ====== MUSIC INTERACTION SYSTEM ====== */}
                  {activeWorkspace === "MUSIC" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <span className="font-mono text-[9px] px-2 py-0.5 bg-[#0d1622] text-[#00b4d8] border border-[#00b4d8]/20 rounded font-bold uppercase tracking-wider">
                            {selectedTrack.genre}
                          </span>
                          <h4 className="font-display font-bold text-lg tracking-tight text-white mt-3 leading-snug">
                            {selectedTrack.title}
                          </h4>
                          <p className="font-sans text-xs text-slate-450 mt-1 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-cyan-400" />
                            {selectedTrack.artist}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-950/20 px-2.5 py-0.5 rounded border border-cyan-500/25">
                            {selectedTrack.bpm} BPM
                          </span>
                          <span className="font-mono text-[8px] text-slate-500 block mt-1 uppercase">Stems Verified</span>
                        </div>
                      </div>

                      {/* Moving Equalizer Visual Bars */}
                      <div className="flex items-end gap-[4px] h-14 bg-[#0a0f15]/90 px-3.5 py-2 rounded-2xl border border-[#1c2838] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-red-500/[0.03] h-0.5 pointer-events-none" />
                        {Array.from({ length: 32 }).map((_, i) => {
                          const randomHeight = isPlaying ? Math.floor(10 + Math.random() * 85) : 8;
                          return (
                            <motion.div
                              key={i}
                              animate={{ height: `${randomHeight}%` }}
                              transition={{ type: "spring", stiffness: 280, damping: 14 }}
                              className="flex-1 bg-gradient-to-t from-[#005f73] to-[#00b4d8] rounded-t-[1.5px]"
                            />
                          );
                        })}
                      </div>

                      {/* Audio playback progress slider */}
                      <div className="space-y-2">
                        <div 
                          className="h-1.5 bg-[#121c26] rounded-full overflow-hidden cursor-pointer relative" 
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const pct = Math.min(100, Math.max(0, (clickX / rect.width) * 100));
                            setAudioProgress(pct);
                          }}
                        >
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-400 to-[#00f2fe]"
                            style={{ width: `${audioProgress}%` }}
                          />
                        </div>
                        <div className="flex justify-between font-mono text-[9px] text-slate-400">
                          <span className="text-cyan-400">0:{(Math.floor((audioProgress * 2) / 60))} / {selectedTrack.duration}</span>
                          <span className="text-slate-500">SAMPLING STATE OVERRIDE OK</span>
                        </div>
                      </div>

                      {/* Transcoder triggers */}
                      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#0a0f15] p-3.5 rounded-xl border border-[#182335]">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setIsPlaying(!isPlaying);
                            setDistroLogs(prev => [`[${new Date().toLocaleTimeString()}] Pipeline state changed: ${!isPlaying ? "RUNNING" : "HALTED"}`, ...prev]);
                          }}
                          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                            isPlaying 
                              ? "bg-red-500/20 text-red-400 border border-red-500/30" 
                              : "bg-gradient-to-r from-cyan-500 to-[#008da8] text-[#070a0e]"
                          }`}
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-4 h-4 fill-current" />
                              <span>HALT TRANSLATION</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                              <span>DEPLOY BROADCAST_</span>
                            </>
                          )}
                        </motion.button>

                        <div className="flex items-center gap-2 text-slate-400 font-mono text-[9.5px]">
                          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                          <span>VOL: <strong className="text-cyan-400">100% SECURE</strong></span>
                        </div>
                      </div>

                      {/* Realtime Transcode logs matching details */}
                      <div className="bg-[#06090d] border border-[#1b2533] p-4 rounded-xl space-y-2">
                        <div className="flex items-center gap-2 pb-1.5 border-b border-[#121922]">
                          <Terminal className="w-3.5 h-3.5 text-slate-500" />
                          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-[#00b4d8]">
                            // REALTIME CORE PIPELINE TELEMETRY
                          </span>
                        </div>
                        <div className="font-mono text-[9.5px] space-y-1.5 text-slate-400 max-h-[105px] overflow-y-auto">
                          {distroLogs.map((log, idx) => (
                            <div key={idx} className="truncate">
                              <span className="text-[#00b4d8] opacity-75">&gt;&gt;</span> {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}


                  {/* ====== APPAREL WEARABLES SYSTEM ====== */}
                  {activeWorkspace === "APPAREL" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-start border-b border-[#182335] pb-3">
                        <div>
                          <h4 className="font-display text-base font-bold text-white tracking-wide">{selectedFashion.name}</h4>
                          <p className="font-mono text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{selectedFashion.season} Series Configuration</p>
                        </div>
                        <span className="font-mono text-[9px] px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                          RFID_STATE_SECURE
                        </span>
                      </div>

                      {/* CAD blue-prints list & active channels */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#0a0f15]/80 p-4 rounded-2xl border border-[#182335] space-y-2">
                          <span className="font-mono text-[9px] tracking-wider font-black text-slate-500 uppercase block">
                            // CAD_PATTERN_BLUEPRINTS
                          </span>
                          <div className="space-y-1.5">
                            {selectedFashion.blueprints.map((file, idx) => (
                              <button 
                                key={idx} 
                                onClick={() => {
                                  alert(`Triggered download request for vector draft: ${file}. In production sandbox, dxf patterns parse directly to global loom nodes.`);
                                }}
                                className="w-full flex items-center justify-between p-2 bg-[#090d14] border border-[#1a2533] hover:border-cyan-500/30 rounded font-mono text-[9px] text-slate-350 select-none hover:text-white transition-all text-left cursor-pointer"
                              >
                                <span className="truncate flex items-center gap-1.5">
                                  <Layers3 className="w-3.5 h-3.5 text-cyan-400" />
                                  {file}
                                </span>
                                <span className="text-cyan-400 text-[8px]">[DXF]</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-[#0a0f15]/80 p-4 rounded-2xl border border-[#182335] space-y-2">
                          <span className="font-mono text-[9px] tracking-wider font-black text-slate-500 uppercase block">
                            // REGISTERED DISTRO NODES
                          </span>
                          <div className="space-y-1.5">
                            {selectedFashion.distroChannels.map((channel, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2 bg-[#090d14] border border-[#1a2533] rounded font-mono text-[9px] text-slate-350">
                                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="truncate">{channel}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Active RFID Trigger Scanner */}
                      <div className="bg-[#0a0f15] p-5 rounded-2xl border border-[#182335] space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[9px] text-slate-500 uppercase font-bold tracking-widest leading-none">
                            // TELEPHONE RF TRANSPONDER SCAN
                          </span>
                          <span className="text-[9px] font-mono text-cyan-450 uppercase leading-none">ADDR_0x00A_NFC</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={triggerNfcPing}
                            disabled={isPinging}
                            className="flex items-center justify-center gap-2 px-5 py-3 bg-[#111d2b] hover:bg-[#18293e] text-[#00b4d8] border border-[#00b4d8]/30 rounded-xl font-mono text-xs font-bold tracking-wider transition-all uppercase cursor-pointer"
                          >
                            {isPinging ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>TRANSMITTING NFC STATE PING...</span>
                              </>
                            ) : (
                              <>
                                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                                <span>INTERRUPT TAG BROADCAST</span>
                              </>
                            )}
                          </motion.button>
                          <span className="font-mono text-[9px] text-slate-500">ISO_15693 DEVICE COMPLIANCE</span>
                        </div>

                        <AnimatePresence>
                          {pingResult && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="p-3 bg-cyan-950/25 border border-[#00b4d8]/20 rounded-xl text-[#00b4d8] font-mono text-[10px] break-all text-center tracking-wider animate-pulse"
                            >
                              {pingResult}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}


                  {/* ====== SANDBOX AUTOMOTIVE ECU SIMULATION ====== */}
                  {activeWorkspace === "SANDBOX" && (
                    <div className="space-y-6">
                      <div className="bg-[#0a0f15]/80 p-4 rounded-2xl border border-[#182335] space-y-1.5 select-text">
                        <span className="font-mono text-[9px] text-[#00b4d8] uppercase tracking-widest block font-black">// STATION MANUAL OVERVIEW</span>
                        <p className="font-sans text-xs text-slate-350 leading-relaxed">
                          Students practice microcontroller code by connecting diagnostic chassis boards and parsing hexagonal frame lines. Tracing chassis values registers immediate progress inside our enterprise tracking database:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                        
                        {/* ECU Control Inputs */}
                        <div className="md:col-span-5 bg-[#0a0f15] p-4 rounded-2xl border border-[#182335] space-y-4 flex flex-col justify-between">
                          <div className="space-y-3.5">
                            <div>
                              <label className="block font-mono text-[9px] tracking-wider text-slate-500 mb-1 uppercase font-bold">ECU REG INDEX (HEX)</label>
                              <input
                                type="text"
                                value={ecuAddress}
                                onChange={(e) => setEcuAddress(e.target.value)}
                                placeholder="0x1A4F"
                                className="w-full bg-[#05080c] border border-[#1b2533] rounded-lg px-3 py-1.5 font-mono text-xs text-[#00b4d8] focus:border-[#00b4d8] focus:outline-none transition-all font-bold"
                              />
                            </div>

                            <div>
                              <label className="block font-mono text-[9px] tracking-wider text-slate-500 mb-1 uppercase font-bold">COMMAND OVERRIDE VALVE</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={ecuOverride}
                                  onChange={(e) => setEcuOverride(e.target.value)}
                                  placeholder="0xFF"
                                  className="w-20 bg-[#05080c] border border-[#1b2533] rounded-lg px-3 py-1.5 font-mono text-xs text-white focus:border-[#00b4d8] focus:outline-none transition-all text-center font-bold"
                                />
                                <button
                                  onClick={handleInjectEcu}
                                  className="flex-1 px-3 py-1.5 bg-[#121c27] hover:bg-[#1f2e42] text-cyan-400 border border-cyan-500/20 rounded-lg font-mono text-xs font-black uppercase transition-all cursor-pointer"
                                >
                                  HOT_INJECT
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-[#16212e] space-y-3.5 mt-2">
                            <div className="flex justify-between items-center text-[9px] font-mono leading-none text-slate-400">
                              <span>CAN BUS SIM FREQ</span>
                              <span className="text-cyan-400 font-bold">{canBusLoad}% (500 Kbps)</span>
                            </div>
                            <button
                              onClick={handleReadEcu}
                              disabled={isReadingEcu}
                              className="w-full h-10 flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-500 to-[#008fc6] hover:scale-[1.01] text-[#070a0e] rounded-xl font-mono text-xs font-black tracking-widest uppercase transition-all cursor-pointer shadow-md"
                            >
                              <Cpu className="w-4 h-4" />
                              <span>{isReadingEcu ? "READING REGISTER..." : "EXECUTE NODE READ"}</span>
                            </button>
                          </div>
                        </div>

                        {/* Diagnostic TTY Monitor Screen */}
                        <div className="md:col-span-7 bg-slate-950 border border-slate-900 p-4.5 rounded-2xl font-mono text-[10.5px] text-slate-300 relative scanline-effect min-h-[195px] flex flex-col justify-between">
                          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#0a0f14] text-slate-500 rounded border border-slate-900 text-[8px] tracking-wider font-extrabold uppercase">
                            ECU_COM_TTY
                          </span>
                          
                          <div className="space-y-2 overflow-y-auto max-h-[175px] pl-1 pt-1 select-text">
                            {ecuTerminalOutput.map((outStr, idx) => (
                              <div key={idx} className={outStr.includes("[SUCCESS]") ? "text-emerald-400" : outStr.includes("[MANUAL_INJECT]") ? "text-cyan-400" : "text-slate-350"}>
                                <span className="opacity-40 text-[#00b4d8] font-black mr-1.5">&gt;&gt;</span>{outStr}
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  )}


                  {/* ====== COGNITIVE ENGINE (AI SYSTEM ARCHITECT) ====== */}
                  {activeWorkspace === "ARCHITECT" && (
                    <div className="space-y-5">
                      <p className="font-sans text-xs text-slate-350 leading-relaxed">
                        Input client system specs. Our integrated Gemini AI endpoint analyzes requirements and instantly builds comprehensive architectures, Milestones lists, and recommended software/hardware stack badges:
                      </p>

                      <div className="space-y-3.5">
                        <div className="relative">
                          <textarea
                            value={requirementsText}
                            onChange={(e) => setRequirementsText(e.target.value)}
                            placeholder="e.g. Designing a high-performance audio transcode stream syncing RFID wearable prototypes..."
                            className="w-full h-24 bg-[#05080c] border border-[#1b2533] text-slate-100 rounded-2xl p-4 font-sans text-xs focus:border-[#00b4d8] focus:outline-none focus:ring-1 focus:ring-[#00b4d8]/20 leading-relaxed resize-none transition-all select-text"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                          <span className="font-mono text-[7.5px] text-slate-550 uppercase font-black tracking-widest">
                            CORE ENGINE: GOOGLE_GEMINI_API // MODEL_3_5_FLASH
                          </span>
                          
                          <button
                            onClick={() => triggerArchitectQuery(requirementsText)}
                            disabled={isLoadingArch || !requirementsText}
                            className="px-6 py-2.5 bg-[#00b4d8]/10 hover:bg-[#00b4d8] text-[#00b4d8] hover:text-[#040608] border border-[#00b4d8]/40 rounded-xl font-mono text-xs font-black uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                          >
                            {isLoadingArch ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>COMPILING CODES...</span>
                              </>
                            ) : (
                              <>
                                <Cpu className="w-4 h-4" />
                                <span>[ COMPILE COGNITIVE MATRIX ]</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* AI Compilation Response Block */}
                      <AnimatePresence>
                        {architectResult && (
                          <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            className="border-t border-[#182335] pt-5 space-y-4 select-text"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#05080c] border border-[#1d2d3e]/65 p-4 rounded-xl">
                              <div>
                                <span className="font-mono text-[8px] text-cyan-400 block uppercase font-black tracking-wider">// SPEC_PIPELINE COMPLIANCE MAP</span>
                                <h3 className="font-display font-extrabold text-sm text-white uppercase mt-1 tracking-wide">{architectResult.title}</h3>
                              </div>
                              <div className="flex gap-2">
                                <span className="font-mono text-[9px] font-bold px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg">
                                  {architectResult.division.toUpperCase()} DIV
                                </span>
                                <span className="font-mono text-[9px] font-bold px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-lg">
                                  {architectResult.durationDays} DAYS CYCLE
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-[#05080c] border border-[#1b2533] p-4 rounded-xl text-xs space-y-2 whitespace-pre-wrap leading-relaxed self-stretch max-h-[190px] overflow-y-auto">
                                <span className="font-mono text-[8px] text-[#00b4d8] font-bold block mb-1 uppercase tracking-wider border-b border-[#121a24] pb-1">
                                  // CORE SERVICE ARCHITECTURE
                                </span>
                                <p className="text-slate-300 font-sans leading-relaxed">{architectResult.systemArchitecture}</p>
                              </div>

                              <div className="bg-[#05080c] border border-[#1b2533] p-4 rounded-xl text-xs space-y-2 block self-stretch max-h-[190px] overflow-y-auto">
                                <span className="font-mono text-[8px] text-indigo-400 font-bold block mb-1 uppercase tracking-wider border-b border-[#121a24] pb-1">
                                  // INTEGRATION OR SYLLABUS SCHEMAS
                                </span>
                                <p className="font-medium text-slate-250 font-sans">{architectResult.distributionPlan}</p>
                                
                                <div className="space-y-1 pt-1.5">
                                  {architectResult.mentoringMilestones?.map((ml, idx) => (
                                    <div key={idx} className="flex gap-1.5 items-start text-[11px] text-slate-350 font-sans">
                                      <span className="text-cyan-400 font-mono font-bold">{idx + 1}.</span>
                                      <span>{ml}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Deployed Stacks */}
                            <div className="flex flex-wrap gap-1.5 items-center bg-[#05080c] p-3 rounded-xl border border-[#1b2533]">
                              <span className="font-mono text-[8.5px] text-slate-500 uppercase font-bold mr-1 tracking-wider">// STACK_SPEC:</span>
                              {architectResult.recommendedStack?.map((tk) => (
                                <span key={tk} className="font-mono text-[8.5px] bg-[#0c1622] text-[#00b4d8] border border-[#00b4d8]/20 px-20 py-0.5 rounded font-black uppercase">
                                  {tk}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}


                  {/* ====== SUPPORT ADVISORY SCHEDULER & ERP ====== */}
                  {activeWorkspace === "SUPPORT" && (
                    <div className="space-y-6">
                      <div className="bg-[#05080c] p-4 rounded-2xl border border-[#1b2533] space-y-2.5">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block font-extrabold pb-1.5 border-b border-[#121a24]">
                          // SCHEDULING ADVISORY CONVERSATION COHORTS
                        </span>

                        {isSchedulerSuccess ? (
                          <div className="text-center py-4 space-y-3">
                            <CheckCircle className="w-10 h-10 text-[#00b4d8] mx-auto animate-bounce" />
                            <h4 className="font-display font-bold text-xs tracking-wider text-white uppercase">RESERVE RECORD SYNCHRONIZED</h4>
                            <p className="font-sans text-xs text-slate-350 leading-relaxed max-w-sm mx-auto">
                              We registered your metadata block call-sign! Our coordinate team lead will contact you at <strong className="text-white">{studentEmail}</strong> inside 12 Gikspot business hours.
                            </p>
                            <button
                              onClick={() => {
                                setIsSchedulerSuccess(false);
                                setStudentName("");
                                setStudentEmail("");
                              }}
                              className="px-4 py-2 bg-[#121c27] hover:bg-[#1f2e42] text-[#00b4d8] border border-cyan-500/20 rounded-xl font-mono text-[10px] font-black uppercase tracking-wider cursor-pointer"
                            >
                              START NEW INGESTION
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleSchedulerSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3.5">
                              <div>
                                <label className="block font-mono text-[8px] text-slate-500 mb-1 uppercase tracking-wider font-extrabold">CHOOSE DISCIPLINE PATHWAY</label>
                                <select
                                  value={mentorSubject}
                                  onChange={(e) => setMentorSubject(e.target.value)}
                                  className="w-full bg-[#0a0f15] border border-[#1b2533] rounded-lg px-2.5 py-2 font-mono text-[11px] text-slate-200 focus:border-[#00b4d8] focus:outline-none focus:ring-1 focus:ring-cyan-500/20"
                                >
                                  <option value="Systems Engineering / Embedded C">Systems Engineering (CAN / Bare-Metal)</option>
                                  <option value="Modern Web Systems (React / Next.js / Node)">Full-Stack Interfaces (Vite / Node)</option>
                                  <option value="Fashion Wearables & Electronics Integration">Fashion Wearables (RFID / DXF Looms)</option>
                                  <option value="Enterprise Business Retainer Consultation">Enterprise Client App Delivery Specs</option>
                                </select>
                              </div>

                              <div>
                                <label className="block font-mono text-[8px] text-slate-500 mb-1 uppercase tracking-wider font-extrabold">SIGN CALL-SIGN / NAME</label>
                                <input
                                  type="text"
                                  required
                                  value={studentName}
                                  onChange={(e) => setStudentName(e.target.value)}
                                  placeholder="Helen Chen"
                                  className="w-full bg-[#0a0f15] border border-[#1b2533] rounded-lg px-3 py-1.5 font-mono text-xs text-white focus:border-[#00b4d8] focus:outline-none focus:ring-1 focus:ring-[#00b4d8]/20 transition-all font-bold"
                                />
                              </div>
                            </div>

                            <div className="space-y-3.5 flex flex-col justify-between">
                              <div>
                                <label className="block font-mono text-[8px] text-slate-500 mb-1 uppercase tracking-wider font-extrabold">SECURE DIGITAL TELECOM EMAIL</label>
                                <input
                                  type="email"
                                  required
                                  value={studentEmail}
                                  onChange={(e) => setStudentEmail(e.target.value)}
                                  placeholder="helen@domain.com"
                                  className="w-full bg-[#0a0f15] border border-[#1b2533] rounded-lg px-3 py-1.5 font-mono text-xs text-white focus:border-[#00b4d8] focus:outline-none focus:ring-1 focus:ring-[#00b4d8]/20 transition-all font-bold"
                                />
                              </div>

                              <button
                                type="submit"
                                className="w-full h-10 bg-gradient-to-r from-cyan-500 to-[#008fc6] hover:scale-[1.01] text-[#070a0e] rounded-xl font-mono text-xs font-black uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md mt-2"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>RESERVE CONVERSATION SLOT</span>
                              </button>
                            </div>
                          </form>
                        )}
                      </div>

                      {/* ERP Enterprise Metrics Mini Box */}
                      <div className="grid grid-cols-2 gap-4 mt-5">
                        <div className="bg-[#05080c] border border-[#1b2533] p-4 rounded-xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-[#00b4d8]" />
                          <span className="font-mono text-[8px] text-slate-500 uppercase font-black block tracking-wider">// ACTIVE LAB COMMITS</span>
                          <span className="font-display text-lg font-extrabold text-white mt-0.5 block">284 Pushes</span>
                          <span className="font-mono text-[8px] text-emerald-400 mt-0.5 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                            INTEG LEVEL: EXCELLENT
                          </span>
                        </div>

                        <div className="bg-[#05080c] border border-[#1b2533] p-4 rounded-xl relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400" />
                          <span className="font-mono text-[8px] text-slate-500 uppercase font-black block tracking-wider">// REGISTERED ENROLMENTS</span>
                          <span className="font-display text-lg font-extrabold text-white mt-0.5 block">85 Pupils Enrolled</span>
                          <span className="font-mono text-[8px] text-cyan-400 mt-0.5 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"></span>
                            1.2K LAB TRAINING HOURS
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>


              {/* Technical state markers representing developer details of the reference screen */}
              <div className="border-t border-[#182335] pt-5 mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between text-slate-500 font-mono text-[10px] gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00b4d8] block animate-pulse" />
                    <span className="text-slate-400 font-extrabold">LIVE METRIC EMITTER ACTIVE</span>
                  </div>
                  <span className="text-slate-600">|</span>
                  <span>INGEST: COMPLIANT</span>
                </div>

                <div className="flex gap-2">
                  <span className="bg-[#0c121b] border border-[#1a2533] px-2 py-0.5 rounded text-cyan-400 font-bold">GIKSPOT: CH_0x8C</span>
                  <span className="bg-[#0c121b] border border-[#1a2533] px-2 py-0.5 rounded text-white font-bold">{activeWorkspace}-NODE</span>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* ================= EXTRA BENTO FEATURE: VIDEO BROADCASTS PREVIEW ================= */}
        {/* Providing secondary support for the Gikspot Studio media distribution videos (Expo Youtube Channel) */}
        <section className="bg-[#0c1117] rounded-[2.5rem] p-6 border border-[#1b2533] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#182335] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#00b4d8]/10 rounded-xl border border-[#00b4d8]/20">
                <Tv className="w-4 h-4 text-[#00b4d8] animate-pulse" />
              </div>
              <div>
                <span className="font-mono text-[8px] text-[#00b4d8] uppercase tracking-widest block font-black">// EXPO_YOUTUBE_BROADCAST_HUB</span>
                <span className="font-display font-bold text-sm text-white tracking-wide uppercase mt-0.5 block">
                  Featured Division Showcase Playlists
                </span>
              </div>
            </div>
            <span className="font-mono text-[10px] text-slate-400 bg-[#080d14] border border-[#1a2533] px-3.5 py-1.5 rounded-full select-none">
              youtube endpoints: <strong className="text-cyan-400">14 active</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_VIDEOS.map((vid) => (
              <div 
                key={vid.id} 
                onClick={() => {
                  alert(`Starting Gikspot Expo Stream: "${vid.title}". Active Youtube containers stream in high-fidelity 4K Peer states.`);
                }}
                className="bg-[#070a0e] border border-[#1d2d3e]/60 hover:border-cyan-500/35 p-3 rounded-2xl group transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-900 flex-shrink-0">
                    <img 
                      src={vid.thumbnailUrl} 
                      alt="thumb" 
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-85 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Tiny play state button trigger */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <div className="p-2.5 rounded-full bg-cyan-400 text-[#070a0e] shadow-lg shadow-cyan-400/20">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>

                    <span className="absolute bottom-2 left-2 font-mono text-[8px] bg-black/80 text-slate-300 px-2 py-0.5 rounded border border-slate-900 leading-none">
                      {vid.duration}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-sans font-extrabold text-xs text-slate-200 group-hover:text-cyan-400 transition-all leading-snug line-clamp-2">
                      {vid.title}
                    </h4>
                    <p className="font-sans text-[10.5px] text-slate-450 mt-1.5 leading-relaxed line-clamp-2">
                      {vid.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center font-mono text-[9px] text-[#00b4d8] mt-4 pt-2.5 border-t border-[#121922] leading-none">
                  <span className="uppercase text-slate-500">{vid.category}</span>
                  <span className="font-bold">{vid.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ================= HARDWARE DEPLOYMENT STACKS BADGES ================= */}
        {/* Highlights technical integration focus to prospective client developers */}
        <section className="bg-gradient-to-b from-[#0c1117] to-[#070a0e] border border-[#1b2533] p-6 rounded-[2.5rem] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#182335]">
            <Server className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-[10px] text-white uppercase font-black tracking-wider">
              // SECURE MIL-SPEC DEPLOYMENT ENVIRONMENT COMPATIBILITY
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {STACKS.map((stk) => (
              <div 
                key={stk.name} 
                className="bg-[#05080c] border border-[#1b2533] hover:border-cyan-400/30 px-3.5 py-2 rounded-xl flex items-center gap-2.5 transition-all"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <div>
                  <span className="font-mono text-[9.5px] font-bold text-slate-200 block leading-none">{stk.name}</span>
                  <span className="font-mono text-[8px] text-[#00b4d8] uppercase tracking-widest leading-none block mt-1">{stk.level} • {stk.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ================= DOCK FOOTER METRICS ================= */}
        <footer className="border-t border-[#182335] pt-8 pb-12 flex flex-col md:flex-row items-center justify-between text-slate-550 font-mono text-[10px] gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="block font-bold">© 2026 GIKSPOT COLLECTIVE LABS AND STUDIO CO. ALL PROJECT SOURCE CODES SECURED.</span>
            <span className="block text-slate-600">HELSINKI INDUSTRIAL EXHIBIT OUTSIDE WEARABLE HARDWARE & CLOUD ORCHESTRATION LANES.</span>
          </div>
          
          <div className="flex items-center gap-4 bg-[#0a0f15] border border-[#1b2533] px-4 py-2 rounded-xl">
            <span className="text-cyan-400 font-bold uppercase tracking-wider">NODES STATE: ACTIVE</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-black">STABLE LATENCY: 12ms</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
