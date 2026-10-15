export const profile = {
  name: 'Muhammed Kamil Babatunde',
  short: 'Kamil',
  headline: 'Senior Full-Stack Software Engineer | Technical Lead | Founding Engineer',
  location: 'Lagos, Nigeria',
  email: 'kamzycoded@gmail.com',
  phone: '+234 907 360 6049',
  phoneHref: 'tel:+2349073606049',
  github: 'https://github.com/muhammedkamil1995',
  linkedin: 'https://linkedin.com/in/muhammed-kamil',
  x: 'https://x.com/kamzee_m',
  cv: '/Muhammed_Kamil_Babatunde_CV.pdf',
  photo: '/kamil.jpg',
  photoSm: '/kamil-sm.jpg',
}

export const sprintLinks = {
  site: 'https://sprintafrica.com.ng/',
  docs: 'https://docs.sprintafrica.com.ng/',
  signup: 'https://sprintafrica.com.ng/merchant/signup',
  login: 'https://sprintafrica.com.ng/merchant/login',
  portal: 'https://sprintafrica.com.ng/merchant',
  business: 'https://sprintafrica.com.ng/business',
}

export const credibility = [
  { k: '6+', v: 'Years of engineering experience' },
  { k: 'E2E', v: 'End-to-end product ownership' },
  { k: '3', v: 'Web, backend and mobile' },
  { k: '2', v: 'Enterprise and startup experience' },
]

export type Category = 'Logistics' | 'Fintech' | 'AEC Tech' | 'EdTech' | 'Web'

export interface Project {
  slug: string
  name: string
  category: Category
  year: string
  role: string
  summary: string
  stack: string[]
  url?: string
  repo?: string
  flagship?: boolean
  note?: string
  accent: string
}

export const projects: Project[] = [
  {
    slug: 'sprint-africa',
    name: 'Sprint Africa Logistics',
    category: 'Logistics',
    year: '2026',
    role: 'Founding engineer, sole full-stack architect',
    summary:
      'A complete logistics and delivery platform: Django backend, five role-based web dashboards, an Expo mobile app, a merchant API and an analytics layer.',
    stack: ['Django', 'DRF', 'PostgreSQL', 'Redis', 'Celery', 'React', 'TypeScript', 'React Native', 'Expo'],
    url: sprintLinks.site,
    flagship: true,
    accent: '#F5B921',
  },
  {
    slug: 'sprint-connect',
    name: 'Sprint Connect',
    category: 'Logistics',
    year: '2026',
    role: 'Designed and built the merchant API and developer portal',
    summary:
      'Developer-facing shipping infrastructure that lets businesses integrate Sprint Africa delivery into their own systems.',
    stack: ['REST', 'API keys', 'Sandbox', 'Idempotency', 'Docusaurus'],
    url: sprintLinks.docs,
    accent: '#2563EB',
  },
  {
    slug: 'sabo-finance',
    name: 'Sabo Finance',
    category: 'Fintech',
    year: '2024 to 2026',
    role: 'Frontend and API integration',
    summary:
      'Peer-to-peer finance web platform with authenticated workflows and live Django API integrations.',
    stack: ['React', 'TypeScript', 'Vite', 'Django API'],
    url: 'https://sabofinance.com',
    accent: '#22C55E',
  },
  {
    slug: 'bimflow',
    name: 'BIMFlow Suite',
    category: 'AEC Tech',
    year: '2024 to 2026',
    role: 'Django backend for IFC / BIM file processing',
    summary:
      'Engineering-automation product for the built environment. My documented contribution: the Django backend that processes IFC and BIM files and exposes GraphQL and REST APIs for project collaboration.',
    stack: ['Django', 'GraphQL', 'REST', 'IFC / BIM'],
    url: 'https://bimflowsuite.com/',
    repo: 'https://github.com/Nnamdi-Oniya/bimflowsuite',
    accent: '#06B6D4',
  },
  {
    slug: 'mecash',
    name: 'meCash',
    category: 'Fintech',
    year: '2024 to 2026',
    role: 'Delivered the product',
    summary: 'Fintech product with wallet functionality and a financial dashboard.',
    stack: ['Vue.js', 'Java'],
    note: 'No public URL.',
    accent: '#A855F7',
  },
  {
    slug: 'beapir',
    name: 'Beapir',
    category: 'Fintech',
    year: '2024 to 2026',
    role: 'Led the MVP build',
    summary:
      'Peer-to-peer MVP with an Angular frontend and a Python Django backend, including authentication and REST integration.',
    stack: ['Angular', 'Django', 'REST', 'Auth'],
    url: 'https://beapir.com',
    accent: '#F97316',
  },
  {
    slug: 'skyedu',
    name: 'SkyEdu',
    category: 'EdTech',
    year: '2024 to 2026',
    role: 'Full-stack build',
    summary:
      'Education management platform covering student, staff and administrative workflows. Separate from SkyShield Edu.',
    stack: ['Full-stack', 'Role-based access'],
    accent: '#EAB308',
  },
  {
    slug: 'skyshield',
    name: 'SkyShield Edu',
    category: 'EdTech',
    year: 'Education technology',
    role: 'Education technology work',
    summary: 'Aviation cybersecurity training, a distinct product from SkyEdu.',
    stack: ['EdTech', 'Cybersecurity training'],
    accent: '#38BDF8',
  },
]

