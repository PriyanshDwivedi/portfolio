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
      "Multi-tenant SaaS",
      "Microservices",
      "Micro Frontends",
      "Event Driven Architecture",
    ],
  },

  "Cloud & Infrastructure": {
    icon: "ri-cloud-line",
    color: "#00d4ff",
    description: "Cloud-native solutions and infrastructure optimization",
    skills: ["AWS", "Apache Kafka", "AI/ML Integration"],
  },

  "Technical Foundation": {
    icon: "ri-code-line",
    color: "#ffd93d",
    description: "Strong technical expertise across the full stack",
    skills: [
      "React",
      "Angular",
      "Next.js",
      "Spring Boot",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Blockchain",
    ],
  },

  "Design & UX": {
    icon: "ri-pen-nib-line",
    color: "#00ffaa",
    description: "User experience design and visual architecture",
    skills: ["UI/UX Design", "E-Commerce"],
  },
};

// Alternative flat structure for easy iteration
export const skillsList = Object.entries(architecturalCapabilities).map(
  ([category, data]) => ({
    category,
    ...data,
  }),
);
