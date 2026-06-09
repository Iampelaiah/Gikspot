import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini API to prevent app crash if key is missing
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initialized successfully in server.");
  } catch (error) {
    console.error("Failed to initialize Gemini Client:", error);
  }
} else {
  console.warn("GEMINI_API_KEY environment variable is not defined. Server running in Demo fallback mode.");
}

// 1. API: Analyze System Requests
app.post("/api/architect", async (req, res) => {
  const { requirements, divisionType = "Joint" } = req.body;

  if (!requirements || requirements.trim() === "") {
    return res.status(400).json({ error: "Requirements string is required" });
  }

  // Fallback data if API key is not present
  if (!ai) {
    // Generate a contextual placeholder response to simulate high intelligence and elegant output
    const isLabs = divisionType === "Labs" || requirements.toLowerCase().includes("vocational") || requirements.toLowerCase().includes("mentor") || requirements.toLowerCase().includes("business");
    const isStudio = divisionType === "Studio" || requirements.toLowerCase().includes("music") || requirements.toLowerCase().includes("video") || requirements.toLowerCase().includes("fashion") || requirements.toLowerCase().includes("youtube");

    const calculatedDivision = isLabs && isStudio ? "Joint" : isLabs ? "Labs" : isStudio ? "Studio" : "Joint";

    return res.json({
      title: `${requirements.slice(0, 30)}... Optimized Platform`,
      division: calculatedDivision,
      durationDays: 30,
      systemArchitecture: `### Client Architecture Blueprint (Demo Fallback Mode)\n\n* **Edge Route Management**: Pre-configured Nginx routing to segment secure client databases.\n* **Gikspot Telemetry Core**: Active websocket cluster monitoring telemetry at ${calculatedDivision === "Labs" ? "99.98% stability" : "60fps audio streams"}.\n* **Production Database**: Highly available PostgreSQL database backing client applications.\n\n#### Component Flow:\n\`\`\`\n[ Client User ] --> [ React SPA Router ] --> [ Express Reverse Proxy ] --> [ Microservices ]\n\`\`\`\n\n*To unlock real-time custom Gemini AI code generation, configure your \`GEMINI_API_KEY\` in Settings > Secrets.*`,
      distributionPlan: calculatedDivision === "Studio" 
        ? "Uses our Automated Media Transcoding pipeline to upload media assets, bundle fashion blueprints, and launch promotional segments to our Expo Youtube Channel."
        : "Structured mentoring roadmaps combined with interactive vocational sandboxes allowing students to write, build, and debug operational codebases.",
      recommendedStack: calculatedDivision === "Studio"
        ? ["Next.js", "Typescript", "D3.js", "Web Audio API", "Ffmpeg Transcoder"]
        : ["React Router", "Node.js", "Godot Web3 Engine", "Embedded C/C++", "PostgreSQL"],
      mentoringMilestones: [
        "Milestone 01: High-Performance Event Emitters & system loops",
        "Milestone 02: Database optimization & cluster telemetry layout",
        "Milestone 03: Mentored production sprint and deployment review"
      ]
    });
  }

  try {
    const promptText = `Analyze the potential project requirement: "${requirements}".
Analyze and architect a robust custom system block for this client. Specify which division (Studio or Labs or Joint) fits this client.
Please define appropriate recommended technology stacks, estimated duration in days, comprehensive system architectures and step-by-step vocational training milestones if relevant.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: "You are the Gikspot Tech-Industrial Architect for the Gikspot Studio & Labs. Provide deeply technical, high-performance web and software architectures, business management advice, distribution solutions (music, video, fashion), or mentoring & vocational training syllabus milestones. Return the structure strictly complying with the requested JSON schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Descriptive name of the tailored system." },
            division: { type: Type.STRING, description: "Must be exactly one of: 'Studio', 'Labs', or 'Joint'" },
            durationDays: { type: Type.INTEGER, description: "Estimated delivery duration in days." },
            systemArchitecture: { type: Type.STRING, description: "Detailed Markdown outline of service nodes, data stores, API endpoints, and data ingestion." },
            distributionPlan: { type: Type.STRING, description: "Detailed plan of how the service gets distributed, automated, or integrated with media/fashion/vocational streams." },
            recommendedStack: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of technologies, frameworks, hardware APIs, or runtime systems."
            },
            mentoringMilestones: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Milestones for custom coaching, training sequences, or operational workshops for the client team."
            }
          },
          required: ["title", "division", "durationDays", "systemArchitecture", "distributionPlan", "recommendedStack", "mentoringMilestones"]
        }
      }
    });

    const jsonText = response.text ? response.text.trim() : "{}";
    const parsedData = JSON.parse(jsonText);
    res.json(parsedData);
  } catch (err: any) {
    console.error("Gemini route error:", err);
    res.status(500).json({ error: "Failed to generate AI architecture response: " + err.message });
  }
});

// Serve static app files in production / use Vite dev server in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite Dev Server Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static production assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Gikspot Collective server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