export const webProjects: { name: string; cat: string; url?: string }[] = [
  { name: 'LuxePrime', cat: 'Real estate marketing', url: 'https://luxeprime.netlify.app/' },
  { name: 'Eleftheros', cat: 'Consultancy website', url: 'https://eleftheros.netlify.app/' },
  { name: 'ManaToGo', cat: 'Food ordering frontend', url: 'https://manatogo.netlify.app/' },
  { name: 'Courage Royal Logistics', cat: 'Logistics website', url: 'https://courageroyallogistics.com/' },
  { name: 'CourageFarm', cat: 'Agribusiness', url: 'https://couragefarm.netlify.app/' },
  { name: 'Umami Fragrance', cat: 'E-commerce storefront', url: 'https://umamifragrance.netlify.app/' },
  { name: 'Ebullient', cat: 'Photography portfolio and booking', url: 'https://ebullient.netlify.app/' },
  { name: 'HealthKamil', cat: 'Health-related web project', url: 'https://healthkamil.netlify.app/' },
  { name: 'Ore Restaurant', cat: 'Restaurant website', url: 'https://benevolent-tanuki-f85bd8.netlify.app/' },
]

export const experience = [
  {
    role: 'Founding Engineer',
    org: 'Sprint Africa Logistics',
    period: 'February 2026 to Present',
    points: [
      'Sole full-stack developer and architect of the logistics platform, from first commit to a live product in under six months (13 Feb to 31 Jul 2026), and iterating since.',
      'Django REST backend on PostgreSQL, Redis and Celery powering courier dispatch, wallet and payments, shipment lifecycle and hub operations.',
      'Five role-based React and TypeScript dashboards: Admin, Customer, Courier, Customer Service and Super Admin.',
      'React Native (Expo) app for Android and iOS with real-time tracking, push notifications, in-app wallet, live chat and maps.',
      'Merchant API, developer documentation, real-time analytics and BI, plus DevOps and cPanel / LiteSpeed deployment.',
    ],
  },
  {
    role: 'Senior Full-Stack Engineer',
    org: 'Independent / Freelance Contracts',
    period: '2024 to 2026',
    points: [
      'Sabo Finance: P2P fintech web platform on React, TypeScript and Vite with live Django API integrations.',
      'BIMFlow Suite: Django backend for IFC and BIM file processing with GraphQL and REST APIs.',
      'meCash: Vue.js and Java fintech platform with wallet and financial dashboard.',
      'Beapir: led a P2P MVP on Angular and Django. SkyEdu: full-stack education management platform.',
    ],
  },
  {
    role: 'ColdFusion Developer',
    org: 'Wema Bank, Enterprise Systems',
    period: '2023 to 2024',
    points: [
      'Built and maintained an internal enterprise application on ColdFusion and MySQL used to automate data input, a workflow used by 300,000+ users, plus a scalable order management system.',
      'Integrated third-party APIs across enterprise workflows and reporting; upgraded legacy ColdFusion applications.',
    ],
  },
  {
    role: 'Junior Web Developer',
    org: 'Various Clients',
    period: '2020 to 2023',
    points: [
      'Built web applications with HTML, CSS and JavaScript, improving engagement by 30% and cutting page load time by 20%.',
      'Led a five-developer team migrating a legacy system to a modern stack.',
      'Frontend delivery for propertyslice.com, raspibtech.com, healthmanagement.com and SkyEdu.',
    ],
  },
]

