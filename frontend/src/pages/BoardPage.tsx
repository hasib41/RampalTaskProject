// Board of Directors Page
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/layout';
import { BOARD_MEMBERS, COMPANY_INFO } from '../constants';
import './BoardPage.css';

function BoardPage() {
    const chairman = BOARD_MEMBERS.find(m => m.isChairman);
    const directors = BOARD_MEMBERS.filter(m => !m.isChairman);

    return (
        <>
            <Header />
            <main className="board-page">
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <Link to="/about">About Us</Link>
                        <span>/</span>
                        <span>Board of Directors</span>
                    </nav>

                    {/* Page Header */}
                    <div className="page-header">
                        <h1>Board of Directors</h1>
                        <p>Committed to excellence in corporate governance, strategic leadership, and sustainable development for the regional energy sector.</p>
                    </div>

                    {/* Leadership Section - Chairman */}
                    <section className="leadership-section">
                        <h2 className="section-title">Leadership</h2>

                        {chairman && (
                            <div className="chairman-card">
                                <div className="chairman-content">
                                    <span className="badge">Executive Leadership</span>
                                    <h3>{chairman.name}</h3>
                                    <p className="title">{chairman.title}</p>
                                    <p className="bio">{chairman.bio}</p>
                                    <button className="btn-primary">
                                        View Full Biography →
                                    </button>
                                </div>
                                <div className="chairman-image" style={{ backgroundImage: `url(${chairman.image})` }}></div>
                            </div>
                        )}
                    </section>

                    {/* Board Members Grid */}
                    <section className="members-section">
                        <h2 className="section-title">Board Members</h2>
                        <div className="members-grid">
                            {directors.map((member) => (
                                <div key={member.id} className="member-card">
                                    <div className="member-image" style={{ backgroundImage: `url(${member.image})` }}></div>
                                    <div className="member-info">
                                        <h4>{member.name}</h4>
                                        <p className="member-title">{member.title}</p>
                                        <p className="member-bio">{member.bio}</p>
                                        <button className="view-profile">View Profile →</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Governance Framework */}
                    <section className="governance-section">
                        <div className="governance-content">
                            <h3>Governance Framework</h3>
                            <p>{COMPANY_INFO.shortName} operates under a robust governance framework that ensures transparency, accountability, and ethical conduct. Our board members are selected for their diverse expertise and commitment to the long-term prosperity of our stakeholders and the environment.</p>
                            <div className="governance-badges">
                                <span>✓ Ethical Integrity</span>
                                <span>📈 Strategic Growth</span>
                                <span>🤝 Stakeholder Value</span>
                            </div>
                        </div>
                        <button className="governance-btn">Download Governance Report 2023</button>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default BoardPage;
