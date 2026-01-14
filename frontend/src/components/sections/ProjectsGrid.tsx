// Projects Grid Section
import { Link } from 'react-router-dom';
import { PROJECTS_DATA } from '../../constants';
import './ProjectsGrid.css';

function ProjectsGrid() {
    return (
        <section className="projects-section">
            <div className="projects-container">
                {/* Section Header */}
                <div className="projects-header">
                    <div>
                        <p className="projects-label">Portfolio</p>
                        <h2 className="projects-title">Key Infrastructure Projects</h2>
                    </div>
                    <Link to="/about" className="projects-link">
                        Explore all projects <span>→</span>
                    </Link>
                </div>

                {/* Projects Grid */}
                <div className="projects-grid">
                    {PROJECTS_DATA.map((project) => (
                        <div key={project.id} className="project-card">
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                            </div>
                            <div className="project-content">
                                <div className="project-meta">
                                    <span className={`project-status ${project.statusColor}`}>
                                        {project.status}
                                    </span>
                                    <span className="project-capacity">{project.capacity}</span>
                                </div>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <button className="project-cta">Project Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProjectsGrid;
