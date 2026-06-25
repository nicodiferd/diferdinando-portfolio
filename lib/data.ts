import { Service, TeamMember, Project } from '@/types';

export const services: Service[] = [
  {
    title: "Web & SaaS Applications",
    description: "Production-grade web apps and SaaS platforms, taken from first commit to paying customers.",
    icon: "globe",
    features: [
      "React / Next.js & TypeScript",
      "Rust & Python APIs",
      "Auth & Multi-Tenancy",
      "Stripe & Subscription Billing",
      "Performance & SEO Optimization"
    ]
  },
  {
    title: "Data Engineering",
    description: "Reliable pipelines and warehouses that turn raw, scattered data into a single source of truth.",
    icon: "database",
    features: [
      "ELT / ETL Pipelines with dbt",
      "Snowflake & Cloud Warehouses",
      "Semantic Layers & Metrics",
      "Orchestration & CI/CD",
      "Data Quality & Testing"
    ]
  },
  {
    title: "Analytics & BI",
    description: "Dashboards and metric layers that give every team self-serve answers they can trust.",
    icon: "chart",
    features: [
      "Dashboards (Sigma / Tableau / Looker)",
      "Standardized Metric Layers",
      "KPI, LTV & Retention Tracking",
      "Forecasting & Predictive Analytics",
      "Self-Serve Analytics Enablement"
    ]
  },
  {
    title: "AI & Machine Learning",
    description: "Practical ML and LLM systems that ship to production, not science projects.",
    icon: "brain",
    features: [
      "LLM & RAG Agents (LangChain)",
      "Predictive Modeling (XGBoost / Prophet)",
      "Revenue & LTV Forecasting",
      "Claude / OpenAI Integration",
      "Workflow Automation"
    ]
  },
  {
    title: "Security & Automation",
    description: "Security engineering and automation that cut risk and eliminate manual toil.",
    icon: "shield",
    features: [
      "SOC Analysis & Incident Response",
      "Vulnerability Assessment",
      "Security & Reporting Automation",
      "SOC 2 / Compliance Workflows",
      "Splunk & SOAR Integrations"
    ]
  },
  {
    title: "Cloud & Infrastructure",
    description: "Cloud and self-hosted infrastructure built for uptime, observability, and scale.",
    icon: "cloud",
    features: [
      "GCP & Cloudflare Deployment",
      "Docker & Containerization",
      "CI/CD Pipelines",
      "Monitoring & Observability (Grafana)",
      "Infrastructure as Code (Terraform)"
    ]
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: "Nicolo DiFerdinando",
    role: "Software & Security Engineer",
    specialties: ["Full-Stack Development", "Security Automation", "Data Pipelines", "AI & LLM Agents"],
    bio: "Industrial Engineering student at Cal Poly San Luis Obispo (B.S., 2026) working across software, data, and security. Builds full-stack products and internal tools, designs data pipelines and database systems, and automates reporting and security workflows, plus LLM agents built with LangChain and Python.",
    linkedin: "https://www.linkedin.com/in/nicolo-diferdinando/",
    github: "https://github.com/nicodiferd",
    website: "https://nicolod.org",
    certifications: ["CompTIA Security+", "Splunk Certified", "SQL Database Implementation"]
  },
  {
    name: "Donato DiFerdinando",
    role: "Data Platform & Analytics Engineer",
    specialties: ["Data Platforms", "Semantic Layers", "Analytics Engineering", "Predictive ML"],
    bio: "Data platform and analytics engineer who owns data systems end-to-end: Snowflake, dbt, and Python pipelines, semantic layers powering hundreds of standardized metrics, and predictive models (LTV, retention, and revenue forecasting) that shape growth strategy for subscription businesses.",
    linkedin: "https://www.linkedin.com/in/donato-diferdinando",
    github: "https://github.com/fddiferd"
  }
];

export const projects: Project[] = [
  {
    id: "zedi",
    title: "Zedi - Personal Finance SaaS",
    description: "A full-stack personal finance platform with AI-powered receipt scanning, multi-tenant accounts, and subscription billing, built end-to-end and shipped to production.",
    technologies: ["Rust / Axum", "Next.js", "TypeScript", "PostgreSQL", "Claude Vision OCR", "Stripe", "Railway"],
    category: "web",
    link: "https://zedi.sneeks.ai"
  },
  {
    id: "semantic-layer-service",
    title: "Semantic Layer Service",
    description: "A dbt-powered semantic layer that standardizes business metrics across an organization, with CI/CD workflows and incremental ETL pipelines, plus a reporting migration from Tableau to Sigma that cut delivery time and licensing overhead.",
    technologies: ["dbt", "Snowflake", "Sigma Computing", "Python", "CI/CD"],
    category: "data"
  },
  {
    id: "metric-layer",
    title: "Metric Layer",
    description: "A multi-tenant analytics product that sits on top of your semantic layer. Connect to semantic layer providers, then explore, catalog, and govern standardized metrics with per-tenant access, turning a raw semantic layer into a self-serve product.",
    technologies: ["Next.js", "TypeScript", "Multi-Tenancy", "Semantic Layer APIs", "PostgreSQL"],
    category: "data",
    link: "https://metric-layer.ai"
  },
  {
    id: "homelab",
    title: "HomeLab Infrastructure",
    description: "A self-hosted, distributed Proxmox environment with a ClickHouse analytics database, containerized services (n8n, Pi-hole, Tailscale), ZFS mirrored storage, and Grafana dashboards for end-to-end observability.",
    technologies: ["Proxmox", "ClickHouse", "Docker", "Grafana", "Tailscale", "ZFS"],
    category: "infrastructure"
  },
  {
    id: "wedge",
    title: "Wedge - Golf Companion",
    description: "An iOS golf companion for serious players: build your bag and dial in club distances, log rounds and track your handicap index over time, and follow friends on a social leaderboard.",
    technologies: ["Swift", "SwiftUI", "iOS", "FastAPI", "PostgreSQL"],
    category: "mobile",
    featured: true
  }
];
