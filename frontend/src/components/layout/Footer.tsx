// Footer Component - Premium design with animations
import { COMPANY_INFO, FOOTER_SECTIONS, NAV_LINKS, SOCIAL_LINKS } from '../../constants';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" id="contact">
            {/* Main Footer */}
            <div className="footer-main">
                <div className="footer-container">
                    {/* Company Info Column */}
                    <div className="footer-column footer-brand">
                        <div className="footer-logo">
                            <span className="logo-icon">⚡</span>
                            <span className="logo-text">{COMPANY_INFO.name}</span>
                        </div>
                        <p className="footer-description">
                            {COMPANY_INFO.tagline}. Committed to providing reliable and
                            sustainable energy solutions for the nation.
                        </p>

                        {/* Social Links */}
                        <div className="social-links">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.href}
                                    className="social-link"
                                    aria-label={social.name}
                                    title={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            {NAV_LINKS.map((link) => (
                                <li key={link.id}>
                                    <a href={link.href}>
                                        <span className="link-arrow">→</span>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Dynamic Sections */}
                    {FOOTER_SECTIONS.map((section) => (
                        <div key={section.id} className="footer-column">
                            <h4 className="footer-title">{section.title}</h4>
                            <ul className="footer-links">
                                {section.links.map((link) => (
                                    <li key={link.id}>
                                        <a href={link.href}>
                                            <span className="link-arrow">→</span>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info */}
                    <div className="footer-column">
                        <h4 className="footer-title">Contact Us</h4>
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-icon">📧</span>
                                <div>
                                    <span className="contact-label">Email</span>
                                    <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📞</span>
                                <div>
                                    <span className="contact-label">Phone</span>
                                    <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📍</span>
                                <div>
                                    <span className="contact-label">Location</span>
                                    <span>Rampal, Bagerhat, Bangladesh</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <p className="copyright">
                        © {currentYear} {COMPANY_INFO.name}. All Rights Reserved.
                    </p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Sitemap</a>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <a href="#home" className="back-to-top" aria-label="Back to top">
                ↑
            </a>
        </footer>
    );
}

export default Footer;
