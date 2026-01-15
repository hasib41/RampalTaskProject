// CSR & Sustainability Page - Premium design with animations
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { COMPANY_INFO } from '../constants';
import { useSustainabilityStats, useCSRInitiatives } from '../hooks/useApi';
import type { SustainabilityStat, CSRInitiative } from '../services/api';
import './SustainabilityPage.css';

// Environment initiatives (Static for now as they are site-specific features)
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

// Safety achievements (Static for now)
const SAFETY_MILESTONES = [
    { icon: '🛡️', value: '10M+', label: 'Safe Man-Hours', description: 'Zero LTI since commercial operation' },
    { icon: '✓', value: 'ISO', label: 'Certified', description: 'ISO 14001 & ISO 45001 compliant' },
    { icon: '📚', value: '40', label: 'Training Hours', description: 'Annual mandatory safety training' },
    { icon: '🚨', value: '5 Min', label: 'Response Time', description: 'State-of-the-art ERT on-site 24/7' },
];

// Animated counter hook
function useCountUp(end: number | string, duration: number = 2000, start: number = 0) {
    // Extract numeric part if possible
    const numericEnd = typeof end === 'number' ? end : parseFloat(String(end).replace(/[^0-9.]/g, '')) || 0;

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
            setCount(Math.floor(progress * (numericEnd - start) + start));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [isVisible, numericEnd, start, duration]);

    return { count, ref };
}

function ImpactCard({ stat }: { stat: SustainabilityStat & { color: string, suffix: string } }) {
    // If value is non-numeric string (like "542000+"), useCountUp handles extracting number
    const { count, ref } = useCountUp(stat.value);

    // Determine display value: if original had non-numeric chars, assume it was formatted
    const numericVal = parseFloat(String(stat.value).replace(/[^0-9.]/g, ''));
    const isFormatted = String(stat.value) !== String(numericVal);

    return (
        <div className={`impact-card ${stat.color}`} ref={ref}>
            <span className="impact-icon">{stat.icon || '🌱'}</span>
            <div className="impact-value">
                {numericVal > 1000 ? count.toLocaleString() : count}
                <span className="suffix">{stat.suffix}</span>
            </div>
            <p className="impact-label">{stat.label}</p>
            <div className="impact-trend">
                <span>📈</span> {stat.trend || 'Positive Impact'}
            </div>
        </div>
    );
}

function SustainabilityPage() {
    const { data: stats, loading: statsLoading } = useSustainabilityStats();
    const { data: csrInitiatives, loading: csrLoading } = useCSRInitiatives();
    const [activeProgram, setActiveProgram] = useState(0);

    const mapCategoryIcon = (category: string) => {
        const map: Record<string, string> = {
            education: '🎓',
            health: '🏥',
            environment: '♻️',
            livelihood: '💼',
            infrastructure: '🏗️',
        };
        return map[category] || '🌟';
    };

    // Helper to augment API stats with display properties
    const enrichedStats = (stats || []).map((s, i) => {
        const colors = ['green', 'blue', 'teal', 'purple'];
        // Extract suffix roughly
        const valStr = String(s.value);
        const numericPart = parseFloat(valStr.replace(/[^0-9.]/g, ''));
        const suffix = valStr.replace(String(numericPart), '') || '+';

        return {
            ...s,
            color: colors[i % colors.length],
            suffix: suffix
        };
    }).sort((a, b) => a.order - b.order);

    const activeCsr = csrInitiatives && csrInitiatives.length > 0 ? csrInitiatives[activeProgram] : null;

    if (statsLoading || csrLoading) {
        return <div className="loading-screen"><div className="spinner"></div></div>;
    }

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
                            {enrichedStats.length > 0 ? enrichedStats.map((stat) => (
                                <ImpactCard key={stat.id} stat={stat} />
                            )) : (
                                <p className="text-center w-full">No stats available.</p>
                            )}
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
                            {csrInitiatives && csrInitiatives.length > 0 ? (
                                <>
                                    <div className="csr-tabs">
                                        {csrInitiatives.map((program, index) => (
                                            <button
                                                key={program.id}
                                                className={`csr-tab ${activeProgram === index ? 'active' : ''}`}
                                                onClick={() => setActiveProgram(index)}
                                            >
                                                <span className="tab-icon">{mapCategoryIcon(program.category)}</span>
                                                <span className="tab-title">{program.title}</span>
                                            </button>
                                        ))}
                                    </div>
                                    {activeCsr && (
                                        <div className="csr-detail">
                                            <div
                                                className="csr-image"
                                                style={{ backgroundImage: `url(${activeCsr.image_url || '/images/hero-1.png'})` }}
                                            >
                                                <div className="csr-metric">
                                                    {activeCsr.impact_metric || 'Ongoing Project'}
                                                </div>
                                            </div>
                                            <div className="csr-info">
                                                <h3>{activeCsr.title}</h3>
                                                <p>{activeCsr.description}</p>
                                                <Link to="/contact" className="csr-link">
                                                    Learn More <span>→</span>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-10">
                                    <p>No CSR initiatives found at the moment.</p>
                                </div>
                            )}
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

