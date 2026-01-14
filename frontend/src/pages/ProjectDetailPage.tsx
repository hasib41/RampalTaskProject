// Project Detail Page
import { useParams, Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { PROJECTS_DATA, PROJECT_SPECS, COMPANY_INFO } from '../constants';
import './ProjectDetailPage.css';

// Technical specifications for Maitree STPP
const TECHNICAL_SPECS = [
    { label: 'Boiler Type', value: 'Ultra-Supercritical, Once-through' },
    { label: 'Main Steam Pressure', value: '25.0 MPa' },
    { label: 'Main Steam Temperature', value: '600°C' },
    { label: 'Reheat Steam Temperature', value: '610°C' },
    { label: 'Turbine Type', value: 'Tandem Compound, Reheat' },
    { label: 'Net Efficiency', value: '>41%' },
    { label: 'Fuel', value: 'Imported Coal (Indonesian)' },
    { label: 'Cooling System', value: 'Closed Cycle (Cooling Tower)' },
];

// Key features
const KEY_FEATURES = [
    { title: 'Ultra-Supercritical Technology', description: 'World-class efficiency with reduced emissions per MW generated.' },
    { title: 'FGD & ESP Systems', description: 'Flue Gas Desulfurization and Electrostatic Precipitators for clean air.' },
    { title: 'Zero Liquid Discharge', description: 'Complete water recycling with no wastewater discharge to environment.' },
    { title: 'Green Belt Development', description: '542,000+ trees planted around the project area for environmental balance.' },
];

function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>();
    const project = PROJECTS_DATA.find(p => p.id === Number(id)) || PROJECTS_DATA[0];

    return (
        <>
            <Header />
            <main className="project-detail-page">
                {/* Hero */}
                <section className="detail-hero" style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%), url(${project.image})` }}>
                    <div className="container">
                        <nav className="breadcrumb">
                            <Link to="/">Home</Link>
                            <span>›</span>
                            <Link to="/projects">Projects</Link>
                            <span>›</span>
                            <span>{project.title}</span>
                        </nav>
                        <div className="hero-content">
                            <span className="status-badge">{project.status}</span>
                            <h1>{project.title}</h1>
                            <p className="location">📍 {project.location}</p>
                            <p className="description">{project.description}</p>
                        </div>
                    </div>
                </section>

                <div className="container">
                    {/* Stats Bar */}
                    <div className="stats-bar">
                        <div className="stat-item">
                            <span className="stat-value">{project.capacity}</span>
                            <span className="stat-label">Installed Capacity</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">2×660 MW</span>
                            <span className="stat-label">Configuration</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">&gt;41%</span>
                            <span className="stat-label">Net Efficiency</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">50:50</span>
                            <span className="stat-label">JV (BPDB:NTPC)</span>
                        </div>
                    </div>

                    {/* Project Overview */}
                    <section className="overview-section">
                        <div className="overview-content">
                            <h2>Project Overview</h2>
                            <p>
                                The Maitree Super Thermal Power Project is a 1320 MW ultra-supercritical coal-fired power plant located in Rampal, Bagerhat District, Bangladesh. It is a joint venture between Bangladesh Power Development Board (BPDB) and NTPC Limited of India, symbolizing the strong friendship and cooperation between the two nations.
                            </p>
                            <p>
                                The project utilizes state-of-the-art ultra-supercritical technology, achieving significantly higher efficiency and lower emissions compared to conventional thermal power plants. This helps meet Bangladesh's growing energy demand while minimizing environmental impact.
                            </p>
                            <div className="overview-highlights">
                                <div className="highlight-item">
                                    <span>🌍</span>
                                    <div>
                                        <h4>Environmental Commitment</h4>
                                        <p>Comprehensive EIA conducted and approved by Government of Bangladesh.</p>
                                    </div>
                                </div>
                                <div className="highlight-item">
                                    <span>🤝</span>
                                    <div>
                                        <h4>Indo-Bangla Cooperation</h4>
                                        <p>Symbol of friendship with equal 50:50 partnership structure.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overview-image" style={{ backgroundImage: `url('/images/hero-2.png')` }}></div>
                    </section>

                    {/* Technical Specifications */}
                    <section className="specs-section">
                        <h2>Technical Specifications</h2>
                        <div className="specs-grid">
                            {TECHNICAL_SPECS.map((spec, i) => (
                                <div key={i} className="spec-item">
                                    <span className="spec-label">{spec.label}</span>
                                    <span className="spec-value">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Key Features */}
                    <section className="features-section">
                        <h2>Key Features</h2>
                        <div className="features-grid">
                            {KEY_FEATURES.map((feature, i) => (
                                <div key={i} className="feature-card">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Contact CTA */}
                    <section className="cta-section">
                        <div className="cta-content">
                            <h2>Want to Learn More?</h2>
                            <p>Contact our project team for detailed information about technical specifications, environmental measures, or partnership opportunities.</p>
                        </div>
                        <Link to="/contact" className="btn-primary">Contact Project Team →</Link>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ProjectDetailPage;
