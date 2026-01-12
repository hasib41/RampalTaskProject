// Tenders Page - Lists all active tenders from API
import { useState, useEffect } from 'react';
import { Header, Footer } from '../components/layout';
import { getTenders, type Tender } from '../services/api';
import './TendersPage.css';

function TendersPage() {
    const [tenders, setTenders] = useState<Tender[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTenders() {
            try {
                const data = await getTenders();
                setTenders(data);
            } catch (err) {
                setError('Failed to load tenders');
            } finally {
                setLoading(false);
            }
        }
        fetchTenders();
    }, []);

    const getCategoryColor = (category: string) => {
        const colors: Record<string, string> = {
            goods: '#3498db',
            works: '#e74c3c',
            services: '#2ecc71',
            consultancy: '#9b59b6',
        };
        return colors[category] || '#95a5a6';
    };

    return (
        <>
            <Header />
            <main className="tenders-page">
                <section className="page-hero">
                    <div className="container">
                        <h1>Active Tenders</h1>
                        <p>View and download tender documents for ongoing procurement</p>
                    </div>
                </section>

                <section className="tenders-content">
                    <div className="container">
                        {loading && (
                            <div className="loading">
                                <div className="spinner"></div>
                                <p>Loading tenders...</p>
                            </div>
                        )}

                        {error && <div className="error-message">{error}</div>}

                        {!loading && tenders.length === 0 && (
                            <div className="empty-state">
                                <span className="empty-icon">📋</span>
                                <h3>No Active Tenders</h3>
                                <p>There are no tenders available at the moment. Please check back later.</p>
                            </div>
                        )}

                        <div className="tenders-grid">
                            {tenders.map((tender) => (
                                <article key={tender.id} className="tender-card">
                                    <div className="tender-header">
                                        <span
                                            className="tender-category"
                                            style={{ backgroundColor: getCategoryColor(tender.category) }}
                                        >
                                            {tender.category}
                                        </span>
                                        <span className="tender-ref">{tender.reference_number}</span>
                                    </div>
                                    <h3 className="tender-title">{tender.title}</h3>
                                    <p className="tender-description">{tender.description}</p>
                                    <div className="tender-footer">
                                        <div className="tender-deadline">
                                            <span className="deadline-label">Deadline:</span>
                                            <span className="deadline-date">
                                                {new Date(tender.deadline).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        {tender.document_url && (
                                            <a
                                                href={tender.document_url}
                                                className="download-btn"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                📄 Download
                                            </a>
                                        )}
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

export default TendersPage;
