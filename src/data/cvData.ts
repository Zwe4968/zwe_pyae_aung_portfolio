// All content below is extracted from Zwe Pyae Aung's CV Form and Resume documents,
// rewritten for clarity where needed but without inventing unverifiable facts.
import type {
  AchievementEntry,
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
  SkillCategory,
} from '../types'

export const personalInfo = {
  name: 'Zwe Pyae Aung',
  title: 'Network Engineer | NOC Specialist | Aspiring Full-Stack Developer',
  shortTitle: 'Network Engineer',
  email: 'zwepyaeaung44@gmail.com',
  phone: '+66 946 416 803',
  address: '52/48, Ek Thaksin 7 Road, Lak Hok, Pathum Thani 12000, Thailand',
  location: 'Pathum Thani, Thailand',
  // Left blank intentionally — no LinkedIn URL was supplied. The Contact/Hero
  // components hide the LinkedIn button whenever this is empty.
  linkedin: '',
  github: 'https://github.com/Zwe4968',
  // BASE_URL already includes a trailing slash (e.g. "/zwe_pyae_aung_portfolio/"),
  // so this resolves correctly both in dev ("/") and once deployed under a subpath.
  resumeFile: `${import.meta.env.BASE_URL}Zwe-Pyae-Aung-Resume.pdf`,
  introduction:
    "Network Engineer with 4+ years of expertise in FTTx, NOC operations, and LAN/WAN/MAN infrastructure. Proficient in Layer 2/3 protocols, PRTG/Zabbix monitoring, and configuring Huawei/Mikrotik devices. CCNA-certified with ongoing CCNP training, now expanding into Python scripting and web development to automate network tasks and build scalable solutions.",
}

export const careerObjective =
  "With four years of experience in the networking field — including three years at Myanmar Net specializing in FTTx, infrastructure quality control, Point-to-Point installation, and NOC operations — I am eager to contribute to the growth and success of a forward-thinking organization. I later served as a NOC Engineer at Marga Global Telecom and currently work as a Senior C&M Engineer at Golden TMH Telecom. I am dedicated to continuous learning and professional development, striving to make a positive impact through hands-on experience in network support, installation, and analysis for LAN/WAN/MAN systems. Proficient in Layer 2 & 3 protocols, data center management, and monitoring tools such as NMS, PRTG, Libre, Observium, and IPAM, I continuously seek to enhance my skills to maximize efficiency and effectiveness within the company."

export const aboutStrengths: string[] = [
  'Detail-oriented and methodical in network diagnostics and reporting',
  'Adaptable across vendor ecosystems (Huawei, Mikrotik, Ubiquiti)',
  'Strong cross-team communicator between field, NOC, and management',
  'Ambitious, honest, hardworking, social, and committed to continuous learning',
]

export const languages = [
  { name: 'English', level: 'Fluent', percent: 95 },
  { name: 'Burmese', level: 'Fluent', percent: 100 },
  { name: 'Thai', level: 'Basic', percent: 35 },
  { name: 'Chinese', level: 'Elementary', percent: 25 },
]

export const education: EducationEntry[] = [
  {
    school: 'Rangsit University',
    location: 'Thailand',
    degree: 'B.Sc. in Digital Innovation Technology',
    major: 'Digital Innovation Technology',
    period: 'May 2024 – Present',
    gpa: null,
    note: 'Integrating programming and emerging technology into scalable network solutions.',
  },
  {
    school: 'KMD College',
    location: 'Myanmar',
    degree: 'Diploma in Network Communication',
    major: 'Network Communication',
    period: 'August 2017 – August 2018',
    gpa: null,
    note: null,
  },
]

export const experience: ExperienceEntry[] = [
  {
    role: 'Senior C&M Engineer',
    company: 'Golden TMH Telecom (GTMH)',
    period: 'June 2023 – Present',
    duties: [
      'Coordinating installation sites across field and NOC teams',
      'Utilizing monitoring tools (Zabbix) to track network health',
      'Providing cross-team technical support for escalated issues',
      'Managing stock and logistics for installation requirements',
      'Conducting daily device checks and reporting with ground teams',
    ],
  },
  {
    role: 'NOC Engineer',
    company: 'Marga Global Telecom (MGT)',
    period: 'June 2022 – June 2023',
    duties: [
      'Managed network monitoring tools and devices (PRTG, Observium)',
      'Handled ticket arrangement and resolution for network incidents',
      'Performed OLT maintenance and setup',
      'Utilized Radius and NCE (Network Cloud Engine) platforms',
      'Configured PPPoE/IPoE servers and VLANs',
      'Produced Topology Ring statement reports',
      'Carried out daily device monitoring with Huawei NE40 and Mikrotik',
    ],
  },
  {
    role: 'Assistant Network Engineer',
    company: 'Frontiir (Myanmar Net)',
    period: 'March 2020 – June 2022',
    duties: [
      'Delivered FTTx, Business Internet (BI), and DIA installations and maintenance',
      'Troubleshot FTTH customer complaints in the field',
      'Implemented Point-to-Point and Point-to-Multipoint infrastructure',
      'Performed data center maintenance and fiber quality control (QC)',
      'Managed day-to-day Network Operations Center (NOC) functions',
    ],
  },
  {
    role: 'Student (On-the-Job Training)',
    company: 'KMD Institute',
    period: '2019',
    duties: ['Set up and installed software and hardware as part of practical training'],
  },
]

