// Careers Page - Recruitment portal
import { Header, Footer } from '../components/layout';
import { useCareers } from '../hooks/useApi';
import './CareersPage.css';

// Careers data
const CULTURE_ITEMS = [
    { title: 'Cutting-edge Technology', description: 'Work with the latest in ultra-supercritical thermal power technology.', image: '/images/hero-1.png' },
    { title: 'Collaborative Culture', description: 'A diverse team of experts from two nations working as one.', image: '/images/hero-2.png' },
    { title: 'Sustainability Focus', description: 'Our commitment to environmental responsibility and social impact.', image: '/images/hero-3.png' },
];

const BENEFITS = [
    { icon: '💰', title: 'Competitive Pay', description: 'Industry-leading compensation packages and performance bonuses.' },
    { icon: '🏥', title: 'Health & Wellness', description: 'Comprehensive health insurance for employees and families.' },
    { icon: '📈', title: 'Growth Opportunities', description: 'Continuous learning through international training programs.' },
    { icon: '🏢', title: 'Modern Infrastructure', description: 'Work in world-class facilities with high-end tools and tech.' },
];

function CareersPage() {
    const { data: careers, loading, error } = useCareers();

    return (
        <>
            <Header />
            <main className="careers-page">
                {/* Hero */}
                <section className="careers-hero">
                    <div className="careers-hero-bg" style={{ backgroundImage: `linear-gradient(to right, rgba(16,22,34,0.95) 0%, rgba(16,22,34,0.7) 50%, rgba(16,22,34,0.3) 100%), url('/images/careers-hero-bg.png')` }}></div>
                    <div className="careers-hero-content">
                        <h1>Powering Progress, Empowering Talent</h1>
                        <p>Join the team at Bangladesh-India Friendship Power Company Limited and help shape the future of sustainable energy.</p>
                        <div className="careers-hero-actions">
                            <a href="#job-board" className="btn-primary">View Openings</a>
                            <a href="#benefits" className="btn-secondary">Why Join Us?</a>
                        </div>
                    </div>
                </section>

                {/* Life at BIFPCL */}
                <section className="culture-section">
                    <div className="container">
                        <div className="section-header">
                            <div>
                                <span className="section-label">Culture & Impact</span>
                                <h2>Life at BIFPCL</h2>
                                <p>Experience a cross-cultural environment where excellence is recognized.</p>
                            </div>
                        </div>
                        <div className="culture-grid">
                            {CULTURE_ITEMS.map((item, i) => (
                                <div key={i} className="culture-card">
                                    <div className="culture-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Job Board */}
                <section className="jobs-section" id="job-board">
                    <div className="container">
                        <div className="section-header centered">
                            <h2>Current Opportunities</h2>
                            <p>Find your next career move at BIFPCL</p>
                        </div>

                        {/* Job Listings */}
                        <div className="job-list">
                            {loading && <div className="loading-spinner" style={{ margin: '0 auto' }}></div>}

                            {error && (
                                <div className="error-message text-center">
                                    <p className="text-muted">Unable to load job openings. Please try again later.</p>
                                </div>
                            )}

                            {!loading && !error && careers?.length === 0 && (
                                <div className="no-jobs-message text-center">
                                    <p className="text-muted">No current openings. Please check back later or submit your CV below.</p>
                                </div>
                            )}

                            {!loading && !error && careers?.map((job) => (
                                <div key={job.id} className="job-card">
                                    <div className="job-info">
                                        <h3>{job.title}</h3>
                                        <div className="job-meta">
                                            <span>💼 {job.department}</span>
                                            <span>📍 {job.location}</span>
                                            <span style={{ textTransform: 'capitalize' }}>⏰ {job.job_type.replace('_', ' ')}</span>
                                        </div>
                                    </div>
                                    <button className="apply-btn">Apply Now</button>
                                </div>
                            ))}
                        </div>

                        {/* CV Submission */}
                        <div className="cv-submission">
                            <div className="cv-content">
                                <h3>Don't see a fit?</h3>
                                <p>Submit your resume for future opportunities.</p>
                            </div>
                            <button className="submit-cv-btn">Submit Your CV</button>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="benefits-section" id="benefits">
                    <div className="container">
                        <div className="section-header centered">
                            <h2>Why BIFPCL?</h2>
                            <p>We offer more than just a job; a platform for excellence.</p>
                        </div>
                        <div className="benefits-grid">
                            {BENEFITS.map((benefit, i) => (
                                <div key={i} className="benefit-card">
                                    <div className="benefit-icon">{benefit.icon}</div>
                                    <h4>{benefit.title}</h4>
                                    <p>{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main >
            <Footer />
        </>
    );
}

export default CareersPage;
