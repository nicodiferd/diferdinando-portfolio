export interface Service {
  code: string;
  title: string;
  description: string;
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  lead: Array<'N' | 'D'>;
  link?: string;
  github?: string;
  status?: string;
  featured?: boolean;
}

export interface Revision {
  rev: string;
  year: string;
  note: string;
}

export interface TeamMember {
  name: string;
  firstName: string;
  role: string;
  accent: 'redline' | 'blueline';
  bio: string;
  specialties: string[];
  revisions: Revision[];
  onRecord: string[];
  linkedin: string;
  github: string;
  website?: string;
}
