/**
 * Skills & Architectural Capabilities Data
 * Reorganized to emphasize architecture over development
 */

export const architecturalCapabilities = {
  "Solution Architecture": {
    icon: "ri-building-4-line",
    color: "#6c63ff",
    description: "Enterprise-grade system design and architecture patterns",
    skills: [
      "Multi-tenant SaaS Design",
      "Microservices Architecture",
      "Micro-frontend Systems",
      "Domain Driven Design",
      "Event Driven Architecture",
      "API Gateway Design",
      "System Integration Patterns",
      "Scalability & Performance",
    ],
  },

  "Cloud & Infrastructure": {
    icon: "ri-cloud-line",
    color: "#00d4ff",
    description: "Cloud-native solutions and infrastructure optimization",
    skills: [
      "AWS (Certified Cloud Practitioner)",
      "Serverless Architecture",
      "CI/CD Pipeline Design",
      "Cost Optimization Strategies",
      "Infrastructure as Code",
      "CloudFront & S3",
      "Container Orchestration",
      "Cloud Migration",
    ],
  },

  "Leadership & Strategy": {
    icon: "ri-team-line",
    color: "#ff6b6b",
    description: "Technical leadership, pre-sales, and stakeholder management",
    skills: [
      "Technical Team Leadership (10+ developers)",
      "Solution Design (100+ architectures)",
      "RFP & Pre-sales (10+ proposals)",
      "Stakeholder Management",
      "Architecture Governance",
      "Mentorship & Training",
      "Agile & Scrum Practices",
      "Technology Strategy",
    ],
  },

  "Technical Foundation": {
    icon: "ri-code-line",
    color: "#ffd93d",
    description: "Strong technical expertise across the full stack",
    skills: [
      "React, Angular, Next.js",
      "TypeScript, JavaScript",
      "Spring Boot, Node.js",
      "Core Java, J2EE",
      "PostgreSQL, MongoDB, Redis",
      "RESTful APIs",
      "System Design Patterns",
      "Performance Optimization",
    ],
  },

  "Design & UX": {
    icon: "ri-pen-nib-line",
    color: "#00ffaa",
    description: "User experience design and visual architecture",
    skills: [
      "Figma",
      "Adobe Illustrator",
      "UI/UX Design",
      "Design Systems",
      "Prototyping",
      "User Research",
    ],
  },
};

// Alternative flat structure for easy iteration
export const skillsList = Object.entries(architecturalCapabilities).map(
  ([category, data]) => ({
    category,
    ...data,
  }),
);