export const skillCategories: SkillCategory[] = [
  {
    title: 'Networking',
    icon: 'Network',
    skills: [
      { name: 'LAN / WAN / MAN Infrastructure', level: 92 },
      { name: 'Layer 2 & 3 Protocols', level: 90 },
      { name: 'FTTx / PPPoE / IPoE / VLAN', level: 90 },
      { name: 'Huawei & Mikrotik Configuration', level: 88 },
    ],
  },
  {
    title: 'Cybersecurity',
    icon: 'ShieldCheck',
    skills: [
      { name: 'Network Access Control (Radius)', level: 70 },
      { name: 'VLAN Segmentation & Hardening', level: 68 },
      { name: 'Monitoring-Based Threat Detection', level: 60 },
    ],
  },
  {
    title: 'Cloud Computing',
    icon: 'Cloud',
    skills: [
      { name: 'Firebase', level: 60 },
      { name: 'Network Cloud Engine (NCE)', level: 65 },
      { name: 'Cloud-Hosted Monitoring (Observium)', level: 62 },
    ],
  },
  {
    title: 'Programming Languages',
    icon: 'Code2',
    skills: [
      { name: 'Vue.js', level: 85 },
      { name: 'Python', level: 65 },
      { name: 'JavaScript / TypeScript', level: 62 },
    ],
  },
  {
    title: 'Databases',
    icon: 'Database',
    skills: [
      { name: 'Firebase', level: 62 },
      { name: 'MySQL / SQLite', level: 60 },
      { name: 'IPAM', level: 70 },
    ],
  },
  {
    title: 'Web Development',
    icon: 'Globe',
    skills: [
      { name: 'HTML / CSS / Glassmorphism UI', level: 70 },
      { name: 'Vue 3 + Vite', level: 78 },
      { name: 'React', level: 55 },
      { name: 'FastAPI (Python)', level: 55 },
    ],
  },
  {
    title: 'Operating Systems',
    icon: 'Terminal',
    skills: [
      { name: 'Ubuntu / Linux', level: 80 },
      { name: 'Windows Server & Desktop', level: 85 },
    ],
  },
  {
    title: 'Other Technical Skills',
    icon: 'Wrench',
    skills: [
      { name: 'PRTG / Zabbix / Observium', level: 90 },
      { name: 'Google Earth (Mapping & Analysis)', level: 75 },
      { name: 'Microsoft Excel / Word / PowerPoint', level: 88 },
    ],
  },
]

export const certifications: CertificationEntry[] = [
  {
    name: 'CCNA (Cisco 200-301)',
    issuer: 'IT Garden',
    date: 'July 2022 – November 2022',
    credentialId: null,
    credentialUrl: null,
  },
  {
    name: 'CCNP (Advanced Routing)',
    issuer: 'VCE Training',
    date: 'March 2023 – June 2023',
    credentialId: null,
    credentialUrl: null,
  },
  {
    name: '4 Skills Elementary Course (Level 1) — Chinese Language',
    issuer: 'Jin Long Learning Center',
    date: 'Awarded March 17, 2026',
    credentialId: 'YGN-JLLC-BFC I 104-408',
    credentialUrl: null,
  },
]

export const achievements: AchievementEntry[] = [
  {
    title: 'CCNA Certified (Cisco 200-301)',
    description:
      'Earned industry-recognized Cisco certification validating core networking fundamentals, IP connectivity, and security basics.',
    year: '2022',
  },
  {
    title: 'Promoted to Senior C&M Engineer',
    description:
      'Advanced from NOC Engineer to a senior coordination role at Golden TMH Telecom, taking on cross-team technical leadership.',
    year: '2023',
  },
  {
    title: 'CCNP Advanced Routing Training',
    description:
      'Completed advanced routing coursework through VCE Training, building toward full CCNP certification.',
    year: '2023',
  },
  {
    title: 'Returned to Higher Education',
    description:
      'Enrolled in B.Sc. Digital Innovation Technology at Rangsit University to formally bridge networking expertise with software development.',
    year: '2024',
  },
  {
    title: 'Completed Chinese Language Course with Higher Distinction',
    description:
      'Completed the 4 Skills Elementary Course (Level 1) at Jin Long Learning Center with Higher Distinction in all required competencies, adding Chinese to a growing multilingual skill set.',
    year: '2026',
  },
]

export const navLinks = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'education', href: '#education' },
  { key: 'experience', href: '#experience' },
  { key: 'skills', href: '#skills' },
  { key: 'certifications', href: '#certifications' },
  { key: 'projects', href: '#projects' },
  { key: 'githubStats', href: '#github-stats' },
  { key: 'achievements', href: '#achievements' },
  { key: 'contact', href: '#contact' },
] as const
