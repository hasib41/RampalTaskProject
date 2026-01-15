// News Detail Page
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { getNewsArticle } from '../services/api';
import type { News } from '../services/api';
import './NewsPage.css'; // Reusing news styles

function NewsDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        // Static data for the hardcoded hero section
        if (id === '999') {
            setArticle({
                id: 999,
                title: 'Prime Minister Visits Rampal Power Plant',
                summary: 'PM lauds progress and environmental measures at the power plant during official visit.',
                content: `In a landmark visit to the Rampal Power Plant, the Honorable Prime Minister praised the state-of-the-art facilities and the rigorous environmental protection measures implemented by BIFPCL.

During the tour, the PM inspected the central control room, the turbine hall, and the advanced flue gas desulfurization (FGD) system. "This project stands as a testament to our commitment to energy security and sustainable development," the Prime Minister remarked.

The visit highlighted the plant's contribution to the national grid and its role in powering the economic growth of the southern region. Officials briefed the PM on the plant's operational efficiency and the ongoing community development initiatives in the surrounding areas.`,
                image_url: '/images/news-hero-bg.png',
                is_featured: true,
                created_at: new Date().toISOString()
            });
            setLoading(false);
            return;
        }

        async function fetchArticle() {
            try {
                setLoading(true);
                const data = await getNewsArticle(parseInt(id!));
                setArticle(data);
            } catch (err) {
                console.error('Failed to load news article:', err);
                setError('Failed to load the article.');
            } finally {
                setLoading(false);
            }
        }

        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <>
                <Header />
                <main className="news-page" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="loading-spinner"></div>
                </main>
                <Footer />
            </>
        );
    }

    if (error || !article) {
        return (
            <>
                <Header />
                <main className="news-page" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                    <h2>Article not found</h2>
                    <p className="text-muted">{error || "The article you are looking for doesn't exist."}</p>
                    <button className="btn-primary" onClick={() => navigate('/news')}>Back to News Center</button>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="news-detail-page" style={{ padding: '120px 0 80px' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <Link to="/news" className="back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', marginBottom: '24px', textDecoration: 'none', fontWeight: 500 }}>
                        ← Back to News
                    </Link>

                    <article className="news-article-full">
                        <header className="article-header" style={{ marginBottom: '32px' }}>
                            <div className="article-meta" style={{ display: 'flex', gap: '16px', marginBottom: '16px', color: '#64748b', fontSize: '0.95rem' }}>
                                <span className="article-date">📅 {new Date(article.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                {article.is_featured && <span className="article-badge" style={{ color: '#d97706', fontWeight: 600 }}>⭐ Featured Story</span>}
                            </div>
                            <h1 style={{ fontSize: '2.5rem', lineHeight: 1.2, marginBottom: '24px', color: '#1e293b' }}>{article.title}</h1>
                            <p className="article-summary" style={{ fontSize: '1.25rem', lineHeight: 1.6, color: '#475569', fontStyle: 'italic', borderLeft: '4px solid #135bec', paddingLeft: '24px' }}>
                                {article.summary}
                            </p>
                        </header>

                        {article.image_url && (
                            <div className="article-image" style={{ marginBottom: '40px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                <img src={article.image_url} alt={article.title} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                            </div>
                        )}

                        <div className="article-content" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#334155' }}>
                            {article.content.split('\n').map((paragraph, index) => (
                                paragraph.trim() && <p key={index} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Share & Actions */}
                        <div className="article-footer" style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid #e2e8f0' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Share this story</h3>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        className="btn-secondary"
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            alert('Link copied to clipboard!');
                                        }}
                                        style={{ padding: '8px 16px' }}
                                    >
                                        🔗 Copy Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default NewsDetailPage;
