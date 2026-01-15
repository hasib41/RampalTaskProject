// News Page - Media and News Center
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { useNews, useFeaturedNews } from '../hooks/useApi';
import './NewsPage.css';

const CATEGORIES = [
    { name: 'Press Releases', count: 0 },
    { name: 'Project Updates', count: 0 },
    { name: 'Media Advisories', count: 0 },
    { name: 'Speeches', count: 0 },
    { name: 'Video Gallery', count: 0 },
];

// Hardcoded Hero Section Data
const HERO_NEWS = {
    id: 999, // Static ID
    title: 'Prime Minister Visits Rampal Power Plant',
    summary: 'PM lauds progress and environmental measures at the power plant during official visit.',
    image_url: '/images/news-hero-bg.png', // Generated professional background
    category: 'Featured News',
    is_featured: true,
    created_at: new Date().toISOString()
};

function NewsPage() {
    const { data: news, loading: newsLoading, error: newsError } = useNews();
    // featuredNews hook removed as we are hardcoding the hero

    const isLoading = newsLoading;

    // The grid simply shows all API news, since the hero is hardcoded and separate
    const gridNews = news || [];

    if (isLoading) {
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

    if (newsError) {
        return (
            <>
                <Header />
                <main className="news-page" style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                    <h2>Unable to load news</h2>
                    <p className="text-muted">{newsError}</p>
                    <button className="btn-primary" onClick={() => window.location.reload()}>Retry</button>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="news-page">
                {/* Featured Hero - Hardcoded as requested */}
                <section className="news-hero" style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%), url(${HERO_NEWS.image_url})`
                }}>
                    <div className="container">
                        <span className="news-badge">{HERO_NEWS.category}</span>
                        <h1>{HERO_NEWS.title}</h1>
                        <p>{HERO_NEWS.summary}</p>
                        <div className="news-hero-actions">
                            <Link to={`/news/${HERO_NEWS.id}`} className="btn-primary">Read Full Story →</Link>
                            <button className="btn-secondary">Share Press Release</button>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="news-layout container">
                    {/* News Feed */}
                    <div className="news-feed">
                        <div className="news-feed-header">
                            <h2>Press Releases & News</h2>
                        </div>

                        {/* Tabs */}
                        <div className="news-tabs">
                            <button className="active">All Updates</button>
                            <button>Press Releases</button>
                            <button>Events</button>
                            <button>CSR Initiatives</button>
                        </div>

                        {/* News Grid */}
                        <div className="news-grid">
                            {gridNews.length > 0 ? (
                                gridNews.map((item) => (
                                    <article key={item.id} className="news-card">
                                        <div className="news-card-image" style={{ backgroundImage: `url(${item.image_url || '/images/placeholder-news.png'})` }}></div>
                                        <div className="news-card-content">
                                            <span className="news-category">News</span>
                                            <h3>{item.title}</h3>
                                            <p className="news-date">📅 {new Date(item.created_at).toLocaleDateString()}</p>
                                            <p className="news-excerpt">{item.summary}</p>
                                            {/* Note: /news/:id route does not exist yet, but sticking to best practice of linking to detail */}
                                            <Link to={`/news/${item.id}`} className="read-more">Read More →</Link>
                                        </div>
                                    </article>
                                ))
                            ) : (
                                <div className="no-news-message">
                                    <p>No other news articles available.</p>
                                </div>
                            )}
                        </div>

                        {gridNews.length > 0 && (
                            <div className="load-more">
                                <button>Load More News ↓</button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="news-sidebar">
                        {/* Categories */}
                        <div className="sidebar-card">
                            <h3>Media Categories</h3>
                            <nav className="category-list">
                                {CATEGORIES.map((cat, i) => (
                                    <Link key={i} to="/news" className="category-item">
                                        <span>{cat.name}</span>
                                        {/* Counts removed as they are static/mocked */}
                                        {/* <span className="count">{cat.count}</span> */}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Media Kit */}
                        <div className="sidebar-card highlight">
                            <div className="media-kit-header">
                                <span>📥</span>
                                <h3>Media Kit</h3>
                            </div>
                            <p>Download official company logos, photos, and brand guidelines for press use.</p>
                            <button className="download-btn">📷 Brand Assets (.zip)</button>
                            <button className="download-btn">📄 Corporate Profile (PDF)</button>
                        </div>

                        {/* Contact */}
                        <div className="sidebar-card dark">
                            <h3>Media Relations</h3>
                            <p>For media inquiries and interview requests, please contact us.</p>
                            <div className="contact-item">
                                <span>📧 Email</span>
                                <strong>media@bifpcl.com</strong>
                            </div>
                            <div className="contact-item">
                                <span>📞 Phone</span>
                                <strong>+880 2-9858567</strong>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default NewsPage;
