// Application constants - single source of truth

// Navigation links (updated for React Router)
export const NAV_LINKS = [
    { id: 1, label: 'Home', href: '/' },
    { id: 2, label: 'About', href: '/about' },
    { id: 3, label: 'Tenders', href: '/tenders' },
    { id: 4, label: 'Careers', href: '/careers' },
    { id: 5, label: 'News', href: '/news' },
    { id: 6, label: 'Contact', href: '/contact' },
] as const;

// Company information
export const COMPANY_INFO = {
    name: 'Power Company Ltd',
    tagline: 'Generating energy for a brighter future',
    email: 'info@powercompany.com',
    phone: '+880 1234567890',
    year: new Date().getFullYear(),
} as const;

// Stats data
export const STATS_DATA = [
    { id: 1, label: 'CAPEX', value: 15000, suffix: ' Cr', icon: '💰' },
    { id: 2, label: 'Milestones', value: 100, suffix: '%', icon: '🎯' },
    { id: 3, label: 'Manpower', value: 5000, suffix: '+', icon: '👥' },
    { id: 4, label: 'MW Generated', value: 1320, suffix: '', icon: '⚡' },
] as const;

// Project specifications
export const PROJECT_SPECS = [
    { label: 'Project', value: 'Power Thermal Project' },
    { label: 'Location', value: 'Bangladesh' },
    { label: 'Capacity', value: '1320 MW (2 x 660 MW)' },
    { label: 'Beneficiaries', value: '100% Power to BPDB' },
] as const;

// Footer sections (updated for React Router)
export const FOOTER_SECTIONS = [
    {
        id: 1,
        title: 'Quick Links',
        links: [
            { id: 1, label: 'Home', href: '/' },
            { id: 2, label: 'About', href: '/about' },
            { id: 3, label: 'Tenders', href: '/tenders' },
            { id: 4, label: 'Contact', href: '/contact' },
        ],
    },
    {
        id: 2,
        title: 'Explore',
        links: [
            { id: 1, label: 'Careers', href: '/careers' },
            { id: 2, label: 'News', href: '/news' },
            { id: 3, label: 'Tenders', href: '/tenders' },
        ],
    },
] as const;

// Hero slider data
export const HERO_SLIDES = [
    {
        id: 1,
        title: 'Powering the Future',
        subtitle: 'Sustainable Energy Solutions for Bangladesh',
        cta: 'Learn More',
        ctaLink: '/about',
    },
    {
        id: 2,
        title: '1320 MW Capacity',
        subtitle: 'State-of-the-art thermal power generation',
        cta: 'View Project',
        ctaLink: '/about',
    },
    {
        id: 3,
        title: 'Building Tomorrow',
        subtitle: 'A joint venture for national development',
        cta: 'Explore',
        ctaLink: '/about',
    },
] as const;

// Social media links
export const SOCIAL_LINKS = [
    { id: 1, name: 'Facebook', icon: '📘', href: '#' },
    { id: 2, name: 'Twitter', icon: '🐦', href: '#' },
    { id: 3, name: 'LinkedIn', icon: '💼', href: '#' },
    { id: 4, name: 'YouTube', icon: '📺', href: '#' },
] as const;
