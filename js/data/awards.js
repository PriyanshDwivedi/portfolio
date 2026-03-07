/**
 * Awards & Recognition Data
 * Professional achievements and industry recognition
 */

export const awards = [
  {
    id: 1,
    title: "Employee of the Quarter",
    category: "Performance Excellence",
    organization: "Rahi Platform Technologies",
    date: "Q2 2025",
    year: 2025,
    description:
      "Recognition for architecting zero-dependency component library and achieving exceptional performance metrics",
    icon: "ri-trophy-line",
    color: "#FFD700",
  },
  {
    id: 2,
    title: "Digi Champ Award",
    category: "Digital Transformation",
    organization: "Bajaj Technology Services",
    date: "January 2024",
    year: 2024,
    description:
      "Awarded for excellence in digital transformation and cloud architecture optimization",
    icon: "ri-medal-line",
    color: "#6c63ff",
  },
  {
    id: 3,
    title: "Lakshya 1.0 - Top 80",
    category: "Leadership Excellence",
    organization: "Bajaj Group (Across all companies)",
    date: "December 2022",
    year: 2022,
    description:
      "Selected among top 80 employees across the entire Bajaj Group for leadership and technical excellence",
    icon: "ri-star-line",
    color: "#00d4ff",
  },
  {
    id: 4,
    title: "Deferred Income Plan",
    category: "High Impact Contributions",
    organization: "Bajaj Finance Limited",
    date: "December 2021",
    year: 2021,
    description:
      "Recognized for significant contributions to enterprise architecture and solution design",
    icon: "ri-award-line",
    color: "#ff6b6b",
  },
  {
    id: 5,
    title: "SMART Award",
    category: "Outstanding Performance",
    organization: "Atos | Syntel",
    date: "Q3 2012",
    year: 2012,
    description:
      "Quarterly award for exceptional performance and technical leadership on FedEx projects",
    icon: "ri-lightbulb-line",
    color: "#ffd93d",
  },
];

// Helper functions
export function getAwardsByYear(year) {
  return awards.filter((award) => award.year === year);
}

export function getRecentAwards(count = 3) {
  return awards.slice(0, count);
}

export function getAwardsByOrganization(org) {
  return awards.filter((award) => award.organization.includes(org));
}
