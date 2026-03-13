import type { PortfolioData } from "@/types";

const portfolio: PortfolioData = {
  name: "Siar Esat Cesur",
  title: "Student & Entrepreneur",
  tagline: "I build things that matter.",
  bio: [
    "I'm Siar a student and entrepreneur with a passion for building products from scratch. I love turning ideas into real, working things.",
    "Whether it's a web app, a business idea, or a side project, I'm always working on something. Currently focused on sharpening my development skills and launching projects that solve real problems.",
  ],
  email: "siaresatcesur@gmail.com",
  github: "https://github.com/esatcesur74",
  linkedin: "https://www.linkedin.com/in/esat-cesur-240803390",

  projects: [
    {
      id: 1,
      title: "Eindhoven Based Catering & Fastfood Website",
      description: "Full website for an international company operating across catering and streetwear. Clean, branded experience built from scratch.",
      tags: ["HTML", "CSS", "Web Design"],
      image: "/images/catering.jpeg",
      color: "#FFF700",
      textColor: "#111111",
    },
    {
      id: 2,
      title: "Floating Gallery Concept",
      description: "An experimental GSAP powered floating gallery built as a visual concept for my own company. Focuses on fluid animation and spatial layout.",
      tags: ["GSAP", "JavaScript", "Animation"],
      image: "/images/floating gallery.png",
      liveUrl: "https://esatcesur74.github.io/gsap_training/",
      githubUrl: "https://github.com/esatcesur74/gsap_training",
      color: "#C084FC",
      textColor: "#111111",
    },
    {
      id: 3,
      title: "Mesta Road Data Dashboard",
      description: "Bachelor project. Helping a road maintenance company modernize their data visualization with a new dashboard. My role: UI Designer.",
      tags: ["UI Design", "Figma", "Data Visualization", "React"],
      image: "/images/mesta.png",
      color: "#93C5FD",
      textColor: "#111111",
    },
    {
      id: 4,
      title: "Ekip EU",
      description: "My own company. I handle content management, finance, and HR operations building internal structure from the ground up.",
      tags: ["Entrepreneurship", "Content", "Finance", "HR"],
      image: "/images/ekip.jpeg",
      liveUrl: "https://ekipeu.com",
      color: "#6EE7B7",
      textColor: "#111111",
    },
    {
      id: 5,
      title: "AI Personal Trainer",
      description: "Startup project building an AI-powered personal trainer app. My role covers UI design and AI model training fully open source.",
      tags: ["UI Design", "AI", "Open Source", "Figma"],
      color: "#FB923C",
      textColor: "#111111",
    },
  ],

  skillGroups: [
    {
      category: "Skills",
      skills: ["JavaScript", "HTML", "CSS", "GitHub", "Figma"],
    },
    {
      category: "Currently Learning",
      skills: ["React", "Next.js", "Tailwind CSS"],
    },
  ],
};

export default portfolio;
