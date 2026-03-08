/**
 * Projects Data
 * Enhanced with architect-level case study information and skill tags
 */

export const projects = [
  {
    id: "rahi-platform",
    name: "Core Lending Platform",
    shortName: "Rahi Platform",
    domain: "FinTech",
    year: "2024-Present",
    company: "Rahi Platform Technologies",
    image: "images/projects/rahi-platform-01.png",
    tags: [
      "Multi-tenant SaaS",
      "Microservices",
      "Micro Frontends",
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "AI/ML Integration",
      "Spring Boot",
      "UI/UX Design",
      "AWS",
    ],

    challenge:
      "As the first engineer on the team, build a configurable multi-tenant SaaS platform from ground zero that empowers business users to configure lending products without code. The vision: enable financial institutions to design custom workflows, build dynamic UIs, and define business rules—transforming months of engineering work into days of configuration. Required hands-on architecture and development of five interconnected applications serving the complete lending lifecycle.",

    architecture: [
      "Architected and built Web Renderer Library: 30+ zero-dependency React components powering dynamic UI rendering from JSON configurations (forms, tables, multi-step journeys, data grids)",
      "Designed and developed User Interface Configurator: drag-and-drop page builder enabling business users to create complex UIs without coding, with real-time preview and version control",
      "Built Workflow Designer: visual canvas for orchestrating lending workflows with 12+ node types (tasks, decisions, parallel execution, API integration) and conditional routing",
      "Created Rule Designer: Business Rules Engine UI for visual rule authoring, decision tables, and real-time testing with comprehensive audit trails",
      "Engineered Portal shell application with multi-tenant isolation, role-based access control, and session management integrating all platform components",
      "Implemented JSON DSL architecture decoupling UI definition from rendering, enabling portable and versionable configurations",
      "Designed multi-layered security: tenant isolation, row-level data separation, component-level access control, and encrypted session management",
    ],

    scale: {
      applications: "5 interconnected tools built",
      components: "30+ zero-dependency components",
      microsites: "500+ production sites powered",
      performance: ">95% Lighthouse • <1s load",
      team: "10+ developers hired & mentored",
      coverage: ">90% unit test coverage",
    },

    impact: [
      "Empowered business users to build lending products without engineering dependencies—reduced time-to-market by 40%",
      "Built zero-dependency component architecture eliminating reliance on third-party libraries while maintaining full control",
      "Enabled white-label microsite deployment in days instead of months through configurable UI and workflow tools",
      "Designed enterprise-grade security with strict tenant isolation and SOC 2 compliance readiness",
      "Scaled platform to support microsites, customer portals, dynamic reports, and email template rendering seamlessly",
      "Led engineering team of 10+ developers, establishing coding standards, >90% test coverage, and technical excellence culture",
      "Designed intuitive UX for all three designer tools to improve adoption for non-technical business users",
    ],

    techStack: [
      "React 19",
      "Next.js 15",
      "TypeScript",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "AWS",
      "SCSS",
    ],
    role: "Founding Solution Architect",

    detailedDescription: `**The Platform Vision**

Joined Rahi with a mission: build a configurable lending platform where business users—not engineers—define products. Traditional lending software requires months of development for new workflows, UI changes, or business rules. I architected and hands-on built five interconnected applications that transformed this paradigm.

**The Five-Application Ecosystem**

**1. Web Renderer Library** — The Foundation
Architected and built 30+ production-grade React components from scratch without dependencies on Material-UI, Ant Design, or similar libraries. Components include advanced forms with multi-step navigation, editable data tables, conditional field rendering, file uploads with validation, location pickers, payment integrations, and dynamic data grids. The library consumes JSON configurations from the User Interface Configurator and renders them as performant, accessible UIs achieving >95% Lighthouse scores with <1 second load times.

**2. User Interface Configurator** — No-Code Page Builder
Designed and developed a visual drag-and-drop interface enabling business users to assemble pages from the 30+ component library. Built property panels for configuring component behavior, API integrations, validation rules, conditional visibility, and custom JavaScript interceptors. Implemented real-time preview with desktop/mobile views, version control (Draft → Review → Published), and comprehensive testing tools. Business users now build production UIs in hours that previously required weeks of React development.

![User Interface Configurator — Drag-and-drop page builder with 30+ components](images/projects/rahi-platform-01.png)

**3. Workflow Designer** — Visual Orchestration Canvas
Created a visual workflow editor with an infinite canvas supporting 12+ node types: Portal Tasks (user interfaces), Module Tasks (backend operations), Decision Nodes (conditional branching), Fork/Join Nodes (parallel execution), API Tasks, and SubWorkflows. Built state transition management, auto-layout optimization, and import/export capabilities. Lending teams now visually design complex workflows—underwriting, disbursement, collections—without writing code or filing engineering tickets.

![Workflow Designer — Visual canvas for orchestrating lending workflows](images/projects/rahi-platform-02.jpg)

**4. Rule Designer** — Business Rules Engine UI
Architected a visual rule builder supporting When-Then-Else logic, decision tables for multi-condition scenarios, and expression-based actions. Integrated condition builder supporting nested AND/OR logic, built-in functions, and custom variables. Implemented real-time simulator for testing rules with mock data and viewing execution audit trails. Product teams now define pricing rules, eligibility criteria, and document requirements through intuitive interfaces instead of Java code.

![Rule Designer — Visual business rules engine with When-Then-Else logic](images/projects/rahi-platform-03.jpg)

**5. Portal Application** — Secure Execution Shell
Built the runtime environment serving as the host for all rendered microsites. Implemented multi-tenant architecture with strict tenant isolation, row-level data access control, and encrypted session management. Handles authentication, authorization, API routing, and integration with backend microservices. Ensures enterprise security while delivering high-performance user experiences.

![Portal Application — Secure multi-tenant execution shell for rendered microsites](images/projects/rahi-platform-04.jpg)

**Security Architecture**

Designed defense-in-depth security spanning all five applications:

**Multi-Tenant Isolation:** Each financial institution operates in a logically isolated environment with dedicated databases, separate data schemas, and encrypted data-at-rest. Zero data leakage between tenants through architectural boundaries.

**Access Control Layers:** Role-based access control (RBAC) at application level, page-level permissions controlling visibility, component-level access rules (view/edit/hide), and field-level security for sensitive data.

**Session Security:** Encrypted session tokens with automatic expiry, token refresh without user disruption, protection against CSRF and XSS attacks, and audit logging of all user actions.

**API Security:** Backend API authentication using JWT tokens, rate limiting preventing abuse, input sanitization, and SQL injection prevention.

**Compliance Ready:** Architecture designed for SOC 2 compliance with comprehensive audit trails, data encryption (in-transit and at-rest), tenant data isolation meeting regulatory standards, and GDPR-compliant data handling.

**JSON DSL Architecture — The Innovation Core**

The platform's power lies in configuration-driven rendering. User Interface Configurator outputs JSON DSL specifications describing page structure, component properties, validation rules, and conditional behavior. Web Renderer Library consumes these JSONs at runtime, dynamically rendering UIs without deployments. This decoupling enables:

- Business users publish UI changes instantly without engineering cycles
- A/B testing different layouts and flows through configuration switches
- White-label branding per tenant through JSON-based theming
- Version control and rollback of UI configurations
- Rapid onboarding of new financial institutions with template-based configurations

**Performance Engineering**

Delivered strong performance through hands-on optimization:

- Server-side rendering (SSR) with Next.js delivering sub-second Time to First Byte
- Code splitting and lazy loading minimizing JavaScript bundle sizes
- Optimized component rendering preventing unnecessary re-renders
- Efficient state management using React Context avoiding prop drilling
- CDN-optimized asset delivery for images and static resources
- Database query optimization and Redis caching for API responses

**Team Leadership & Engineering Culture**

Wore multiple hats: hands-on architect writing production code, technical leader setting system vision, and team builder hiring 10+ UI developers. Established engineering standards:

- Comprehensive code review process ensuring quality and knowledge sharing
- Unit testing mandate achieving >90% coverage across all five applications
- Documentation standards for component APIs and architectural decisions
- Pair programming sessions for knowledge transfer
- Weekly tech talks fostering continuous learning culture

**Business Transformation Impact**

The platform fundamentally changed how Rahi delivers lending products:

**Before:** Launching new lending products required 3-6 months of engineering—backend APIs, frontend development, testing, deployment. Changes to workflows or UIs meant code updates, testing cycles, and coordinated releases.

**After:** Product teams configure new lending products in 2-4 weeks using the five designer tools. They design workflows visually, build UIs through drag-and-drop, and define business rules without code. Engineering focuses on platform enhancements, not repetitive product implementations.

This transformation enabled rapid customer onboarding, experimentation with product variations, and agile responses to regulatory changes—delivering clear operational advantage in the lending market.`,
  },

  {
    id: "bajaj-finance",
    name: "Solution Architecture at Bajaj Finance",
    shortName: "Bajaj Technology Services",
    domain: "Finance",
    year: "2021-2024",
    company: "Bajaj Technology Services",
    image: "images/projects/bajaj-finance-01.png",
    tags: [
      "Angular",
      "Spring Boot",
      "Microservices",
      "Event Driven Architecture",
      "AI/ML Integration",
      "UI/UX Design",
      "AWS",
    ],

    challenge:
      "Joined Bajaj Technology Services as the Senior Solution Architect responsible for designing enterprise-grade architecture across microservices and micro-frontend platforms within a large-scale NBFC ecosystem serving millions of users. The role demanded ownership of 100+ architecture solutions spanning digital lending, insurance aggregation, and customer engagement—while simultaneously driving pre-sales for international expansion and modernizing legacy systems.",

    architecture: [
      "Designed 100+ enterprise-grade microservices and micro-frontend architectures for platforms serving millions of users",
      "Re-architected CI/CD and asset distribution pipeline using S3 + CloudFront, reducing infrastructure costs by 13%",
      "Led Angular modernization initiatives improving performance metrics by ~70% and aligning with Core Web Vitals standards",
      "Designed real-time, high-throughput product listing architecture for insurance aggregator using Spring Boot and Angular",
      "Delivered 10+ pre-sales architecture proposals for Middle East clients including infrastructure sizing and cost estimation models",
      "Architected event-driven systems for real-time notifications and customer engagement workflows",
      "Implemented API Gateway patterns for unified service access across the NBFC ecosystem",
    ],

    scale: {
      solutions: "100+ architectures designed",
      costSaving: "13% AWS billing reduction",
      performance: "~70% performance improvement",
      rfps: "10+ pre-sales proposals",
    },

    impact: [
      "Re-architected CI/CD and asset distribution reducing AWS infrastructure costs by 13%",
      "Improved insurance aggregator sales conversion significantly through real-time eager-loading architecture",
      "Modernized legacy Angular applications to v14 with ~70% performance improvement aligned to Core Web Vitals",
      "Delivered architecture proposals that helped secure Middle Eastern client deals worth millions",
      "Mentored developers on microservices patterns, cloud-native design, and architectural best practices",
    ],

    techStack: [
      "Angular",
      "Spring Boot",
      "AWS",
      "Jenkins",
      "Microservices",
      "Kafka",
      "Redis",
    ],
    role: "Senior Solution Architect",

    detailedDescription: `**My Role at Bajaj Technology Services**

I joined BTS as the Senior Solution Architect, working within the technology arm of Bajaj Finance Ltd.—India's largest NBFC. My primary responsibility was designing enterprise-grade architecture solutions for platforms that served millions of end users across lending, insurance, and customer engagement verticals.

**Day-to-Day Responsibilities**

My work revolved around translating complex business requirements into scalable, maintainable technical architectures. Over three years, I designed 100+ solutions spanning microservices decomposition, micro-frontend federation, cloud infrastructure, and API design. Each solution went through rigorous review cycles with engineering leads, DevOps teams, and business stakeholders before implementation.

**Digital Lending & Insurance Platforms**

I architected end-to-end lending flows—from customer acquisition through loan disbursement—integrating with core banking systems and credit bureaus. For the insurance aggregator, I designed a real-time, high-throughput product listing architecture using Spring Boot and Angular with eager-loading patterns that significantly boosted sales conversion rates.

![Insurance Aggregator — Real-time product listing with multi-insurer comparison](images/projects/bajaj-finance-01.png)

**Infrastructure & Cost Optimization**

One of my key contributions was re-architecting the CI/CD and asset distribution pipeline. By moving to a serverless S3 + CloudFront setup, I reduced AWS infrastructure costs by 13%. This wasn't just a technical win—it translated to substantial annual savings for the organization.

**Angular Modernization**

I led the modernization of legacy Angular applications, migrating them to v14 with a focus on Core Web Vitals. This effort resulted in ~70% performance improvements across the platforms, directly impacting user experience and engagement metrics.

**Pre-Sales & International Expansion**

Beyond core architecture work, I delivered 10+ pre-sales architecture proposals for Middle Eastern clients. These included infrastructure sizing, cost estimation models, and technical feasibility assessments. My proposals played a crucial role in securing client deals worth millions, expanding the company's footprint beyond India.

**Mentorship & Knowledge Sharing**

I mentored developers on microservices patterns, cloud-native design principles, and architectural best practices—helping build a stronger engineering culture within the team.`,
  },

  {
    id: "bwell",
    name: "Corporate Wellness Ecosystem",
    shortName: "B.Well",
    domain: "Healthcare & Wellness",
    year: "2020-2021",
    company: "Ibinito Pvt. Ltd.",
    image: "images/projects/b-well-01.png",
    tags: [
      "Angular",
      "Spring Boot",
      "Apache Kafka",
      "Event Driven Architecture",
      "UI/UX Design",
      "PostgreSQL",
      "AWS",
    ],

    challenge:
      "Design a Dubai-based corporate wellness platform connecting employees, health coaches, and HR teams through personalized wellness journeys. Required real-time health metrics algorithms, live video consultations, gamified challenges, and comprehensive analytics - all while maintaining HIPAA-equivalent data privacy standards.",

    architecture: [
      "Event-driven architecture using Apache Kafka for real-time data streams",
      "Health metric calculation engine processing biometric data",
      "WebRTC-based live video streaming infrastructure",
      "Personalized wellness journey recommendation engine",
      "Gamification system with challenges, leaderboards, and rewards",
      "Role-based dashboards for employees, coaches, and administrators",
      "Integration layer for wearables and health tracking devices",
    ],

    scale: {
      users: "10,000+ corporate employees",
      realtime: "Live video streaming for 1:1 coaching",
      metrics: "15+ health parameters tracked",
      engagement: "80%+ monthly active users",
    },

    impact: [
      "Delivered platform to 5 enterprise clients in UAE within 8 months",
      "Achieved 80%+ user engagement through personalization and gamification",
      "Enabled data-driven wellness interventions reducing healthcare costs",
      "Integrated with Apple Health, Google Fit, and Fitbit seamlessly",
      "Maintained zero PHI data breaches with end-to-end encryption",
    ],

    techStack: [
      "Spring Boot",
      "Apache Kafka",
      "Angular",
      "WebRTC",
      "PostgreSQL",
      "Redis",
      "AWS",
    ],
    role: "Solution Architect",

    detailedDescription: `Architected B.Well as a comprehensive corporate wellness platform with three key user personas:

**Employee Portal:** Personalized health dashboard, wellness journey tracking, challenge participation, health coach consultations, and biometric data visualization.

![Employee Portal — Wellness tracker with personalized health dashboard](images/projects/b-well-01.png)

**Health Coach Console:** Client management, video consultation scheduling, progress tracking, personalized program creation, and outcome analytics.

![HR Admin Dashboard — Organization-wide wellness metrics and analytics](images/projects/b-well-02.png)

**HR Admin Dashboard:** Organization-wide wellness metrics, ROI tracking, program effectiveness analysis, and employee engagement insights.

![Mobile App — Wellness tracking and health coaching on the go](images/projects/b-well-03.png)

The platform's recommendation engine used health data, user preferences, and behavioral patterns to suggest personalized wellness activities, creating a Netflix-like experience for corporate health.`,
  },

  {
    id: "themaddresser",
    name: "Personal Styling SaaS",
    shortName: "The Mad Dresser",
    domain: "Fashion Tech & E-Commerce",
    year: "2019-2020",
    company: "The Mad Dresser",
    image: "images/projects/themaddresser-01.png",
    tags: ["Angular", "Spring Boot", "PostgreSQL", "UI/UX Design", "AWS"],

    challenge:
      "Design a personalized fashion styling platform where customers receive curated clothing boxes based on their style profile, body measurements, and fashion preferences. Required sophisticated style matching algorithms, inventory management, subscription billing, and seamless returns processing.",

    architecture: [
      "Style profile recommendation engine using preference matching",
      "Multi-step onboarding flow capturing body measurements and preferences",
      "Stylist console for manual curation and customer feedback analysis",
      "Subscription management with flexible billing cycles",
      "Integration with logistics partners for doorstep delivery and returns",
      "Inventory allocation engine balancing stock levels and style preferences",
      "Feedback loop system improving recommendations over time",
    ],

    impact: [
      "Enabled women-led startup to disrupt traditional fashion retail",
      "Achieved 65% item purchase rate from styled boxes",
      "Built sustainable fashion model through reduced returns via personalization",
      "Streamlined stylist operations handling 50+ boxes per stylist weekly",
      "Integrated with 20+ sustainable and local fashion brands",
    ],

    techStack: [
      "Spring Boot",
      "Angular",
      "PostgreSQL",
      "Razorpay",
      "AWS S3",
      "RESTful APIs",
    ],
    role: "Solution Architect & Technical Lead",

    detailedDescription: `Architected The Mad Dresser as a technology-enabled personal styling service with two core flows:

![Landing page introducing the personalized styling experience](images/projects/themaddresser-01.png)

**Mystery Box Flow:** Customers pay flat ₹5,000 upfront, receive 5 stylist-curated items, try at home for 3 days, and return unwanted pieces with automatic refunds.

**Standard Box Flow:** Customers pay ₹699 styling fee, receive digital selection catalog with 10+ options, select items to receive, and complete typical try-and-return cycle.

![Step-by-step breakdown of how the styling service works](images/projects/themaddresser-02.png)

The platform's intelligence layer learned from customer feedback after each shipment, refining style profiles and improving curation accuracy. Integration with sustainable brands aligned with the company's eco-conscious mission, tracking carbon footprint and promoting mindful fashion consumption.

![Customer pipeline view tracking order progress from styling to delivery](images/projects/themaddresser-03.png)

Key technical innovations included the styling algorithm that matched customer profiles with inventory attributes, the logistics orchestration managing pickups and deliveries, and the financial reconciliation system handling complex refund scenarios.

![Customer selecting a stylist-suggested outfit from the curated catalog](images/projects/themaddresser-04.png)`,
  },

  {
    id: "bit7pay",
    name: "Cryptocurrency Trading Platform",
    shortName: "Bit7Pay",
    domain: "Blockchain & Crypto",
    year: "2018",
    company: "Ibinito Pvt. Ltd.",
    image: "images/projects/bit7pay-01.png",
    tags: [
      "Angular",
      "Spring Boot",
      "PostgreSQL",
      "AWS",
      "Blockchain",
      "UI/UX Design",
    ],

    challenge:
      "Architect India's second cryptocurrency trading platform with high throughput, security, and real-time order matching",

    architecture: [
      "Microservices-based trading engine with order matching service",
      "Real-time WebSocket connections for live price updates",
      "Multi-layer security architecture with cold/hot wallet separation",
      "Scalable wallet management system with blockchain integration",
      "KYC/AML compliance workflows with document verification",
    ],

    scale: {
      coins: "110+ cryptocurrencies",
      users: "25,000+ active traders",
      volume: "Sub-second order matching",
      uptime: "99.9% availability",
    },

    impact: [
      "Scaled to 25,000+ active traders across 110+ listed cryptocurrencies",
      "Achieved sub-second order matching latency",
      "Implemented multi-sig wallet controls and security hardening for trading operations",
      "Scaled seamlessly during 10x traffic spikes during market volatility",
    ],

    techStack: [
      "Java",
      "Spring Boot",
      "WebSocket",
      "PostgreSQL",
      "Redis",
      "Blockchain APIs",
    ],
    role: "Solution Architect & Co-Founder",

    detailedDescription: `Co-founded and architected Bit7Pay as a secure, high-performance cryptocurrency exchange supporting 110+ digital assets.

![Exchange platform for trading cryptocurrencies across web and mobile](images/projects/bit7pay-01.png)

The platform featured real-time order book management, advanced trading options (limit, market, stop-loss), and institutional-grade security with cold storage for 95% of assets. Integrated with multiple blockchain networks for deposits and withdrawals while maintaining regulatory compliance with Indian cryptocurrency guidelines.

![Mobile wallet with multi-currency support and instant transfers](images/projects/bit7pay-02.jpg)

![Transaction history tracking across supported cryptocurrencies](images/projects/bit7pay-03.png)`,
  },

  {
    id: "greenarth",
    name: "GreenArth — Sustainable E-Commerce Marketplace",
    shortName: "GreenArth",
    domain: "E-Commerce",
    year: "2021",
    company: "Ibinito Pvt. Ltd.",
    image: "images/projects/greenarth-01.png",
    tags: [
      "Angular",
      "Spring Boot",
      "AWS",
      "UI/UX Design",
      "E-Commerce",
      "PostgreSQL",
    ],

    challenge:
      "Design and build a full-fledged multi-vendor sustainable e-commerce marketplace from scratch — covering buyer shopping flows, seller onboarding and management, and a comprehensive admin panel. The platform needed to handle product discovery, cart and checkout with payment gateway integration, order lifecycle management (cancel, return, replace), seller verification and wallet/withdrawal systems, inventory management with low-stock alerts, referral and promo code engines, blog CMS, and a responsive public website — all under one cohesive architecture.",

    architecture: [
      "Multi-vendor marketplace architecture with isolated buyer, seller, and admin portals",
      "Buyer portal: product search with tags and categories, sorting, filters, cart, checkout, payment gateway, order history, cancel/return/replace flows, wallet, referrals, and product reviews",
      "Seller Central: business onboarding with admin verification, product listing management, order fulfillment with tracking, inventory management with low-stock alerts, wallet and withdrawal system, reviews dashboard",
      "Admin panel: buyer/seller management, product and category management, withdrawal approvals, order oversight, promo code and referral management, blog CMS, inventory controls",
      "Event-driven order lifecycle using Apache Kafka for real-time status updates and email notifications across signup, order, shipping, delivery, returns, and refunds",
      "Payment gateway integration with wallet system supporting refunds, referral credits, and withdrawal requests",
      "Public website with landing page, about us, policies, FAQs, blogs, and SEO-friendly responsive design with Google Analytics and Facebook Pixel",
    ],

    scale: {
      portals: "3 portals (Buyer, Seller, Admin)",
      features: "Full order lifecycle management",
      inventory: "Real-time inventory with alerts",
      payments: "Wallet, referrals & promo engine",
    },

    impact: [
      "Delivered a complete multi-vendor marketplace enabling sellers to onboard, list products, and manage orders independently",
      "Built end-to-end buyer experience from product discovery through checkout, payment, and post-order management",
      "Designed admin controls for seller verification, withdrawal approvals, inventory oversight, and content management",
      "Implemented referral engine, promo codes, and wallet system driving buyer acquisition and retention",
      "Architected event-driven notification system keeping buyers informed across the entire order lifecycle",
    ],

    techStack: [
      "Angular",
      "Spring Boot",
      "PostgreSQL",
      "MongoDB",
      "Kafka",
      "AWS",
    ],
    role: "Solution Architect",

    detailedDescription: `**Building GreenArth**

GreenArth was a multi-vendor sustainable e-commerce marketplace I designed and built at Ibinito. The vision was to create a platform where eco-conscious sellers could reach buyers looking for sustainable products — with a complete marketplace infrastructure handling everything from product discovery to post-order management.

**Buyer Experience**

The buyer side covered the full shopping journey. Buyers could sign up via email or social login (Google, Facebook), browse products with search, category filters, price ranges, and brand filters. Each product page displayed multiple images, detailed descriptions, materials used, recycling information, multipacks, reviews, and discounts. The cart supported add/remove/quantity changes, and checkout included address management with mobile OTP verification, referral/promo code application, expected delivery dates, and payment gateway integration. Post-purchase, buyers could view order history, cancel orders, raise return or replacement requests, track refunds to their wallet, and leave product reviews.

![GreenArth — Landing page and product browsing experience](images/projects/greenarth-01.png)

**Seller Central**

Sellers had their own portal for managing their business on the platform. The onboarding flow included business profile creation submitted for admin verification. Once approved, sellers could add and manage product listings (activate/deactivate), handle incoming orders with status updates and tracking details (courier service, tracking number, URL), manage their inventory with low-stock alerts, view and respond to product reviews, and manage their wallet — viewing balances, raising withdrawal requests, and tracking transaction history.

![Seller Central — Store profile and business onboarding](images/projects/greenarth-02.jpg)

**Admin Panel**

The admin panel provided full oversight of the marketplace. Admins managed buyers and sellers (verify, activate/deactivate, archive), controlled product listings and categories, handled withdrawal request approvals with transaction tracking, oversaw all orders with filtering and status management, managed inventory across sellers, created and managed promo codes with business rules and expiry, and maintained the blog CMS with image uploads, content editing, and reordering.

**Order Lifecycle & Notifications**

I designed an event-driven architecture using Apache Kafka to handle the complete order lifecycle — from placement through shipping, delivery, cancellation, returns, replacements, and refunds. Email notifications were triggered at every stage: signup confirmation, order placed, shipped, delivered, return initiated, and refund processed.

**Wallet, Referrals & Promo System**

The platform included a wallet system where buyers could receive refunds and referral credits. The referral engine gave both the referrer and the referred buyer credit after the first purchase. Admins could create promo codes with configurable business rules and expiry dates.

**Public Website**

Beyond the marketplace portals, I designed the public-facing website including the landing page, about us, contact, privacy policy, returns policy, shipping policy, terms and conditions, FAQs, and blog. The site was mobile-friendly, HTTPS-secured, and integrated with Google Analytics and Facebook Pixel for tracking.`,
  },
];

// Helper function to get project by ID
export function getProjectById(id) {
  return projects.find((p) => p.id === id);
}

// Helper function to get projects by domain
export function getProjectsByDomain(domain) {
  return projects.filter((p) => p.domain.includes(domain));
}

// Helper function to filter projects by tags/skills
export function getProjectsByTags(tags) {
  if (!tags || tags.length === 0) return projects;

  return projects.filter((project) =>
    tags.some((tag) => project.tags.includes(tag)),
  );
}

// Get all unique tags across projects
export function getAllTags() {
  const tagsSet = new Set();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}
