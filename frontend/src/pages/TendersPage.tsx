// Tenders Page - Procurement portal
import { Header, Footer } from '../components/layout';
import './TendersPage.css';

// Tenders data
const TENDERS = [
    { id: 'TDR-2024-081', title: 'Supply of Solar PV Modules (Phase III)', status: 'Open', statusColor: 'green', pubDate: '12 Jan 2024', closeDate: '15 Feb 2024' },
    { id: 'TDR-2024-094', title: 'Maintenance of High Pressure Turbine Units', status: 'Closing Soon', statusColor: 'yellow', pubDate: '15 Jan 2024', closeDate: '02 Feb 2024' },
    { id: 'TDR-2024-102', title: 'IT Infrastructure Upgrade & Data Center Migration', status: 'Open', statusColor: 'green', pubDate: '18 Jan 2024', closeDate: '20 Mar 2024' },
    { id: 'TDR-2024-115', title: 'Consultancy for Environmental Impact Assessment', status: 'Open', statusColor: 'green', pubDate: '22 Jan 2024', closeDate: '15 Mar 2024' },
];

const CATEGORIES = ['All Categories', 'Civil Works', 'Electrical', 'IT Services', 'Maintenance'];

function TendersPage() {
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
                            <span>Showing {TENDERS.length} of 28 tenders</span>
                        </div>
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
                                {TENDERS.map((tender) => (
                                    <tr key={tender.id}>
                                        <td className="tender-id">{tender.id}</td>
                                        <td>
                                            <div className="tender-title">{tender.title}</div>
                                            <span className={`tender-status ${tender.statusColor}`}>Status: {tender.status}</span>
                                        </td>
                                        <td className="date">{tender.pubDate}</td>
                                        <td className="date">{tender.closeDate}</td>
                                        <td>
                                            <a href="#" className="download-link">📥 PDF</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
