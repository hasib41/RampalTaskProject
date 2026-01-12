// Header Component - Fully featured with scroll effects and mobile menu
import { useState, useEffect } from 'react';
import { NAV_LINKS, COMPANY_INFO } from '../../constants';
import './Header.css';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when clicking a link
    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
            <div className="header-container">
                {/* Logo */}
                <a href="#home" className="logo">
                    <span className="logo-icon">⚡</span>
                    <span className="logo-text">{COMPANY_INFO.name}</span>
                </a>

                {/* Desktop Navigation */}
                <nav className="navbar">
                    <ul className="nav-links">
                        {NAV_LINKS.map((link) => (
                            <li key={link.id}>
                                <a href={link.href} onClick={handleNavClick}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Login Button */}
                <button className="login-btn">
                    <span className="btn-text">Login</span>
                    <span className="btn-icon">→</span>
                </button>

                {/* Mobile Menu Toggle */}
                <button
                    className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav">
                    <ul>
                        {NAV_LINKS.map((link) => (
                            <li key={link.id}>
                                <a href={link.href} onClick={handleNavClick}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button className="mobile-login-btn">Login</button>
                </nav>
            </div>
        </header>
    );
}

export default Header;
