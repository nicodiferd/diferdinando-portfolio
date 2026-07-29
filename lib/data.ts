import { Service, TeamMember, Project } from '@/types';

export const services: Service[] = [
  {
    code: "01",
    title: "Software & SaaS",
    description: "Production web apps and SaaS platforms, taken from first commit to paying customers.",
    features: [
      "Next.js & TypeScript",
      "Rust & Python APIs",
      "Swift / SwiftUI",
      "Auth & Multi-Tenancy",
      "Stripe Billing"
    ]
  },
  {
    code: "02",
    title: "Data Platforms",
    description: "Pipelines and warehouses that turn raw, scattered data into a single source of truth.",
    features: [
      "Snowflake & dbt",
      "ELT / ETL Pipelines",
      "Semantic Layers",
      "Orchestration & CI/CD",
      "Data Quality & Testing"
    ]
  },
  {
    code: "03",
    title: "Analytics & BI",
    description: "Dashboards and metric layers that give every team self-serve answers they can trust.",
    features: [
      "Sigma / Tableau / Looker",
      "Standardized Metrics",
      "LTV & Retention",
      "Forecasting",
      "Self-Serve Enablement"
    ]
  },
  {
    code: "04",
    title: "Machine Learning & AI",
    description: "Predictive models and LLM systems that ship to production, not science projects.",
    features: [
      "XGBoost / Prophet / Snowpark",
      "Predictive LTV & Bidding",
      "LLM & RAG Agents",
      "Claude / OpenAI Integration",
      "Workflow Automation"
    ]
  },
  {
    code: "05",
    title: "Security",
    description: "Security engineering and automation that cut risk without slowing the build down.",
    features: [
      "SOC Analysis & Incident Response",
      "Vulnerability Assessment",
      "Splunk & SOAR",
      "Compliance Automation",
      "Network Hardening"
    ]
  },
  {
    code: "06",
    title: "Infrastructure",
    description: "Cloud and self-hosted infrastructure built for uptime, observability, and scale.",
    features: [
      "GCP & Cloudflare",
      "Docker & Proxmox",
      "Terraform",
      "Grafana & ClickHouse Observability",
      "CI/CD Pipelines"
    ]
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: "Donato DiFerdinando",
    firstName: "Donato",
    role: "Data Platform & Analytics Engineering Lead",
    accent: "blueline",
    bio: "Donato owns data platforms end to end. At People Connect he architected the Snowflake + dbt ecosystem behind 300+ standardized metrics, built pipelines ingesting 150M+ rows a day from 200+ sources, and ships predictive LTV and bidding models that steer $100M+ in annual ad spend.",
    specialties: ["Data Platforms", "Semantic Layers", "Analytics Engineering", "Predictive ML"],
    revisions: [
      { rev: "E", year: "2026", note: "Business Intelligence Lead — People Connect" },
      { rev: "D", year: "2024", note: "Principal BI Analyst — People Connect · MBA, National University" },
      { rev: "C", year: "2023", note: "Senior BI Analyst — Maravai Life Sciences" },
      { rev: "B", year: "2021", note: "Data Engineer — General Dynamics NASSCO" },
      { rev: "A", year: "2020", note: "B.S. Industrial Engineering — Cal Poly San Luis Obispo" }
    ],
    onRecord: [
      "300+ metrics · 30+ semantic models · 200+ dbt models",
      "~1B rows processed daily · ~5TB scanned",
      "$100M+ annual ad spend modeled (Google Ads VBB)",
      "Platform serving 10+ cross-functional teams"
    ],
    linkedin: "https://www.linkedin.com/in/donato-diferdinando",
    github: "https://github.com/fddiferd"
  },
  {
    name: "Nicolo DiFerdinando",
    firstName: "Nicolo",
    role: "AI, Software & Security Engineer",
    accent: "redline",
    bio: "Nicolo ships AI-driven tooling at PeopleConnect — LLM-powered workflow automation across growth and operations — after coming up through security: SOC analyst at Cal Poly ITS and a SOC 2 audit closed in 4 weeks against a projected 10. On his own time he runs a Rust personal-finance SaaS in production and a 12-service homelab, and co-founded Bandit, a student transportation startup.",
    specialties: ["AI & LLM Agents", "Security Automation", "Full-Stack Development", "Data Engineering"],
    revisions: [
      { rev: "F", year: "2026", note: "AI-Driven Solutions Analyst — PeopleConnect" },
      { rev: "E", year: "2026", note: "B.S. Industrial Engineering — Cal Poly SLO · Flora wins Best in Lab" },
      { rev: "D", year: "2025", note: "Cybersecurity & IT Intern, then BI Intern — PeopleConnect" },
      { rev: "C", year: "2024", note: "Assistant Student SOC Analyst — Cal Poly ITS · Co-founded Bandit" },
      { rev: "B", year: "2023", note: "Cal Poly Club Baseball — Player, later Co-President" },
      { rev: "A", year: "2022", note: "Cybersecurity Intern — loanDepot · Kappa Sigma President" }
    ],
    onRecord: [
      "Splunk Enterprise Certified",
      "SOC 2 audit closed in 4 weeks vs. 10 projected",
      "50+ security incidents triaged weekly (Cal Poly SOC)",
      "Best in Lab — Flora, senior project expo"
    ],
    linkedin: "https://www.linkedin.com/in/nicolo-diferdinando/",
    github: "https://github.com/nicodiferd",
    website: "https://nicolod.org"
  }
];

