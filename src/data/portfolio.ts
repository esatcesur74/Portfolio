import type { PortfolioData } from "@/types";

const portfolio: PortfolioData = {
  name: "Siar Esat Cesur",
  title: "Student & Entrepreneur",
  tagline: "I build things that matter.",
  bio: [
    "I'm Siar — a student and entrepreneur with a passion for building products from scratch. I love turning ideas into real, working things.",
    "Whether it's a web app, a business idea, or a side project, I'm always working on something. Currently focused on sharpening my development skills and launching projects that solve real problems.",
  ],
  email: "hello@siaresatcesur.com",
  github: "https://github.com/esatcesur74",
  linkedin: "https://linkedin.com/in/siaresatcesur",

  projects: [
    {
      id: 1,
      title: "Project One",
      description: "Short description of what this project does and the problem it solves.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/esatcesur74/project-one",
      color: "#FFF700",
      textColor: "#111111",
    },
    {
      id: 2,
      title: "Project Two",
      description: "Short description of what this project does and the problem it solves.",
      tags: ["React", "Node.js", "PostgreSQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/esatcesur74/project-two",
      color: "#FF6767",
      textColor: "#111111",
    },
    {
      id: 3,
      title: "Project Three",
      description: "Short description of what this project does and the problem it solves.",
      tags: ["Python", "API", "Automation"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/esatcesur74/project-three",
      color: "#67FF67",
      textColor: "#111111",
    },
  ],

  skillGroups: [
    {
      category: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
    },
    {
      category: "Frameworks & Libraries",
      skills: ["Next.js", "React", "Tailwind CSS", "Node.js"],
    },
    {
      category: "Tools & Platforms",
      skills: ["Git", "GitHub", "Figma", "Vercel"],
    },
  ],
};

export default portfolio;
