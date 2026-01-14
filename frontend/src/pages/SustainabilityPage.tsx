// CSR & Sustainability Page - Premium design with animations
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { COMPANY_INFO } from '../constants';
import './SustainabilityPage.css';

// Sustainability stats with animated counters
const IMPACT_STATS = [
    { id: 1, icon: '🌳', value: 542000, suffix: '+', label: 'Trees Planted', trend: '+15.4% YoY', color: 'green' },
    { id: 2, icon: '💧', value: 88, suffix: '%', label: 'Water Recycled', trend: 'Zero Liquid Discharge', color: 'blue' },
    { id: 3, icon: '🌍', value: 22, suffix: '%', label: 'Carbon Reduction', trend: 'Ultra-supercritical Tech', color: 'teal' },
    { id: 4, icon: '🤝', value: 15, suffix: ' Cr+', label: 'CSR Investment', trend: 'Annual Budget', color: 'purple' },
];

// Environment initiatives
const ENVIRONMENT_INITIATIVES = [
    {
        icon: '🌬️',
        title: 'Air Quality Monitoring',
        description: 'Real-time tracking through 5 automated CEMS stations. Data transmitted directly to Department of Environment.',
        stats: '5 Stations • 24/7 Monitoring',
        color: 'sky',
    },
    {
        icon: '♻️',
        title: 'Zero Waste Policy',
        description: '100% fly ash utilization in sustainable brick manufacturing. Zero-liquid discharge achieved through advanced treatment.',
        stats: '100% Fly Ash Use • ZLD',
        color: 'emerald',
    },
    {
        icon: '🍃',
        title: 'Emission Control',
        description: 'Flue Gas Desulfurization (FGD) and high-efficiency ESPs minimize SOx, NOx, and particulate emissions.',
        stats: 'FGD + ESP Technology',
        color: 'lime',
    },
    {
        icon: '🌊',
        title: 'Water Conservation',
        description: 'Closed-loop cooling system and rainwater harvesting reduce freshwater consumption by 40%.',
        stats: '40% Less Freshwater',
        color: 'cyan',
    },
];

// CSR Programs
const CSR_PROGRAMS = [
    {
        id: 1,
        icon: '🎓',
        title: 'Education Support',
        description: 'Scholarships for 500+ local students annually, school infrastructure upgrades, and computer lab installations.',
        metric: '5,000+ Students Benefited',
        image: '/images/csr-education.png',
    },
    {
        id: 2,
        icon: '🏥',
        title: 'Mobile Health Clinics',
        description: 'Free primary healthcare to 12 villages weekly via dedicated mobile medical units with qualified doctors.',
        metric: '50,000+ Patients Annually',
        image: '/images/csr-health.png',
    },
    {
        id: 3,
        icon: '💼',
        title: 'Skill Development',
        description: 'Vocational training in electrical, welding, and technical skills for local youth employment.',
        metric: '1,000+ Trained Annually',
        image: '/images/hero-2.png',
    },
    {
        id: 4,
        icon: '💧',
        title: 'Clean Water Access',
        description: 'Deep tube wells and water purification systems installed in nearby villages.',
        metric: '15 Villages Covered',
        image: '/images/hero-3.png',
    },
];

// Safety achievements
const SAFETY_MILESTONES = [
    { icon: '🛡️', value: '10M+', label: 'Safe Man-Hours', description: 'Zero LTI since commercial operation' },
    { icon: '✓', value: 'ISO', label: 'Certified', description: 'ISO 14001 & ISO 45001 compliant' },
    { icon: '📚', value: '40', label: 'Training Hours', description: 'Annual mandatory safety training' },
    { icon: '🚨', value: '5 Min', label: 'Response Time', description: 'State-of-the-art ERT on-site 24/7' },
];

// Animated counter hook
function useCountUp(end: number, duration: number = 2000, start: number = 0) {
    const [count, setCount] = useState(start);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [isVisible, end, start, duration]);

    return { count, ref };
}

