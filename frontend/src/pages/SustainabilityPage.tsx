// CSR & Sustainability Page
import { Header, Footer } from '../components/layout';
import { SUSTAINABILITY_STATS, COMPANY_INFO } from '../constants';
import './SustainabilityPage.css';

// Environment management initiatives
const ENVIRONMENT_INITIATIVES = [
    {
        icon: '🌬️',
        title: 'Air Quality Monitoring',
        description: 'Real-time tracking through 5 automated monitoring stations. Data shared directly with regulatory bodies.',
        link: 'View Live Data',
    },
    {
        icon: '♻️',
        title: 'Waste Management',
        description: 'Zero-liquid discharge policy. 100% fly ash utilization in sustainable construction and brick manufacturing.',
        link: 'Recycling Protocol',
    },
    {
        icon: '🍃',
        title: 'Emission Control',
        description: 'Flue Gas Desulfurization (FGD) and high-efficiency Electrostatic Precipitators minimize environmental footprint.',
        link: 'Tech Specs',
    },
];

// CSR Programs
const CSR_PROGRAMS = [
    { icon: '🎓', title: 'Education Support', description: 'Scholarships for 500+ local students annually and school infrastructure upgrades.' },
    { icon: '🏥', title: 'Mobile Health Clinics', description: 'Free primary healthcare to 12 villages weekly via dedicated mobile units.' },
];

// Safety achievements
const SAFETY_ACHIEVEMENTS = [
    { icon: '🛡️', title: 'Zero LTI', description: 'Achieved 2 million man-hours without Lost Time Injury in 2023.' },
    { icon: '✓', title: 'ISO Certified', description: 'Fully compliant with ISO 14001 and ISO 45001 international standards.' },
    { icon: '📚', title: 'Safety Training', description: 'Mandatory 40-hour annual training for all technical personnel.' },
    { icon: '🚨', title: 'Emergency Response', description: 'State-of-the-art ERT on-site 24/7 with 5-minute response time.' },
];

function SustainabilityPage() {
    return (
        <>
            <Header />
            <main className="sustainability-page">
                {/* Hero */}
                <section className="sustainability-hero">
                    <div className="hero-content">
                        <span className="hero-badge">Sustainability First</span>
                        <h1>Powering a Greener Tomorrow</h1>
                        <p>{COMPANY_INFO.shortName}'s commitment to environmental excellence, community empowerment, and world-class safety standards.</p>
                        <div className="hero-actions">
                            <button className="btn-primary">Annual Report 2024</button>
                            <button className="btn-secondary">Watch Vision Film</button>
                        </div>
                    </div>
                </section>

                <div className="container">
                    {/* Stats Dashboard */}
                    <section className="stats-section">
                        <div className="stats-header">
                            <h2>Our Impact at a Glance</h2>
                            <span>Updated Q4 2023</span>
                        </div>
                        <div className="stats-grid">
                            {SUSTAINABILITY_STATS.map((stat) => (
                                <div key={stat.id} className="stat-card">
                                    <span className="stat-icon">{stat.icon}</span>
                                    <p className="stat-label">{stat.label}</p>
                                    <p className="stat-value">{stat.value}</p>
                                    <div className="stat-trend">
                                        <span>📈</span>
                                        <span>{stat.trend}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Environment Management */}
                    <section className="environment-section">
                        <h2>Environment Management Plan</h2>
                        <p className="section-description">We implement rigorous monitoring and management systems to ensure our operations live in harmony with the surrounding ecosystem.</p>
                        <div className="environment-grid">
                            {ENVIRONMENT_INITIATIVES.map((item, i) => (
                                <div key={i} className="environment-card">
                                    <div className="card-icon">{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <a href="#">{item.link} →</a>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CSR Section */}
                    <section className="csr-section">
                        <div className="csr-content">
                            <h2>Empowering Communities</h2>
                            <p>Our CSR initiatives go beyond philanthropy. We focus on sustainable livelihood development, healthcare accessibility, and quality education for the communities around our projects.</p>
                            <div className="csr-programs">
                                {CSR_PROGRAMS.map((program, i) => (
                                    <div key={i} className="program-item">
                                        <span className="program-icon">{program.icon}</span>
                                        <div>
                                            <h4>{program.title}</h4>
                                            <p>{program.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn-primary">View CSR Story Map</button>
                        </div>
                        <div className="csr-images">
                            <div className="csr-image" style={{ backgroundImage: `url('/images/hero-2.png')` }}></div>
                            <div className="csr-image offset" style={{ backgroundImage: `url('/images/hero-3.png')` }}></div>
                        </div>
                    </section>

                    {/* Safety Section */}
                    <section className="safety-section">
                        <div className="section-center">
                            <h2>Safety is Our Way of Life</h2>
                            <p>We maintain a "Zero Harm" culture. Every employee and contractor undergoes rigorous training to ensure the highest safety standards are met every single day.</p>
                        </div>
                        <div className="safety-grid">
                            {SAFETY_ACHIEVEMENTS.map((item, i) => (
                                <div key={i} className="safety-card">
                                    <div className="safety-icon">{item.icon}</div>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Contact Section */}
                    <section className="sustainability-contact">
                        <div className="contact-info">
                            <h2>Collaborate for Change</h2>
                            <p>Have a question about our sustainability efforts or want to partner on a CSR initiative? Reach out to our dedicated team.</p>
                            <div className="contact-items">
                                <div className="contact-item">
                                    <span>📧</span>
                                    <span>sustainability@bifpcl.com</span>
                                </div>
                                <div className="contact-item">
                                    <span>📍</span>
                                    <span>{COMPANY_INFO.address}</span>
                                </div>
                            </div>
                        </div>
                        <form className="contact-form">
                            <div className="form-row">
                                <input type="text" placeholder="Full Name" />
                                <input type="email" placeholder="Email Address" />
                            </div>
                            <select>
                                <option>Sustainability Inquiry</option>
                                <option>CSR Proposal</option>
                                <option>Environmental Compliance</option>
                                <option>Other</option>
                            </select>
                            <textarea placeholder="How can we help?" rows={4}></textarea>
                            <button type="submit" className="btn-primary">Send Message</button>
                        </form>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default SustainabilityPage;
