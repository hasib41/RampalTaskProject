// Contact Page - Contact form that submits to API
import { useState } from 'react';
import { Header, Footer } from '../components/layout';
import { submitContactForm } from '../services/api';
import { COMPANY_INFO } from '../constants';
import './ContactPage.css';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await submitContactForm(formData);
            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            setError('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className="contact-page">
                <section className="page-hero">
                    <div className="container">
                        <h1>Contact Us</h1>
                        <p>Get in touch with us for any inquiries or feedback</p>
                    </div>
                </section>

                <section className="contact-content">
                    <div className="container">
                        <div className="contact-grid">
                            {/* Contact Form */}
                            <div className="contact-form-section">
                                <h2>Send us a Message</h2>

                                {success ? (
                                    <div className="success-message">
                                        <span className="success-icon">✅</span>
                                        <h3>Message Sent Successfully!</h3>
                                        <p>Thank you for contacting us. We'll get back to you soon.</p>
                                        <button onClick={() => setSuccess(false)} className="send-another">
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="contact-form">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="name">Full Name *</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email Address *</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+880 1XXX-XXXXXX"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="subject">Subject *</label>
                                                <select
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select a subject</option>
                                                    <option value="General Inquiry">General Inquiry</option>
                                                    <option value="Tender Information">Tender Information</option>
                                                    <option value="Career Opportunity">Career Opportunity</option>
                                                    <option value="Media/Press">Media/Press</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group full-width">
                                            <label htmlFor="message">Your Message *</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                placeholder="Write your message here..."
                                            />
                                        </div>

                                        {error && <div className="error-message">{error}</div>}

                                        <button type="submit" className="submit-btn" disabled={loading}>
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Contact Info */}
                            <div className="contact-info-section">
                                <h2>Contact Information</h2>

                                <div className="info-cards">
                                    <div className="info-card">
                                        <span className="info-icon">📍</span>
                                        <h4>Address</h4>
                                        <p>Rampal, Bagerhat, Bangladesh</p>
                                    </div>

                                    <div className="info-card">
                                        <span className="info-icon">📧</span>
                                        <h4>Email</h4>
                                        <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
                                    </div>

                                    <div className="info-card">
                                        <span className="info-icon">📞</span>
                                        <h4>Phone</h4>
                                        <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
                                    </div>

                                    <div className="info-card">
                                        <span className="info-icon">🕒</span>
                                        <h4>Working Hours</h4>
                                        <p>Sunday - Thursday: 9:00 AM - 5:00 PM</p>
                                    </div>
                                </div>

                                {/* Map Placeholder */}
                                <div className="map-placeholder">
                                    <span className="map-icon">🗺️</span>
                                    <p>Map will be displayed here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default ContactPage;
