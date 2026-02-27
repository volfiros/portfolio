export const personalInfo = {
  name: "Rithvik Padma",
  title: "web & product engineer",
  tagline: "I build things for the web.",
  status: "open to work",
  bio: [
    "engineer who works across the stack — web applications, ai integrations, and web3 systems. I'm drawn to problems that sit at the intersection of different technologies, whether that's wiring up an llm to a production api, building onchain systems, or crafting interfaces that feel fast and intuitive.",
    "I've shipped across different domains: frontend products with tight ux, backend systems with clean apis, llm-powered features, and smart contracts on solana/evm chains. I pick up new tools quickly and care about the details — from system design down to the final interaction.",
    "Currently open to new opportunities and interesting problems.",
  ],
  location: "India",
  email: "rithvik.padma@gmail.com",
  github: "https://github.com/volfiros",
  linkedin: "https://www.linkedin.com/in/sai-rithvik-padma-6229ba224/",
  twitter: "https://x.com/volfiros",
  telegram: "https://t.me/volfiros",
};

export const roles = ["fullstack", "web3", "open source", "ai-powered"];

export const skills = [
  "typescript",
  "python",
  "rust",
  "next.js",
  "react",
  "node.js",
  "mongodb",
  "fastapi",
  "docker",
  "postgresql",
  "convex",
  "solidity",
];

export const projects: {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  year: string;
}[] = [
  {
    id: "01",
    title: "panora",
    description:
      "chrome extension that detects manga speech bubbles using computer vision and translates them live across 12 languages — without touching the original artwork.",
    tags: ["react", "typescript", "python", "fastapi", "gemini"],
    github: "https://github.com/PanoraTL",
    year: "2026",
  },
  {
    id: "02",
    title: "resume matching system",
    description:
      "ai-powered resume screening platform with a five-stage multi-agent pipeline — document parsing, skill extraction, job analysis, candidate matching, and automated decision-making.",
    tags: ["next.js", "typescript", "gemini", "tailwind"],
    github: "https://github.com/volfiros/resume-matching",
    live: "https://resume-matching-rithvik.vercel.app",
    year: "2025",
  },
];

export const experience = [
  {
    id: "01",
    company: "bitnorm",
    role: "fullstack engineer",
    period: "jan 2026 — present",
    location: "remote",
    description: [
      "optimized frontend docker builds using multi-stage builds and alpine base image; set up github actions workflows for deployments",
      "migrated blogs module into the dashboard following feature-based architecture with full crud and backend integration hooks",
    ],
  },
  {
    id: "02",
    company: "stockinsights ai",
    role: "software engineer",
    period: "may 2023 — oct 2023",
    location: "remote",
    description: [
      "integrated openai api via langchain for ai chat, search, and filtering on financial data",
      "built landing page, earnings call dashboard, and announcements dashboard from scratch",
      "implemented google auth via supabase; built a graph ui feature for monitoring stock statistics",
    ],
  },
  {
    id: "03",
    company: "chainmonks",
    role: "frontend developer",
    period: "may 2023 — jul 2023",
    location: "onsite",
    description: [
      "built admin dashboard ui for monitoring data using metadata-driven product selection",
      "built login page ui and integrated authentication apis",
    ],
  },
  {
    id: "04",
    company: "web3verse academy",
    role: "web3 researcher",
    period: "jan 2023 — mar 2023",
    location: "remote",
    description: [
      "built landing page, code editor, and authentication interface for a web3 learning platform",
      "wrote blogs on solidity, pyevm, and evm internals; built and documented smart contracts (lottery, airdrop, tokens)",
    ],
  },
  {
    id: "05",
    company: "coursera",
    role: "teaching assistant",
    period: "oct 2022 — nov 2022",
    location: "remote",
    description: [
      "prepared graded, practice, and in-video quiz questions for a c programming course",
    ],
  },
];

export const education = [
  {
    id: "01",
    institution: "Birla institute of technology and science",
    degree: "Bachelor of Engineering,  Computer science",
    period: "oct 2021 — present",
    description:
      "studying computer science at Bits Pilani, one of india's top engineering institutions.",
    highlights: ["frontend developer — coding club (jan 2022 – sep 2022)"],
  },
];
