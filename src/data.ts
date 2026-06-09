import { TechStack, MusicTrack, VideoShowcase, Fashionitem, CourseModule, TelemetryLog } from "./types";

export const STACKS: TechStack[] = [
  { name: "Next.js 15", icon: "Layout", level: "Elite", category: "web" },
  { name: "TypeScript", icon: "Code2", level: "Native", category: "web" },
  { name: "PostgreSQL", icon: "Database", level: "Hardened", category: "database" },
  { name: "Docker Cluster", icon: "Container", level: "Industrial", category: "database" },
  { name: "Godot Engine", icon: "Gamepad2", level: "Interactive", category: "interactive" },
  { name: "WebGL / Canvas", icon: "Cpu", level: "High-Perf", category: "interactive" },
  { name: "Embedded C/C++", icon: "Terminal", level: "Bare-Metal", category: "embedded" },
  { name: "CAN Bus Protocol", icon: "Activity", level: "Low-Latency", category: "embedded" },
];

export const MOCK_TELEMETRY: TelemetryLog[] = [
  { id: "1", timestamp: "10:44:01", node: "ECU_MGR", status: "OK", frequency: "74.71 MHz" },
  { id: "2", timestamp: "10:44:02", node: "SYNC_NODE_A", status: "STABLE", frequency: "16.92 MHz" },
  { id: "3", timestamp: "10:44:03", node: "TXT_FABRIC", status: "BUSY", frequency: "60.01 MHz" },
  { id: "4", timestamp: "10:44:04", node: "AUDIO_ENC", status: "OK", frequency: "48.00 KHz" },
  { id: "5", timestamp: "10:44:05", node: "VIDEO_RENDER_X", status: "BUSY", frequency: "120.00 FPS" },
];

