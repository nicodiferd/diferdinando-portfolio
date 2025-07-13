export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  category: 'web' | 'mobile' | 'data' | 'security' | 'ai';
}

export interface TeamMember {
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  image?: string;
  linkedin: string;
  github: string;
  website?: string;
  certifications?: string[];
}