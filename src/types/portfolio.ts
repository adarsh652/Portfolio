export interface Social {
  github: string;
  linkedin: string;
  email: string;
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  location: string;
  avatar?: string; 
  social: Social;
}

export interface Skills {
  languages: string[];
  frontend: string[];
  backend: string[];
  tools: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live?: string;
  featured?: boolean;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skills;
  projects: Project[];
}
