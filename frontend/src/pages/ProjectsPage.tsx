// Projects and Operations Page
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { PROJECTS_DATA, PROJECT_SPECS } from '../constants';
import './ProjectsPage.css';

// Categories for filtering
const CATEGORIES = [
    { id: 'all', label: 'All Projects', icon: '📊' },
    { id: 'coal', label: 'Coal Power', icon: '🏭' },
    { id: 'solar', label: 'Solar Energy', icon: '☀️' },
    { id: 'transmission', label: 'Transmission', icon: '⚡' },
];

// Latest updates
const UPDATES = [
    { date: 'Jan 2024', title: 'Unit-2 at full capacity', color: 'green' },
    { date: 'Dec 2023', title: 'Grid synchronization complete', color: 'blue' },
    { date: 'Nov 2023', title: 'Safety milestone: 10M hours', color: 'orange' },
];

function ProjectsPage() {
    return (
        <>
            <Header />
            <main className="projects-page">
                {/* Header */}
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <span>Projects & Operations</span>
                    </nav>

                    <div className="page-header">
                        <div className="header-content">
                            <h1>Projects & Operations</h1>
                            <p>Exploring our energy infrastructure, powering a sustainable future through reliable and efficient power generation.</p>
                        </div>
                        <div className="header-actions">
                            <button className="btn-outline">🔗 Share</button>
                            <button className="btn-outline">📥 Export PDF</button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="projects-layout container">
                    {/* Sidebar */}
                    <aside className="projects-sidebar">
                        {/* Categories */}
                        <div className="sidebar-card">
                            <h3>Project Categories</h3>
                            <p className="sidebar-subtitle">Filter by energy source</p>
                            <nav className="category-nav">
                                {CATEGORIES.map((cat, i) => (
                                    <button key={cat.id} className={i === 0 ? 'active' : ''}>
                                        <span>{cat.icon}</span>
                                        <span>{cat.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Latest Updates */}
                        <div className="sidebar-card">
                            <div className="card-header">
                                <h3>Latest Updates</h3>
                                <span>🔔</span>
                            </div>
                            <div className="updates-list">
                                {UPDATES.map((update, i) => (
                                    <div key={i} className={`update-item ${update.color}`}>
                                        <span className="update-date">{update.date}</span>
                                        <p>{update.title}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="btn-outline-primary">View All News</button>
                        </div>

                        {/* Location Map Card */}
                        <div className="sidebar-card map-card">
                            <div className="card-header">
                                <h3>Project Location</h3>
                                <span>📍</span>
                            </div>
                            <div className="map-image-container">
                                <img
                                    src="/images/projects-map.png"
                                    alt="Maitree STPP Location - Rampal, Bagerhat, Bangladesh"
                                    className="map-image"
                                />
                                <div className="map-overlay">
                                    <div className="map-pin">
                                        <span className="pin-icon">🏭</span>
                                        <span className="pin-label">Maitree STPP</span>
                                    </div>
                                </div>
                            </div>
                            <div className="map-info">
                                <p><strong>Rampal, Bagerhat</strong></p>
                                <p className="map-coords">22.5024° N, 89.5836° E</p>
                            </div>
                        </div>
                    </aside>

                    {/* Projects Grid */}
                    <div className="projects-content">
                        <div className="content-header">
                            <p>Showing <strong>{PROJECTS_DATA.length}</strong> active projects</p>
                            <div className="header-controls">
                                <select>
                                    <option>Recently Added</option>
                                    <option>Capacity (High to Low)</option>
                                    <option>Status</option>
                                </select>
                                <div className="view-toggle">
                                    <button className="active">▦</button>
                                    <button>☰</button>
                                </div>
                            </div>
                        </div>

                        <div className="projects-grid">
                            {PROJECTS_DATA.map((project) => (
                                <Link key={project.id} to={`/projects/${project.id}`} className="project-card">
                                    <div className="card-image" style={{ backgroundImage: `url(${project.image})` }}>
                                        <span className={`status-badge ${project.statusColor}`}>{project.status}</span>
                                        <span className="category-badge">{project.category}</span>
                                    </div>
                                    <div className="card-body">
                                        <h3>{project.title}</h3>
                                        <p className="location">📍 {project.location}</p>
                                        <div className="card-footer">
                                            <div>
                                                <span className="label">Capacity</span>
                                                <span className="value">{project.capacity}</span>
                                            </div>
                                            <div>
                                                <span className="label">Efficiency</span>
                                                <span className="value">&gt;41%</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Project Specs */}
                        <div className="specs-section">
                            <h3>Maitree STPP Technical Specifications</h3>
                            <div className="specs-grid">
                                {PROJECT_SPECS.map((spec, i) => (
                                    <div key={i} className="spec-item">
                                        <span className="spec-label">{spec.label}</span>
                                        <span className="spec-value">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ProjectsPage;