export const projects: Project[] = [
  {
    id: "wedge",
    title: "Wedge",
    description: "A golf companion for serious players: build your bag and dial in club distances, log rounds and track your handicap index over time, and follow friends on a social leaderboard.",
    technologies: ["Swift", "SwiftUI", "FastAPI", "PostgreSQL"],
    category: "iOS App",
    lead: ["D", "N"],
    featured: true
  },
  {
    id: "zedi",
    title: "Zedi",
    description: "A personal finance platform with AI receipt scanning, CSV/QFX/PDF statement imports, row-level multi-tenancy, and subscription billing — built end to end and running in production.",
    technologies: ["Rust / Axum", "Next.js", "PostgreSQL", "Claude Vision", "Stripe"],
    category: "SaaS",
    lead: ["N"],
    link: "https://zedi.sneeks.ai"
  },
  {
    id: "flora",
    title: "Flora",
    description: "Year-long senior capstone with Bloomfilter: HCI research and design for AI-agent integration inside project-management software — an assistant that lives in the PM tool rather than beside it. Won Best in Lab at Cal Poly's senior project expo.",
    technologies: ["AI Agents", "HCI Research", "User Research"],
    category: "AI Agent",
    lead: ["N"],
    status: "Best in Lab · details under NDA"
  },
  {
    id: "semantic-layer-service",
    title: "Semantic Layer Service",
    description: "A dbt-powered semantic layer standardizing business metrics across an organization, with CI/CD workflows, incremental ETL, and a Tableau-to-Sigma reporting migration that cut delivery time and licensing overhead.",
    technologies: ["dbt", "Snowflake", "Sigma", "Python", "CI/CD"],
    category: "Data Platform",
    lead: ["D"]
  },
  {
    id: "metric-layer",
    title: "Metric Layer",
    description: "A multi-tenant analytics product that sits on top of your semantic layer: connect a provider, then explore, catalog, and govern standardized metrics with per-tenant access.",
    technologies: ["Next.js", "TypeScript", "Semantic Layer APIs", "PostgreSQL"],
    category: "Data Platform",
    lead: ["D"],
    link: "https://metric-layer.ai"
  },
  {
    id: "homelab",
    title: "HomeLab",
    description: "A self-hosted environment spanning 12+ services: pfSense networking, Proxmox virtualization, ClickHouse + Grafana observability, containerized services, and ZFS mirrored storage.",
    technologies: ["Proxmox", "pfSense", "ClickHouse", "Grafana", "Docker", "ZFS"],
    category: "Infrastructure",
    lead: ["N"],
    status: "Re-racking in San Diego"
  },
  {
    id: "bandit",
    title: "Bandit",
    description: "Co-founded a student transportation LLC in San Luis Obispo: a native SwiftUI rider and driver app with real-time tracking and Stripe payments, a TypeScript/Node backend, and a year of live operations before a deliberate wind-down.",
    technologies: ["SwiftUI", "TypeScript / Node.js", "MongoDB", "WebSockets", "Stripe"],
    category: "Startup",
    lead: ["N"],
    status: "Operated 2024–25"
  },
  {
    id: "beyond-wrapped",
    title: "Beyond Wrapped",
    description: "A Spotify analytics platform with ML-powered audio-feature prediction and context-aware scoring, built for Cal Poly's machine learning coursework.",
    technologies: ["Python", "ML", "Streamlit"],
    category: "Data / ML",
    lead: ["N"],
    status: "Private repo"
  },
  {
    id: "anthony-portfolio",
    title: "anthony.diferdinando.com",
    description: "The third brother gets a site too: Anthony's mechanical-engineering portfolio, designed and built by Nicolo.",
    technologies: ["Next.js", "Design"],
    category: "Design / Build",
    lead: ["N"],
    link: "https://anthony.diferdinando.com"
  }
];
