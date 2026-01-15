// Contact Page - Corporate contact information
import { Header, Footer } from '../components/layout';
import './ContactPage.css';

// Contact data
const OFFICES = [
    {
        type: 'Corporate Office',
        icon: '🏢',
        address: 'Level 15, Borak Mehnur, 51/B Kemal Ataturk Avenue, Banani, Dhaka-1213, Bangladesh',
        phone: '+88-02-9858567-70',
        email: 'info@bifpcl.com',
    },
    {
        type: 'Plant Site',
        icon: '🏭',
        address: 'Maitree Super Thermal Power Project, Rampal, Bagerhat, Bangladesh',
        phone: '+88-04662-56123',
        email: 'plant.office@bifpcl.com',
    },
];

const SUBJECTS = ['General Inquiry', 'Project Information', 'Tenders & Procurement', 'Career Opportunities', 'Media & Public Relations'];

function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
            <Header />
            <main className="contact-page">
                {/* Header */}
                <div className="container">
                    <div className="contact-header">
                        <h1>Contact Us</h1>
                        <p>Transparency and communication are at the heart of BIFPCL. Get in touch with our corporate or plant offices.</p>
                    </div>
                </div>

                {/* Map */}
                <div className="container">
                    <div className="map-container">
                        <div className="map-placeholder" style={{ backgroundImage: `url('/images/hero-1.png')` }}>
                            <div className="map-search">
                                <span>📍</span>
                                <input type="text" defaultValue="Dhaka Corporate Office" placeholder="Find our offices" />
                            </div>
                            <div className="map-marker">
                                <span>🏭</span>
                                <div className="marker-label">Dhaka HQ</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="container">
                    <div className="contact-grid">
                        {/* Offices Column */}
                        <div className="offices-column">
                            <h3>Our Offices</h3>

                            {/* Office Cards */}
                            <div className="office-cards">
                                {OFFICES.map((office, i) => (
                                    <div key={i} className="office-card">
                                        <div className="office-icon">{office.icon}</div>
                                        <div className="office-info">
                                            <h4>{office.type}</h4>
                                            <p>{office.address}</p>
                                            <div className="contact-item">
                                                <span>📞</span>
                                                <span>{office.phone}</span>
                                            </div>
                                            <div className="contact-item">
                                                <span>📧</span>
                                                <span>{office.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Grievance */}
                            <div className="grievance-card">
                                <div className="grievance-header">
                                    <span>⚖️</span>
                                    <h3>Grievance Redressal</h3>
                                </div>
                                <p>For formal complaints and grievance procedures, please contact our designated officers.</p>
                                <div className="grievance-item">
                                    <p className="role">Grievance Redressal Officer (GRO)</p>
                                    <p className="title">DGM (HR), BIFPCL</p>
                                    <a href="mailto:gro@bifpcl.com">gro@bifpcl.com</a>
                                </div>
                                <div className="grievance-item">
                                    <p className="role">Appellate Authority</p>
                                    <p className="title">Chief General Manager (CGM)</p>
                                    <a href="mailto:appeal@bifpcl.com">appeal@bifpcl.com</a>
                                </div>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="form-column">
                            <div className="form-card">
                                <h3>Send an Inquiry</h3>
                                <form className="inquiry-form" onSubmit={handleSubmit}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input type="text" placeholder="Enter your name" />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="email" placeholder="name@company.com" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Subject</label>
                                        <select>
                                            {SUBJECTS.map((sub, i) => (
                                                <option key={i}>{sub}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Your Message</label>
                                        <textarea placeholder="How can we help you?" rows={6}></textarea>
                                    </div>
                                    <div className="form-checkbox">
                                        <input type="checkbox" id="terms" />
                                        <label htmlFor="terms">I agree to the privacy policy and terms of service.</label>
                                    </div>
                                    <button type="submit" className="submit-btn">Submit Message →</button>
                                </form>

                                {/* Social */}
                                <div className="social-section">
                                    <h4>Connect With Us</h4>
                                    <div className="social-links">
                                        <a href="#">🌐 LinkedIn</a>
                                        <a href="#">📘 Facebook</a>
                                        <a href="#">🎬 YouTube</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default ContactPage;
