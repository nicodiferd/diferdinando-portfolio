import { Service, TeamMember, Project } from '@/types';

export const services: Service[] = [
  {
    title: "Web Applications",
    description: "Modern, scalable web applications built with cutting-edge technologies",
    icon: "globe",
    features: [
      "React/Next.js Development",
      "TypeScript & JavaScript",
      "API Integration",
      "Responsive Design",
      "Performance Optimization"
    ]
  },
  {
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps for iOS and Android",
    icon: "smartphone",
    features: [
      "Swift/iOS Development",
      "React Native",
      "User Experience Design",
      "App Store Deployment",
      "Push Notifications"
    ]
  },
  {
    title: "Data Engineering",
    description: "Build robust data pipelines and infrastructure",
    icon: "database",
    features: [
      "ETL Pipeline Development",
      "Snowflake & Cloud Platforms",
      "Data Warehouse Design",
      "Real-time Processing",
      "Data Quality Assurance"
    ]
  },
  {
    title: "Data Analytics & BI",
    description: "Transform data into actionable insights",
    icon: "chart",
    features: [
      "Dashboard Development",
      "Tableau Automation",
      "KPI Tracking",
      "Predictive Analytics",
      "Business Intelligence"
    ]
  },
  {
    title: "AI & Machine Learning",
    description: "Intelligent solutions powered by machine learning",
    icon: "brain",
    features: [
      "Model Development",
      "Natural Language Processing",
      "Computer Vision",
      "Predictive Modeling",
      "AI Integration"
    ]
  },
  {
    title: "Cybersecurity",
    description: "Secure your infrastructure and applications",
    icon: "shield",
    features: [
      "Security Audits",
      "SOC Analysis",
      "Vulnerability Assessment",
      "Security Automation",
      "Compliance Implementation"
    ]
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: "Nicolo DiFerdinando",
    role: "Security Engineer & Full-Stack Developer",
    specialties: ["Cybersecurity", "Web Development", "Database Design", "IoT"],
    bio: "22-year-old Industrial Engineering student at Cal Poly San Luis Obispo with a focus on cybersecurity. CompTIA Security+ and SPLUNK certified with expertise in network security, SQL databases, and process improvement.",
    linkedin: "https://www.linkedin.com/in/nicolo-diferdinando/",
    github: "https://github.com/nicodiferd",
    website: "https://nicolod.org",
    certifications: ["CompTIA Security+", "SPLUNK Certified", "SQL Database Implementation"]
  },
  {
    name: "Donato DiFerdinando",
    role: "Data Engineer & Backend Developer",
    specialties: ["Data Engineering", "Machine Learning", "API Development", "Cloud Architecture"],
    bio: "Expert in building scalable data infrastructure and backend systems. Specializes in Snowflake, Python, and modern API development with FastAPI. Passionate about transforming raw data into valuable insights.",
    linkedin: "https://www.linkedin.com/in/donato-diferdinando/",
    github: "https://github.com/fddiferd"
  }
];

export const projects: Project[] = [
  {
    id: "bandit-app",
    title: "Bandit - Student Transportation",
    description: "A Swift-based transportation service app for students in San Luis Obispo, aimed at reducing drunk driving and improving campus safety.",
    technologies: ["Swift", "iOS", "Firebase", "Maps API"],
    category: "mobile",
    github: "https://github.com/nicodiferd"
  },
  {
    id: "ip-blocklist",
    title: "IP Blocklist Automation",
    description: "Python-based security automation tool that integrates with Slack and Splunk SOAR platforms for automated IP threat management.",
    technologies: ["Python", "Splunk SOAR", "Slack API", "Security Automation"],
    category: "security",
    github: "https://github.com/nicodiferd"
  },
  {
    id: "snowflake-service",
    title: "Snowflake Data Service",
    description: "Comprehensive data engineering solution built on Snowflake for efficient data processing and analytics.",
    technologies: ["Python", "Snowflake", "SQL", "Data Engineering"],
    category: "data",
    github: "https://github.com/fddiferd/snowflake-service"
  },
  {
    id: "fastapi-backend",
    title: "FastAPI Backend Framework",
    description: "Production-ready backend API framework with authentication, database integration, and scalable architecture.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    category: "web",
    github: "https://github.com/fddiferd/fast_api_accelerator"
  },
  {
    id: "tableau-automator",
    title: "Tableau Automation Tool",
    description: "Python automation framework for Tableau that streamlines report generation and dashboard updates.",
    technologies: ["Python", "Tableau API", "Data Visualization", "Automation"],
    category: "data",
    github: "https://github.com/fddiferd/tableau-automator"
  },
  {
    id: "card-trading-db",
    title: "Card Trading Database",
    description: "Full-stack SQL database system with CRUD functionality for retail card trading operations.",
    technologies: ["SQL", "Database Design", "Backend Development"],
    category: "web",
    github: "https://github.com/nicodiferd"
  }
];