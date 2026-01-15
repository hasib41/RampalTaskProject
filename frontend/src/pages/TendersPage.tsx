// Tenders Page - Procurement portal
import { Header, Footer } from '../components/layout';
import { useTenders } from '../hooks/useApi';
import './TendersPage.css';

const CATEGORIES = ['All Categories', 'Civil Works', 'Electrical', 'IT Services', 'Maintenance'];

function TendersPage() {
    const { data: tenders, loading, error } = useTenders();

    const getStatus = (deadline: string) => {
        const today = new Date();
        const closeDate = new Date(deadline);
        const diffTime = closeDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { label: 'Closed', color: 'red' };
        if (diffDays <= 7) return { label: 'Closing Soon', color: 'yellow' };
        return { label: 'Open', color: 'green' };
    };

    return (
        <>
            <Header />
            <main className="tenders-page">
                <div className="container">
                    {/* Page Header */}
                    <div className="page-header">
                        <h1>Tenders and Procurement Portal</h1>
                        <p>Transparency and efficiency in BIFPCL energy sector procurement.</p>
                    </div>

                    {/* Search & Filter */}
                    <div className="search-section">
                        <div className="search-row">
                            <div className="search-input">
                                <span>🔍</span>
                                <input type="text" placeholder="Search by Tender ID, Title, or Keyword" />
                            </div>
                            <button className="search-btn">Search Tenders</button>
                        </div>
                        <div className="filter-chips">
                            <span>Filter by Category:</span>
                            {CATEGORIES.map((cat, i) => (
                                <button key={i} className={`chip ${i === 0 ? 'active' : ''}`}>{cat}</button>
                            ))}
                        </div>
                    </div>

                    {/* Tender Table */}
                    <div className="table-container">
                        <div className="table-header">
                            <h3>Active Tender Listings</h3>
                            <span>Showing {tenders?.length || 0} tenders</span>
                        </div>

                        {loading && <div className="loading-spinner" style={{ margin: '40px auto' }}></div>}

                        {error && (
                            <div className="error-message text-center" style={{ padding: '40px' }}>
                                <p className="text-muted">Unable to load tenders. Please try again later.</p>
                            </div>
                        )}

                        {!loading && !error && tenders?.length === 0 && (
                            <div className="no-data-message text-center" style={{ padding: '40px' }}>
                                <p className="text-muted">No active tenders found.</p>
                            </div>
                        )}

                        {!loading && !error && tenders && tenders.length > 0 && (
                            <table className="tenders-table">
                                <thead>
                                    <tr>
                                        <th>Tender ID</th>
                                        <th>Tender Title</th>
                                        <th>Publication Date</th>
                                        <th>Closing Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tenders.map((tender) => {
                                        const status = getStatus(tender.deadline);
                                        return (
                                            <tr key={tender.id}>
                                                <td className="tender-id">{tender.reference_number}</td>
                                                <td>
                                                    <div className="tender-title">{tender.title}</div>
                                                    <span className={`tender-status ${status.color}`}>Status: {status.label}</span>
                                                </td>
                                                <td className="date">{new Date(tender.created_at).toLocaleDateString()}</td>
                                                <td className="date">{new Date(tender.deadline).toLocaleDateString()}</td>
                                                <td>
                                                    {tender.document_url ? (
                                                        <a href={tender.document_url} className="download-link" target="_blank" rel="noopener noreferrer">📥 PDF</a>
                                                    ) : (
                                                        <span className="text-muted" style={{ fontSize: '0.9rem' }}>No PDF</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}

                        <div className="table-footer">
                            <button>Load More Tenders</button>
                        </div>
                    </div>


                    {/* Bottom Grid */}
                    <div className="bottom-grid">
                        {/* Instructions */}
                        <div className="instructions-card">
                            <div className="card-header">
                                <span>ℹ️</span>
                                <h3>General Instructions to Bidders</h3>
                            </div>
                            <div className="card-content">
                                <p>Bidders are requested to carefully review the following instructions before submitting their proposals.</p>
                                <ul>
                                    <li>All tenders must be submitted electronically through the National e-GP System portal.</li>
                                    <li>The tender security must be submitted in the form of a Bank Guarantee.</li>
                                    <li>A non-refundable tender document fee must be paid for each tender.</li>
                                    <li>Late submissions will not be accepted under any circumstances.</li>
                                </ul>
                                <div className="info-box">
                                    <strong>Important Note:</strong> Pre-bid meetings are held every Wednesday at 10:00 AM.
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-card">
                            <h3>Contact Procurement</h3>
                            <p>Have questions regarding a specific tender? Send us an inquiry.</p>
                            <form className="contact-form">
                                <input type="text" placeholder="Company Name" />
                                <input type="email" placeholder="Contact Email" />
                                <select>
                                    <option>Technical Clarification</option>
                                    <option>Submission Assistance</option>
                                    <option>Payment Issues</option>
                                </select>
                                <textarea placeholder="Please describe your inquiry..." rows={4}></textarea>
                                <button type="submit">Send Inquiry</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default TendersPage;