function SustainabilityPage() {
    const [activeProgram, setActiveProgram] = useState(0);

    return (
        <>
            <Header />
            <main className="sustainability-page">
                {/* Hero Section */}
                <section className="sustainability-hero">
                    <div className="hero-bg">
                        <img src="/images/sustainability-hero.png" alt="" aria-hidden="true" />
                        <div className="hero-overlay"></div>
                    </div>
                    <div className="hero-content">
                        <span className="hero-badge">
                            <span className="badge-dot"></span>
                            Sustainability First
                        </span>
                        <h1>Powering a <span className="text-gradient">Greener</span> Tomorrow</h1>
                        <p>
                            {COMPANY_INFO.shortName}'s unwavering commitment to environmental excellence,
                            community empowerment, and world-class safety standards.
                        </p>
                        <div className="hero-actions">
                            <button className="btn-primary">
                                <span>📄</span> Annual Report 2024
                            </button>
                            <button className="btn-secondary">
                                <span>▶</span> Watch Vision Film
                            </button>
                        </div>
                    </div>
                </section>

                {/* Impact Stats with Animated Counters */}
                <section className="impact-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>Our Impact at a Glance</h2>
                            <span className="update-badge">Updated Q4 2025</span>
                        </div>
                        <div className="impact-grid">
                            {IMPACT_STATS.map((stat) => {
                                const { count, ref } = useCountUp(stat.value);
                                return (
                                    <div key={stat.id} className={`impact-card ${stat.color}`} ref={ref}>
                                        <span className="impact-icon">{stat.icon}</span>
                                        <div className="impact-value">
                                            {stat.value > 1000 ? count.toLocaleString() : count}
                                            <span className="suffix">{stat.suffix}</span>
                                        </div>
                                        <p className="impact-label">{stat.label}</p>
                                        <div className="impact-trend">
                                            <span>📈</span> {stat.trend}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Environment Management */}
                <section className="environment-section">
                    <div className="container">
                        <div className="section-intro">
                            <span className="section-label">Environment</span>
                            <h2>Comprehensive Environment Management</h2>
                            <p>
                                We implement rigorous monitoring and management systems to ensure our
                                operations live in harmony with the surrounding ecosystem.
                            </p>
                        </div>
                        <div className="environment-grid">
                            {ENVIRONMENT_INITIATIVES.map((item, index) => (
                                <article key={index} className={`environment-card ${item.color}`}>
                                    <div className="card-header">
                                        <span className="card-icon">{item.icon}</span>
                                        <span className="card-stats">{item.stats}</span>
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CSR Section - Interactive */}
                <section className="csr-section">
                    <div className="container">
                        <div className="csr-header">
                            <span className="section-label">Community</span>
                            <h2>Empowering Communities</h2>
                            <p>
                                Our CSR initiatives go beyond philanthropy. We focus on sustainable livelihood
                                development, healthcare accessibility, and quality education.
                            </p>
                        </div>
                        <div className="csr-content">
                            <div className="csr-tabs">
                                {CSR_PROGRAMS.map((program, index) => (
                                    <button
                                        key={program.id}
                                        className={`csr-tab ${activeProgram === index ? 'active' : ''}`}
                                        onClick={() => setActiveProgram(index)}
                                    >
                                        <span className="tab-icon">{program.icon}</span>
                                        <span className="tab-title">{program.title}</span>
                                    </button>
                                ))}
                            </div>
                            <div className="csr-detail">
                                <div
                                    className="csr-image"
                                    style={{ backgroundImage: `url(${CSR_PROGRAMS[activeProgram].image})` }}
                                >
                                    <div className="csr-metric">
                                        {CSR_PROGRAMS[activeProgram].metric}
                                    </div>
                                </div>
                                <div className="csr-info">
                                    <h3>{CSR_PROGRAMS[activeProgram].title}</h3>
                                    <p>{CSR_PROGRAMS[activeProgram].description}</p>
                                    <Link to="/contact" className="csr-link">
                                        Learn More <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Safety Section */}
                <section className="safety-section">
                    <div className="container">
                        <div className="section-intro centered">
                            <span className="section-label">Safety</span>
                            <h2>Safety is Our Way of Life</h2>
                            <p>
                                We maintain a "Zero Harm" culture. Every employee and contractor undergoes
                                rigorous training to ensure the highest safety standards are met.
                            </p>
                        </div>
                        <div className="safety-grid">
                            {SAFETY_MILESTONES.map((item, index) => (
                                <div key={index} className="safety-card">
                                    <span className="safety-icon">{item.icon}</span>
                                    <div className="safety-value">{item.value}</div>
                                    <div className="safety-label">{item.label}</div>
                                    <p className="safety-desc">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="sustainability-cta">
                    <div className="container">
                        <div className="cta-card">
                            <div className="cta-content">
                                <h2>Partner for Sustainable Impact</h2>
                                <p>
                                    Have a question about our sustainability efforts or want to collaborate
                                    on a CSR initiative? Our team is ready to help.
                                </p>
                                <div className="cta-contact">
                                    <a href="mailto:sustainability@bifpcl.com" className="contact-link">
                                        <span>📧</span> sustainability@bifpcl.com
                                    </a>
                                </div>
                            </div>
                            <Link to="/contact" className="cta-button">
                                Get in Touch <span>→</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default SustainabilityPage;