export const education = [
  { title: 'B.Sc. Marketing', org: 'University of Ilorin', period: '2018 to 2020' },
  { title: 'National Diploma', org: 'Kwara State Polytechnic', period: '2014 to 2016' },
  { title: 'WAEC', org: 'Falomo High School', period: '2006 to 2013' },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'Java', 'HTML5', 'CSS3'] },
  { group: 'Frontend', items: ['React', 'React Native', 'Expo', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'Bootstrap'] },
  { group: 'Backend', items: ['Django', 'Django REST Framework', 'Laravel', 'ColdFusion', 'GraphQL', 'REST APIs'] },
  { group: 'Data & infrastructure', items: ['PostgreSQL', 'MySQL', 'Redis', 'Celery', 'Docker', 'WebSockets'] },
  { group: 'Engineering & deployment', items: ['Git', 'Linux', 'Nginx', 'LiteSpeed', 'cPanel', 'Cloudinary', 'JWT', 'Swagger / OpenAPI'] },
]

export const principles = [
  ['Own the complete delivery lifecycle', 'From schema to store listing, one engineer accountable for how it runs in production.'],
  ['Design around real business workflows', 'Dispatch, hubs, payouts and support shape the data model, not the other way round.'],
  ['Correctness, security and data integrity first', 'Money and shipment state must be right before they are fast.'],
  ['Treat API contracts as products', 'Clear errors, idempotency, versioned docs and a sandbox merchants can trust.'],
  ['Usable under real-world conditions', 'Patchy networks, busy operators and small screens are the default case.'],
  ['Investigate production issues systematically', 'Reproduce, isolate, fix at the cause, then validate.'],
  ['Balance maintainability with speed', 'Ship quickly without leaving a system only its author can change.'],
  ['Understand the product, not only the code', 'A marketing background keeps the commercial problem in view.'],
  ['Make complex systems legible to operators', 'Dashboards and tooling that the people running the business can follow.'],
]

