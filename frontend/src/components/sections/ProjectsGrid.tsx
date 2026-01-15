// Projects Grid Section - Dynamic data from API
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, type Project } from '../../services/api';
import './ProjectsGrid.css';

// Status label mapping
const STATUS_LABELS: Record<string, { label: string; color: string }> = {
    operational: { label: 'Operational', color: 'green' },
    construction: { label: 'Under Construction', color: 'orange' },
    planning: { label: 'Planning', color: 'blue' },
    maintenance: { label: 'Maintenance', color: 'gray' },
};

function ProjectsGrid() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProjects() {
            try {
                setLoading(true);
                const data = await getProjects();
                // Show only first 3 projects on homepage (or featured ones)
                setProjects(data.slice(0, 3));
                setError(null);
            } catch (err) {
                console.error('Failed to fetch projects:', err);
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    // Get status styling
    const getStatusStyle = (status: string) => {
        return STATUS_LABELS[status] || { label: status, color: 'gray' };
    };

    if (loading) {
        return (
            <section className="projects-section">
                <div className="projects-container">
                    <div className="projects-header">
                        <div>
                            <p className="projects-label">Portfolio</p>
                            <h2 className="projects-title">Key Infrastructure Projects</h2>
                        </div>
                    </div>
                    <div className="projects-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading projects...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="projects-section">
                <div className="projects-container">
                    <div className="projects-header">
                        <div>
                            <p className="projects-label">Portfolio</p>
                            <h2 className="projects-title">Key Infrastructure Projects</h2>
                        </div>
                    </div>
                    <div className="projects-error">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Retry</button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="projects-section">
            <div className="projects-container">
                {/* Section Header */}
                <div className="projects-header">
                    <div>
                        <p className="projects-label">Portfolio</p>
                        <h2 className="projects-title">Key Infrastructure Projects</h2>
                    </div>
                    <Link to="/projects" className="projects-link">
                        Explore all projects <span>→</span>
                    </Link>
                </div>

                {/* Projects Grid */}
                <div className="projects-grid">
                    {projects.map((project) => {
                        const statusStyle = getStatusStyle(project.status);
                        return (
                            <div key={project.id} className="project-card">
                                <div className="project-image">
                                    <img
                                        src={project.image_url || '/images/project-placeholder.png'}
                                        alt={project.name}
                                    />
                                </div>
                                <div className="project-content">
                                    <div className="project-meta">
                                        <span className={`project-status ${statusStyle.color}`}>
                                            {statusStyle.label}
                                        </span>
                                        <span className="project-capacity">{project.capacity}</span>
                                    </div>
                                    <h3 className="project-title">{project.name}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <Link to={`/projects/${project.id}`} className="project-cta">
                                        Project Details
                                        <svg className="cta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Show message if no projects */}
                {projects.length === 0 && (
                    <div className="projects-empty">
                        <p>No projects available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ProjectsGrid;
