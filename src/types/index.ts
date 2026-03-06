export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;       // hover background color
  textColor: string;   // text color on hover (light or dark)
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
