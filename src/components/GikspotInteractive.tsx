import React, { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, Music, Radio, Volume2, Video, Tv, Layers, 
  Cpu, Terminal, HardDrive, Wifi, ShieldAlert, CheckCircle, 
  Calendar, Clock, User, Award, PlusCircle, Server, RefreshCw, BarChart2, DollarSign, Users, ExternalLink, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MusicTrack, VideoShowcase, Fashionitem, CourseModule, TelemetryLog } from "../types";
import { MOCK_TRACKS, MOCK_VIDEOS, MOCK_FASHION, INTRO_COURSES, COMMUNITY_CORNER_NOTES } from "../data";

// 1. MUSIC DISTRO SIMULATOR
export function MusicDistroSimulator() {
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(35);
  const [distroLogs, setDistroLogs] = useState<string[]>([
    "// PIPELINE_INIT: Gikspot audio core loaded successfully.",
    "// NET_GATEWAY: Secure streaming endpoint verified."
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            const actions = [
              `[TRANSCODE] Rendered 32-bit floating WAV master file for '${currentTrack.title}'`,
              `[ENCODE] Compressing high-fidelity AAC containers ... 100% OK`,
              `[METADATA] Generated secure cryptographic ISRC tag: GIK-M-${Math.floor(10000 + Math.random() * 90000)}`,
              `[DISTRIBUTION] Deployed master stems to edge distributor node.`,
              `[ROYALTY_ROUTING] Contract listener configured: Split ratio 0x82A (70/30)`
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
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="music-distro-panel" 
      className="glass-panel rounded-xl p-6 terminal-border-glow select-none tech-corner-br relative overflow-hidden"
    >
      {/* Decorative top dot grid line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent opacity-50" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1a2433] pb-4 mb-5 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#00b4d8]/10 rounded border border-[#00b4d8]/20">
            <Music className="w-4 h-4 text-[#00b4d8] animate-pulse" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-[#00b4d8] uppercase tracking-widest font-bold block">// STUDIO_NODE</span>
            <span className="font-display font-medium text-xs tracking-wider text-slate-300 uppercase">
              MUSIC_DISTRIBUTION_SYSTEM
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#0d1520] border border-[#1a2433] px-3 py-1 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span className="font-mono text-[9px] text-cyan-400 tracking-wider">STATUS: AUTOMATED_STREAMING</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Track Selection */}
        <div className="md:col-span-5 space-y-2 max-h-[220px] overflow-y-auto pr-1">
          <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-1 block">SELECT TRACK BUFFER</div>
          {MOCK_TRACKS.map((track) => {
            const isSelected = track.id === currentTrack.id;
            return (
              <motion.button
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.99 }}
                key={track.id}
                onClick={() => {
                  setCurrentTrack(track);
                  setProgress(0);
                  setIsPlaying(false);
                  setDistroLogs(prev => [`[${new Date().toLocaleTimeString()}] [BUFFER] Switched track stream: ${track.title}`, ...prev]);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left border transition-all ${
                  isSelected 
                    ? "bg-[#0d1b2a] border-[#00b4d8]/50 text-white shadow-[0_0_15px_rgba(0,180,216,0.1)]" 
                    : "bg-[#0a0f14] border-[#1a2433] text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="truncate pr-2">
                  <div className="font-sans text-xs font-semibold truncate text-slate-100">{track.title}</div>
                  <div className="font-mono text-[9px] text-slate-400 truncate mt-0.5">{track.artist} <span className="text-[#00b4d8]/60">•</span> {track.genre}</div>
                </div>
                <div className="font-mono text-[10px] text-slate-400 whitespace-nowrap bg-[#121820] px-1.5 py-0.5 rounded border border-[#1a2433]">{track.duration}</div>
              </motion.button>
            );
          })}
        </div>

        {/* Player Interface */}
        <div className="md:col-span-7 flex flex-col justify-between bg-[#070a0e]/90 border border-[#1a2433] p-5 rounded-lg text-slate-300 relative">
          
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[9px] px-2 py-0.5 bg-[#0d1622] text-[#00b4d8] border border-[#00b4d8]/20 rounded font-bold uppercase tracking-wider">
                  {currentTrack.genre}
                </span>
                <h4 className="font-display font-bold text-base tracking-tight text-white mt-3 leading-snug truncate">
                  {currentTrack.title}
                </h4>
                <p className="font-mono text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-[#00b4d8]" />
                  {currentTrack.artist}
                </p>
              </div>
              
              <div className="flex flex-col items-end gap-1.5">
                <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-950/20 px-2.5 py-0.5 rounded border border-cyan-500/25">
                  {currentTrack.bpm} BPM
                </span>
                <span className="font-mono text-[9px] text-slate-500">FORMAT: FLAC // 24_BIT</span>
              </div>
            </div>

            {/* Simulated Animated Equalizer */}
            <div className="flex items-end gap-[4px] h-12 my-3 bg-[#0d131a] px-3 py-1.5 rounded border border-[#1a2433] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-red-500/10 h-0.5" />
              {Array.from({ length: 30 }).map((_, i) => {
                const randomHeight = isPlaying ? Math.floor(10 + Math.random() * 85) : 8;
                return (
                  <motion.div
                    key={i}
                    animate={{ height: `${randomHeight}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex-1 bg-gradient-to-t from-[#005f73] to-[#00b4d8] rounded-t-[1px]"
                  />
                );
              })}
            </div>

            {/* Timeline Progress */}
            <div className="space-y-1.5 pt-1">
              <div 
                className="h-1.5 bg-[#121c26] rounded-full overflow-hidden cursor-pointer relative" 
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const pct = (clickX / rect.width) * 100;
                  setProgress(pct);
                }}
              >
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-[#00f2fe]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between font-mono text-[10px] text-slate-400">
                <span className="text-cyan-400">0:{(Math.floor((progress * 2) / 60))} / {currentTrack.duration}</span>
                <span className="text-slate-500">AUTO SPLITS OK</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between border-t border-[#1a2433] pt-4 mt-5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-500 to-[#008da8] hover:from-cyan-400 hover:to-[#00b4d8] text-[#070a0e] rounded-lg font-mono text-xs font-bold tracking-wider transition-all uppercase cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>HALT PIPELINE</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>DEPLOY BROADCAST_</span>
                </>
              )}
            </motion.button>

            <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px] bg-[#0d131a] px-3 py-1 rounded border border-[#1a2433]">
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>ROUTING VOL: <strong className="text-cyan-400">100% (STABLE)</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Realtime Stream Logs */}
      <div className="mt-5 bg-[#06090d] border border-[#1a2433] p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-[#121922]">
          <Terminal className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-mono text-[10px] tracking-wider font-bold text-slate-300">REALTIME TRANSACTION TELEMETRY</span>
        </div>
        <div className="font-mono text-[10px] space-y-1 text-slate-450 max-h-[85px] overflow-y-auto">
          {distroLogs.map((log, idx) => (
            <div key={idx} className="truncate">
              <span className="text-[#00b4d8] opacity-80">&gt;&gt;</span> {log}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// 2. VIDEO EXPO SHOWCASE PLAYER
export function VideoShowcasePreview() {
  const [selectedVideo, setSelectedVideo] = useState<VideoShowcase>(MOCK_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      id="video-distro-panel" 
      className="glass-panel rounded-xl p-6 terminal-border-glow select-none tech-corner-br"
    >
      <div className="flex items-center justify-between border-b border-[#1a2433] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#00b4d8]/10 rounded border border-[#00b4d8]/20">
            <Tv className="w-4 h-4 text-[#00b4d8]" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-[#00b4d8] uppercase tracking-widest font-bold block">// TELECAST_GRID</span>
            <span className="font-display font-medium text-xs tracking-wider text-slate-300 uppercase">
              STUDIO // EXPO_YOUTUBE_RESOURCES
            </span>
          </div>
        </div>
        <div className="font-mono text-[10px] text-slate-400 bg-[#0d1520] border border-[#1a2433] px-3 py-1 rounded">
          ENDPOINTS: <span className="text-cyan-400 font-bold">14 ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mock Player Canvas */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="relative aspect-video rounded-lg border border-[#1a2433] bg-slate-950 overflow-hidden group">
            {isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-400 font-mono text-center p-4">
                <Radio className="w-8 h-8 text-[#00b4d8] animate-spin mb-3" />
                <span className="text-white text-xs font-semibold uppercase tracking-wider">CONNECTING TO TRANSCODER PEER...</span>
                <span className="text-[10px] text-slate-500 mt-2">Bitrate: 8.4 Mbps • Frame Rate: 60 FPS • Enc: H.265 V2</span>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(false)}
                  className="mt-5 px-4 py-1.5 bg-[#121922] hover:bg-[#1a2433] text-cyan-400 rounded text-[10px] font-mono border border-cyan-500/20 uppercase cursor-pointer"
                >
                  PAUSE TERMINAL
                </motion.button>
              </div>
            ) : (
              <>
                <img 
                  src={selectedVideo.thumbnailUrl} 
                  alt={selectedVideo.title}
                  className="w-full h-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent" />
                
                {/* Central Play Trigger Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(true)}
                    className="p-4 bg-slate-900/90 text-[#00b4d8] rounded-full border border-[#00b4d8]/40 hover:scale-105 transition-all group-hover:bg-[#00b4d8] group-hover:text-[#0b0f13] cursor-pointer"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </motion.button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="font-mono text-[9px] bg-slate-950/90 px-2 py-0.5 rounded text-slate-300 border border-[#1a2433]">
                    {selectedVideo.duration} • MP4 SOURCE
                  </span>
                  <span className="font-mono text-[9px] bg-slate-950/90 px-2 py-0.5 rounded text-emerald-400 border border-[#1a2433] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    PEER STATE: METRIC_EXCELLENT
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="mt-4">
            <h4 className="font-display font-semibold text-sm text-white tracking-wide">{selectedVideo.title}</h4>
            <p className="font-sans text-xs text-slate-400 mt-1 lines leading-relaxed">{selectedVideo.description}</p>
          </div>
        </div>

        {/* Video Playlist Archive */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          <span className="font-mono text-[10px] tracking-wider font-bold text-slate-500 mb-1.5 uppercase">// STREAM_ARCHIVE</span>
          <div className="space-y-2.5 overflow-y-auto max-h-[320px] pr-1">
            {MOCK_VIDEOS.map((vid) => {
              const isSelected = vid.id === selectedVideo.id;
              return (
                <motion.div
                  whileHover={{ x: 3 }}
                  key={vid.id}
                  onClick={() => {
                    setSelectedVideo(vid);
                    setIsPlaying(false);
                  }}
                  className={`flex gap-3 p-2 rounded-lg border cursor-pointer transition-all ${
                    isSelected 
                      ? "bg-[#0d1622] border-[#00b4d8]/40"
                      : "bg-[#06090c] border-[#1a2433] hover:border-slate-805"
                  }`}
                >
                  <img 
                    src={vid.thumbnailUrl} 
                    alt="thumb" 
                    className="w-16 h-10 object-cover rounded border border-[#1a2433] flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex flex-col justify-between">
                    <h5 className={`font-sans text-[11px] font-semibold leading-snug truncate ${
                      isSelected ? "text-cyan-400" : "text-slate-300"
                    }`}>
                      {vid.title}
                    </h5>
                    <div className="flex justify-between font-mono text-[9px] text-slate-500">
                      <span>{vid.duration}</span>
                      <span>{vid.views} VIEWS</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 3. FASHION ENGINEERING DISTRO Lookbook & RFID Tag Ping
export function FashionDesignTool() {
  const [selectedItem, setSelectedItem] = useState<Fashionitem>(MOCK_FASHION[0]);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingResult, setPingResult] = useState<string | null>(null);

  const triggerNfcPing = () => {
    setIsPinging(true);
    setPingResult(null);
    setTimeout(() => {
      setIsPinging(false);
      setPingResult(`// INTERRUPT_NFC_0x200 [SUCCESS] | TAG_UID: ${selectedItem.tagId} | DISPATCH_NODE: ${selectedItem.distroChannels[0]} | TEMP: 23.4°F`);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      id="fashion-panel" 
      className="glass-panel rounded-xl p-6 terminal-border-glow select-none tech-corner-br"
    >
      <div className="flex items-center justify-between border-b border-[#1a2433] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#00b4d8]/10 rounded border border-[#00b4d8]/20">
            <Layers className="w-4 h-4 text-[#00b4d8]" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-[#00b4d8] uppercase tracking-widest font-bold block">// SYSTEM_DESIGN</span>
            <span className="font-display font-medium text-xs tracking-wider text-slate-300 uppercase">
              STUDIO // FASHION_DISTRIBUTION_SCHEMAS
            </span>
          </div>
        </div>
        <span className="font-mono text-[9px] text-[#00b4d8] bg-[#0d1622] px-2 py-0.5 rounded border border-[#00b4d8]/15 font-bold">RFID PROTOCOLS active</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Selector Panel */}
        <div className="md:col-span-4 flex flex-col gap-2.5">
          {MOCK_FASHION.map((item) => (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                setPingResult(null);
              }}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                item.id === selectedItem.id 
                  ? "bg-[#0d1622] border-[#00b4d8]/40 shadow-[0_0_15px_rgba(0,180,216,0.08)]" 
                  : "bg-[#06090c] border-[#1a2433] text-slate-400 hover:border-slate-800"
              }`}
            >
              <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">{item.season}</div>
              <h5 className="font-display font-bold text-xs mt-1 text-slate-200 truncate">{item.name}</h5>
              <div className="flex justify-between items-center mt-2.5">
                <span className="font-mono text-[9px] text-[#00b4d8] bg-[#121c27] px-1.5 py-0.25 rounded border border-[#00b4d8]/10">{item.tagId}</span>
                <span className="font-mono text-[9px] text-slate-400">STOCK: {item.inventory}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Dynamic Blueprint Spec Sheet */}
        <div className="md:col-span-8 bg-[#06090c] border border-[#1a2433] p-5 rounded-lg flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-start border-b border-[#121922] pb-3">
              <div>
                <h4 className="font-display text-sm font-bold text-white tracking-wide">{selectedItem.name}</h4>
                <p className="font-mono text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{selectedItem.season} Embedded Suite</p>
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded">
                SECURE_NFC_OK
              </span>
            </div>

            {/* List of dxf/CAD blueprint files */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-mono text-[10px] tracking-wider font-bold text-slate-500 block mb-2 uppercase">// CAD_BLUEPRINTS</span>
                <div className="space-y-1.5">
                  {selectedItem.blueprints.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-[#0d131a] border border-[#1a2433] rounded font-mono text-[9px] text-slate-400">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="truncate">{file}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] tracking-wider font-bold text-slate-500 block mb-2 uppercase">// DISTRO_NODES</span>
                <div className="space-y-1.5">
                  {selectedItem.distroChannels.map((channel, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-[#0d131a] border border-[#1a2433] rounded font-mono text-[9px] text-slate-400">
                      <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="truncate">{channel}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#121922] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={triggerNfcPing}
              disabled={isPinging}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#121c27] hover:bg-[#1a2738] text-[#00b4d8] border border-[#00b4d8]/30 rounded-lg font-mono text-xs font-bold tracking-wider transition-all uppercase cursor-pointer"
            >
              {isPinging ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>TRANSMITTING RF PING...</span>
                </>
              ) : (
                <>
                  <Radio className="w-3.5 h-3.5 text-cyan-400" />
                  <span>INTERRUPT TAG BROADCAST</span>
                </>
              )}
            </motion.button>

            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">A-TAG: ISO_15693_COMPLIANCE</span>
          </div>

          <AnimatePresence>
            {pingResult && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-2.5 bg-[#091d29] border border-[#00b4d8]/20 rounded text-[#00b4d8] font-mono text-[9px] break-all animate-pulse-cyan text-center tracking-wider"
              >
                {pingResult}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// 4. VOCATIONAL SANDBOX TERMINAL
export function VocationalSandboxTerminal() {
  const [address, setAddress] = useState<string>("0x1A4F");
  const [overrideValue, setOverrideValue] = useState<string>("0xFF");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "// SANDBOX v1.02 ready. Live Diagnostic ECU simulator loaded.",
    "// Instruction: Specify bus frame address register below, select READ ADDR NODE."
  ]);
  const [isReading, setIsReading] = useState<boolean>(false);
  const [canBusLoad, setCanBusLoad] = useState<number>(34);

  useEffect(() => {
    const interval = setInterval(() => {
      setCanBusLoad(() => Math.floor(22 + Math.random() * 15));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleRead = () => {
    setIsReading(true);
    setTerminalOutput((prev) => [`[${new Date().toLocaleTimeString()}] [BUS] Intercepting frame address ${address}...`, ...prev]);
    setTimeout(() => {
      setIsReading(false);
      const hexVal = Math.floor(Math.random() * 255).toString(16).toUpperCase();
      setTerminalOutput((prev) => [
        `[${new Date().toLocaleTimeString()}] [SUCCESS] Read Diagnostic Code: VALVE_STABILIZER_OK (0x${hexVal})`,
        `[${new Date().toLocaleTimeString()}] [CAN_INGESTION] FRAME: 0x4F0 DATA: 01 04 2A ${hexVal} FF 00 12`,
        ...prev
      ]);
    }, 600);
  };

  const handleOverride = () => {
    if (!overrideValue) return;
    setTerminalOutput((prev) => [
      `[${new Date().toLocaleTimeString()}] [MANUAL_INJECT] Injecting register ${address} --> ${overrideValue}`,
      `[${new Date().toLocaleTimeString()}] [SUCCESS] Hot-patch deployed to CAN simulator stack.`,
      ...prev
    ]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id="vocational-panel" 
      className="glass-panel rounded-xl p-6 terminal-border-glow select-none tech-corner-br"
    >
      <div className="flex items-center justify-between border-b border-[#1a2433] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#00b4d8]/10 rounded border border-[#00b4d8]/20">
            <Terminal className="w-4 h-4 text-[#00b4d8]" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-[#00b4d8] uppercase tracking-widest font-bold block">// EXPERIENTIAL</span>
            <span className="font-display font-medium text-xs tracking-wider text-slate-300 uppercase">
              LABS // VOCATIONAL_SOFTWARE_SANDBOX
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#0a1520] px-2.5 py-1 rounded border border-[#1a2433]">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span className="font-mono text-[9px] text-[#00b4d8] font-bold">STATION_ONLINE</span>
        </div>
      </div>

      <p className="font-sans text-xs text-slate-400 mb-5 leading-relaxed">
        Gikspot pupils learn by constructing practical components. Inside this low-latency sandboxed emulator, students code microcontrollers, trace registers on vehicles, and log active CAN hardware logs. Intercept a mock chassis chip:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-5 bg-[#06090c] border border-[#1a2433] p-5 rounded-lg flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-slate-500 mb-1.5 uppercase">ECU HEX ADDRESS</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 0x1A4F"
                className="w-full bg-[#0a0f15] border border-[#1a2433] rounded-lg px-3 py-2 font-mono text-xs text-[#00b4d8] focus:border-[#00b4d8] focus:outline-none focus:ring-1 focus:ring-[#00b4d8]/30 transition-all font-bold"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-wider text-slate-500 mb-1.5 uppercase">COMMAND OVERRIDE</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={overrideValue}
                  onChange={(e) => setOverrideValue(e.target.value)}
                  placeholder="e.g. 0xFF"
                  className="w-24 bg-[#0a0f15] border border-[#1a2433] rounded-lg px-3 py-2 font-mono text-xs text-white focus:border-[#00b4d8] focus:outline-none transition-all text-center"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOverride}
                  className="flex-1 px-4 py-2 bg-[#121c27] hover:bg-[#1f2e42] text-cyan-400 border border-cyan-500/20 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  DEPT_CMD
                </motion.button>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#121922] space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-slate-500 uppercase tracking-wider">CAN BUS SIM RATE</span>
              <span className="text-cyan-400 font-bold">{canBusLoad}% (500 KBPS)</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRead}
              disabled={isReading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-[#008fc6] hover:from-cyan-450 hover:to-[#00a2db] text-[#070a0e] rounded-lg font-mono text-xs font-bold tracking-wider transition-all uppercase cursor-pointer"
            >
              <Cpu className="w-4 h-4" />
              <span>{isReading ? "READING BUS REGISTER..." : "EXECUTE NODE READ"}</span>
            </motion.button>
          </div>
        </div>

        {/* Output Console Logging */}
        <div className="md:col-span-7 bg-slate-950 border border-slate-900 p-5 rounded-lg font-mono text-[11px] text-slate-300 relative overflow-hidden scanline-effect min-h-[190px]">
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#0a0f14] text-slate-500 rounded border border-slate-900 text-[8px] tracking-wider font-bold">
            ECU_STREAM_TTY
          </span>
          <div className="space-y-2 overflow-y-auto max-h-[220px]">
            {terminalOutput.map((outStr, idx) => (
              <div key={idx} className={outStr.includes("[SUCCESS]") ? "text-emerald-400" : outStr.includes("[MANUAL_INJECT]") ? "text-cyan-400" : ""}>
                <span className="opacity-45 text-[#00b4d8] font-bold">&gt;&gt;</span> {outStr}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 5. MENTORING SCHEDULER BOARD
export function MentoringScheduler() {
  const [mentorSubject, setMentorSubject] = useState<string>("Systems Engineering / Embedded C");
  const [studentName, setStudentName] = useState<string>("");
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) return;
    setIsSuccess(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      id="mentoring-panel" 
      className="glass-panel rounded-xl p-6 terminal-border-glow select-none tech-corner-br"
    >
      <div className="flex items-center justify-between border-b border-[#1a2433] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#00b4d8]/10 rounded border border-[#00b4d8]/20">
            <User className="w-4 h-4 text-[#00b4d8]" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-[#00b4d8] uppercase tracking-widest font-bold block">// CLIENTS & STUDENTS COHORTS</span>
            <span className="font-display font-medium text-xs tracking-wider text-slate-300 uppercase">
              LABS // SOCIAL_&_COMMUNITY_MENTORSHIP
            </span>
          </div>
        </div>
        <span className="font-mono text-[9px] text-slate-500 uppercase">COHORT: 2026_SCHEDULE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-6 space-y-4 font-sans text-xs text-slate-400">
          <p className="leading-relaxed">
            At Gikspot laboratories, we configure structural roadmaps and support aspiring engineers. Enterprise clients engage our development services for hardware setups, while students receive bespoke vocational mentoring from industry leaders.
          </p>
          <div className="bg-[#06090c] border border-[#1a2433] p-4 rounded-lg space-y-3">
            <span className="font-mono text-[9px] font-bold text-cyan-400 uppercase block tracking-wider">// LATEST_STATUS</span>
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300">Cohort Gamma starts: <strong className="text-white">July 15th</strong></span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-300">Enterprise advisor retainers: <strong className="text-cyan-400">2 slot indicators remaining</strong></span>
            </div>
          </div>
        </div>

        <div className="md:col-span-6 bg-[#06090c] border border-[#1a2433] p-5 rounded-lg text-slate-300">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle className="w-12 h-12 text-[#00b4d8] mx-auto animate-bounce" />
              <h4 className="font-display font-bold text-sm tracking-wide text-white uppercase">CONSULTATION ROUTE CREATED</h4>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                We have registered your metadata tag! Our core engineering mentor will contact you at <strong className="text-white">{studentEmail}</strong> within 12 standard business hours.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsSuccess(false);
                  setStudentName("");
                  setStudentEmail("");
                }}
                className="px-4 py-2 bg-[#121c27] hover:bg-[#1c2938] text-[#00b4d8] border border-[#00b4d8]/20 rounded-lg font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer"
              >
                REQUEST SECTOR BLOCK
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <span className="font-mono text-[9.5px] tracking-wider font-bold text-[#00b4d8] uppercase block">// REGISTER CONVERSATION</span>
              <div>
                <label className="block font-mono text-[9px] text-slate-500 mb-1 uppercase tracking-wider">CHOOSE COHORT AREA</label>
                <select
                  value={mentorSubject}
                  onChange={(e) => setMentorSubject(e.target.value)}
                  className="w-full bg-[#0a0f15] border border-[#1a2433] rounded-lg px-3 py-2 font-mono text-xs text-slate-200 focus:border-[#00b4d8] focus:outline-none focus:ring-1 focus:ring-[#00b4d8]/20"
                >
                  <option value="Systems Engineering / Embedded C">Systems Engineering (C/C++ / CAN Bus)</option>
                  <option value="Modern Web Systems (React / Next.js / Node)">Modern Full-Stack Web Runtimes</option>
                  <option value="Fashion Wearables & Electronics Integration">Fashion Wearables (NFC / RFID microchips)</option>
                  <option value="Enterprise Business Retainer Consultation">Enterprise App Delivery Architecture</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[9px] text-slate-500 mb-1 uppercase tracking-wider">YOUR CALL SIGN / NAME</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Helen Chen"
                  className="w-full bg-[#0a0f15] border border-[#1a2433] rounded-lg px-3 py-2 font-mono text-xs text-white focus:border-[#00b4d8] focus:outline-none focus:ring-1 focus:ring-[#00b4d8]/25 transition-all"
                />
              </div>

              <div>
                <label className="block font-mono text-[9px] text-slate-500 mb-1 uppercase tracking-wider">SECURE DIGITAL TELECOM EMAIL</label>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="e.g. helen@domain.com"
                  className="w-full bg-[#0a0f15] border border-[#1a2433] rounded-lg px-3 py-2 font-mono text-xs text-white focus:border-[#00b4d8] focus:outline-none focus:ring-1 focus:ring-[#00b4d8]/25 transition-all"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-cyan-500 to-[#1e8da8] hover:from-cyan-455 hover:to-[#00b4d8] text-[#070a0e] rounded-lg font-mono text-xs font-bold uppercase cursor-pointer"
              >
                REQUEST ADVISORY INTERVIEW
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// 6. ERP WORKFLOW TRACKER FOR BUSINESS & LOGISTICS
export function ErpTrackerWidget() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      id="erp-tracker" 
      className="glass-panel rounded-xl p-6 terminal-border-glow select-none tech-corner-br"
    >
      <div className="flex items-center justify-between border-b border-[#1a2433] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#00b4d8]/10 rounded border border-[#00b4d8]/20">
            <BarChart2 className="w-4 h-4 text-[#00b4d8]" />
          </div>
          <div>
            <span className="font-mono text-[9px] text-[#00b4d8] uppercase tracking-widest font-bold block">// ENTERPRISE METRICS</span>
            <span className="font-display font-medium text-xs tracking-wider text-slate-300 uppercase">
              LABS // ENTERPRISE_RESOURCE_ORGANIZATION
            </span>
          </div>
        </div>
        <span className="font-mono text-[10px] text-slate-500 tracking-wider">STATE: SYNCED</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="bg-[#06090c] border border-[#1a2433] p-4 rounded-lg relative overflow-hidden group hover:border-[#00b4d8]/30 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#00b4d8]" />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">RETAINERS</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="font-display text-2xl font-bold text-white mt-1">14 Clients</div>
          <p className="font-mono text-[9px] text-slate-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            99% DELIVERY SLA
          </p>
        </div>

        <div className="bg-[#06090c] border border-[#1a2433] p-4 rounded-lg relative overflow-hidden group hover:border-[#00b4d8]/30 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400" />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">ACTIVE COMMITS</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-display text-2xl font-bold text-white mt-1">284 Pushes</div>
          <p className="font-mono text-[9px] text-slate-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            CI/CD INTEGRITY TESTED
          </p>
        </div>

        <div className="bg-[#06090c] border border-[#1a2433] p-4 rounded-lg relative overflow-hidden group hover:border-[#00b4d8]/30 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-505 bg-[#00b4d8]" />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">COHORT ENROLLED</span>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="font-display text-2xl font-bold text-white mt-1">85 Juniors</div>
          <p className="font-mono text-[9px] text-slate-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            ACTIVE LAB HOURS: 1.2K
          </p>
        </div>

        <div className="bg-[#06090c] border border-[#1a2433] p-4 rounded-lg relative overflow-hidden group hover:border-[#00b4d8]/30 transition-all">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-405 bg-cyan-400" />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">CERTIFICATION</span>
            <Server className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="font-display text-2xl font-bold text-white mt-1">100% OK</div>
          <p className="font-mono text-[9px] text-slate-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            ISO/IEC 27001 COMPLIANT
          </p>
        </div>
      </div>

      <div className="bg-[#06090c] border border-[#1a2433] p-4 rounded-lg">
        <span className="font-mono text-[10.5px] font-bold text-slate-400 uppercase block mb-3 tracking-wider">// SYSTEM_COMMUNITY_COMMENTS</span>
        <div className="space-y-4 max-h-[160px] overflow-y-auto pr-1">
          {COMMUNITY_CORNER_NOTES.map((note) => (
            <div key={note.id} className="border-b border-[#121922] pb-2.5 last:border-0 last:pb-0">
              <div className="flex justify-between items-center bg-[#0a0f15] px-3 py-1.5 rounded border border-[#1a2433]/70">
                <span className="font-mono text-[10px] font-bold text-slate-200">{note.author}</span>
                <span className="font-mono text-[9px] text-[#00b4d8] uppercase tracking-wider bg-[#121c27] px-2 py-0.25 rounded border border-[#00b4d8]/20">{note.role}</span>
              </div>
              <p className="font-sans text-xs text-slate-400 mt-2.5 leading-relaxed pl-1">{note.content}</p>
              <span className="font-mono text-[8px] text-slate-550 block mt-1.5 text-right uppercase tracking-widest pl-1">{note.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
