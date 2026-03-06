import type { PortfolioData } from "@/types";

const portfolio: PortfolioData = {
  name: "Your Name",
  title: "Computer Science Student & Developer",
  tagline: "I build clean, thoughtful web experiences.",
  bio: [
    "Hi! I'm a passionate computer science student with a love for building things on the web. I enjoy turning complex problems into simple, elegant solutions.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sipping coffee while reading tech blogs. I'm always looking for opportunities to grow and collaborate.",
  ],
  email: "hello@yourname.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",

  projects: [
    {
      id: 1,
      title: "Study Planner App",
      description:
        "A productivity tool for organizing coursework, deadlines, and study sessions with a clean drag-and-drop interface.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/study-planner",
    },
    {
      id: 2,
      title: "Weather Dashboard",
      description:
        "A real-time weather app that displays forecasts, radar maps, and historical data using the OpenWeather API.",
      tags: ["React", "TypeScript", "Chart.js", "OpenWeather API"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/weather-dashboard",
    },
    {
      id: 3,
      title: "E-Commerce Store",
      description:
        "A full-stack online store with product listings, cart functionality, and Stripe payment integration.",
      tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/yourusername/ecommerce-store",
    },
  ],

  skillGroups: [
    {
      category: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
    },
    {
      category: "Frameworks & Libraries",
      skills: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Node.js"],
    },
    {
      category: "Tools & Platforms",
      skills: ["Git", "GitHub", "VS Code", "Figma", "Vercel", "PostgreSQL"],
    },
  ],
};

export default portfolio;
