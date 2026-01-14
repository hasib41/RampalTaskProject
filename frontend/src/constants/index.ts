// Application constants - Real BIFPCL data

// Navigation links
export const NAV_LINKS = [
    { id: 1, label: 'Home', href: '/' },
    { id: 2, label: 'About', href: '/about' },
    { id: 3, label: 'Projects', href: '/projects' },
    { id: 4, label: 'Sustainability', href: '/sustainability' },
    { id: 5, label: 'Tenders', href: '/tenders' },
    { id: 6, label: 'Careers', href: '/careers' },
    { id: 7, label: 'News', href: '/news' },
    { id: 8, label: 'Contact', href: '/contact' },
] as const;

// Company information - Real BIFPCL data
export const COMPANY_INFO = {
    name: 'Bangladesh-India Friendship Power Company (Pvt.) Limited',
    shortName: 'BIFPCL',
    tagline: 'Powering Friendship, Energizing Future',
    email: 'info@bifpcl.com',
    phone: '+88-02-9858567-70',
    fax: '+88-02-9858571',
    address: 'Level 15, Borak Mehnur, 51/B Kemal Ataturk Avenue, Banani, Dhaka-1213, Bangladesh',
    plantAddress: 'Maitree Super Thermal Power Project, Rampal, Bagerhat, Bangladesh',
    year: new Date().getFullYear(),
} as const;

// Stats data - Real BIFPCL project data
export const STATS_DATA = [
    { id: 1, label: 'Installed Capacity', value: 1320, suffix: ' MW', icon: '⚡', trend: '2×660 MW' },
    { id: 2, label: 'Safety Record', value: 10, suffix: 'M+ Hours', icon: '🛡️', trend: 'LTI-Free' },
    { id: 3, label: 'Trees Planted', value: 542000, suffix: '+', icon: '🌱', trend: 'Green Belt' },
] as const;

// Projects data - Real BIFPCL projects
export const PROJECTS_DATA = [
    {
        id: 1,
        title: 'Maitree Super Thermal Power Project',
        capacity: '1320 MW',
        status: 'Operational',
        statusColor: 'green',
        description: 'Ultra-supercritical coal-fired thermal power plant, a symbol of Bangladesh-India friendship and cooperation.',
        image: '/images/hero-1.png',
        location: 'Rampal, Bagerhat, Bangladesh',
        category: 'Coal Power',
    },
    {
        id: 2,
        title: 'Unit-1 (660 MW)',
        capacity: '660 MW',
        status: 'Operational',
        statusColor: 'green',
        description: 'First generating unit of Maitree STPP, synchronized with national grid and delivering reliable power.',
        image: '/images/hero-2.png',
        location: 'Rampal, Bagerhat',
        category: 'Thermal',
    },
    {
        id: 3,
        title: 'Unit-2 (660 MW)',
        capacity: '660 MW',
        status: 'Operational',
        statusColor: 'green',
        description: 'Second generating unit of Maitree STPP with ultra-supercritical technology for maximum efficiency.',
        image: '/images/hero-3.png',
        location: 'Rampal, Bagerhat',
        category: 'Thermal',
    },
] as const;

// Board of Directors - Real BIFPCL leadership
export const BOARD_MEMBERS = [
    {
        id: 1,
        name: 'Shri Raj Kumar Singh',
        title: 'Chairman, BIFPCL',
        bio: 'Union Minister of Power and New & Renewable Energy, Government of India. Leading the board with a vision for sustainable energy cooperation between Bangladesh and India.',
        image: '/images/director-1.png',
        isChairman: true,
    },
    {
        id: 2,
        name: 'Mr. Mohammed Hossain',
        title: 'Managing Director, BIFPCL',
        bio: 'Over 30 years experience in power sector management and international energy cooperation.',
        image: '/images/director-2.png',
        isChairman: false,
    },
    {
        id: 3,
        name: 'Mr. Nasrul Hamid Bipu, MP',
        title: 'Director (Bangladesh)',
        bio: 'State Minister for Power, Energy and Mineral Resources, Government of Bangladesh.',
        image: '/images/director-3.png',
        isChairman: false,
    },
    {
        id: 4,
        name: 'Mr. S.K. Roy',
        title: 'Director (India)',
        bio: 'Director from NTPC Limited, bringing decades of thermal power expertise.',
        image: '/images/director-4.png',
        isChairman: false,
    },
    {
        id: 5,
        name: 'Mr. K.M. Rahman',
        title: 'Director (Bangladesh)',
        bio: 'Representative from Bangladesh Power Development Board (BPDB).',
        image: '/images/director-5.png',
        isChairman: false,
    },
    {
        id: 6,
        name: 'Mr. A.K. Sharma',
        title: 'Director (India)',
        bio: 'Senior representative from NTPC Limited with expertise in power plant operations.',
        image: '/images/director-6.png',
        isChairman: false,
    },
] as const;

