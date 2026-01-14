// About Page - Corporate profile page
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { COMPANY_INFO } from '../constants';
import './AboutPage.css';

// About page data
const MD_MESSAGE = {
    name: 'Engr. Sayeed Akram',
    title: 'Managing Director, BIFPCL',
    quote: 'Our commitment to excellence and sustainable energy production drives every decision we make. We are building a legacy of power that empowers the nation while respecting the environment. Our goal is to set a new global standard for efficient coal-based power generation.',
    image: '/images/hero-2.png',
};

const MILESTONES = [
    { year: '2012', title: 'MoU Signing', description: 'Partnership between BPDB and NTPC India' },
    { year: '2013', title: 'Company Formation', description: 'Incorporation of BIFPCL as JV company' },
    { year: '2017', title: 'Financial Closure', description: 'Agreement with EXIM Bank of India' },
    { year: '2022', title: 'Unit 1 Sync', description: 'First power generation from Unit 1' },
];

const RESOURCES = [
    { icon: '👥', title: 'Board of Directors', description: 'Meet our leadership team', link: '/about' },
    { icon: '📊', title: 'Annual Reports', description: 'Financial and operations data', link: '/about' },
    { icon: '⚖️', title: 'Governance Policy', description: 'Compliance and ethics', link: '/about' },
    { icon: '🤝', title: 'CSR Activities', description: 'Our community impact', link: '/about' },
];

function AboutPage() {
    return (
        <>
            <Header />
            <main className="about-page">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <div className="container">
                        <Link to="/">Home</Link>
                        <span className="separator">›</span>
                        <Link to="/about">About Us</Link>
                        <span className="separator">›</span>
                        <span className="current">Corporate Profile</span>
                    </div>
                </nav>

                {/* Page Header */}
                <section className="page-header">
                    <div className="container">
                        <h1>About BIFPCL Corporate</h1>
                        <p>
                            Bangladesh-India Friendship Power Company (Pvt.) Limited is a joint venture
                            dedicated to building energy independence and sustainable industrial growth
                            through state-of-the-art power solutions.
                        </p>
                    </div>
                </section>

                {/* MD Message Section */}
                <section className="md-message-section">
                    <div className="container">
                        <div className="md-card">
                            <div className="md-image" style={{ backgroundImage: `url(${MD_MESSAGE.image})` }}></div>
                            <div className="md-content">
                                <span className="section-label">Leadership Message</span>
                                <h2>Message from the Managing Director</h2>
                                <blockquote>"{MD_MESSAGE.quote}"</blockquote>
                                <div className="md-footer">
                                    <div className="md-info">
                                        <p className="md-name">{MD_MESSAGE.name}</p>
                                        <p className="md-title">{MD_MESSAGE.title}</p>
                                    </div>
                                    <button className="read-more-btn">
                                        Read Full Message <span>→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className="timeline-section">
                    <div className="container">
                        <h2>Our Journey & Milestones</h2>
                        <div className="timeline">
                            <div className="timeline-line"></div>
                            <div className="timeline-items">
                                {MILESTONES.map((item, index) => (
                                    <div key={index} className={`timeline-item ${index === MILESTONES.length - 1 ? 'future' : ''}`}>
                                        <div className="timeline-dot"></div>
                                        <p className="timeline-year">{item.year}</p>
                                        <p className="timeline-title">{item.title}</p>
                                        <p className="timeline-desc">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section className="vision-mission-section">
                    <div className="container">
                        <div className="vm-grid">
                            <div className="vm-card vision">
                                <div className="vm-icon">👁️</div>
                                <h3>Our Vision</h3>
                                <p>
                                    To be a world-class power utility company providing reliable,
                                    sustainable, and affordable power through clean technology,
                                    fostering economic growth and social development.
                                </p>
                            </div>
                            <div className="vm-card mission">
                                <div className="vm-icon">🚀</div>
                                <h3>Our Mission</h3>
                                <p>
                                    Implementing high-capacity thermal power projects with advanced
                                    environmental protection measures to meet the energy demands of
                                    Bangladesh while maintaining ecological balance.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Corporate Resources */}
                <section className="resources-section">
                    <div className="container">
                        <h2>Corporate Resources</h2>
                        <div className="resources-grid">
                            {RESOURCES.map((item, index) => (
                                <Link key={index} to={item.link} className="resource-card">
                                    <span className="resource-icon">{item.icon}</span>
                                    <p className="resource-title">{item.title}</p>
                                    <p className="resource-desc">{item.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default AboutPage;
