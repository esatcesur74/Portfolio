export interface ProjectSection {
  type?: "hero" | "side";
  image?: string;
  video?: string;
  imagePosition?: "left" | "right";
  heading: string;
  body: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
  color: string;
  textColor: string;
  sections?: ProjectSection[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  email: string;
  github: string;
  linkedin: string;
  projects: Project[];
  skillGroups: SkillGroup[];
}