export const engineeringWork = [
  {
    title: 'Merchant API reliability and error handling',
    problem: 'Integrators need predictable responses and safe retries when creating shipments.',
    investigation: 'Reviewed request paths, error shapes and retry behaviour against the documented contract.',
    change: 'Tightened validation, consistent error responses and idempotency handling.',
    result: 'Documented in the Sprint Connect developer portal.',
  },
  {
    title: 'Bulk-order creation, delivery and admin workflows',
    problem: 'Bulk local and interstate orders touched several backend and dashboard paths.',
    investigation: 'Traced bulk creation through delivery identifiers, backend consistency and admin views.',
    change: 'Fixed local bulk-delivery identifier handling and aligned shipment lifecycle integration.',
    result: 'Iterated against production use; ongoing.',
  },
  {
    title: 'Wallet audit and data-integrity fixes',
    problem: 'Wallet balances and transaction records must always reconcile.',
    investigation: 'Audited ledger entries against balances and the flows that write them.',
    change: 'Corrected integrity issues and added database constraints plus exception handling around migrations.',
    result: 'Reconciliation checks in place for the audited flows.',
  },
  {
    title: 'Authentication, throttling and access control',
    problem: 'Five roles and a public merchant API demand strict separation of access.',
    investigation: 'Examined JWT flows, rate limits and role permissions across endpoints.',
    change: 'Resolved throttling and access-control issues and hardened role boundaries.',
    result: 'Role separation maintained across the dashboards and API.',
  },
  {
    title: 'Public tracking, maps and chat reliability',
    problem: 'Tracking pages and live chat must behave under unreliable client conditions.',
    investigation: 'Reproduced map behaviour and chat request failures, including React ref errors.',
    change: 'Fixed chat request validation, map behaviour and frontend state consistency.',
    result: 'Ongoing refinement.',
  },
  {
    title: 'AI orchestration in analytics',
    problem: 'The BI assistant must resolve intent, call the right tools and keep context.',
    investigation: 'Inspected intent resolution, tool registration and conversation memory.',
    change: 'Fixed tool registration and context-memory issues.',
    result: 'Improved analytics assistant behaviour.',
  },
  {
    title: 'Deployment, logging and diagnostics',
    problem: 'A solo-run production system needs fast, trustworthy diagnosis.',
    investigation: 'Reviewed environment configuration, logs and deployment on cPanel / LiteSpeed.',
    change: 'Improved configuration, logging and production diagnostics.',
    result: 'Faster root-cause analysis.',
  },
]

export const connectSteps = [
  'Merchant registration',
  'Login and dashboard access',
  'API key management',
  'Sandbox testing',
  'Rate and delivery quotes',
  'Shipment creation',
  'Shipment tracking',
  'Bulk local and interstate shipments',
  'Production integration',
]

export const shipmentStages = [
  { label: 'Order created', note: 'Customer or merchant submits a delivery request.' },
  { label: 'Pickup', note: 'A courier is dispatched to the origin.' },
  { label: 'Hub processing', note: 'Parcel is received and sorted at a hub.' },
  { label: 'Dispatch', note: 'Assigned for the next leg of delivery.' },
  { label: 'In transit', note: 'Status updates and map progress as it moves.' },
  { label: 'Delivered', note: 'Delivery confirmed and the lifecycle closes.' },
]

export const roles: { name: string; desc: string; features: string[] }[] = [
  { name: 'Customer', desc: 'Book deliveries, track shipments, manage the wallet and raise support requests.', features: ['Local and interstate booking', 'Shipment tracking', 'Wallet', 'Support requests'] },
  { name: 'Courier', desc: 'Accept dispatches, run pickup and delivery workflows and follow earnings.', features: ['Dispatch', 'Pickup and delivery', 'Maps', 'Earnings'] },
  { name: 'Admin', desc: 'Run day-to-day operations: hubs, single and bulk orders, package scanning, courier assignment and delivery status.', features: ['Hub operations', 'Single and bulk orders', 'Package scanning', 'Courier assignment', 'Rate card', 'Exports'] },
  { name: 'Customer Service', desc: 'Handle support conversations and calls, and resolve delivery issues.', features: ['Live chat', 'Call sessions', 'Issue resolution'] },
  { name: 'Super Admin', desc: 'Platform-level oversight, configuration and reporting across the whole operation.', features: ['Platform oversight', 'Visitor analytics', 'Intelligence and BI', 'Reporting and exports'] },
  { name: 'Merchant portal', desc: 'A separate portal for businesses shipping through Sprint Connect: onboarding, KYC, balances, API keys and a full audit trail.', features: ['Registration and login', 'Business information', 'KYC and approval', 'Live and test balances', 'API keys', 'Ledger', 'Audit log', 'Portal users', 'Activity snapshot'] },
]
