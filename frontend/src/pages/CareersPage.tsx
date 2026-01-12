// Careers Page - Job listings from API
import { useState, useEffect } from 'react';
import { Header, Footer } from '../components/layout';
import { getCareers, type Career } from '../services/api';
import './CareersPage.css';

function CareersPage() {
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        async function fetchCareers() {
            try {
                const data = await getCareers();
                setCareers(data);
            } catch (err) {
                console.error('Failed to load careers');
            } finally {
                setLoading(false);
            }
        }
        fetchCareers();
    }, []);

    const jobTypes = ['all', ...new Set(careers.map(c => c.job_type))];

    const filteredCareers = filter === 'all'
        ? careers
        : careers.filter(c => c.job_type === filter);

    const formatJobType = (type: string) => {
        return type.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
    };

    return (
        <>
            <Header />
            <main className="careers-page">
                <section className="page-hero">
                    <div className="container">
                        <h1>Join Our Team</h1>
                        <p>Build your career with Bangladesh's leading power company</p>
                    </div>
                </section>

                <section className="careers-content">
                    <div className="container">
                        {/* Filter Tabs */}
                        <div className="filter-tabs">
                            {jobTypes.map(type => (
                                <button
                                    key={type}
                                    className={`filter-tab ${filter === type ? 'active' : ''}`}
                                    onClick={() => setFilter(type)}
                                >
                                    {type === 'all' ? 'All Positions' : formatJobType(type)}
                                </button>
                            ))}
                        </div>

                        {loading && (
                            <div className="loading">
                                <div className="spinner"></div>
                                <p>Loading positions...</p>
                            </div>
                        )}

                        {!loading && filteredCareers.length === 0 && (
                            <div className="empty-state">
                                <span className="empty-icon">💼</span>
                                <h3>No Open Positions</h3>
                                <p>No job openings at the moment. Please check back later.</p>
                            </div>
                        )}

                        <div className="careers-list">
                            {filteredCareers.map((career) => (
                                <article key={career.id} className="career-card">
                                    <div className="career-main">
                                        <div className="career-info">
                                            <h3>{career.title}</h3>
                                            <div className="career-meta">
                                                <span className="meta-item">
                                                    <span className="meta-icon">🏢</span>
                                                    {career.department}
                                                </span>
                                                <span className="meta-item">
                                                    <span className="meta-icon">📍</span>
                                                    {career.location}
                                                </span>
                                                <span className="meta-item job-type">
                                                    {formatJobType(career.job_type)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="career-actions">
                                            <div className="deadline">
                                                <span className="deadline-label">Apply by</span>
                                                <span className="deadline-date">
                                                    {new Date(career.deadline).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <button className="apply-btn">Apply Now</button>
                                        </div>
                                    </div>
                                    <div className="career-details">
                                        <p>{career.description}</p>
                                        <div className="vacancies">
                                            <span className="vacancies-badge">
                                                {career.vacancies} {career.vacancies === 1 ? 'Position' : 'Positions'}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default CareersPage;
