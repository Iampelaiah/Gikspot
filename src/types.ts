export interface TechStack {
  name: string;
  icon: string;
  level: string;
  category: "embedded" | "web" | "interactive" | "database";
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  node: string;
  status: "OK" | "BUSY" | "STABLE" | "WARNING" | "FATAL";
  frequency: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string; // fallback mock or visual oscillator details
  genre: string;
  bpm: number;
}

export interface VideoShowcase {
  id: string;
  title: string;
  duration: string;
  views: string;
  category: "art" | "hardware" | "vlog" | "tutorial";
  youtubeId: string;
  thumbnailUrl: string;
  description: string;
}

export interface Fashionitem {
  id: string;
  name: string;
  season: string;
  tagId: string; // rfid/nfc embedded microchip ID
  inventory: number;
  blueprints: string[]; // pattern files simulation
  distroChannels: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  skills: string[];
  description: string;
  projectSample: string;
}

export interface ClientArchitectureResult {
  title: string;
  division: "Studio" | "Labs" | "Joint";
  durationDays: number;
  systemArchitecture: string; // Markdown layout
  distributionPlan: string;
  recommendedStack: string[];
  mentoringMilestones: string[];
}
