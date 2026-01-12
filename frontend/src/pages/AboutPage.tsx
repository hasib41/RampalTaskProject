// About Page - Company information page
import { Header, Footer } from '../components/layout';
import { COMPANY_INFO, PROJECT_SPECS } from '../constants';
import './AboutPage.css';

function AboutPage() {
    const milestones = [
        { year: '2016', event: 'Joint Venture Agreement Signed', description: 'NTPC and BPDB formalize partnership' },
        { year: '2017', event: 'Foundation Stone Laid', description: 'Prime Minister inaugurates project' },
        { year: '2020', event: 'Unit 1 Trial Operation', description: 'First unit begins trial operations' },
        { year: '2022', event: 'Full Commercial Operation', description: 'Both units achieve commercial operation' },
    ];

    const values = [
        { icon: '🌱', title: 'Sustainability', description: 'Committed to environmental protection and sustainable practices' },
        { icon: '⚡', title: 'Reliability', description: 'Ensuring uninterrupted power supply to the nation' },
        { icon: '🤝', title: 'Partnership', description: 'Strong collaboration between India and Bangladesh' },
        { icon: '🏆', title: 'Excellence', description: 'Maintaining highest standards in operations' },
    ];

    return (
        <>
            <Header />
            <main className="about-page">
                {/* Hero Section */}
                <section className="page-hero about-hero">
                    <div className="container">
                        <h1>About {COMPANY_INFO.name}</h1>
                        <p>{COMPANY_INFO.tagline}</p>
                    </div>
                </section>

                {/* Company Overview */}
                <section className="company-overview">
                    <div className="container">
                        <div className="overview-content">
                            <div className="overview-text">
                                <span className="section-label">Our Story</span>
                                <h2>Powering Bangladesh's Future</h2>
                                <p>
                                    Bangladesh India Friendship Power Company Limited (BIFPCL) is a 50:50 joint venture
                                    between NTPC Ltd of India and Bangladesh Power Development Board (BPDB). The company
                                    was formed to set up a 1320 MW coal-fired thermal power plant at Rampal in Bagerhat
                                    district of Bangladesh.
                                </p>
                                <p>
                                    This landmark project symbolizes the strong bilateral relationship between Bangladesh
                                    and India, and represents a significant milestone in Bangladesh's journey towards
                                    energy security and self-sufficiency.
                                </p>
                            </div>
                            <div className="overview-stats">
                                {PROJECT_SPECS.map((spec, index) => (
                                    <div key={index} className="stat-box">
                                        <span className="stat-value">{spec.value}</span>
                                        <span className="stat-label">{spec.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="values-section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-label">Our Values</span>
                            <h2>What Drives Us</h2>
                        </div>
                        <div className="values-grid">
                            {values.map((value, index) => (
                                <div key={index} className="value-card">
                                    <span className="value-icon">{value.icon}</span>
                                    <h3>{value.title}</h3>
                                    <p>{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="timeline-section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-label">Our Journey</span>
                            <h2>Project Milestones</h2>
                        </div>
                        <div className="timeline">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-marker">
                                        <span className="timeline-year">{milestone.year}</span>
                                    </div>
                                    <div className="timeline-content">
                                        <h3>{milestone.event}</h3>
                                        <p>{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Partners Section */}
                <section className="partners-section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-label">Joint Venture Partners</span>
                            <h2>Our Partners</h2>
                        </div>
                        <div className="partners-grid">
                            <div className="partner-card">
                                <div className="partner-logo">🇮🇳</div>
                                <h3>NTPC Limited</h3>
                                <p>India's largest power company with 50% stake in the joint venture</p>
                            </div>
                            <div className="partner-card">
                                <div className="partner-logo">🇧🇩</div>
                                <h3>BPDB</h3>
                                <p>Bangladesh Power Development Board with 50% stake in the joint venture</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default AboutPage;
