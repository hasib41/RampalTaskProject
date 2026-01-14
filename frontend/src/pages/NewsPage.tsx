// News Page - Media and News Center
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import './NewsPage.css';

// News data
const FEATURED_NEWS = {
    title: 'BIFPCL Achieves Major Milestone in Sustainable Energy Production',
    description: 'Our latest supercritical power project has reached full operational capacity, marking a significant step towards energy security for the region.',
    image: '/images/hero-1.png',
    category: 'Featured News',
};

const NEWS_ITEMS = [
    {
        id: 1,
        title: 'Quarterly Financial Performance Review Q3 2023',
        category: 'Corporate',
        date: '15 Oct 2023',
        excerpt: 'BIFPCL announces robust financial results for the third quarter, driven by operational efficiency.',
        image: '/images/hero-2.png',
    },
    {
        id: 2,
        title: 'New Environmental Initiative: Project Green Canopy',
        category: 'Sustainability',
        categoryColor: 'green',
        date: '12 Oct 2023',
        excerpt: 'Details on the new reforestation project surrounding our production sites.',
        image: '/images/hero-3.png',
    },
    {
        id: 3,
        title: 'BIFPCL Signs Strategic MOU with IEA',
        category: 'Partnership',
        date: '05 Oct 2023',
        excerpt: 'Strengthening global ties for energy security and technological exchange.',
        image: '/images/hero-1.png',
    },
    {
        id: 4,
        title: 'Breakthrough in Clean Coal Technology Integration',
        category: 'Innovation',
        date: '28 Sep 2023',
        excerpt: 'Our R&D team has successfully piloted a new emission reduction system.',
        image: '/images/hero-2.png',
    },
];

const CATEGORIES = [
    { name: 'Press Releases', count: 24 },
    { name: 'Project Updates', count: 18 },
    { name: 'Media Advisories', count: 7 },
    { name: 'Speeches', count: 12 },
    { name: 'Video Gallery', count: 5 },
];

function NewsPage() {
    return (
        <>
            <Header />
            <main className="news-page">
                {/* Featured Hero */}
                <section className="news-hero" style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%), url(${FEATURED_NEWS.image})` }}>
                    <div className="container">
                        <span className="news-badge">{FEATURED_NEWS.category}</span>
                        <h1>{FEATURED_NEWS.title}</h1>
                        <p>{FEATURED_NEWS.description}</p>
                        <div className="news-hero-actions">
                            <button className="btn-primary">Read Full Story →</button>
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
                            {NEWS_ITEMS.map((item) => (
                                <article key={item.id} className="news-card">
                                    <div className="news-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className="news-card-content">
                                        <span className={`news-category ${item.categoryColor || ''}`}>{item.category}</span>
                                        <h3>{item.title}</h3>
                                        <p className="news-date">📅 {item.date}</p>
                                        <p className="news-excerpt">{item.excerpt}</p>
                                        <Link to="/news" className="read-more">Read More →</Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="load-more">
                            <button>Load More News ↓</button>
                        </div>
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
                                        <span className="count">{cat.count}</span>
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
