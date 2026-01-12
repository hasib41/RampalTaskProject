// News Page - News articles from API
import { useState, useEffect } from 'react';
import { Header, Footer } from '../components/layout';
import { getNews, type News } from '../services/api';
import './NewsPage.css';

function NewsPage() {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNews() {
            try {
                const data = await getNews();
                setNews(data);
            } catch (err) {
                console.error('Failed to load news');
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    const featuredNews = news.filter(n => n.is_featured);
    const regularNews = news.filter(n => !n.is_featured);

    return (
        <>
            <Header />
            <main className="news-page">
                <section className="page-hero">
                    <div className="container">
                        <h1>News & Updates</h1>
                        <p>Stay informed about our latest developments and achievements</p>
                    </div>
                </section>

                <section className="news-content">
                    <div className="container">
                        {loading && (
                            <div className="loading">
                                <div className="spinner"></div>
                                <p>Loading news...</p>
                            </div>
                        )}

                        {/* Featured News */}
                        {featuredNews.length > 0 && (
                            <div className="featured-section">
                                <h2 className="section-title">Featured</h2>
                                <div className="featured-grid">
                                    {featuredNews.map((item) => (
                                        <article key={item.id} className="news-card featured">
                                            <div className="news-image">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.title} />
                                                ) : (
                                                    <div className="image-placeholder">📰</div>
                                                )}
                                                <span className="featured-badge">Featured</span>
                                            </div>
                                            <div className="news-body">
                                                <time className="news-date">
                                                    {new Date(item.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </time>
                                                <h3>{item.title}</h3>
                                                <p>{item.summary}</p>
                                                <button className="read-more">Read More →</button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Regular News */}
                        {regularNews.length > 0 && (
                            <div className="regular-section">
                                <h2 className="section-title">Latest News</h2>
                                <div className="news-grid">
                                    {regularNews.map((item) => (
                                        <article key={item.id} className="news-card">
                                            <div className="news-image">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.title} />
                                                ) : (
                                                    <div className="image-placeholder">📰</div>
                                                )}
                                            </div>
                                            <div className="news-body">
                                                <time className="news-date">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </time>
                                                <h3>{item.title}</h3>
                                                <p>{item.summary}</p>
                                                <button className="read-more">Read More →</button>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!loading && news.length === 0 && (
                            <div className="empty-state">
                                <span className="empty-icon">📰</span>
                                <h3>No News Available</h3>
                                <p>Check back soon for updates.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default NewsPage;