export const MOCK_TRACKS: MusicTrack[] = [
  { id: "tr-1", title: "Mechanic Synapsis", artist: "gikspot collective", duration: "03:14", genre: "Industrial Darkwave", bpm: 124, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: "tr-2", title: "Fabric Telemetry", artist: "neon loom", duration: "02:40", genre: "Cyber Electro", bpm: 130, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { id: "tr-3", title: "CAN-Bus Pulse", artist: "gikspot lab core", duration: "04:02", genre: "Minimal Techno", bpm: 120, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: "tr-4", title: "Avant-Garde Loom", artist: "studio session v2", duration: "03:45", genre: "Cyber ambient", bpm: 90, audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
];

export const MOCK_VIDEOS: VideoShowcase[] = [
  {
    id: "vid-1",
    title: "Project Zero // Gikspot Tactical Vest & ECU Ingestion",
    duration: "10:12",
    views: "12.4K",
    category: "art",
    youtubeId: "vId_1",
    thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    description: "Visual exploration of dynamic digital patterns compiled and synchronized with physical clothing microchips in our specialized textile workshop."
  },
  {
    id: "vid-2",
    title: "Vocational Sandbox Tutorial: Real-time Automotive Logging",
    duration: "24:45",
    views: "8.1K",
    category: "tutorial",
    youtubeId: "vId_2",
    thumbnailUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    description: "An intensive walk-through on how to program microcontrollers to intercept CAN telemetry data and parse state variables directly into a WebGL interface."
  },
  {
    id: "vid-3",
    title: "gikspot studio: 2026 Winter Fabric Expo YouTube Stream",
    duration: "45:00",
    views: "21.3K",
    category: "hardware",
    youtubeId: "vId_3",
    thumbnailUrl: "https://images.unsplash.com/photo-1483475116246-77150012f2c4?auto=format&fit=crop&w=600&q=80",
    description: "Full broadcast recording of our annual hybrid arts exhibition showcasing wearable embedded electronics and modular music synthesizers."
  },
  {
    id: "vid-4",
    title: "Mentorship Diaries: Transitioning to Systems Engineering",
    duration: "15:30",
    views: "5.5K",
    category: "vlog",
    youtubeId: "vId_4",
    thumbnailUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    description: "Our core engineers review how vocational sandboxes help aspiring developers secure enterprise retainers."
  }
];

export const MOCK_FASHION: Fashionitem[] = [
  {
    id: "fsh-1",
    name: "gikspot T-Type Utility Vest [V2.0]",
    season: "WINTER 2026",
    tagId: "RFID_0x9B12E",
    inventory: 42,
    blueprints: [
      "FRONT_LEFT_SAE_SEAM.dxf",
      "BREATHABLE_MESH_HEM.dxf",
      "ECU_POCKET_LOCK_PLATE.stl"
    ],
    distroChannels: ["Studio Shopify Node-1", "Helsinki Concept Exhibit", "Tokyo Subculture Hub"]
  },
  {
    id: "fsh-2",
    name: "CAN-Pulse Sensory Hoodie",
    season: "SPRING 2026",
    tagId: "RFID_0xA710F",
    inventory: 18,
    blueprints: [
      "INTEGRATED_FLAT_CABLE_ROUTING.pdf",
      "BACK_SLEEVE_LED_ALIGNMENT.dxf",
      "ELBOW_REINFORCED_THREAD.dxf"
    ],
    distroChannels: ["Studio Shopify Node-2", "London Tech Wear Grid"]
  },
  {
    id: "fsh-3",
    name: "Sensing Visor Alpha-0",
    season: "WINTER 2026",
    tagId: "RFID_0xE019D",
    inventory: 12,
    blueprints: [
      "VISOR_SHIELD_CURVE_STP.stl",
      "BLUETOOTH_ANTENNA_FRAME.stl"
    ],
    distroChannels: ["Online Private Presale", "Berlin Underground Retail"]
  }
];

export const INTRO_COURSES: CourseModule[] = [
  {
    id: "crs-1",
    title: "ECU / CAN-Bus Systems Engineering",
    duration: "12 Weeks",
    skills: ["Embedded C", "Hardware Oscilloscope", "CAN Protocols", "CANoe Tools"],
    description: "Learn to tap vehicle telemetry, decode serial frames on raw physical microcontrollers, and stream logging buffers using low-latency threads.",
    projectSample: "Automated CAN bus message parse-and-flicker matrix dashboard."
  },
  {
    id: "crs-2",
    title: "WebGL High-Performance Runtimes & Canvas Rendering",
    duration: "8 Weeks",
    skills: ["Javascript/TS", "D3.js & WebGL Engine", "Mathematical Audio Signals", "State Buffer Logic"],
    description: "Master real-time data visualizers. Translate sensory telemetry into high-contrast interfaces, charts, and interactive canvas components.",
    projectSample: "3D Garment NFC data overlay map with responsive nodes."
  },
  {
    id: "crs-3",
    title: "Full-Stack Enterprise Sandboxes & Orchestration",
    duration: "10 Weeks",
    skills: ["Next.js (App Dir)", "Express.js", "Docker Engine", "CI/CD Deployment Pipelines"],
    description: "Learn client lifecycle pipelines, secure API integrations, Docker deployment orchestration, and secure secret variable servers.",
    projectSample: "Multi-tenant business ERP tracker backed by PostgreSQL cluster."
  }
];

export const COMMUNITY_CORNER_NOTES = [
  {
    id: "cc-1",
    author: "Leo J. (Lead Mentor)",
    content: "When coding microcontrollers, memory alignment is everything. Always pack your byte packets tightly inside telemetry frames.",
    timestamp: "2 hours ago",
    role: "Engineering Mentor"
  },
  {
    id: "cc-2",
    author: "Sarah K. (Studio Designer)",
    content: "Our fashion distro node now syncs direct vector exports from pattern drafts to production weavers. Zero paper waste.",
    timestamp: "5 hours ago",
    role: "Textile Lead"
  },
  {
    id: "cc-3",
    author: "Vikram R. (Graduate Developer)",
    content: "The Labs mentoring program helped me land an embedded systems engineer role within 6 months. That CAN sandbox was literally identical to production setups.",
    timestamp: "1 day ago",
    role: "Laboratories Alumni"
  }
];