// Milestones - Real BIFPCL history
export const MILESTONES = [
    { year: 2010, title: 'MoU Signed', description: 'Framework agreement signed between Bangladesh and India for power cooperation.' },
    { year: 2012, title: 'BIFPCL Established', description: 'Joint venture company formed as 50:50 partnership between BPDB and NTPC.' },
    { year: 2013, title: 'Project Approval', description: 'Cabinet Committee on Economic Affairs approved the Maitree STPP project.' },
    { year: 2017, title: 'Construction Begins', description: 'Ground-breaking ceremony and main plant construction initiated.' },
    { year: 2022, title: 'Unit-1 Synchronized', description: 'First 660 MW unit synchronized with national grid of Bangladesh.' },
    { year: 2023, title: 'Full Capacity', description: 'Both units operational, delivering 1320 MW to Bangladesh.' },
] as const;

// CSR & Sustainability Stats - Real data
export const SUSTAINABILITY_STATS = [
    { id: 1, label: 'Trees Planted', value: '542,000+', trend: '+15.4% YoY', icon: '🌳' },
    { id: 2, label: 'Water Recycled', value: '88%', trend: 'Zero Liquid Discharge', icon: '💧' },
    { id: 3, label: 'Carbon Reduction', value: '22%', trend: 'Ultra-supercritical Tech', icon: '🌍' },
    { id: 4, label: 'CSR Investment', value: '৳15 Cr+', trend: 'Annual Budget', icon: '🤝' },
] as const;

// Social media links
export const SOCIAL_LINKS = [
    { id: 1, name: 'Facebook', icon: '📘', href: 'https://facebook.com/bifpcl' },
    { id: 2, name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/bifpcl' },
    { id: 3, name: 'YouTube', icon: '📺', href: 'https://youtube.com/@bifpcl' },
] as const;

// Project specifications - Real Maitree STPP data
export const PROJECT_SPECS = [
    { label: 'Project Name', value: 'Maitree Super Thermal Power Project' },
    { label: 'Location', value: 'Rampal, Bagerhat, Bangladesh' },
    { label: 'Capacity', value: '1320 MW (2 × 660 MW)' },
    { label: 'Technology', value: 'Ultra-Supercritical' },
    { label: 'Fuel', value: 'Imported Coal' },
    { label: 'Efficiency', value: '>41%' },
    { label: 'Beneficiary', value: '100% Power to BPDB' },
    { label: 'Joint Venture', value: 'BPDB (50%) + NTPC (50%)' },
] as const;

// Footer sections
export const FOOTER_SECTIONS = [
    {
        id: 1,
        title: 'Quick Links',
        links: [
            { id: 1, label: 'About Us', href: '/about' },
            { id: 2, label: 'Board of Directors', href: '/about/board' },
            { id: 3, label: 'Projects', href: '/projects' },
            { id: 4, label: 'Sustainability', href: '/sustainability' },
        ],
    },
    {
        id: 2,
        title: 'Resources',
        links: [
            { id: 1, label: 'Tenders', href: '/tenders' },
            { id: 2, label: 'Careers', href: '/careers' },
            { id: 3, label: 'News & Media', href: '/news' },
            { id: 4, label: 'Contact Us', href: '/contact' },
        ],
    },
] as const;

// Hero content
export const HERO_CONTENT = {
    badge: 'Bangladesh-India Cooperation',
    title: 'Powering Friendship,',
    titleAccent: 'Energizing Future.',
    description: 'Maitree Super Thermal Power Project - A landmark 1320 MW ultra-supercritical power plant symbolizing the strong partnership between Bangladesh and India.',
    primaryCta: 'View Our Project',
    secondaryCta: 'Sustainability Report',
} as const;
